import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function EarlyAccessBanner() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#FAF9F6] border-y border-black/5 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Full-Bleed Seamless Editorial Campaign Card */}
        <div className="relative rounded-2xl bg-[#0E131C] text-white shadow-xl overflow-hidden min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-stretch">
          
          {/* Background Artwork Layer (Seamless Fashion Photograph + Alpha Blend to Midnight #0E131C) */}
          <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
            <source
              media="(max-width: 768px)"
              srcSet="/homescreen/early-access-campaign-mobile.jpg"
            />
            <img
              src="/homescreen/early-access-campaign-banner.jpg"
              alt="The Zamyaa Inner Circle — Neel Pushp Royal Blue Silk Campaign"
              className="w-full h-full object-cover object-left md:object-center transition-transform duration-1000 ease-out hover:scale-102"
              loading="lazy"
            />
          </picture>

          {/* Atmospheric ambient vignette for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#0E131C]/60 to-[#0E131C]/90 md:from-transparent md:via-[#0E131C]/40 md:to-[#0E131C]/95" />

          {/* Campaign Edition Pill (Top Left) */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/20 rounded-xs">
            <Sparkles size={12} className="text-amber-300" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white font-semibold">
              Spring-Summer 2026 Capsule
            </span>
          </div>

          {/* Copy Container (Positioned in the Right Negative Space on Desktop) */}
          <div className="relative z-10 w-full flex flex-col justify-end md:justify-center items-start md:items-end p-8 sm:p-12 lg:p-16">
            <div className="max-w-lg text-left md:text-left bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0 rounded-xl md:rounded-none border border-white/10 md:border-none">
              {/* Decorative Line */}
              <div className="w-12 h-px bg-amber-200/60 mb-5" />

              {/* Small Label */}
              <p className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-200/90 mb-3">
                THE ZAMYAA INNER CIRCLE
              </p>

              {/* Main Editorial Heading */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-[1.08] mb-5">
                Early Access, <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-neutral-300">Always.</span>
              </h2>

              {/* Supporting Text */}
              <p className="font-body text-sm sm:text-base text-neutral-300 leading-relaxed mb-8 max-w-md">
                Be the first to discover new collections, exclusive launches and stories from our atelier.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/collections/neel-pushp"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white text-black hover:bg-neutral-200 text-xs font-body uppercase tracking-[0.2em] font-semibold transition-all duration-200 shadow-sm cursor-pointer"
                >
                  EXPLORE EARLY ACCESS <ArrowRight size={14} />
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center justify-center text-xs font-body uppercase tracking-[0.18em] text-neutral-300 hover:text-white py-2 underline-offset-4 hover:underline transition-colors"
                >
                  Read Atelier Story
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
