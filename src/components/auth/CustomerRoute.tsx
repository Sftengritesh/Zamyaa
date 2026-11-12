import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useCustomerAuth } from '@/store/customerAuth'

export default function CustomerRoute() {
  const { isAuthenticated, isLoading } = useCustomerAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF9F5]">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

