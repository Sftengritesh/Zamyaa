import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useCustomerAuth } from '@/store/customerAuth'
import { api } from '@/services/api'

export default function CustomerRegisterPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useCustomerAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) {
    navigate('/account', { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || name.trim().length < 2) {
      setError('Please provide your full name (minimum 2 characters).')
      return
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email address.')
      return
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError('Password must contain at least one letter and one number.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password confirmation.')
      return
    }

    try {
      setLoading(true)
      const res = await api.post('/auth/register', {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      })

      if (res.data?.success && res.data?.token && res.data?.user) {
        login(res.data.token, res.data.user)
        navigate('/account', { replace: true })
      } else {
        setError(res.data?.message || 'Registration failed.')
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Unable to create account. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen py-16 px-6 md:px-12 flex items-center justify-center font-body"
      style={{ backgroundColor: 'var(--color-surface, #FAF9F5)' }}
    >
      <div className="max-w-md w-full bg-white border border-[#E5E5E5] p-8 md:p-12 shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 block mb-2">
            ZAMYAA BY JYOTI · PRIVATE ATELIER
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-normal text-neutral-900 tracking-tight">
            Create Account
          </h1>
          <p className="font-body text-xs text-neutral-500 mt-2 leading-relaxed">
            Register to track handcrafted luxury orders, save measurement profiles, and access limited archival capsules.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs font-body leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Radhika Sharma"
              className="w-full px-4 py-3 text-xs border border-neutral-300 focus:border-black outline-none transition-colors font-body bg-transparent"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. radhika@example.com"
              className="w-full px-4 py-3 text-xs border border-neutral-300 focus:border-black outline-none transition-colors font-body bg-transparent"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-1.5">
              Phone Number <span className="opacity-60">(for delivery coordination)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-4 py-3 text-xs border border-neutral-300 focus:border-black outline-none transition-colors font-body bg-transparent"
              autoComplete="tel"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-1.5">
              Password * <span className="opacity-60">(min 8 characters, letters & numbers)</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full px-4 py-3 text-xs border border-neutral-300 focus:border-black outline-none transition-colors font-body bg-transparent pr-10"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-1.5">
              Confirm Password *
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 text-xs border border-neutral-300 focus:border-black outline-none transition-colors font-body bg-transparent"
              autoComplete="new-password"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Atelier Account</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-100 text-center space-y-4">
          <p className="text-xs text-neutral-500 font-body">
            Already registered?{' '}
            <Link
              to="/login"
              className="text-black font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity ml-1"
            >
              Sign In Here
            </Link>
          </p>

          <div className="flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
            <CheckCircle2 size={12} className="text-emerald-600" />
            <span>Complimentary Concierge Support Included</span>
          </div>
        </div>
      </div>
    </div>
  )
}
