import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  XCircle,
  Plus,
  Minus,
  Search,
  RefreshCw,
} from 'lucide-react'
import { api } from '@/services/api'

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<any[]>([])
  const [stats, setStats] = useState<any>({
    totalStockUnits: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchInventory = () => {
    setLoading(true)
    api
      .get('/inventory')
      .then((res) => {
        setInventory(res.data.inventory || [])
        setStats(res.data.stats || {})
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  const handleUpdateStock = async (productId: string, sku: string, newStock: number) => {
    try {
      await api.patch('/inventory/stock', {
        productId,
        sku,
        stock: Math.max(0, newStock),
      })
      setInventory((prev) =>
        prev.map((item) =>
          item.sku === sku
            ? {
                ...item,
                stock: Math.max(0, newStock),
                status:
                  newStock <= 0
                    ? 'out-of-stock'
                    : newStock <= item.lowStockThreshold
                    ? 'low-stock'
                    : 'in-stock',
              }
            : item
        )
      )
    } catch (err) {
      console.error('Error updating stock', err)
    }
  }

  const handleMarkSoldOut = async (productId: string, sku: string) => {
    try {
      await api.patch('/inventory/sold-out', { productId, sku })
      setInventory((prev) =>
        prev.map((item) =>
          item.sku === sku ? { ...item, stock: 0, status: 'out-of-stock' } : item
        )
      )
    } catch (err) {
      console.error('Error marking sold out', err)
    }
  }

  const filtered = inventory.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        item.productName.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.size.toLowerCase().includes(q) ||
        item.color.toLowerCase().includes(q)
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
            STOCK CONTROLS & VARIANTS
          </span>
          <h1 className="font-display text-3xl font-semibold text-[#111]">
            Inventory Management
          </h1>
          <p className="text-xs text-[#666] mt-1">
            Real-time stock quantities tracked independently for every size and colour combination.
          </p>
        </div>

        <button
          onClick={fetchInventory}
          className="h-10 px-4 border border-[#ddd] hover:border-black text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <RefreshCw size={14} /> Refresh Stock
        </button>
      </div>

      {/* ── KPI STATS CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div
          onClick={() => setStatusFilter('all')}
          className={`p-5 bg-white border rounded-xs shadow-xs cursor-pointer transition-colors ${
            statusFilter === 'all' ? 'border-black ring-1 ring-black' : 'border-[#e5e5e5]'
          }`}
        >
          <span className="text-xs uppercase tracking-wider text-[#777] font-semibold">
            Total Stock On Hand
          </span>
          <p className="font-display text-2xl font-bold text-[#111] mt-1">
            {stats.totalStockUnits} Units
          </p>
          <p className="text-[0.6875rem] text-[#888] mt-1">Across all archival collections</p>
        </div>

        <div
          onClick={() => setStatusFilter('low-stock')}
          className={`p-5 bg-white border rounded-xs shadow-xs cursor-pointer transition-colors ${
            statusFilter === 'low-stock' ? 'border-amber-600 ring-1 ring-amber-600' : 'border-[#e5e5e5]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
              Low Stock Alerts
            </span>
            <AlertTriangle size={15} className="text-amber-600" />
          </div>
          <p className="font-display text-2xl font-bold text-amber-700 mt-1">
            {stats.lowStockCount} Variants
          </p>
          <p className="text-[0.6875rem] text-[#888] mt-1">≤ 2 units remaining on loom</p>
        </div>

        <div
          onClick={() => setStatusFilter('out-of-stock')}
          className={`p-5 bg-white border rounded-xs shadow-xs cursor-pointer transition-colors ${
            statusFilter === 'out-of-stock' ? 'border-red-600 ring-1 ring-red-600' : 'border-[#e5e5e5]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-red-800 font-semibold">
              Sold Out Sizes
            </span>
            <XCircle size={15} className="text-red-600" />
          </div>
          <p className="font-display text-2xl font-bold text-red-700 mt-1">
            {stats.outOfStockCount} Variants
          </p>
          <p className="text-[0.6875rem] text-[#888] mt-1">Customers see Sold Out banner</p>
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ── */}
      <div className="bg-white p-5 border border-[#e5e5e5] rounded-xs shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-3 text-[#888]" />
          <input
            type="text"
            placeholder="Search by outfit name, size (e.g. M, XS), or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#ddd] text-xs font-body outline-none focus:border-black rounded-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'in-stock', 'low-stock', 'out-of-stock'].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 text-[0.6875rem] uppercase font-bold tracking-wider rounded-xs transition-colors ${
                statusFilter === f ? 'bg-black text-white' : 'bg-[#f4f4f4] text-[#666] hover:text-black'
              }`}
            >
              {f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* ── INVENTORY TABLE ── */}
      <div className="bg-white border border-[#e5e5e5] rounded-xs shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs uppercase text-[#888]">
            Auditing inventory matrix...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-xs text-[#777]">No inventory records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#fcfcfc] border-b border-[#e5e5e5] text-[#777] uppercase tracking-wider text-[0.6875rem]">
                  <th className="py-3 px-4 font-semibold">Piece</th>
                  <th className="py-3 px-4 font-semibold">Outfit Name</th>
                  <th className="py-3 px-4 font-semibold">SKU Variant</th>
                  <th className="py-3 px-4 font-semibold">Colour</th>
                  <th className="py-3 px-4 font-semibold">Size</th>
                  <th className="py-3 px-4 font-semibold">Current Stock</th>
                  <th className="py-3 px-4 font-semibold">Stock Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Quick Stock Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f2f2]">
                {filtered.map((item) => (
                  <tr key={item.sku} className="hover:bg-[#fafafa] transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-10 h-14 object-cover bg-[#f4f4f4] border border-[#eee]"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/admin/products/edit/${item.productId}`}
                        className="font-semibold text-[#111] hover:underline block truncate max-w-xs"
                      >
                        {item.productName}
                      </Link>
                      <span className="text-[0.6875rem] text-[#888]">{item.collection}</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#555]">{item.sku}</td>
                    <td className="py-3 px-4 font-medium">{item.color}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-xs bg-[#f2f2f2] px-2 py-0.5 rounded-xs">
                        {item.size}
                      </span>
                    </td>

                    {/* Stock Count Controls */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateStock(item.productId, item.sku, item.stock - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center border border-[#ccc] hover:border-black rounded-xs bg-white text-[#333]"
                        >
                          <Minus size={12} />
                        </button>

                        <input
                          type="number"
                          min="0"
                          value={item.stock}
                          onChange={(e) =>
                            handleUpdateStock(
                              item.productId,
                              item.sku,
                              Number(e.target.value) || 0
                            )
                          }
                          className="w-14 text-center py-1 border border-[#ccc] font-bold text-xs outline-none focus:border-black"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateStock(item.productId, item.sku, item.stock + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center border border-[#ccc] hover:border-black rounded-xs bg-white text-[#333]"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </td>

                    {/* Status badge */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[0.625rem] uppercase font-bold tracking-wider rounded-xs ${
                          item.status === 'out-of-stock'
                            ? 'bg-red-100 text-red-800'
                            : item.status === 'low-stock'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {item.status.replace('-', ' ')}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      {item.stock > 0 ? (
                        <button
                          type="button"
                          onClick={() => handleMarkSoldOut(item.productId, item.sku)}
                          className="px-2.5 py-1 border border-red-300 text-red-700 hover:bg-red-50 text-[0.625rem] uppercase font-bold tracking-wider transition-colors"
                        >
                          Mark Sold Out
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleUpdateStock(item.productId, item.sku, 5)}
                          className="px-2.5 py-1 border border-green-600 text-green-700 hover:bg-green-50 text-[0.625rem] uppercase font-bold tracking-wider transition-colors"
                        >
                          Restock +5
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
