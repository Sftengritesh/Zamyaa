import { useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useSearchStore } from '@/store'
import { Link } from 'react-router-dom'
import { products } from '@/data/products'
import { formatPrice } from '@/data/products'

export default function SearchOverlay() {
  const { isOpen, query, setQuery, closeSearch } = useSearchStore()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeSearch])

  const results = query.length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.collection.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.includes(query.toLowerCase()))
      )
    : []

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col" onClick={(e) => { if (e.target === e.currentTarget) closeSearch() }}>
      <div className="bg-[var(--color-surface-container-lowest)] shadow-2xl">
        <div className="max-w-3xl mx-auto px-5 md:px-10 py-5 flex items-center gap-4">
          <Search size={20} className="text-[var(--color-secondary)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search collections, pieces, fabrics..."
            className="flex-1 bg-transparent font-body text-lg text-[var(--color-on-surface)] placeholder-[var(--color-on-surface-variant)] focus:outline-none"
          />
          <button onClick={closeSearch} className="text-[var(--color-secondary)] hover:text-[var(--color-on-surface)] transition-colors">
            <X size={22} />
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-w-3xl mx-auto px-5 md:px-10 pb-6 space-y-2 max-h-[60vh] overflow-y-auto">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--color-secondary)] font-semibold font-body mb-4">
              {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
            {results.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.slug}`}
                onClick={closeSearch}
                className="flex items-center gap-4 py-3 border-b border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-container-low)] px-2 -mx-2 rounded transition-colors"
              >
                <img src={p.images[0]?.url} alt={p.name} className="w-14 h-18 object-cover aspect-[3/4] bg-[var(--color-surface-container)]" />
                <div>
                  <p className="font-body font-semibold text-sm text-[var(--color-on-surface)]">{p.name}</p>
                  <p className="font-body text-xs text-[var(--color-secondary)] mt-0.5">{p.collection}</p>
                  <p className="font-body font-semibold text-sm text-[var(--color-primary)] mt-1">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {query.length > 1 && results.length === 0 && (
          <div className="max-w-3xl mx-auto px-5 md:px-10 pb-8">
            <p className="font-body text-[var(--color-secondary)] text-sm">No results for "<span className="font-semibold">{query}</span>"</p>
          </div>
        )}
      </div>
    </div>
  )
}

