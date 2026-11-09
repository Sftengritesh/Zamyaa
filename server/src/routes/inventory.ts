import { Router, Request, Response } from 'express'
import { db } from '../db/store.js'

const inventoryRouter = Router()

// Get full inventory table with stats
inventoryRouter.get('/', (req: Request, res: Response) => {
  const products = db.getProducts()

  const items: any[] = []
  let totalStockUnits = 0
  let lowStockCount = 0
  let outOfStockCount = 0

  products.forEach((p) => {
    (p.inventory || []).forEach((inv) => {
      totalStockUnits += inv.stock
      const isOutOfStock = inv.stock <= 0
      const isLowStock = inv.stock > 0 && inv.stock <= inv.lowStockThreshold

      if (isOutOfStock) outOfStockCount++
      if (isLowStock) lowStockCount++

      items.push({
        productId: p.id,
        productName: p.name,
        productSlug: p.slug,
        image: p.images[0]?.url || '',
        category: p.category,
        collection: p.collection,
        sku: inv.sku,
        color: inv.color,
        size: inv.size,
        stock: inv.stock,
        lowStockThreshold: inv.lowStockThreshold,
        status: isOutOfStock ? 'out-of-stock' : isLowStock ? 'low-stock' : 'in-stock',
      })
    })
  })

  const { status, search } = req.query
  let filtered = items

  if (status && status !== 'all') {
    filtered = filtered.filter((i) => i.status === status)
  }
  if (search) {
    const q = String(search).toLowerCase()
    filtered = filtered.filter(
      (i) =>
        i.productName.toLowerCase().includes(q) ||
        i.sku.toLowerCase().includes(q) ||
        i.size.toLowerCase().includes(q) ||
        i.color.toLowerCase().includes(q)
    )
  }

  res.json({
    success: true,
    stats: {
      totalStockUnits,
      lowStockCount,
      outOfStockCount,
      totalVariants: items.length,
    },
    inventory: filtered,
  })
})

// Update stock count for a specific SKU
inventoryRouter.patch('/stock', (req: Request, res: Response) => {
  const { productId, sku, stock } = req.body

  const product = db.getProductById(productId)
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' })
  }

  const itemIndex = product.inventory.findIndex((i) => i.sku === sku)
  if (itemIndex === -1) {
    return res.status(404).json({ success: false, message: 'SKU not found in product inventory' })
  }

  product.inventory[itemIndex].stock = Math.max(0, Number(stock))

  // Sync size availability
  const sizeObj = product.sizes.find((s) => s.label === product.inventory[itemIndex].size)
  if (sizeObj) {
    sizeObj.available = product.inventory[itemIndex].stock > 0
  }

  // Sync overall inStock
  product.inStock = product.inventory.some((i) => i.stock > 0)

  db.updateProduct(product.id, {
    inventory: product.inventory,
    sizes: product.sizes,
    inStock: product.inStock,
  })

  res.json({ success: true, updatedItem: product.inventory[itemIndex], product })
})

// Quick mark sold out
inventoryRouter.patch('/sold-out', (req: Request, res: Response) => {
  const { productId, sku } = req.body
  const product = db.getProductById(productId)
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' })
  }

  const item = product.inventory.find((i) => i.sku === sku)
  if (!item) {
    return res.status(404).json({ success: false, message: 'SKU not found' })
  }

  item.stock = 0

  const sizeObj = product.sizes.find((s) => s.label === item.size)
  if (sizeObj) sizeObj.available = false

  product.inStock = product.inventory.some((i) => i.stock > 0)

  db.updateProduct(product.id, {
    inventory: product.inventory,
    sizes: product.sizes,
    inStock: product.inStock,
  })

  res.json({ success: true, message: 'Item marked as sold out' })
})

export default inventoryRouter

