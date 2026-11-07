import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '@/store/adminAuth'

export default function AdminRoute() {
  const { isAuthenticated } = useAdminAuth()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
