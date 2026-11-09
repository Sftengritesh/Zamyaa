import { Router, Request, Response } from 'express'
import { db } from '../db/store.js'

const couponsRouter = Router()

// List coupons
couponsRouter.get('/', (_req: Request, res: Response) => {
  const coupons = db.getCoupons()
  res.json({ success: true, count: coupons.length, coupons })
})

// Validate coupon code (for checkout)
couponsRouter.post('/validate', (req: Request, res: Response) => {
  const { code, cartTotal } = req.body
  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code required' })
  }

  const coupon = db
    .getCoupons()
    .find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive)

  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Invalid or expired privilege coupon' })
  }

  if (cartTotal && cartTotal < coupon.minOrderValue) {
    return res.status(400).json({
      success: false,
      message: `Minimum order value of ₹${coupon.minOrderValue.toLocaleString('en-IN')} required for this code.`,
    })
  }

  let discount = 0
  if (coupon.type === 'percentage') {
    discount = Math.round(((cartTotal || 0) * coupon.value) / 100)
  } else {
    discount = coupon.value
  }

  res.json({ success: true, coupon, discount })
})

// Create coupon
couponsRouter.post('/', (req: Request, res: Response) => {
  const body = req.body
  if (!body.code || !body.value) {
    return res.status(400).json({ success: false, message: 'Code and discount value required' })
  }

  const newCoupon = db.createCoupon({
    code: body.code.trim().toUpperCase(),
    type: body.type || 'percentage',
    value: Number(body.value),
    minOrderValue: Number(body.minOrderValue) || 0,
    maxUses: Number(body.maxUses) || 100,
    expiresAt: body.expiresAt || '2026-12-31',
    isActive: body.isActive !== false,
    description: body.description || '',
  })

  res.status(201).json({ success: true, coupon: newCoupon })
})

// Update coupon
couponsRouter.put('/:id', (req: Request, res: Response) => {
  const updated = db.updateCoupon(req.params.id, req.body)
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Coupon not found' })
  }
  res.json({ success: true, coupon: updated })
})

// Toggle active status
couponsRouter.patch('/:id/toggle', (req: Request, res: Response) => {
  const coupon = db.getCoupons().find((c) => c.id === req.params.id)
  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Coupon not found' })
  }
  coupon.isActive = !coupon.isActive
  db.save()
  res.json({ success: true, coupon })
})

// Delete coupon
couponsRouter.delete('/:id', (req: Request, res: Response) => {
  const ok = db.deleteCoupon(req.params.id)
  if (!ok) {
    return res.status(404).json({ success: false, message: 'Coupon not found' })
  }
  res.json({ success: true, message: 'Coupon deleted' })
})

export default couponsRouter

