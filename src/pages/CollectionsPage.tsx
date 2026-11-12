import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Eye, Sparkles, X, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react'
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

  // Collection carousel scroll controls
  const collectionsScrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    const el = collectionsScrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    checkScrollButtons()
    const el = collectionsScrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScrollButtons)
    window.addEventListener('resize', checkScrollButtons)
    return () => {
      el.removeEventListener('scroll', checkScrollButtons)
      window.removeEventListener('resize', checkScrollButtons)
    }
  }, [collections])

  const scrollCollections = (direction: 'left' | 'right') => {
    const el = collectionsScrollRef.current
    if (!el) return
    const offset = 280
    el.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    })
  }

  const handleCollectionsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0 && collectionsScrollRef.current) {
      collectionsScrollRef.current.scrollLeft += e.deltaY
    }
  }

  const isHorizontalNavClickRef = useRef<boolean>(false)

  // Automatic smooth scroll handling on collection change
  useEffect(() => {
    if (isHorizontalNavClickRef.current) {
      isHorizontalNavClickRef.current = false
      // User clicked a collection in the horizontal navigation:
      // Smoothly scroll so the products section is docked right beneath the sticky header & filter bar!
      setTimeout(() => {
        const targetEl = document.getElementById('products-section')
        if (targetEl) {
          const navBarHeight = 80
          const filterBarHeight = 56
          const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - (navBarHeight + filterBarHeight)
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth',
          })
        }
      }, 50)
    } else {
      // Direct navigation or link click:
      if (window.location.hash) {
        const id = window.location.hash.replace('#', '')
        setTimeout(() => {
          const el = document.getElementById(id)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 50)
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    }
  }, [activeCollectionSlug])

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
    // Mark as horizontal nav click so scroll is positioned at the product section beneath sticky header
    isHorizontalNavClickRef.current = true
    if (newSlug === 'all') {
      navigate('/collections')
    } else {
      navigate(`/collections/${newSlug}`)
    }
  }

  const handleCategoryChange = (cat: string) => {
    const next = new URLSearchParams(searchParams)
    if (cat === 'all') next.delete('category')
    else next.set('category', cat)
    setSearchParams(next, { preventScrollReset: true })
  }

  const handleSortChange = (sort: string) => {
    const next = new URLSearchParams(searchParams)
    if (sort === 'featured') next.delete('sort')
    else next.set('sort', sort)
    setSearchParams(next, { preventScrollReset: true })
  }

  const isBoho = currentCollection?.slug === 'the-boho-flare-affair'

  // Active mosaic images
  const mosaicImages = currentCollection?.mosaicImages && currentCollection.mosaicImages.length >= 3
    ? currentCollection.mosaicImages
    : [
        siteImages.models.heroGirls,
        siteImages.models.detailHues,
        siteImages.models.shootGrid,
      ]

  return (
    <div
      className="min-h-screen font-body"
      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
    >
      {/* ── CASE 1: ALL COLLECTIONS DIRECTORY VIEW ── */}
      {activeCollectionSlug === 'all' ? (
        <section className="py-16 md:py-24 px-6 md:px-16 border-b border-black/10 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-2">
                COLLECTION DIRECTORY · SPRING / SUMMER 2026
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-neutral-900 font-light mb-4">
                The Collections
              </h1>
              <p className="font-body text-neutral-600 text-sm sm:text-base leading-relaxed">
                Discover Zamyaa&apos;s signature collections. Each capsule celebrates distinct Indian silhouettes — from architectural Farshi suit-sets to bohemian tiered skirt tops.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((col) => {
                const isColLantana = col.slug === 'lantana'
                const isColBoho = col.slug === 'the-boho-flare-affair'
                const isColNeelPushp = col.slug === 'neel-pushp'
                const isLive = isColLantana || isColBoho || isColNeelPushp || !col.isComingSoon
                const cover = isColLantana
                  ? '/images/lantana/IMG_6642.jpeg'
                  : isColBoho
                  ? '/images/the-boho-flare-affair/IMG_6681.jpeg'
                  : isColNeelPushp
                  ? '/images/neel-pushp/IMG_6726.jpeg'
                  : col.heroImage || '/homescreen/campaign-models.png'

                return (
                  <Link
                    key={col.slug}
                    to={`/collections/${col.slug}`}
                    className="group border border-neutral-200 bg-white hover:border-black hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer block text-left"
                  >
                    <div>
                      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                        <img
                          src={cover}
                          alt={col.title}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          {isLive ? (
                            <span className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest bg-black text-white font-bold shadow-xs">
                              Live · {isColLantana || isColNeelPushp ? 'Farshi Suit' : 'Skirt Top'}
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest bg-white/90 text-black font-semibold backdrop-blur-sm">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-white/90 bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                          {col.capsule}
                        </div>
                      </div>

                      <div className="p-6">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                          {col.season}
                        </span>
                        <h2 className="font-display text-2xl text-neutral-900 group-hover:underline block mb-2">
                          {col.title}
                        </h2>
                        <p className="font-body text-xs text-neutral-500 leading-relaxed line-clamp-3">
                          {col.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border-b border-black pb-1 group-hover:gap-3 transition-all font-body text-black">
                        Explore Collection <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ) : (
        /* ── CASE 2: DEDICATED SINGLE COLLECTION EDITORIAL HERO ── */
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
                    {currentCollection?.title}
                  </h1>
                  <p
                    className="font-display text-xl sm:text-2xl italic font-normal"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    {currentCollection?.subtitle}
                  </p>
                </div>

                <p
                  className="font-body text-sm sm:text-base leading-relaxed max-w-md pt-2"
                  style={{ color: 'var(--color-on-surface-variant)' }}
                >
                  {currentCollection?.description}
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
                      {currentCollection?.metrics?.[0]?.value || (isBoho ? '2' : '12')}
                    </p>
                    <p
                      className="text-[0.625rem] tracking-[0.16em] uppercase font-body font-semibold mt-0.5"
                      style={{ color: 'var(--color-secondary)' }}
                    >
                      {currentCollection?.metrics?.[0]?.label || (isBoho ? 'Silhouettes' : 'Archival Pieces')}
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
                      {currentCollection?.metrics?.[1]?.label || (isBoho ? 'Artisanal Block' : 'Pure Handloom')}
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-body text-xl font-bold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {currentCollection?.metrics?.[2]?.value || (isBoho ? 'Tiered' : '8')}
                    </p>
                    <p
                      className="text-[0.625rem] tracking-[0.16em] uppercase font-body font-semibold mt-0.5"
                      style={{ color: 'var(--color-secondary)' }}
                    >
                      {currentCollection?.metrics?.[2]?.label || (isBoho ? 'Skirt Cuts' : 'Artisan Weavers')}
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
                    href={
                      activeCollectionSlug === 'neel-pushp'
                        ? '#neel-pushp-editorial'
                        : isBoho
                        ? '#boho-editorial'
                        : '#lantana-editorial'
                    }
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
                    title:
                      activeCollectionSlug === 'neel-pushp'
                        ? 'Neel Pushp — Dual Silhouette Atelier Look'
                        : isBoho
                        ? 'The Boho Flare Affair — Duo Look'
                        : 'The Timeless Elegance Campaign',
                    subtitle:
                      activeCollectionSlug === 'neel-pushp'
                        ? 'Twin silhouettes in Cerulean Indigo and Citron Olive handloom Chanderi silks with farshi trousers.'
                        : isBoho
                        ? 'Twin silhouettes in sculpted crop tops and tiered gathered maxi skirts.'
                        : 'Soft hues of lilac and lemon yellow in pure Chanderi silk with ombre dupattas.',
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
                    {activeCollectionSlug === 'neel-pushp'
                      ? '“Indigo Blooms & Twilight Silks”'
                      : isBoho
                      ? '“Sculpted bodices & billowing bohemian flare”'
                      : '“For the girls who love timeless elegance”'}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-200 mt-1 flex items-center gap-1.5">
                    <Sparkles size={11} />{' '}
                    {activeCollectionSlug === 'neel-pushp'
                      ? 'Neel Pushp · Dual Farshi Capsule'
                      : isBoho
                      ? 'The Boho Flare Affair · Skirt Top Capsule'
                      : 'Lantana Pret Edition · Click to Expand'}
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
                      title:
                        activeCollectionSlug === 'neel-pushp'
                          ? 'Design 01 · Cerulean Indigo Farshi Suit'
                          : isBoho
                          ? 'Design 01 · Teardrop Booti Scoop Neck'
                          : 'Soft Hues & Scalloped Lace Detail',
                      subtitle:
                        activeCollectionSlug === 'neel-pushp'
                          ? 'Sky-tone Chanderi silk kurti with delicate buti weaves and flowing farshi trousers.'
                          : isBoho
                          ? 'Scoop neck crop top paired with three-tier pleated printed flared skirt.'
                          : 'French scalloped cotton lace trims along kurti hems with pleated salwar trousers.',
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
                      {activeCollectionSlug === 'neel-pushp'
                        ? 'Cerulean Indigo 💙'
                        : isBoho
                        ? 'Design 01 · Scoop Neck'
                        : 'Soft hues 🌸✨🌼'}
                    </span>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-white/80 mt-0.5 block">
                      {activeCollectionSlug === 'neel-pushp'
                        ? 'Cerulean Farshi Suit-Set'
                        : isBoho
                        ? 'Teardrop Booti Tiered Skirt Set'
                        : 'Textile & Lace Craftsmanship'}
                    </span>
                  </div>
                </div>

                {/* Bottom lookbook grid */}
                <div
                  onClick={() =>
                    setSelectedImage({
                      url: mosaicImages[2],
                      title:
                        activeCollectionSlug === 'neel-pushp'
                          ? 'Design 02 · Citron Olive Zari Farshi Suit'
                          : isBoho
                          ? 'Design 02 · Mandala Jaal Halter Neck'
                          : 'Garden Atelier Shoot Grid',
                      subtitle:
                        activeCollectionSlug === 'neel-pushp'
                          ? 'Antique mustard and citron olive handloom weaves with gold zari booti motifs.'
                          : isBoho
                          ? 'Regal halter neck crop top with back tie-ups and coordinating tiered flare skirt.'
                          : 'Archival 32-shot contact sheet documenting the outdoor summer campaign.',
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
                      {activeCollectionSlug === 'neel-pushp'
                        ? 'Citron Olive Zari ✨'
                        : isBoho
                        ? 'Design 02 · Halter Neck'
                        : 'Atelier Campaign Contact Sheet'}
                    </span>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-white/80 mt-0.5 flex items-center gap-1">
                      <Eye size={11} />{' '}
                      {activeCollectionSlug === 'neel-pushp'
                        ? 'Citron Olive Farshi Suit-Set'
                        : isBoho
                        ? 'Mandala Jaal Tiered Skirt Set'
                        : '32 Archival Angles'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── STICKY FILTER & SORT BAR ── */}
      <section
        id="collection-grid"
        className="sticky top-20 z-30 border-y py-3.5 px-4 md:px-12 backdrop-blur-md shadow-xs"
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderColor: 'var(--color-outline-variant)',
          scrollMarginTop: '80px',
        }}
      >
        <div className="max-w-7xl mx-auto space-y-3">
          {/* TIER 1: Collections Carousel with Left & Right Scroll Buttons */}
          <div className="relative flex items-center">
            {/* Scroll Left Button */}
            <button
              type="button"
              onClick={() => scrollCollections('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll collections left"
              className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center mr-2 transition-all z-10 ${
                canScrollLeft
                  ? 'bg-white hover:bg-black hover:text-white shadow-xs cursor-pointer'
                  : 'opacity-30 cursor-not-allowed bg-transparent'
              }`}
              style={{ borderColor: 'var(--color-outline-variant)' }}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Scrollable Collections Track */}
            <div
              ref={collectionsScrollRef}
              onWheel={handleCollectionsWheel}
              className="flex items-center gap-2 overflow-x-auto py-1 scroll-smooth select-none [&::-webkit-scrollbar]:hidden"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <button
                onClick={() => handleCollectionChange('all')}
                className="px-4 py-2 text-xs tracking-wider uppercase font-semibold font-body border transition-colors shrink-0 whitespace-nowrap"
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
                  className="px-4 py-2 text-xs tracking-wider uppercase font-semibold font-body border transition-colors shrink-0 flex items-center gap-1.5 whitespace-nowrap"
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

            {/* Scroll Right Button */}
            <button
              type="button"
              onClick={() => scrollCollections('right')}
              disabled={!canScrollRight}
              aria-label="Scroll collections right"
              className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center ml-2 transition-all z-10 ${
                canScrollRight
                  ? 'bg-white hover:bg-black hover:text-white shadow-xs cursor-pointer'
                  : 'opacity-30 cursor-not-allowed bg-transparent'
              }`}
              style={{ borderColor: 'var(--color-outline-variant)' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* TIER 2: Category Filters & View / Sort Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-black/5">
            {/* Category Pills (Always visible on all screens!) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 mr-1 hidden sm:inline">
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold font-body rounded-full transition-colors whitespace-nowrap"
                  style={{
                    backgroundColor:
                      activeCategory === cat.value
                        ? 'var(--color-primary)'
                        : 'var(--color-surface-container)',
                    color:
                      activeCategory === cat.value
                        ? 'var(--color-on-primary)'
                        : 'var(--color-on-surface)',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right Controls: Piece Count + Sort + Grid View Toggle */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-xs font-mono tracking-wide text-neutral-500 hidden sm:inline">
                {filteredProducts.length} Pieces
              </span>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                aria-label="Sort products"
                className="px-3 py-1.5 text-xs uppercase tracking-wider font-body border bg-transparent outline-none cursor-pointer"
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
                  className={`p-1.5 px-2.5 text-xs uppercase font-mono transition-colors ${
                    viewMode === '3-col' ? 'bg-black text-white' : 'hover:bg-black/5'
                  }`}
                  title="3 Column View"
                >
                  3 Col
                </button>
                <button
                  onClick={() => setViewMode('4-col')}
                  className={`p-1.5 px-2.5 text-xs uppercase font-mono transition-colors ${
                    viewMode === '4-col' ? 'bg-black text-white' : 'hover:bg-black/5'
                  }`}
                  title="4 Column View"
                >
                  4 Col
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section
        id="products-section"
        style={{ scrollMarginTop: '200px' }}
        className="max-w-7xl mx-auto py-12 px-6 md:px-16"
      >
        <div className="mb-8 flex items-center justify-between">
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--color-secondary)' }}>
            Showing {filteredProducts.length} pieces in{' '}
            <strong className="text-black uppercase">
              {activeCollectionSlug === 'all' ? 'All Collections' : currentCollection?.title}
            </strong>
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 px-6 max-w-2xl mx-auto text-center border border-[#E5E5E5] bg-white space-y-5 my-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 block">
              {currentCollection?.isComingSoon ? 'Capsule in Curation · Jaipur Atelier' : 'Archive Status'}
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-neutral-900 font-normal">
              {currentCollection?.isComingSoon
                ? `${currentCollection.title} — Coming Soon`
                : 'No Pieces Found'}
            </h3>
            <p className="font-body text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
              {currentCollection?.isComingSoon
                ? currentCollection.description || 'This signature capsule is currently being handwoven in pure handloom silks at our atelier. Register your interest for private preview access.'
                : 'No pieces match your selected category filter in this collection.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  handleCategoryChange('all')
                  handleCollectionChange('lantana')
                }}
                className="px-5 py-2.5 bg-black text-white text-xs uppercase tracking-widest font-semibold font-body hover:opacity-85 transition-opacity"
              >
                Shop Lantana (Farshi Suits) →
              </button>
              <button
                onClick={() => {
                  handleCategoryChange('all')
                  handleCollectionChange('the-boho-flare-affair')
                }}
                className="px-5 py-2.5 bg-amber-500 text-black text-xs uppercase tracking-widest font-bold font-body hover:bg-amber-400 transition-colors"
              >
                Shop The Boho Flare Affair (Skirt Tops) →
              </button>
              <button
                onClick={() => {
                  handleCollectionChange('all')
                  handleCategoryChange('all')
                }}
                className="px-5 py-2.5 border border-neutral-300 text-neutral-800 bg-white text-xs uppercase tracking-widest font-semibold font-body hover:border-black transition-colors"
              >
                Collection Directory
              </button>
              {activeCategory !== 'all' && (
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="px-5 py-2.5 border border-black text-black bg-white text-xs uppercase tracking-widest font-semibold font-body hover:bg-black hover:text-white transition-colors"
                >
                  Clear Category Filter
                </button>
              )}
            </div>
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
      {activeCollectionSlug === 'lantana' && (
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
      )}

      {/* ── EXCLUSIVE THE BOHO FLARE AFFAIR CAMPAIGN GALLERY ── */}
      {activeCollectionSlug === 'the-boho-flare-affair' && (
        <section
          id="boho-editorial"
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
                The Boho Flare Lookbook
              </h2>
              <p className="font-serif italic text-lg md:text-xl text-neutral-600">
                &ldquo;Two Distinct Silhouettes · Earthy Moss Olive &amp; Hand-Block Artistry&rdquo;
              </p>
              <p className="font-body text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed pt-1">
                A celebration of sweeping volume and free-spirited elegance. Featuring Design 01 (Scoop Neck Teardrop Booti) and Design 02 (High Halter Mandala Jaal) with 3-tiered billowing maxi skirts and smocked crop top bodices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Full Look Dual Models */}
              <div
                onClick={() =>
                  setSelectedImage({
                    url: '/images/the-boho-flare-affair/IMG_6681.jpeg',
                    title: 'The Boho Flare Duo Look',
                    subtitle: 'Dual silhouettes against aged teak doors showcasing both designs side-by-side.',
                  })
                }
                className="bg-white border border-neutral-200 overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src="/images/the-boho-flare-affair/IMG_6681.jpeg"
                    alt="The Boho Flare Hero Look"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-black">
                    Look 01
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    Campaign Preview Hero
                  </span>
                  <h3 className="font-serif text-xl font-normal text-neutral-900">
                    Dual Silhouette Showcase
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Featuring both models in complementary moss olive block prints — scoop neck and halter neck cuts.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-black uppercase tracking-wider group-hover:underline">
                    <span>Inspect High-Res View</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>

              {/* Card 2: Print Craftsmanship Comparison */}
              <div
                onClick={() =>
                  setSelectedImage({
                    url: '/images/the-boho-flare-affair/IMG_6686.jpeg',
                    title: 'Block Print Comparison',
                    subtitle: 'Macro view comparing Design 01 Teardrop Booti with Design 02 Geometric Mandala Jaal.',
                  })
                }
                className="bg-white border border-neutral-200 overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src="/images/the-boho-flare-affair/IMG_6686.jpeg"
                    alt="Block Print Comparison"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-black">
                    Look 02
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    Print Craftsmanship
                  </span>
                  <h3 className="font-serif text-xl font-normal text-neutral-900">
                    Booti vs. Mandala Jaal
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Hand-carved wooden block impressions on lustrous moss olive cotton silk with ornamental borders.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-black uppercase tracking-wider group-hover:underline">
                    <span>Inspect High-Res View</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>

              {/* Card 3: Tiered Flare Cobblestone Montage */}
              <div
                onClick={() =>
                  setSelectedImage({
                    url: '/images/the-boho-flare-affair/IMG_6680.jpeg',
                    title: 'Cobblestone Street Montage',
                    subtitle: 'Dual models seated showing expansive volume of the tiered flared skirts.',
                  })
                }
                className="bg-white border border-neutral-200 overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src="/images/the-boho-flare-affair/IMG_6680.jpeg"
                    alt="Cobblestone Street Montage"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-black">
                    Look 03
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    Volume & Movement
                  </span>
                  <h3 className="font-serif text-xl font-normal text-neutral-900">
                    Tiered Bohemian Flare
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Sweeping 3-tiered maxi gathers designed to billow and flow effortlessly in motion.
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
      )}

      {/* ── EXCLUSIVE NEEL PUSHP CAMPAIGN GALLERY ── */}
      {activeCollectionSlug === 'neel-pushp' && (
        <section
          id="neel-pushp-editorial"
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
                Neel Pushp Lookbook
              </h2>
              <p className="font-serif italic text-lg md:text-xl text-neutral-600">
                &ldquo;Indigo Twilight &amp; Citron Zari · The Jaipur Heritage Archive&rdquo;
              </p>
              <p className="font-body text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed pt-1">
                A visual chronicle of 29 architectural photographs exploring fluid farshi suit-sets. Captured across ancient Jaipur courtyards and open sky terraces in cerulean indigo handlooms and antique citron olive zari silks.
              </p>
            </div>

            {/* Featured 3-Card Curated Editorial Mosaic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Dual Model Courtyard Showcase */}
              <div
                onClick={() =>
                  setSelectedImage({
                    url: '/images/neel-pushp/IMG_6726.jpeg',
                    title: 'Dual Silhouette Heritage Showcase',
                    subtitle: 'Both models in royal architectural courtyard setting, presenting the harmonious dialogue between Cerulean Indigo and Citron Olive.',
                  })
                }
                className="bg-white border border-neutral-200 overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src="/images/neel-pushp/IMG_6726.jpeg"
                    alt="Neel Pushp Dual Models in Jaipur Courtyard"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-black">
                    Look 01 · Group
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    Courtyard Composition
                  </span>
                  <h3 className="font-serif text-xl font-normal text-neutral-900">
                    Dual Silhouette Showcase
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Captured against hand-carved heritage doorways showcasing both farshi silhouettes in natural daylight.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-black uppercase tracking-wider group-hover:underline">
                    <span>Inspect High-Res View</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>

              {/* Card 2: Cerulean Sky Terrace Portrait */}
              <div
                onClick={() =>
                  setSelectedImage({
                    url: '/images/neel-pushp/IMG_6732.jpeg',
                    title: 'Cerulean Indigo Sky Terrace',
                    subtitle: 'Single model portrait in delicate blue floral buti Chanderi silk kurti against open sky.',
                  })
                }
                className="bg-white border border-neutral-200 overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src="/images/neel-pushp/IMG_6732.jpeg"
                    alt="Cerulean Indigo Terrace Portrait"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-black">
                    Look 02 · Solo
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    Single Model Portrait
                  </span>
                  <h3 className="font-serif text-xl font-normal text-neutral-900">
                    Cerulean Indigo Silhouette
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Sheer handloom Chanderi silk kurta adorned with Persian butis and handcrafted scalloped neckline.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-black uppercase tracking-wider group-hover:underline">
                    <span>Inspect High-Res View</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>

              {/* Card 3: Citron Olive & Gold Zari Dialogue */}
              <div
                onClick={() =>
                  setSelectedImage({
                    url: '/images/neel-pushp/IMG_6741.jpeg',
                    title: 'Citron Olive & Antique Zari',
                    subtitle: 'Dual silhouettes in intimate dialogue, emphasizing the contrasting textile textures.',
                  })
                }
                className="bg-white border border-neutral-200 overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <img
                    src="/images/neel-pushp/IMG_6741.jpeg"
                    alt="Citron Olive and Cerulean Zari Dialogue"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-black">
                    Look 03 · Narrative
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    Textile Dialogue
                  </span>
                  <h3 className="font-serif text-xl font-normal text-neutral-900">
                    Citron Olive &amp; Farshi Flare
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    The wide flared farshi trouser silhouette tailored to sweep gracefully with every regal step.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-black uppercase tracking-wider group-hover:underline">
                    <span>Inspect High-Res View</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Extended 29-Shot Archival Photography Gallery */}
            <div className="pt-10 border-t border-neutral-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 block">
                    Atelier Shoot Archives
                  </span>
                  <h3 className="font-display text-2xl font-light text-neutral-900">
                    Complete 29-Shot Photographic Collection
                  </h3>
                </div>
                <p className="text-xs font-body text-neutral-500">
                  Click any frame to inspect full-bleed high resolution craftsmanship.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { file: 'IMG_6717.jpeg', title: 'Farshi Trousers Hem & Footwear', tag: 'Detail' },
                  { file: 'IMG_6718.jpeg', title: 'Skyline Silhouette Sweep', tag: 'Detail' },
                  { file: 'IMG_6719.jpeg', title: 'Scalloped Mul Cotton Border', tag: 'Detail' },
                  { file: 'IMG_6720.jpeg', title: 'Cerulean Terrace Horizon', tag: 'Solo' },
                  { file: 'IMG_6721.jpeg', title: 'Antique Citron Zari Kurti', tag: 'Detail' },
                  { file: 'IMG_6722.jpeg', title: 'Citron Olive Model Profile', tag: 'Solo' },
                  { file: 'IMG_6723.jpeg', title: 'Chanderi Silk Floral Weave', tag: 'Fabric' },
                  { file: 'IMG_6724.jpeg', title: 'Twilight Ombre Dupatta Drapes', tag: 'Detail' },
                  { file: 'IMG_6725.jpeg', title: 'Courtyard Atelier Portrait', tag: 'Solo' },
                  { file: 'IMG_6726.jpeg', title: 'Dual Silhouette Courtyard Arch', tag: 'Group' },
                  { file: 'IMG_6727.jpeg', title: 'Terrace Architectural Composition', tag: 'Atmosphere' },
                  { file: 'IMG_6728.jpeg', title: 'Carved Wood Screen Duo', tag: 'Group' },
                  { file: 'IMG_6729.jpeg', title: 'Handmade Tassel Finishings', tag: 'Detail' },
                  { file: 'IMG_6730.jpeg', title: 'Indigo Floral Border Macro', tag: 'Fabric' },
                  { file: 'IMG_6731.jpeg', title: 'Open Sky Terrace Silhouette', tag: 'Solo' },
                  { file: 'IMG_6732.jpeg', title: 'Cerulean Farshi Suit Frontal', tag: 'Solo' },
                  { file: 'IMG_6733.jpeg', title: 'Heritage Brickwork Study', tag: 'Solo' },
                  { file: 'IMG_6734.jpeg', title: 'Back Neckline & Dori Ties', tag: 'Detail' },
                  { file: 'IMG_6735.jpeg', title: 'Citron Gold Scalloped Hemline', tag: 'Fabric' },
                  { file: 'IMG_6736.jpeg', title: 'Terrace Citron Farshi Motion', tag: 'Solo' },
                  { file: 'IMG_6738.jpeg', title: 'Shadow & Texture Textile Study', tag: 'Macro' },
                  { file: 'IMG_6739.jpeg', title: 'Twin Models Seated Conversation', tag: 'Group' },
                  { file: 'IMG_6740.jpeg', title: 'Twilight Silk Shading Close-up', tag: 'Fabric' },
                  { file: 'IMG_6741.jpeg', title: 'Dual Models Standing Side-by-Side', tag: 'Group' },
                  { file: 'IMG_6742.jpeg', title: 'Chanderi Weft & Warp Texture', tag: 'Macro' },
                  { file: 'IMG_6743.jpeg', title: 'Atelier Light & Shadow Portrait', tag: 'Solo' },
                  { file: 'IMG_6744.png',  title: 'Full-Length Archival Campaign', tag: 'Lookbook' },
                  { file: 'IMG_6746.jpeg', title: 'Courtyard Intimate Pose', tag: 'Group' },
                  { file: 'IMG_6747.jpeg', title: 'Dual Regal Composure', tag: 'Group' },
                ].map((item, idx) => (
                  <div
                    key={item.file}
                    onClick={() =>
                      setSelectedImage({
                        url: `/images/neel-pushp/${item.file}`,
                        title: `${item.title} (Frame ${idx + 1}/29)`,
                        subtitle: `Neel Pushp Atelier Campaign · ${item.tag} photographic study.`,
                      })
                    }
                    className="group relative aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer border border-neutral-200 hover:border-black transition-all"
                  >
                    <img
                      src={`/images/neel-pushp/${item.file}`}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                    <span className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[8px] font-mono uppercase px-1.5 py-0.5 tracking-wider backdrop-blur-xs">
                      {item.tag}
                    </span>
                    <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-mono text-white truncate drop-shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
