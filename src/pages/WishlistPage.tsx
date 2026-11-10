import { Link } from 'react-router-dom'
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useWishlistStore, useCartStore } from '@/store'
import { formatPrice } from '@/data/products'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const { openCart, addItem } = useCartStore()

  const handleQuickAdd = (item: (typeof items)[0]) => {
    addItem({
      productId: item.productId,
      slug: item.slug,
      name: item.name,
      price: item.price,
      image: item.image,
      size: 'M',
      color: 'Default',
      quantity: 1,
    })
    removeItem(item.productId)
    openCart()
  }

  return (
    <div className="min-h-screen bg-white text-black font-body pt-12 pb-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-black/10 pb-8 mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-black/60" />
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500">
              SAVED PIECES
            </p>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h1 className="font-display text-4xl sm:text-5xl font-light text-black">
              My Wishlist
            </h1>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              {items.length} {items.length === 1 ? 'Piece' : 'Pieces'} Saved
            </span>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="py-24 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full border border-neutral-300 flex items-center justify-center mx-auto text-neutral-400">
              <Heart size={28} strokeWidth={1.2} />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-normal text-neutral-900">
                Your Wishlist is Empty
              </h2>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Save pieces from our Lantana and The Boho Flare Affair capsules to view them later or curate your personal ensemble.
              </p>
            </div>
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:opacity-85 transition-opacity"
            >
              Explore Collections <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <div
                key={item.productId}
                className="group border border-neutral-200 bg-white flex flex-col justify-between transition-all hover:border-black"
              >
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                    <Link to={`/product/${item.slug}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>
                    <button
                      onClick={() => removeItem(item.productId)}
                      aria-label="Remove from wishlist"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-neutral-700 hover:text-black hover:bg-white shadow-xs transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="p-5 space-y-2">
                    <Link to={`/product/${item.slug}`}>
                      <h3 className="font-display text-base font-normal text-black group-hover:underline line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="font-body text-sm font-semibold text-neutral-900">
                      {formatPrice(item.price, 'INR')}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleQuickAdd(item)}
                    className="w-full py-3 bg-black text-white hover:opacity-85 text-xs font-mono uppercase tracking-widest font-semibold transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag size={14} /> Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
