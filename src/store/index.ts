import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, WishlistItem } from '@/types'

// ── Theme Store ──
interface ThemeStore {
  isDark: boolean
  toggle: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      toggle: () => set((s) => {
        const next = !s.isDark
        document.documentElement.classList.toggle('dark', next)
        return { isDark: next }
      }),
    }),
    {
      name: 'zamyaa-theme',
      onRehydrateStorage: () => (state) => {
        if (state?.isDark) {
          document.documentElement.classList.add('dark')
        }
      },
    }
  )
)

// ── Cart Store ──
interface CartStore {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (item) => {
        const id = `${item.productId}-${item.size}-${item.color}`
        set((s) => {
          const existing = s.items.find((i) => i.id === id)
          if (existing) {
            return { items: s.items.map((i) => i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i) }
          }
          return { items: [...s.items, { ...item, id }] }
        })
      },
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, qty) => set((s) => ({
        items: qty <= 0
          ? s.items.filter((i) => i.id !== id)
          : s.items.map((i) => i.id === id ? { ...i, quantity: qty } : i)
      })),
      clearCart: () => set({ items: [] }),
      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getSubtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'zamyaa-cart' }
  )
)

// ── Wishlist Store ──
interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  toggle: (item: WishlistItem) => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((s) => ({ items: [...s.items, item] })),
      removeItem: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      isWishlisted: (productId) => get().items.some((i) => i.productId === productId),
      toggle: (item) => {
        if (get().isWishlisted(item.productId)) get().removeItem(item.productId)
        else get().addItem(item)
      },
    }),
    { name: 'zamyaa-wishlist' }
  )
)

// ── Search Store ──
interface SearchStore {
  query: string
  isOpen: boolean
  setQuery: (q: string) => void
  openSearch: () => void
  closeSearch: () => void
}

export const useSearchStore = create<SearchStore>()((set) => ({
  query: '',
  isOpen: false,
  setQuery: (query) => set({ query }),
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '' }),
}))

