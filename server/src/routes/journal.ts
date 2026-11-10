import { Router, Request, Response } from 'express'
import { db } from '../db/store.js'
import { authMiddleware } from '../middleware/auth.js'

const journalRouter = Router()

// List articles (with category, status, featured filters)
journalRouter.get('/', (req: Request, res: Response) => {
  let list = db.getArticles()

  const { category, status, featured } = req.query

  if (category && category !== 'all') {
    list = list.filter((a) => a.category?.toLowerCase() === (category as string).toLowerCase())
  }

  if (status) {
    list = list.filter((a) => a.status === status)
  }

  if (featured === 'true') {
    list = list.filter((a) => a.isFeatured)
  }

  res.json({ success: true, count: list.length, articles: list })
})

// Single article by id or slug
journalRouter.get('/:idOrSlug', (req: Request, res: Response) => {
  const article = db.getArticleById(req.params.idOrSlug)
  if (!article) {
    return res.status(404).json({ success: false, message: 'Article not found' })
  }
  res.json({ success: true, article })
})

// Create article (Admin)
journalRouter.post('/', authMiddleware, (req: Request, res: Response) => {
  const body = req.body
  if (!body.title) {
    return res.status(400).json({ success: false, message: 'Article title is required' })
  }
  const created = db.createArticle(body)
  res.status(201).json({ success: true, article: created })
})

// Update article (Admin)
journalRouter.put('/:id', authMiddleware, (req: Request, res: Response) => {
  const updated = db.updateArticle(req.params.id, req.body)
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Article not found' })
  }
  res.json({ success: true, article: updated })
})

// Delete article (Admin)
journalRouter.delete('/:id', authMiddleware, (req: Request, res: Response) => {
  const ok = db.deleteArticle(req.params.id)
  if (!ok) {
    return res.status(404).json({ success: false, message: 'Article not found' })
  }
  res.json({ success: true, message: 'Article deleted successfully' })
})

export default journalRouter

