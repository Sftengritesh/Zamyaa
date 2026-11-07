import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check,
  CreditCard,
  Smartphone,
  Building2,
  Banknote,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Lock,
} from 'lucide-react'
import { useCartStore } from '@/store'
import { formatPrice } from '@/data/products'

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore()

  // Multi-step state: 1 (Contact), 2 (Shipping), 3 (Delivery), 4 (Payment), 5 (Confirmed)
  const [currentStep, setCurrentStep] = useState<number>(4)

  // Form states
  const [email, setEmail] = useState('jyoti.client@example.com')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [firstName, setFirstName] = useState('Ananya')
  const [lastName, setLastName] = useState('Sharma')
  const [address, setAddress] = useState('Flat 402, Sea Green Apartments, Worli Sea Face')
  const [city, setCity] = useState('Mumbai')
  const [state, setState] = useState('Maharashtra')
  const [pincode, setPincode] = useState('400018')

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'concierge' | 'bespoke'>('standard')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card')

  // Card inputs
  const [cardNumber, setCardNumber] = useState('4111 •••• •••• 8823')
  const [cardName, setCardName] = useState('ANANYA SHARMA')
  const [expiry, setExpiry] = useState('08/28')
  const [cvv, setCvv] = useState('•••')

  // UPI input
  const [upiId, setUpiId] = useState('')

  // Promo code
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  // If cart is empty, show default preview item so the user can experience the checkout flow
  const displayItems =
    items.length > 0
      ? items
      : [
          {
            id: 'demo-1',
            productId: 'p1',
            name: 'The Gulabi Rose Silk Co-Ord Set',
            price: 48500,
            quantity: 1,
            size: 'M',
            color: 'Gulabi Rose',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBfuxqZf27ins7Kdr765TAwhjxQcguh3iNl59grkP5K9Gm6ugHPnQeUaR0ZO38jDgoi1-52lBXqSe3c3u3kTnaMJ3qJi0EDLh1IzOAyPMY2CqV9pPPGyTcfsp7pfAtAGMMludLl0T1Mu72m9k795LFl7yUJywYNhH1t1RFZeSn-uzeTD0eL67QW1dodLgtFfwpxiZHHwFZs72NVMU7QB-Pyey6qCv987D63rg2O5303',
            slug: 'gulabi-rose-silk-co-ord',
          },
        ]

  const rawSubtotal =
    items.length > 0
      ? getSubtotal()
      : displayItems.reduce((acc, i) => acc + i.price * i.quantity, 0)

  const discount = promoApplied ? rawSubtotal * 0.1 : 0
  const subtotal = rawSubtotal - discount

  const shippingCost =
    deliveryMethod === 'concierge'
      ? 995
      : deliveryMethod === 'bespoke'
      ? 0
      : subtotal >= 15000
      ? 0
      : 495

  const total = subtotal + shippingCost

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === 'ZAMYAA10' || promoCode.trim().length > 3) {
      setPromoApplied(true)
    }
  }

  const handlePlaceOrder = () => {
    setCurrentStep(5)
    clearCart()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const steps = [
    { num: 1, label: 'Contact' },
    { num: 2, label: 'Shipping' },
    { num: 3, label: 'Delivery' },
    { num: 4, label: 'Payment' },
  ]

  if (currentStep === 5) {
    return (
      <div
        className="min-h-screen py-24 px-6 md:px-16 flex items-center justify-center font-body"
        style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
      >
        <div
          className="max-w-xl w-full p-10 md:p-14 text-center border shadow-xl"
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderColor: 'var(--color-outline-variant)',
          }}
        >
          <div
            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
          >
            <Check size={32} />
          </div>
          <p
            className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
            style={{ color: 'var(--color-secondary)' }}
          >
            ORDER #ZY-2025-8831 CONFIRMED
          </p>
          <h1
            className="font-display text-3xl md:text-4xl font-semibold mb-4"
            style={{ color: 'var(--color-primary)' }}
          >
            Thank You for Celebrating Craft
          </h1>
          <p
            className="font-body text-sm leading-relaxed mb-8"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            Your order has been received by Jyoti and our artisan atelier. We are preparing your
            garments with archival care. A bespoke tracking dossier has been sent to{' '}
            <span className="font-semibold">{email}</span>.
          </p>

          <div
            className="p-5 text-left mb-8 space-y-2 border text-xs"
            style={{
              backgroundColor: 'var(--color-surface-container-low)',
              borderColor: 'var(--color-outline-variant)',
            }}
          >
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-secondary)' }}>Delivery To:</span>
              <span className="font-semibold">
                {firstName} {lastName}, {city}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-secondary)' }}>Method:</span>
              <span className="font-semibold uppercase">{deliveryMethod}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-secondary)' }}>Payment:</span>
              <span className="font-semibold uppercase">{paymentMethod}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total Paid:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Link
            to="/collections"
            className="inline-block w-full py-4 text-xs tracking-[0.2em] uppercase font-semibold font-body transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
            }}
          >
            RETURN TO THE ATELIER
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen font-body"
      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
    >
      {/* ── STEPPER ANCHOR (Recreated from Stitch screen_checkout.html) ── */}
      <section
        className="w-full shadow-sm border-b"
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderColor: 'var(--color-outline-variant)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4">
          <div className="flex items-center justify-between sm:justify-center sm:gap-10 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {steps.map((st) => {
              const isPassed = currentStep > st.num
              const isActive = currentStep === st.num

              return (
                <button
                  key={st.num}
                  type="button"
                  onClick={() => setCurrentStep(st.num)}
                  className="flex items-center gap-2 shrink-0 cursor-pointer group"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[0.625rem] font-bold transition-colors"
                    style={{
                      backgroundColor:
                        isPassed || isActive
                          ? 'var(--color-primary)'
                          : 'var(--color-surface-container-high)',
                      color:
                        isPassed || isActive
                          ? 'var(--color-on-primary)'
                          : 'var(--color-secondary)',
                    }}
                  >
                    {isPassed ? <Check size={12} /> : `0${st.num}`}
                  </div>
                  <span
                    className={`text-xs uppercase tracking-[0.2em] font-body transition-colors ${
                      isActive ? 'font-bold' : 'font-normal'
                    }`}
                    style={{
                      color: isActive ? 'var(--color-primary)' : 'var(--color-secondary)',
                    }}
                  >
                    0{st.num} {st.label}
                  </span>
                  {st.num < 4 && (
                    <span
                      className="px-2 font-light hidden sm:inline"
                      style={{ color: 'var(--color-outline-variant)' }}
                    >
                      /
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── MAIN CHECKOUT INTERFACE (2 Columns) ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Form Steps (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact */}
            <div
              className="p-6 md:p-8 border shadow-sm transition-all"
              style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                borderColor:
                  currentStep === 1 ? 'var(--color-primary)' : 'var(--color-outline-variant)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-semibold">01. Contact Information</span>
                  {currentStep > 1 && <Check size={16} className="text-green-600" />}
                </div>
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs uppercase underline font-semibold tracking-wider"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === 1 ? (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                      Email Address (for order tracking)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 text-sm border font-body outline-none focus:border-black"
                      style={{
                        borderColor: 'var(--color-outline-variant)',
                        backgroundColor: 'var(--color-surface)',
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                      Phone Number (for courier dispatch)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 text-sm border font-body outline-none focus:border-black"
                      style={{
                        borderColor: 'var(--color-outline-variant)',
                        backgroundColor: 'var(--color-surface)',
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-3.5 text-xs tracking-[0.2em] uppercase font-semibold font-body"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-on-primary)',
                    }}
                  >
                    CONTINUE TO SHIPPING →
                  </button>
                </div>
              ) : (
                <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>
                  {email} · {phone}
                </p>
              )}
            </div>

            {/* Step 2: Shipping */}
            <div
              className="p-6 md:p-8 border shadow-sm transition-all"
              style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                borderColor:
                  currentStep === 2 ? 'var(--color-primary)' : 'var(--color-outline-variant)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-semibold">02. Shipping Address</span>
                  {currentStep > 2 && <Check size={16} className="text-green-600" />}
                </div>
                {currentStep > 2 && (
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs uppercase underline font-semibold tracking-wider"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === 2 ? (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 text-sm border font-body outline-none"
                        style={{
                          borderColor: 'var(--color-outline-variant)',
                          backgroundColor: 'var(--color-surface)',
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 text-sm border font-body outline-none"
                        style={{
                          borderColor: 'var(--color-outline-variant)',
                          backgroundColor: 'var(--color-surface)',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 text-sm border font-body outline-none"
                      style={{
                        borderColor: 'var(--color-outline-variant)',
                        backgroundColor: 'var(--color-surface)',
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 text-sm border font-body outline-none"
                        style={{
                          borderColor: 'var(--color-outline-variant)',
                          backgroundColor: 'var(--color-surface)',
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-4 py-3 text-sm border font-body outline-none"
                        style={{
                          borderColor: 'var(--color-outline-variant)',
                          backgroundColor: 'var(--color-surface)',
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full px-4 py-3 text-sm border font-body outline-none"
                        style={{
                          borderColor: 'var(--color-outline-variant)',
                          backgroundColor: 'var(--color-surface)',
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="w-full py-3.5 text-xs tracking-[0.2em] uppercase font-semibold font-body"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-on-primary)',
                    }}
                  >
                    CONTINUE TO DELIVERY →
                  </button>
                </div>
              ) : (
                <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>
                  {firstName} {lastName}, {address}, {city}, {state} - {pincode}
                </p>
              )}
            </div>

            {/* Step 3: Delivery */}
            <div
              className="p-6 md:p-8 border shadow-sm transition-all"
              style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                borderColor:
                  currentStep === 3 ? 'var(--color-primary)' : 'var(--color-outline-variant)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-semibold">03. Delivery Method</span>
                  {currentStep > 3 && <Check size={16} className="text-green-600" />}
                </div>
                {currentStep > 3 && (
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-xs uppercase underline font-semibold tracking-wider"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === 3 ? (
                <div className="space-y-3 pt-2">
                  <label
                    onClick={() => setDeliveryMethod('standard')}
                    className="flex items-center justify-between p-4 border cursor-pointer transition-colors"
                    style={{
                      borderColor:
                        deliveryMethod === 'standard'
                          ? 'var(--color-primary)'
                          : 'var(--color-outline-variant)',
                      backgroundColor:
                        deliveryMethod === 'standard'
                          ? 'var(--color-surface-container-low)'
                          : 'transparent',
                    }}
                  >
                    <div>
                      <p className="text-sm font-semibold font-body">Standard Express Shipping</p>
                      <p className="text-xs text-secondary mt-0.5">3–5 business days across India</p>
                    </div>
                    <span className="font-bold text-sm">
                      {subtotal >= 15000 ? 'Complimentary' : '₹495'}
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod('concierge')}
                    className="flex items-center justify-between p-4 border cursor-pointer transition-colors"
                    style={{
                      borderColor:
                        deliveryMethod === 'concierge'
                          ? 'var(--color-primary)'
                          : 'var(--color-outline-variant)',
                      backgroundColor:
                        deliveryMethod === 'concierge'
                          ? 'var(--color-surface-container-low)'
                          : 'transparent',
                    }}
                  >
                    <div>
                      <p className="text-sm font-semibold font-body">Same-Day White Glove Concierge</p>
                      <p className="text-xs text-secondary mt-0.5">
                        Within 24 hours in Mumbai, Delhi NCR & Jaipur
                      </p>
                    </div>
                    <span className="font-bold text-sm">₹995</span>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod('bespoke')}
                    className="flex items-center justify-between p-4 border cursor-pointer transition-colors"
                    style={{
                      borderColor:
                        deliveryMethod === 'bespoke'
                          ? 'var(--color-primary)'
                          : 'var(--color-outline-variant)',
                      backgroundColor:
                        deliveryMethod === 'bespoke'
                          ? 'var(--color-surface-container-low)'
                          : 'transparent',
                    }}
                  >
                    <div>
                      <p className="text-sm font-semibold font-body">Bespoke Atelier Fit & Delivery</p>
                      <p className="text-xs text-secondary mt-0.5">
                        Custom tailored to measurements (7–10 days)
                      </p>
                    </div>
                    <span className="font-bold text-sm">Complimentary</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="w-full py-3.5 text-xs tracking-[0.2em] uppercase font-semibold font-body mt-2"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-on-primary)',
                    }}
                  >
                    CONTINUE TO PAYMENT →
                  </button>
                </div>
              ) : (
                <p className="text-xs uppercase font-medium" style={{ color: 'var(--color-secondary)' }}>
                  {deliveryMethod === 'standard'
                    ? 'Standard Express (3-5 days)'
                    : deliveryMethod === 'concierge'
                    ? 'Same-Day Concierge'
                    : 'Bespoke Atelier Delivery'}
                </p>
              )}
            </div>

            {/* Step 4: Payment (Active) */}
            <div
              className="p-6 md:p-8 border shadow-sm transition-all"
              style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                borderColor:
                  currentStep === 4 ? 'var(--color-primary)' : 'var(--color-outline-variant)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-lg font-semibold">04. Secure Payment</span>
                <span className="flex items-center gap-1 text-[0.6875rem] font-semibold text-green-700">
                  <Lock size={12} /> 256-BIT ENCRYPTED
                </span>
              </div>

              {/* Payment Methods Tab */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                  { id: 'netbanking', label: 'NetBanking', icon: Building2 },
                  { id: 'cod', label: 'Cash / COD', icon: Banknote },
                ].map((m) => {
                  const Icon = m.icon
                  const active = paymentMethod === m.id
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className="py-3 px-2 border flex flex-col items-center gap-1.5 transition-colors"
                      style={{
                        borderColor: active ? 'var(--color-primary)' : 'var(--color-outline-variant)',
                        backgroundColor: active
                          ? 'var(--color-surface-container-high)'
                          : 'transparent',
                        color: active ? 'var(--color-primary)' : 'var(--color-secondary)',
                      }}
                    >
                      <Icon size={18} />
                      <span className="text-[0.6875rem] uppercase font-semibold tracking-wider">
                        {m.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Method content */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-4 py-3 text-sm border font-body outline-none"
                      style={{
                        borderColor: 'var(--color-outline-variant)',
                        backgroundColor: 'var(--color-surface)',
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-4 py-3 text-sm border font-body outline-none uppercase"
                      style={{
                        borderColor: 'var(--color-outline-variant)',
                        backgroundColor: 'var(--color-surface)',
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 text-sm border font-body outline-none"
                        style={{
                          borderColor: 'var(--color-outline-variant)',
                          backgroundColor: 'var(--color-surface)',
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={4}
                        className="w-full px-4 py-3 text-sm border font-body outline-none"
                        style={{
                          borderColor: 'var(--color-outline-variant)',
                          backgroundColor: 'var(--color-surface)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. mobile@okaxis or yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-3 text-sm border font-body outline-none"
                      style={{
                        borderColor: 'var(--color-outline-variant)',
                        backgroundColor: 'var(--color-surface)',
                      }}
                    />
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-secondary)' }}>
                    A payment request will be sent to your PhonePe, Google Pay, or Paytm app.
                  </p>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-4">
                  <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                    Select Your Bank
                  </label>
                  <select
                    className="w-full px-4 py-3 text-sm border font-body outline-none"
                    style={{
                      borderColor: 'var(--color-outline-variant)',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  >
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div
                  className="p-4 border text-xs space-y-2"
                  style={{
                    backgroundColor: 'var(--color-surface-container-low)',
                    borderColor: 'var(--color-outline-variant)',
                  }}
                >
                  <p className="font-semibold">Cash on Delivery Available</p>
                  <p style={{ color: 'var(--color-secondary)' }}>
                    Please verify your phone number via SMS OTP during dispatch. Exact cash or UPI
                    QR will be accepted by the delivery courier.
                  </p>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="w-full py-4 text-xs tracking-[0.22em] uppercase font-semibold font-body transition-opacity hover:opacity-90 shadow-md"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-on-primary)',
                  }}
                >
                  PLACE ORDER · {formatPrice(total)}
                </button>
                <p
                  className="text-center text-[0.6875rem] mt-3"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  By placing this order, you agree to Zamyaa's Bespoke Tailoring Terms & Conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div
              className="p-6 md:p-8 border shadow-sm"
              style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                borderColor: 'var(--color-outline-variant)',
              }}
            >
              <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>

              {/* Product items list */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-1">
                {displayItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-22 object-cover aspect-[3/4] shrink-0"
                      style={{ backgroundColor: 'var(--color-surface-container)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-body text-xs font-semibold leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                      <p
                        className="text-[0.6875rem] mt-0.5"
                        style={{ color: 'var(--color-secondary)' }}
                      >
                        Size: {item.size} · Color: {item.color}
                      </p>
                      <p
                        className="text-[0.6875rem]"
                        style={{ color: 'var(--color-secondary)' }}
                      >
                        Qty: {item.quantity}
                      </p>
                      <p className="font-bold text-xs mt-1">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Promo Code (try ZAMYAA10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border uppercase font-body outline-none"
                  style={{
                    borderColor: 'var(--color-outline-variant)',
                    backgroundColor: 'var(--color-surface)',
                  }}
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs uppercase font-semibold font-body border"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-on-primary)',
                  }}
                >
                  Apply
                </button>
              </form>

              {promoApplied && (
                <p className="text-xs text-green-700 font-semibold mb-4">
                  ✓ Code applied! 10% atelier privilege discount.
                </p>
              )}

              {/* Cost Calculations */}
              <div
                className="space-y-3 pt-4 border-t text-xs font-body"
                style={{ borderColor: 'var(--color-outline-variant)' }}
              >
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-secondary)' }}>Subtotal</span>
                  <span>{formatPrice(rawSubtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Privilege Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-secondary)' }}>Shipping</span>
                  <span>{shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-secondary)' }}>Included GST (12%)</span>
                  <span>{formatPrice(Math.round(subtotal * 0.12))}</span>
                </div>
                <div
                  className="flex justify-between text-base font-bold pt-3 border-t"
                  style={{
                    borderColor: 'var(--color-outline-variant)',
                    color: 'var(--color-primary)',
                  }}
                >
                  <span>Estimated Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Atelier Guarantees */}
            <div
              className="p-5 border space-y-3 text-xs"
              style={{
                backgroundColor: 'var(--color-surface-container-low)',
                borderColor: 'var(--color-outline-variant)',
                color: 'var(--color-secondary)',
              }}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="shrink-0 text-black dark:text-white" />
                <span>Certified Pure Handloom & Handwoven Chanderi Silks</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={18} className="shrink-0 text-black dark:text-white" />
                <span>7-Day Complimentary Returns & Size Alterations</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="shrink-0 text-black dark:text-white" />
                <span>Bespoke Tailoring Assistance Direct from Jyoti's Studio</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
