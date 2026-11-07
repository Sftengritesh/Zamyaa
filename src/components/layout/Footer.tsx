import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { InstagramIcon, TwitterIcon, YoutubeIcon } from '@/components/ui/SocialIcons'
import Logo from '@/components/ui/Logo'

const footerLinks = {
  shop: [
    { label: 'All Collections', to: '/collections' },
    { label: 'New In', to: '/collections?filter=new' },
    { label: 'Lantana — AW2025', to: '/collections/lantana' },
    { label: 'Noor-e-Rang', to: '/collections/noor-e-rang' },
    { label: 'Gift Cards', to: '/gift-cards' },
  ],
  help: [
    { label: 'Size Guide', to: '/size-guide' },
    { label: 'Shipping & Returns', to: '/shipping' },
    { label: 'Care Instructions', to: '/care' },
    { label: 'Bespoke Tailoring', to: '/bespoke' },
    { label: 'Contact Us', to: '/contact' },
  ],
  about: [
    { label: 'Our Story', to: '/about' },
    { label: 'Artisan Partners', to: '/artisans' },
    { label: 'Sustainability', to: '/sustainability' },
    { label: 'Press', to: '/press' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-[var(--color-on-primary)]">
      {/* Newsletter */}
      <div className="border-b border-[var(--color-on-primary)]/10 px-5 md:px-16 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[0.75rem] tracking-[0.25em] uppercase font-semibold font-body opacity-60 mb-2">
              Join the Edit
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-normal leading-tight">
              Receive Early Access to New Collections,<br className="hidden md:block" />
              Campaign Launches & Artisan Stories
            </h3>
          </div>
          <form className="flex w-full md:w-auto gap-0" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 bg-transparent border border-[var(--color-on-primary)]/30 px-5 py-3.5 text-sm font-body text-[var(--color-on-primary)] placeholder-[var(--color-on-primary)]/40 focus:outline-none focus:border-[var(--color-on-primary)]"
            />
            <button
              type="submit"
              className="bg-[var(--color-on-primary)] text-[var(--color-primary)] px-5 py-3.5 hover:bg-[var(--color-on-primary)]/90 transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Main links */}
      <div className="px-5 md:px-16 py-14 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1 space-y-6">
          <Logo size="md" inverted={true} />
          <p className="font-body text-sm opacity-60 leading-relaxed max-w-xs">
            Luxury Indian fashion rooted in heritage craft — handwoven silks, artisanal embroidery, and contemporary silhouettes for the modern muse.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="opacity-60 hover:opacity-100 transition-opacity">
              <InstagramIcon size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
              className="opacity-60 hover:opacity-100 transition-opacity">
              <TwitterIcon size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
              className="opacity-60 hover:opacity-100 transition-opacity">
              <YoutubeIcon size={18} />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <p className="text-[0.7rem] tracking-[0.22em] uppercase font-semibold opacity-50 mb-5 font-body">Shop</p>
          <ul className="space-y-3">
            {footerLinks.shop.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <p className="text-[0.7rem] tracking-[0.22em] uppercase font-semibold opacity-50 mb-5 font-body">Help</p>
          <ul className="space-y-3">
            {footerLinks.help.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About & Contact */}
        <div>
          <p className="text-[0.7rem] tracking-[0.22em] uppercase font-semibold opacity-50 mb-5 font-body">About</p>
          <ul className="space-y-3 mb-8">
            {footerLinks.about.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-2">
            <a href="mailto:hello@zamyaa.in" className="flex items-center gap-2 opacity-60 hover:opacity-100 text-sm font-body transition-opacity">
              <Mail size={14} /> hello@zamyaa.in
            </a>
            <a href="tel:+919999999999" className="flex items-center gap-2 opacity-60 hover:opacity-100 text-sm font-body transition-opacity">
              <Phone size={14} /> +91 99999 99999
            </a>
            <p className="flex items-start gap-2 opacity-60 text-sm font-body">
              <MapPin size={14} className="mt-0.5 shrink-0" /> Mumbai · Jaipur · Delhi
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-on-primary)]/10 px-5 md:px-16 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs opacity-40">
            © {new Date().getFullYear()} Zamyaa by Jyoti. All rights reserved. Made with love in India.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t) => (
              <Link key={t} to="#" className="font-body text-xs opacity-40 hover:opacity-70 transition-opacity">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

