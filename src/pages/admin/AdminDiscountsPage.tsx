import { useState, useEffect } from 'react'
import { Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react'
import { api } from '@/services/api'
import { formatPrice } from '@/data/products'

export default function AdminDiscountsPage() {
  const [coupons, setCoupons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  // Form
  const [code, setCode] = useState('')
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage')
  const [value, setValue] = useState<number | ''>(10)
  const [minOrderValue, setMinOrderValue] = useState<number | ''>(25000)
  const [maxUses, setMaxUses] = useState<number | ''>(100)
  const [expiresAt, setExpiresAt] = useState('2026-12-31')
  const [description, setDescription] = useState('')

  const fetchCoupons = () => {
    setLoading(true)
    api
      .get('/coupons')
      .then((res) => {
        setCoupons(res.data.coupons || [])
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  const handleToggle = async (id: string) => {
    try {
      const res = await api.patch(`/coupons/${id}/toggle`)
      if (res.data.success) {
        setCoupons((prev) =>
          prev.map((c) => (c.id === id ? { ...c, isActive: res.data.coupon.isActive } : c))
        )
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: string, codeStr: string) => {
    if (!window.confirm(`Delete coupon code ${codeStr}?`)) return
    try {
      await api.delete(`/coupons/${id}`)
      setCoupons((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim() || !value) return

    try {
      await api.post('/coupons', {
        code: code.trim().toUpperCase(),
        type,
        value: Number(value),
        minOrderValue: Number(minOrderValue) || 0,
        maxUses: Number(maxUses) || 100,
        expiresAt,
        description: description.trim(),
      })
      setModalOpen(false)
      setCode('')
      setDescription('')
      fetchCoupons()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e5e5]">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#777] block mb-1">
            CAMPAIGNS & PROMOTIONS
          </span>
          <h1 className="font-display text-3xl font-semibold text-[#111]">
            Discounts & Privilege Codes
          </h1>
          <p className="text-xs text-[#666] mt-1">
            Generate promotional codes, fixed discounts, and seasonal cart reductions.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="h-10 px-5 bg-black text-white text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#222] transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} /> Create Privilege Code
        </button>
      </div>

      {/* ── COUPONS LIST TABLE ── */}
      <div className="bg-white border border-[#e5e5e5] rounded-xs shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs uppercase text-[#888]">Loading coupons...</div>
        ) : coupons.length === 0 ? (
          <div className="py-20 text-center text-xs text-[#777]">No discount codes created yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#fcfcfc] border-b border-[#e5e5e5] text-[#777] uppercase tracking-wider text-[0.6875rem]">
                  <th className="py-3 px-4 font-semibold">Coupon Code</th>
                  <th className="py-3 px-4 font-semibold">Discount Value</th>
                  <th className="py-3 px-4 font-semibold">Min Order</th>
                  <th className="py-3 px-4 font-semibold">Usage Count</th>
                  <th className="py-3 px-4 font-semibold">Expires</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f2f2]">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-[#fafafa] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-black text-sm">
                      {c.code}
                      {c.description && (
                        <p className="font-body text-[0.6875rem] font-normal text-[#777] mt-0.5">
                          {c.description}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#111]">
                      {c.type === 'percentage' ? `${c.value}% OFF` : `₹${c.value} FLAT`}
                    </td>
                    <td className="py-3.5 px-4 text-[#555]">{formatPrice(c.minOrderValue)}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-black">{c.usedCount}</span>
                      <span className="text-[#888]"> / {c.maxUses} max</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#666]">{c.expiresAt}</td>
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggle(c.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.625rem] uppercase font-bold tracking-wider rounded-xs ${
                          c.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-zinc-200 text-zinc-800'
                        }`}
                      >
                        {c.isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {c.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(c.id, c.code)}
                        className="p-1.5 border border-[#ccc] hover:border-red-600 hover:text-red-600 rounded-xs transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── CREATE COUPON MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white border border-black p-8 max-w-md w-full space-y-5 text-xs font-body">
            <div className="flex items-center justify-between pb-3 border-b border-[#eee]">
              <h2 className="font-display text-xl font-semibold">Create Privilege Code</h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-xs font-bold text-[#888] hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ZAMYAA10 or FESTIVE20"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-[#ccc] font-mono font-bold uppercase outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">
                    Discount Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#ccc] outline-none font-semibold"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">
                    Value *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="10"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value) || '')}
                    className="w-full px-3 py-2 border border-[#ccc] outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">
                    Min Order Value (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="25000"
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(Number(e.target.value) || '')}
                    className="w-full px-3 py-2 border border-[#ccc] outline-none"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">
                    Max Redemptions
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="100"
                    value={maxUses}
                    onChange={(e) => setMaxUses(Number(e.target.value) || '')}
                    className="w-full px-3 py-2 border border-[#ccc] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ccc] outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1">
                  Internal Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10% privilege discount for first-time clients"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ccc] outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#eee]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 uppercase font-semibold text-[#888] hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white uppercase font-bold tracking-widest hover:bg-[#222]"
                >
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
