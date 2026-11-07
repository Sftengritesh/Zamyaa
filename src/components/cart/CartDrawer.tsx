import { useEffect, useRef } from 'react'
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store'
import { Link } from 'react-router-dom'
import { formatPrice } from '@/data/products'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore()
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const subtotal = getSubtotal()
  const shipping = subtotal >= 15000 ? 0 : 495
  const total = subtotal + shipping

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-surface-container-lowest)] shadow-2xl z-50 flex flex-col transition-transform duration-400 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-outline-variant)]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[var(--color-primary)]" />
            <h2 className="font-display text-lg font-semibold text-[var(--color-on-surface)]">
              Your Bag
            </h2>
            {items.length > 0 && (
              <span className="bg-[var(--color-primary)] text-[var(--color-on-primary)] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="text-[var(--color-secondary)] hover:text-[var(--color-on-surface)] transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <ShoppingBag size={48} className="text-[var(--color-outline)]" />
              <div>
                <p className="font-display text-xl text-[var(--color-on-surface)]">Your bag is empty</p>
                <p className="font-body text-sm text-[var(--color-secondary)] mt-1">Add pieces from our collections</p>
              </div>
              <Link
                to="/collections"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-[var(--color-on-primary)] px-6 py-3 text-sm tracking-widest uppercase font-semibold font-body hover:opacity-90 transition-opacity"
              >
                Shop Collections <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-5 border-b border-[var(--color-outline-variant)] last:border-0">
                <Link to={`/product/${item.slug}`} onClick={closeCart}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-32 object-cover bg-[var(--color-surface-container)] shrink-0"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.slug}`} onClick={closeCart}>
                    <h3 className="font-body font-semibold text-sm text-[var(--color-on-surface)] leading-snug hover:text-[var(--color-secondary)] transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="font-body text-xs text-[var(--color-secondary)] mt-1">
                    {item.size} · {item.color}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[var(--color-outline-variant)]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        −
                      </button>
                      <span className="w-7 text-center font-body text-sm font-semibold text-[var(--color-on-surface)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-body font-semibold text-sm text-[var(--color-primary)]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[var(--color-secondary)] hover:text-[var(--color-error)] transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer summary */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] space-y-3">
            <div className="flex justify-between font-body text-sm text-[var(--color-secondary)]">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between font-body text-sm text-[var(--color-secondary)]">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs font-body text-[var(--color-secondary)] opacity-70">
                Free shipping on orders over ₹15,000
              </p>
            )}
            <div className="flex justify-between font-body font-bold text-base text-[var(--color-on-surface)] pt-2 border-t border-[var(--color-outline-variant)]">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full bg-[var(--color-primary)] text-[var(--color-on-primary)] py-4 text-sm tracking-[0.18em] uppercase font-semibold font-body hover:opacity-90 transition-opacity mt-2"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

