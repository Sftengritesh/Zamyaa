import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAdminAuth } from '@/store/adminAuth'

export default function AdminRoute() {
  const { isAuthenticated, isLoading, checkAuth } = useAdminAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-body">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#888]">
            Verifying Atelier Credentials...
          </span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

