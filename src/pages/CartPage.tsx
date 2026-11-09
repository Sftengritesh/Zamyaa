import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft, Sparkles, Truck, Banknote } from 'lucide-react'
import { useCartStore } from '@/store'
import { formatPrice } from '@/data/products'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore()

  const subtotal = getSubtotal()
  const shipping = subtotal >= 15000 || subtotal === 0 ? 0 : 495
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center font-body"
        style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: 'var(--color-surface-container-high)' }}
        >
          <ShoppingBag size={32} style={{ color: 'var(--color-secondary)' }} />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-3">
          Your Shopping Bag is Empty
        </h1>
        <p
          className="font-body text-sm max-w-md mx-auto mb-8 leading-relaxed"
          style={{ color: 'var(--color-secondary)' }}
        >
          Explore our handcrafted silken silhouettes from the Noor-e-Rang and Lantana collections.
        </p>
        <Link
          to="/collections"
          className="px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold font-body inline-flex items-center gap-2"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
          }}
        >
          EXPLORE COLLECTIONS <ArrowRight size={14} />
        </Link>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen font-body"
      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-16">
        <div className="flex items-center justify-between pb-6 mb-8 border-b" style={{ borderColor: 'var(--color-outline-variant)' }}>
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold">Your Shopping Bag</h1>
            <p className="text-xs text-secondary uppercase tracking-widest mt-1">
              {items.reduce((acc, i) => acc + i.quantity, 0)} Items Curated
            </p>
          </div>
          <Link
            to="/collections"
            className="text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 hover:underline"
            style={{ color: 'var(--color-secondary)' }}
          >
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart items table (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div
              className="border shadow-sm divide-y"
              style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                borderColor: 'var(--color-outline-variant)',
              }}
            >
              {items.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                  <div className="flex gap-5 items-center">
                    <Link to={`/product/${item.slug}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-28 object-cover aspect-[3/4]"
                        style={{ backgroundColor: 'var(--color-surface-container)' }}
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/product/${item.slug}`}
                        className="font-display text-base font-semibold hover:underline block"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-secondary mt-1">
                        Size: <span className="font-semibold text-primary">{item.size}</span> · Color:{' '}
                        <span className="font-semibold text-primary">{item.color}</span>
                      </p>
                      <p className="font-bold text-sm mt-2">{formatPrice(item.price)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8 pt-4 sm:pt-0 border-t sm:border-0">
                    {/* Quantity controls */}
                    <div
                      className="flex items-center border"
                      style={{ borderColor: 'var(--color-outline-variant)' }}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold hover:bg-black/5"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-xs font-bold hover:bg-black/5"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-secondary hover:text-red-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Atelier Note */}
            <div
              className="p-6 border text-xs space-y-2"
              style={{
                backgroundColor: 'var(--color-surface-container-low)',
                borderColor: 'var(--color-outline-variant)',
              }}
            >
              <div className="flex items-center gap-2 font-semibold">
                <Sparkles size={14} /> Bespoke Tailoring & Size Customization Available
              </div>
              <p className="text-secondary">
                Need customized sleeve length, blouse alterations, or custom trousers inseam? Mention
                your measurements in order notes during checkout, or our concierge will call you
                right after placing your order.
              </p>
            </div>
          </div>

          {/* Right Summary (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div
              className="p-8 border shadow-sm space-y-6"
              style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                borderColor: 'var(--color-outline-variant)',
              }}
            >
              <h2 className="font-display text-xl font-semibold">Order Calculation</h2>

              <div className="space-y-3 text-xs border-b pb-4" style={{ borderColor: 'var(--color-outline-variant)' }}>
                <div className="flex justify-between">
                  <span className="text-secondary">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Estimated Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[0.6875rem] text-secondary">
                    Add {formatPrice(15000 - subtotal)} more for free express shipping.
                  </p>
                )}
                <div className="flex justify-between">
                  <span className="text-secondary">GST Included</span>
                  <span className="font-semibold">{formatPrice(Math.round(subtotal * 0.12))}</span>
                </div>
              </div>

              <div className="flex justify-between text-base font-bold">
                <span>Estimated Total</span>
                <span className="font-display text-xl">{formatPrice(total)}</span>
              </div>

              {/* Cash on Delivery Advance Commitment Notice */}
              <div className="bg-neutral-50 border border-neutral-200 p-4 text-xs space-y-2">
                <div className="flex items-center justify-between font-semibold text-neutral-900">
                  <span className="flex items-center gap-1.5">
                    <Banknote size={15} className="text-neutral-700" /> Cash on Delivery (COD)
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-neutral-200 px-2 py-0.5 text-neutral-800">
                    Advance Option
                  </span>
                </div>
                <div className="text-[11px] text-neutral-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Advance Booking (Paid Online):</span>
                    <strong className="text-black">₹999</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Balance at Doorstep:</span>
                    <strong className="text-black">{formatPrice(Math.max(0, total - 999))}</strong>
                  </div>
                </div>
                <p className="text-[10px] text-neutral-500 italic pt-1 border-t border-neutral-200 leading-normal">
                  Pay ₹999 advance to unlock COD during checkout; remainder paid in cash or UPI to courier upon arrival.
                </p>
              </div>

              <Link
                to="/checkout"
                className="w-full py-4 text-xs tracking-[0.2em] uppercase font-semibold font-body inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90 shadow-md"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                }}
              >
                PROCEED TO CHECKOUT <ArrowRight size={14} />
              </Link>
            </div>

            {/* Trust badge */}
            <div
              className="p-5 border space-y-2 text-xs text-secondary"
              style={{
                backgroundColor: 'var(--color-surface-container-low)',
                borderColor: 'var(--color-outline-variant)',
              }}
            >
              <div className="flex items-center gap-2 font-semibold text-primary">
                <Truck size={16} /> Complimentary Worldwide Express on Orders &gt; ₹15,000
              </div>
              <p>Hand-packed in sustainable archival cotton-muslin pouches and luxury gift box.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
