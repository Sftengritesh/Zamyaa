import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, BookOpen, Upload, Eye } from 'lucide-react'
import { api, uploadToCloudinary } from '@/services/api'
import type { JournalArticle } from '@/types'

const CATEGORIES = [
  'Designer Notes',
  'Craft Stories',
  'Style Journal',
  'Behind the Scenes',
  'Fabric Stories',
]

export default function AdminJournalPage() {
  const [articles, setArticles] = useState<JournalArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<JournalArticle | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [author, setAuthor] = useState('Jyoti')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [readTime, setReadTime] = useState('4 min read')
  const [status, setStatus] = useState<'published' | 'draft'>('published')
  const [isFeatured, setIsFeatured] = useState(false)

  const fetchArticles = () => {
    setLoading(true)
    api
      .get('/journal')
      .then((res) => {
        setArticles(res.data.articles || [])
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const openModal = (art?: JournalArticle) => {
    if (art) {
      setEditingArticle(art)
      setTitle(art.title)
      setSlug(art.slug)
      setCategory(art.category)
      setAuthor(art.author)
      setExcerpt(art.excerpt)
      setContent(art.content)
      setCoverImage(art.coverImage)
      setReadTime(art.readTime)
      setStatus(art.status)
      setIsFeatured(art.isFeatured || false)
    } else {
      setEditingArticle(null)
      setTitle('')
      setSlug('')
      setCategory(CATEGORIES[0])
      setAuthor('Jyoti')
      setExcerpt('')
      setContent('')
      setCoverImage('')
      setReadTime('4 min read')
      setStatus('published')
      setIsFeatured(false)
    }
    setModalOpen(true)
  }

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!editingArticle) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      )
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const res = await uploadToCloudinary(file, 'zamyaa/journal')
      if (res.success && res.url) {
        setCoverImage(res.url)
      }
    } catch {
      alert('Failed to upload article image.')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required.')
      return
    }

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      author,
      excerpt,
      content,
      coverImage: coverImage || '/homescreen/campaign-models.png',
      readTime,
      status,
      isFeatured,
      publishedAt: editingArticle?.publishedAt || new Date().toISOString(),
    }

    try {
      if (editingArticle) {
        await api.put(`/journal/${editingArticle.id}`, payload)
      } else {
        await api.post('/journal', payload)
      }
      setModalOpen(false)
      fetchArticles()
    } catch {
      alert('Failed to save journal article.')
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete article "${title}"?`)) return
    try {
      await api.delete(`/journal/${id}`)
      fetchArticles()
    } catch {
      alert('Failed to delete article.')
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-body">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="font-display text-3xl font-light text-black">
            Journal Articles
          </h1>
          <p className="text-xs text-neutral-500 font-mono tracking-wider mt-1">
            Editorial curation, designer essays, craft chronicles, and styling stories.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-5 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-mono uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
        >
          <Plus size={14} /> New Story
        </button>
      </div>

      {/* Articles Table */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono uppercase tracking-widest text-neutral-400">
          Loading Journal Stories...
        </div>
      ) : articles.length === 0 ? (
        <div className="py-20 text-center border bg-white p-8">
          <BookOpen size={36} className="mx-auto text-neutral-300 mb-3" />
          <h3 className="font-display text-xl text-black">No Journal Articles Yet</h3>
          <p className="text-xs text-neutral-500 mt-1">
            Write your first atelier note or editorial feature.
          </p>
        </div>
      ) : (
        <div className="border bg-white overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 border-b font-mono uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="py-3 px-4">Story</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Published</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-12 h-14 object-cover border bg-neutral-100 shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-black text-sm">{art.title}</p>
                      <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                        /{art.slug} · {art.readTime}
                        {art.isFeatured && (
                          <span className="ml-2 text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                            FEATURED
                          </span>
                        )}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-neutral-600 font-medium">
                    {art.category}
                  </td>
                  <td className="py-3 px-4 text-neutral-600">
                    {art.author}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded font-bold ${
                        art.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {art.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-500 font-mono">
                    {new Date(art.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <a
                      href={`/journal/${art.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-neutral-400 hover:text-black inline-block"
                      title="View on storefront"
                    >
                      <Eye size={14} />
                    </a>
                    <button
                      onClick={() => openModal(art)}
                      className="p-1.5 text-neutral-600 hover:text-black cursor-pointer"
                      title="Edit Story"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(art.id, art.title)}
                      className="p-1.5 text-red-400 hover:text-red-700 cursor-pointer"
                      title="Delete Story"
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

      {/* Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="font-display text-2xl text-black">
                {editingArticle ? 'Edit Journal Story' : 'New Journal Story'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-neutral-400 hover:text-black font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-body">
              <div>
                <label className="block font-mono uppercase tracking-wider text-neutral-600 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. The Inspiration Behind Lantana"
                  className="w-full border px-3 py-2 text-sm focus:outline-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono uppercase tracking-wider text-neutral-600 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full border px-3 py-2 text-xs font-mono focus:outline-black"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase tracking-wider text-neutral-600 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border px-3 py-2 text-xs focus:outline-black bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono uppercase tracking-wider text-neutral-600 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full border px-3 py-2 text-xs focus:outline-black"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase tracking-wider text-neutral-600 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full border px-3 py-2 text-xs focus:outline-black"
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase tracking-wider text-neutral-600 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full border px-3 py-2 text-xs focus:outline-black bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-neutral-600 mb-1">
                  Cover Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://... or upload photo"
                    className="flex-1 border px-3 py-2 text-xs font-mono focus:outline-black"
                  />
                  <label className="px-4 py-2 border bg-neutral-50 hover:bg-neutral-100 cursor-pointer font-mono text-xs flex items-center gap-1.5 shrink-0">
                    <Upload size={12} />
                    {uploadingImage ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-neutral-600 mb-1">
                  Excerpt (Short Summary)
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A one or two sentence editorial hook..."
                  className="w-full border px-3 py-2 text-xs focus:outline-black"
                />
              </div>

              <div>
                <label className="block font-mono uppercase tracking-wider text-neutral-600 mb-1">
                  Article Body (Full Story) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the full editorial text here..."
                  className="w-full border px-3 py-2 text-xs leading-relaxed focus:outline-black font-sans"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="featured-check" className="font-medium text-xs cursor-pointer">
                  Feature this article at the top of the Journal page
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border text-xs font-mono uppercase tracking-widest hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs font-mono uppercase tracking-widest cursor-pointer shadow-xs"
                >
                  Save Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
