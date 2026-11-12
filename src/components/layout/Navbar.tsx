import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, User as UserIcon } from 'lucide-react'
import { useCartStore, useWishlistStore, useSearchStore } from '@/store'
import { useCustomerAuth } from '@/store/customerAuth'
import SearchOverlay from '../ui/SearchOverlay'
import Logo from '../ui/Logo'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: 'Shop', to: '/collections' },
  { label: 'About', to: '/about' },
  { label: 'Journal', to: '/journal' },
]

const overlayLinks = [
  { label: 'Home', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: 'Shop', to: '/collections' },
  { label: 'About', to: '/about' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openCart, getItemCount } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { openSearch } = useSearchStore()

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close overlay on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Accessible Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  const cartCount = getItemCount()
  const { user: customerUser, isAuthenticated } = useCustomerAuth()

  // Dynamic header styling according to .site-header specification:
  // On homepage at top: absolute top-0 left-0 transparent, pt-10 sm:pt-12 lg:pt-14 (approx 45-65px from top)
  // On homepage scrolled: fixed top-0 left-0 bg-white border-b border-[#eee]
  // On inner pages: sticky top-0 bg-white border-b border-[#eee]
  const headerClass = isHomePage
    ? isScrolled
      ? 'site-header is-scrolled fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-[#eee] shadow-[0_1px_8px_rgba(0,0,0,0.04)] h-20 flex items-center transition-all duration-300'
      : 'site-header absolute top-0 left-0 w-full z-50 bg-transparent pt-10 sm:pt-12 lg:pt-14 pb-4 transition-all duration-300'
    : 'site-header sticky top-0 left-0 w-full z-50 bg-white border-b border-[#eee] h-20 flex items-center shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all duration-300'

  return (
    <>
      {/* Announcement bar: shown on inner pages, or on homepage when scrolled */}
      {(!isHomePage || isScrolled) && (
        <div className="bg-black text-white py-2 px-5 md:px-16 text-center z-50 transition-all duration-300">
          <p className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold font-body">
            COMPLIMENTARY ALL OVER INDIA EXPRESS SHIPPING ON ORDERS OVER ₹15,000 · BESPOKE TAILORING ON REQUEST
          </p>
        </div>
      )}

      <header className={headerClass}>
        <div className="max-w-[1800px] w-full mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* LEFT: ZAMYAA logo with italic 'by Jyoti' subtitle */}
          <Logo size="md" className="shrink-0" />

          {/* RIGHT: Navigation links + Action icons + Minimal Hamburger */}
          <div className="flex items-center gap-6 xl:gap-9">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-[11px] xl:text-[12px] tracking-[0.22em] uppercase font-body font-medium transition-all duration-200 relative py-1 ${
                      isActive
                        ? 'text-black font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black'
                        : 'text-neutral-700 hover:text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions: Search, Wishlist, Cart & Minimal Hamburger Icon */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={openSearch}
                aria-label="Search"
                className="p-2 text-black hover:opacity-60 transition-opacity cursor-pointer"
              >
                <Search size={18} strokeWidth={1.6} />
              </button>

              <Link
                to={isAuthenticated ? '/account' : '/login'}
                aria-label={isAuthenticated ? `Account (${customerUser?.name || 'Customer'})` : 'Sign In'}
                title={isAuthenticated ? `Signed in as ${customerUser?.name}` : 'Sign In / Register'}
                className="p-2 text-black hover:opacity-60 transition-opacity cursor-pointer relative"
              >
                <UserIcon size={18} strokeWidth={1.6} />
                {isAuthenticated && (
                  <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-black rounded-full" />
                )}
              </Link>

              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="relative p-2 text-black hover:opacity-60 transition-opacity cursor-pointer"
              >
                <Heart size={18} strokeWidth={1.6} />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => openCart()}
                aria-label="Cart"
                className="relative p-2 text-black hover:opacity-60 transition-opacity cursor-pointer"
              >
                <ShoppingBag size={18} strokeWidth={1.6} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Minimal Hamburger Menu Button at far right */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Atelier Menu"
                title="Editorial Menu"
                className="p-2 text-black hover:opacity-60 transition-opacity cursor-pointer ml-1"
              >
                {mobileOpen ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
              </button>
            </div>
          </div>
        </div>

        {/* Elegant Editorial Navigation Overlay */}
        {mobileOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="fixed inset-0 bg-white/98 backdrop-blur-xl z-[60] flex flex-col justify-between p-6 sm:p-12 md:p-16 animate-in fade-in duration-200"
          >
            {/* Top Bar of Overlay */}
            <div className="flex items-center justify-between max-w-7xl w-full mx-auto pb-6 border-b border-[#eee]">
              <Logo size="md" />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-black hover:opacity-60 transition-opacity flex items-center gap-2 text-xs font-mono uppercase tracking-widest cursor-pointer"
                aria-label="Close menu"
              >
                <span>Close</span>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Menu Content: Main Editorial Links + Secondary Dossiers */}
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 py-10 my-auto items-center">
              {/* Primary Column: Big Serif Links */}
              <div className="md:col-span-6 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 block mb-2">
                  Atelier Navigation
                </span>
                {overlayLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className="block font-display text-3xl sm:text-4xl md:text-5xl text-black hover:translate-x-2 transition-transform duration-200 font-light"
                  >
                    {link.label}
                  </NavLink>
                ))}

                <div className="pt-4 mt-4 border-t border-neutral-200">
                  <NavLink
                    to={isAuthenticated ? '/account' : '/login'}
                    onClick={() => setMobileOpen(false)}
                    className="block font-display text-2xl sm:text-3xl text-neutral-800 hover:text-black hover:translate-x-2 transition-transform duration-200 font-light"
                  >
                    {isAuthenticated ? `My Account (${customerUser?.name?.split(' ')[0] || 'Client'})` : 'Sign In / Register'}
                  </NavLink>
                </div>
              </div>

              {/* Secondary Column: Live Capsules & Silhouettes */}
              <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t md:border-t-0 md:border-l border-[#eee] md:pl-12 pt-8 md:pt-0">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 block">
                    Live Capsules · SS'26
                  </span>
                  <div className="space-y-3 text-sm">
                    <Link
                      to="/collections/the-boho-flare-affair"
                      onClick={() => setMobileOpen(false)}
                      className="block group"
                    >
                      <span className="font-display text-lg text-black group-hover:underline block">
                        The Boho Flare Affair
                      </span>
                      <span className="text-xs text-neutral-500 font-body">Skirt Top · 2 Distinct Designs</span>
                    </Link>
                    <Link
                      to="/collections/lantana"
                      onClick={() => setMobileOpen(false)}
                      className="block group"
                    >
                      <span className="font-display text-lg text-black group-hover:underline block">
                        Lantana
                      </span>
                      <span className="text-xs text-neutral-500 font-body">Farshi Suit-Set · Soft Hues</span>
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 block">
                    Concierge & Atelier
                  </span>
                  <div className="space-y-2 text-xs text-neutral-600 font-body">
                    <p className="font-semibold text-black">Jaipur Atelier</p>
                    <p>Direct: +91 8427233901</p>
                    <p>Email: jyotisharam120099@gmail.com</p>
                    <a
                      href="https://wa.me/918427233901"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-black font-semibold uppercase tracking-wider pt-2 hover:underline"
                    >
                      WhatsApp Concierge <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar of Overlay */}
            <div className="max-w-7xl w-full mx-auto pt-6 border-t border-[#eee] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 font-body">
              <p>© 2026 ZAMYAA by Jyoti. Contemporary Indian Couture.</p>
              <p className="tracking-widest uppercase text-[10px] font-mono">Made in India · Jaipur Atelier</p>
            </div>
          </div>
        )}
      </header>

      <SearchOverlay />
    </>
  )
}
