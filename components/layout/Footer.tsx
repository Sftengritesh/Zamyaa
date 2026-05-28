"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname?.startsWith("/studio") || pathname?.startsWith("/admin")) return null;

  return (
    <footer
      style={{
        background: "#080706",
        borderTop: "1px solid rgba(201, 168, 76, 0.12)",
        padding: "80px 8% 40px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Top section — uses native Tailwind responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10" style={{ marginBottom: "64px" }}>
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "28px",
                fontWeight: 300,
                letterSpacing: "0.35em",
                color: "var(--color-foreground)",
                marginBottom: "20px",
              }}
            >
              ZAMYAA
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "var(--color-muted)",
                marginBottom: "28px",
              }}
            >
              Handcrafted ethnic fashion. Timeless silhouettes woven with heritage and modern elegance.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                {
                  href: "https://instagram.com",
                  label: "Instagram",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  ),
                },
                {
                  href: "https://wa.me/919876543210",
                  label: "WhatsApp",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                  ),
                },
                {
                  href: "mailto:hello@zamyaa.com",
                  label: "Email",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "1px solid rgba(201, 168, 76, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-muted)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201, 168, 76, 0.2)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Explore",
              links: [
                { label: "Collections", href: "/collections" },
                { label: "New Arrivals", href: "/collections" },
                { label: "About Zamyaa", href: "/about" },
                { label: "Our Atelier", href: "/about" },
              ],
            },
            {
              title: "Help",
              links: [
                { label: "Contact Us", href: "/contact" },
                { label: "Book Appointment", href: "/contact" },
                { label: "Size Guide", href: "/contact" },
                { label: "Care Instructions", href: "/about" },
              ],
            },
            {
              title: "Get in Touch",
              links: [
                { label: "hello@zamyaa.com", href: "mailto:hello@zamyaa.com" },
                { label: "+91 98765 43210", href: "tel:+919876543210" },
                { label: "WhatsApp Us", href: "https://wa.me/919876543210" },
                { label: "Zamyaa Atelier, India", href: "#" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                  marginBottom: "24px",
                }}
              >
                {col.title}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "var(--color-muted)",
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--color-foreground)")}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--color-muted)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(201, 168, 76, 0.08)",
            paddingTop: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            textAlign: "center",
          }}
          className="md:flex-row md:justify-between"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "inherit" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 300,
                letterSpacing: "0.1em",
                color: "var(--color-muted-foreground)",
              }}
            >
              © {year} ZAMYAA BY JYOTI — All Rights Reserved
            </p>
            <Link
              href="/admin"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(201, 168, 76, 0.4)",
                transition: "color 0.3s ease",
                textDecoration: "none",
                display: "inline-block"
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--color-accent)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(201, 168, 76, 0.4)")}
            >
              Boutique Portal
            </Link>
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "11px",
              fontStyle: "italic",
              color: "rgba(201, 168, 76, 0.4)",
              letterSpacing: "0.05em",
            }}
          >
            Handcrafted with love in India
          </p>
        </div>
      </div>
    </footer>
  );
}
