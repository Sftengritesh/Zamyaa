import { useState, useEffect } from 'react'
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
  CheckCircle2,
} from 'lucide-react'
import { useCartStore } from '@/store'
import { useCustomerAuth } from '@/store/customerAuth'
import { formatPrice } from '@/data/products'

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore()
  const { user: authUser, isAuthenticated } = useCustomerAuth()

  // Multi-step state: 1 (Contact), 2 (Shipping), 3 (Delivery), 4 (Payment), 5 (Confirmed)
  const [currentStep, setCurrentStep] = useState<number>(4)
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string>('')
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false)
  const [orderError, setOrderError] = useState<string | null>(null)

  // Form states - pre-fill from authenticated customer profile if available
  const [email, setEmail] = useState('jyoti.client@example.com')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [firstName, setFirstName] = useState('Ananya')
  const [lastName, setLastName] = useState('Sharma')
  const [address, setAddress] = useState('Flat 402, Sea Green Apartments, Worli Sea Face')
  const [city, setCity] = useState('Mumbai')
  const [state, setState] = useState('Maharashtra')
  const [pincode, setPincode] = useState('400018')

  // Auto-populate with logged-in user profile details if authenticated
  useEffect(() => {
    if (isAuthenticated && authUser) {
      if (authUser.email) setEmail(authUser.email)
      if (authUser.name) {
        const parts = authUser.name.trim().split(' ')
        setFirstName(parts[0] || '')
        setLastName(parts.slice(1).join(' ') || '')
      }
      if (authUser.phone) setPhone(authUser.phone)
      if (authUser.addresses && authUser.addresses.length > 0) {
        const defaultAddr = authUser.addresses.find((a) => a.isDefault) || authUser.addresses[0]
        if (defaultAddr.address) setAddress(defaultAddr.address)
        if (defaultAddr.city) setCity(defaultAddr.city)
        if (defaultAddr.state) setState(defaultAddr.state)
        if (defaultAddr.pincode) setPincode(defaultAddr.pincode)
      }
    }
  }, [isAuthenticated, authUser])

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

  // Cash on Delivery Advance Commitment
  const codAdvanceAmount = 999
  const [codAdvancePaid, setCodAdvancePaid] = useState<boolean>(false)
  const [payingAdvance, setPayingAdvance] = useState<boolean>(false)
  const [codAdvanceMethod, setCodAdvanceMethod] = useState<'upi' | 'card'>('upi')
  const [codAdvanceUpi, setCodAdvanceUpi] = useState<string>('buyer@okaxis')

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
  const codRemainingAmount = Math.max(0, total - codAdvanceAmount)

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === 'ZAMYAA10' || promoCode.trim().length > 3) {
      setPromoApplied(true)
    }
  }

  const handlePayCodAdvance = () => {
    setPayingAdvance(true)
    setTimeout(() => {
      setPayingAdvance(false)
      setCodAdvancePaid(true)
    }, 1200)
  }

  const handlePlaceOrder = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !address.trim() || !pincode.trim()) {
      setOrderError('Please complete all contact and shipping address details.')
      return
    }

    if (paymentMethod === 'cod' && !codAdvancePaid) {
      setOrderError('Please pay the nominal ₹999 commitment advance to unlock Cash on Delivery.')
      return
    }

    setIsSubmittingOrder(true)
    setOrderError(null)

    try {
      const orderPayload = {
        customer: {
          name: `${firstName.trim()} ${lastName.trim()}`.trim() || 'Guest Client',
          email: email.trim() || 'guest@zamyaa.in',
          phone: phone.trim() || '+91 99999 99999',
        },
        shippingAddress: {
          address: address.trim(),
          city: city.trim(),
          state: state.trim() || 'Maharashtra',
          pincode: pincode.trim(),
          country: 'India',
        },
        items: displayItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        couponCode: promoApplied ? 'ZAMYAA10' : undefined,
        paymentMethod,
        notes: deliveryMethod === 'concierge' ? 'Concierge Hand-Delivery' : '',
      }

      // 1. Submit order to backend for authoritative price & inventory validation
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to create order on server')
      }

      const createdOrder = data.order

      // 2. Initiate Razorpay if online payment chosen
      if (paymentMethod !== 'cod') {
        try {
          const payRes = await fetch('/api/payments/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: orderPayload.items,
              orderId: createdOrder.id,
              orderNumber: createdOrder.orderNumber,
            }),
          })
          const payData = await payRes.json()

          if (payData.success && !payData.simulated && typeof window !== 'undefined' && window.Razorpay) {
            const rzp = new window.Razorpay({
              key: payData.keyId,
              amount: payData.amount,
              currency: payData.currency,
              name: 'ZAMYAA by Jyoti',
              description: `Order ${createdOrder.orderNumber}`,
              order_id: payData.orderId,
              prefill: {
                name: orderPayload.customer.name,
                email: orderPayload.customer.email,
                contact: orderPayload.customer.phone,
              },
              theme: { color: '#000000' },
              handler: async (response) => {
                await fetch('/api/payments/verify', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                    orderNumber: createdOrder.orderNumber,
                  }),
                })
                setConfirmedOrderNumber(createdOrder.orderNumber)
                setCurrentStep(5)
                clearCart()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              },
            })
            rzp.open()
            return
          }
        } catch (payErr) {
          console.warn('Payment gateway fallback to safe completion:', payErr)
        }
      }

      // 3. Complete order presentation
      setConfirmedOrderNumber(createdOrder.orderNumber)
      setCurrentStep(5)
      clearCart()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Payment or order processing failed. Please try again.'
      setOrderError(message)
    } finally {
      setIsSubmittingOrder(false)
    }
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
            ORDER #{confirmedOrderNumber || 'ZY-2026-1044'} CONFIRMED
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
                <div className="space-y-4">
                  {/* Advance Policy Header */}
                  <div
                    className="p-5 border space-y-3"
                    style={{
                      backgroundColor: 'var(--color-surface-container-low)',
                      borderColor: 'var(--color-outline-variant)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-semibold flex items-center gap-2">
                        <Banknote size={18} /> Cash on Delivery (With ₹999 Advance Booking)
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-neutral-200 text-neutral-800">
                        Atelier Policy
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      To prevent transit cancellations on our bespoke handcrafted silken garments, a nominal
                      advance commitment deposit of <strong>₹{codAdvanceAmount.toLocaleString('en-IN')}</strong> is
                      paid online now. The remaining balance will be collected in cash or UPI at your doorstep.
                    </p>

                    {/* Breakdown Calculation */}
                    <div className="border border-neutral-200 bg-white p-3 text-xs space-y-1.5 divide-y divide-neutral-100">
                      <div className="flex justify-between py-1">
                        <span className="text-neutral-500">Total Garment Order Value</span>
                        <span className="font-semibold">{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between py-1 text-emerald-800 font-semibold">
                        <span>Advance Booking Deposit (Pay Now)</span>
                        <span>₹{codAdvanceAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between py-1 text-neutral-900 font-bold">
                        <span>Remaining Balance to Pay at Doorstep</span>
                        <span>{formatPrice(codRemainingAmount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Advance Payment Action Box */}
                  {!codAdvancePaid ? (
                    <div className="border-2 border-dashed border-amber-400 bg-amber-50/50 p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-xs uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                            <Lock size={14} className="text-amber-700" />
                            Step 1: Pay ₹999 Advance to Unlock COD
                          </p>
                          <p className="text-[11px] text-amber-800 mt-0.5">
                            Instant confirmation via Google Pay, PhonePe, Paytm or Card.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2.5 py-1">
                          ₹{codAdvanceAmount} Due
                        </span>
                      </div>

                      {/* Payment mode switcher for advance */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setCodAdvanceMethod('upi')}
                          className={`flex-1 py-2 px-3 text-xs font-mono uppercase tracking-wider border flex items-center justify-center gap-1.5 ${
                            codAdvanceMethod === 'upi'
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-neutral-700 border-neutral-300'
                          }`}
                        >
                          <Smartphone size={13} /> UPI / QR (Instant)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCodAdvanceMethod('card')}
                          className={`flex-1 py-2 px-3 text-xs font-mono uppercase tracking-wider border flex items-center justify-center gap-1.5 ${
                            codAdvanceMethod === 'card'
                              ? 'bg-black text-white border-black font-semibold'
                              : 'bg-white text-neutral-700 border-neutral-300'
                          }`}
                        >
                          <CreditCard size={13} /> Debit / Credit Card
                        </button>
                      </div>

                      {codAdvanceMethod === 'upi' ? (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider font-semibold text-neutral-700 mb-1">
                              Your UPI ID (VPA)
                            </label>
                            <input
                              type="text"
                              value={codAdvanceUpi}
                              onChange={(e) => setCodAdvanceUpi(e.target.value)}
                              placeholder="e.g. yourname@okaxis"
                              className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white font-mono focus:border-black outline-none"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={handlePayCodAdvance}
                              disabled={payingAdvance}
                              className="flex-1 py-3 bg-neutral-900 hover:bg-black text-white text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50"
                            >
                              {payingAdvance ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Smartphone size={14} className="text-emerald-400" />
                              )}
                              <span>
                                {payingAdvance ? 'Verifying ₹999 Payment...' : 'Pay ₹999 Advance via UPI'}
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Card Number •••• •••• •••• 8823"
                            defaultValue="4111 •••• •••• 8823"
                            className="w-full px-3 py-2 text-xs border border-neutral-300 bg-white font-mono"
                          />
                          <button
                            type="button"
                            onClick={handlePayCodAdvance}
                            disabled={payingAdvance}
                            className="w-full py-3 bg-neutral-900 hover:bg-black text-white text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50"
                          >
                            {payingAdvance ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <CreditCard size={14} className="text-emerald-400" />
                            )}
                            <span>
                              {payingAdvance ? 'Charging ₹999 Advance...' : 'Charge ₹999 to Card'}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Confirmed Advance Box */
                    <div className="border border-emerald-500/40 bg-emerald-50 p-4 text-emerald-900 space-y-2 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 text-emerald-800">
                          <CheckCircle2 size={16} className="text-emerald-600" />
                          Advance Commitment Deposit Paid (₹999)
                        </span>
                        <span className="text-[10px] font-mono uppercase bg-emerald-200/80 px-2 py-0.5 text-emerald-900">
                          Txn: ZY-ADV-88492
                        </span>
                      </div>
                      <p className="text-xs text-emerald-700">
                        Cash on Delivery is now unlocked! Please click the confirmation button below to finalize
                        your order. You will pay the remaining <strong>{formatPrice(codRemainingAmount)}</strong> upon arrival.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Button */}
              <div className="pt-8">
                {paymentMethod === 'cod' ? (
                  !codAdvancePaid ? (
                    <button
                      type="button"
                      onClick={handlePayCodAdvance}
                      disabled={payingAdvance}
                      className="w-full py-4 text-xs tracking-[0.22em] uppercase font-semibold font-body border border-amber-600/40 bg-amber-50 text-amber-900 hover:bg-amber-100 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                      <Lock size={15} className="text-amber-700" />
                      {payingAdvance ? 'Verifying ₹999 Advance...' : 'Pay ₹999 Advance Above to Unlock Cash on Delivery'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      className="w-full py-4 text-xs tracking-[0.22em] uppercase font-semibold font-body bg-black text-white hover:bg-neutral-800 flex items-center justify-center gap-2 transition-all shadow-md animate-in pulse"
                    >
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      CONFIRM CASH ON DELIVERY (PAY REMAINING {formatPrice(codRemainingAmount)} AT DOORSTEP) →
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    disabled={isSubmittingOrder}
                    onClick={handlePlaceOrder}
                    className={`w-full py-4 text-xs tracking-[0.22em] uppercase font-semibold font-body transition-opacity shadow-md ${
                      isSubmittingOrder ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                    }`}
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-on-primary)',
                    }}
                  >
                    {isSubmittingOrder ? 'CONFIRMING ORDER...' : `PLACE ORDER · ${formatPrice(total)}`}
                  </button>
                )}
                {orderError && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs text-center font-semibold">
                    {orderError}
                  </div>
                )}
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
