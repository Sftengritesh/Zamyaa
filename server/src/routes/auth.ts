import { Router, Request, Response } from 'express'
import {
  generateToken,
  generateRefreshToken,
  persistRefreshToken,
  rotateRefreshToken,
  revokeSessionTokens,
  setAuthCookies,
  clearAuthCookies,
  hashPassword,
  verifyPassword,
  authMiddleware,
  authRateLimiter,
  AuthenticatedRequest,
} from '../middleware/auth.js'
import { db } from '../db/store.js'
import { isMongoActive } from '../db/mongo.js'
import { UserModel } from '../models/User.js'

const authRouter = Router()

// Default fallback admin credentials for bootstrapping
const DEFAULT_ADMIN = {
  id: 'admin-1',
  name: 'Jyoti Sharma',
  email: 'admin@zamyaa.in',
  role: 'admin' as const,
  status: 'active' as const,
  avatar:
    'https://lh3.googleusercontent.com/aida/ALJJyrD759jmYcCtoAdsw5gbg0YSxHGzRR7NjGvDcATz4Q4_6ZVlR4AQjLDLXdvlUsVfu46daXeF2kvvYvm2MxAmdLbYfftW3CZC19ZfWoRWq9k9bIl-btJqbFvL_EEdn2S1UUyk6pezmG-Vcbp0zKr0fCNqQmcsbshwAJs9VEOihjTIIdUbnb0CyPM70409ouLtcIdwWANJUeeD7lKu-LqIuz1NCkLRTpbWsuctuAyZ_rj63A',
}

// ── CUSTOMER REGISTRATION ──
authRouter.post('/register', authRateLimiter(15, 15 * 60 * 1000), async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Please enter a valid full name (minimum 2 characters).' })
    }

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'Invalid email address format.' })
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters and contain both letters and numbers.',
      })
    }

    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    if (!hasLetter || !hasNumber) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least one letter and one number.',
      })
    }

    // 2. Prevent Duplicate Email Registration
    let existingUser: any = null
    if (isMongoActive()) {
      existingUser = await UserModel.findOne({ email: normalizedEmail })
    } else {
      existingUser = db.getUserByEmail(normalizedEmail)
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please sign in.',
      })
    }

    // 3. Hash Password (never store plaintext)
    const hashedPassword = await hashPassword(password)

    // 4. Create User (Role strictly locked to 'customer' — prevent self-promotion)
    let savedUser: any = null
    const userData = {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: 'customer' as const,
      status: 'active' as const,
      phone: phone ? String(phone).trim() : '',
      addresses: [],
    }

    if (isMongoActive()) {
      const created = await UserModel.create(userData)
      savedUser = created.toSafeJSON()
    } else {
      const created = db.createUser(userData)
      savedUser = {
        id: created.id,
        name: created.name,
        email: created.email,
        role: created.role,
        status: created.status,
        phone: created.phone,
        addresses: created.addresses || [],
        createdAt: created.createdAt,
      }
    }

    // 5. Issue Tokens & HttpOnly Cookies
    const accessToken = generateToken({
      id: savedUser.id,
      email: savedUser.email,
      role: 'customer',
      name: savedUser.name,
    })
    const { token: refreshToken, familyId } = generateRefreshToken({
      id: savedUser.id,
      email: savedUser.email,
      role: 'customer',
    })
    await persistRefreshToken(savedUser as any, refreshToken, familyId)

    setAuthCookies(res, accessToken, refreshToken)

    return res.status(201).json({
      success: true,
      token: accessToken,
      refreshToken,
      user: savedUser,
      message: 'Welcome to ZAMYAA. Your atelier account has been created.',
    })
  } catch (err: any) {
    console.error('Registration Error:', err)
    return res.status(500).json({ success: false, message: 'Registration failed. Please try again.' })
  }
})

// ── CUSTOMER & UNIFIED LOGIN ──
authRouter.post('/login', authRateLimiter(20, 15 * 60 * 1000), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' })
    }

    const normalizedEmail = String(email).trim().toLowerCase()

    // Find User in MongoDB or local store
    let user: any = null
    if (isMongoActive()) {
      user = await UserModel.findOne({ email: normalizedEmail })
    } else {
      user = db.getUserByEmail(normalizedEmail)
    }

    // Fallback support for default admin if running locally or not yet seeded
    if (!user && (normalizedEmail === 'admin@zamyaa.in' || normalizedEmail === 'jyoti@zamyaa.in') && process.env.NODE_ENV !== 'production') {
      const isPassValid = password === 'admin' || password === 'zamyaa123' || password === process.env.ADMIN_INITIAL_PASSWORD
      if (isPassValid) {
        const token = generateToken({
          id: DEFAULT_ADMIN.id,
          email: DEFAULT_ADMIN.email,
          role: 'admin',
          name: DEFAULT_ADMIN.name,
        })
        const { token: refreshToken, familyId } = generateRefreshToken({
          id: DEFAULT_ADMIN.id,
          email: DEFAULT_ADMIN.email,
          role: 'admin',
        })
        await persistRefreshToken(DEFAULT_ADMIN as any, refreshToken, familyId)
        setAuthCookies(res, token, refreshToken)
        return res.json({
          success: true,
          token,
          refreshToken,
          user: DEFAULT_ADMIN,
          message: 'Welcome back to ZAMYAA Atelier Admin.',
        })
      }
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    // Verify status
    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'This account has been suspended. Please contact concierge.' })
    }

    // Verify Password
    const isPasswordMatch = await verifyPassword(String(password), user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' })
    }

    const safeUser = {
      id: user.id || user._id?.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone || '',
      avatar: user.avatar || '',
      addresses: user.addresses || [],
      createdAt: user.createdAt,
    }

    const accessToken = generateToken({
      id: safeUser.id,
      email: safeUser.email,
      role: safeUser.role,
      name: safeUser.name,
    })
    const { token: refreshToken, familyId } = generateRefreshToken({
      id: safeUser.id,
      email: safeUser.email,
      role: safeUser.role,
    })
    await persistRefreshToken(safeUser as any, refreshToken, familyId)

    setAuthCookies(res, accessToken, refreshToken)

    return res.json({
      success: true,
      token: accessToken,
      refreshToken,
      user: safeUser,
      message: `Welcome back, ${safeUser.name}.`,
    })
  } catch (err: any) {
    console.error('Login Error:', err)
    return res.status(500).json({ success: false, message: 'Authentication error. Please try again.' })
  }
})

// ── DEDICATED ADMIN LOGIN ──
// Strictly enforces admin role — customers attempting to log in here are rejected
authRouter.post('/admin/login', authRateLimiter(15, 15 * 60 * 1000), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Administrator credentials required.' })
    }

    const normalizedEmail = String(email).trim().toLowerCase()

    // 1. Check MongoDB or store
    let user: any = null
    if (isMongoActive()) {
      user = await UserModel.findOne({ email: normalizedEmail })
    } else {
      user = db.getUserByEmail(normalizedEmail)
    }

    // 2. Fallback check for bootstrap admin only in non-production
    if (!user && (normalizedEmail === 'admin@zamyaa.in' || normalizedEmail === 'jyoti@zamyaa.in') && process.env.NODE_ENV !== 'production') {
      const isPassValid = password === 'admin' || password === 'zamyaa123' || password === process.env.ADMIN_INITIAL_PASSWORD
      if (isPassValid) {
        const token = generateToken({
          id: DEFAULT_ADMIN.id,
          email: DEFAULT_ADMIN.email,
          role: 'admin',
          name: DEFAULT_ADMIN.name,
        })
        const { token: refreshToken, familyId } = generateRefreshToken({
          id: DEFAULT_ADMIN.id,
          email: DEFAULT_ADMIN.email,
          role: 'admin',
        })
        await persistRefreshToken(DEFAULT_ADMIN as any, refreshToken, familyId)
        setAuthCookies(res, token, refreshToken)
        return res.json({
          success: true,
          token,
          refreshToken,
          user: DEFAULT_ADMIN,
          message: 'Welcome back to ZAMYAA Atelier Admin.',
        })
      }
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid administrator credentials.' })
    }

    // Check Role: Customers CANNOT log into admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Administrator privileges required.',
      })
    }

    const isMatch = await verifyPassword(String(password), user.password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid administrator credentials.' })
    }

    const safeUser = {
      id: user.id || user._id?.toString(),
      name: user.name,
      email: user.email,
      role: 'admin' as const,
      status: user.status,
      avatar: user.avatar || DEFAULT_ADMIN.avatar,
    }

    const token = generateToken({
      id: safeUser.id,
      email: safeUser.email,
      role: 'admin',
      name: safeUser.name,
    })
    const { token: refreshToken, familyId } = generateRefreshToken({
      id: safeUser.id,
      email: safeUser.email,
      role: 'admin',
    })
    await persistRefreshToken(safeUser as any, refreshToken, familyId)

    setAuthCookies(res, token, refreshToken)

    return res.json({
      success: true,
      token,
      refreshToken,
      user: safeUser,
      message: 'Administrator session authenticated.',
    })
  } catch (err: any) {
    console.error('Admin Login Error:', err)
    return res.status(500).json({ success: false, message: 'Admin login processing error.' })
  }
})

// ── LOGOUT ──
authRouter.post('/logout', async (req: Request, res: Response) => {
  const refreshToken = (req.cookies && req.cookies.refreshToken) || req.body.refreshToken || (req.headers['x-refresh-token'] as string)
  await revokeSessionTokens(refreshToken)
  clearAuthCookies(res)
  res.json({ success: true, message: 'Successfully signed out of your session.' })
})

// ── CURRENT AUTHENTICATED USER SESSION CHECK ──
authRouter.get('/me', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const email = req.user?.email

    let foundUser: any = null
    if (isMongoActive() && userId) {
      foundUser = await UserModel.findById(userId)
    } else if (userId) {
      foundUser = db.getUserById(userId) || db.getUserByEmail(email || '')
    }

    if (!foundUser) {
      // If admin fallback session
      if (req.user?.role === 'admin') {
        return res.json({ success: true, user: DEFAULT_ADMIN })
      }
      return res.status(404).json({ success: false, message: 'User account not found.' })
    }

    const safeUser = {
      id: foundUser.id || foundUser._id?.toString(),
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      status: foundUser.status,
      phone: foundUser.phone || '',
      avatar: foundUser.avatar || '',
      addresses: foundUser.addresses || [],
      createdAt: foundUser.createdAt,
    }

    return res.json({ success: true, user: safeUser })
  } catch (err: any) {
    console.error('Session Check Error:', err)
    return res.status(500).json({ success: false, message: 'Failed to verify session.' })
  }
})

// ── UPDATE CUSTOMER PROFILE ──
authRouter.put('/profile', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { name, phone, addresses } = req.body

    const updates: Record<string, any> = {}
    if (name && typeof name === 'string' && name.trim().length >= 2) {
      updates.name = name.trim()
    }
    if (phone !== undefined) {
      updates.phone = String(phone).trim()
    }
    if (Array.isArray(addresses)) {
      updates.addresses = addresses
    }

    // Role escalation guard: NEVER allow updating role or status from profile endpoint
    delete updates.role
    delete updates.status
    delete updates.password
    delete updates.email

    let updatedUser: any = null
    if (isMongoActive() && userId) {
      const doc = await UserModel.findByIdAndUpdate(userId, updates, { new: true })
      if (doc) updatedUser = doc.toSafeJSON()
    } else if (userId) {
      updatedUser = db.updateUser(userId, updates)
    }

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' })
    }

    const safeUser = {
      id: updatedUser.id || updatedUser._id?.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      status: updatedUser.status,
      phone: updatedUser.phone || '',
      addresses: updatedUser.addresses || [],
    }

    return res.json({
      success: true,
      user: safeUser,
      message: 'Profile details updated successfully.',
    })
  } catch (err: any) {
    console.error('Profile Update Error:', err)
    return res.status(500).json({ success: false, message: 'Failed to update profile.' })
  }
})

// ── REFRESH TOKEN (Rotation & Reuse Detection) ──
authRouter.post('/refresh', authRateLimiter(30, 15 * 60 * 1000), async (req: Request, res: Response) => {
  const refreshToken = (req.cookies && req.cookies.refreshToken) || req.body.refreshToken || (req.headers['x-refresh-token'] as string)

  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh token required.' })
  }

  const rotated = await rotateRefreshToken(refreshToken)
  if (!rotated) {
    clearAuthCookies(res)
    return res.status(401).json({
      success: false,
      message: 'Invalid, expired, or reused refresh token. Please sign in again.',
    })
  }

  setAuthCookies(res, rotated.newAccessToken, rotated.newRefreshToken)

  return res.json({
    success: true,
    token: rotated.newAccessToken,
    refreshToken: rotated.newRefreshToken,
    user: rotated.user,
  })
})

export default authRouter
