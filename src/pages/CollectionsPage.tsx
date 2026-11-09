import { useState, useEffect, useMemo } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { Eye, Sparkles, X, ChevronRight } from 'lucide-react'
import { useCatalogStore } from '@/store'
import ProductCard from '@/components/ui/ProductCard'
import { siteImages } from '@/config/images'

export default function CollectionsPage() {
  const { products, collections, fetchCatalog } = useCatalogStore()
  const { slug } = useParams<{ slug?: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCatalog()
  }, [fetchCatalog])

  // Support both /collections/lantana AND /collections?collection=lantana
  const activeCollectionSlug = slug || searchParams.get('collection') || 'all'
  const activeCategory = searchParams.get('category') || 'all'
  const sortBy = searchParams.get('sort') || 'featured'

  const [viewMode, setViewMode] = useState<'3-col' | '4-col'>('3-col')
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; subtitle?: string } | null>(null)

  // Find active collection or default to Lantana if on lantana, else Noor-e-Rang
  const currentCollection =
    collections.find((c) => c.slug === activeCollectionSlug) ||
    collections.find((c) => c.slug === 'lantana') ||
    collections[0]

  const categories = [
    { label: 'All Pieces', value: 'all' },
    { label: 'Farshi Suit-Set', value: 'farshi-suit-set' },
    { label: 'Skirt Top', value: 'skirt-top' },
  ]

  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (activeCollectionSlug !== 'all') {
      list = list.filter((p) => p.collectionSlug === activeCollectionSlug)
    }

    if (activeCategory !== 'all') {
      list = list.filter((p) => {
        const pCat = p.category?.toLowerCase().replace(/[^a-z0-9]/g, '')
        const activeCat = activeCategory.toLowerCase().replace(/[^a-z0-9]/g, '')
        return (
          pCat === activeCat ||
          p.tags?.some((t) => t.toLowerCase().replace(/[^a-z0-9]/g, '') === activeCat)
        )
      })
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price)
    }

    return list
  }, [products, activeCollectionSlug, activeCategory, sortBy])

  const handleCollectionChange = (newSlug: string) => {
    if (slug) {
      if (newSlug === 'all') navigate('/collections')
      else navigate(`/collections/${newSlug}`)
    } else {
      const next = new URLSearchParams(searchParams)
      if (newSlug === 'all') next.delete('collection')
      else next.set('collection', newSlug)
      setSearchParams(next)
    }
  }

  const handleCategoryChange = (cat: string) => {
    const next = new URLSearchParams(searchParams)
    if (cat === 'all') next.delete('category')
    else next.set('category', cat)
    setSearchParams(next)
  }

  const handleSortChange = (sort: string) => {
    const next = new URLSearchParams(searchParams)
    if (sort === 'featured') next.delete('sort')
    else next.set('sort', sort)
    setSearchParams(next)
  }

  // Active mosaic images
  const mosaicImages = currentCollection?.mosaicImages || [
    siteImages.models.heroGirls,
    siteImages.models.detailHues,
    siteImages.models.shootGrid,
  ]

  return (
    <div
      className="min-h-screen font-body"
      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
    >
      {/* ── EDITORIAL HERO CAMPAIGN ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[720px]">
          {/* Left Column: Editorial Dossier */}
          <div
            className="lg:col-span-5 flex flex-col justify-between p-8 md:p-16 z-10"
            style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3" style={{ color: 'var(--color-secondary)' }}>
                <span className="text-[0.6875rem] tracking-[0.25em] uppercase font-semibold font-body">
                  {currentCollection ? currentCollection.capsule : 'EDITION 01/03'}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
                <span className="text-[0.6875rem] tracking-[0.25em] uppercase font-semibold font-body">
                  {currentCollection ? currentCollection.season : 'SPRING-SUMMER 2026'}
                </span>
              </div>

              <div className="space-y-2">
                <h1
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {currentCollection ? currentCollection.title : 'Lantana'}
                </h1>
                <p
                  className="font-display text-xl sm:text-2xl italic font-normal"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  {currentCollection
                    ? currentCollection.subtitle
                    : 'An Architecture of Bloom — Soft Hues'}
                </p>
              </div>

              <p
                className="font-body text-sm sm:text-base leading-relaxed max-w-md pt-2"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {currentCollection
                  ? currentCollection.description
                  : 'For the girls who love timeless elegance. Architectural tailoring and delicate artisanal scalloped lace trims reimagined through soft pastel hues, handloom Chanderi silks, and shaded ombre dupattas.'}
              </p>
            </div>

            <div className="pt-8 space-y-6">
              {/* Metrics Ribbon */}
              <div
                className="grid grid-cols-3 gap-4 py-4 px-5"
                style={{ backgroundColor: 'var(--color-surface-container-low)' }}
              >
                <div>
                  <p
                    className="font-body text-xl font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {currentCollection?.metrics?.[0]?.value || '12'}
                  </p>
                  <p
                    className="text-[0.625rem] tracking-[0.16em] uppercase font-body font-semibold mt-0.5"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    {currentCollection?.metrics?.[0]?.label || 'Archival Pieces'}
                  </p>
                </div>
                <div>
                  <p
                    className="font-body text-xl font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {currentCollection?.metrics?.[1]?.value || '100%'}
                  </p>
                  <p
                    className="text-[0.625rem] tracking-[0.16em] uppercase font-body font-semibold mt-0.5"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    {currentCollection?.metrics?.[1]?.label || 'Pure Handloom'}
                  </p>
                </div>
                <div>
                  <p
                    className="font-body text-xl font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {currentCollection?.metrics?.[2]?.value || '8'}
                  </p>
                  <p
                    className="text-[0.625rem] tracking-[0.16em] uppercase font-body font-semibold mt-0.5"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    {currentCollection?.metrics?.[2]?.label || 'Artisan Weavers'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#collection-grid"
                  className="h-12 px-7 flex items-center justify-center text-xs tracking-[0.2em] uppercase font-semibold font-body transition-opacity hover:opacity-90 shadow-xs"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-on-primary)',
                  }}
                >
                  SHOP THIS COLLECTION →
                </a>
                <a
                  href="#lantana-editorial"
                  className="h-12 px-7 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold font-body border transition-colors hover:bg-black/5"
                  style={{
                    borderColor: 'var(--color-primary)',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Sparkles size={14} /> VIEW CAMPAIGN GALLERY
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Campaign Mosaic with Real Photos */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-1 p-2 bg-[var(--color-surface-container-high)]">
            {/* Left large vertical photo */}
            <div
              onClick={() =>
                setSelectedImage({
                  url: mosaicImages[0],
                  title: 'The Timeless Elegance Campaign',
                  subtitle: 'Soft hues of lilac and lemon yellow in pure Chanderi silk with ombre dupattas.',
                })
              }
              className="relative h-[360px] lg:h-[720px] overflow-hidden cursor-pointer group"
            >
              <img
                src={mosaicImages[0]}
                alt={`${currentCollection?.title || 'Collection'} Hero Look`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 p-4 text-white border border-white/20 backdrop-blur-md bg-black/30">
                <span className="font-serif italic text-sm md:text-base block">
                  &ldquo;For the girls who love timeless elegance&rdquo;
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-200 mt-1 flex items-center gap-1.5">
                  <Sparkles size={11} /> Lantana Pret Edition · Click to Expand
                </span>
              </div>
            </div>

            {/* Right stacked photos */}
            <div className="grid grid-rows-2 gap-1 h-[360px] lg:h-[720px]">
              {/* Top detail photo */}
              <div
                onClick={() =>
                  setSelectedImage({
                    url: mosaicImages[1],
                    title: 'Soft Hues & Scalloped Lace Detail',
                    subtitle: 'French scalloped cotton lace trims along kurti hems with pleated salwar trousers.',
                  })
                }
                className="relative overflow-hidden cursor-pointer group"
              >
                <img
                  src={mosaicImages[1]}
                  alt={`${currentCollection?.title || 'Collection'} Detail Look`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 p-3 text-white border border-white/20 backdrop-blur-md bg-black/30">
                  <span className="font-serif italic text-xs md:text-sm block">
                    Soft hues 🌸✨🌼
                  </span>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-white/80 mt-0.5 block">
                    Textile & Lace Craftsmanship
                  </span>
                </div>
              </div>

              {/* Bottom lookbook grid */}
              <div
                onClick={() =>
                  setSelectedImage({
                    url: mosaicImages[2],
                    title: 'Garden Atelier Shoot Grid',
                    subtitle: 'Archival 32-shot contact sheet documenting the outdoor summer campaign.',
                  })
                }
                className="relative overflow-hidden cursor-pointer group"
              >
                <img
                  src={mosaicImages[2]}
                  alt={`${currentCollection?.title || 'Collection'} Shoot Portfolio`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 p-3 text-white border border-white/20 backdrop-blur-md bg-black/30">
                  <span className="font-serif text-xs md:text-sm block">
                    Atelier Campaign Contact Sheet
                  </span>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-white/80 mt-0.5 flex items-center gap-1">
                    <Eye size={11} /> 32 Archival Angles
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY FILTER & SORT BAR ── */}
      <section
        id="collection-grid"
        className="sticky top-20 z-30 border-y py-4 px-6 md:px-16 backdrop-blur-md"
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderColor: 'var(--color-outline-variant)',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Collection Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => handleCollectionChange('all')}
              className="px-4 py-2 text-xs tracking-wider uppercase font-semibold font-body border transition-colors shrink-0"
              style={{
                backgroundColor:
                  activeCollectionSlug === 'all'
                    ? 'var(--color-primary)'
                    : 'transparent',
                color:
                  activeCollectionSlug === 'all'
                    ? 'var(--color-on-primary)'
                    : 'var(--color-on-surface)',
                borderColor: 'var(--color-outline-variant)',
              }}
            >
              All Collections
            </button>
            {collections.map((c) => (
              <button
                key={c.slug}
                onClick={() => handleCollectionChange(c.slug)}
                className="px-4 py-2 text-xs tracking-wider uppercase font-semibold font-body border transition-colors shrink-0 flex items-center gap-1.5"
                style={{
                  backgroundColor:
                    activeCollectionSlug === c.slug
                      ? 'var(--color-primary)'
                      : 'transparent',
                  color:
                    activeCollectionSlug === c.slug
                      ? 'var(--color-on-primary)'
                      : 'var(--color-on-surface)',
                  borderColor: 'var(--color-outline-variant)',
                }}
              >
                {c.slug === 'lantana' && <Sparkles size={12} className="text-amber-300" />}
                {c.title}
                {c.isOld && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded uppercase font-mono tracking-wider opacity-70 bg-black/10 dark:bg-white/10">
                    Old / Archive
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Categories & Sorting Controls */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Category pills */}
            <div className="hidden lg:flex items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className="px-3 py-1.5 text-[0.7rem] uppercase tracking-wider font-semibold font-body rounded-full transition-colors"
                  style={{
                    backgroundColor:
                      activeCategory === cat.value
                        ? 'var(--color-surface-container-high)'
                        : 'transparent',
                    color:
                      activeCategory === cat.value
                        ? 'var(--color-primary)'
                        : 'var(--color-secondary)',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              aria-label="Sort products"
              className="px-3 py-2 text-xs uppercase tracking-wider font-body border bg-transparent outline-none cursor-pointer"
              style={{
                borderColor: 'var(--color-outline-variant)',
                color: 'var(--color-on-surface)',
              }}
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Grid Toggle (Desktop) */}
            <div className="hidden md:flex items-center border" style={{ borderColor: 'var(--color-outline-variant)' }}>
              <button
                onClick={() => setViewMode('3-col')}
                className={`p-2 text-xs uppercase font-mono transition-colors ${
                  viewMode === '3-col' ? 'bg-black text-white' : 'hover:bg-black/5'
                }`}
                title="3 Column View"
              >
                3 Col
              </button>
              <button
                onClick={() => setViewMode('4-col')}
                className={`p-2 text-xs uppercase font-mono transition-colors ${
                  viewMode === '4-col' ? 'bg-black text-white' : 'hover:bg-black/5'
                }`}
                title="4 Column View"
              >
                4 Col
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section className="max-w-7xl mx-auto py-12 px-6 md:px-16">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--color-secondary)' }}>
            Showing {filteredProducts.length} pieces in{' '}
            <strong className="text-black uppercase">
              {activeCollectionSlug === 'all' ? 'All Collections' : currentCollection?.title}
            </strong>
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <p className="font-display text-2xl text-neutral-600">No pieces found in this category.</p>
            <button
              onClick={() => {
                handleCollectionChange('all')
                handleCategoryChange('all')
              }}
              className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              viewMode === '3-col' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            } gap-8 md:gap-10`}
          >
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* ── EXCLUSIVE LANTANA CAMPAIGN GALLERY ── */}
      <section
        id="lantana-editorial"
        className="w-full py-20 px-6 md:px-16 border-t"
        style={{
          backgroundColor: 'var(--color-surface-container-low)',
          borderColor: 'var(--color-outline-variant)',
        }}
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[0.6875rem] tracking-[0.3em] uppercase font-semibold text-neutral-500 font-mono">
              EDITORIAL CAMPAIGN · SPRING-SUMMER 2026
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-neutral-900 tracking-tight">
              The Lantana Lookbook
            </h2>
            <p className="font-serif italic text-lg md:text-xl text-neutral-600">
              &ldquo;For the girls who love timeless elegance&rdquo;
            </p>
            <p className="font-body text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed pt-1">
              Immerse yourself in Jyoti’s delicate soft-hued palette — pastel lilac, buttercup yellow,
              and sunlit ecru adorned with handmade French scalloped laces and pure silk silhouettes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Full Look */}
            <div
              onClick={() =>
                setSelectedImage({
                  url: siteImages.models.heroGirls,
                  title: 'The Timeless Elegance Campaign',
                  subtitle: 'Dual silhouettes in soft lilac & butter-yellow with shaded ombre dupattas.',
                })
              }
              className="bg-white border border-neutral-200 overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                <img
                  src={siteImages.models.heroGirls}
                  alt="Lantana Hero Models"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-black">
                  Look 01
                </div>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  Campaign Hero
                </span>
                <h3 className="font-serif text-xl font-normal text-neutral-900">
                  Timeless Elegance in Soft Hues
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Tailored in breathable handloom Chanderi silk with delicate gold butis and shaded chiffon dupattas.
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-black uppercase tracking-wider group-hover:underline">
                  <span>Inspect High-Res View</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>

            {/* Card 2: Detail Hues */}
            <div
              onClick={() =>
                setSelectedImage({
                  url: siteImages.models.detailHues,
                  title: 'Soft Hues & Scalloped Lace Detail',
                  subtitle: 'Artisanal scalloped French lace hemline and hand-pleated salwar pants.',
                })
              }
              className="bg-white border border-neutral-200 overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                <img
                  src={siteImages.models.detailHues}
                  alt="Soft Hues Detail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-black">
                  Look 02
                </div>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  Artisanal Craft
                </span>
                <h3 className="font-serif text-xl font-normal text-neutral-900">
                  Soft Hues 🌸✨🌼
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Intricate French scalloped cotton laces along the kurti hemline, salwar cuffs, and handcrafted dupatta tassels.
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-black uppercase tracking-wider group-hover:underline">
                  <span>Inspect High-Res View</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>

            {/* Card 3: Shoot Grid */}
            <div
              onClick={() =>
                setSelectedImage({
                  url: siteImages.models.shootGrid,
                  title: 'Atelier Shoot Contact Sheet',
                  subtitle: '32-frame archival contact sheet documenting the outdoor garden lookbook.',
                })
              }
              className="bg-white border border-neutral-200 overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                <img
                  src={siteImages.models.shootGrid}
                  alt="Lantana Shoot Grid"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-black">
                  Lookbook 03
                </div>
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  Archive Montage
                </span>
                <h3 className="font-serif text-xl font-normal text-neutral-900">
                  Garden Atelier Moodboard
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  A 32-frame editorial contact sheet capturing flower accents, pearl-strap bodice details, and movement.
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-black uppercase tracking-wider group-hover:underline">
                  <span>Inspect High-Res View</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL CRAFT STORY STRIP ── */}
      <section
        className="w-full py-16 px-6 md:px-16 border-t"
        style={{
          backgroundColor: 'var(--color-surface-container-low)',
          borderColor: 'var(--color-outline-variant)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span
              className="text-[0.6875rem] tracking-[0.25em] uppercase font-semibold font-body"
              style={{ color: 'var(--color-secondary)' }}
            >
              ATELIER ARCHIVES
            </span>
            <h2
              className="font-display text-3xl md:text-4xl font-normal mt-2"
              style={{ color: 'var(--color-primary)' }}
            >
              Artisanal Integrity in Every Thread
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="p-8"
              style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
            >
              <span
                className="font-display text-3xl font-light block mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                01
              </span>
              <h3
                className="font-display text-xl font-semibold mb-2"
                style={{ color: 'var(--color-primary)' }}
              >
                Hand-Spun Chanderi Silk
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                Woven on traditional pit looms in historic clusters. The sheer texture and
                shimmering drape come from pure Mulberry silk yarn spun by master generational
                weavers.
              </p>
            </div>

            <div
              className="p-8"
              style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
            >
              <span
                className="font-display text-3xl font-light block mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                02
              </span>
              <h3
                className="font-display text-xl font-semibold mb-2"
                style={{ color: 'var(--color-primary)' }}
              >
                French Scalloped Lace & Gota
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                Delicate scalloped borders are dyed to tonal perfection and meticulously tacked
                by hand along the hem and sleeves, adding ethereal weight to every drape.
              </p>
            </div>

            <div
              className="p-8"
              style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
            >
              <span
                className="font-display text-3xl font-light block mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                03
              </span>
              <h3
                className="font-display text-xl font-semibold mb-2"
                style={{ color: 'var(--color-primary)' }}
              >
                Bespoke Tailoring by Jyoti
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                Every Zamyaa piece can be customized to your proportions. From neckline adjustments
                to personalized sleeve lengths, our atelier sculpts each piece to your frame.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LUXURY FULL-SCREEN LIGHTBOX MODAL ── */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest bg-white/10 px-3 py-1.5 rounded-full"
            >
              <X size={16} /> Close Preview
            </button>

            <div className="w-full overflow-hidden bg-black flex items-center justify-center max-h-[78vh] border border-white/10">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[78vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="w-full bg-neutral-950 p-4 border-x border-b border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-serif text-lg font-light">{selectedImage.title}</h4>
                {selectedImage.subtitle && (
                  <p className="text-xs text-neutral-400">{selectedImage.subtitle}</p>
                )}
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300">
                ZAMYAA by jyoti · Lantana Archive
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
