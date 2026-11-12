import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { isMongoActive } from '../db/mongo.js'
import { RefreshTokenModel } from '../models/RefreshToken.js'

const JWT_SECRET = process.env.JWT_SECRET || 'zamyaa_editorial_secret_jwt_2026_key'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || `${JWT_SECRET}_refresh_key`

export interface AuthUser {
  id: string
  email: string
  role: 'customer' | 'admin'
  name?: string
  familyId?: string
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser
}

// In-memory token family storage for development mode when MongoDB is inactive
interface DevRefreshTokenRecord {
  tokenHash: string
  userId: string
  userEmail: string
  role: 'customer' | 'admin'
  familyId: string
  isRevoked: boolean
  expiresAt: number
}
const devRefreshTokenStore = new Map<string, DevRefreshTokenRecord>()

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

// Generate short-lived access token + longer-lived refresh token
export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '15m' } // 15 minutes access token for enhanced security
  )
}

export function generateRefreshToken(user: AuthUser, familyId?: string): { token: string; familyId: string } {
  const activeFamilyId = familyId || crypto.randomUUID()
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      familyId: activeFamilyId,
      nonce: crypto.randomBytes(16).toString('hex'), // Guarantees a unique token string on every generation
    },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  )
  return { token, familyId: activeFamilyId }
}

// Store refresh token in persistent database or dev store
export async function persistRefreshToken(
  user: AuthUser,
  token: string,
  familyId: string
): Promise<void> {
  const tokenHash = hashToken(token)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  if (isMongoActive()) {
    await RefreshTokenModel.create({
      tokenHash,
      userId: user.id,
      userEmail: user.email.toLowerCase(),
      role: user.role,
      familyId,
      isRevoked: false,
      expiresAt,
    })
  } else {
    devRefreshTokenStore.set(tokenHash, {
      tokenHash,
      userId: user.id,
      userEmail: user.email.toLowerCase(),
      role: user.role,
      familyId,
      isRevoked: false,
      expiresAt: expiresAt.getTime(),
    })
  }
}

// Rotate refresh token with reuse detection
export async function rotateRefreshToken(oldToken: string): Promise<{
  newAccessToken: string
  newRefreshToken: string
  user: AuthUser
} | null> {
  let decoded: any = null
  try {
    decoded = jwt.verify(oldToken, JWT_REFRESH_SECRET) as any
  } catch {
    return null
  }

  const tokenHash = hashToken(oldToken)
  const familyId = decoded.familyId || decoded.id

  if (isMongoActive()) {
    const existing = await RefreshTokenModel.findOne({ tokenHash })

    // Reuse detection: If token was already revoked or not found in valid state
    if (!existing || existing.isRevoked) {
      // Security breach / token reuse detected: revoke the entire token family!
      if (familyId) {
        await RefreshTokenModel.updateMany({ familyId }, { isRevoked: true })
        console.warn(`[SECURITY ALERT] Refresh token reuse detected for family ${familyId}. Entire family revoked.`)
      }
      return null
    }

    // Revoke old token immediately (one-time use)
    existing.isRevoked = true
    await existing.save()

    // Issue new token pair
    const user: AuthUser = {
      id: existing.userId,
      email: existing.userEmail,
      role: existing.role,
      name: decoded.name,
    }

    const { token: newRefreshToken } = generateRefreshToken(user, familyId)
    await persistRefreshToken(user, newRefreshToken, familyId)
    const newAccessToken = generateToken(user)

    return { newAccessToken, newRefreshToken, user }
  } else {
    // Development fallback store
    const existing = devRefreshTokenStore.get(tokenHash)

    if (!existing || existing.isRevoked || Date.now() > existing.expiresAt) {
      if (familyId) {
        for (const [k, v] of devRefreshTokenStore.entries()) {
          if (v.familyId === familyId) {
            devRefreshTokenStore.set(k, { ...v, isRevoked: true })
          }
        }
        console.warn(`[DEV SECURITY] Refresh token reuse detected for family ${familyId}. Revoked.`)
      }
      return null
    }

    // Revoke old token
    existing.isRevoked = true
    devRefreshTokenStore.set(tokenHash, existing)

    const user: AuthUser = {
      id: existing.userId,
      email: existing.userEmail,
      role: existing.role,
      name: decoded.name,
    }

    const { token: newRefreshToken } = generateRefreshToken(user, familyId)
    await persistRefreshToken(user, newRefreshToken, familyId)
    const newAccessToken = generateToken(user)

    return { newAccessToken, newRefreshToken, user }
  }
}

// Revoke all tokens for a user or a specific family on logout
export async function revokeSessionTokens(token?: string, userId?: string): Promise<void> {
  if (token) {
    const tokenHash = hashToken(token)
    if (isMongoActive()) {
      const existing = await RefreshTokenModel.findOne({ tokenHash })
      if (existing) {
        await RefreshTokenModel.updateMany({ familyId: existing.familyId }, { isRevoked: true })
      }
    } else {
      const existing = devRefreshTokenStore.get(tokenHash)
      if (existing) {
        for (const [k, v] of devRefreshTokenStore.entries()) {
          if (v.familyId === existing.familyId) {
            devRefreshTokenStore.set(k, { ...v, isRevoked: true })
          }
        }
      }
    }
  }

  if (userId) {
    if (isMongoActive()) {
      await RefreshTokenModel.updateMany({ userId }, { isRevoked: true })
    } else {
      for (const [k, v] of devRefreshTokenStore.entries()) {
        if (v.userId === userId) {
          devRefreshTokenStore.set(k, { ...v, isRevoked: true })
        }
      }
    }
  }
}

export function verifyRefreshToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as AuthUser
  } catch {
    return null
  }
}

// Cookie helpers for HttpOnly secure cookie sessions
export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  const isProduction = process.env.NODE_ENV === 'production'

  // Access token cookie (15 minutes)
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 15 * 60 * 1000,
    path: '/',
  })

  // Refresh token cookie (7 days) restricted strictly to auth endpoints
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/api/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
}

export function clearAuthCookies(res: Response) {
  const isProduction = process.env.NODE_ENV === 'production'
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
  })
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/api/auth',
  })
}

export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(plainText, salt)
}

export async function verifyPassword(plainText: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plainText, hashed)
}

function extractToken(req: Request): string | null {
  // Check Authorization Bearer header first
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1]
  }

  // Check HttpOnly cookie
  if (req.cookies && req.cookies.accessToken) {
    return req.cookies.accessToken
  }

  return null
}

// Authentication middleware (requires valid session)
export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = extractToken(req)

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please sign in to proceed.',
    })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    req.user = decoded
    next()
  } catch {
    // If access token expired, attempt auto-refresh using refreshToken cookie/header
    const refreshToken = (req.cookies && req.cookies.refreshToken) || (req.headers['x-refresh-token'] as string)
    if (refreshToken) {
      rotateRefreshToken(refreshToken)
        .then((rotated) => {
          if (rotated) {
            setAuthCookies(res, rotated.newAccessToken, rotated.newRefreshToken)
            res.setHeader('x-new-access-token', rotated.newAccessToken)
            req.user = rotated.user
            return next()
          } else {
            return res.status(401).json({
              success: false,
              message: 'Session expired or invalid. Please sign in again.',
            })
          }
        })
        .catch(() => {
          return res.status(401).json({
            success: false,
            message: 'Session expired or invalid. Please sign in again.',
          })
        })
      return
    }

    return res.status(401).json({
      success: false,
      message: 'Session expired or invalid. Please sign in again.',
    })
  }
}

// Optional authentication middleware (for guest checkout where user may or may not be logged in)
export function optionalAuth(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const token = extractToken(req)

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
      req.user = decoded
    } catch {
      // Ignore token failure for optional endpoints
    }
  }

  next()
}

// Role-based authorization middleware
export function requireRole(allowedRole: 'admin' | 'customer') {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      })
    }

    if (req.user.role !== allowedRole) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: This resource requires ${allowedRole} privileges.`,
      })
    }

    next()
  }
}

export const requireAdmin = requireRole('admin')

// In-memory rate limiter for authentication endpoints (prevents brute force / enumeration)
interface RateLimitRecord {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitRecord>()

export function authRateLimiter(maxAttempts = 15, windowMs = 15 * 60 * 1000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown-client'
    const now = Date.now()

    const record = rateLimitMap.get(clientIp)

    if (!record || now > record.resetTime) {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + windowMs })
      return next()
    }

    if (record.count >= maxAttempts) {
      const waitMinutes = Math.ceil((record.resetTime - now) / 60000)
      return res.status(429).json({
        success: false,
        message: `Too many login/registration attempts. Please wait ${waitMinutes} minute(s) before trying again.`,
      })
    }

    record.count += 1
    next()
  }
}
