import { Router, Request, Response } from 'express'
import { db, Product } from '../db/store.js'

const productsRouter = Router()

// List all products with optional filters
productsRouter.get('/', (req: Request, res: Response) => {
  let list = db.getProducts()

  const { collection, category, status, search, featured, bestseller } = req.query

  if (collection && collection !== 'all') {
    list = list.filter((p) => p.collectionSlug === collection || p.collection === collection)
  }
  if (category && category !== 'all') {
    list = list.filter((p) => p.category === category || p.tags.includes(String(category)))
  }
  if (status && status !== 'all') {
    list = list.filter((p) => p.status === status)
  }
  if (featured === 'true') {
    list = list.filter((p) => p.isFeatured)
  }
  if (bestseller === 'true') {
    list = list.filter((p) => p.isBestseller)
  }
  if (search) {
    const q = String(search).toLowerCase()
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
  }

  res.json({ success: true, count: list.length, products: list })
})

// Get single product
productsRouter.get('/:id', (req: Request, res: Response) => {
  const product = db.getProductById(req.params.id)
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' })
  }
  res.json({ success: true, product })
})

// Create new product
productsRouter.post('/', (req: Request, res: Response) => {
  try {
    const body = req.body
    if (!body.name || !body.price) {
      return res.status(400).json({ success: false, message: 'Name and price are required' })
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

    const sku = body.sku || `ZY-${Date.now().toString().slice(-4)}`

    // Generate initial inventory matrix if not passed
    const sizes = body.sizes || [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
    ]
    const colors = body.colors || [{ name: 'Default', hex: '#000000' }]

    const inventory =
      body.inventory ||
      colors.flatMap((c: any) =>
        sizes.map((s: any) => ({
          sku: `${sku}-${s.label}`,
          color: c.name,
          size: s.label,
          stock: s.available ? 10 : 0,
          lowStockThreshold: 2,
        }))
      )

    const newProduct = db.createProduct({
      name: body.name,
      slug,
      subtitle: body.subtitle || '',
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      currency: body.currency || '₹',
      collection: body.collection || 'Noor-e-Rang',
      collectionSlug:
        body.collectionSlug ||
        body.collection?.toLowerCase().replace(/\s+/g, '-') ||
        'noor-e-rang',
      category: body.category || 'Co-Ord Sets',
      description: body.description || '',
      fabric: body.fabric || '',
      care: body.care || ['Dry clean only'],
      images: body.images || [],
      sizes,
      colors,
      tags: body.tags || [],
      sku,
      status: body.status || 'active',
      isFeatured: !!body.isFeatured,
      isBestseller: !!body.isBestseller,
      isLimitedEdition: !!body.isLimitedEdition,
      limitedCount: body.limitedCount ? Number(body.limitedCount) : undefined,
      inStock: body.inStock !== false,
      badge: body.badge || '',
      inventory,
    })

    res.status(201).json({ success: true, product: newProduct })
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// Update product
productsRouter.put('/:id', (req: Request, res: Response) => {
  const updated = db.updateProduct(req.params.id, req.body)
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Product not found' })
  }
  res.json({ success: true, product: updated })
})

// Quick field toggles (status, inStock, isFeatured, isBestseller)
productsRouter.patch('/:id/toggle', (req: Request, res: Response) => {
  const { field } = req.body
  const product = db.getProductById(req.params.id)
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' })
  }

  const updates: Partial<Product> = {}
  if (field === 'status') {
    updates.status = product.status === 'active' ? 'draft' : 'active'
  } else if (field === 'inStock') {
    updates.inStock = !product.inStock
  } else if (field === 'isFeatured') {
    updates.isFeatured = !product.isFeatured
  } else if (field === 'isBestseller') {
    updates.isBestseller = !product.isBestseller
  }

  const updated = db.updateProduct(product.id, updates)
  res.json({ success: true, product: updated })
})

// Delete product
productsRouter.delete('/:id', (req: Request, res: Response) => {
  const ok = db.deleteProduct(req.params.id)
  if (!ok) {
    return res.status(404).json({ success: false, message: 'Product not found' })
  }
  res.json({ success: true, message: 'Product deleted successfully' })
})

export default productsRouter
