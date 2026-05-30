"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import { urlFor } from "@/lib/sanity/image";

interface Collection {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage: { asset: { _ref: string } };
}

const FALLBACKS = [
  {
    name: "Sunehary Dhoop",
    desc: "Golden hues, effortless grace",
    slug: "sunehary-dhoop",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6MM5ZKpxO0oRAB-gV24JxamzG1SHDSciuOkOnTXfk4F3Jf4WY7ZVATOgcbJ0Ni8mEhqZ30JCAjhm0eFoAEu1iP3tvCCQA6zIUekz-1x3Tk-6lqGXRgzp-FMtRvTO2VCwIPhimoxPcTCLGEw701ihEpym03JbgVqavK6jjSFZCw72r3svvBdzwjk-9lV6tvoNxPsRsZWujbpbuWc4SkM-i4T1s3dcGhenpAB-3LmysqG5lhJ09mXyaI1Q5nsNKOOPaLbXBLR4wg3d3AQ",
  },
  {
    name: "Desi Dastaan",
    desc: "Contemporary festive edit",
    slug: "desi-dastaan",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtv7eFs1zc_8Sr9r-O0Q4YmDQFpYwIo_cXfqUivDRtqXftB23nTe5BXuKLJFYtori7D6u2QsTN-gmFDe3-A2_K3ISqA0dZ0HjQLYVLGcZNKKgX7rkLPYusqhHcIpUZ1UWNoogJ5qgsxt1QDHPMOg53b_xhWSuicERzm86-oUldM8sFJ42zbEGybaLaKh2-RW_2G463a98HGBHdxETeQn-V0wlaVHpoIMS55jql82j4yTYBjXAp7DnTlb12HNIMH1N3XWrZqhkmDxpkDg",
  },
  {
    name: "Neel Pushp",
    desc: "Fine hand-embroidered signatures",
    slug: "neel-pushp",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6eoJYbR6FzsqG_ui0Cd5plo8898YgoTCjxFwWCU2KUWWPbBMPvy30tlA1xALs6VAAUZHG9O3j9PSxK87DBq5j3XTdtyuAXf_HLnCkH9_za4YYd7kaowtlrgmEfyL1nPsY48SdjH1_U4I7VhBt6BYEluNgP7zh-rYvpyCIIKpBJZ6MK0SXVIqIj7trLDKalTRGpgVn8mOqETS87sYI2rNKh0pCFMjbwSn7VaQhPwcg8YK0tbIS9Tn3eOd-vqDVmB8JXPEsOrrh3_Axjw",
  },
];

function getImageUrl(img: any): string {
  if (!img) return FALLBACKS[0].image;
  if (typeof img === "string") return img;
  try { return urlFor(img).url(); } catch { return FALLBACKS[0].image; }
}

export default function FeaturedCollections({ collections }: { collections: Collection[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const items = collections?.length > 0
    ? collections.map(c => ({
        name: c.name,
        desc: c.description || "",
        slug: `/collections/${c.slug}`,
        image: getImageUrl(c.coverImage),
      }))
    : FALLBACKS.map(f => ({ ...f, slug: `/collections/${f.slug}` }));

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section style={{ padding: "80px 6% 80px", background: "var(--color-background)" }}
      className="md:py-[140px] md:px-[8%]">
      {/* Section header */}
      <RevealOnScroll>
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "64px",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "1px", background: "var(--color-accent)", flexShrink: 0 }} />
              <span style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase" as const,
                color: "var(--color-accent)",
              }}>
                Seasonal Edit
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 72px)",
              fontWeight: 300,
              letterSpacing: "0.02em",
              lineHeight: 1.05,
              color: "var(--color-foreground)",
            }}>
              The Collections
            </h2>
          </div>

          {/* Action and Arrow controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <Link href="/collections" style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: "var(--color-accent)",
              textDecoration: "none",
              paddingBottom: "4px",
              borderBottom: "1px solid var(--color-accent)",
            }}>
              View All
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => handleScroll("left")}
                aria-label="Scroll Left"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid var(--color-border-strong)",
                  background: "transparent",
                  color: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-accent)";
                  (e.currentTarget as HTMLElement).style.color = "var(--color-background)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => handleScroll("right")}
                aria-label="Scroll Right"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid var(--color-border-strong)",
                  background: "transparent",
                  color: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "var(--color-accent)";
                  (e.currentTarget as HTMLElement).style.color = "var(--color-background)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Collections horizontal scroll view */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 hide-scrollbar scroll-smooth snap-x snap-mandatory pb-4"
        style={{
          scrollPaddingLeft: "4%",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((item, i) => (
          <div 
            key={item.slug} 
            className="snap-start flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[31vw]"
          >
            <RevealOnScroll delay={i + 1}>
              <Link href={item.slug} style={{ display: "block", textDecoration: "none", color: "inherit" }} className="group">
                {/* Image — fixed aspect ratio, never overflows */}
                <div className="relative overflow-hidden bg-card" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center", transition: "transform 1s ease" }}
                    className="group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Number badge */}
                  <div style={{
                    position: "absolute", top: "16px", left: "16px",
                    fontFamily: "var(--font-display)", fontSize: "11px",
                    letterSpacing: "0.2em", color: "rgba(255,255,255,0.6)",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                      style={{
                        fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500,
                        letterSpacing: "0.25em", textTransform: "uppercase" as const,
                        color: "white", border: "1px solid rgba(255,255,255,0.5)", padding: "10px 24px",
                      }}>
                      Shop Now
                    </span>
                  </div>
                </div>
                {/* Caption */}
                <div style={{ marginTop: "16px" }}>
                  <h3 className="group-hover:text-accent transition-colors" style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.5vw, 28px)",
                    fontWeight: 300, letterSpacing: "0.03em", color: "var(--color-foreground)", marginBottom: "6px",
                  }}>
                    {item.name}
                  </h3>
                  {item.desc && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 300, color: "var(--color-muted)" }}>
                      {item.desc}
                    </p>
                  )}
                </div>
              </Link>
            </RevealOnScroll>
          </div>
        ))}
      </div>
    </section>
  );
}
