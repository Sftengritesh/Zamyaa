import { useState, useEffect } from 'react'
import {
  Check,
  Eye,
  Save,
} from 'lucide-react'
import { api, uploadToCloudinary } from '@/services/api'
import { useCatalogStore } from '@/store'

export default function AdminHomepageCMSPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingHero, setUploadingHero] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Form Fields
  const [announcementEnabled, setAnnouncementEnabled] = useState(true)
  const [announcementText, setAnnouncementText] = useState('')

  const [seasonBadge, setSeasonBadge] = useState('')
  const [editionBadge, setEditionBadge] = useState('')
  const [heroHeading, setHeroHeading] = useState('')
  const [heroDescription, setHeroDescription] = useState('')
  const [primaryBtnText, setPrimaryBtnText] = useState('')
  const [primaryBtnLink, setPrimaryBtnLink] = useState('')
  const [secondaryBtnText, setSecondaryBtnText] = useState('')
  const [secondaryBtnLink, setSecondaryBtnLink] = useState('')
  const [heroImageUrl, setHeroImageUrl] = useState('')

  const [promoEnabled, setPromoEnabled] = useState(true)
  const [promoHeading, setPromoHeading] = useState('')
  const [promoSubheading, setPromoSubheading] = useState('')
  const [promoBtnText, setPromoBtnText] = useState('')
  const [promoBtnLink, setPromoBtnLink] = useState('')

  const [sectionVisibility, setSectionVisibility] = useState<any>({
    hero: true,
    marquee: true,
    craftPillars: true,
    featuredCollection: true,
    newArrivals: true,
    editorialFeature: true,
    values: true,
    instagram: true,
    newsletter: true,
  })

  useEffect(() => {
    setLoading(true)
    api
      .get('/cms')
      .then((res) => {
        const data = res.data.cms
        if (data) {
          setAnnouncementEnabled(data.announcement?.enabled !== false)
          setAnnouncementText(data.announcement?.text || '')

          setSeasonBadge(data.hero?.seasonBadge || '')
          setEditionBadge(data.hero?.editionBadge || '')
          setHeroHeading(data.hero?.heading || '')
          setHeroDescription(data.hero?.description || '')
          setPrimaryBtnText(data.hero?.primaryButtonText || '')
          setPrimaryBtnLink(data.hero?.primaryButtonLink || '')
          setSecondaryBtnText(data.hero?.secondaryButtonText || '')
          setSecondaryBtnLink(data.hero?.secondaryButtonLink || '')
          setHeroImageUrl(data.hero?.imageUrl || '')

          setPromoEnabled(data.promotionalBanner?.enabled !== false)
          setPromoHeading(data.promotionalBanner?.heading || '')
          setPromoSubheading(data.promotionalBanner?.subheading || '')
          setPromoBtnText(data.promotionalBanner?.buttonText || '')
          setPromoBtnLink(data.promotionalBanner?.buttonLink || '')

          if (data.sectionVisibility) {
            setSectionVisibility(data.sectionVisibility)
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingHero(true)
    try {
      const res = await uploadToCloudinary(file, 'zamyaa/hero')
      if (res.success && res.url) {
        setHeroImageUrl(res.url)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUploadingHero(false)
    }
  }

  const handleToggleSection = (sec: string) => {
    setSectionVisibility((prev: any) => ({
      ...prev,
      [sec]: !prev[sec],
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSavedSuccess(false)

    const payload = {
      announcement: {
        enabled: announcementEnabled,
        text: announcementText,
      },
      hero: {
        seasonBadge,
        editionBadge,
        heading: heroHeading,
        description: heroDescription,
        primaryButtonText: primaryBtnText,
        primaryButtonLink: primaryBtnLink,
        secondaryButtonText: secondaryBtnText,
        secondaryButtonLink: secondaryBtnLink,
        imageUrl: heroImageUrl,
      },
      promotionalBanner: {
        enabled: promoEnabled,
        heading: promoHeading,
        subheading: promoSubheading,
        buttonText: promoBtnText,
        buttonLink: promoBtnLink,
      },
      sectionVisibility,
    }

    try {
      const res = await api.put('/cms', payload)
      if (res.data.success) {
        setSavedSuccess(true)
        useCatalogStore.getState().fetchCatalog()
        setTimeout(() => setSavedSuccess(false), 4000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="py-20 text-center text-xs uppercase text-[#888]">Loading CMS...</div>
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e5e5]">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#777] block mb-1">
            HOMEPAGE CMS & VISUAL MERCHANDISING
          </span>
          <h1 className="font-display text-3xl font-semibold text-[#111]">
            Storefront Banners & Layout
          </h1>
          <p className="text-xs text-[#666] mt-1">
            Change your campaign photography, headline typography, and toggle sections without
            writing a single line of code.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="h-10 px-4 border border-[#ddd] hover:border-black text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Eye size={14} /> Live Preview
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="h-10 px-6 bg-black text-white text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 hover:bg-[#222] transition-colors shadow-md disabled:opacity-50"
          >
            <Save size={14} /> {saving ? 'SAVING...' : 'PUBLISH CHANGES'}
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-green-100 border border-green-300 text-green-900 text-xs flex items-center gap-2">
          <Check size={16} className="text-green-700" />
          <span>Homepage CMS updated successfully! Changes are live on the customer storefront.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 font-body text-xs">
        {/* ── 1. TOP ANNOUNCEMENT TICKER BAR ── */}
        <div className="bg-white p-6 lg:p-8 border border-[#e5e5e5] rounded-xs shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
            <div>
              <h2 className="font-display text-lg font-semibold text-[#111]">
                Top Announcement Marquee
              </h2>
              <p className="text-[#777] mt-0.5">
                Thin announcement bar displayed at the very top of every storefront page.
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={announcementEnabled}
                onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                className="w-4 h-4 accent-black"
              />
              <span className="font-bold uppercase tracking-wider">Enabled</span>
            </label>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-[#444]">
              Announcement Text
            </label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#ddd] outline-none focus:border-black font-medium"
            />
          </div>
        </div>

        {/* ── 2. HERO CAMPAIGN BANNER ── */}
        <div className="bg-white p-6 lg:p-8 border border-[#e5e5e5] rounded-xs shadow-xs space-y-6">
          <div className="pb-3 border-b border-[#f0f0f0]">
            <h2 className="font-display text-lg font-semibold text-[#111]">
              Hero Campaign Banner (Main Screen)
            </h2>
            <p className="text-[#777] mt-0.5">
              The first full-width visual banner customers see when arriving at zamyaa.in.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-[#444]">
                Season Badge
              </label>
              <input
                type="text"
                value={seasonBadge}
                onChange={(e) => setSeasonBadge(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#ddd] outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-[#444]">
                Edition Badge
              </label>
              <input
                type="text"
                value={editionBadge}
                onChange={(e) => setEditionBadge(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#ddd] outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-[#444]">
              Hero Headline (Playfair Display)
            </label>
            <input
              type="text"
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#ddd] outline-none focus:border-black font-display text-base font-bold"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-[#444]">
              Hero Subtext / Narrative
            </label>
            <textarea
              rows={3}
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#ddd] outline-none focus:border-black resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block uppercase tracking-wider font-semibold text-[#444]">
                Primary Button
              </label>
              <input
                type="text"
                placeholder="Button Label"
                value={primaryBtnText}
                onChange={(e) => setPrimaryBtnText(e.target.value)}
                className="w-full px-3 py-2 border border-[#ddd] outline-none"
              />
              <input
                type="text"
                placeholder="Button URL (e.g. /collections)"
                value={primaryBtnLink}
                onChange={(e) => setPrimaryBtnLink(e.target.value)}
                className="w-full px-3 py-2 border border-[#ddd] outline-none font-mono"
              />
            </div>

            <div className="space-y-3">
              <label className="block uppercase tracking-wider font-semibold text-[#444]">
                Secondary Button
              </label>
              <input
                type="text"
                placeholder="Button Label"
                value={secondaryBtnText}
                onChange={(e) => setSecondaryBtnText(e.target.value)}
                className="w-full px-3 py-2 border border-[#ddd] outline-none"
              />
              <input
                type="text"
                placeholder="Button URL (e.g. /about)"
                value={secondaryBtnLink}
                onChange={(e) => setSecondaryBtnLink(e.target.value)}
                className="w-full px-3 py-2 border border-[#ddd] outline-none font-mono"
              />
            </div>
          </div>

          {/* Hero Image Cloudinary Upload */}
          <div className="space-y-3 pt-4 border-t border-[#f0f0f0]">
            <label className="block uppercase tracking-wider font-semibold text-[#444]">
              Hero Campaign Photography (Cloudinary)
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Image URL or upload via Cloudinary..."
                value={heroImageUrl}
                onChange={(e) => setHeroImageUrl(e.target.value)}
                className="flex-1 px-4 py-2 border border-[#ddd] outline-none"
              />
              <label className="px-5 py-2.5 bg-black text-white uppercase font-bold tracking-wider cursor-pointer hover:bg-[#222]">
                {uploadingHero ? 'Uploading...' : 'Upload New Hero Photo'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroUpload}
                  className="hidden"
                />
              </label>
            </div>

            {heroImageUrl && (
              <div className="relative aspect-video max-h-56 overflow-hidden border border-[#ddd] bg-[#f4f4f4] mt-2">
                <img src={heroImageUrl} alt="Hero Banner" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* ── 3. PROMOTIONAL CARPET BANNER ── */}
        <div className="bg-white p-6 lg:p-8 border border-[#e5e5e5] rounded-xs shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
            <div>
              <h2 className="font-display text-lg font-semibold text-[#111]">
                Bridal & Bespoke Promotional Banner
              </h2>
              <p className="text-[#777] mt-0.5">
                Full-width callout section highlighting bespoke atelier appointments.
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={promoEnabled}
                onChange={(e) => setPromoEnabled(e.target.checked)}
                className="w-4 h-4 accent-black"
              />
              <span className="font-bold uppercase tracking-wider">Enabled</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-[#444]">
                Heading
              </label>
              <input
                type="text"
                value={promoHeading}
                onChange={(e) => setPromoHeading(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#ddd] outline-none"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-[#444]">
                Button Text
              </label>
              <input
                type="text"
                value={promoBtnText}
                onChange={(e) => setPromoBtnText(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#ddd] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-[#444]">
              Subheading / Description
            </label>
            <input
              type="text"
              value={promoSubheading}
              onChange={(e) => setPromoSubheading(e.target.value)}
              className="w-full px-4 py-2.5 border border-[#ddd] outline-none"
            />
          </div>
        </div>

        {/* ── 4. HOMEPAGE SECTION VISIBILITY TOGGLES ── */}
        <div className="bg-white p-6 lg:p-8 border border-[#e5e5e5] rounded-xs shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#f0f0f0]">
            <h2 className="font-display text-lg font-semibold text-[#111]">
              Homepage Section Visibility Toggles
            </h2>
            <p className="text-[#777] mt-0.5">
              Turn any section of the homepage on or off with a single click.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: 'hero', label: 'Hero Campaign Carousel' },
              { key: 'marquee', label: 'Marquee Craft Ticker' },
              { key: 'craftPillars', label: 'Artisan Heritage Pillars' },
              { key: 'featuredCollection', label: 'Featured Collection Banner' },
              { key: 'newArrivals', label: 'New Arrivals Product Grid' },
              { key: 'editorialFeature', label: 'Editorial Spotlight Section' },
              { key: 'values', label: 'Conscious Luxury Values' },
              { key: 'instagram', label: 'Instagram Visual Diaries' },
              { key: 'newsletter', label: 'VIP Newsletter Signup' },
            ].map((sec) => (
              <label
                key={sec.key}
                className="flex items-center justify-between p-3.5 border border-[#eee] bg-[#fbfbfb] rounded-xs cursor-pointer hover:border-black transition-colors"
              >
                <span className="font-semibold text-[#222]">{sec.label}</span>
                <input
                  type="checkbox"
                  checked={sectionVisibility[sec.key] !== false}
                  onChange={() => handleToggleSection(sec.key)}
                  className="w-4 h-4 accent-black"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-10 py-4 bg-black text-white uppercase tracking-[0.22em] font-bold text-xs hover:bg-[#222] transition-colors shadow-md disabled:opacity-50"
          >
            {saving ? 'PUBLISHING...' : 'SAVE & PUBLISH TO LIVE STORE'}
          </button>
        </div>
      </form>
    </div>
  )
}
