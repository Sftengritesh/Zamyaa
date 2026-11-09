import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  UploadCloud,
  X,
  Trash2,
  AlertCircle,
} from 'lucide-react'
import { api, uploadToCloudinary, uploadMultipleToCloudinary } from '@/services/api'
import { useCatalogStore } from '@/store'

export default function AdminProductFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(isEditing)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form Fields
  const [name, setName] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [originalPrice, setOriginalPrice] = useState<number | ''>('')
  const [collection, setCollection] = useState('Lantana')
  const [collectionSlug, setCollectionSlug] = useState('lantana')
  const [category, setCategory] = useState('Farshi Suit-Set')
  const [description, setDescription] = useState('')
  const [fabric, setFabric] = useState('')
  const [care, setCare] = useState<string[]>(['Dry clean only', 'Store in breathable muslin bag'])
  const [sku, setSku] = useState('')
  const [status, setStatus] = useState<'active' | 'draft' | 'archived'>('active')
  const [isFeatured, setIsFeatured] = useState(false)
  const [isBestseller, setIsBestseller] = useState(false)
  const [isLimitedEdition, setIsLimitedEdition] = useState(false)
  const [limitedCount, setLimitedCount] = useState<number | ''>('')
  const [badge, setBadge] = useState('')

  // Images: array of { url: string, alt: string, isPrimary?: boolean, publicId?: string }
  const [images, setImages] = useState<
    { url: string; alt: string; isPrimary?: boolean; publicId?: string }[]
  >([])

  // Sizes: array of { label: string, available: boolean, measurements?: string }
  const [sizes, setSizes] = useState([
    { label: 'XS', available: true, measurements: 'Bust 32" / Waist 26"' },
    { label: 'S', available: true, measurements: 'Bust 34" / Waist 28"' },
    { label: 'M', available: true, measurements: 'Bust 36" / Waist 30"' },
    { label: 'L', available: true, measurements: 'Bust 38" / Waist 32"' },
    { label: 'XL', available: true, measurements: 'Bust 40" / Waist 34"' },
    { label: 'Custom', available: true, measurements: 'Tailored to client measurements' },
  ])

  // Colors: array of { name: string, hex: string }
  const [colors, setColors] = useState<{ name: string; hex: string }[]>([
    { name: 'Gulabi Rose', hex: '#E8617A' },
  ])

  // New color inputs
  const [newColorName, setNewColorName] = useState('')
  const [newColorHex, setNewColorHex] = useState('#000000')

  // URL image input fallback
  const [manualImageUrl, setManualImageUrl] = useState('')

  useEffect(() => {
    if (isEditing && id) {
      api
        .get(`/products/${id}`)
        .then((res) => {
          const p = res.data.product
          if (p) {
            setName(p.name || '')
            setSubtitle(p.subtitle || '')
            setPrice(p.price || '')
            setOriginalPrice(p.originalPrice || '')
            setCollection(p.collection || 'Lantana')
            setCollectionSlug(p.collectionSlug || 'lantana')
            setCategory(p.category || 'Farshi Suit-Set')
            setDescription(p.description || '')
            setFabric(p.fabric || '')
            setCare(p.care?.length ? p.care : ['Dry clean only'])
            setSku(p.sku || '')
            setStatus(p.status || 'active')
            setIsFeatured(Boolean(p.isFeatured))
            setIsBestseller(Boolean(p.isBestseller))
            setIsLimitedEdition(Boolean(p.isLimitedEdition))
            setLimitedCount(p.limitedCount || '')
            setBadge(p.badge || '')
            setImages(p.images || [])
            if (p.sizes?.length) setSizes(p.sizes)
            if (p.colors?.length) setColors(p.colors)
          }
        })
        .catch((err) => {
          setError(err.message || 'Could not load product')
        })
        .finally(() => setLoading(false))
    }
  }, [id, isEditing])

  // Handle Collection Change
  const handleCollectionSelect = (colTitle: string) => {
    setCollection(colTitle)
    setCollectionSlug(
      colTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    )
  }

  // Cloudinary File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImage(true)
    setError(null)

    try {
      if (files.length === 1) {
        const res = await uploadToCloudinary(files[0])
        if (res.success && res.url) {
          const newImg = {
            url: res.url,
            alt: name || 'Garment view',
            publicId: res.publicId,
            isPrimary: images.length === 0,
          }
          setImages((prev) => [...prev, newImg])
        }
      } else {
        const res = await uploadMultipleToCloudinary(Array.from(files))
        if (res.success && res.images) {
          const newImgs = res.images.map((img: any, i: number) => ({
            url: img.url,
            alt: name || 'Garment view',
            publicId: img.publicId,
            isPrimary: images.length === 0 && i === 0,
          }))
          setImages((prev) => [...prev, ...newImgs])
        }
      }
    } catch (err: any) {
      setError(
        'Cloudinary upload failed: ' +
          (err.response?.data?.message || err.message || 'Please check network')
      )
    } finally {
      setUploadingImage(false)
      e.target.value = ''
    }
  }

  // Add image by URL
  const handleAddManualImage = () => {
    if (!manualImageUrl.trim()) return
    setImages((prev) => [
      ...prev,
      {
        url: manualImageUrl.trim(),
        alt: name || 'Garment preview',
        isPrimary: prev.length === 0,
      },
    ])
    setManualImageUrl('')
  }

  // Set Primary Image
  const handleSetPrimary = (index: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        isPrimary: i === index,
      }))
    )
  }

  // Remove Image
  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const next = prev.filter((_, i) => i !== index)
      if (next.length > 0 && !next.some((img) => img.isPrimary)) {
        next[0].isPrimary = true
      }
      return next
    })
  }

  // Size toggle
  const handleSizeToggle = (index: number) => {
    setSizes((prev) =>
      prev.map((s, i) => (i === index ? { ...s, available: !s.available } : s))
    )
  }

  // Add Color
  const handleAddColor = () => {
    if (!newColorName.trim()) return
    setColors((prev) => [...prev, { name: newColorName.trim(), hex: newColorHex }])
    setNewColorName('')
  }

  const handleRemoveColor = (index: number) => {
    setColors((prev) => prev.filter((_, i) => i !== index))
  }

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Garment name is required.')
      return
    }
    if (!price || Number(price) <= 0) {
      setError('Please provide a valid price in INR.')
      return
    }

    setSubmitting(true)
    setError(null)

    const payload = {
      name: name.trim(),
      subtitle: subtitle.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      collection,
      collectionSlug,
      category,
      description,
      fabric,
      care,
      sku: sku.trim() || `ZY-${Date.now().toString().slice(-4)}`,
      status,
      isFeatured,
      isBestseller,
      isLimitedEdition,
      limitedCount: limitedCount ? Number(limitedCount) : undefined,
      badge: badge.trim(),
      images,
      sizes,
      colors,
    }

    try {
      if (isEditing) {
        await api.put(`/products/${id}`, payload)
      } else {
        await api.post('/products', payload)
      }
      useCatalogStore.getState().fetchCatalog()
      navigate('/admin/products')
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to save product.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="py-20 text-center text-xs uppercase text-[#888]">Loading outfit...</div>
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* ── TOP NAV ── */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e5]">
        <Link
          to="/admin/products"
          className="text-xs uppercase tracking-wider font-semibold text-[#666] hover:text-black flex items-center gap-1.5"
        >
          <ArrowLeft size={14} /> Back to Outfits
        </Link>
        <span className="text-xs uppercase tracking-widest text-[#999] font-semibold">
          {isEditing ? 'EDITING OUTFIT' : 'NEW ATELIER PIECE'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[#111]">
            {isEditing ? `Edit: ${name}` : 'Add a New Dress to Zamyaa'}
          </h1>
          <p className="text-xs text-[#666] mt-1">
            Fill in the details below. Everything you enter will immediately reflect on the live
            website.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="px-8 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#222] transition-colors shadow-md disabled:opacity-50 self-start sm:self-auto"
        >
          {submitting ? 'SAVING...' : isEditing ? 'UPDATE OUTFIT' : 'PUBLISH OUTFIT'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-300 text-red-900 text-xs flex items-center gap-2">
          <AlertCircle size={16} className="text-red-700 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ── 1. PHOTOGRAPHY UPLOADER (CLOUDINARY) ── */}
        <div className="bg-white p-6 lg:p-8 border border-[#e5e5e5] rounded-xs shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
            <div>
              <h2 className="font-display text-lg font-semibold text-[#111]">
                Garment Photography (Cloudinary)
              </h2>
              <p className="text-xs text-[#777] mt-0.5">
                Upload lookbook photos or detailed embroidery shots. Fast CDN delivery and automatic
                optimization.
              </p>
            </div>
            <span className="text-[0.6875rem] font-semibold text-[#888] uppercase tracking-wider">
              {images.length} Photo{images.length !== 1 ? 's' : ''} Uploaded
            </span>
          </div>

          {/* Cloudinary Drag & Drop Box */}
          <div className="border-2 border-dashed border-[#ccc] hover:border-black p-8 text-center transition-colors relative bg-[#fcfcfc]">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploadingImage}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-[#f0f0f0] flex items-center justify-center text-black">
                <UploadCloud size={24} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#111]">
                {uploadingImage ? 'Uploading to Cloudinary...' : 'Click to Upload Photos or Drag & Drop'}
              </p>
              <p className="text-[0.6875rem] text-[#888]">
                PNG, JPG, WEBP up to 15MB each · Stored securely on Cloudinary CDN
              </p>
            </div>
          </div>

          {/* Or Paste URL */}
          <div className="flex gap-2 items-center">
            <input
              type="url"
              placeholder="Or paste an image web link (e.g. https://...)"
              value={manualImageUrl}
              onChange={(e) => setManualImageUrl(e.target.value)}
              className="flex-1 px-4 py-2 text-xs border border-[#ddd] font-body outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={handleAddManualImage}
              className="px-4 py-2 border border-black text-black text-xs uppercase font-semibold hover:bg-black hover:text-white transition-colors"
            >
              Add Link
            </button>
          </div>

          {/* Uploaded Images Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 pt-4 border-t border-[#f0f0f0]">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative group aspect-[3/4] bg-[#f4f4f4] border overflow-hidden ${
                    img.isPrimary ? 'border-2 border-black' : 'border-[#ddd]'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />

                  {img.isPrimary && (
                    <span className="absolute top-1 left-1 bg-black text-white text-[0.55rem] font-bold px-1.5 py-0.5 tracking-wider uppercase">
                      Primary
                    </span>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 text-white">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="self-end p-1 hover:text-red-400"
                      title="Delete Image"
                    >
                      <Trash2 size={14} />
                    </button>
                    {!img.isPrimary && (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(idx)}
                        className="w-full py-1 bg-white text-black text-[0.6rem] uppercase font-bold hover:bg-[#eee]"
                      >
                        Make Primary
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── 2. ESSENTIAL GARMENT INFORMATION ── */}
        <div className="bg-white p-6 lg:p-8 border border-[#e5e5e5] rounded-xs shadow-xs space-y-6">
          <h2 className="font-display text-lg font-semibold text-[#111] pb-3 border-b border-[#f0f0f0]">
            General Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#444] mb-2">
                Outfit Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Gulabi Rose Silk Co-Ord Set"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-[#ddd] font-body outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#444] mb-2">
                Subtitle / Capsule Edition
              </label>
              <input
                type="text"
                placeholder="e.g. Noor-e-Rang Collection — Limited Edition"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-[#ddd] font-body outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#444] mb-2">
                Collection
              </label>
              <select
                value={collection}
                onChange={(e) => handleCollectionSelect(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-[#ddd] font-body outline-none focus:border-black bg-transparent uppercase font-semibold"
              >
                <option value="Neel Pushp">Neel Pushp</option>
                <option value="Sunehri Dhoop">Sunehri Dhoop</option>
                <option value="Desi Dastaan">Desi Dastaan</option>
                <option value="Noor-e-Rang">Noor-e-Rang</option>
                <option value="The Boho Flare Affair">The Boho Flare Affair</option>
                <option value="Lantana">Lantana</option>
                <option value="Zarrin">Zarrin</option>
                <option value="Gulabi Noor">Gulabi Noor (Old)</option>
                <option value="Neel-o-Mitti">Neel-o-Mitti (Old)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#444] mb-2">
                Category (Exclusive 2 Categories)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-[#ddd] font-body outline-none focus:border-black bg-transparent uppercase font-semibold"
              >
                <option value="Farshi Suit-Set">Farshi Suit-Set</option>
                <option value="Skirt Top">Skirt Top</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#444] mb-2">
                SKU Reference
              </label>
              <input
                type="text"
                placeholder="e.g. ZY-NR-001"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-[#ddd] font-body outline-none focus:border-black uppercase font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#444] mb-2">
              Artisan Narrative & Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe the silhouette, inspiration, drape, and embroidery story..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 text-xs border border-[#ddd] font-body outline-none focus:border-black resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#444] mb-2">
                Fabric & Composition
              </label>
              <input
                type="text"
                placeholder="e.g. Hand-woven Chanderi Silk, 100% Mulberry. Lining: Pure cotton muslin."
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-[#ddd] font-body outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#444] mb-2">
                Card Badge (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Limited — 60 Pieces, New Season, Archival"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-[#ddd] font-body outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* ── 3. PRICING ── */}
        <div className="bg-white p-6 lg:p-8 border border-[#e5e5e5] rounded-xs shadow-xs space-y-6">
          <h2 className="font-display text-lg font-semibold text-[#111] pb-3 border-b border-[#f0f0f0]">
            Pricing & Currency (₹ INR)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#444] mb-2">
                Selling Price (₹ INR) *
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="48500"
                value={price}
                onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2.5 text-xs border border-[#ddd] font-body outline-none focus:border-black font-bold text-base"
              />
              <p className="text-[0.6875rem] text-[#888] mt-1">
                Enter numbers only. Automatically formats as ₹{Number(price || 0).toLocaleString('en-IN')}.
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#444] mb-2">
                Original Price (Optional strikethrough for Sale)
              </label>
              <input
                type="number"
                min="0"
                placeholder="62000"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2.5 text-xs border border-[#ddd] font-body outline-none focus:border-black"
              />
              <p className="text-[0.6875rem] text-[#888] mt-1">
                If provided, website will display a red "SALE" badge with strikethrough price.
              </p>
            </div>
          </div>
        </div>

        {/* ── 4. SIZES & MEASUREMENTS ── */}
        <div className="bg-white p-6 lg:p-8 border border-[#e5e5e5] rounded-xs shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
            <div>
              <h2 className="font-display text-lg font-semibold text-[#111]">
                Available Sizes & Proportions
              </h2>
              <p className="text-xs text-[#777] mt-0.5">
                Click any size to toggle availability on or off. Unselected sizes will show as Sold Out.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {sizes.map((sz, idx) => (
              <div
                key={sz.label}
                onClick={() => handleSizeToggle(idx)}
                className={`p-4 border text-center cursor-pointer transition-all select-none ${
                  sz.available
                    ? 'border-black bg-black text-white shadow-xs'
                    : 'border-[#ddd] bg-[#f9f9f9] text-[#aaa] line-through'
                }`}
              >
                <p className="text-sm font-bold uppercase">{sz.label}</p>
                <p className="text-[0.625rem] mt-1 opacity-80 truncate">{sz.measurements}</p>
                <span className="text-[0.55rem] uppercase tracking-widest mt-2 block font-semibold">
                  {sz.available ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. COLOURS & SWATCHES ── */}
        <div className="bg-white p-6 lg:p-8 border border-[#e5e5e5] rounded-xs shadow-xs space-y-6">
          <h2 className="font-display text-lg font-semibold text-[#111] pb-3 border-b border-[#f0f0f0]">
            Colourways
          </h2>

          <div className="flex flex-wrap gap-3 items-center">
            {colors.map((c, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 border border-[#ddd] bg-[#fafafa] rounded-xs"
              >
                <span
                  className="w-4 h-4 rounded-full border border-black/20"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-xs font-semibold">{c.name}</span>
                {colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(idx)}
                    className="text-[#999] hover:text-red-500 ml-1"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Colourway input */}
          <div className="flex gap-3 items-center pt-2 max-w-md">
            <input
              type="color"
              value={newColorHex}
              onChange={(e) => setNewColorHex(e.target.value)}
              className="w-9 h-9 p-0.5 border border-[#ddd] cursor-pointer bg-white"
            />
            <input
              type="text"
              placeholder="Colour name (e.g. Royal Emerald)"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border border-[#ddd] font-body outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="px-4 py-2 border border-black text-xs uppercase font-semibold hover:bg-black hover:text-white transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* ── 6. PUBLISHING & VISIBILITY ── */}
        <div className="bg-white p-6 lg:p-8 border border-[#e5e5e5] rounded-xs shadow-xs space-y-6">
          <h2 className="font-display text-lg font-semibold text-[#111] pb-3 border-b border-[#f0f0f0]">
            Storefront Visibility & Curations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#444] mb-2">
                Publishing Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-2.5 text-xs border border-[#ddd] font-body outline-none focus:border-black uppercase font-semibold"
              >
                <option value="active">Active (Visible to Customers)</option>
                <option value="draft">Draft (Hidden in Atelier)</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="space-y-3 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-xs font-semibold text-[#222]">Feature on Homepage</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBestseller}
                  onChange={(e) => setIsBestseller(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-xs font-semibold text-[#222]">Mark as Bestseller</span>
              </label>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer pt-6">
                <input
                  type="checkbox"
                  checked={isLimitedEdition}
                  onChange={(e) => setIsLimitedEdition(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-xs font-semibold text-[#222]">Limited Edition Release</span>
              </label>

              {isLimitedEdition && (
                <input
                  type="number"
                  placeholder="Total numbered pieces (e.g. 60)"
                  value={limitedCount}
                  onChange={(e) => setLimitedCount(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-3 py-1.5 text-xs border border-[#ddd] outline-none"
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom Submit Bar */}
        <div className="flex items-center justify-between pt-4">
          <Link
            to="/admin/products"
            className="text-xs uppercase tracking-wider text-[#777] hover:text-black font-semibold"
          >
            Cancel & Return
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-10 py-4 bg-black text-white text-xs uppercase tracking-[0.22em] font-bold hover:bg-[#222] transition-colors shadow-lg disabled:opacity-50"
          >
            {submitting ? 'SAVING OUTFIT...' : isEditing ? 'SAVE CHANGES' : 'PUBLISH TO STOREFRONT'}
          </button>
        </div>
      </form>
    </div>
  )
}
