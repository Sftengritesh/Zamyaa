import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Global ScrollToTop component.
 * Automatically scrolls window to top on route change (e.g. Collections -> Product, Home -> Collections, Product -> Cart),
 * but preserves scroll position when interacting with filters, categories, and tabs on the same page.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation()
  const prevPathRef = useRef<string>(pathname)

  useEffect(() => {
    // When the path itself changes (e.g. /collections -> /collections/lantana, or /collections/lantana -> /collections/the-boho-flare-affair, or /collections -> /product/123):
    if (prevPathRef.current !== pathname) {
      if (window.location.hash) {
        const id = window.location.hash.replace('#', '')
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant' as ScrollBehavior,
        })
      }
      prevPathRef.current = pathname
    }
  }, [pathname, search])

  return null
}
