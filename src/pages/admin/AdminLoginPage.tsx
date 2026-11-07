import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react'
import { useAdminAuth } from '@/store/adminAuth'
import { api } from '@/services/api'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@zamyaa.in')
  const [password, setPassword] = useState('admin')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [forgotModalOpen, setForgotModalOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSuccess, setForgotSuccess] = useState(false)

  const { login } = useAdminAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await api.post('/auth/login', { email, password })
      if (res.data.success) {
        login(res.data.token, res.data.user)
        navigate('/admin')
      } else {
        setError(res.data.message || 'Login failed')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/auth/forgot-password', { email: forgotEmail })
      setForgotSuccess(true)
    } catch {
      setForgotSuccess(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col justify-between font-body relative overflow-hidden">
      {/* Background ambient luxury styling */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="p-8 md:p-12 flex justify-between items-center z-10">
        <div>
          <span className="font-display font-bold text-2xl tracking-[0.28em] block text-white">
            ZAMYAA
          </span>
          <span className="font-body italic text-xs tracking-[0.16em] text-[#888] block">
            by jyoti · atelier admin
          </span>
        </div>
        <a
          href="/"
          className="text-xs uppercase tracking-widest text-[#888] hover:text-white transition-colors"
        >
          ← Back to Storefront
        </a>
      </header>

      {/* Center Auth Card */}
      <div className="w-full max-w-md mx-auto px-6 py-8 z-10">
        <div className="bg-[#141414] border border-[#2a2a2a] p-8 md:p-10 shadow-2xl rounded-sm">
          <div className="text-center mb-8">
            <span className="text-[0.6875rem] uppercase tracking-[0.25em] font-semibold text-[#888] block mb-2">
              AUTHENTICATED ACCESS ONLY
            </span>
            <h1 className="font-display text-3xl font-normal text-white">Atelier Console</h1>
            <p className="text-xs text-[#777] mt-2">
              Sign in to manage your collections, inventory, orders, and storefront banners.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-3">
              <AlertCircle size={16} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#aaa] mb-2">
                Designer Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-[#666]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-[#333] pl-10 pr-4 py-3 text-sm text-white placeholder-[#555] rounded-none outline-none focus:border-white transition-colors"
                  placeholder="admin@zamyaa.in"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#aaa]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[0.6875rem] text-[#888] hover:text-white transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3.5 text-[#666]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-[#333] pl-10 pr-4 py-3 text-sm text-white placeholder-[#555] rounded-none outline-none focus:border-white transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-white text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#eaeaea] transition-all duration-200 flex items-center justify-center gap-2 mt-4 shadow-md disabled:opacity-50"
            >
              {loading ? 'AUTHENTICATING...' : 'ENTER DASHBOARD'} <ArrowRight size={14} />
            </button>
          </form>

          {/* Quick login hint for designer */}
          <div className="mt-8 pt-6 border-t border-[#222] text-center">
            <p className="text-[0.6875rem] text-[#666] leading-relaxed">
              Default credentials for Jyoti:
              <br />
              <span className="text-[#aaa] font-mono">admin@zamyaa.in</span> /{' '}
              <span className="text-[#aaa] font-mono">admin</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-8 text-center text-xs text-[#555] z-10">
        <p>© {new Date().getFullYear()} ZAMYAA Atelier Management Platform · End-to-End Encrypted</p>
      </footer>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#181818] border border-[#333] p-8 max-w-sm w-full">
            <h2 className="font-display text-xl font-semibold mb-2">Reset Password</h2>
            <p className="text-xs text-[#888] mb-5 leading-relaxed">
              Enter your email address and we will dispatch a secure recovery access link.
            </p>

            {forgotSuccess ? (
              <div className="p-4 bg-green-950/60 border border-green-800 text-green-200 text-xs mb-4">
                Recovery link dispatched. Please check your inbox.
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="admin@zamyaa.in"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full bg-[#222] border border-[#444] px-4 py-2.5 text-xs text-white outline-none focus:border-white"
                />
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotModalOpen(false)
                      setForgotSuccess(false)
                    }}
                    className="px-4 py-2 text-xs uppercase text-[#888] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-white text-black text-xs uppercase font-bold hover:bg-[#eee]"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
