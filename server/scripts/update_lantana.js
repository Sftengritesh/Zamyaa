import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbFile = path.resolve(__dirname, '../data/db.json')

const db = JSON.parse(fs.readFileSync(dbFile, 'utf-8'))

// Update Lantana Collection
const lantanaColl = db.collections.find((c) => c.slug === 'lantana')
if (lantanaColl) {
  lantanaColl.heroImage = '/images/lantana/lantana-hero-models.jpg'
  lantanaColl.bannerImage = '/images/lantana/lantana-shoot-grid.jpg'
  lantanaColl.subtitle = 'An Architecture of Bloom — Soft Hues'
  lantanaColl.description = 'For the girls who love timeless elegance. Architectural tailoring and delicate artisanal scalloped lace trims reimagined through soft pastel hues, handloom Chanderi silks, and shaded ombre dupattas.'
  lantanaColl.productIds = ['p5', 'p6', 'p2']
  lantanaColl.metrics = [
    { label: 'Artisanal Pieces', value: '12' },
    { label: 'Soft Pastel Hues', value: '100%' },
    { label: 'Heritage Weavers', value: '8' },
  ]
}

// Add or update p5
const p5Index = db.products.findIndex((p) => p.id === 'p5')
const p5Data = {
  id: 'p5',
  slug: 'lantana-lilac-salwar-suit',
  name: 'The Lantana Gul-e-Bahar Lilac Salwar Suit',
  subtitle: 'Lantana Pret — Soft Hues Edition',
  price: 34500,
  originalPrice: 42000,
  currency: '₹',
  collection: 'Lantana',
  collectionSlug: 'lantana',
  category: 'Salwar Suits & Sets',
  description: 'For the girls who love timeless elegance. A lyrical symphony in pastel lilac, tailored in breathable handloom Chanderi silk with delicate gold floral buti motifs. Features artisanal scalloped cotton lace trims along the hemline and sleeve cuffs, paired with pale lemon-yellow pleated salwar pants and an airy dual-toned shaded ombre dupatta finished with handcrafted tassels.',
  fabric: 'Handloom Chanderi Silk Kurti, Pure Mul Cotton Salwar, Shaded Chiffon Dupatta with handmade thread tassels.',
  care: [
    'Dry clean only',
    'Store flat in pure muslin cover',
    'Steam iron with reverse protection',
    'Do not bleach',
  ],
  images: [
    {
      url: '/images/lantana/lantana-hero-models.jpg',
      alt: 'Lantana Lilac Salwar Suit - Full Look with Ombre Dupatta',
      isPrimary: true,
    },
    {
      url: '/images/lantana/lantana-detail-hues.jpg',
      alt: 'Lantana Lilac Salwar Suit - Scallop Lace Hem Detail & Soft Hues',
      isPrimary: false,
    },
    {
      url: '/images/lantana/lantana-shoot-grid.jpg',
      alt: 'Lantana Campaign Shoot Lookbook & Garden Editorial',
      isPrimary: false,
    },
  ],
  sizes: [
    { label: 'XS', available: true, measurements: 'Bust 32" / Waist 26"' },
    { label: 'S', available: true, measurements: 'Bust 34" / Waist 28"' },
    { label: 'M', available: true, measurements: 'Bust 36" / Waist 30"' },
    { label: 'L', available: true, measurements: 'Bust 38" / Waist 32"' },
    { label: 'XL', available: true, measurements: 'Bust 40" / Waist 34"' },
  ],
  colors: [
    { name: 'Lilac & Lemon Yellow', hex: '#D8B4E2' },
  ],
  tags: ['salwar-suit', 'lantana', 'co-ord', 'chanderi', 'pastel', 'soft-hues', 'lace', 'dupatta'],
  sku: 'ZY-LT-005',
  status: 'active',
  isFeatured: true,
  isBestseller: true,
  isLimitedEdition: true,
  limitedCount: 45,
  inStock: true,
  badge: 'Signature Piece',
  inventory: [
    { sku: 'ZY-LT-005-XS', color: 'Lilac & Lemon Yellow', size: 'XS', stock: 6, lowStockThreshold: 2 },
    { sku: 'ZY-LT-005-S', color: 'Lilac & Lemon Yellow', size: 'S', stock: 10, lowStockThreshold: 2 },
    { sku: 'ZY-LT-005-M', color: 'Lilac & Lemon Yellow', size: 'M', stock: 12, lowStockThreshold: 3 },
    { sku: 'ZY-LT-005-L', color: 'Lilac & Lemon Yellow', size: 'L', stock: 8, lowStockThreshold: 2 },
    { sku: 'ZY-LT-005-XL', color: 'Lilac & Lemon Yellow', size: 'XL', stock: 4, lowStockThreshold: 2 },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

if (p5Index >= 0) {
  db.products[p5Index] = p5Data
} else {
  db.products.push(p5Data)
}

// Add or update p6
const p6Index = db.products.findIndex((p) => p.id === 'p6')
const p6Data = {
  id: 'p6',
  slug: 'lantana-citron-salwar-set',
  name: 'The Lantana Zari Citron Salwar Set',
  subtitle: 'Lantana Pret — Soft Hues Edition',
  price: 32000,
  originalPrice: 38000,
  currency: '₹',
  collection: 'Lantana',
  collectionSlug: 'lantana',
  category: 'Salwar Suits & Sets',
  description: 'Understated luxury in delicate buttercup yellow. Crafted in pure handloom cotton-silk with a signature scalloped sweetheart neckline and delicate micro-pearl strap detailing. Accented with contrast lilac French lace at the hem and paired with pleated lilac salwar trousers and a matching shaded ombre dupatta.',
  fabric: 'Pure Handloom Cotton-Silk Tunic, Chanderi Pleated Salwar, Shaded Chiffon Dupatta.',
  care: [
    'Dry clean only',
    'Store in breathable cotton bag',
    'Low steam iron on reverse side',
  ],
  images: [
    {
      url: '/images/lantana/lantana-detail-hues.jpg',
      alt: 'Lantana Citron Salwar Set - Scallop Bodice & Floral Hues',
      isPrimary: true,
    },
    {
      url: '/images/lantana/lantana-hero-models.jpg',
      alt: 'Lantana Citron Salwar Set - Model View in Garden',
      isPrimary: false,
    },
    {
      url: '/images/lantana/lantana-shoot-grid.jpg',
      alt: 'Lantana Atelier Shoot Details & Flower Accents',
      isPrimary: false,
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
    { name: 'Citron Yellow & Lilac', hex: '#FFF4BD' },
  ],
  tags: ['salwar-suit', 'lantana', 'co-ord', 'cotton-silk', 'pastel', 'soft-hues', 'scallops', 'dupatta'],
  sku: 'ZY-LT-006',
  status: 'active',
  isFeatured: true,
  isBestseller: false,
  isLimitedEdition: false,
  inStock: true,
  badge: 'New Season',
  inventory: [
    { sku: 'ZY-LT-006-XS', color: 'Citron Yellow & Lilac', size: 'XS', stock: 5, lowStockThreshold: 2 },
    { sku: 'ZY-LT-006-S', color: 'Citron Yellow & Lilac', size: 'S', stock: 8, lowStockThreshold: 2 },
    { sku: 'ZY-LT-006-M', color: 'Citron Yellow & Lilac', size: 'M', stock: 9, lowStockThreshold: 2 },
    { sku: 'ZY-LT-006-L', color: 'Citron Yellow & Lilac', size: 'L', stock: 6, lowStockThreshold: 2 },
    { sku: 'ZY-LT-006-XL', color: 'Citron Yellow & Lilac', size: 'XL', stock: 3, lowStockThreshold: 2 },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

if (p6Index >= 0) {
  db.products[p6Index] = p6Data
} else {
  db.products.push(p6Data)
}

fs.writeFileSync(dbFile, JSON.stringify(db, null, 2), 'utf-8')
console.log('Successfully updated Lantana in db.json!')
