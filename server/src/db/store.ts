import fs from 'fs'
import path from 'path'

const DB_FILE = path.resolve(import.meta.dirname, '../../data/db.json')

export interface ProductInventoryItem {
  sku: string
  color: string
  size: string
  stock: number
  lowStockThreshold: number
}

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
  images: { url: string; alt: string; isPrimary?: boolean; publicId?: string }[]
  sizes: { label: string; available: boolean; measurements?: string }[]
  colors: { name: string; hex: string }[]
  tags: string[]
  sku: string
  status: 'active' | 'draft' | 'archived'
  isFeatured: boolean
  isBestseller: boolean
  isLimitedEdition?: boolean
  limitedCount?: number
  inStock: boolean
  badge?: string
  inventory: ProductInventoryItem[]
  createdAt: string
  updatedAt: string
}

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
  status: 'published' | 'draft' | 'archived'
  launchDate?: string
  displayOrder: number
  metrics?: { label: string; value: string }[]
  productIds: string[]
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
  sku: string
}

export interface Order {
  id: string
  orderNumber: string
  createdAt: string
  customer: {
    name: string
    email: string
    phone: string
  }
  shippingAddress: {
    address: string
    city: string
    state: string
    pincode: string
    country: string
  }
  items: OrderItem[]
  subtotal: number
  discount: number
  shippingFee: number
  tax: number
  total: number
  currency: string
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded'
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod'
  fulfillmentStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  trackingNumber?: string
  courier?: string
  notes?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  state: string
  totalOrders: number
  totalSpent: number
  lastOrderDate: string
  addresses: {
    type: 'home' | 'work' | 'other'
    address: string
    city: string
    state: string
    pincode: string
  }[]
}

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minOrderValue: number
  maxUses: number
  usedCount: number
  expiresAt: string
  isActive: boolean
  description?: string
}

export interface Review {
  id: string
  productId: string
  productName: string
  customerName: string
  customerEmail: string
  rating: number
  title: string
  comment: string
  createdAt: string
  isVerified: boolean
  status: 'approved' | 'hidden' | 'pending'
}

export interface HomepageCMS {
  announcement: {
    enabled: boolean
    text: string
  }
  hero: {
    seasonBadge: string
    editionBadge: string
    heading: string
    description: string
    primaryButtonText: string
    primaryButtonLink: string
    secondaryButtonText: string
    secondaryButtonLink: string
    imageUrl: string
  }
  marqueeItems: string[]
  featuredCollectionSlug: string
  newArrivalProductIds: string[]
  promotionalBanner: {
    enabled: boolean
    heading: string
    subheading: string
    buttonText: string
    buttonLink: string
    backgroundColor: string
  }
  sectionVisibility: {
    hero: boolean
    marquee: boolean
    craftPillars: boolean
    featuredCollection: boolean
    newArrivals: boolean
    editorialFeature: boolean
    values: boolean
    instagram: boolean
    newsletter: boolean
  }
}

export interface StoreSettings {
  storeName: string
  tagline: string
  logoText: string
  logoSubtext: string
  contactEmail: string
  contactPhone: string
  whatsappNumber: string
  atelierAddressMumbai: string
  atelierAddressJaipur: string
  currency: string
  currencySymbol: string
  standardShippingFee: number
  freeShippingThreshold: number
  sameDayShippingFee: number
  taxRatePercent: number
  returnWindowDays: number
  instagramUrl: string
  youtubeUrl: string
  twitterUrl: string
}

export interface DatabaseSchema {
  products: Product[]
  collections: Collection[]
  orders: Order[]
  customers: Customer[]
  coupons: Coupon[]
  reviews: Review[]
  homepageCMS: HomepageCMS
  settings: StoreSettings
}

const defaultInitialData: DatabaseSchema = {
  products: [
    {
      id: 'p1',
      slug: 'gulabi-rose-silk-co-ord',
      name: 'The Gulabi Rose Silk Co-Ord Set',
      subtitle: 'Noor-e-Rang Collection',
      price: 48500,
      originalPrice: 62000,
      currency: '₹',
      collection: 'Noor-e-Rang',
      collectionSlug: 'noor-e-rang',
      category: 'Co-Ord Sets',
      description:
        'An opulent co-ordinate set in hand-woven Chanderi silk, dyed in a rich Gulabi rose shade inspired by the rose gardens of Jaipur\'s Amber Fort. The asymmetric tunic features intricate antique gota patti embroidery along the hemline, while the wide-leg palazzo trousers flow with architectural grace.',
      fabric: 'Hand-woven Chanderi Silk, 100% Mulberry. Lining: Pure cotton muslin.',
      care: [
        'Dry clean only',
        'Store in breathable muslin bag',
        'Keep away from direct sunlight',
        'Handle embroidery with care',
      ],
      images: [
        {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303',
          alt: 'Gulabi Rose Co-Ord - Look 1',
          isPrimary: true,
        },
        {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzKmtPeQxvihoBt9gfOniLLCFGYEdkatPLmxHfqY6cxbnStaW3uBoc1xvoOwUJphZByozEIUf5_wAlVnU_9vmhBSh92BcA3EcQ-R68bX6cIezwp3GAg0XagObxmUl3yWE9vUvPFptpiniX8cu6WDgn8dUXF6rdTf_WF_S-mCvV_pWyg5BNZKhiAeRfhDJwYSd25jinnaZ93IwZTV66AiIHSFdbr9yTCW6IckBBuIgC',
          alt: 'Gulabi Rose Co-Ord - Look 2',
        },
        {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtLuotM2i_ew3uFqc3FH8mq2VZVDi5lWNLvl65cN0LRYXP1i_3kJqwzAqmxF2OZhI1A9V5bwkRPtCRIJsO4mJsHlqQDyK2vd1vNzpAdmJM7GfgRbD7dGFcPWBBDAP1LBNYbWfH7BXFmqLQG1-WekN4mWFMRwAZH8aVCagHEBJqVvGiyxpfIDt8e3Pd0PxAJKz6a1d9i8LgtDkXC9jcobsuIueDuS4GpIJLpz4FA',
          alt: 'Gulabi Rose Co-Ord - Detail',
        },
      ],
      sizes: [
        { label: 'XS', available: true, measurements: 'Bust 32" / Waist 26"' },
        { label: 'S', available: true, measurements: 'Bust 34" / Waist 28"' },
        { label: 'M', available: true, measurements: 'Bust 36" / Waist 30"' },
        { label: 'L', available: false, measurements: 'Bust 38" / Waist 32"' },
        { label: 'XL', available: true, measurements: 'Bust 40" / Waist 34"' },
      ],
      colors: [
        { name: 'Gulabi Rose', hex: '#E8617A' },
        { name: 'Ivory Pearl', hex: '#F5F0E8' },
        { name: 'Midnight Navy', hex: '#1C2951' },
      ],
      tags: ['co-ord', 'silk', 'chanderi', 'gota-patti', 'rajasthan'],
      sku: 'ZY-NR-001',
      status: 'active',
      isFeatured: true,
      isBestseller: true,
      isLimitedEdition: true,
      limitedCount: 60,
      inStock: true,
      badge: 'Limited — 60 Pieces',
      inventory: [
        { sku: 'ZY-NR-001-XS', color: 'Gulabi Rose', size: 'XS', stock: 5, lowStockThreshold: 2 },
        { sku: 'ZY-NR-001-S', color: 'Gulabi Rose', size: 'S', stock: 8, lowStockThreshold: 2 },
        { sku: 'ZY-NR-001-M', color: 'Gulabi Rose', size: 'M', stock: 12, lowStockThreshold: 3 },
        { sku: 'ZY-NR-001-L', color: 'Gulabi Rose', size: 'L', stock: 0, lowStockThreshold: 2 },
        { sku: 'ZY-NR-001-XL', color: 'Gulabi Rose', size: 'XL', stock: 3, lowStockThreshold: 2 },
      ],
      createdAt: '2026-09-15T10:00:00Z',
      updatedAt: '2026-11-06T14:00:00Z',
    },
    {
      id: 'p2',
      slug: 'lantana-cape-dress',
      name: 'Lantana Embroidered Cape Dress',
      subtitle: 'Lantana Collection — AW2025',
      price: 56000,
      currency: '₹',
      collection: 'Lantana',
      collectionSlug: 'lantana',
      category: 'Dresses & Capes',
      description:
        'An architectural masterpiece of contemporary Indian fashion. The Lantana Cape Dress features a sculptural cape overlay in handwoven Banarasi tissue silk, with delicate zardozi embellishments echoing the floral lantana motif.',
      fabric: 'Cape: Handwoven Banarasi Tissue Silk. Inner: Pure Chanderi Silk.',
      care: ['Dry clean only', 'Handle embroidery with care', 'Store flat in muslin'],
      images: [
        {
          url: 'https://lh3.googleusercontent.com/aida/AEtjO1XWyIphayeIEEDRBIvXf3Q7denO0MP-P24RMMwvF-ySss4RQ_IUXZRHsw8rm1qGTpc4rmecFzlBmjhk_muLTmrub6QHo0R8iCy6ucM7YaZPKrXEu0yhS4sSrwnPq_3DPMXFwkKcQiBKc_Vs6GzZlrutj5U63AdQmCjzeKEDn8qEmzRaDIbigYM69_sooev5O_LzCeCH0-KxrHF9frxC36xRIwKidpTDusJ9JilieHLxwII-i08D_Mlmcvo',
          alt: 'Lantana Cape Dress',
          isPrimary: true,
        },
      ],
      sizes: [
        { label: 'XS', available: true },
        { label: 'S', available: true },
        { label: 'M', available: true },
        { label: 'L', available: true },
        { label: 'XL', available: false },
      ],
      colors: [
        { name: 'Ivory Moonlight', hex: '#F8F3EA' },
        { name: 'Blush Dusk', hex: '#D4A5A5' },
        { name: 'Onyx', hex: '#1A1A1A' },
      ],
      tags: ['cape', 'dress', 'banarasi', 'zardozi', 'aw2025'],
      sku: 'ZY-LT-002',
      status: 'active',
      isFeatured: true,
      isBestseller: true,
      inStock: true,
      badge: 'New Season',
      inventory: [
        { sku: 'ZY-LT-002-XS', color: 'Ivory Moonlight', size: 'XS', stock: 4, lowStockThreshold: 2 },
        { sku: 'ZY-LT-002-S', color: 'Ivory Moonlight', size: 'S', stock: 6, lowStockThreshold: 2 },
        { sku: 'ZY-LT-002-M', color: 'Ivory Moonlight', size: 'M', stock: 10, lowStockThreshold: 3 },
        { sku: 'ZY-LT-002-L', color: 'Ivory Moonlight', size: 'L', stock: 5, lowStockThreshold: 2 },
        { sku: 'ZY-LT-002-XL', color: 'Ivory Moonlight', size: 'XL', stock: 0, lowStockThreshold: 2 },
      ],
      createdAt: '2026-10-01T10:00:00Z',
      updatedAt: '2026-11-06T14:00:00Z',
    },
    {
      id: 'p3',
      slug: 'noor-anarkali-set',
      name: 'Noor Anarkali with Dupatta',
      subtitle: 'Noor-e-Rang Collection',
      price: 38500,
      currency: '₹',
      collection: 'Noor-e-Rang',
      collectionSlug: 'noor-e-rang',
      category: 'Anarkalis',
      description:
        'The Noor Anarkali is a sweeping floor-length silhouette in pure georgette, hand-embroidered with delicate chikankari florals in ivory thread. Paired with a tissue silk dupatta with antique zari border.',
      fabric: 'Pure Georgette Crepe. Embroidery: Hand Chikankari. Dupatta: Tissue Silk with Zari.',
      care: ['Dry clean only', 'Press reverse side only', 'Store in provided muslin cover'],
      images: [
        {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303',
          alt: 'Noor Anarkali Front',
          isPrimary: true,
        },
      ],
      sizes: [
        { label: 'XS', available: true },
        { label: 'S', available: true },
        { label: 'M', available: true },
        { label: 'L', available: true },
        { label: 'XL', available: true },
      ],
      colors: [
        { name: 'Ivory', hex: '#F5F0E8' },
        { name: 'Sage Green', hex: '#7B9B7B' },
      ],
      tags: ['anarkali', 'chikankari', 'georgette', 'lucknow', 'dupatta'],
      sku: 'ZY-NR-003',
      status: 'active',
      isFeatured: false,
      isBestseller: true,
      inStock: true,
      inventory: [
        { sku: 'ZY-NR-003-XS', color: 'Ivory', size: 'XS', stock: 3, lowStockThreshold: 2 },
        { sku: 'ZY-NR-003-S', color: 'Ivory', size: 'S', stock: 7, lowStockThreshold: 2 },
        { sku: 'ZY-NR-003-M', color: 'Ivory', size: 'M', stock: 9, lowStockThreshold: 2 },
        { sku: 'ZY-NR-003-L', color: 'Ivory', size: 'L', stock: 4, lowStockThreshold: 2 },
        { sku: 'ZY-NR-003-XL', color: 'Ivory', size: 'XL', stock: 2, lowStockThreshold: 2 },
      ],
      createdAt: '2026-10-10T10:00:00Z',
      updatedAt: '2026-11-06T14:00:00Z',
    },
    {
      id: 'p4',
      slug: 'amber-palazzo-set',
      name: 'Amber Fort Palazzo Co-Ord',
      subtitle: 'Noor-e-Rang Collection',
      price: 29500,
      currency: '₹',
      collection: 'Noor-e-Rang',
      collectionSlug: 'noor-e-rang',
      category: 'Palazzo Sets',
      description:
        'Inspired by the sunlit sandstone of Amber Fort, this palazzo co-ord set captures Jaipur\'s imperial warmth. Wide-leg palazzo pants in handloom cotton-silk blend with block-printed kurta.',
      fabric: 'Handloom Cotton-Silk Blend. Block Print: Natural Dyes.',
      care: ['Hand wash cold', 'Dry in shade', 'Iron at medium heat on reverse'],
      images: [
        {
          url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdF7HqcZiFZ0q2Ybz8iMZ-jVAJA15jgqYE4LwVVOv1R1FVOIrFCOaRIPBGIJR6p26kd-R5Lxv9T3bfmGQg5R5fqc5mVE2WV1Hy7gOvMFzq3wqiHVKqRnI3HopWuBJ7KbJl5a7jbHqD9KtPFyQpW3UqeXjXd3jPnA47e-BCBL6Zq9h6HkJZJhDL5wR0iVfDNfXt7kX_0xT7nB22Z2BtEjPuQN3T0bZQc5Pf7P3g',
          alt: 'Amber Palazzo Set',
          isPrimary: true,
        },
      ],
      sizes: [
        { label: 'XS', available: true },
        { label: 'S', available: true },
        { label: 'M', available: true },
        { label: 'L', available: true },
        { label: 'XL', available: true },
      ],
      colors: [
        { name: 'Amber Dusk', hex: '#D4845A' },
        { name: 'Indigo', hex: '#2C3E7A' },
      ],
      tags: ['palazzo', 'block-print', 'co-ord', 'rajasthan'],
      sku: 'ZY-NR-004',
      status: 'active',
      isFeatured: false,
      isBestseller: false,
      inStock: true,
      inventory: [
        { sku: 'ZY-NR-004-XS', color: 'Amber Dusk', size: 'XS', stock: 6, lowStockThreshold: 2 },
        { sku: 'ZY-NR-004-S', color: 'Amber Dusk', size: 'S', stock: 8, lowStockThreshold: 2 },
        { sku: 'ZY-NR-004-M', color: 'Amber Dusk', size: 'M', stock: 11, lowStockThreshold: 3 },
        { sku: 'ZY-NR-004-L', color: 'Amber Dusk', size: 'L', stock: 7, lowStockThreshold: 2 },
        { sku: 'ZY-NR-004-XL', color: 'Amber Dusk', size: 'XL', stock: 4, lowStockThreshold: 2 },
      ],
      createdAt: '2026-10-15T10:00:00Z',
      updatedAt: '2026-11-06T14:00:00Z',
    },
  ],
  collections: [
    {
      id: 'c1',
      slug: 'noor-e-rang',
      title: 'Noor-e-Rang',
      subtitle: 'Luminous Hues of Rajasthan',
      description:
        'A celebration of Jaipur\'s imperial court palettes, hand-spun Chanderi silks, and meticulous antique gota patti embroidery.',
      season: 'Autumn-Winter 2025',
      capsule: 'Capsule 04',
      heroImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303',
      bannerImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAzKmtPeQxvihoBt9gfOniLLCFGYEdkatPLmxHfqY6cxbnStaW3uBoc1xvoOwUJphZByozEIUf5_wAlVnU_9vmhBSh92BcA3EcQ-R68bX6cIezwp3GAg0XagObxmUl3yWE9vUvPFptpiniX8cu6WDgn8dUXF6rdTf_WF_S-mCvV_pWyg5BNZKhiAeRfhDJwYSd25jinnaZ93IwZTV66AiIHSFdbr9yTCW6IckBBuIgC',
      status: 'published',
      displayOrder: 1,
      metrics: [
        { label: 'Archival Silhouettes', value: '14' },
        { label: 'Mulberry & Chanderi', value: '100%' },
        { label: 'Artisan Workshops', value: '6' },
      ],
      productIds: ['p1', 'p3', 'p4'],
    },
    {
      id: 'c2',
      slug: 'lantana',
      title: 'Lantana Collection',
      subtitle: 'An Architecture of Bloom',
      description:
        'Architectural tailoring reimagined through handwoven Chanderi silks, sculpted zardozi embellishments, and artisanal silhouettes.',
      season: 'Autumn-Winter 2025',
      capsule: 'Edition 01/03',
      heroImage:
        'https://lh3.googleusercontent.com/aida/AEtjO1XWyIphayeIEEDRBIvXf3Q7denO0MP-P24RMMwvF-ySss4RQ_IUXZRHsw8rm1qGTpc4rmecFzlBmjhk_muLTmrub6QHo0R8iCy6ucM7YaZPKrXEu0yhS4sSrwnPq_3DPMXFwkKcQiBKc_Vs6GzZlrutj5U63AdQmCjzeKEDn8qEmzRaDIbigYM69_sooev5O_LzCeCH0-KxrHF9frxC36xRIwKidpTDusJ9JilieHLxwII-i08D_Mlmcvo',
      status: 'published',
      displayOrder: 2,
      metrics: [
        { label: 'Hand-crafted pieces', value: '8' },
        { label: 'Natural Zardozi', value: '100%' },
        { label: 'Heritage Artisans', value: '12' },
      ],
      productIds: ['p2'],
    },
    {
      id: 'c3',
      slug: 'boho-flare',
      title: 'Boho Flare',
      subtitle: 'Free-Spirited Drapes & Organza Flows',
      description: 'Fluid bohemian sensibilities tailored with classical Indian hand-block printing and crushed silks.',
      season: 'Spring-Summer 2026',
      capsule: 'Capsule 05',
      heroImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDtLuotM2i_ew3uFqc3FH8mq2VZVDi5lWNLvl65cN0LRYXP1i_3kJqwzAqmxF2OZhI1A9V5bwkRPtCRIJsO4mJsHlqQDyK2vd1vNzpAdmJM7GfgRbD7dGFcPWBBDAP1LBNYbWfH7BXFmqLQG1-WekN4mWFMRwAZH8aVCagHEBJqVvGiyxpfIDt8e3Pd0PxAJKz6a1d9i8LgtDkXC9jcobsuIueDuS4GpIJLpz4FA',
      status: 'draft',
      launchDate: '2026-03-01',
      displayOrder: 3,
      productIds: [],
    },
    {
      id: 'c4',
      slug: 'affaire',
      title: 'Affaire',
      subtitle: 'Evening Glamour & Sculpted Velvet',
      description: 'Decadent velvet jackets, floor-length capes, and metallic tissue silhouettes for twilight celebrations.',
      season: 'Festive / Evening 2025',
      capsule: 'Capsule 03',
      heroImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCdF7HqcZiFZ0q2Ybz8iMZ-jVAJA15jgqYE4LwVVOv1R1FVOIrFCOaRIPBGIJR6p26kd-R5Lxv9T3bfmGQg5R5fqc5mVE2WV1Hy7gOvMFzq3wqiHVKqRnI3HopWuBJ7KbJl5a7jbHqD9KtPFyQpW3UqeXjXd3jPnA47e-BCBL6Zq9h6HkJZJhDL5wR0iVfDNfXt7kX_0xT7nB22Z2BtEjPuQN3T0bZQc5Pf7P3g',
      status: 'published',
      displayOrder: 4,
      productIds: [],
    },
    {
      id: 'c5',
      slug: 'desi-dastaan',
      title: 'Desi Dastaan',
      subtitle: 'Tales of Indian Heirlooms',
      description: 'Vintage-inspired wedding trousseaus and heirloom sarees woven in Varanasi and Kanchipuram.',
      season: 'Bridal Heritage 2026',
      capsule: 'Heirloom Edition',
      heroImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303',
      status: 'draft',
      launchDate: '2026-04-15',
      displayOrder: 5,
      productIds: [],
    },
  ],
  orders: [
    {
      id: 'ord-101',
      orderNumber: 'ZY-2026-1042',
      createdAt: '2026-11-06T18:20:00Z',
      customer: {
        name: 'Tara Sutaria',
        email: 'tara.sutaria@example.com',
        phone: '+91 98201 12345',
      },
      shippingAddress: {
        address: 'Villa 14, Juhu Tara Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400049',
        country: 'India',
      },
      items: [
        {
          productId: 'p1',
          name: 'The Gulabi Rose Silk Co-Ord Set',
          price: 48500,
          quantity: 1,
          size: 'M',
          color: 'Gulabi Rose',
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303',
          sku: 'ZY-NR-001-M',
        },
      ],
      subtotal: 48500,
      discount: 4850,
      shippingFee: 0,
      tax: 5238,
      total: 48888,
      currency: '₹',
      paymentStatus: 'paid',
      paymentMethod: 'card',
      fulfillmentStatus: 'processing',
      trackingNumber: 'BLUEDART-88291039',
      courier: 'Blue Dart Express',
      notes: 'Bespoke blouse sleeve adjustment requested (+1.5 inches). Atelier notified.',
    },
    {
      id: 'ord-102',
      orderNumber: 'ZY-2026-1041',
      createdAt: '2026-11-05T14:10:00Z',
      customer: {
        name: 'Mira Kapoor',
        email: 'mira.kapoor@example.com',
        phone: '+91 99100 87654',
      },
      shippingAddress: {
        address: '42, Golf Links',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110003',
        country: 'India',
      },
      items: [
        {
          productId: 'p2',
          name: 'Lantana Embroidered Cape Dress',
          price: 56000,
          quantity: 1,
          size: 'S',
          color: 'Ivory Moonlight',
          image:
            'https://lh3.googleusercontent.com/aida/AEtjO1XWyIphayeIEEDRBIvXf3Q7denO0MP-P24RMMwvF-ySss4RQ_IUXZRHsw8rm1qGTpc4rmecFzlBmjhk_muLTmrub6QHo0R8iCy6ucM7YaZPKrXEu0yhS4sSrwnPq_3DPMXFwkKcQiBKc_Vs6GzZlrutj5U63AdQmCjzeKEDn8qEmzRaDIbigYM69_sooev5O_LzCeCH0-KxrHF9frxC36xRIwKidpTDusJ9JilieHLxwII-i08D_Mlmcvo',
          sku: 'ZY-LT-002-S',
        },
      ],
      subtotal: 56000,
      discount: 0,
      shippingFee: 0,
      tax: 6720,
      total: 62720,
      currency: '₹',
      paymentStatus: 'paid',
      paymentMethod: 'upi',
      fulfillmentStatus: 'shipped',
      trackingNumber: 'DELHIVERY-994827104',
      courier: 'Delhivery Surface',
    },
    {
      id: 'ord-103',
      orderNumber: 'ZY-2026-1040',
      createdAt: '2026-11-04T09:30:00Z',
      customer: {
        name: 'Rhea Chakraborty',
        email: 'rhea.c@example.com',
        phone: '+91 97654 32109',
      },
      shippingAddress: {
        address: 'Penthouse B, Silver Beach Estates, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        country: 'India',
      },
      items: [
        {
          productId: 'p3',
          name: 'Noor Anarkali with Dupatta',
          price: 38500,
          quantity: 1,
          size: 'M',
          color: 'Ivory',
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303',
          sku: 'ZY-NR-003-M',
        },
      ],
      subtotal: 38500,
      discount: 0,
      shippingFee: 0,
      tax: 4620,
      total: 43120,
      currency: '₹',
      paymentStatus: 'paid',
      paymentMethod: 'card',
      fulfillmentStatus: 'delivered',
      trackingNumber: 'BLUEDART-77291044',
      courier: 'Blue Dart Express',
    },
    {
      id: 'ord-104',
      orderNumber: 'ZY-2026-1039',
      createdAt: '2026-11-03T16:45:00Z',
      customer: {
        name: 'Ananya Birla',
        email: 'ananya.b@example.com',
        phone: '+91 98210 99887',
      },
      shippingAddress: {
        address: 'Birla House, Carmichael Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400026',
        country: 'India',
      },
      items: [
        {
          productId: 'p4',
          name: 'Amber Fort Palazzo Co-Ord',
          price: 29500,
          quantity: 2,
          size: 'S',
          color: 'Amber Dusk',
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCdF7HqcZiFZ0q2Ybz8iMZ-jVAJA15jgqYE4LwVVOv1R1FVOIrFCOaRIPBGIJR6p26kd-R5Lxv9T3bfmGQg5R5fqc5mVE2WV1Hy7gOvMFzq3wqiHVKqRnI3HopWuBJ7KbJl5a7jbHqD9KtPFyQpW3UqeXjXd3jPnA47e-BCBL6Zq9h6HkJZJhDL5wR0iVfDNfXt7kX_0xT7nB22Z2BtEjPuQN3T0bZQc5Pf7P3g',
          sku: 'ZY-NR-004-S',
        },
      ],
      subtotal: 59000,
      discount: 5900,
      shippingFee: 0,
      tax: 6372,
      total: 59472,
      currency: '₹',
      paymentStatus: 'paid',
      paymentMethod: 'netbanking',
      fulfillmentStatus: 'delivered',
      trackingNumber: 'DELHIVERY-88391002',
      courier: 'Delhivery Surface',
    },
    {
      id: 'ord-105',
      orderNumber: 'ZY-2026-1038',
      createdAt: '2026-11-02T11:15:00Z',
      customer: {
        name: 'Pooja Hegde',
        email: 'pooja.h@example.com',
        phone: '+91 99300 44556',
      },
      shippingAddress: {
        address: 'Bandra Reclamation, Mount Mary',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        country: 'India',
      },
      items: [
        {
          productId: 'p1',
          name: 'The Gulabi Rose Silk Co-Ord Set',
          price: 48500,
          quantity: 1,
          size: 'XS',
          color: 'Gulabi Rose',
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303',
          sku: 'ZY-NR-001-XS',
        },
      ],
      subtotal: 48500,
      discount: 0,
      shippingFee: 0,
      tax: 5820,
      total: 54320,
      currency: '₹',
      paymentStatus: 'pending',
      paymentMethod: 'cod',
      fulfillmentStatus: 'pending',
      notes: 'Customer requested evening delivery after 6 PM.',
    },
  ],
  customers: [
    {
      id: 'cust-1',
      name: 'Tara Sutaria',
      email: 'tara.sutaria@example.com',
      phone: '+91 98201 12345',
      city: 'Mumbai',
      state: 'Maharashtra',
      totalOrders: 3,
      totalSpent: 142500,
      lastOrderDate: '2026-11-06T18:20:00Z',
      addresses: [
        {
          type: 'home',
          address: 'Villa 14, Juhu Tara Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400049',
        },
      ],
    },
    {
      id: 'cust-2',
      name: 'Mira Kapoor',
      email: 'mira.kapoor@example.com',
      phone: '+91 99100 87654',
      city: 'New Delhi',
      state: 'Delhi',
      totalOrders: 2,
      totalSpent: 118720,
      lastOrderDate: '2026-11-05T14:10:00Z',
      addresses: [
        {
          type: 'home',
          address: '42, Golf Links',
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110003',
        },
      ],
    },
    {
      id: 'cust-3',
      name: 'Ananya Birla',
      email: 'ananya.b@example.com',
      phone: '+91 98210 99887',
      city: 'Mumbai',
      state: 'Maharashtra',
      totalOrders: 4,
      totalSpent: 215400,
      lastOrderDate: '2026-11-03T16:45:00Z',
      addresses: [
        {
          type: 'home',
          address: 'Birla House, Carmichael Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400026',
        },
      ],
    },
  ],
  coupons: [
    {
      id: 'cpn-1',
      code: 'ZAMYAA10',
      type: 'percentage',
      value: 10,
      minOrderValue: 25000,
      maxUses: 500,
      usedCount: 84,
      expiresAt: '2026-12-31',
      isActive: true,
      description: '10% privilege discount for first-time atelier clients.',
    },
    {
      id: 'cpn-2',
      code: 'FESTIVE5000',
      type: 'fixed',
      value: 5000,
      minOrderValue: 50000,
      maxUses: 100,
      usedCount: 42,
      expiresAt: '2026-11-30',
      isActive: true,
      description: 'Flat ₹5,000 festive celebration reduction on luxury orders.',
    },
    {
      id: 'cpn-3',
      code: 'VIPATELIER',
      type: 'percentage',
      value: 15,
      minOrderValue: 80000,
      maxUses: 50,
      usedCount: 18,
      expiresAt: '2027-03-31',
      isActive: true,
      description: 'Exclusive 15% bespoke salon discount for bridal orders.',
    },
  ],
  reviews: [
    {
      id: 'rev-1',
      productId: 'p1',
      productName: 'The Gulabi Rose Silk Co-Ord Set',
      customerName: 'Aarohi Sen',
      customerEmail: 'aarohi@example.com',
      rating: 5,
      title: 'Breathtaking drape & artisanal finish',
      comment:
        'The Chanderi luster in sunlight is unmatched. Jyoti’s bespoke fit on the trousers was immaculate. It feels like wearing pure poetry.',
      createdAt: '2026-10-24T12:00:00Z',
      isVerified: true,
      status: 'approved',
    },
    {
      id: 'rev-2',
      productId: 'p2',
      productName: 'Lantana Embroidered Cape Dress',
      customerName: 'Devika Singhania',
      customerEmail: 'devika@example.com',
      rating: 5,
      title: 'Architectural marvel',
      comment:
        'Wore this for an international gallery opening in Paris. The zardozi motif sparked conversations all evening. Truly world-class luxury.',
      createdAt: '2026-10-18T15:30:00Z',
      isVerified: true,
      status: 'approved',
    },
    {
      id: 'rev-3',
      productId: 'p1',
      productName: 'The Gulabi Rose Silk Co-Ord Set',
      customerName: 'Kavita Menon',
      customerEmail: 'kavita@example.com',
      rating: 4,
      title: 'Sublime colour, needed slight hem adjustment',
      comment:
        'The rose shade is royal and deep. I contacted the concierge for a 1-inch hem adjustment and they handled it swiftly.',
      createdAt: '2026-10-12T09:00:00Z',
      isVerified: true,
      status: 'approved',
    },
  ],
  homepageCMS: {
    announcement: {
      enabled: true,
      text: 'COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER ₹15,000 | COMPLIMENTARY BESPOKE TAILORING ON REQUEST',
    },
    hero: {
      seasonBadge: 'AUTUMN / WINTER 2025 · CAPSULE DROP',
      editionBadge: 'EDITION 01 / 03 · LANTANA COLLECTION',
      heading: 'DISCOVER A WORLD OF CONTEMPORARY ELEGANCE',
      description:
        'Architectural tailoring reimagined through handwoven Chanderi silks, sculpted zardozi embellishments, and artisanal silhouettes made for the modern muse.',
      primaryButtonText: 'SHOP NEW SEASON →',
      primaryButtonLink: '/collections',
      secondaryButtonText: 'EXPLORE THE CAMPAIGN',
      secondaryButtonLink: '/about',
      imageUrl:
        'https://lh3.googleusercontent.com/aida/AEtjO1XWyIphayeIEEDRBIvXf3Q7denO0MP-P24RMMwvF-ySss4RQ_IUXZRHsw8rm1qGTpc4rmecFzlBmjhk_muLTmrub6QHo0R8iCy6ucM7YaZPKrXEu0yhS4sSrwnPq_3DPMXFwkKcQiBKc_Vs6GzZlrutj5U63AdQmCjzeKEDn8qEmzRaDIbigYM69_sooev5O_LzCeCH0-KxrHF9frxC36xRIwKidpTDusJ9JilieHLxwII-i08D_Mlmcvo',
    },
    marqueeItems: [
      'CHANDERI SILK',
      'ZARDOZI',
      'GOTA PATTI',
      'HANDLOOM',
      'ARTISANAL',
      'BESPOKE TAILORING',
      'MADE IN INDIA',
    ],
    featuredCollectionSlug: 'noor-e-rang',
    newArrivalProductIds: ['p1', 'p2', 'p3', 'p4'],
    promotionalBanner: {
      enabled: true,
      heading: 'Bespoke Trousseau & Bridal Concierge',
      subheading: 'Book a 1-on-1 virtual or in-atelier consultation directly with Jyoti.',
      buttonText: 'BOOK ATELIER APPOINTMENT',
      buttonLink: '/contact',
      backgroundColor: '#1b1b1b',
    },
    sectionVisibility: {
      hero: true,
      marquee: true,
      craftPillars: true,
      featuredCollection: true,
      newArrivals: true,
      editorialFeature: true,
      values: true,
      instagram: true,
      newsletter: true,
    },
  },
  settings: {
    storeName: 'ZAMYAA by jyoti',
    tagline: 'Luxury Indian Fashion',
    logoText: 'ZAMYAA',
    logoSubtext: 'by jyoti',
    contactEmail: 'hello@zamyaa.in',
    contactPhone: '+91 (0) 22 4988 2300',
    whatsappNumber: '+91 98765 43210',
    atelierAddressMumbai: 'Plot 18, Mathuradas Mills Compound, Lower Parel, Mumbai — 400013',
    atelierAddressJaipur: '7, Civil Lines Heritage Enclave, Jacob Road, Jaipur — 302006',
    currency: 'INR',
    currencySymbol: '₹',
    standardShippingFee: 495,
    freeShippingThreshold: 15000,
    sameDayShippingFee: 995,
    taxRatePercent: 12,
    returnWindowDays: 7,
    instagramUrl: 'https://instagram.com/zamyaabyjyoti',
    youtubeUrl: 'https://youtube.com',
    twitterUrl: 'https://twitter.com',
  },
}

class Store {
  private data: DatabaseSchema

  constructor() {
    this.data = this.load()
  }

  private load(): DatabaseSchema {
    try {
      const dir = path.dirname(DB_FILE)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8')
        return JSON.parse(raw)
      }
    } catch (e) {
      console.warn('Could not read existing db.json, using defaults.', e)
    }
    this.saveDirect(defaultInitialData)
    return JSON.parse(JSON.stringify(defaultInitialData))
  }

  private saveDirect(data: DatabaseSchema) {
    try {
      const dir = path.dirname(DB_FILE)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8')
    } catch (err) {
      console.error('Failed to write db.json', err)
    }
  }

  public save() {
    this.saveDirect(this.data)
  }

  public getData(): DatabaseSchema {
    return this.data
  }

  // ── Products ──
  public getProducts(): Product[] {
    return this.data.products
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find((p) => p.id === id || p.slug === id)
  }

  public createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const id = `p${Date.now()}`
    const now = new Date().toISOString()
    const newProduct: Product = {
      ...product,
      id,
      createdAt: now,
      updatedAt: now,
    }
    this.data.products.unshift(newProduct)
    this.save()
    return newProduct
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.data.products.findIndex((p) => p.id === id)
    if (index === -1) return null
    this.data.products[index] = {
      ...this.data.products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    this.save()
    return this.data.products[index]
  }

  public deleteProduct(id: string): boolean {
    const lenBefore = this.data.products.length
    this.data.products = this.data.products.filter((p) => p.id !== id)
    if (this.data.products.length !== lenBefore) {
      this.save()
      return true
    }
    return false
  }

  // ── Collections ──
  public getCollections(): Collection[] {
    return this.data.collections
  }

  public createCollection(coll: Omit<Collection, 'id'>): Collection {
    const id = `c${Date.now()}`
    const newColl: Collection = { ...coll, id }
    this.data.collections.push(newColl)
    this.save()
    return newColl
  }

  public updateCollection(id: string, updates: Partial<Collection>): Collection | null {
    const index = this.data.collections.findIndex((c) => c.id === id)
    if (index === -1) return null
    this.data.collections[index] = { ...this.data.collections[index], ...updates }
    this.save()
    return this.data.collections[index]
  }

  public deleteCollection(id: string): boolean {
    const before = this.data.collections.length
    this.data.collections = this.data.collections.filter((c) => c.id !== id)
    if (this.data.collections.length !== before) {
      this.save()
      return true
    }
    return false
  }

  // ── Orders ──
  public getOrders(): Order[] {
    return this.data.orders
  }

  public getOrderById(id: string): Order | undefined {
    return this.data.orders.find((o) => o.id === id || o.orderNumber === id)
  }

  public updateOrderStatus(
    id: string,
    fulfillmentStatus: Order['fulfillmentStatus'],
    trackingNumber?: string,
    courier?: string
  ): Order | null {
    const order = this.getOrderById(id)
    if (!order) return null
    order.fulfillmentStatus = fulfillmentStatus
    if (trackingNumber !== undefined) order.trackingNumber = trackingNumber
    if (courier !== undefined) order.courier = courier
    this.save()
    return order
  }

  // ── Coupons ──
  public getCoupons(): Coupon[] {
    return this.data.coupons
  }

  public createCoupon(coupon: Omit<Coupon, 'id' | 'usedCount'>): Coupon {
    const id = `cpn-${Date.now()}`
    const newCoupon: Coupon = { ...coupon, id, usedCount: 0 }
    this.data.coupons.unshift(newCoupon)
    this.save()
    return newCoupon
  }

  public updateCoupon(id: string, updates: Partial<Coupon>): Coupon | null {
    const index = this.data.coupons.findIndex((c) => c.id === id)
    if (index === -1) return null
    this.data.coupons[index] = { ...this.data.coupons[index], ...updates }
    this.save()
    return this.data.coupons[index]
  }

  public deleteCoupon(id: string): boolean {
    const before = this.data.coupons.length
    this.data.coupons = this.data.coupons.filter((c) => c.id !== id)
    if (this.data.coupons.length !== before) {
      this.save()
      return true
    }
    return false
  }

  // ── Reviews ──
  public getReviews(): Review[] {
    return this.data.reviews
  }

  public updateReviewStatus(id: string, status: Review['status']): Review | null {
    const rev = this.data.reviews.find((r) => r.id === id)
    if (!rev) return null
    rev.status = status
    this.save()
    return rev
  }

  // ── Homepage CMS ──
  public getHomepageCMS(): HomepageCMS {
    return this.data.homepageCMS
  }

  public updateHomepageCMS(updates: Partial<HomepageCMS>): HomepageCMS {
    this.data.homepageCMS = {
      ...this.data.homepageCMS,
      ...updates,
      hero: { ...this.data.homepageCMS.hero, ...updates.hero },
      announcement: { ...this.data.homepageCMS.announcement, ...updates.announcement },
      promotionalBanner: { ...this.data.homepageCMS.promotionalBanner, ...updates.promotionalBanner },
      sectionVisibility: { ...this.data.homepageCMS.sectionVisibility, ...updates.sectionVisibility },
    }
    this.save()
    return this.data.homepageCMS
  }

  // ── Settings ──
  public getSettings(): StoreSettings {
    return this.data.settings
  }

  public updateSettings(updates: Partial<StoreSettings>): StoreSettings {
    this.data.settings = { ...this.data.settings, ...updates }
    this.save()
    return this.data.settings
  }
}

export const db = new Store()
