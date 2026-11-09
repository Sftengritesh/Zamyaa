import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { api } from '@/services/api'
import { formatPrice } from '@/data/products'
import { useCatalogStore } from '@/store'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [collectionFilter, setCollectionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchProducts = () => {
    setLoading(true)
    api
      .get('/products')
      .then((res) => {
        setProducts(res.data.products || [])
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleToggle = async (id: string, field: string) => {
    try {
      const res = await api.patch(`/products/${id}/toggle`, { field })
      if (res.data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...res.data.product } : p))
        )
        useCatalogStore.getState().fetchCatalog()
      }
    } catch (err) {
      console.error('Toggle error', err)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from the atelier catalog?`)) {
      return
    }
    try {
      await api.delete(`/products/${id}`)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      useCatalogStore.getState().fetchCatalog()
    } catch (err) {
      console.error('Delete error', err)
    }
  }

  const filtered = products.filter((p) => {
    if (collectionFilter !== 'all' && p.collectionSlug !== collectionFilter) return false
    if (statusFilter !== 'all' && p.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q)
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
            CATALOG MANAGEMENT
          </span>
          <h1 className="font-display text-3xl font-semibold text-[#111]">
            Garments & Outfits
          </h1>
          <p className="text-xs text-[#666] mt-1">
            Manage your outfits, pricing, available sizes, photography, and storefront visibility.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="h-10 px-5 bg-black text-white text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#222] transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} /> Add New Dress
        </Link>
      </div>

      {/* ── FILTER & SEARCH BAR ── */}
      <div className="bg-white p-5 border border-[#e5e5e5] rounded-xs shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-3 text-[#888]" />
          <input
            type="text"
            placeholder="Search by garment title, SKU, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#ddd] text-xs font-body outline-none focus:border-black rounded-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={collectionFilter}
            onChange={(e) => setCollectionFilter(e.target.value)}
            className="px-3 py-2 border border-[#ddd] text-xs uppercase font-semibold font-body outline-none focus:border-black bg-transparent"
          >
            <option value="all">All Collections</option>
            <option value="neel-pushp">Neel Pushp</option>
            <option value="sunehri-dhoop">Sunehri Dhoop</option>
            <option value="desi-dastaan">Desi Dastaan</option>
            <option value="noor-e-rang">Noor-e-Rang</option>
            <option value="the-boho-flare-affair">The Boho Flare Affair</option>
            <option value="lantana">Lantana</option>
            <option value="zarrin">Zarrin</option>
            <option value="gulabi-noor">Gulabi Noor (Old)</option>
            <option value="neel-o-mitti">Neel-o-Mitti (Old)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-[#ddd] text-xs uppercase font-semibold font-body outline-none focus:border-black bg-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active (Published)</option>
            <option value="draft">Draft (Hidden)</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* ── PRODUCTS TABLE ── */}
      <div className="bg-white border border-[#e5e5e5] rounded-xs shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs uppercase text-[#888]">Loading catalog...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="font-display text-xl text-[#777]">No garments match your filters</p>
            <Link
              to="/admin/products/new"
              className="inline-block px-5 py-2 text-xs uppercase font-semibold border border-black hover:bg-black hover:text-white transition-colors"
            >
              Add Your First Dress
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#fcfcfc] border-b border-[#e5e5e5] text-[#777] uppercase tracking-wider text-[0.6875rem]">
                  <th className="py-3 px-4 font-semibold">Garment Preview</th>
                  <th className="py-3 px-4 font-semibold">SKU / Title</th>
                  <th className="py-3 px-4 font-semibold">Collection</th>
                  <th className="py-3 px-4 font-semibold">Price (INR)</th>
                  <th className="py-3 px-4 font-semibold">Sizes</th>
                  <th className="py-3 px-4 font-semibold">Badges</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f2f2]">
                {filtered.map((p) => {
                  const primaryImg = p.images?.[0]?.url || ''
                  return (
                    <tr key={p.id} className="hover:bg-[#fafafa] transition-colors">
                      {/* Image preview */}
                      <td className="py-3 px-4">
                        <div className="w-14 h-18 bg-[#f4f4f4] border border-[#eee] overflow-hidden aspect-[3/4] relative group">
                          {primaryImg ? (
                            <img
                              src={primaryImg}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[0.6rem] text-[#aaa]">
                              No Pic
                            </div>
                          )}
                          <a
                            href={`/product/${p.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                            title="Preview on live site"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </td>

                      {/* Title & SKU */}
                      <td className="py-3 px-4">
                        <Link
                          to={`/admin/products/edit/${p.id}`}
                          className="font-semibold text-[#111] hover:underline block leading-snug"
                        >
                          {p.name}
                        </Link>
                        <span className="font-mono text-[0.6875rem] text-[#888] mt-0.5 block">
                          {p.sku}
                        </span>
                        <span className="text-[0.6875rem] text-[#666]">{p.category}</span>
                      </td>

                      {/* Collection */}
                      <td className="py-3 px-4 font-medium text-[#444]">{p.collection}</td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <p className="font-bold text-[#111]">{formatPrice(p.price)}</p>
                        {p.originalPrice && (
                          <p className="text-[0.6875rem] text-[#888] line-through">
                            {formatPrice(p.originalPrice)}
                          </p>
                        )}
                      </td>

                      {/* Sizes */}
                      <td className="py-3 px-4">
                        <div className="flex gap-1 flex-wrap max-w-[120px]">
                          {(p.sizes || []).map((sz: any) => (
                            <span
                              key={sz.label}
                              className={`px-1.5 py-0.5 text-[0.625rem] font-bold border ${
                                sz.available
                                  ? 'border-[#ccc] text-[#222]'
                                  : 'border-[#eee] text-[#bbb] line-through bg-[#f9f9f9]'
                              }`}
                            >
                              {sz.label}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Badges toggles */}
                      <td className="py-3 px-4 space-y-1">
                        <button
                          type="button"
                          onClick={() => handleToggle(p.id, 'isFeatured')}
                          className={`flex items-center gap-1 text-[0.6875rem] font-semibold px-2 py-0.5 rounded-xs transition-colors ${
                            p.isFeatured
                              ? 'bg-amber-100 text-amber-900 font-bold'
                              : 'text-[#888] hover:text-black'
                          }`}
                        >
                          <Star size={11} fill={p.isFeatured ? 'currentColor' : 'none'} />
                          {p.isFeatured ? 'Featured' : 'Make Featured'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggle(p.id, 'isBestseller')}
                          className={`flex items-center gap-1 text-[0.6875rem] font-semibold px-2 py-0.5 rounded-xs transition-colors ${
                            p.isBestseller
                              ? 'bg-purple-100 text-purple-900 font-bold'
                              : 'text-[#888] hover:text-black'
                          }`}
                        >
                          <Sparkles size={11} />
                          {p.isBestseller ? 'Bestseller' : 'Make Bestseller'}
                        </button>
                      </td>

                      {/* Status toggle */}
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggle(p.id, 'status')}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.625rem] uppercase font-bold tracking-wider rounded-xs transition-colors ${
                            p.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-zinc-200 text-zinc-800'
                          }`}
                        >
                          {p.status === 'active' ? (
                            <>
                              <CheckCircle2 size={12} /> Active
                            </>
                          ) : (
                            <>
                              <XCircle size={12} /> Draft
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/products/edit/${p.id}`}
                            className="p-1.5 border border-[#ccc] hover:border-black text-[#444] hover:text-black rounded-xs transition-colors"
                            title="Edit Outfit"
                          >
                            <Edit2 size={14} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 border border-[#ccc] hover:border-red-600 text-[#444] hover:text-red-600 rounded-xs transition-colors"
                            title="Delete Outfit"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
