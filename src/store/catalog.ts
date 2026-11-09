import { create } from 'zustand'
import { api } from '@/services/api'
import { products as seedProducts, collections as seedCollections } from '@/data/products'
import type { Product, Collection } from '@/types'

interface CatalogState {
  products: Product[]
  collections: Collection[]
  cms: any | null
  loading: boolean
  lastFetched: number | null
  fetchCatalog: () => Promise<void>
  getProductBySlug: (slug: string) => Product | undefined
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  products: seedProducts,
  collections: seedCollections,
  cms: null,
  loading: false,
  lastFetched: null,

  fetchCatalog: async () => {
    try {
      set({ loading: true })

      // Fetch live catalog from backend API
      const [prodRes, collRes, cmsRes] = await Promise.allSettled([
        api.get('/products'),
        api.get('/collections'),
        api.get('/cms'),
      ])

      const updates: Partial<CatalogState> = {
        loading: false,
        lastFetched: Date.now(),
      }

      if (prodRes.status === 'fulfilled' && prodRes.value.data?.products?.length) {
        updates.products = prodRes.value.data.products
      }

      if (collRes.status === 'fulfilled' && collRes.value.data?.collections?.length) {
        updates.collections = collRes.value.data.collections
      }

      if (cmsRes.status === 'fulfilled' && cmsRes.value.data?.cms) {
        updates.cms = cmsRes.value.data.cms
      }

      set(updates)
    } catch (err) {
      console.warn('Catalog API sync fallback to local cache:', err)
      set({ loading: false })
    }
  },

  getProductBySlug: (slug: string) => {
    const list = get().products
    return list.find((p) => p.slug === slug || p.id === slug)
  },
}))

