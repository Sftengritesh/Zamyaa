import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Shirt,
  Boxes,
  FolderKanban,
  ShoppingBag,
  Users,
  Percent,
  LayoutTemplate,
  Star,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  BookOpen,
} from 'lucide-react'
import { useAdminAuth } from '@/store/adminAuth'
import { api } from '@/services/api'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Shirt },
  { to: '/admin/inventory', label: 'Inventory', icon: Boxes },
  { to: '/admin/collections', label: 'Collections', icon: FolderKanban },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag, hasBadge: true },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/discounts', label: 'Discounts', icon: Percent },
  { to: '/admin/homepage', label: 'Homepage CMS', icon: LayoutTemplate },
  { to: '/admin/journal', label: 'Journal Articles', icon: BookOpen },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/settings', label: 'Store Settings', icon: Settings },
]

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0)
  const { user, logout } = useAdminAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch pending orders count for badge
    api
      .get('/orders?status=pending')
      .then((res) => {
        if (res.data?.count !== undefined) {
          setPendingOrdersCount(res.data.count)
        }
      })
      .catch(() => {})
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] flex font-body">
      {/* ── DESKTOP SIDEBAR (Strict black & white) ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0a0a0a] text-white fixed top-0 bottom-0 left-0 z-40 select-none border-r border-[#222]">
        {/* Brand header */}
        <div className="p-6 border-b border-[#222]">
          <Link to="/admin" className="block">
            <span className="font-display font-bold text-xl tracking-[0.25em] block text-white leading-none">
              ZAMYAA
            </span>
            <span className="font-body italic text-[0.65rem] tracking-[0.15em] text-[#888] block mt-1">
              by jyoti · atelier admin
            </span>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-[#999] hover:text-white hover:bg-[#181818]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                {item.hasBadge && pendingOrdersCount > 0 && (
                  <span className="bg-red-600 text-white text-[0.625rem] px-1.5 py-0.5 rounded-full font-bold">
                    {pendingOrdersCount}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Live Storefront quick link */}
        <div className="p-4 border-t border-[#222]">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider text-[#aaa] hover:text-white hover:bg-[#161616] rounded transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} /> View Storefront
            </span>
            <span className="text-[0.65rem] text-[#666]">Live</span>
          </a>
        </div>

        {/* User profile footer */}
        <div className="p-4 bg-[#111] border-t border-[#222] flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={
                user?.avatar ||
                'https://lh3.googleusercontent.com/aida/ALJJyrD759jmYcCtoAdsw5gbg0YSxHGzRR7NjGvDcATz4Q4_6ZVlR4AQjLDLXdvlUsVfu46daXeF2kvvYvm2MxAmdLbYfftW3CZC19ZfWoRWq9k9bIl-btJqbFvL_EEdn2S1UUyk6pezmG-Vcbp0zKr0fCNqQmcsbshwAJs9VEOihjTIIdUbnb0CyPM70409ouLtcIdwWANJUeeD7lKu-LqIuz1NCkLRTpbWsuctuAyZ_rj63A'
              }
              alt="Jyoti"
              className="w-9 h-9 rounded-full object-cover border border-[#444] shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate leading-tight">
                {user?.name || 'Jyoti'}
              </p>
              <p className="text-[0.625rem] text-[#888] truncate mt-0.5">Founder & Designer</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="text-[#888] hover:text-red-400 p-1.5 rounded transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* ── MOBILE HEADER ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a] text-white z-50 flex items-center justify-between px-5 border-b border-[#222]">
        <Link to="/admin" className="flex items-center gap-2">
          <span className="font-display font-bold text-lg tracking-[0.2em]">ZAMYAA</span>
          <span className="text-[0.65rem] text-[#888] italic">admin</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-white hover:text-[#bbb]"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm pt-16">
          <div className="bg-[#0a0a0a] text-white p-5 space-y-2 border-b border-[#333] max-h-[85vh] overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded text-xs uppercase tracking-wider font-semibold ${
                      isActive ? 'bg-white text-black' : 'text-[#aaa]'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
            <div className="pt-4 border-t border-[#222] flex justify-between items-center">
              <a href="/" target="_blank" className="text-xs text-[#aaa] flex items-center gap-2">
                <ExternalLink size={14} /> View Storefront
              </a>
              <button
                onClick={handleLogout}
                className="text-xs text-red-400 flex items-center gap-1.5"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN WORKSPACE ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen pt-16 lg:pt-0">
        {/* Workspace Top Header Bar */}
        <header className="hidden lg:flex h-16 bg-white border-b border-[#e5e5e5] px-8 items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#888] font-semibold">
              Atelier Workspace
            </span>
            <span className="text-[#ccc]">/</span>
            <span className="text-xs font-semibold text-[#111]">Management Console</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs tracking-wider uppercase font-semibold text-[#555] hover:text-black flex items-center gap-1.5 py-1.5 px-3 border border-[#ddd] rounded hover:border-black transition-all"
            >
              <ExternalLink size={13} /> View Live Site
            </a>
            <div className="h-4 w-[1px] bg-[#e0e0e0]" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-[#666] font-medium">Cloudinary CDN Active</span>
            </div>
          </div>
        </header>

        {/* Child Pages Content */}
        <main className="flex-1 p-6 lg:p-10 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
