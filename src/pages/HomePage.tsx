import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Leaf,
  Users,
  MapPin,
  Star,
  Sparkles,
} from 'lucide-react'
import { formatPrice } from '@/data/products'
import { useWishlistStore, useCartStore, useCatalogStore } from '@/store'
import type { Product } from '@/types'
import Hero3DModel from '@/components/home/Hero3DModel'
import { siteImages } from '@/config/images'

// ── Marquee CSS injected once ──
const marqueeStyle = `
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.zamyaa-marquee-track {
  display: flex;
  animation: marquee 28s linear infinite;
  width: max-content;
}
.zamyaa-marquee-track:hover {
  animation-play-state: paused;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
`

function injectStyle(css: string, id: string) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style')
    el.id = id
    el.textContent = css
    document.head.appendChild(el)
  }
}

// ── Product Card ──
interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const wishlistStore = useWishlistStore()
  const cartStore = useCartStore()
  const isWishlisted = wishlistStore.isWishlisted(product.id)
  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0]
  const secondaryImage = product.images[1] ?? primaryImage

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    wishlistStore.toggle({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: primaryImage.url,
      addedAt: new Date().toISOString(),
    })
  }

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault()
    setQuickAddOpen(true)
  }

  function handleAddToCart(size: string) {
    cartStore.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size,
      color: product.colors[0]?.name ?? '',
      image: primaryImage.url,
      slug: product.slug,
    })
    cartStore.openCart()
    setQuickAddOpen(false)
    setSelectedSize(null)
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setQuickAddOpen(false) }}
    >
      <Link to={`/product/${product.slug}`} className="block">
        {/* Image container */}
        <div className="relative overflow-hidden aspect-[3/4] mb-4" style={{ background: 'var(--color-surface-container-low)' }}>
          {/* Primary image */}
          <img
            src={primaryImage.url}
            alt={primaryImage.alt}
            className="w-full h-full object-cover transition-all duration-700"
            style={{ opacity: hovered && secondaryImage !== primaryImage ? 0 : 1 }}
          />
          {/* Secondary image */}
          {secondaryImage !== primaryImage && (
            <img
              src={secondaryImage.url}
              alt={secondaryImage.alt}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              style={{ opacity: hovered ? 1 : 0 }}
            />
          )}
          {/* Zoom on hover when no second image */}
          {secondaryImage === primaryImage && (
            <img
              src={primaryImage.url}
              alt={primaryImage.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
              style={{
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
                opacity: hovered ? 1 : 0,
              }}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isLimitedEdition && (
              <span
                className="font-body text-xs font-semibold tracking-widest px-2 py-1 uppercase"
                style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
              >
                Limited
              </span>
            )}
            {product.badge && !product.isLimitedEdition && (
              <span
                className="font-body text-xs font-semibold tracking-widest px-2 py-1 uppercase"
                style={{ background: 'var(--color-surface-container)', color: 'var(--color-on-surface)' }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center transition-all duration-200"
            style={{
              background: 'var(--color-surface-container-lowest)',
              opacity: hovered || isWishlisted ? 1 : 0,
            }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={16}
              style={{
                fill: isWishlisted ? 'var(--color-primary)' : 'transparent',
                stroke: 'var(--color-primary)',
              }}
            />
          </button>

          {/* Quick Add overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-300"
            style={{ transform: hovered ? 'translateY(0)' : 'translateY(100%)', opacity: hovered ? 1 : 0 }}
          >
            {!quickAddOpen ? (
              <button
                onClick={handleQuickAdd}
                className="w-full py-3 font-body text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
                style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
              >
                Quick Add
              </button>
            ) : (
              <div style={{ background: 'var(--color-surface-container-lowest)' }} className="p-3">
                <p className="font-body text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--color-secondary)' }}>
                  Select Size
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz.label}
                      onClick={() => handleAddToCart(sz.label)}
                      disabled={!sz.available}
                      className={`w-9 h-9 font-body text-xs font-semibold transition-all duration-150 ${
                        !sz.available ? 'opacity-30 cursor-not-allowed line-through' : 'hover:opacity-70'
                      } ${selectedSize === sz.label ? 'ring-1' : ''}`}
                      style={{
                        background: selectedSize === sz.label ? 'var(--color-primary)' : 'var(--color-surface-container)',
                        color: selectedSize === sz.label ? 'var(--color-on-primary)' : 'var(--color-on-surface)',
                      }}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="font-body text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--color-secondary)' }}>
            {product.collection}
          </p>
          <h3 className="font-display text-base font-semibold leading-snug mb-2" style={{ color: 'var(--color-on-surface)' }}>
            {product.name}
          </h3>
          <div className="flex items-baseline gap-3">
            <span className="font-body text-sm font-semibold" style={{ color: 'var(--color-on-surface)' }}>
              {formatPrice(product.price, product.currency)}
            </span>
            {product.originalPrice && (
              <span className="font-body text-xs line-through" style={{ color: 'var(--color-secondary)' }}>
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
          </div>

          {/* Colour swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  title={c.name}
                  className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="text-[10px] text-[var(--color-secondary)] ml-0.5 truncate font-body">
                {product.colors.map((c) => c.name).join(' · ')}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

// ── Main HomePage ──
export default function HomePage() {
  const { products, collections, cms, fetchCatalog } = useCatalogStore()
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  injectStyle(marqueeStyle, 'zamyaa-marquee-style')

  // Sync catalog from backend API so admin changes reflect immediately
  useEffect(() => {
    fetchCatalog()
  }, [fetchCatalog])

  // Auto-advance hero carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % totalSlides)
    }, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  function prevSlide() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCurrentSlide((s) => (s - 1 + totalSlides) % totalSlides)
  }

  function nextSlide() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCurrentSlide((s) => (s + 1) % totalSlides)
  }

  const newArrivals = products.slice(0, 4)
  const noorCollection = collections.find((c) => c.slug === 'noor-e-rang')
  const lantanaCollection = collections.find((c) => c.slug === 'lantana')
  const lantanaProduct = products.find((p) => p.collectionSlug === 'lantana')
  const noorProduct = products.find((p) => p.collectionSlug === 'noor-e-rang')

  const instagramImages = [
    siteImages.models.heroGirls,
    siteImages.models.detailHues,
    siteImages.models.shootGrid,
    products[0]?.images[0]?.url,
    products[1]?.images[0]?.url,
    products[2]?.images[0]?.url,
  ].filter(Boolean) as string[]

  const marqueeText =
    'CHANDERI SILK · ZARDOZI · GOTA PATTI · HANDLOOM · ARTISANAL · BESPOKE TAILORING · MADE IN INDIA · '

  return (
    <main style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)' }}>

      {/* ── SECTION 1: Hero Campaign Banner ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-full">
          <div className="grid lg:grid-cols-12 gap-0 items-stretch" style={{ minHeight: '92vh' }}>

            {/* Left column */}
            <div className="lg:col-span-6 flex flex-col justify-center py-20 lg:py-24 pr-0 lg:pr-16">
              {/* Season badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 max-w-8" style={{ background: 'var(--color-primary)' }} />
                <span className="font-body text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--color-secondary)' }}>
                  Autumn / Winter 2025 · Capsule Drop
                </span>
              </div>

              {/* Edition indicator */}
              <div
                className="inline-flex items-center gap-3 mb-8 px-4 py-2 w-fit"
                style={{ border: '1px solid var(--color-outline-variant)' }}
              >
                <span className="font-body text-xs tracking-widest uppercase" style={{ color: 'var(--color-secondary)' }}>
                  Edition 01/03 · Lantana Collection
                </span>
                <div className="h-3 w-px" style={{ background: 'var(--color-outline-variant)' }} />
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{ background: i === currentSlide % 3 ? 'var(--color-primary)' : 'var(--color-outline-variant)' }}
                    />
                  ))}
                </div>
              </div>

              {/* Headline */}
              <h1
                className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6 fade-in-up"
                style={{ color: 'var(--color-on-surface)' }}
              >
                Discover a World of Contemporary Elegance
              </h1>

              {/* Subtext */}
              <p className="font-body text-base lg:text-lg leading-relaxed mb-10 max-w-lg" style={{ color: 'var(--color-secondary)' }}>
                Chanderi silks reborn in architectural silhouettes. Zardozi that whispers of royal courts.
                Each piece is a collaboration between heritage craft and the modern muse.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/collections"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 font-body text-sm font-semibold tracking-widest uppercase transition-opacity duration-200 hover:opacity-80"
                  style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
                >
                  Shop New Season <ArrowRight size={16} />
                </Link>
                <Link
                  to="/collections/lantana"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 font-body text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:bg-black hover:text-white"
                  style={{ border: '1px solid var(--color-primary)', color: 'var(--color-primary)' }}
                >
                  Explore the Campaign
                </Link>
              </div>

              {/* Carousel controls */}
              <div className="flex items-center gap-6">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid var(--color-outline-variant)' }}
                  aria-label="Previous slide"
                >
                  <ArrowLeft size={18} style={{ color: 'var(--color-on-surface)' }} />
                </button>
                <span className="font-body text-sm font-semibold tracking-widest" style={{ color: 'var(--color-secondary)' }}>
                  {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                </span>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 flex items-center justify-center transition-all duration-200 hover:opacity-70"
                  style={{ background: 'var(--color-primary)' }}
                  aria-label="Next slide"
                >
                  <ArrowRight size={18} style={{ color: 'var(--color-on-primary)' }} />
                </button>
              </div>
            </div>

            {/* Right column — Interactive 3D Model of the Atelier Models */}
            <div className="lg:col-span-6 relative flex flex-col justify-center min-h-[580px] lg:min-h-[720px] shadow-2xl border-l border-white/5">
              <Hero3DModel heroImage={cms?.hero?.imageUrl} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Marquee Ticker ── */}
      <section
        className="py-5 overflow-hidden"
        style={{ background: 'var(--color-primary)' }}
      >
        <div className="zamyaa-marquee-track">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="font-body text-sm font-semibold tracking-[0.25em] uppercase whitespace-nowrap pr-8"
              style={{ color: 'var(--color-on-primary)' }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: Craft Heritage Pillars ── */}
      <section
        className="py-16 lg:py-20"
        style={{ background: 'var(--color-surface-container-lowest)' }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 relative">
            {[
              {
                icon: <Star size={22} />,
                label: 'Since 2018 · Artisan First',
                stat: '8+ Years',
                sublabel: 'Luxury Fashion Heritage',
              },
              {
                icon: <Users size={22} />,
                label: 'Heritage Craft',
                stat: '1200+ Artisans',
                sublabel: 'Master Craftspeople',
              },
              {
                icon: <MapPin size={22} />,
                label: 'Ethical Luxury',
                stat: '12 Craft Clusters',
                sublabel: 'Across India',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-8 py-10 relative"
                style={{
                  borderRight: idx < 2 ? '1px solid var(--color-outline-variant)' : undefined,
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-5"
                  style={{ border: '1px solid var(--color-outline-variant)', color: 'var(--color-secondary)' }}
                >
                  {pillar.icon}
                </div>
                <p className="font-body text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-secondary)' }}>
                  {pillar.label}
                </p>
                <p className="font-display text-4xl font-bold mb-2" style={{ color: 'var(--color-on-surface)' }}>
                  {pillar.stat}
                </p>
                <p className="font-body text-sm" style={{ color: 'var(--color-secondary)' }}>
                  {pillar.sublabel}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3.5: The Two Signature Categories ── */}
      <section className="py-20 lg:py-24 border-b border-black/5" style={{ background: 'var(--color-surface)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-secondary)' }}>
              Curated Silhouettes
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: 'var(--color-on-surface)' }}>
              Two Signature Categories
            </h2>
            <p className="font-body text-sm mt-3" style={{ color: 'var(--color-secondary)' }}>
              Bespoke craftsmanship distilled into two timeless silhouettes for the discerning muse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Category 1: Farshi Suit-Set */}
            <Link
              to="/collections?category=farshi-suit-set"
              className="group relative overflow-hidden block aspect-[4/5] bg-neutral-900 text-white shadow-xl"
            >
              <img
                src="/images/models/lantana-hero-models.jpg"
                alt="Farshi Suit-Set"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-amber-200 block mb-2">
                  Atelier Silhouette · 01
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-normal mb-2 text-white">
                  Farshi Suit-Set
                </h3>
                <p className="font-body text-xs text-neutral-300 max-w-md mb-5 leading-relaxed">
                  Sweeping, architectural farshi trousers tailored with pure handloom Chanderi silk kurtis and artisan dupattas.
                </p>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border-b border-white pb-1 group-hover:gap-3 transition-all">
                  Shop Farshi Suits <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            {/* Category 2: Skirt Top */}
            <Link
              to="/collections?category=skirt-top"
              className="group relative overflow-hidden block aspect-[4/5] bg-neutral-900 text-white shadow-xl"
            >
              <img
                src="/images/models/lantana-detail-hues.jpg"
                alt="Skirt Top"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-amber-200 block mb-2">
                  Atelier Silhouette · 02
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-normal mb-2 text-white">
                  Skirt Top
                </h3>
                <p className="font-body text-xs text-neutral-300 max-w-md mb-5 leading-relaxed">
                  Sculpted corsets, sweetheart bodices, and billowing handwoven skirts adorned with artisanal lace.
                </p>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border-b border-white pb-1 group-hover:gap-3 transition-all">
                  Shop Skirt Tops <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Collection Switcher Ribbon */}
          <div className="mt-16 pt-10 border-t border-black/10">
            <p className="text-center font-mono text-[11px] uppercase tracking-widest text-neutral-500 mb-6">
              Explore Our 7 Curated Capsules & Archival Editions
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {collections.map((c) => (
                <Link
                  key={c.slug}
                  to={`/collections/${c.slug}`}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-all rounded-full flex items-center gap-1.5"
                >
                  {c.title}
                  {c.isOld && <span className="text-[9px] opacity-60 font-mono">(Archive)</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Featured Collection — Noor-e-Rang ── */}
      {noorCollection && (
        <section className="py-20 lg:py-28">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Text side */}
              <div>
                <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-secondary)' }}>
                  {noorCollection.capsule} · {noorCollection.season}
                </p>
                <h2 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4" style={{ color: 'var(--color-on-surface)' }}>
                  {noorCollection.title}
                </h2>
                <p className="font-display text-xl italic mb-6" style={{ color: 'var(--color-secondary)' }}>
                  {noorCollection.subtitle}
                </p>
                <p className="font-body text-base leading-relaxed mb-10 max-w-md" style={{ color: 'var(--color-secondary)' }}>
                  {noorCollection.description}
                </p>

                {/* Metrics ribbon */}
                <div
                  className="grid grid-cols-3 mb-10"
                  style={{ borderTop: '1px solid var(--color-outline-variant)', borderBottom: '1px solid var(--color-outline-variant)' }}
                >
                  {noorCollection.metrics?.map((m, i) => (
                    <div
                      key={i}
                      className="py-5 text-center"
                      style={{ borderRight: i < 2 ? '1px solid var(--color-outline-variant)' : undefined }}
                    >
                      <p className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--color-on-surface)' }}>{m.value}</p>
                      <p className="font-body text-xs tracking-wide uppercase" style={{ color: 'var(--color-secondary)' }}>{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={`/collections/${noorCollection.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-4 font-body text-sm font-semibold tracking-widest uppercase transition-opacity duration-200 hover:opacity-80"
                    style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
                  >
                    Shop This Collection <ArrowRight size={16} />
                  </Link>
                  <Link
                    to={`/collections/${noorCollection.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-4 font-body text-sm font-semibold tracking-widest uppercase transition-all duration-200"
                    style={{ border: '1px solid var(--color-outline-variant)', color: 'var(--color-on-surface)' }}
                  >
                    View Lookbook
                  </Link>
                </div>
              </div>

              {/* Image side */}
              <div className="relative overflow-hidden aspect-[4/5]" style={{ background: 'var(--color-surface-container-low)' }}>
                <img
                  src={noorCollection.heroImage}
                  alt={noorCollection.title}
                  className="w-full h-full object-cover"
                />
                {noorProduct && (
                  <div
                    className="absolute bottom-6 left-6 right-6 p-5"
                    style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)' }}
                  >
                    <p className="font-body text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--color-secondary)' }}>
                      Featured Piece
                    </p>
                    <p className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>
                      {noorProduct.name}
                    </p>
                    <p className="font-body text-sm font-semibold" style={{ color: 'var(--color-on-surface)' }}>
                      {formatPrice(noorProduct.price, noorProduct.currency)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 5: Product Grid — New Arrivals ── */}
      <section className="py-20 lg:py-24" style={{ background: 'var(--color-surface-container-lowest)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="flex items-center gap-6 mb-14">
            <div className="h-px flex-1" style={{ background: 'var(--color-outline-variant)' }} />
            <h2 className="font-body text-xs font-semibold tracking-[0.4em] uppercase whitespace-nowrap" style={{ color: 'var(--color-on-surface)' }}>
              New Arrivals
            </h2>
            <div className="h-px flex-1" style={{ background: 'var(--color-outline-variant)' }} />
          </div>

          {/* 4-col product grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View all */}
          <div className="text-center mt-14">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-10 py-4 font-body text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:opacity-80"
              style={{ border: '1px solid var(--color-primary)', color: 'var(--color-primary)' }}
            >
              View All Products <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Editorial Feature — Lantana Collection ── */}
      {lantanaCollection && lantanaProduct && (
        <section className="py-20 lg:py-28">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-0 items-stretch">
              {/* Image */}
              <div
                className="relative overflow-hidden aspect-[4/5] lg:aspect-auto"
                style={{ background: 'var(--color-surface-container-low)', minHeight: '480px' }}
              >
                <img
                  src={lantanaProduct.images[0]?.url}
                  alt={lantanaCollection.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div
                className="flex flex-col justify-center px-10 lg:px-16 py-16"
                style={{ background: 'var(--color-surface-container)' }}
              >
                <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--color-secondary)' }}>
                  Capsule Collection · {lantanaCollection.season}
                </p>
                <h2 className="font-display text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ color: 'var(--color-on-surface)' }}>
                  {lantanaCollection.title}
                </h2>
                <p className="font-display text-xl italic mb-6" style={{ color: 'var(--color-secondary)' }}>
                  {lantanaCollection.subtitle}
                </p>
                <p className="font-body text-base leading-relaxed mb-10 max-w-sm" style={{ color: 'var(--color-secondary)' }}>
                  {lantanaCollection.description}
                </p>
                <Link
                  to={`/collections/${lantanaCollection.slug}`}
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold tracking-widest uppercase transition-opacity duration-200 hover:opacity-70 w-fit"
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  Explore Lantana <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 7: Craft Story / Values ── */}
      <section className="py-20 lg:py-24" style={{ background: 'var(--color-surface-container-low)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--color-secondary)' }}>
              Our Philosophy
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold" style={{ color: 'var(--color-on-surface)' }}>
              Craft. Conscience. Couture.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Leaf size={24} />,
                title: 'Ethical Sourcing',
                desc: 'Every fabric is sourced responsibly — from GOTS-certified cotton mills to fair-trade silk cooperatives that protect artisan livelihoods.',
              },
              {
                icon: <Users size={24} />,
                title: 'Artisan Partnerships',
                desc: 'We work directly with master craftspeople across 12 craft clusters in Rajasthan, Lucknow, and Varanasi — paying fair wages above industry average.',
              },
              {
                icon: <Sparkles size={24} />,
                title: 'Conscious Luxury',
                desc: 'Small-batch production, natural dyes, zero-waste pattern-cutting, and compostable packaging — luxury that respects both people and planet.',
              },
            ].map((val, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <div
                  className="w-14 h-14 flex items-center justify-center mb-6"
                  style={{ background: 'var(--color-surface-container)', color: 'var(--color-on-surface)' }}
                >
                  {val.icon}
                </div>
                <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--color-on-surface)' }}>
                  {val.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: Instagram Feed Preview ── */}
      <section className="py-20 lg:py-24" style={{ background: 'var(--color-surface-container-lowest)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--color-secondary)' }}>
              Follow Our World
            </p>
            <h2 className="font-display text-2xl lg:text-3xl font-bold" style={{ color: 'var(--color-on-surface)' }}>
              @zamyaabyjyoti
            </h2>
          </div>

          {/* 6-col image grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5">
            {instagramImages.map((url, i) => (
              <div key={i} className="relative overflow-hidden aspect-square group cursor-pointer">
                <img
                  src={url}
                  alt={`ZAMYAA Instagram ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(0,0,0,0.4)' }}
                >
                  <Heart size={20} style={{ color: '#fff' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Follow button */}
          <div className="text-center mt-10">
            <a
              href="https://instagram.com/zamyaabyjyoti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 font-body text-sm font-semibold tracking-widest uppercase transition-opacity duration-200 hover:opacity-70"
              style={{ border: '1px solid var(--color-outline-variant)', color: 'var(--color-on-surface)' }}
            >
              Follow on Instagram <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Newsletter strip ── */}
      <section
        className="py-16 lg:py-20"
        style={{ background: 'var(--color-primary)' }}
      >
        <div className="max-w-screen-md mx-auto px-6 text-center">
          <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
            The Inner Circle
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--color-on-primary)' }}>
            First Access. Always.
          </h2>
          <p className="font-body text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Join our inner circle for early access to new capsule drops, exclusive campaign previews, and bespoke styling invitations.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 font-body text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'var(--color-on-primary)',
              }}
            />
            <button
              type="submit"
              className="px-6 py-3 font-body text-sm font-semibold tracking-widest uppercase transition-opacity duration-200 hover:opacity-80 whitespace-nowrap"
              style={{ background: 'var(--color-on-primary)', color: 'var(--color-primary)' }}
            >
              Join Now
            </button>
          </form>
        </div>
      </section>

    </main>
  )
}
