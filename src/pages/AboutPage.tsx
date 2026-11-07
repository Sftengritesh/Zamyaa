import { Link } from 'react-router-dom'
import { products } from '@/data/products'

const heroImage = products[0]?.images[0]?.url ?? ''
const heroImage2 = products[1]?.images[0]?.url ?? ''

const values = [
  {
    icon: '✦',
    title: 'Heritage First',
    desc: 'Preserving 500-year-old craft traditions through every stitch, every weave, and every hand-block print we commission from master artisans.',
  },
  {
    icon: '✦',
    title: 'Artisan Partnerships',
    desc: 'Working directly with master weavers and embroiderers across India — building long-term relationships that sustain livelihoods and preserve craft.',
  },
  {
    icon: '✦',
    title: 'Conscious Luxury',
    desc: 'Ethically made, sustainably sourced, beautifully crafted. Because luxury should feel as good as it looks — for the wearer and the world.',
  },
]

const workshops = [
  {
    num: '01',
    city: 'Jaipur',
    crafts: ['Gota Patti', 'Block Print'],
    desc: "The pink city's artisans have been perfecting their craft for over four centuries.",
  },
  {
    num: '02',
    city: 'Varanasi',
    crafts: ['Banarasi Silk', 'Zardozi'],
    desc: 'Sacred looms on the Ghats of the Ganga produce silk that is woven into legend.',
  },
  {
    num: '03',
    city: 'Lucknow',
    crafts: ['Chikankari'],
    desc: 'The city of Nawabs, where delicate white thread shadow-work has flourished for 400 years.',
  },
]

const timeline = [
  { year: '2018', event: 'Founded', detail: 'Zamyaa is born from Jyoti\'s vision to honour India\'s textile heritage.' },
  { year: '2020', event: 'First Collection', detail: 'The debut collection — 12 hand-crafted pieces — sells out in 48 hours.' },
  { year: '2022', event: 'Artisan Collective', detail: 'The Zamyaa artisan collective expands to over 1,200 craftspeople across India.' },
  { year: '2024', event: 'International Debut', detail: 'Zamyaa makes its first international appearance at London Fashion Week.' },
  { year: '2025', event: 'AW2025 Lantana', detail: 'The Lantana Collection — an architecture of bloom — launches to critical acclaim.' },
]

export default function AboutPage() {
  return (
    <main
      className="min-h-screen font-body"
      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
    >
      {/* ── Placeholder Banner ── */}
      <div
        className="w-full text-center py-3 px-4 text-xs tracking-[0.2em] uppercase font-semibold"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-on-primary)',
        }}
      >
        ✦ This About page has placeholder content. Tell us your story to personalise it. ✦
      </div>

      {/* ── Section 1: Hero ── */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-end overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.15) 100%)',
          }}
        />
        {/* Text content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          <p
            className="text-xs tracking-[0.3em] uppercase font-semibold mb-6"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Our Story
          </p>
          <h1
            className="font-display text-5xl md:text-7xl font-semibold leading-tight mb-6 text-white"
            style={{ maxWidth: '700px' }}
          >
            Crafting Luxury at the Intersection of Heritage and Modernity
          </h1>
          <p
            className="font-display text-xl italic"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            Founded with love, woven with purpose.
          </p>
        </div>
      </section>

      {/* ── Section 2: The Founder ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Portrait placeholder */}
        <div className="relative">
          <div
            className="w-full aspect-[3/4] relative overflow-hidden"
            style={{ backgroundColor: 'var(--color-surface-container)' }}
          >
            {/* Editorial portrait using the second product image for style */}
            <img
              src={heroImage2 || heroImage}
              alt="Jyoti, Founder of Zamyaa"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, transparent 60%)',
              }}
            />
          </div>
          {/* Editorial label on image */}
          <div
            className="absolute bottom-0 left-0 px-5 py-3 text-xs tracking-[0.2em] uppercase font-semibold"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
            }}
          >
            Portrait — Placeholder
          </div>
        </div>

        {/* Text */}
        <div>
          <p
            className="text-xs tracking-[0.3em] uppercase font-semibold mb-4"
            style={{ color: 'var(--color-secondary)' }}
          >
            The Founder
          </p>
          <h2
            className="font-display text-6xl italic font-semibold mb-8"
            style={{ color: 'var(--color-on-surface)' }}
          >
            Jyoti
          </h2>
          <div
            className="w-12 h-px mb-8"
            style={{ backgroundColor: 'var(--color-outline-variant)' }}
          />
          <p
            className="font-body text-base leading-relaxed mb-6"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            Zamyaa was born from Jyoti's lifelong love of India's extraordinary textile heritage.
            Growing up surrounded by the colours and craftsmanship of traditional Indian fabrics,
            she envisioned a label that would honour these artisanal traditions while speaking the
            language of contemporary luxury.
          </p>
          <p
            className="font-body text-base leading-relaxed mb-10"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            Each Zamyaa piece is a bridge between the ancient and the modern — a garment that
            carries within it the quiet genius of weavers, dyers, embroiderers, and block-printers
            whose families have practised their art for generations.
          </p>

          {/* Editorial placeholder prompt */}
          <div
            className="border-l-2 pl-5 py-2"
            style={{ borderColor: 'var(--color-outline-variant)' }}
          >
            <p
              className="text-xs tracking-[0.15em] uppercase font-semibold italic"
              style={{ color: 'var(--color-secondary)' }}
            >
              ✦ EDIT THIS STORY — Add your personal story here ✦
            </p>
            <p
              className="text-xs mt-1 font-body"
              style={{ color: 'var(--color-on-surface-variant)', opacity: 0.7 }}
            >
              Replace this text with Jyoti's real story — her inspiration, her journey, her vision.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3: Our Values ── */}
      <section
        className="py-20"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p
              className="text-xs tracking-[0.3em] uppercase font-semibold mb-4"
              style={{ color: 'var(--color-secondary)' }}
            >
              What We Stand For
            </p>
            <h2
              className="font-display text-4xl md:text-5xl font-semibold"
              style={{ color: 'var(--color-on-surface)' }}
            >
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col">
                <span
                  className="text-2xl mb-5"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  {v.icon}
                </span>
                <div
                  className="w-8 h-px mb-5"
                  style={{ backgroundColor: 'var(--color-outline-variant)' }}
                />
                <h3
                  className="font-display text-xl font-semibold mb-4"
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  {v.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: 'var(--color-on-surface-variant)' }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Craft Map ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase font-semibold mb-4"
            style={{ color: 'var(--color-secondary)' }}
          >
            Provenance
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold"
            style={{ color: 'var(--color-on-surface)' }}
          >
            From the Workshops of India
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workshops.map((w) => (
            <div
              key={w.city}
              className="p-8 relative"
              style={{ border: '1px solid var(--color-outline-variant)' }}
            >
              <div
                className="font-display text-6xl font-semibold opacity-10 absolute top-6 right-8 select-none"
                style={{ color: 'var(--color-primary)' }}
              >
                {w.num}
              </div>
              <p
                className="font-display text-3xl font-semibold mb-3"
                style={{ color: 'var(--color-on-surface)' }}
              >
                {w.city}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {w.crafts.map((c) => (
                  <span
                    key={c}
                    className="text-xs tracking-[0.15em] uppercase font-semibold px-3 py-1"
                    style={{
                      backgroundColor: 'var(--color-surface-container)',
                      color: 'var(--color-on-surface-variant)',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {w.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: Timeline ── */}
      <section
        className="py-20"
        style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p
              className="text-xs tracking-[0.3em] uppercase font-semibold mb-4"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Milestones
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
              The Zamyaa Journey
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="hidden md:block absolute top-5 left-0 right-0 h-px"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 relative">
              {timeline.map((t, i) => (
                <div key={t.year} className="relative">
                  {/* Dot */}
                  <div
                    className="hidden md:flex w-10 h-10 rounded-full border-2 border-white items-center justify-center mb-6 relative z-10"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <div
                      className="w-3 h-3 rounded-full bg-white"
                    />
                  </div>
                  {/* Mobile number */}
                  <div
                    className="md:hidden text-xs tracking-[0.2em] uppercase font-semibold mb-2"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p
                    className="font-display text-2xl font-semibold mb-1 text-white"
                  >
                    {t.year}
                  </p>
                  <p
                    className="font-body text-sm font-semibold mb-2 uppercase tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    {t.event}
                  </p>
                  <p
                    className="font-body text-xs leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {t.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: CTA ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p
          className="text-xs tracking-[0.3em] uppercase font-semibold mb-6"
          style={{ color: 'var(--color-secondary)' }}
        >
          Discover Zamyaa
        </p>
        <h2
          className="font-display text-4xl md:text-5xl font-semibold mb-10"
          style={{ color: 'var(--color-on-surface)' }}
        >
          Where would you like to go next?
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/collections"
            className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-[0.2em] uppercase font-semibold font-body transition-opacity hover:opacity-80"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
            }}
          >
            Explore Our Collections
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-[0.2em] uppercase font-semibold font-body transition-colors"
            style={{
              border: '1px solid var(--color-primary)',
              color: 'var(--color-primary)',
            }}
          >
            Contact Jyoti
          </Link>
        </div>
      </section>
    </main>
  )
}
