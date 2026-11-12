import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

interface ArchivalCollection {
  slug: string
  title: string
  subtitle: string
  image: string
  isLive: boolean
  silhouette: string
}

const ARCHIVAL_COLLECTIONS: ArchivalCollection[] = [
  {
    slug: 'neel-pushp',
    title: 'Neel Pushp',
    subtitle: 'Indigo Blooms & Midnight Silks',
    image: '/images/neel-pushp/IMG_6732.jpeg',
    isLive: true,
    silhouette: 'Farshi Suit-Set',
  },
  {
    slug: 'lantana',
    title: 'Lantana',
    subtitle: 'Spring Farshi & Chanderi Silks',
    image: '/images/lantana/IMG_6642.jpeg',
    isLive: true,
    silhouette: 'Farshi Suit-Set',
  },
  {
    slug: 'the-boho-flare-affair',
    title: 'The Boho Flare Affair',
    subtitle: 'Tiered Skirt Tops & Corsets',
    image: '/images/the-boho-flare-affair/IMG_6681.jpeg',
    isLive: true,
    silhouette: 'Skirt Top Ensemble',
  },
  {
    slug: 'sunehri-dhoop',
    title: 'Sunehri Dhoop',
    subtitle: 'Sunlit Chanderi & Gold Zari',
    image: '/images/lantana/lantana-detail-hues.jpg',
    isLive: false,
    silhouette: 'Atelier Capsule',
  },
  {
    slug: 'desi-dastaan',
    title: 'Desi Dastaan',
    subtitle: 'Hand-woven Heritage Tales',
    image: '/images/the-boho-flare-affair/IMG_6670.jpeg',
    isLive: false,
    silhouette: 'Heritage Silhouette',
  },
  {
    slug: 'noor-e-rang',
    title: 'Noor-e-Rang',
    subtitle: 'Luminescent Festive Silk Palette',
    image: '/images/lantana/IMG_6638.jpeg',
    isLive: false,
    silhouette: 'Festive Pret',
  },
  {
    slug: 'zarrin',
    title: 'Zarrin',
    subtitle: 'Metallic Gilded Threadwork',
    image: '/images/the-boho-flare-affair/IMG_6672.jpeg',
    isLive: false,
    silhouette: 'Bespoke Atelier',
  },
  {
    slug: 'gulabi-noor',
    title: 'Gulabi Noor',
    subtitle: 'Rose Quartz Chiffon & Silk',
    image: '/images/lantana/IMG_6634.jpeg',
    isLive: false,
    silhouette: 'Archival Vault',
  },
  {
    slug: 'neel-o-mitti',
    title: 'Neel-o-Mitti',
    subtitle: 'Earthy Indigo Organic Cottons',
    image: '/images/neel-pushp/IMG_6726.jpeg',
    isLive: false,
    silhouette: 'Archival Vault',
  },
]

export default function ArchivalEditionsShowcase() {
  return (
    <div className="mt-20 pt-16 border-t border-black/10">
      <div className="text-center max-w-xl mx-auto mb-12">
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-neutral-500 mb-2">
          Curated Capsules &amp; Archival Editions
        </p>
        <h3 className="font-display text-2xl sm:text-3xl font-light text-black tracking-tight">
          The Archival Repertoire
        </h3>
        <p className="font-body text-xs sm:text-sm text-neutral-500 mt-2">
          Discover our living capsules, from active seasonal releases to forthcoming heritage vaults.
        </p>
      </div>

      {/* Responsive Fashion Image Grid: 3 columns on desktop, 2 on tablet, 1 on small mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {ARCHIVAL_COLLECTIONS.map((col) => (
          <Link
            key={col.slug}
            to={`/collections/${col.slug}`}
            className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-neutral-900 border border-neutral-200/60 shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer block"
          >
            {/* Full-bleed Fashion Photography */}
            <img
              src={col.image}
              alt={col.title}
              className="w-full h-full object-cover object-[center_20%] group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* Gradient Overlays for High-Contrast Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 group-hover:from-black/92 group-hover:via-black/35 transition-colors duration-400" />

            {/* Top Bar: Status Badge & Silhouette Pill */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 bg-black/60 backdrop-blur-md text-neutral-200 border border-white/15">
                {col.silhouette}
              </span>

              {col.isLive ? (
                <span className="px-2.5 py-0.5 text-[9px] tracking-widest font-mono uppercase bg-amber-400 text-black font-bold rounded-full shadow-xs">
                  Live
                </span>
              ) : (
                <span className="px-2.5 py-0.5 text-[9px] tracking-widest font-mono uppercase bg-black/70 text-neutral-300 font-semibold border border-white/20 rounded-full">
                  Soon
                </span>
              )}
            </div>

            {/* Bottom Content Area */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white z-10">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h4 className="font-display text-xl sm:text-2xl font-light tracking-wide text-white group-hover:text-amber-200 transition-colors duration-300">
                    {col.title}
                  </h4>
                  <p className="font-body text-xs text-neutral-300 mt-1 line-clamp-1 leading-relaxed">
                    {col.subtitle}
                  </p>
                </div>

                {/* Hover Action Circle */}
                <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 shrink-0">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

