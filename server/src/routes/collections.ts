import { Router, Request, Response } from 'express'
import { db } from '../db/store.js'

const collectionsRouter = Router()

// List collections
collectionsRouter.get('/', (_req: Request, res: Response) => {
  const colls = db.getCollections().sort((a, b) => a.displayOrder - b.displayOrder)
  res.json({ success: true, count: colls.length, collections: colls })
})

// Single collection
collectionsRouter.get('/:id', (req: Request, res: Response) => {
  const coll = db.getCollections().find((c) => c.id === req.params.id || c.slug === req.params.id)
  if (!coll) {
    return res.status(404).json({ success: false, message: 'Collection not found' })
  }
  res.json({ success: true, collection: coll })
})

// Create collection
collectionsRouter.post('/', (req: Request, res: Response) => {
  const body = req.body
  if (!body.title) {
    return res.status(400).json({ success: false, message: 'Title is required' })
  }

  const slug =
    body.slug ||
    body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

  const currentCount = db.getCollections().length

  const newColl = db.createCollection({
    slug,
    title: body.title,
    subtitle: body.subtitle || '',
    description: body.description || '',
    season: body.season || 'Autumn-Winter 2026',
    capsule: body.capsule || 'Capsule Edition',
    heroImage: body.heroImage || '',
    bannerImage: body.bannerImage || '',
    status: body.status || 'published',
    launchDate: body.launchDate || '',
    displayOrder: body.displayOrder || currentCount + 1,
    metrics: body.metrics || [
      { label: 'Archival Silhouettes', value: '10' },
      { label: 'Mulberry & Chanderi', value: '100%' },
      { label: 'Artisan Workshops', value: '4' },
    ],
    productIds: body.productIds || [],
  })

  res.status(201).json({ success: true, collection: newColl })
})

// Update collection
collectionsRouter.put('/:id', (req: Request, res: Response) => {
  const updated = db.updateCollection(req.params.id, req.body)
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Collection not found' })
  }
  res.json({ success: true, collection: updated })
})

// Delete collection
collectionsRouter.delete('/:id', (req: Request, res: Response) => {
  const ok = db.deleteCollection(req.params.id)
  if (!ok) {
    return res.status(404).json({ success: false, message: 'Collection not found' })
  }
  res.json({ success: true, message: 'Collection deleted successfully' })
})

export default collectionsRouter
