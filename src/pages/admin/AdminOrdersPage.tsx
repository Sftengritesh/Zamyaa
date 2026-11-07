import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Truck,
  Search,
} from 'lucide-react'
import { api } from '@/services/api'
import { formatPrice } from '@/data/products'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Tracking update state inside modal
  const [newStatus, setNewStatus] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [courier, setCourier] = useState('')
  const [orderNotes, setOrderNotes] = useState('')
  const [updating, setUpdating] = useState(false)

  const [searchParams] = useSearchParams()

  const fetchOrders = () => {
    setLoading(true)
    api
      .get('/orders')
      .then((res) => {
        setOrders(res.data.orders || [])
        // If query param 'order' is set, auto-open that order
        const targetId = searchParams.get('order')
        if (targetId && res.data.orders) {
          const found = res.data.orders.find((o: any) => o.id === targetId)
          if (found) openDetail(found)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchOrders()
  }, [searchParams])

  const openDetail = (order: any) => {
    setSelectedOrder(order)
    setNewStatus(order.fulfillmentStatus || 'pending')
    setTrackingNumber(order.trackingNumber || '')
    setCourier(order.courier || 'Blue Dart Express')
    setOrderNotes(order.notes || '')
    setModalOpen(true)
  }

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOrder) return

    setUpdating(true)
    try {
      const res = await api.patch(`/orders/${selectedOrder.id}/status`, {
        fulfillmentStatus: newStatus,
        trackingNumber: trackingNumber.trim(),
        courier: courier.trim(),
        notes: orderNotes.trim(),
      })

      if (res.data.success) {
        setSelectedOrder(res.data.order)
        setOrders((prev) =>
          prev.map((o) => (o.id === selectedOrder.id ? res.data.order : o))
        )
      }
    } catch (err) {
      console.error('Error updating order', err)
    } finally {
      setUpdating(false)
    }
  }

  const tabs = [
    { label: 'All Orders', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Processing', value: 'processing' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
  ]

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.fulfillmentStatus !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.email.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q))
      )
    }
    return true
  })

  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e5e5]">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#777] block mb-1">
            CLIENT DISPATCH & FULFILLMENT
          </span>
          <h1 className="font-display text-3xl font-semibold text-[#111]">
            Order Management
          </h1>
          <p className="text-xs text-[#666] mt-1">
            Review customer orders, package luxury garments, and update logistics tracking numbers.
          </p>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#e5e5e5]">
        {tabs.map((tab) => {
          const count =
            tab.value === 'all'
              ? orders.length
              : orders.filter((o) => o.fulfillmentStatus === tab.value).length
          return (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                statusFilter === tab.value
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-[#777] hover:text-black'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[0.625rem] bg-[#f0f0f0] px-1.5 py-0.5 rounded-full text-[#555]">
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── SEARCH BAR ── */}
      <div className="bg-white p-4 border border-[#e5e5e5] rounded-xs shadow-xs">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3.5 top-3 text-[#888]" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, email, or tracking #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#ddd] text-xs font-body outline-none focus:border-black rounded-xs"
          />
        </div>
      </div>

      {/* ── ORDERS TABLE ── */}
      <div className="bg-white border border-[#e5e5e5] rounded-xs shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs uppercase text-[#888]">Loading orders...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-xs text-[#777]">No orders in this view.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#fcfcfc] border-b border-[#e5e5e5] text-[#777] uppercase tracking-wider text-[0.6875rem]">
                  <th className="py-3 px-4 font-semibold">Order ID</th>
                  <th className="py-3 px-4 font-semibold">Date & Time</th>
                  <th className="py-3 px-4 font-semibold">Customer</th>
                  <th className="py-3 px-4 font-semibold">Outfits</th>
                  <th className="py-3 px-4 font-semibold">Total Amount</th>
                  <th className="py-3 px-4 font-semibold">Payment</th>
                  <th className="py-3 px-4 font-semibold">Fulfillment</th>
                  <th className="py-3 px-4 font-semibold text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f2f2]">
                {filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-[#fafafa] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-black">{o.orderNumber}</td>
                    <td className="py-3.5 px-4 text-[#666]">
                      {new Date(o.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#111]">{o.customer.name}</p>
                      <p className="text-[0.6875rem] text-[#888]">{o.customer.phone}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-[#333]">
                        {o.items.length} piece{o.items.length !== 1 ? 's' : ''}
                      </span>
                      <p className="text-[0.6875rem] text-[#777] truncate max-w-xs">
                        {o.items.map((i: any) => `${i.name} (${i.size})`).join(', ')}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-black">{formatPrice(o.total)}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-[0.625rem] uppercase font-bold tracking-wider rounded-xs ${
                          o.paymentStatus === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[0.625rem] uppercase font-bold tracking-wider rounded-xs ${
                          o.fulfillmentStatus === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : o.fulfillmentStatus === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : o.fulfillmentStatus === 'processing'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {o.fulfillmentStatus}
                      </span>
                      {o.trackingNumber && (
                        <p className="font-mono text-[0.625rem] text-[#777] mt-0.5 truncate max-w-[120px]">
                          {o.trackingNumber}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => openDetail(o)}
                        className="px-3 py-1.5 border border-[#ccc] hover:border-black text-[0.6875rem] uppercase font-bold tracking-wider transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── ORDER DETAIL MODAL ── */}
      {modalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white border border-black p-8 max-w-3xl w-full max-h-[92vh] overflow-y-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#eee]">
              <div>
                <span className="text-[0.65rem] uppercase tracking-widest font-bold text-[#888]">
                  ORDER DETAILS
                </span>
                <h2 className="font-display text-2xl font-bold text-[#111]">
                  {selectedOrder.orderNumber}
                </h2>
                <p className="text-xs text-[#666]">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-xs uppercase font-bold text-[#888] hover:text-black p-1"
              >
                ✕ Close
              </button>
            </div>

            {/* Client & Address Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-[#f9f9f9] border border-[#eee] text-xs">
              <div>
                <p className="uppercase tracking-wider font-bold text-[#444] mb-1">
                  Customer Dossier
                </p>
                <p className="font-semibold text-sm text-[#111]">{selectedOrder.customer.name}</p>
                <p className="text-[#666]">{selectedOrder.customer.email}</p>
                <p className="text-[#666]">{selectedOrder.customer.phone}</p>
              </div>

              <div>
                <p className="uppercase tracking-wider font-bold text-[#444] mb-1">
                  Delivery Destination
                </p>
                <p className="text-[#333] leading-relaxed">
                  {selectedOrder.shippingAddress.address}
                  <br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} —{' '}
                  {selectedOrder.shippingAddress.pincode}
                  <br />
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-[#444] mb-3">
                Ordered Garments ({selectedOrder.items.length})
              </p>
              <div className="border divide-y divide-[#eee]">
                {selectedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="p-3.5 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-16 object-cover bg-[#f4f4f4] border border-[#eee]"
                      />
                      <div>
                        <p className="font-bold text-[#111]">{item.name}</p>
                        <p className="text-[0.6875rem] text-[#777] mt-0.5">
                          Size: <span className="font-semibold text-black">{item.size}</span> · Colour:{' '}
                          <span className="font-semibold text-black">{item.color}</span> · Qty:{' '}
                          <span className="font-semibold text-black">{item.quantity}</span>
                        </p>
                        <p className="font-mono text-[0.65rem] text-[#999]">{item.sku}</p>
                      </div>
                    </div>
                    <p className="font-bold text-sm text-black">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="p-4 bg-[#fcfcfc] border border-[#eee] text-xs space-y-2">
              <div className="flex justify-between text-[#666]">
                <span>Subtotal</span>
                <span>{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Privilege Discount</span>
                  <span>-{formatPrice(selectedOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#666]">
                <span>Shipping Fee</span>
                <span>
                  {selectedOrder.shippingFee === 0 ? 'Complimentary' : formatPrice(selectedOrder.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-[#666]">
                <span>Included GST (12%)</span>
                <span>{formatPrice(selectedOrder.tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#eee] text-black">
                <span>Grand Total</span>
                <span>{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Fulfillment Status Form for Designer */}
            <form onSubmit={handleUpdateStatus} className="p-5 border-2 border-black space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-black flex items-center gap-2">
                  <Truck size={16} /> Update Fulfillment & Logistics
                </h3>
                <span className="text-[0.6875rem] text-[#666]">Changes reflect instantly</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-body">
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">
                    Fulfillment Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ccc] outline-none font-semibold uppercase"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing (Tailoring)</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">
                    Courier Partner
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Blue Dart, Delhivery"
                    value={courier}
                    onChange={(e) => setCourier(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ccc] outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">
                    Tracking Number (AWB)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BLUEDART-88291039"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ccc] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold mb-1">
                  Atelier Notes / Bespoke Requests
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Client requested customized sleeves. Stitched and steam ironed."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#ccc] outline-none resize-none font-body"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={updating}
                  className="px-6 py-2.5 bg-black text-white text-xs uppercase font-bold tracking-widest hover:bg-[#222] transition-colors"
                >
                  {updating ? 'SAVING...' : 'SAVE & UPDATE ORDER'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
