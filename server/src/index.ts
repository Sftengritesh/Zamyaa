import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

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
import journalRouter from './routes/journal.js'
import paymentsRouter from './routes/payments.js'
import { connectMongo } from './db/mongo.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Initialize MongoDB connection (falls back safely to local db.json if URI omitted)
connectMongo().catch((err) => console.warn('MongoDB Init Exception:', err))

// Explicit CORS allowlist for storefront domains
const rawAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://zamyaa.in',
  'https://www.zamyaa.in',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[]

const allowedOrigins = Array.from(new Set(rawAllowedOrigins.map((o) => o.replace(/\/$/, ''))))

app.use(
  cors({
    origin: (origin, callback) => {
      // In development or for non-browser/same-origin requests without an Origin header
      if (!origin) {
        return callback(null, true)
      }
      const normalizedOrigin = origin.replace(/\/$/, '')
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true)
      }
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true)
      }
      console.warn(`[CORS BLOCKED] Rejected unauthorized origin: ${origin}`)
      return callback(new Error(`CORS policy does not allow access from origin: ${origin}`))
    },
    credentials: true,
  })
)
app.use(cookieParser())

// CSRF Protection for cookie-authenticated state-changing requests
app.use((req, res, next) => {
  const isStateChanging = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)
  const isCookieAuth = Boolean(req.cookies?.accessToken || req.cookies?.refreshToken)
  const isAuthHeaderPresent = Boolean(req.headers.authorization)

  // Webhooks from external providers (e.g. Razorpay) use cryptographic HMAC signatures rather than user cookies
  const isWebhook = req.path.includes('/webhook')

  if (isStateChanging && isCookieAuth && !isAuthHeaderPresent && !isWebhook) {
    const origin = req.headers.origin || req.headers.referer
    if (origin) {
      const originMatch = allowedOrigins.some((allowed) => origin.startsWith(allowed))
      if (!originMatch) {
        console.warn(`[CSRF BLOCKED] Suspicious request from foreign origin: ${origin} to ${req.path}`)
        return res.status(403).json({
          success: false,
          message: 'Cross-Site Request Forgery (CSRF) check failed: Untrusted request origin.',
        })
      }
    }
  }
  next()
})
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
app.use('/api/payments', paymentsRouter)
app.use('/api/customers', customersRouter)
app.use('/api/coupons', couponsRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/cms', cmsRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/journal', journalRouter)

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

