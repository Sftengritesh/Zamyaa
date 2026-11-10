import { useState, useEffect } from 'react'
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Truck,
  Share2,
  Sparkles,
} from 'lucide-react'
import { api } from '@/services/api'

interface SettingsState {
  storeName: string
  tagline: string
  logoText: string
  logoSubtext: string
  contactEmail: string
  contactPhone: string
  whatsappNumber: string
  atelierAddressMumbai: string
  atelierAddressJaipur: string
  currency: string
  currencySymbol: string
  standardShippingFee: number
  freeShippingThreshold: number
  sameDayShippingFee: number
  taxRatePercent: number
  returnWindowDays: number
  instagramUrl: string
  youtubeUrl: string
  twitterUrl: string
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    storeName: 'ZAMYAA',
    tagline: 'Luxury Couture & Handcrafted Pret by Jyoti',
    logoText: 'ZAMYAA',
    logoSubtext: 'by jyoti',
    contactEmail: 'jyotisharam120099@gmail.com',
    contactPhone: '+91 8427233901',
    whatsappNumber: '+91 8427233901',
    atelierAddressMumbai: 'Atelier Zamyaa, 14 Khar Danda Road, Khar West, Mumbai 400052, Maharashtra',
    atelierAddressJaipur: 'Design Studio & Handloom Craft Center, C-Scheme, Jaipur 302001, Rajasthan',
    currency: 'INR',
    currencySymbol: '₹',
    standardShippingFee: 495,
    freeShippingThreshold: 15000,
    sameDayShippingFee: 995,
    taxRatePercent: 12,
    returnWindowDays: 7,
    instagramUrl: 'https://instagram.com/zamyaabyjyoti',
    youtubeUrl: 'https://youtube.com/@zamyaabyjyoti',
    twitterUrl: 'https://twitter.com/zamyaaofficial',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setLoading(true)
    api
      .get('/settings')
      .then((res) => {
        if (res.data?.settings) {
          setSettings(res.data.settings)
        }
      })
      .catch((err) => {
        console.error('Failed to load settings:', err)
        setErrorMessage('Failed to load current settings from backend.')
      })
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (key: keyof SettingsState, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
    setSavedSuccess(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setErrorMessage('')
    setSavedSuccess(false)

    try {
      const res = await api.put('/settings', settings)
      if (res.data?.success) {
        setSavedSuccess(true)
        setTimeout(() => setSavedSuccess(false), 4000)
      } else {
        setErrorMessage(res.data?.message || 'Failed to update settings')
      }
    } catch (err: any) {
      console.error('Error saving settings:', err)
      setErrorMessage(err.response?.data?.message || 'Error communicating with server')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-black border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Page Title & Save Action */}
      <div className="flex flex-col justify-between gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
            System Preferences
          </span>
          <h1 className="mt-1 font-serif text-3xl font-light tracking-tight text-neutral-900">
            Store Settings & Policies
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Configure boutique identity, atelier concierge channels, shipping thresholds, and tax compliance.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 bg-black px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition hover:bg-neutral-800 disabled:opacity-50"
        >
          {saving ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 border border-emerald-500/30 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>All store settings and operational policies updated successfully.</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 border border-red-500/30 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Brand Identity & Wordmark */}
        <div className="border border-black/10 bg-white p-6 shadow-xs">
          <div className="mb-6 flex items-center gap-3 border-b border-black/5 pb-4">
            <Sparkles className="h-5 w-5 text-neutral-800" />
            <div>
              <h2 className="font-serif text-lg font-medium text-neutral-900">Maison & Brand Identity</h2>
              <p className="text-xs text-neutral-500">
                Wordmark rules enforce large bold uppercase for the house name, and lowercase italics for the designer.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                House / Brand Name
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => handleChange('storeName', e.target.value)}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                Tagline / Sub-heading
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                Logo Primary Wordmark
              </label>
              <input
                type="text"
                value={settings.logoText}
                onChange={(e) => handleChange('logoText', e.target.value)}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm font-semibold uppercase tracking-widest focus:border-black focus:outline-none"
                required
              />
              <span className="mt-1 block text-[11px] text-neutral-400">
                Displays in large bold uppercase serif typography.
              </span>
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                Logo Secondary Text
              </label>
              <input
                type="text"
                value={settings.logoSubtext}
                onChange={(e) => handleChange('logoSubtext', e.target.value)}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm italic focus:border-black focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-neutral-400">
                e.g. &quot;by jyoti&quot; &mdash; styled in subtle lowercase italic script.
              </span>
            </div>
          </div>

          {/* Wordmark Preview */}
          <div className="mt-6 rounded-none border border-neutral-200 bg-neutral-50 p-6 text-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Live Wordmark Preview</span>
            <div className="mt-3 flex flex-col items-center justify-center">
              <span className="font-serif text-3xl font-semibold tracking-[0.25em] text-neutral-900">
                {settings.logoText || 'ZAMYAA'}
              </span>
              <span className="mt-0.5 font-serif text-xs italic tracking-widest text-neutral-600">
                {settings.logoSubtext || 'by jyoti'}
              </span>
            </div>
          </div>
        </div>

        {/* Concierge & Atelier Contact */}
        <div className="border border-black/10 bg-white p-6 shadow-xs">
          <div className="mb-6 flex items-center gap-3 border-b border-black/5 pb-4">
            <Building2 className="h-5 w-5 text-neutral-800" />
            <div>
              <h2 className="font-serif text-lg font-medium text-neutral-900">Concierge & Atelier Locations</h2>
              <p className="text-xs text-neutral-500">
                Customer support channels and physical address details displayed in footer and order invoices.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="mb-1 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-neutral-600">
                <Mail className="h-3.5 w-3.5 text-neutral-500" />
                Contact Email
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-neutral-600">
                <Phone className="h-3.5 w-3.5 text-neutral-500" />
                Phone Number
              </label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-neutral-600">
                <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                WhatsApp Concierge
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-neutral-400">
                Direct WhatsApp ordering & bespoke styling queries.
              </span>
            </div>

            <div className="md:col-span-3">
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                Mumbai Atelier Address
              </label>
              <textarea
                rows={2}
                value={settings.atelierAddressMumbai}
                onChange={(e) => handleChange('atelierAddressMumbai', e.target.value)}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div className="md:col-span-3">
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                Jaipur Design Studio Address
              </label>
              <textarea
                rows={2}
                value={settings.atelierAddressJaipur}
                onChange={(e) => handleChange('atelierAddressJaipur', e.target.value)}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Shipping, Taxes & Currency */}
        <div className="border border-black/10 bg-white p-6 shadow-xs">
          <div className="mb-6 flex items-center gap-3 border-b border-black/5 pb-4">
            <Truck className="h-5 w-5 text-neutral-800" />
            <div>
              <h2 className="font-serif text-lg font-medium text-neutral-900">Shipping, Taxes & Currency</h2>
              <p className="text-xs text-neutral-500">
                Automated calculation constants applied during the checkout process.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                Currency Code & Symbol
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-2/3 border border-black/15 bg-white px-3 py-2 text-sm uppercase focus:border-black focus:outline-none"
                />
                <input
                  type="text"
                  value={settings.currencySymbol}
                  onChange={(e) => handleChange('currencySymbol', e.target.value)}
                  className="w-1/3 border border-black/15 bg-white px-3 py-2 text-center text-sm font-semibold focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                Standard Shipping (₹)
              </label>
              <input
                type="number"
                min={0}
                value={settings.standardShippingFee}
                onChange={(e) => handleChange('standardShippingFee', Number(e.target.value))}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-neutral-400">
                Applies to domestic orders below threshold.
              </span>
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                Free Shipping Over (₹)
              </label>
              <input
                type="number"
                min={0}
                value={settings.freeShippingThreshold}
                onChange={(e) => handleChange('freeShippingThreshold', Number(e.target.value))}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-neutral-400">
                Orders qualifying for complimentary express shipping.
              </span>
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                Same-Day VIP Courier (₹)
              </label>
              <input
                type="number"
                min={0}
                value={settings.sameDayShippingFee}
                onChange={(e) => handleChange('sameDayShippingFee', Number(e.target.value))}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-neutral-400">
                Express white-glove atelier courier.
              </span>
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                GST / Tax Rate (%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={settings.taxRatePercent}
                onChange={(e) => handleChange('taxRatePercent', Number(e.target.value))}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-neutral-400">
                GST apparel tax rate included/itemized.
              </span>
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                Return / Exchange Window (Days)
              </label>
              <input
                type="number"
                min={0}
                max={60}
                value={settings.returnWindowDays}
                onChange={(e) => handleChange('returnWindowDays', Number(e.target.value))}
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
              <span className="mt-1 block text-[11px] text-neutral-400">
                Policy stated across product detail pages.
              </span>
            </div>
          </div>
        </div>

        {/* Social Media & Editorial Channels */}
        <div className="border border-black/10 bg-white p-6 shadow-xs">
          <div className="mb-6 flex items-center gap-3 border-b border-black/5 pb-4">
            <Share2 className="h-5 w-5 text-neutral-800" />
            <div>
              <h2 className="font-serif text-lg font-medium text-neutral-900">Social & Editorial Channels</h2>
              <p className="text-xs text-neutral-500">
                Links connected to footer icons and curated lookbook feeds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                placeholder="https://instagram.com/zamyaabyjyoti"
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                YouTube Atelier Channel
              </label>
              <input
                type="url"
                value={settings.youtubeUrl}
                onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                placeholder="https://youtube.com/@zamyaabyjyoti"
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-neutral-600">
                Twitter / X Profile
              </label>
              <input
                type="url"
                value={settings.twitterUrl}
                onChange={(e) => handleChange('twitterUrl', e.target.value)}
                placeholder="https://twitter.com/zamyaaofficial"
                className="w-full border border-black/15 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex justify-end gap-4 border-t border-black/10 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-black px-8 py-3.5 font-mono text-xs uppercase tracking-widest text-white transition hover:bg-neutral-800 disabled:opacity-50"
          >
            {saving ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}
