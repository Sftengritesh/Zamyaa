import { Link } from 'react-router-dom'
import { ArrowRight, Heart } from 'lucide-react'

export default function ZamyaaFavouritesBanner() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white border-y border-black/5 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Full-Bleed Seamless Editorial Campaign Card */}
        <div className="relative rounded-2xl bg-[#FAF8F5] text-neutral-900 border border-neutral-200/80 shadow-xl overflow-hidden min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-stretch">
          
          {/* Background Artwork Layer (Seamless Fashion Photograph + Models on Right + Ivory Negative Space on Left) */}
          <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
            <source
              media="(max-width: 768px)"
              srcSet="/homescreen/favourites-editorial-mobile.jpg"
            />
            <img
              src="/homescreen/favourites-editorial-banner.jpg"
              alt="The ZAMYAA Favourites — Pure Atelier Silhouettes & Tiered Skirt Sets"
              className="w-full h-full object-cover object-right md:object-center transition-transform duration-1000 ease-out hover:scale-102"
              loading="lazy"
            />
          </picture>

          {/* Left subtle warm fade for maximum typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/80 to-transparent md:from-[#FAF8F5]/95 md:via-[#FAF8F5]/70 md:to-transparent pointer-events-none" />

          {/* Copy Container (Positioned in the Left Negative Space on Desktop) */}
          <div className="relative z-10 w-full flex flex-col justify-end md:justify-center items-start p-8 sm:p-12 lg:p-16">
            <div className="max-w-lg bg-white/70 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0 rounded-xl md:rounded-none border border-black/5 md:border-none shadow-xs md:shadow-none">
              {/* Decorative Line */}
              <div className="w-12 h-px bg-black/40 mb-5" />

              {/* Small Label */}
              <div className="flex items-center gap-2 mb-3">
                <Heart size={14} className="text-rose-600 fill-rose-600/30" />
                <p className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-neutral-600">
                  CURATED FOR YOU
                </p>
              </div>

              {/* Main Editorial Heading */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-black tracking-tight leading-[1.08] mb-5">
                The ZAMYAA <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-neutral-800">Favourites</span>
              </h2>

              {/* Supporting Text */}
              <p className="font-body text-sm sm:text-base text-neutral-700 leading-relaxed max-w-md mb-8">
                Discover the silhouettes and creations that define our world.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/collections"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs font-body uppercase tracking-[0.2em] font-semibold transition-all duration-200 shadow-sm cursor-pointer"
                >
                  SHOP FAVOURITES <ArrowRight size={14} />
                </Link>

                <Link
                  to="/collections?category=farshi-suit-set"
                  className="inline-flex items-center justify-center text-xs font-body uppercase tracking-[0.18em] text-neutral-700 hover:text-black py-2 underline-offset-4 hover:underline transition-colors"
                >
                  View Signature Sets
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Curation Pill (Bottom Right on Desktop) */}
          <div className="absolute bottom-6 right-6 z-10 hidden sm:block bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/20 rounded-xs">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-200 font-semibold">
              Archival Atelier Selection
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}
