import { Router, Request, Response } from 'express'
import { db, Order, Product } from '../db/store.js'
import { isMongoActive } from '../db/mongo.js'
import { OrderModel } from '../models/Order.js'
import { authMiddleware, optionalAuth, requireAdmin, AuthenticatedRequest } from '../middleware/auth.js'

const ordersRouter = Router()

const VALID_FULFILLMENT_STATUSES = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]

const VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ['confirmed', 'processing', 'cancelled'],
  confirmed: ['processing', 'shipped', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['delivered', 'cancelled'],
  delivered: [],
  cancelled: [],
}

// ── CUSTOMER ORDER HISTORY (Protected: Customer can ONLY see their own orders) ──
ordersRouter.get('/my-orders', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user!
    let orders: any[] = []

    if (isMongoActive()) {
      orders = await OrderModel.find({
        $or: [{ customerId: user.id }, { 'customer.email': user.email.toLowerCase() }],
      }).sort({ createdAt: -1 })
    } else {
      orders = db
        .getOrders()
        .filter(
          (o) =>
            (o.customerId && o.customerId === user.id) ||
            o.customer.email.toLowerCase() === user.email.toLowerCase()
        )
    }

    return res.json({ success: true, count: orders.length, orders })
  } catch (err: any) {
    console.error('Customer Orders Error:', err)
    return res.status(500).json({ success: false, message: 'Failed to retrieve order history.' })
  }
})

// ── ADMIN: LIST ALL ORDERS (Protected: Admin Only) ──
ordersRouter.get('/', authMiddleware, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  let list = db.getOrders()

  const { status, paymentStatus, search } = req.query

  if (status && status !== 'all') {
    list = list.filter((o) => o.fulfillmentStatus === status)
  }
  if (paymentStatus && paymentStatus !== 'all') {
    list = list.filter((o) => o.paymentStatus === paymentStatus)
  }
  if (search) {
    const q = String(search).toLowerCase()
    list = list.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.email.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q))
    )
  }

  res.json({ success: true, count: list.length, orders: list })
})

// ── ADMIN: ANALYTICS SUMMARY (Protected: Admin Only) ──
ordersRouter.get('/analytics/summary', authMiddleware, requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const orders = db.getOrders()
  const products = db.getProducts()

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0)

  const pendingCount = orders.filter((o) => o.fulfillmentStatus === 'pending').length
  const processingCount = orders.filter((o) => o.fulfillmentStatus === 'processing').length
  const shippedCount = orders.filter((o) => o.fulfillmentStatus === 'shipped').length
  const deliveredCount = orders.filter((o) => o.fulfillmentStatus === 'delivered').length

  const salesChart = [
    { month: 'May', revenue: 145000, orders: 4 },
    { month: 'Jun', revenue: 210000, orders: 6 },
    { month: 'Jul', revenue: 185000, orders: 5 },
    { month: 'Aug', revenue: 320000, orders: 9 },
    { month: 'Sep', revenue: 410000, orders: 11 },
    { month: 'Oct', revenue: 580000, orders: 15 },
    { month: 'Nov', revenue: totalRevenue, orders: orders.length },
  ]

  const bestsellers = products
    .filter((p) => p.isBestseller)
    .map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.images[0]?.url || '',
      collection: p.collection,
      salesCount: 18,
    }))

  res.json({
    success: true,
    totalRevenue,
    totalOrders: orders.length,
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.status === 'active').length,
    pendingOrders: pendingCount,
    processingOrders: processingCount,
    shippedOrders: shippedCount,
    deliveredOrders: deliveredCount,
    salesChart,
    bestsellers,
    recentOrders: orders.slice(0, 5),
  })
})

// Single order details with authorization checks
ordersRouter.get('/:id', optionalAuth, (req: AuthenticatedRequest, res: Response) => {
  const order = db.getOrderById(req.params.id)
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' })
  }

  // Authorization check: If logged in as customer, can only view their own order
  if (req.user && req.user.role === 'customer') {
    const isOwner =
      (order.customerId && order.customerId === req.user.id) ||
      order.customer.email.toLowerCase() === req.user.email.toLowerCase()

    if (!isOwner) {
      return res.status(403).json({ success: false, message: 'Forbidden: You do not have access to this order.' })
    }
  }

  res.json({ success: true, order })
})

// Create order with strict server-side price calculation and inventory deduction
ordersRouter.post('/', optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const body = req.body
    const rawItems = body.items

    if (!rawItems || !Array.isArray(rawItems) || rawItems.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one item is required in the cart.' })
    }

    if (!body.customer?.name || !body.customer?.email || !body.customer?.phone) {
      return res.status(400).json({ success: false, message: 'Customer name, email, and phone number are required.' })
    }

    if (!body.shippingAddress?.address || !body.shippingAddress?.city || !body.shippingAddress?.pincode) {
      return res.status(400).json({ success: false, message: 'Valid shipping address, city, and pincode are required.' })
    }

    const verifiedItems: any[] = []
    let calculatedSubtotal = 0

    // Step 1: Verify each product against database prices and inventory availability
    for (const rawItem of rawItems) {
      const dbProduct: Product | undefined = db.getProductById(rawItem.productId)

      if (!dbProduct) {
        return res.status(400).json({
          success: false,
          message: `Product "${rawItem.productId}" is not available in our atelier catalog.`,
        })
      }

      if (!dbProduct.inStock) {
        return res.status(400).json({
          success: false,
          message: `"${dbProduct.name}" is currently sold out.`,
        })
      }

      const qty = Math.max(1, parseInt(rawItem.quantity, 10) || 1)
      const selectedSize = rawItem.size || 'M'

      // Check stock per size in product inventory
      const sizeInventory = dbProduct.inventory?.find((inv) => inv.size === selectedSize)
      if (sizeInventory && sizeInventory.stock < qty) {
        return res.status(400).json({
          success: false,
          message: `Insufficient inventory for "${dbProduct.name}" in size ${selectedSize}. Only ${sizeInventory.stock} remaining.`,
        })
      }

      // Authoritative database price (NEVER trust frontend submitted price)
      const officialUnitPrice = dbProduct.price
      const totalItemPrice = officialUnitPrice * qty
      calculatedSubtotal += totalItemPrice

      verifiedItems.push({
        productId: dbProduct.id,
        slug: dbProduct.slug,
        name: dbProduct.name,
        size: selectedSize,
        color: rawItem.color || dbProduct.colors?.[0]?.name || 'Standard',
        quantity: qty,
        unitPrice: officialUnitPrice,
        totalItemPrice,
        image: dbProduct.images[0]?.url || rawItem.image || '',
      })

      // Deduct inventory per size safely
      if (sizeInventory) {
        sizeInventory.stock = Math.max(0, sizeInventory.stock - qty)
      }
    }

    // Step 2: Calculate shipping & verified promotional discount
    const shippingFee = calculatedSubtotal >= 15000 ? 0 : 495
    let discount = 0
    if (body.couponCode === 'ZAMYAA10') {
      discount = Math.round(calculatedSubtotal * 0.1)
    }

    const finalTotal = calculatedSubtotal - discount + shippingFee
    const orders = db.getOrders()
    const id = `ord-${Date.now()}`
    const orderNumber = `ZY-${new Date().getFullYear()}-${orders.length + 1044}`

    // Strict Security Guard: Never allow client body to override customerId or paymentStatus
    // Only authenticated session token dictates customerId; paymentStatus always starts pending
    const newOrder: Order = {
      id,
      orderNumber,
      customerId: req.user ? req.user.id : undefined,
      createdAt: new Date().toISOString(),
      customer: {
        name: body.customer.name.trim(),
        email: req.user ? req.user.email : body.customer.email.trim().toLowerCase(),
        phone: body.customer.phone.trim(),
      },
      shippingAddress: {
        address: body.shippingAddress.address.trim(),
        city: body.shippingAddress.city.trim(),
        state: body.shippingAddress.state?.trim() || 'Maharashtra',
        pincode: body.shippingAddress.pincode.trim(),
        country: body.shippingAddress.country?.trim() || 'India',
      },
      items: verifiedItems,
      subtotal: calculatedSubtotal,
      discount,
      shippingFee,
      tax: 0,
      total: finalTotal,
      currency: '₹',
      paymentStatus: 'pending', // Always initialized to 'pending' on creation; cannot be falsified by client
      paymentMethod: body.paymentMethod || 'card',
      fulfillmentStatus: 'pending',
      notes: body.notes || '',
    }

    // Save to local file store (db.json)
    db.getData().orders.unshift(newOrder)
    db.save()

    // Sync to MongoDB Atlas if connected
    if (isMongoActive()) {
      try {
        await OrderModel.create(newOrder)
      } catch (mongoErr) {
        console.warn('MongoDB Atlas Order Sync Notice:', (mongoErr as Error).message)
      }
    }

    return res.status(201).json({
      success: true,
      order: newOrder,
      message: 'Order created with authoritative server-side price validation.',
    })
  } catch (error: any) {
    console.error('Create Order Error:', error)
    return res.status(500).json({ success: false, message: error.message || 'Failed to place order.' })
  }
})

// Update fulfillment status & tracking with inventory restoration on cancellation
ordersRouter.patch('/:id/status', authMiddleware, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { fulfillmentStatus, trackingNumber, courier, paymentStatus, notes } = req.body

    const order = db.getOrderById(req.params.id)
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    // Validate state transition if fulfillmentStatus is updated
    if (fulfillmentStatus) {
      if (!VALID_FULFILLMENT_STATUSES.includes(fulfillmentStatus)) {
        return res.status(400).json({
          success: false,
          message: `Invalid fulfillment status "${fulfillmentStatus}". Valid statuses: ${VALID_FULFILLMENT_STATUSES.join(', ')}`,
        })
      }

      const allowedTransitions = VALID_TRANSITIONS[order.fulfillmentStatus] || []
      if (!allowedTransitions.includes(fulfillmentStatus) && order.fulfillmentStatus !== fulfillmentStatus) {
        return res.status(400).json({
          success: false,
          message: `Cannot transition order status from "${order.fulfillmentStatus}" to "${fulfillmentStatus}".`,
        })
      }

      // If transitioning to CANCELLED: restore inventory for each item
      if (fulfillmentStatus === 'cancelled' && order.fulfillmentStatus !== 'cancelled') {
        for (const item of order.items) {
          const product = db.getProductById(item.productId)
          if (product && product.inventory) {
            const sizeInv = product.inventory.find((i) => i.size === item.size)
            if (sizeInv) {
              sizeInv.stock += item.quantity
            }
            product.inStock = true
          }
        }
      }

      order.fulfillmentStatus = fulfillmentStatus
    }

    if (trackingNumber !== undefined) order.trackingNumber = trackingNumber
    if (courier !== undefined) order.courier = courier
    if (paymentStatus) order.paymentStatus = paymentStatus
    if (notes !== undefined) order.notes = notes

    db.save()

    if (isMongoActive()) {
      await OrderModel.findOneAndUpdate(
        { $or: [{ id: req.params.id }, { orderNumber: order.orderNumber }] },
        {
          fulfillmentStatus: order.fulfillmentStatus,
          paymentStatus: order.paymentStatus,
          trackingNumber: order.trackingNumber,
          courier: order.courier,
          notes: order.notes,
        }
      )
    }

    return res.json({ success: true, order })
  } catch (error: any) {
    console.error('Order status update error:', error)
    return res.status(500).json({ success: false, message: error.message || 'Update failed' })
  }
})

export default ordersRouter

