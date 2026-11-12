import { Link } from 'react-router-dom'
import { ShieldCheck, Mail, Phone, MessageCircle, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ReplacementPolicyPage() {
  return (
    <div className="bg-white min-h-screen text-black">
      {/* Hero Header */}
      <section className="border-b border-neutral-200 bg-[#FAF9F6] py-14 sm:py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-black mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Homepage
          </Link>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-px bg-black" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
              Atelier Client Services
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-light tracking-tight text-neutral-900 mb-4">
            Replacement Policy
          </h1>
          <p className="font-body text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
            In alignment with our bespoke atelier philosophy and handcrafted luxury standards, Zamyaa operates under a dedicated Replacement Policy. We do not offer returns or refunds.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Important Highlight Box */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#FAF4F3] border border-[#EEDCD9] flex items-start gap-4">
            <AlertCircle size={24} className="text-[#B08882] shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h3 className="font-body font-bold text-sm sm:text-base uppercase tracking-wider text-black">
                Important Policy Notice
              </h3>
              <p className="font-body text-xs sm:text-sm text-neutral-700 leading-relaxed">
                Zamyaa creations are crafted in small artisanal batches with delicate handloom silks and intricate embroidery. To preserve the pristine condition and authenticity of every garment, <strong>we offer replacements only</strong>. We do not offer returns or monetary refunds under any circumstances.
              </p>
            </div>
          </div>

          {/* Replacement Eligibility Criteria */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-normal text-black border-b pb-3 border-neutral-200">
              When Is a Product Eligible for Replacement?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-neutral-200 bg-neutral-50 space-y-3">
                <div className="flex items-center gap-2 text-black font-semibold text-sm">
                  <CheckCircle2 size={18} className="text-emerald-700" />
                  <span>Size &amp; Fit Adjustments</span>
                </div>
                <p className="font-body text-xs text-neutral-600 leading-relaxed">
                  If the ordered piece does not fit as desired, you can request an exchange for another available size in the same design within 48 hours of delivery.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-neutral-200 bg-neutral-50 space-y-3">
                <div className="flex items-center gap-2 text-black font-semibold text-sm">
                  <ShieldCheck size={18} className="text-emerald-700" />
                  <span>Transit Damage or Defect</span>
                </div>
                <p className="font-body text-xs text-neutral-600 leading-relaxed">
                  In the rare event that an item arrives with transit damage or an uncharacteristic manufacturing flaw, notify us with unboxing photos within 48 hours for an immediate replacement piece.
                </p>
              </div>
            </div>
          </div>

          {/* Steps to Request Replacement */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-normal text-black border-b pb-3 border-neutral-200">
              How to Request a Replacement
            </h2>
            <ol className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Notify Our Atelier within 48 Hours',
                  desc: 'Contact our concierge via WhatsApp or Email within 48 hours of parcel receipt, quoting your Order ID.',
                },
                {
                  step: '02',
                  title: 'Provide Condition Photographs',
                  desc: 'Share clear photos of the garment showing tags intact, unworn condition, and original luxury packaging.',
                },
                {
                  step: '03',
                  title: 'Secure Reverse Pick-Up',
                  desc: 'Our logistics partners will coordinate a secure pick-up from your doorstep. Once inspected at our atelier, your replacement unit will be dispatched.',
                },
              ].map((item) => (
                <li key={item.step} className="flex gap-4 p-5 rounded-lg border border-neutral-200/80 bg-white shadow-2xs">
                  <span className="font-mono text-sm font-bold text-neutral-400 mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-body font-semibold text-sm text-black mb-1">
                      {item.title}
                    </h4>
                    <p className="font-body text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Contact Concierge Strip */}
          <div className="p-8 rounded-xl bg-neutral-900 text-white space-y-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-200 mb-1">
                Atelier Client Concierge
              </p>
              <h3 className="font-display text-2xl font-light">
                Need Help with a Replacement?
              </h3>
              <p className="font-body text-xs sm:text-sm text-neutral-300 mt-2">
                Our support team is available Monday to Saturday, 10:00 AM – 7:00 PM IST.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://wa.me/918427233901"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-md transition-colors"
              >
                <MessageCircle size={15} /> WhatsApp +91 8427233901
              </a>
              <a
                href="mailto:jyotisharma120099@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-md border border-white/20 transition-colors"
              >
                <Mail size={15} /> jyotisharma120099@gmail.com
              </a>
              <a
                href="tel:+918427233901"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-md border border-white/20 transition-colors"
              >
                <Phone size={15} /> +91 8427233901
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
