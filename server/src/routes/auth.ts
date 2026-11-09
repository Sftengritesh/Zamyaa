import { Router, Request, Response } from 'express'

const authRouter = Router()

// Default admin credentials
const ADMIN_USER = {
  id: 'admin-1',
  name: 'Jyoti',
  email: 'admin@zamyaa.in',
  role: 'admin',
  avatar:
    'https://lh3.googleusercontent.com/aida/ALJJyrD759jmYcCtoAdsw5gbg0YSxHGzRR7NjGvDcATz4Q4_6ZVlR4AQjLDLXdvlUsVfu46daXeF2kvvYvm2MxAmdLbYfftW3CZC19ZfWoRWq9k9bIl-btJqbFvL_EEdn2S1UUyk6pezmG-Vcbp0zKr0fCNqQmcsbshwAJs9VEOihjTIIdUbnb0CyPM70409ouLtcIdwWANJUeeD7lKu-LqIuz1NCkLRTpbWsuctuAyZ_rj63A',
}

let adminPassword = 'admin' // Simple default password for designer: 'admin' or 'zamyaa123'

// Admin Login
authRouter.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' })
  }

  // Allow login with either admin@zamyaa.in or jyoti@zamyaa.in or demo credentials
  const validEmails = ['admin@zamyaa.in', 'jyoti@zamyaa.in', 'jyoti']
  const isEmailMatch = validEmails.includes(email.trim().toLowerCase()) || email.includes('admin')
  const isPasswordMatch =
    password === adminPassword || password === 'admin' || password === 'zamyaa123' || password === '123456'

  if (isEmailMatch && isPasswordMatch) {
    const token = `zy_adm_token_${Date.now()}_${Math.random().toString(36).slice(2)}`
    return res.json({
      success: true,
      token,
      user: {
        ...ADMIN_USER,
        email: email.trim().toLowerCase(),
      },
      message: 'Welcome back to the ZAMYAA Atelier Admin, Jyoti.',
    })
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials. Hint: use admin@zamyaa.in and password "admin"',
  })
})

// Current user check
authRouter.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return res.json({ success: true, user: ADMIN_USER })
  }
  return res.status(401).json({ success: false, message: 'Unauthorized session' })
})

// Forgot password
authRouter.post('/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' })
  }
  res.json({
    success: true,
    message: `Password reset instructions have been dispatched to ${email}.`,
  })
})

// Reset password
authRouter.post('/reset-password', (req: Request, res: Response) => {
  const { newPassword } = req.body
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ success: false, message: 'Password must be at least 4 characters' })
  }
  adminPassword = newPassword
  res.json({ success: true, message: 'Password has been successfully updated.' })
})

export default authRouter

