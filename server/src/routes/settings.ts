import { Router, Request, Response } from 'express'
import { db } from '../db/store.js'

const settingsRouter = Router()

// Get store settings
settingsRouter.get('/', (_req: Request, res: Response) => {
  const settings = db.getSettings()
  res.json({ success: true, settings })
})

// Update store settings
settingsRouter.put('/', (req: Request, res: Response) => {
  try {
    const updated = db.updateSettings(req.body)
    res.json({ success: true, settings: updated })
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message })
  }
})

export default settingsRouter

