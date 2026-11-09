import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Global ScrollToTop component.
 * Automatically scrolls window to top on route change (e.g. Collections -> Product, Home -> Collections, Product -> Cart),
 * but preserves scroll position when interacting with filters, categories, and tabs on the same page.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  const prevPathRef = useRef<string>(pathname)

  useEffect(() => {
    const isCollectionsRoute = (path: string) => path.startsWith('/collections')

    const wasCollections = isCollectionsRoute(prevPathRef.current)
    const isCollections = isCollectionsRoute(pathname)

    // If the user is on the /collections page switching collection tabs or categories,
    // DO NOT jump to the top — let them stay at the products grid!
    if (wasCollections && isCollections) {
      prevPathRef.current = pathname
      return
    }

    // When navigating to a DIFFERENT page (e.g. from /collections to /product/:slug, or / to /collections):
    if (prevPathRef.current !== pathname) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      })
      prevPathRef.current = pathname
    }
  }, [pathname])

  return null
}
