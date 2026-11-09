import { Router, Request, Response } from 'express'
import { db } from '../db/store.js'

const reviewsRouter = Router()

// List reviews
reviewsRouter.get('/', (req: Request, res: Response) => {
  let list = db.getReviews()
  const { status, rating, productId } = req.query

  if (status && status !== 'all') {
    list = list.filter((r) => r.status === status)
  }
  if (rating) {
    list = list.filter((r) => r.rating === Number(rating))
  }
  if (productId) {
    list = list.filter((r) => r.productId === productId)
  }

  res.json({ success: true, count: list.length, reviews: list })
})

// Moderate review (approve / hide)
reviewsRouter.patch('/:id/status', (req: Request, res: Response) => {
  const { status } = req.body
  const updated = db.updateReviewStatus(req.params.id, status)
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Review not found' })
  }
  res.json({ success: true, review: updated })
})

// Add new review (customer or test)
reviewsRouter.post('/', (req: Request, res: Response) => {
  const body = req.body
  const id = `rev-${Date.now()}`
  const newReview = {
    id,
    productId: body.productId || 'p1',
    productName: body.productName || 'Garment Piece',
    customerName: body.customerName || 'Verified Client',
    customerEmail: body.customerEmail || 'client@example.com',
    rating: Number(body.rating) || 5,
    title: body.title || 'Exquisite tailoring',
    comment: body.comment || '',
    createdAt: new Date().toISOString(),
    isVerified: true,
    status: 'approved' as const,
  }

  db.getData().reviews.unshift(newReview)
  db.save()

  res.status(201).json({ success: true, review: newReview })
})

export default reviewsRouter

