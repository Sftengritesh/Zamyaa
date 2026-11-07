import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div
      className="min-h-[75vh] flex flex-col items-center justify-center px-6 py-24 text-center font-body"
      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
    >
      <p
        className="text-xs uppercase tracking-[0.3em] font-semibold mb-4"
        style={{ color: 'var(--color-secondary)' }}
      >
        ARCHIVAL PIECE NOT FOUND
      </p>

      <h1
        className="font-display text-8xl md:text-9xl font-light mb-6 tracking-tight"
        style={{ color: 'var(--color-primary)' }}
      >
        404
      </h1>

      <h2 className="font-display text-2xl md:text-3xl font-normal mb-4 max-w-md">
        This Piece Has Wandered Off The Runway
      </h2>

      <p
        className="font-body text-sm leading-relaxed max-w-md mx-auto mb-10"
        style={{ color: 'var(--color-on-surface-variant)' }}
      >
        The silhouette, lookbook page, or archival collection you are seeking may have moved to our
        private reserves or no longer exists.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold font-body transition-opacity hover:opacity-90 inline-flex items-center justify-center gap-2"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
          }}
        >
          RETURN TO HOMEPAGE <ArrowRight size={14} />
        </Link>
        <Link
          to="/collections"
          className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold font-body border transition-colors inline-flex items-center justify-center"
          style={{
            borderColor: 'var(--color-primary)',
            color: 'var(--color-primary)',
          }}
        >
          EXPLORE COLLECTIONS
        </Link>
      </div>
    </div>
  )
}
