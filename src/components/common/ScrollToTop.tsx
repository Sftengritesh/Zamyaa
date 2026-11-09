import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Global ScrollToTop component.
 * Automatically scrolls window to top on every route change or navigation.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    })
  }, [pathname, search])

  return null
}
