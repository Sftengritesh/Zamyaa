import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, Heart, ShoppingBag, User, Menu, X, Moon, Sun } from 'lucide-react'
import { useCartStore, useWishlistStore, useSearchStore, useThemeStore } from '@/store'
import SearchOverlay from '../ui/SearchOverlay'
import Logo from '../ui/Logo'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: 'Shop All', to: '/collections?filter=all' },
  { label: 'New In', to: '/collections?filter=new' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openCart, getItemCount } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { openSearch } = useSearchStore()
  const { isDark, toggle } = useThemeStore()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cartCount = getItemCount()

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[var(--color-primary)] text-[var(--color-on-primary)] py-2 px-5 md:px-16 text-center z-50">
        <p className="text-[0.6875rem] tracking-[0.22em] uppercase font-semibold font-body">
          COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER ₹15,000 · BESPOKE TAILORING ON REQUEST
        </p>
      </div>

      <header
        className={`sticky top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--color-surface-container-lowest)]/95 backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
            : 'bg-[var(--color-surface-container-lowest)]/90 backdrop-blur-sm'
        }`}
      >
        <div className="h-20 max-w-7xl mx-auto px-5 md:px-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Logo size="md" className="shrink-0" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 h-full">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-[0.8125rem] tracking-[0.18em] uppercase font-body font-semibold py-2 border-b transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                      : 'text-[var(--color-on-surface-variant)] border-transparent hover:text-[var(--color-on-surface)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={openSearch}
              aria-label="Search"
              className="p-2 text-[var(--color-on-surface)] hover:text-[var(--color-secondary)] transition-colors"
            >
              <Search size={20} />
            </button>

            <Link
              to="/wishlist"
              className="relative p-2 text-[var(--color-on-surface)] hover:text-[var(--color-secondary)] transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-primary)] text-[var(--color-on-primary)] text-[0.5rem] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/account"
              className="p-2 text-[var(--color-on-surface)] hover:text-[var(--color-secondary)] transition-colors hidden md:flex"
              aria-label="Account"
            >
              <User size={20} />
            </Link>

            <button
              onClick={() => openCart()}
              className="relative p-2 text-[var(--color-on-surface)] hover:text-[var(--color-secondary)] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[var(--color-primary)] text-[var(--color-on-primary)] text-[0.5rem] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-2 text-[var(--color-on-surface)] hover:text-[var(--color-secondary)] transition-colors hidden md:flex"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[var(--color-on-surface)] lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[var(--color-surface-container-lowest)] border-t border-[var(--color-outline-variant)] px-5 py-6 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block text-[0.9rem] tracking-[0.14em] uppercase font-body font-semibold py-2 border-b border-transparent transition-colors ${
                    isActive
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-on-surface-variant)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => { toggle(); setMobileOpen(false) }}
                className="flex items-center gap-2 text-sm text-[var(--color-secondary)]"
              >
                {isDark ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
              </button>
            </div>
          </div>
        )}
      </header>

      <SearchOverlay />
    </>
  )
}

