import { useState, useEffect } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  ExternalLink,
} from 'lucide-react'
import { api, uploadToCloudinary } from '@/services/api'

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<any>(null)
  const [uploadingBanner, setUploadingBanner] = useState(false)

  // Form State
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')
  const [season, setSeason] = useState('Autumn-Winter 2026')
  const [capsule, setCapsule] = useState('Capsule 05')
  const [heroImage, setHeroImage] = useState('')
  const [bannerImage, setBannerImage] = useState('')
  const [status, setStatus] = useState<'published' | 'draft' | 'archived'>('published')
  const [launchDate, setLaunchDate] = useState('')

  const fetchCollections = () => {
    setLoading(true)
    api
      .get('/collections')
      .then((res) => {
        setCollections(res.data.collections || [])
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCollections()
  }, [])

  const openModal = (col?: any) => {
    if (col) {
      setEditingCollection(col)
      setTitle(col.title || '')
      setSubtitle(col.subtitle || '')
      setDescription(col.description || '')
      setSeason(col.season || '')
      setCapsule(col.capsule || '')
      setHeroImage(col.heroImage || '')
      setBannerImage(col.bannerImage || '')
      setStatus(col.status || 'published')
      setLaunchDate(col.launchDate || '')
    } else {
      setEditingCollection(null)
      setTitle('')
      setSubtitle('')
      setDescription('')
      setSeason('Autumn-Winter 2026')
      setCapsule('Capsule Edition')
      setHeroImage('')
      setBannerImage('')
      setStatus('published')
      setLaunchDate('')
    }
    setModalOpen(true)
  }

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'banner') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingBanner(true)
    try {
      const res = await uploadToCloudinary(file, 'zamyaa/collections')
      if (res.success && res.url) {
        if (target === 'hero') setHeroImage(res.url)
        else setBannerImage(res.url)
      }
    } catch (err) {
      console.error('Banner upload error', err)
    } finally {
      setUploadingBanner(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      season: season.trim(),
      capsule: capsule.trim(),
      heroImage,
      bannerImage,
      status,
      launchDate,
    }

    try {
      if (editingCollection) {
        await api.put(`/collections/${editingCollection.id}`, payload)
      } else {
        await api.post('/collections', payload)
      }
      setModalOpen(false)
      fetchCollections()
    } catch (err) {
      console.error('Error saving collection', err)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete collection "${name}"? Garments will remain in catalog.`)) return
    try {
      await api.delete(`/collections/${id}`)
      setCollections((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleTogglePublish = async (col: any) => {
    const nextStatus = col.status === 'published' ? 'draft' : 'published'
    try {
      await api.put(`/collections/${col.id}`, { status: nextStatus })
      setCollections((prev) =>
        prev.map((c) => (c.id === col.id ? { ...c, status: nextStatus } : c))
      )
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
            SEASONAL CAPSULES
          </span>
          <h1 className="font-display text-3xl font-semibold text-[#111]">
            Collection Management
          </h1>
          <p className="text-xs text-[#666] mt-1">
            Curate and launch your signature capsules: Lantana, Noor-e-Rang, Boho Flare, Affaire &
            Desi Dastaan.
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="h-10 px-5 bg-black text-white text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#222] transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} /> Create Collection
        </button>
      </div>

      {/* ── COLLECTIONS GRID ── */}
      {loading ? (
        <div className="py-20 text-center text-xs uppercase text-[#888]">Loading collections...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-[#e5e5e5] rounded-xs shadow-xs overflow-hidden flex flex-col justify-between hover:border-black transition-colors"
            >
              <div>
                {/* Banner Header Image */}
                <div className="h-44 bg-[#f4f4f4] relative overflow-hidden group">
                  {c.heroImage ? (
                    <img
                      src={c.heroImage}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#999] uppercase tracking-wider">
                      No Banner Uploaded
                    </div>
                  )}

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span
                      className={`px-2 py-0.5 text-[0.625rem] uppercase font-bold tracking-wider rounded-xs ${
                        c.status === 'published'
                          ? 'bg-black text-white'
                          : 'bg-zinc-200 text-zinc-800'
                      }`}
                    >
                      {c.status}
                    </span>
                    {c.launchDate && (
                      <span className="px-2 py-0.5 text-[0.625rem] bg-white text-black font-semibold tracking-wider flex items-center gap-1 shadow-xs">
                        <Calendar size={10} /> Launch: {c.launchDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#111]">{c.title}</h3>
                      <p className="text-xs text-[#666] italic">{c.subtitle}</p>
                    </div>
                    <span className="text-[0.6875rem] font-bold text-[#888] uppercase bg-[#f4f4f4] px-2 py-0.5">
                      Order #{c.displayOrder}
                    </span>
                  </div>

                  <p className="text-xs text-[#555] line-clamp-2 leading-relaxed pt-1">
                    {c.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-[#fafafa] border-t border-[#f0f0f0] flex items-center justify-between text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => handleTogglePublish(c)}
                  className="text-xs uppercase tracking-wider underline hover:text-black"
                >
                  {c.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`/collections?collection=${c.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 border border-[#ccc] hover:border-black rounded-xs"
                    title="View on Storefront"
                  >
                    <ExternalLink size={13} />
                  </a>
                  <button
                    type="button"
                    onClick={() => openModal(c)}
                    className="p-1.5 border border-[#ccc] hover:border-black rounded-xs"
                    title="Edit Collection"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id, c.title)}
                    className="p-1.5 border border-[#ccc] hover:border-red-600 hover:text-red-600 rounded-xs"
                    title="Delete Collection"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CREATE / EDIT COLLECTION MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white border border-black p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#eee]">
              <h2 className="font-display text-xl font-semibold">
                {editingCollection ? `Edit Collection: ${editingCollection.title}` : 'Create New Collection'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-xs uppercase font-bold text-[#888] hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-body">
              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1">
                  Collection Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Desi Dastaan"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ccc] outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tales of Indian Heirlooms"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ccc] outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1">
                  Artisan Dossier / Narrative
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the craft tradition, looms, colors..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ccc] outline-none focus:border-black resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">
                    Season
                  </label>
                  <input
                    type="text"
                    placeholder="Autumn-Winter 2026"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ccc] outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">
                    Capsule Tag
                  </label>
                  <input
                    type="text"
                    placeholder="Capsule 05"
                    value={capsule}
                    onChange={(e) => setCapsule(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ccc] outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Cloudinary Banner Upload */}
              <div className="space-y-2 pt-2 border-t border-[#eee]">
                <label className="block uppercase tracking-wider font-semibold">
                  Collection Hero Photo (Cloudinary)
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Image URL or upload below..."
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#ccc] text-xs outline-none focus:border-black"
                  />
                  <label className="px-4 py-2 bg-black text-white text-xs uppercase font-semibold cursor-pointer hover:bg-[#222]">
                    {uploadingBanner ? 'Uploading...' : 'Upload Photo'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleBannerUpload(e, 'hero')}
                      className="hidden"
                    />
                  </label>
                </div>
                {heroImage && (
                  <img src={heroImage} alt="Banner" className="h-24 w-full object-cover border mt-2" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#ccc] outline-none focus:border-black uppercase font-semibold"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1">
                    Launch Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={launchDate}
                    onChange={(e) => setLaunchDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ccc] outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-[#eee]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 text-xs uppercase font-semibold text-[#666] hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black text-white text-xs uppercase font-bold tracking-widest hover:bg-[#222]"
                >
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
