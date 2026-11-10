import { Router, Request, Response } from 'express'
import crypto from 'crypto'
import { db } from '../db/store.js'
import { isMongoActive } from '../db/mongo.js'
import { OrderModel } from '../models/Order.js'

const paymentsRouter = Router()

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || ''
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || ''
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || ''

// Check payment gateway status
paymentsRouter.get('/config', (_req: Request, res: Response) => {
  res.json({
    success: true,
    isLive: Boolean(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET),
    keyId: RAZORPAY_KEY_ID ? RAZORPAY_KEY_ID : 'rzp_test_placeholder_key',
    currency: 'INR',
    gateway: 'Razorpay',
  })
})

// Create Razorpay payment order (server-side recalculated amount)
paymentsRouter.post('/create-order', async (req: Request, res: Response) => {
  try {
    const { items, orderId, notes } = req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items required to generate payment order' })
    }

    // Server-side recalculation of true subtotal from db
    let subtotal = 0
    for (const item of items) {
      const dbProduct = db.getProductById(item.productId)
      if (!dbProduct) {
        return res.status(400).json({ success: false, message: `Product ${item.productId} not found in catalog` })
      }
      subtotal += dbProduct.price * (Number(item.quantity) || 1)
    }

    const shippingFee = subtotal >= 15000 ? 0 : 495
    const total = subtotal + shippingFee
    const amountInPaise = Math.round(total * 100)

    // If real Razorpay credentials exist
    if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
      const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: orderId || `rcpt_${Date.now()}`,
          notes: notes || { platform: 'ZAMYAA Luxury Storefront' },
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        console.error('Razorpay Order Creation Failed:', data)
        return res.status(502).json({ success: false, message: data.error?.description || 'Gateway error' })
      }

      return res.json({
        success: true,
        orderId: data.id,
        amount: data.amount,
        currency: data.currency,
        keyId: RAZORPAY_KEY_ID,
      })
    }

    // Safe simulated sandbox order ID for local verification
    const simulatedOrderId = `order_sim_${crypto.randomBytes(8).toString('hex')}`
    return res.json({
      success: true,
      orderId: simulatedOrderId,
      amount: amountInPaise,
      currency: 'INR',
      keyId: 'rzp_test_placeholder_key',
      simulated: true,
      message: 'Razorpay credentials not yet configured. Operating in safe test/audit mode.',
    })
  } catch (error: any) {
    console.error('Payment create-order error:', error)
    return res.status(500).json({ success: false, message: error.message || 'Payment initiation failed' })
  }
})

// Verify payment signature
paymentsRouter.post('/verify', async (req: Request, res: Response) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderNumber } = req.body

    if (!razorpayOrderId || !razorpayPaymentId) {
      return res.status(400).json({ success: false, message: 'Order and payment identifiers required' })
    }

    // Cryptographic verification if live secret configured
    if (RAZORPAY_KEY_SECRET) {
      const generatedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex')

      if (generatedSignature !== razorpaySignature) {
        console.warn(`[SECURITY] Invalid Razorpay signature for order ${orderNumber}`)
        return res.status(400).json({ success: false, message: 'Invalid payment signature verification' })
      }
    }

    // Update order in database
    if (orderNumber) {
      const existingOrder = db.getOrders().find((o) => o.orderNumber === orderNumber)
      if (existingOrder) {
        if (existingOrder.paymentStatus === 'paid') {
          return res.json({ success: true, message: 'Order already confirmed and marked as paid', order: existingOrder })
        }
        existingOrder.paymentStatus = 'paid'
        existingOrder.fulfillmentStatus = 'confirmed'
        existingOrder.paymentMethod = 'razorpay'
        db.save()
      }

      if (isMongoActive()) {
        await OrderModel.findOneAndUpdate(
          { orderNumber },
          {
            paymentStatus: 'paid',
            fulfillmentStatus: 'confirmed',
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
          }
        )
      }
    }

    return res.json({
      success: true,
      verified: true,
      message: 'Payment verified successfully and order confirmed.',
    })
  } catch (error: any) {
    console.error('Payment verify error:', error)
    return res.status(500).json({ success: false, message: error.message || 'Payment verification failed' })
  }
})

// Webhook endpoint
paymentsRouter.post('/webhook', async (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string

    if (RAZORPAY_WEBHOOK_SECRET) {
      if (!signature) {
        return res.status(400).json({ success: false, message: 'Missing webhook signature' })
      }

      const bodyStr = JSON.stringify(req.body)
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
        .update(bodyStr)
        .digest('hex')

      if (signature !== expectedSignature) {
        console.warn('[SECURITY] Webhook signature mismatch')
        return res.status(400).json({ success: false, message: 'Invalid webhook signature' })
      }
    }

    const event = req.body.event
    const payload = req.body.payload

    console.log(`[RAZORPAY WEBHOOK] Received event: ${event}`)

    if (event === 'order.paid' || event === 'payment.captured') {
      const paymentEntity = payload.payment?.entity
      const rzpOrderId = paymentEntity?.order_id

      if (rzpOrderId) {
        const order = db.getOrders().find((o) => (o as any).razorpayOrderId === rzpOrderId)
        if (order) {
          order.paymentStatus = 'paid'
          order.fulfillmentStatus = 'confirmed'
          db.save()
        }

        if (isMongoActive()) {
          await OrderModel.findOneAndUpdate(
            { razorpayOrderId: rzpOrderId },
            { paymentStatus: 'paid', fulfillmentStatus: 'confirmed' }
          )
        }
      }
    } else if (event === 'payment.failed') {
      const paymentEntity = payload.payment?.entity
      const rzpOrderId = paymentEntity?.order_id
      if (rzpOrderId) {
        const order = db.getOrders().find((o) => (o as any).razorpayOrderId === rzpOrderId)
        if (order) {
          order.paymentStatus = 'failed'
          db.save()
        }
      }
    }

    return res.json({ status: 'ok' })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return res.status(500).json({ success: false, message: 'Webhook processing error' })
  }
})

export default paymentsRouter

