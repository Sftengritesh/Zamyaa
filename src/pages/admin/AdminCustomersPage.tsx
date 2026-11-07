import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { api } from '@/services/api'
import { formatPrice } from '@/data/products'

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCust, setSelectedCust] = useState<any>(null)
  const [custOrders, setCustOrders] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    api
      .get('/customers')
      .then((res) => {
        setCustomers(res.data.customers || [])
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const openCustomer = (c: any) => {
    setSelectedCust(c)
    api
      .get(`/customers/${c.id}`)
      .then((res) => {
        setCustOrders(res.data.orders || [])
      })
      .catch(() => setCustOrders([]))
    setModalOpen(true)
  }

  const filtered = customers.filter((c) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.city.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e5e5]">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#777] block mb-1">
            CLIENTELE DIRECTORY
          </span>
          <h1 className="font-display text-3xl font-semibold text-[#111]">
            Customer Management
          </h1>
          <p className="text-xs text-[#666] mt-1">
            Client purchase history, lifetime value, contact dossiers, and bespoke preferences.
          </p>
        </div>

        <span className="text-xs font-semibold text-[#888] uppercase bg-white border border-[#ddd] px-4 py-2 self-start sm:self-auto">
          {customers.length} Registered Patrons
        </span>
      </div>

      {/* ── SEARCH ── */}
      <div className="bg-white p-4 border border-[#e5e5e5] rounded-xs shadow-xs">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3.5 top-3 text-[#888]" />
          <input
            type="text"
            placeholder="Search by client name, email, phone, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#ddd] text-xs font-body outline-none focus:border-black rounded-xs"
          />
        </div>
      </div>

      {/* ── CUSTOMERS TABLE ── */}
      <div className="bg-white border border-[#e5e5e5] rounded-xs shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs uppercase text-[#888]">Loading clientele...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-xs text-[#777]">No customers found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#fcfcfc] border-b border-[#e5e5e5] text-[#777] uppercase tracking-wider text-[0.6875rem]">
                  <th className="py-3 px-4 font-semibold">Client Name</th>
                  <th className="py-3 px-4 font-semibold">Contact Email</th>
                  <th className="py-3 px-4 font-semibold">Phone</th>
                  <th className="py-3 px-4 font-semibold">Location</th>
                  <th className="py-3 px-4 font-semibold">Total Orders</th>
                  <th className="py-3 px-4 font-semibold">Lifetime Spend</th>
                  <th className="py-3 px-4 font-semibold text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f2f2]">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-[#fafafa] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#111]">{c.name}</td>
                    <td className="py-3.5 px-4 text-[#555]">{c.email}</td>
                    <td className="py-3.5 px-4 font-mono text-[#555]">{c.phone}</td>
                    <td className="py-3.5 px-4 text-[#555]">
                      {c.city}, {c.state}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-xs bg-[#f4f4f4] px-2 py-0.5 rounded-xs">
                        {c.totalOrders} order{c.totalOrders !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-black">{formatPrice(c.totalSpent)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => openCustomer(c)}
                        className="px-3 py-1.5 border border-[#ccc] hover:border-black text-[0.6875rem] uppercase font-bold tracking-wider transition-colors"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── CUSTOMER PROFILE MODAL ── */}
      {modalOpen && selectedCust && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white border border-black p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#eee]">
              <div>
                <span className="text-[0.65rem] uppercase tracking-widest font-bold text-[#888]">
                  PATRON DOSSIER
                </span>
                <h2 className="font-display text-2xl font-bold text-[#111]">{selectedCust.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-xs uppercase font-bold text-[#888] hover:text-black"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-[#f9f9f9] border border-[#eee] text-xs">
              <div>
                <p className="text-[#888] uppercase tracking-wider font-semibold">Email & Phone</p>
                <p className="font-semibold text-sm mt-1">{selectedCust.email}</p>
                <p className="text-[#666]">{selectedCust.phone}</p>
              </div>
              <div>
                <p className="text-[#888] uppercase tracking-wider font-semibold">Lifetime Spend</p>
                <p className="font-display text-2xl font-bold text-black mt-1">
                  {formatPrice(selectedCust.totalSpent)}
                </p>
                <p className="text-[0.6875rem] text-[#666]">{selectedCust.totalOrders} Completed Orders</p>
              </div>
            </div>

            {/* Saved Addresses */}
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-[#444] mb-2">
                Saved Delivery Addresses
              </p>
              {(selectedCust.addresses || []).map((a: any, i: number) => (
                <div key={i} className="p-3 border text-xs leading-relaxed text-[#555] bg-white">
                  <p className="font-bold text-black uppercase text-[0.65rem]">{a.type}</p>
                  <p>
                    {a.address}, {a.city}, {a.state} - {a.pincode}
                  </p>
                </div>
              ))}
            </div>

            {/* Order History */}
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-[#444] mb-3">
                Order History
              </p>
              {custOrders.length === 0 ? (
                <p className="text-xs text-[#888] italic">No prior orders recorded.</p>
              ) : (
                <div className="border divide-y divide-[#eee] text-xs">
                  {custOrders.map((o) => (
                    <div key={o.id} className="p-3 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-black">{o.orderNumber}</span>
                        <p className="text-[0.6875rem] text-[#888]">
                          {new Date(o.createdAt).toLocaleDateString()} · {o.items.length} piece(s)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(o.total)}</p>
                        <span className="text-[0.625rem] uppercase font-bold text-green-700">
                          {o.fulfillmentStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
