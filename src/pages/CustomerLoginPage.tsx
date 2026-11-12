import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'
import { useCustomerAuth } from '@/store/customerAuth'
import { api } from '@/services/api'

export default function CustomerLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useCustomerAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect destination if redirected from a protected route
  const from = (location.state as any)?.from?.pathname || '/account'

  if (isAuthenticated) {
    navigate('/account', { replace: true })
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password) {
      setError('Please provide both your email address and password.')
      return
    }

    try {
      setLoading(true)
      const res = await api.post('/auth/login', {
        email: email.trim(),
        password,
      })

      if (res.data?.success && res.data?.token && res.data?.user) {
        login(res.data.token, res.data.user)
        navigate(from, { replace: true })
      } else {
        setError(res.data?.message || 'Invalid email or password.')
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid email or password. Please try again.'
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
        {/* Atelier Monogram & Subtitle */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 block mb-2">
            CLIENT PORTAL · ZAMYAA ATELIER
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-normal text-neutral-900 tracking-tight">
            Sign In
          </h1>
          <p className="font-body text-xs text-neutral-500 mt-2 leading-relaxed">
            Access your curated order history, bespoke garment dossiers, and privilege services.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs font-body leading-relaxed flex items-center gap-2">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. client@example.com"
              className="w-full px-4 py-3 text-xs border border-neutral-300 focus:border-black outline-none transition-colors font-body bg-transparent"
              autoComplete="email"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-600">
                Password *
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 text-xs border border-neutral-300 focus:border-black outline-none transition-colors font-body bg-transparent pr-10"
                autoComplete="current-password"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Atelier</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-100 text-center space-y-4">
          <p className="text-xs text-neutral-500 font-body">
            New to ZAMYAA by Jyoti?{' '}
            <Link
              to="/register"
              className="text-black font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity ml-1"
            >
              Create an Account
            </Link>
          </p>

          <div className="flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-wider text-neutral-400 pt-2">
            <ShieldCheck size={12} />
            <span>End-to-End Encrypted Session</span>
          </div>
        </div>
      </div>
    </div>
  )
}

