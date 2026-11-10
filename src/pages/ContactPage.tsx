import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react'
import { InstagramIcon, YoutubeIcon } from '@/components/ui/SocialIcons'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('Bespoke Tailoring')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    setSubmitted(true)
  }

  return (
    <div
      className="min-h-screen font-body"
      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
    >
      {/* ── HEADER ── */}
      <section
        className="w-full py-16 md:py-24 px-6 md:px-16 text-center border-b"
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderColor: 'var(--color-outline-variant)',
        }}
      >
        <span
          className="text-xs uppercase tracking-[0.25em] font-semibold block mb-3"
          style={{ color: 'var(--color-secondary)' }}
        >
          DIRECT ATELIER CONCIERGE
        </span>
        <h1
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight max-w-3xl mx-auto"
          style={{ color: 'var(--color-primary)' }}
        >
          Connect with Jyoti & Our Craftsmen
        </h1>
        <p
          className="font-body text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          Whether you seek bespoke couture tailoring, styling advice for wedding wardrobes, or
          have questions regarding an archival order, our team is at your service.
        </p>
      </section>

      {/* ── MAIN CONTENT (2 Columns) ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Contact Form (7 Cols) */}
          <div
            className="lg:col-span-7 p-8 md:p-12 border shadow-sm"
            style={{
              backgroundColor: 'var(--color-surface-container-lowest)',
              borderColor: 'var(--color-outline-variant)',
            }}
          >
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2
                  size={48}
                  className="mx-auto"
                  style={{ color: 'var(--color-primary)' }}
                />
                <h2 className="font-display text-2xl md:text-3xl font-semibold">
                  Message Gracefully Received
                </h2>
                <p
                  className="font-body text-sm leading-relaxed max-w-md mx-auto"
                  style={{ color: 'var(--color-on-surface-variant)' }}
                >
                  Thank you, <span className="font-semibold">{name}</span>. Jyoti or our senior
                  atelier coordinator will review your request and respond to{' '}
                  <span className="font-semibold">{email}</span> within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setMessage('')
                  }}
                  className="mt-6 px-8 py-3 text-xs tracking-widest uppercase font-semibold border"
                  style={{
                    borderColor: 'var(--color-primary)',
                    color: 'var(--color-primary)',
                  }}
                >
                  SEND ANOTHER ENQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b pb-4 mb-6" style={{ borderColor: 'var(--color-outline-variant)' }}>
                  <h2 className="font-display text-2xl font-semibold">Send an Atelier Message</h2>
                  <p className="text-xs text-secondary mt-1">
                    Fill out the form below to receive dedicated attention from our designers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Roy"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 text-sm border font-body outline-none"
                      style={{
                        borderColor: 'var(--color-outline-variant)',
                        backgroundColor: 'var(--color-surface)',
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. radhika@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 text-sm border font-body outline-none"
                      style={{
                        borderColor: 'var(--color-outline-variant)',
                        backgroundColor: 'var(--color-surface)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold mb-2">
                    Enquiry Type
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 text-sm border font-body outline-none bg-transparent"
                    style={{
                      borderColor: 'var(--color-outline-variant)',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  >
                    <option>Bespoke Tailoring & Made-to-Measure</option>
                    <option>Bridal & Trousseau Consultation</option>
                    <option>Existing Order & Dispatch Status</option>
                    <option>Press, Editorial & Media Loans</option>
                    <option>Artisan Partnerships & Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold mb-2">
                    Your Message / Custom Measurements *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about the silhouette you envision, required delivery date, or any specific fabric preferences..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 text-sm border font-body outline-none resize-none"
                    style={{
                      borderColor: 'var(--color-outline-variant)',
                      backgroundColor: 'var(--color-surface)',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-xs tracking-[0.2em] uppercase font-semibold font-body transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-on-primary)',
                  }}
                >
                  <Send size={14} /> TRANSMIT ENQUIRY TO ATELIER
                </button>
              </form>
            )}
          </div>

          {/* Right: Atelier Dossier & Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Atelier Studio Details */}
            <div
              className="p-8 border shadow-sm space-y-6"
              style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                borderColor: 'var(--color-outline-variant)',
              }}
            >
              <span
                className="text-xs uppercase tracking-[0.25em] font-semibold block"
                style={{ color: 'var(--color-secondary)' }}
              >
                FLAGSHIP SPACES
              </span>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="shrink-0 mt-1 text-primary" />
                  <div>
                    <h3 className="font-display text-base font-semibold">The Mumbai Atelier</h3>
                    <p className="text-xs text-secondary leading-relaxed mt-1">
                      Plot 18, Mathuradas Mills Compound, Senapati Bapat Marg, Lower Parel, Mumbai —
                      400013
                    </p>
                    <p className="text-[0.6875rem] font-semibold uppercase mt-1 text-primary">
                      By Appointment Only
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t" style={{ borderColor: 'var(--color-outline-variant)' }}>
                  <MapPin size={20} className="shrink-0 mt-1 text-primary" />
                  <div>
                    <h3 className="font-display text-base font-semibold">The Jaipur Weaving Studio</h3>
                    <p className="text-xs text-secondary leading-relaxed mt-1">
                      7, Civil Lines Heritage Enclave, Jacob Road, Jaipur, Rajasthan — 302006
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Channels */}
            <div
              className="p-8 border shadow-sm space-y-4"
              style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                borderColor: 'var(--color-outline-variant)',
              }}
            >
              <span
                className="text-xs uppercase tracking-[0.25em] font-semibold block"
                style={{ color: 'var(--color-secondary)' }}
              >
                DIRECT LINES
              </span>

              <div className="space-y-3 text-xs">
                <a
                  href="mailto:jyotisharam120099@gmail.com"
                  className="flex items-center gap-3 py-1 hover:underline"
                >
                  <Mail size={16} /> jyotisharam120099@gmail.com
                </a>
                <a
                  href="tel:+918427233901"
                  className="flex items-center gap-3 py-1 hover:underline"
                >
                  <Phone size={16} /> +91 8427233901
                </a>
                <a
                  href="https://wa.me/918427233901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-1 hover:underline font-semibold"
                >
                  <MessageCircle size={16} /> WhatsApp: +91 8427233901
                </a>
                <div className="flex items-center gap-3 py-1 text-secondary">
                  <Clock size={16} /> Monday – Saturday, 10:00 AM – 7:30 PM IST
                </div>
              </div>
            </div>

            {/* Digital Atelier */}
            <div
              className="p-8 border shadow-sm"
              style={{
                backgroundColor: 'var(--color-surface-container-low)',
                borderColor: 'var(--color-outline-variant)',
              }}
            >
              <h3 className="font-display text-base font-semibold mb-2">
                Follow The Story of Jyoti
              </h3>
              <p className="text-xs text-secondary leading-relaxed mb-4">
                Watch loom journeys, dye experiments, and preview upcoming seasonal capsules on our
                visual diaries.
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:underline"
                >
                  <InstagramIcon size={14} /> @zamyaabyjyoti
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:underline"
                >
                  <YoutubeIcon size={14} /> Atelier Films
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
