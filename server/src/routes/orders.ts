import { Router, Request, Response } from 'express'
import { db, Order } from '../db/store.js'

const ordersRouter = Router()

// List orders with status filters & search
ordersRouter.get('/', (req: Request, res: Response) => {
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

// Analytics summary for dashboard
ordersRouter.get('/analytics/summary', (_req: Request, res: Response) => {
  const orders = db.getOrders()
  const products = db.getProducts()

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0)

  const pendingCount = orders.filter((o) => o.fulfillmentStatus === 'pending').length
  const processingCount = orders.filter((o) => o.fulfillmentStatus === 'processing').length
  const shippedCount = orders.filter((o) => o.fulfillmentStatus === 'shipped').length
  const deliveredCount = orders.filter((o) => o.fulfillmentStatus === 'delivered').length

  // Revenue chart data (last 7 months)
  const salesChart = [
    { month: 'May', revenue: 145000, orders: 4 },
    { month: 'Jun', revenue: 210000, orders: 6 },
    { month: 'Jul', revenue: 185000, orders: 5 },
    { month: 'Aug', revenue: 320000, orders: 9 },
    { month: 'Sep', revenue: 410000, orders: 11 },
    { month: 'Oct', revenue: 580000, orders: 15 },
    { month: 'Nov', revenue: totalRevenue, orders: orders.length },
  ]

  // Bestsellers
  const bestsellers = products
    .filter((p) => p.isBestseller)
    .map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.images[0]?.url || '',
      collection: p.collection,
      salesCount: Math.floor(Math.random() * 20) + 12,
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

// Single order details
ordersRouter.get('/:id', (req: Request, res: Response) => {
  const order = db.getOrderById(req.params.id)
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' })
  }
  res.json({ success: true, order })
})

// Create order (from storefront checkout)
ordersRouter.post('/', (req: Request, res: Response) => {
  const body = req.body
  const orders = db.getOrders()

  const id = `ord-${Date.now()}`
  const orderNumber = `ZY-${new Date().getFullYear()}-${orders.length + 1043}`

  const newOrder: Order = {
    id,
    orderNumber,
    createdAt: new Date().toISOString(),
    customer: body.customer || {
      name: 'Guest Client',
      email: 'client@example.com',
      phone: '+91 99999 99999',
    },
    shippingAddress: body.shippingAddress || {
      address: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India',
    },
    items: body.items || [],
    subtotal: Number(body.subtotal) || 0,
    discount: Number(body.discount) || 0,
    shippingFee: Number(body.shippingFee) || 0,
    tax: Number(body.tax) || 0,
    total: Number(body.total) || 0,
    currency: body.currency || '₹',
    paymentStatus: body.paymentMethod === 'cod' ? 'pending' : 'paid',
    paymentMethod: body.paymentMethod || 'card',
    fulfillmentStatus: 'pending',
    notes: body.notes || '',
  }

  db.getData().orders.unshift(newOrder)
  db.save()

  res.status(201).json({ success: true, order: newOrder })
})

// Update fulfillment status & tracking
ordersRouter.patch('/:id/status', (req: Request, res: Response) => {
  const { fulfillmentStatus, trackingNumber, courier, paymentStatus, notes } = req.body

  const order = db.getOrderById(req.params.id)
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' })
  }

  if (fulfillmentStatus) order.fulfillmentStatus = fulfillmentStatus
  if (trackingNumber !== undefined) order.trackingNumber = trackingNumber
  if (courier !== undefined) order.courier = courier
  if (paymentStatus) order.paymentStatus = paymentStatus
  if (notes !== undefined) order.notes = notes

  db.save()
  res.json({ success: true, order })
})

export default ordersRouter
