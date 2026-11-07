import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from '../cart/CartDrawer'
import { useThemeStore } from '@/store'
import { useEffect } from 'react'

export default function Layout() {
  const { isDark } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)] transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

