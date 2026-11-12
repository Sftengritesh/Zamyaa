import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface CategoryBubble {
  id: string
  name: string
  subtitle?: string
  image: string
  link: string
  badge?: string
  isLive?: boolean
}

const CATEGORIES: CategoryBubble[] = [
  {
    id: 'farshi-suit-set',
    name: 'Farshi Suit-Sets',
    subtitle: 'Silhouette 01',
    image: '/images/lantana/IMG_6642.jpeg',
    link: '/collections?category=farshi-suit-set',
    badge: 'Core',
    isLive: true,
  },
  {
    id: 'skirt-top',
    name: 'Skirt Tops',
    subtitle: 'Silhouette 02',
    image: '/images/the-boho-flare-affair/IMG_6681.jpeg',
    link: '/collections?category=skirt-top',
    badge: 'Live',
    isLive: true,
  },
  {
    id: 'neel-pushp',
    name: 'Neel Pushp',
    subtitle: 'Capsule 01',
    image: '/images/neel-pushp/IMG_6732.jpeg',
    link: '/collections/neel-pushp',
    badge: 'New',
    isLive: true,
  },
  {
    id: 'lantana',
    name: 'Lantana',
    subtitle: 'Pastel Chanderi',
    image: '/images/lantana/IMG_6630.jpeg',
    link: '/collections/lantana',
    badge: 'Live',
    isLive: true,
  },
  {
    id: 'boho-flare',
    name: 'The Boho Flare',
    subtitle: 'Handblock Tiered',
    image: '/images/the-boho-flare-affair/IMG_6660.jpeg',
    link: '/collections/the-boho-flare-affair',
    badge: 'Live',
    isLive: true,
  },
  {
    id: 'sunehri-dhoop',
    name: 'Sunehri Dhoop',
    subtitle: 'Golden Zari',
    image: '/images/lantana/lantana-detail-hues.jpg',
    link: '/collections/sunehri-dhoop',
    badge: 'Soon',
    isLive: false,
  },
  {
    id: 'desi-dastaan',
    name: 'Desi Dastaan',
    subtitle: 'Amber Heritage',
    image: '/images/the-boho-flare-affair/IMG_6670.jpeg',
    link: '/collections/desi-dastaan',
    badge: 'Soon',
    isLive: false,
  },
  {
    id: 'noor-e-rang',
    name: 'Noor-e-Rang',
    subtitle: 'Gulabi Rose',
    image: '/images/lantana/IMG_6638.jpeg',
    link: '/collections/noor-e-rang',
    badge: 'Soon',
    isLive: false,
  },
  {
    id: 'zarrin',
    name: 'Zarrin',
    subtitle: 'Molten Gold',
    image: '/images/the-boho-flare-affair/IMG_6672.jpeg',
    link: '/collections/zarrin',
    badge: 'Soon',
    isLive: false,
  },
  {
    id: 'all-creations',
    name: 'All Creations',
    subtitle: 'Complete Edit',
    image: '/homescreen/campaign-models.png',
    link: '/collections',
    badge: 'Archive',
    isLive: true,
  },
]

export default function CircularCategoryNav() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-full py-10 sm:py-14 bg-white border-b border-black/5 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-black/40" />
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-neutral-500 font-semibold">
                Curated Discovery
              </p>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-black tracking-tight">
              Explore by Silhouette &amp; Capsule
            </h2>
          </div>

          {/* Desktop Scroll Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll categories left"
              className="w-9 h-9 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll categories right"
              className="w-9 h-9 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Bubble Track */}
        <div
          ref={scrollRef}
          className="flex items-start gap-5 sm:gap-7 lg:gap-8 overflow-x-auto pb-4 pt-1 scrollbar-none scroll-smooth select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATEGORIES.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group flex flex-col items-center shrink-0 w-24 sm:w-28 text-center transition-transform duration-300 hover:-translate-y-1 focus:outline-none"
            >
              {/* Circular Avatar Container with Double-Ring Styling */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-0.5 border border-neutral-300 group-hover:border-black transition-all duration-300 shadow-xs group-hover:shadow-md bg-white">
                <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Badge Overlay */}
                {item.badge && (
                  <span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest font-bold rounded-full shadow-xs whitespace-nowrap ${
                      item.isLive
                        ? 'bg-black text-white border border-white/30'
                        : 'bg-neutral-200 text-neutral-700 border border-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Title & Subtitle Below */}
              <div className="mt-3.5 space-y-0.5">
                <p className="font-body text-xs sm:text-[13px] font-semibold text-black tracking-wide leading-tight group-hover:underline line-clamp-2">
                  {item.name}
                </p>
                {item.subtitle && (
                  <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

