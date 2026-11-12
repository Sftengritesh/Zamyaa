import { Link } from 'react-router-dom'
import { Scissors, Truck, RefreshCw, Headphones, ArrowUpRight } from 'lucide-react'

export interface BenefitItem {
  icon: React.ReactNode
  title: string
  description: string
  actionText: string
  link: string
  bgColor: string
  borderColor: string
  accentColor: string
}

const BENEFITS: BenefitItem[] = [
  {
    icon: <Scissors size={22} className="text-neutral-800" />,
    title: 'COMPLIMENTARY ALTERATIONS',
    description: 'Free alterations to help achieve your perfect fit.',
    actionText: 'Bespoke Inquiries',
    link: '/contact',
    bgColor: '#FAF7F2', // Warm Ivory / Sand
    borderColor: '#EAE4D9',
    accentColor: '#9C8E7B',
  },
  {
    icon: <Truck size={22} className="text-neutral-800" />,
    title: 'DELIVERY TO YOUR DOOR',
    description: 'Your favourite styles, delivered with care.',
    actionText: 'Express Dispatch',
    link: '/contact',
    bgColor: '#F4F6F2', // Muted Sage Mist
    borderColor: '#DFE5DD',
    accentColor: '#7C8A79',
  },
  {
    icon: <RefreshCw size={22} className="text-neutral-800" />,
    title: 'REPLACEMENT AVAILABLE',
    description: 'No returns. Eligible products can be replaced under our replacement policy.',
    actionText: 'Replacement Policy',
    link: '/replacement-policy',
    bgColor: '#FAF4F3', // Dusty Rose / Soft Blush Stone
    borderColor: '#EEDCD9',
    accentColor: '#B08882',
  },
  {
    icon: <Headphones size={22} className="text-neutral-800" />,
    title: 'HERE TO HELP',
    description: 'Easy access to our team whenever you need assistance.',
    actionText: 'Atelier Concierge',
    link: '/contact',
    bgColor: '#F7F6F3', // Soft Stone / Champagne
    borderColor: '#E7E3DC',
    accentColor: '#8E877B',
  },
]

export default function CustomerBenefitsStrip() {
  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-white border-t border-black/5">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Eyebrow */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-semibold mb-2">
            The Atelier Standard
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-normal text-black tracking-tight">
            Crafted with Care. Delivered with Confidence.
          </h3>
        </div>

        {/* 4 Distinct Service Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {BENEFITS.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer select-none"
              style={{
                backgroundColor: item.bgColor,
                borderColor: item.borderColor,
              }}
            >
              <div>
                {/* Icon Circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-5 bg-white shadow-2xs border transition-transform duration-300 group-hover:scale-105"
                  style={{ borderColor: item.borderColor }}
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h4 className="font-body font-bold text-xs sm:text-[13px] tracking-[0.14em] uppercase text-black mb-2.5 leading-snug">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="font-body text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Action Link */}
              <div className="mt-6 pt-4 border-t flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-700 group-hover:text-black font-semibold"
                style={{ borderColor: `${item.borderColor}` }}
              >
                <span>{item.actionText}</span>
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

