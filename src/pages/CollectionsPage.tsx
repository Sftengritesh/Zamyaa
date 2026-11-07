import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Download } from 'lucide-react'
import { products, collections } from '@/data/products'
import ProductCard from '@/components/ui/ProductCard'

export default function CollectionsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCollectionSlug = searchParams.get('collection') || 'all'
  const activeCategory = searchParams.get('category') || 'all'
  const sortBy = searchParams.get('sort') || 'featured'

  const [viewMode, setViewMode] = useState<'3-col' | '4-col'>('3-col')

  // Available collections
  const currentCollection = collections.find((c) => c.slug === activeCollectionSlug)

  const categories = [
    { label: 'All Pieces', value: 'all' },
    { label: 'Co-Ord Sets', value: 'co-ord' },
    { label: 'Dresses & Capes', value: 'dress' },
    { label: 'Anarkalis', value: 'anarkali' },
    { label: 'Palazzo Sets', value: 'palazzo' },
  ]

  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (activeCollectionSlug !== 'all') {
      list = list.filter((p) => p.collectionSlug === activeCollectionSlug)
    }

    if (activeCategory !== 'all') {
      list = list.filter((p) =>
        p.tags.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()))
      )
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price)
    }

    return list
  }, [activeCollectionSlug, activeCategory, sortBy])

  const handleCollectionChange = (slug: string) => {
    const next = new URLSearchParams(searchParams)
    if (slug === 'all') next.delete('collection')
    else next.set('collection', slug)
    setSearchParams(next)
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

  return (
    <div
      className="min-h-screen font-body"
      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
    >
      {/* ── EDITORIAL HERO CAMPAIGN (Recreated from Stitch screen_collections.html) ── */}
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
                  {currentCollection ? currentCollection.capsule : 'CAPSULE 04'}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
                <span className="text-[0.6875rem] tracking-[0.25em] uppercase font-semibold font-body">
                  {currentCollection ? currentCollection.season : 'AUTUMN-WINTER 2025'}
                </span>
              </div>

              <div className="space-y-2">
                <h1
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {currentCollection ? currentCollection.title : 'Noor-e-Rang'}
                </h1>
                <p
                  className="font-display text-xl sm:text-2xl italic font-normal"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  {currentCollection
                    ? currentCollection.subtitle
                    : 'Luminous Hues of Rajasthan'}
                </p>
              </div>

              <p
                className="font-body text-sm sm:text-base leading-relaxed max-w-md pt-2"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {currentCollection
                  ? currentCollection.description
                  : 'A celebration of Jaipur’s imperial court palettes, hand-spun Chanderi silks, and meticulous antique gota patti embroidery. Echoes of Amber Fort sunlit arches meet pure contemporary drape architecture.'}
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
                    14
                  </p>
                  <p
                    className="text-[0.625rem] tracking-[0.16em] uppercase font-body font-semibold mt-0.5"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    Archival Silhouettes
                  </p>
                </div>
                <div>
                  <p
                    className="font-body text-xl font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    100%
                  </p>
                  <p
                    className="text-[0.625rem] tracking-[0.16em] uppercase font-body font-semibold mt-0.5"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    Mulberry & Chanderi
                  </p>
                </div>
                <div>
                  <p
                    className="font-body text-xl font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    6
                  </p>
                  <p
                    className="text-[0.625rem] tracking-[0.16em] uppercase font-body font-semibold mt-0.5"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    Artisan Workshops
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#collection-grid"
                  className="h-12 px-7 flex items-center justify-center text-xs tracking-[0.2em] uppercase font-semibold font-body transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-on-primary)',
                  }}
                >
                  SHOP THIS COLLECTION →
                </a>
                <button
                  type="button"
                  onClick={() => alert('Zamyaa AW2025 Digital Lookbook will download shortly.')}
                  className="h-12 px-7 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold font-body border transition-colors hover:bg-black/5"
                  style={{
                    borderColor: 'var(--color-primary)',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Download size={14} /> DOWNLOAD LOOKBOOK
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Campaign Mosaic */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-1 p-2 bg-[var(--color-surface-container-high)]">
            <div className="h-[360px] lg:h-[720px] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303"
                alt="Noor-e-Rang Campaign Look 1"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="grid grid-rows-2 gap-1 h-[360px] lg:h-[720px]">
              <div className="overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzKmtPeQxvihoBt9gfOniLLCFGYEdkatPLmxHfqY6cxbnStaW3uBoc1xvoOwUJphZByozEIUf5_wAlVnU_9vmhBSh92BcA3EcQ-R68bX6cIezwp3GAg0XagObxmUl3yWE9vUvPFptpiniX8cu6WDgn8dUXF6rdTf_WF_S-mCvV_pWyg5BNZKhiAeRfhDJwYSd25jinnaZ93IwZTV66AiIHSFdbr9yTCW6IckBBuIgC"
                  alt="Noor-e-Rang Detail Look 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1XWyIphayeIEEDRBIvXf3Q7denO0MP-P24RMMwvF-ySss4RQ_IUXZRHsw8rm1qGTpc4rmecFzlBmjhk_muLTmrub6QHo0R8iCy6ucM7YaZPKrXEu0yhS4sSrwnPq_3DPMXFwkKcQiBKc_Vs6GzZlrutj5U63AdQmCjzeKEDn8qEmzRaDIbigYM69_sooev5O_LzCeCH0-KxrHF9frxC36xRIwKidpTDusJ9JilieHLxwII-i08D_Mlmcvo"
                  alt="Noor-e-Rang Model Look 3"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
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
                className="px-4 py-2 text-xs tracking-wider uppercase font-semibold font-body border transition-colors shrink-0"
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
                {c.title}
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

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span
                className="text-xs uppercase tracking-wider font-body hidden sm:inline"
                style={{ color: 'var(--color-secondary)' }}
              >
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-transparent text-xs font-semibold uppercase tracking-wider font-body border py-2 px-3 focus:outline-none"
                style={{
                  borderColor: 'var(--color-outline-variant)',
                  color: 'var(--color-on-surface)',
                }}
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-outline-variant)]">
          <p
            className="text-xs uppercase tracking-[0.2em] font-semibold font-body"
            style={{ color: 'var(--color-secondary)' }}
          >
            Showing {filteredProducts.length} Heirloom Silhouette
            {filteredProducts.length !== 1 ? 's' : ''}
          </p>

          <div className="flex items-center gap-2">
            <span
              className="text-xs tracking-wider uppercase font-body"
              style={{ color: 'var(--color-secondary)' }}
            >
              View:
            </span>
            <button
              onClick={() => setViewMode('3-col')}
              className={`p-1.5 text-xs font-bold font-body ${
                viewMode === '3-col' ? 'underline' : 'opacity-40'
              }`}
            >
              3 Col
            </button>
            <span className="opacity-30">/</span>
            <button
              onClick={() => setViewMode('4-col')}
              className={`p-1.5 text-xs font-bold font-body ${
                viewMode === '4-col' ? 'underline' : 'opacity-40'
              }`}
            >
              4 Col
            </button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="font-display text-2xl" style={{ color: 'var(--color-secondary)' }}>
              No pieces match your selected filters.
            </p>
            <button
              onClick={() => {
                handleCollectionChange('all')
                handleCategoryChange('all')
              }}
              className="inline-block px-6 py-2.5 text-xs uppercase tracking-widest font-semibold border"
              style={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-6 md:gap-8 ${
              viewMode === '3-col'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
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
                Antique Gota Patti Embellishment
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                Originating from the royal courts of Rajasthan, each small gold ribbon petal is
                folded, hammered, and hand-tacked onto pure silk with invisible micro-stitches.
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
    </div>
  )
}
