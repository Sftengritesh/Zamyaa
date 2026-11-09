import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Heart,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Ruler,
  ArrowLeft,
} from 'lucide-react'
import { useCartStore, useWishlistStore, useCatalogStore } from '@/store'
import { formatPrice } from '@/data/products'
import type { Product } from '@/types'

// ── Accordion Item ───────────────────────────────────────────────────────────
interface AccordionItemProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-outline-variant)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
        style={{ color: 'var(--color-on-surface)' }}
      >
        <span className="font-body text-xs font-semibold tracking-[0.15em]">{title}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div
          className="pb-5 font-body text-sm leading-relaxed"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

// ── Product Card (mini) ──────────────────────────────────────────────────────
interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const img = product.images.find((i) => i.isPrimary) || product.images[0]
  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div
        className="mb-3 overflow-hidden"
        style={{ background: 'var(--color-surface-container-low)' }}
      >
        <img
          src={img?.url}
          alt={img?.alt ?? product.name}
          className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p
        className="font-body text-xs tracking-[0.1em] uppercase mb-0.5"
        style={{ color: 'var(--color-on-surface-variant)' }}
      >
        {product.collection}
      </p>
      <p className="font-display text-sm mb-1">{product.name}</p>
      <p className="font-body text-sm font-semibold">{formatPrice(product.price, product.currency)}</p>
    </Link>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function ProductPage() {
  const { products, fetchCatalog } = useCatalogStore()
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { addItem, openCart } = useCartStore()
  const { toggle, isWishlisted } = useWishlistStore()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    fetchCatalog()
  }, [fetchCatalog, slug])

  const product = products.find((p) => p.slug === slug || p.id === slug)

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>(
    () => product?.colors[0]?.name ?? ''
  )
  const [quantity] = useState(1)
  const [addedError, setAddedError] = useState<string | null>(null)

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <p
          className="font-display text-2xl"
          style={{ color: 'var(--color-on-surface)' }}
        >
          Product not found
        </p>
        <button
          type="button"
          onClick={() => navigate('/collections')}
          className="font-body text-sm tracking-[0.12em] underline"
          style={{ color: 'var(--color-secondary)' }}
        >
          Browse Collections
        </button>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 3)

  const youMayAlsoLike = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const isInWishlist = isWishlisted(product.id)

  const handleAddToBag = () => {
    if (!product) return
    if (!selectedSize) {
      setAddedError('Please select a size.')
      return
    }
    setAddedError(null)
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0]?.url ?? '',
      slug: product.slug,
    })
    openCart()
  }

  const handleToggleWishlist = () => {
    if (!product) return
    toggle({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url ?? '',
      addedAt: new Date().toISOString(),
    })
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* ── Breadcrumb ── */}
      <div className="px-6 md:px-12 pt-6 pb-2">
        <nav
          className="flex items-center gap-2 font-body text-xs tracking-[0.08em]"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:underline">Collections</Link>
          <span>/</span>
          <Link
            to={`/collections/${product.collectionSlug}`}
            className="hover:underline"
          >
            {product.collection}
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--color-on-surface)' }} className="truncate max-w-[180px]">
            {product.name}
          </span>
        </nav>
      </div>

      {/* ── Back link (mobile) ── */}
      <div className="px-6 pt-2 pb-0 md:hidden">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 font-body text-xs tracking-widest"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          <ArrowLeft size={14} />
          BACK
        </button>
      </div>

      {/* ── Main 12-col grid ── */}
      <div className="px-6 md:px-12 py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

        {/* ── LEFT: Gallery (7 cols) ── */}
        <div className="md:col-span-7">
          {/* Mobile: main image first, thumbnails below */}
          <div className="flex flex-col-reverse md:flex-row gap-4">

            {/* Thumbnail rail */}
            <div className="flex flex-row md:flex-col gap-2 md:w-24 overflow-x-auto md:overflow-visible">
              {product.images.map((img, i) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setSelectedImageIndex(i)}
                  className="shrink-0 overflow-hidden transition-all duration-200"
                  style={{
                    width: '72px',
                    height: '90px',
                    outline:
                      selectedImageIndex === i
                        ? '2px solid var(--color-primary)'
                        : '2px solid transparent',
                    outlineOffset: '2px',
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 overflow-hidden" style={{ background: 'var(--color-surface-container-low)' }}>
              <img
                src={product.images[selectedImageIndex]?.url ?? product.images[0]?.url}
                alt={product.images[selectedImageIndex]?.alt ?? product.name}
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Product Info (5 cols) ── */}
        <div className="md:col-span-5 flex flex-col gap-5">

          {/* Limited edition badge */}
          {product.isLimitedEdition && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 self-start"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
              }}
            >
              <span className="font-body text-[10px] font-semibold tracking-[0.18em]">
                EDITION: LIMITED TO {product.limitedCount} PIECES · IN STOCK &amp; READY TO SHIP
              </span>
            </div>
          )}

          {/* Name + subtitle */}
          <div>
            <h1
              className="font-display text-3xl md:text-4xl leading-tight mb-2"
              style={{ color: 'var(--color-on-surface)' }}
            >
              {product.name}
            </h1>
            {product.subtitle && (
              <p
                className="font-body text-sm italic"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span
              className="font-body text-2xl font-semibold"
              style={{ color: 'var(--color-primary)' }}
            >
              {formatPrice(product.price, product.currency)}
            </span>
            {product.originalPrice && (
              <span
                className="font-body text-base line-through"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
          </div>

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{ background: 'var(--color-outline-variant)' }}
          />

          {/* Color selector */}
          <div>
            <p
              className="font-body text-xs font-semibold tracking-[0.14em] mb-3"
              style={{ color: 'var(--color-on-surface)' }}
            >
              COLOUR:{' '}
              <span style={{ color: 'var(--color-secondary)' }}>{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className="w-8 h-8 rounded-full transition-all duration-150"
                  style={{
                    background: c.hex,
                    outline:
                      selectedColor === c.name
                        ? '2px solid var(--color-primary)'
                        : '2px solid var(--color-outline-variant)',
                    outlineOffset: '2px',
                    border: 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p
                className="font-body text-xs font-semibold tracking-[0.14em]"
                style={{ color: 'var(--color-on-surface)' }}
              >
                SIZE:{' '}
                {selectedSize && (
                  <span style={{ color: 'var(--color-secondary)' }}>{selectedSize}</span>
                )}
              </p>
              <button
                type="button"
                className="flex items-center gap-1 font-body text-xs tracking-widest underline"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                <Ruler size={12} />
                SIZE GUIDE
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  disabled={!s.available}
                  onClick={() => s.available && setSelectedSize(s.label)}
                  title={s.measurements ?? s.label}
                  className="py-2.5 font-body text-xs font-semibold tracking-widest transition-all duration-150"
                  style={{
                    background:
                      selectedSize === s.label
                        ? 'var(--color-primary)'
                        : 'transparent',
                    color:
                      !s.available
                        ? 'var(--color-outline-variant)'
                        : selectedSize === s.label
                        ? 'var(--color-on-primary)'
                        : 'var(--color-on-surface)',
                    border:
                      selectedSize === s.label
                        ? '1px solid var(--color-primary)'
                        : '1px solid var(--color-outline-variant)',
                    cursor: !s.available ? 'not-allowed' : 'pointer',
                    textDecoration: !s.available ? 'line-through' : 'none',
                    opacity: !s.available ? 0.45 : 1,
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {addedError && (
              <p
                className="mt-2 font-body text-xs"
                style={{ color: 'var(--color-error)' }}
              >
                {addedError}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleAddToBag}
              className="flex items-center justify-center gap-3 w-full py-4 font-body text-xs font-semibold tracking-[0.18em] transition-opacity duration-150 hover:opacity-80"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
              }}
            >
              <ShoppingBag size={16} />
              ADD TO BAG
            </button>
            <button
              type="button"
              onClick={handleToggleWishlist}
              className="flex items-center justify-center gap-3 w-full py-4 font-body text-xs font-semibold tracking-[0.18em] transition-all duration-150 hover:opacity-80"
              style={{
                background: 'transparent',
                color: isInWishlist ? 'var(--color-primary)' : 'var(--color-on-surface)',
                border: '1px solid var(--color-outline-variant)',
              }}
            >
              <Heart
                size={16}
                fill={isInWishlist ? 'var(--color-primary)' : 'none'}
                stroke={isInWishlist ? 'var(--color-primary)' : 'currentColor'}
              />
              {isInWishlist ? 'WISHLISTED' : 'ADD TO WISHLIST'}
            </button>
          </div>

          {/* Accordions */}
          <div className="mt-2">
            <AccordionItem title="PRODUCT DETAILS" defaultOpen>
              <p>{product.description}</p>
            </AccordionItem>

            <AccordionItem title="FABRIC &amp; CARE">
              <p className="mb-3">{product.fabric}</p>
              <ul className="space-y-1.5">
                {product.care.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: 'var(--color-secondary)' }}
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </AccordionItem>

            <AccordionItem title="SHIPPING &amp; RETURNS">
              <p>
                Complimentary express shipping on orders over ₹15,000. Returns accepted within
                7 days in original packaging. Items must be unworn with all tags attached.
              </p>
            </AccordionItem>

            <AccordionItem title="BESPOKE TAILORING">
              <p>
                Each Zamyaa piece can be crafted to your exact measurements. Our bespoke service
                takes 7–14 business days. Contact our atelier at{' '}
                <a
                  href="mailto:atelier@zamyaa.com"
                  className="underline"
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  atelier@zamyaa.com
                </a>{' '}
                or visit us in Mumbai or Delhi for a private consultation.
              </p>
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* ── Complete the Look ── */}
      {relatedProducts.length > 0 && (
        <section
          className="px-6 md:px-12 py-16"
          style={{ background: 'var(--color-surface-container-lowest)' }}
        >
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="font-body text-xs tracking-[0.2em] mb-2"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                EDITORIAL SELECTION
              </p>
              <h2
                className="font-display text-2xl md:text-3xl"
                style={{ color: 'var(--color-on-surface)' }}
              >
                Complete the Look
              </h2>
            </div>
            <Link
              to={`/collections/${product.collectionSlug}`}
              className="hidden md:inline-block font-body text-xs tracking-[0.14em] underline"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              VIEW COLLECTION
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ── You May Also Like ── */}
      {youMayAlsoLike.length > 0 && (
        <section className="px-6 md:px-12 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="font-body text-xs tracking-[0.2em] mb-2"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                CURATED FOR YOU
              </p>
              <h2
                className="font-display text-2xl md:text-3xl"
                style={{ color: 'var(--color-on-surface)' }}
              >
                You May Also Like
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {youMayAlsoLike.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
