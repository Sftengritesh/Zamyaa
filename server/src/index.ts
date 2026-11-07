import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRouter from './routes/auth.js'
import uploadRouter from './routes/upload.js'
import productsRouter from './routes/products.js'
import collectionsRouter from './routes/collections.js'
import inventoryRouter from './routes/inventory.js'
import ordersRouter from './routes/orders.js'
import customersRouter from './routes/customers.js'
import couponsRouter from './routes/coupons.js'
import reviewsRouter from './routes/reviews.js'
import cmsRouter from './routes/cms.js'
import settingsRouter from './routes/settings.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true, limit: '20mb' }))

// Request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString().slice(11, 19)}] ${req.method} ${req.path}`)
  next()
})

// API Routes
app.use('/api/auth', authRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/products', productsRouter)
app.use('/api/collections', collectionsRouter)
app.use('/api/inventory', inventoryRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/customers', customersRouter)
app.use('/api/coupons', couponsRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/cms', cmsRouter)
app.use('/api/settings', settingsRouter)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ZAMYAA Luxury E-Commerce Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  })
})

app.listen(PORT, () => {
  console.log(`\n✦ ZAMYAA Backend API Server running at http://localhost:${PORT}`)
  console.log(`✦ Cloudinary integration: ACTIVE (cloud: c8deakbl)`)
  console.log(`✦ REST endpoints active for Products, Orders, Inventory, Collections, CMS & Upload\n`)
})
