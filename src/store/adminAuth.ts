import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/services/api'

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
  isLoading: boolean
  login: (token: string, user: AdminUser) => void
  logout: () => Promise<void>
  checkAuth: () => Promise<boolean>
}

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: (token, user) => {
        localStorage.setItem('zamyaa_admin_token', token)
        set({ token, user, isAuthenticated: true, isLoading: false })
      },

      logout: async () => {
        try {
          await api.post('/auth/logout')
        } catch {
          // ignore logout network errors
        } finally {
          localStorage.removeItem('zamyaa_admin_token')
          set({ token: null, user: null, isAuthenticated: false, isLoading: false })
        }
      },

      checkAuth: async () => {
        const storedToken = get().token || localStorage.getItem('zamyaa_admin_token')
        if (!storedToken) {
          set({ token: null, user: null, isAuthenticated: false, isLoading: false })
          return false
        }

        try {
          set({ isLoading: true })
          const res = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${storedToken}` },
          })

          if (res.data?.success && res.data?.user && res.data.user.role === 'admin') {
            set({
              user: res.data.user,
              isAuthenticated: true,
              isLoading: false,
            })
            return true
          } else {
            // Not a valid admin or account suspended
            localStorage.removeItem('zamyaa_admin_token')
            set({ token: null, user: null, isAuthenticated: false, isLoading: false })
            return false
          }
        } catch {
          localStorage.removeItem('zamyaa_admin_token')
          set({ token: null, user: null, isAuthenticated: false, isLoading: false })
          return false
        }
      },
    }),
    {
      name: 'zamyaa-admin-auth',
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)

