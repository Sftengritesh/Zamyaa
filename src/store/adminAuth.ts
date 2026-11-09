import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface AdminAuthState {
  token: string | null
  user: AdminUser | null
  isAuthenticated: boolean
  login: (token: string, user: AdminUser) => void
  logout: () => void
}

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => {
        localStorage.setItem('zamyaa_admin_token', token)
        set({ token, user, isAuthenticated: true })
      },
      logout: () => {
        localStorage.removeItem('zamyaa_admin_token')
        set({ token: null, user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'zamyaa-admin-auth',
    }
  )
)

