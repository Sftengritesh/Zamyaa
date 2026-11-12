import { Link } from 'react-router-dom'
import { siteImages } from '@/config/images'

const heroImage = siteImages.models.heroGirls
const heroImage2 = siteImages.models.detailHues

const values = [
  {
    icon: '✦',
    title: 'Elegance in the Details',
    desc: 'At Zamyaa, true elegance lies in the details — from delicate embroideries and intricate artisanal lace to graceful drapes and refreshing colour palettes.',
  },
  {
    icon: '✦',
    title: 'Independent Artistry',
    desc: 'Led by independent designer Jyoti with 4 years of dedicated experience from her Jalandhar atelier, every creation thoughtfully unites Indian craftsmanship with modern silhouettes.',
  },
  {
    icon: '✦',
    title: 'Timeless Luxury Prêt',
    desc: 'We don’t believe in following fleeting trends; we design heirloom styles that stay with you. Pieces designed to bring out the best in you, made to be remembered.',
  },
]

const workshops = [
  {
    num: '01',
    city: 'Jalandhar Atelier',
    crafts: ['Design Studio', 'Bespoke Tailoring', 'Artisanal Finishing'],
    desc: 'The creative atelier of Zamyaa, where Jyoti brings 4 years of individual artistic vision to every cut, silhouette, and finish.',
  },
  {
    num: '02',
    city: 'Handloom Looms',
    crafts: ['Cotton', 'Mul Cotton', 'Silk', 'Muslin'],
    desc: 'Authentic pure silks woven by heritage master weavers, selected for their luminous texture and effortless drape.',
  },
  {
    num: '03',
    city: 'Artisan Detailing',
    crafts: ['French Scalloped Lace', 'Zari Bootis', 'Handmade Tassels'],
    desc: 'Meticulous micro-detailing and delicate handwork that make each occasion piece a celebration of quiet, understated luxury.',
  },
]

const timeline = [
  { year: '2022', event: 'The Spark', detail: '“Chhota hoga, par apna hoga.” Jyoti begins her independent journey in Jalandhar with limited resources and a heart full of dreams.' },
  { year: '2023', event: 'Atelier Foundations', detail: 'Establishing her personal atelier in Jalandhar, partnering directly with master handloom weavers to source pure Chanderi and mul cotton.' },
  { year: '2024', event: 'Signature Silhouettes', detail: 'Development of Zamyaa\'s signature Farshi Gharara trousers, scalloped kurti necklines, and hand-shaded ombre dupattas.' },
  { year: '2025', event: 'Passion into Purpose', detail: 'Four years of patience, hard work, and growth solidify Zamyaa as a recognized symbol of luxury prêt.' },
  { year: '2026', event: 'Zamyaa by Jyoti', detail: 'Launch of iconic capsules — Lantana, Neel Pushp, and The Boho Flare Affair — celebrating women who embrace individuality with confidence.' },
]

export default function AboutPage() {
  return (
    <main
      className="min-h-screen font-body"
      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
    >
      {/* ── Brand Banner ── */}
      <div
        className="w-full text-center py-2.5 px-4 text-xs tracking-[0.25em] uppercase font-semibold"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-on-primary)',
        }}
      >
        ✦ Zamyaa by Jyoti · A Symbol of Luxury Prêt · Jalandhar Atelier ✦
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
            The Story of Zamyaa
          </p>
          <h1
            className="font-display text-5xl md:text-7xl font-semibold leading-tight mb-6 text-white"
            style={{ maxWidth: '800px' }}
          >
            Where Tradition Meets Timeless Elegance
          </h1>
          <p
            className="font-display text-xl italic"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            A Symbol of Luxury Prêt. Designed to bring out the best in you. Made to be remembered.
          </p>
        </div>
      </section>

      {/* ── Section 2: The Founder ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Portrait container */}
        <div className="relative">
          <div
            className="w-full aspect-[3/4] relative overflow-hidden rounded-sm"
            style={{ backgroundColor: 'var(--color-surface-container)' }}
          >
            {/* Editorial portrait */}
            <img
              src={heroImage2 || heroImage}
              alt="Jyoti, Independent Artist & Founder of Zamyaa"
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, transparent 60%)',
              }}
            />
          </div>
          {/* Editorial badge on image */}
          <div
            className="absolute bottom-0 left-0 px-5 py-3 text-xs tracking-[0.2em] uppercase font-semibold font-mono"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-on-primary)',
            }}
          >
            Jyoti · Independent Artist
          </div>
        </div>

        {/* Text */}
        <div>
          <p
            className="text-xs tracking-[0.3em] uppercase font-semibold mb-4"
            style={{ color: 'var(--color-secondary)' }}
          >
            The Artist &amp; Vision
          </p>
          <h2
            className="font-display text-5xl sm:text-6xl italic font-semibold mb-6"
            style={{ color: 'var(--color-on-surface)' }}
          >
            Jyoti
          </h2>
          <div
            className="w-12 h-px mb-8"
            style={{ backgroundColor: 'var(--color-outline-variant)' }}
          />

          <p
            className="font-body text-base leading-relaxed mb-5 font-semibold"
            style={{ color: 'var(--color-on-surface)' }}
          >
            At Zamyaa, we believe that true elegance lies in the details.
          </p>

          <p
            className="font-body text-base leading-relaxed mb-5"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            Born from a love for Indian craftsmanship, timeless traditions and contemporary aesthetics, Zamyaa is a celebration of women who embrace their individuality with grace and confidence.
          </p>

          <p
            className="font-body text-base leading-relaxed mb-5"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            Every creation is thoughtfully designed to bring together the richness of traditional artistry and the effortless charm of modern silhouettes. From delicate embroideries and intricate detailing to graceful drapes, refreshing colour palettes and beautifully crafted ensembles, each piece tells a story of elegance.
          </p>

          <p
            className="font-body text-base leading-relaxed mb-5"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            Inspired by the beauty of everyday moments and the grandeur of Indian celebrations, our collections are designed for women who appreciate understated luxury and effortless sophistication.
          </p>

          <p
            className="font-body text-base leading-relaxed mb-6"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            Whether it’s a festive gathering, a cherished celebration or a moment worth dressing up for, Zamyaa brings you pieces that make every occasion feel special. We don’t believe in following trends; we believe in creating styles that stay with you.
          </p>

          {/* Jalandhar Atelier Callout */}
          <div
            className="border-l-2 pl-5 py-3.5 mt-8 rounded-r"
            style={{ borderColor: 'var(--color-primary)', backgroundColor: 'var(--color-surface-container)' }}
          >
            <p
              className="text-xs tracking-[0.2em] uppercase font-semibold font-mono"
              style={{ color: 'var(--color-primary)' }}
            >
              Atelier Jyoti · Jalandhar
            </p>
            <p
              className="text-xs mt-1.5 font-body leading-relaxed"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              With 4 years of hands-on experience as an independent artist in Jalandhar, Jyoti personally oversees every bespoke sketch, fabric curation, and tailoring detail to bring you authentic luxury prêt.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2.5: Behind the Brand — A Personal Letter from the Founder ── */}
      <section
        className="py-24 sm:py-28 relative overflow-hidden border-y"
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          borderColor: 'var(--color-outline-variant)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <div
            className="p-8 sm:p-14 lg:p-16 rounded-2xl relative shadow-xl border"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-outline-variant)',
            }}
          >
            {/* Corner Decorative Accents */}
            <div className="absolute top-4 left-4 text-xs font-mono opacity-30 select-none">✦</div>
            <div className="absolute top-4 right-4 text-xs font-mono opacity-30 select-none">✦</div>
            <div className="absolute bottom-4 left-4 text-xs font-mono opacity-30 select-none">✦</div>
            <div className="absolute bottom-4 right-4 text-xs font-mono opacity-30 select-none">✦</div>

            {/* Header Block */}
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <span
                className="text-[11px] font-mono tracking-[0.35em] uppercase font-semibold block"
                style={{ color: 'var(--color-secondary)' }}
              >
                Behind the Brand
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-tight"
                style={{ color: 'var(--color-on-surface)' }}
              >
                A Dream That Started Small
              </h2>
              <p className="font-serif italic text-lg sm:text-xl text-neutral-600 dark:text-neutral-400">
                Four Years of Dreams, Determination &amp; Zamyaa
              </p>
              <div
                className="w-16 h-px mx-auto my-4"
                style={{ backgroundColor: 'var(--color-outline-variant)' }}
              />
            </div>

            {/* The Soul Motto Card */}
            <div
              className="my-8 p-6 sm:p-8 rounded-xl border-l-4 shadow-xs"
              style={{
                backgroundColor: 'var(--color-surface-container-low)',
                borderLeftColor: 'var(--color-primary)',
              }}
            >
              <p
                className="font-serif italic text-2xl sm:text-3xl text-center leading-snug tracking-wide"
                style={{ color: 'var(--color-on-surface)' }}
              >
                &ldquo;Chhota hoga, par apna hoga.&rdquo;
              </p>
            </div>

            {/* Founder Letter Prose */}
            <div
              className="space-y-6 font-body text-base leading-relaxed"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              <p>
                Every brand has a story, and mine began with a simple thought —{' '}
                <strong className="font-serif italic font-semibold text-neutral-900 dark:text-neutral-100">
                  &ldquo;Chhota hoga, par apna hoga.&rdquo;
                </strong>
              </p>

              <p>
                I always knew that I wanted to create something of my own. A regular 9-to-5 job was never the dream I saw for myself. I wanted to build something that reflected my passion, my creativity and my identity.
              </p>

              <p>
                I didn’t start with a big investment, a fancy studio or a perfect business plan. I started small, with limited resources, countless doubts and a heart full of dreams.
              </p>

              <p>
                The journey wasn’t always beautiful. There were days of uncertainty, moments of self-doubt and challenges that made me question whether I was on the right path. But one thing remained constant — my belief in building something I could proudly call my own.
              </p>

              <p>
                What began as a small step slowly turned into something much more meaningful.
              </p>

              <p>
                Over the past four years, Zamyaa has grown with me. Every collection, every customer, every little achievement and even every setback has been a part of this journey.
              </p>

              <p>
                Today, when I look back, I don’t just see a clothing brand. I see four years of patience, hard work, learning and a dream that I refused to give up on.
              </p>

              <p>
                Zamyaa was never just about selling clothes. It was about creating something beautiful, celebrating Indian elegance and turning my passion into my purpose.
              </p>

              <p className="font-medium" style={{ color: 'var(--color-on-surface)' }}>
                We are still growing, still learning and still dreaming bigger.
              </p>

              <p className="font-serif italic text-lg" style={{ color: 'var(--color-on-surface)' }}>
                And perhaps that’s the most beautiful part of this journey.
              </p>

              <p className="font-serif italic text-lg" style={{ color: 'var(--color-on-surface)' }}>
                What started with &ldquo;Chhota hoga, par apna hoga&rdquo; has become something I am truly proud to call mine.
              </p>
            </div>

            {/* Letter Sign-off */}
            <div
              className="mt-10 pt-8 border-t flex flex-col items-start gap-1"
              style={{ borderColor: 'var(--color-outline-variant)' }}
            >
              <span className="font-serif italic text-lg" style={{ color: 'var(--color-secondary)' }}>
                With love,
              </span>
              <span
                className="font-display text-xl font-semibold tracking-wide"
                style={{ color: 'var(--color-on-surface)' }}
              >
                Founder, Zamyaa
              </span>
            </div>

            {/* Ornamental Bottom Banner */}
            <div
              className="mt-10 py-3.5 px-6 rounded-full text-center text-xs tracking-[0.2em] uppercase font-mono shadow-sm"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
              }}
            >
              ✦ Four years of passion. Countless dreams. One beautiful journey. ✦
            </div>
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
              Our Philosophy
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
            Atelier &amp; Craftsmanship
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
                className="font-display text-2xl font-semibold mb-3"
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
              5-Year Artistic Journey
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
