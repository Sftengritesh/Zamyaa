import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Package,
  User as UserIcon,
  Headphones,
  LogOut,
  ChevronRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  Truck,
} from 'lucide-react'
import { useCustomerAuth } from '@/store/customerAuth'
import { api } from '@/services/api'

export default function CustomerAccountPage() {
  const navigate = useNavigate()
  const { user, logout, updateUser } = useCustomerAuth()

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'concierge'>('orders')
  const [orders, setOrders] = useState<any[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  // Profile edit state
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [updatingProfile, setUpdatingProfile] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchMyOrders = async () => {
      try {
        setLoadingOrders(true)
        const res = await api.get('/orders/my-orders')
        if (isMounted && res.data?.success) {
          setOrders(res.data.orders || [])
        }
      } catch (err) {
        console.warn('Could not load orders:', err)
      } finally {
        if (isMounted) setLoadingOrders(false)
      }
    }

    fetchMyOrders()

    return () => {
      isMounted = false
    }
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/', { replace: true })
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileError(null)
    setProfileSuccess(false)

    try {
      setUpdatingProfile(true)
      const res = await api.put('/auth/profile', {
        name: name.trim(),
        phone: phone.trim(),
      })

      if (res.data?.success && res.data?.user) {
        updateUser(res.data.user)
        setProfileSuccess(true)
        setTimeout(() => setProfileSuccess(false), 4000)
      } else {
        setProfileError(res.data?.message || 'Failed to update profile.')
      }
    } catch (err: any) {
      setProfileError(err.response?.data?.message || 'Failed to update profile.')
    } finally {
      setUpdatingProfile(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
            <CheckCircle2 size={11} /> Delivered
          </span>
        )
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
            <Truck size={11} /> Dispatched
          </span>
        )
      case 'processing':
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
            <Clock size={11} /> Atelier Crafting
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider bg-neutral-100 text-neutral-700 border border-neutral-300 font-semibold">
            Pending Confirmation
          </span>
        )
    }
  }

  return (
    <div
      className="min-h-screen py-12 md:py-20 px-6 md:px-16 font-body"
      style={{ backgroundColor: 'var(--color-surface, #FAF9F5)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Atelier Client Profile Banner */}
        <div className="bg-white border border-[#E5E5E5] p-8 md:p-12 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
                ATELIER CLIENT DOSSIER
              </span>
              <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest bg-black text-white font-semibold">
                Privilege Member
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-neutral-900 font-normal">
              {user?.name || 'Valued Patron'}
            </h1>
            <p className="text-xs text-neutral-500 font-mono mt-1">{user?.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 border border-neutral-300 hover:border-black text-xs uppercase tracking-widest font-semibold font-body transition-colors flex items-center gap-2 cursor-pointer bg-white"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Left Sidebar Tabs + Right Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-5 py-3.5 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-between border ${
                activeTab === 'orders'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package size={15} />
                <span>Order History</span>
              </span>
              <span className="text-[10px] font-mono opacity-70">({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-5 py-3.5 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-between border ${
                activeTab === 'profile'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <UserIcon size={15} />
                <span>Personal Details</span>
              </span>
              <ChevronRight size={14} className="opacity-40" />
            </button>

            <button
              onClick={() => setActiveTab('concierge')}
              className={`w-full text-left px-5 py-3.5 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-between border ${
                activeTab === 'concierge'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Headphones size={15} />
                <span>Concierge & Bespoke</span>
              </span>
              <Sparkles size={14} className="text-amber-500" />
            </button>
          </div>

          {/* Right Main Panel */}
          <div className="lg:col-span-9 bg-white border border-[#E5E5E5] p-6 md:p-10 shadow-xs">
            {/* TAB 1: ORDER HISTORY */}
            {activeTab === 'orders' && (
              <div>
                <div className="border-b border-neutral-200 pb-5 mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-normal text-neutral-900">
                      Your Archival Orders
                    </h2>
                    <p className="text-xs text-neutral-500 font-body mt-1">
                      Track atelier garment tailoring, dispatch updates, and delivery notes.
                    </p>
                  </div>
                  <Link
                    to="/collections"
                    className="text-xs font-semibold uppercase tracking-wider text-black border-b border-black pb-0.5 hover:opacity-70 transition-opacity hidden sm:inline"
                  >
                    Discover New Pieces →
                  </Link>
                </div>

                {loadingOrders ? (
                  <div className="py-20 text-center">
                    <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                      Retrieving Client Dossier...
                    </p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-16 px-6 text-center border border-dashed border-neutral-300 max-w-xl mx-auto my-6 space-y-4">
                    <Package size={36} className="mx-auto text-neutral-300" />
                    <h3 className="font-display text-xl text-neutral-900 font-normal">
                      No Orders Recorded Yet
                    </h3>
                    <p className="font-body text-xs text-neutral-500 leading-relaxed max-w-md mx-auto">
                      Explore our handcrafted collections celebrating Indian architectural silhouettes and artisanal craftsmanship.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <Link
                        to="/collections/lantana"
                        className="px-5 py-2.5 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
                      >
                        Shop Lantana (Farshi Suits)
                      </Link>
                      <Link
                        to="/collections/the-boho-flare-affair"
                        className="px-5 py-2.5 border border-black text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors"
                      >
                        Shop The Boho Flare Affair (Skirt Tops)
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order.id || order.orderNumber}
                        className="border border-neutral-200 p-6 hover:border-black transition-colors bg-[#FCFCFB]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4 mb-4">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                              Order Identifier
                            </span>
                            <span className="font-mono text-sm font-bold text-neutral-900">
                              {order.orderNumber}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                              Date Placed
                            </span>
                            <span className="font-body text-xs text-neutral-700">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-0.5">
                              Status
                            </span>
                            {getStatusBadge(order.fulfillmentStatus)}
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                              Total Amount
                            </span>
                            <span className="font-body text-sm font-semibold text-neutral-900">
                              ₹{(order.total || 0).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Order Items Preview */}
                        <div className="space-y-3">
                          {order.items?.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between gap-4 py-2">
                              <div className="flex items-center gap-3">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-14 object-cover object-top border border-neutral-200 shrink-0"
                                  />
                                ) : (
                                  <div className="w-12 h-14 bg-neutral-100 flex items-center justify-center text-neutral-400 shrink-0">
                                    <Package size={16} />
                                  </div>
                                )}
                                <div>
                                  <h4 className="font-display text-sm text-neutral-900 font-normal">
                                    {item.name}
                                  </h4>
                                  <p className="text-[11px] font-mono text-neutral-500">
                                    Size: {item.size} {item.color ? `· Color: ${item.color}` : ''} · Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <span className="text-xs font-semibold text-neutral-800 font-body">
                                ₹{((item.unitPrice || item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {order.trackingNumber && (
                          <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-600 bg-white p-3 border">
                            <span>Courier: {order.courier || 'Express Air Courier'}</span>
                            <span className="font-bold text-black">AWB: {order.trackingNumber}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PERSONAL DETAILS */}
            {activeTab === 'profile' && (
              <div>
                <div className="border-b border-neutral-200 pb-5 mb-8">
                  <h2 className="font-display text-2xl font-normal text-neutral-900">
                    Personal Profile & Tailoring Contact
                  </h2>
                  <p className="text-xs text-neutral-500 font-body mt-1">
                    Manage your contact information used for courier tracking and bespoke atelier communications.
                  </p>
                </div>

                {profileSuccess && (
                  <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-body flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    <span>Your profile information has been saved successfully.</span>
                  </div>
                )}

                {profileError && (
                  <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs font-body">
                    {profileError}
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-5 max-w-lg">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 text-xs border border-neutral-300 focus:border-black outline-none transition-colors font-body bg-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-1.5">
                      Email Address <span className="opacity-60">(Protected / Atelier Identifier)</span>
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ''}
                      className="w-full px-4 py-3 text-xs border border-neutral-200 bg-neutral-100 text-neutral-500 font-body cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-600 mb-1.5">
                      Phone Number (Bespoke Courier Coordination)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 text-xs border border-neutral-300 focus:border-black outline-none transition-colors font-body bg-transparent"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={updatingProfile}
                      className="px-8 h-12 bg-black hover:bg-neutral-800 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer disabled:opacity-50"
                    >
                      {updatingProfile ? 'Saving Changes...' : 'Save Profile Details'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: CONCIERGE & BESPOKE */}
            {activeTab === 'concierge' && (
              <div>
                <div className="border-b border-neutral-200 pb-5 mb-8">
                  <h2 className="font-display text-2xl font-normal text-neutral-900">
                    Bespoke Atelier Concierge
                  </h2>
                  <p className="text-xs text-neutral-500 font-body mt-1">
                    Direct access to Jyoti Sharma and our master artisan tailoring team.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-neutral-200 bg-[#FCFCFB] space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-semibold block">
                      Direct Atelier Line
                    </span>
                    <h3 className="font-display text-xl text-neutral-900 font-normal">
                      WhatsApp Stylist & Tailoring
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-body">
                      Request custom sleeve lengths, neckline adjustments, or bridal capsule previews directly with our design atelier.
                    </p>
                    <a
                      href="https://wa.me/918427233901"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border-b border-black pb-1 hover:opacity-70 transition-opacity text-black pt-2"
                    >
                      <span>Connect on WhatsApp (+91 8427233901)</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  <div className="p-6 border border-neutral-200 bg-[#FCFCFB] space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">
                      Archival Inquiries
                    </span>
                    <h3 className="font-display text-xl text-neutral-900 font-normal">
                      Email Concierge
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-body">
                      For corporate inquiries, private preview showings, or archival capsule reservations.
                    </p>
                    <a
                      href="mailto:jyotisharam120099@gmail.com"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border-b border-black pb-1 hover:opacity-70 transition-opacity text-black pt-2"
                    >
                      <span>Email jyotisharam120099@gmail.com</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

