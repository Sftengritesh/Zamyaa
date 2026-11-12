import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/services/api'
import type { User } from '@/types'

interface CustomerAuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (token: string, user: User) => void
  logout: () => Promise<void>
  updateUser: (updatedData: Partial<User>) => void
  checkAuth: () => Promise<void>
}

export const useCustomerAuth = create<CustomerAuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: (token, user) => {
        localStorage.setItem('zamyaa_customer_token', token)
        set({ token, user, isAuthenticated: true })
      },

      logout: async () => {
        try {
          await api.post('/auth/logout')
        } catch {
          // ignore network failure on logout
        } finally {
          localStorage.removeItem('zamyaa_customer_token')
          set({ token: null, user: null, isAuthenticated: false })
        }
      },

      updateUser: (updatedData) => {
        const current = get().user
        if (current) {
          set({ user: { ...current, ...updatedData } })
        }
      },

      checkAuth: async () => {
        const token = get().token || localStorage.getItem('zamyaa_customer_token')
        // Even if no token in localStorage, cookie might be present
        try {
          set({ isLoading: true })
          const res = await api.get('/auth/me')
          if (res.data?.success && res.data?.user) {
            set({
              user: res.data.user,
              isAuthenticated: true,
              isLoading: false,
            })
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false })
          }
        } catch {
          if (!token) {
            set({ user: null, isAuthenticated: false, isLoading: false })
          } else {
            set({ isLoading: false })
          }
        }
      },
    }),
    {
      name: 'zamyaa-customer-auth',
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)

