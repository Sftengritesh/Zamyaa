import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/data/products'
import { useWishlistStore, useCartStore } from '@/store'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [hoveredImg, setHoveredImg] = useState(false)
  const { toggle, isWishlisted } = useWishlistStore()
  const { addItem, openCart } = useCartStore()
  const wishlisted = isWishlisted(product.id)

  const primaryImg = product.images[0]?.url
  const secondaryImg = product.images[1]?.url ?? primaryImg

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size,
      color: product.colors[0]?.name ?? '',
      image: primaryImg,
      slug: product.slug,
    })
    openCart()
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: primaryImg,
      addedAt: new Date().toISOString(),
    })
  }

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <Link
        to={`/product/${product.slug}`}
        className="relative overflow-hidden block aspect-[3/4] bg-[var(--color-surface-container)]"
        onMouseEnter={() => setHoveredImg(true)}
        onMouseLeave={() => setHoveredImg(false)}
      >
        <img
          src={hoveredImg && secondaryImg ? secondaryImg : primaryImg}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className="px-2.5 py-1 text-[0.6rem] tracking-[0.18em] uppercase font-semibold font-body"
              style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
            >
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span
              className="px-2.5 py-1 text-[0.6rem] tracking-[0.18em] uppercase font-semibold font-body"
              style={{ background: 'var(--color-error)', color: 'var(--color-on-error, #fff)' }}
            >
              SALE
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
            hovered || wishlisted ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'var(--color-surface-container-lowest)',
            color: wishlisted ? 'var(--color-error)' : 'var(--color-on-surface)',
          }}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add overlay */}
        {hovered && (
          <div
            className="absolute bottom-0 left-0 right-0 py-3 px-3"
            style={{ background: 'var(--color-surface-container-lowest)', borderTop: '1px solid var(--color-outline-variant)' }}
          >
            <p className="text-[0.6rem] tracking-[0.18em] uppercase font-semibold font-body mb-2"
              style={{ color: 'var(--color-secondary)' }}>
              Quick Add
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size.label}
                  onClick={(e) => size.available && handleQuickAdd(e, size.label)}
                  disabled={!size.available}
                  className="w-8 h-8 text-xs font-semibold font-body border transition-colors duration-200"
                  style={{
                    borderColor: size.available ? 'var(--color-primary)' : 'var(--color-outline-variant)',
                    color: size.available ? 'var(--color-primary)' : 'var(--color-secondary)',
                    opacity: size.available ? 1 : 0.4,
                    cursor: size.available ? 'pointer' : 'not-allowed',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (size.available) {
                      (e.target as HTMLButtonElement).style.background = 'var(--color-primary)'
                      ;(e.target as HTMLButtonElement).style.color = 'var(--color-on-primary)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (size.available) {
                      (e.target as HTMLButtonElement).style.background = 'transparent'
                      ;(e.target as HTMLButtonElement).style.color = 'var(--color-primary)'
                    }
                  }}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="pt-3 space-y-1">
        <p className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold font-body"
          style={{ color: 'var(--color-secondary)' }}>
          {product.collection}
        </p>
        <Link
          to={`/product/${product.slug}`}
          className="block font-body font-semibold text-sm leading-snug hover:opacity-70 transition-opacity"
          style={{ color: 'var(--color-on-surface)' }}
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="font-body font-bold text-sm" style={{ color: 'var(--color-primary)' }}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-body text-xs line-through" style={{ color: 'var(--color-secondary)' }}>
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

