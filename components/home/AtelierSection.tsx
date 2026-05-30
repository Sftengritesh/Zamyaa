"use client";

import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

export default function AtelierSection() {
  return (
    <section style={{ background: "var(--color-card)", padding: "80px 6%" }}
      className="md:py-[140px] md:px-[8%]">
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Grid: image left on desktop, text right on desktop. Stack on mobile. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Image column — first on desktop, second on mobile */}
          <RevealOnScroll className="order-2 md:order-1">
            <div className="relative">
              {/* Main image — contained aspect ratio */}
              <div className="relative overflow-hidden img-zoom" style={{ aspectRatio: "3/2", maxHeight: "380px" }}>
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUk2rJQDoMLwAix3ACU8lXOZ8G1rzlKu76GJZanLTfX9vh6ugTbFHunnHXMW9Jrlp9KrzYl_ArVVzlaAGpxdOJMyBclIXYKaXb_QRn6_8Bsx4mpdgWMnkLPtIP7CV1Tsu7O6fk3huMtxoZRF2lT2J8Bp51HJkEQXzAs771FsyH7ccX-xlwodHBxYh9BParBqg6ttfXjte1suQ-tYBfYTiBQdnpmoiAqgECMBvwAGkWPQtMXIBm1mJSNyFq7R_nOYhAK2qNt6_JGvvAPQ"
                  alt="Artisan at work"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Small accent swatch — bottom right, safely inside parent */}
              <div className="absolute overflow-hidden hidden md:block img-zoom"
                style={{ bottom: "-16px", right: "-16px", width: "100px", height: "130px",
                  border: "3px solid var(--color-card)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjvo3pYIf5Xim_LwL8QkpNvK7B9AUg55Xe0oJsCihFFE6yPFa5y6NucSoT1dyuvbnDdK1bWIToct15WMj1N-MhWdIpwVceGB09mdzY7wbQXOWQSMn-ocYh7WH9A5nEnsdSGlrXNisQjlQtKCm6roQrBLA-3zDbC5fko1ZjfMnDO-h3Esw6fq6ImSJplCUJ4NVbO0ZsVXslok4HPnFETOFRHtC63wR8nDmIIrloyfpRyDmPRjcP6JrkGPMVzpJSJeyI1F72z2on_5M"
                  alt="Embroidery detail"
                  fill style={{ objectFit: "cover" }} sizes="100px"
                />
              </div>
              {/* Gold accent line */}
              <div className="absolute hidden md:block"
                style={{ top: "20px", left: "-12px", width: "1px", height: "50%",
                  background: "linear-gradient(to bottom, var(--color-accent), transparent)" }} />
            </div>
          </RevealOnScroll>

          {/* Text column — first on mobile, second on desktop */}
          <RevealOnScroll delay={1} className="order-1 md:order-2">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "24px", height: "1px", background: "var(--color-accent)", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500,
                letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--color-accent)" }}>
                The Process
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 68px)",
              fontWeight: 300, lineHeight: 1.05, letterSpacing: "0.02em",
              color: "var(--color-foreground)", marginBottom: "24px" }}>
              The Ethereal<br />Atelier
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 300, lineHeight: 1.8,
              color: "var(--color-muted)", marginBottom: "16px" }}>
              Every Zamyaa piece is a labor of love, born in our sun-drenched atelier. Our artisans meticulously weave silver threads into the finest fabrics.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 300, lineHeight: 1.8,
              color: "var(--color-muted)", marginBottom: "40px" }}>
              From handloom to heirloom — each silhouette carries the fingerprints of craftswomen who have dedicated their lives to this art.
            </p>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10 pt-7"
              style={{ borderTop: "1px solid var(--color-border)" }}>
              {[{ num: "12+", label: "Years" }, { num: "200+", label: "Artisans" }, { num: "100%", label: "Handmade" }]
                .map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 36px)",
                      fontWeight: 300, color: "var(--color-accent)", lineHeight: 1, marginBottom: "6px" }}>
                      {s.num}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 400,
                      letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--color-muted)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
            </div>
            <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: "12px",
              fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 500,
              letterSpacing: "0.2em", textTransform: "uppercase" as const,
              color: "var(--color-accent)", textDecoration: "none",
              borderBottom: "1px solid var(--color-accent)", paddingBottom: "4px" }}>
              Discover the Atelier
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
