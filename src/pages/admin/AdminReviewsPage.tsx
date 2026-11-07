import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { api } from '@/services/api'

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchReviews = () => {
    setLoading(true)
    api
      .get('/reviews')
      .then((res) => {
        setReviews(res.data.reviews || [])
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleUpdateStatus = async (id: string, status: 'approved' | 'hidden') => {
    try {
      await api.patch(`/reviews/${id}/status`, { status })
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = reviews.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e5e5]">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#777] block mb-1">
            CLIENT TESTIMONIALS & MODERATION
          </span>
          <h1 className="font-display text-3xl font-semibold text-[#111]">
            Customer Reviews
          </h1>
          <p className="text-xs text-[#666] mt-1">
            Approve verified client feedback to display on product pages or hide inappropriate
            reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['all', 'approved', 'hidden'].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 text-xs uppercase font-bold tracking-wider rounded-xs transition-colors ${
                statusFilter === f ? 'bg-black text-white' : 'bg-white border text-[#666]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── REVIEWS LIST ── */}
      <div className="bg-white border border-[#e5e5e5] rounded-xs shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs uppercase text-[#888]">Loading reviews...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-xs text-[#777]">No reviews in this category.</div>
        ) : (
          <div className="divide-y divide-[#eee]">
            {filtered.map((r) => (
              <div key={r.id} className="p-6 flex flex-col md:flex-row justify-between gap-6 text-xs">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    {/* Stars */}
                    <div className="flex text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < r.rating ? 'currentColor' : 'none'}
                          className={i < r.rating ? 'text-amber-500' : 'text-zinc-300'}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-[#111]">{r.title}</span>
                    <span
                      className={`px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider rounded-xs ${
                        r.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-zinc-200 text-zinc-800'
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>

                  <p className="text-sm text-[#333] leading-relaxed italic">"{r.comment}"</p>

                  <div className="text-[0.6875rem] text-[#777] flex items-center gap-3 pt-1">
                    <span>
                      Review by <strong className="text-black">{r.customerName}</strong> (
                      {r.customerEmail})
                    </span>
                    <span>·</span>
                    <span>Piece: {r.productName}</span>
                    <span>·</span>
                    <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Moderation Buttons */}
                <div className="flex items-center gap-2 self-start md:self-center">
                  {r.status !== 'approved' ? (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(r.id, 'approved')}
                      className="px-4 py-2 bg-black text-white uppercase text-[0.6875rem] font-bold tracking-wider hover:bg-[#222] transition-colors"
                    >
                      Approve Review
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(r.id, 'hidden')}
                      className="px-4 py-2 border border-[#ccc] text-[#555] hover:border-black hover:text-black uppercase text-[0.6875rem] font-bold tracking-wider transition-colors"
                    >
                      Hide from Site
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
