import { Router, Request, Response } from 'express'
import { db } from '../db/store.js'

const cmsRouter = Router()

// Get homepage CMS content
cmsRouter.get('/', (_req: Request, res: Response) => {
  const cms = db.getHomepageCMS()
  res.json({ success: true, cms })
})

// Update homepage CMS content
cmsRouter.put('/', (req: Request, res: Response) => {
  try {
    const updated = db.updateHomepageCMS(req.body)
    res.json({ success: true, cms: updated })
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message })
  }
})

export default cmsRouter

