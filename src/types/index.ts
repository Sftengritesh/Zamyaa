// Product types
export interface Product {
  id: string
  slug: string
  name: string
  subtitle?: string
  price: number
  originalPrice?: number
  currency: string
  collection: string
  collectionSlug: string
  category: string
  description: string
  fabric: string
  care: string[]
  images: ProductImage[]
  sizes: ProductSize[]
  colors: ProductColor[]
  tags: string[]
  isLimitedEdition?: boolean
  limitedCount?: number
  inStock: boolean
  badge?: string
  sku?: string
  status?: 'active' | 'draft' | 'archived'
  isFeatured?: boolean
  isBestseller?: boolean
  inventory?: any[]
}

export interface ProductImage {
  url: string
  alt: string
  isPrimary?: boolean
}

export interface ProductSize {
  label: string
  available: boolean
  measurements?: string
}

export interface ProductColor {
  name: string
  hex: string
  image?: string
  images?: ProductImage[]
}

// Collection types
export interface Collection {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  season: string
  capsule: string
  heroImage: string
  bannerImage?: string
  mosaicImages?: string[]
  products: Product[]
  metrics?: { label: string; value: string }[]
  productIds?: string[]
  isOld?: boolean
  isComingSoon?: boolean
  status?: 'published' | 'draft' | 'archived' | 'active' | 'coming_soon'
}

// Cart types
export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
  slug: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
}

// Checkout types
export interface CheckoutFormData {
  contact: {
    email: string
    phone: string
  }
  shipping: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    pincode: string
    country: string
  }
  delivery: {
    method: 'standard' | 'express' | 'bespoke'
  }
  payment: {
    method: 'card' | 'upi' | 'netbanking' | 'cod'
    cardNumber?: string
    cardName?: string
    expiry?: string
    cvv?: string
    upiId?: string
  }
}

// Wishlist
export interface WishlistItem {
  productId: string
  slug: string
  name: string
  price: number
  image: string
  addedAt: string
}

// Journal / Editorial types
export interface JournalArticle {
  id: string
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  content: string
  coverImage: string
  additionalImages?: string[]
  category: 'Designer Notes' | 'Craft Stories' | 'Style Journal' | 'Behind the Scenes' | 'Fabric Stories' | string
  author: string
  readTime: string
  publishedAt: string
  status: 'published' | 'draft'
  isFeatured?: boolean
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}

