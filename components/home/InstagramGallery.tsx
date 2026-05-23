import Image from "next/image";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

const PHOTOS = [
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuW0EGymzL_0jxHoO6fK9K9XIRtzoZo4FzRk_QjK2XAPBmk3GqqFuEi6wJnsLwMPqrGoceTNQfraZk3TNwCHkUOdM911x5rMW3_IK20GL9hljqUzIamcskDc3bG7lfIY2ZJf2IniCWJY1M8Rfcfz3RR77CTSFcoGYAhIVy1g1UvxYMa6bWEAg0gEHbbQbC8bK6qk0eDzCaoxtwRLjNaRnbxUaFleNDGPv0kjyb762tIrmAVoPscTh53WGwmd3m9oEqmvqobFP76qe4Ig", alt: "Muse 1" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXjnQARdrxCHoGGjPn3ozECG07BN9zFdAYgv9sVt7S7gsXh0gCOVFtu2-iHmHN8WNVvUkO0MVAYmw0I7Cf50RbZTjzajxbMJbNt8yYktAxr0RoANSTHp173U9PnosAN59hfhRzPfRTEjbZ0IEKMpbaxDrVJxocZBbaIBFPSc2dYD33ZpR8ZRNNJ8mexPdt_80Ak64AxtCnMM7UNYvVlGKpr_VIsqztLRE0h_dMNqWzhTk98AN82Ewb_LwFwc18Uq19Yg1_rRhQeJlYqw", alt: "Muse 2" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY5ulqX4B_gPhYfUBmhgEQK4v9kD7J6EXvc_-SYoLeNwD5Ac1L8oi1aflM-GKW2eXNbuWwehW8GldtDwk5g_cXDhu1sS655DQpf_myJ5i_b2NcYxnT3LZamfKKC7P6cKF6GLmYGygGCFy9kLkclnK_tSG-Xxwq5JLO1fHCZHKMxFUP26JGQEeYoMq0b7yVbZe-uIl4XeyVsIE7GPU0m9Ipa38KK6L5PjHcrHof2riGeJZBAH_ULMWzvBwfz7miFZM-oc7_gMA2Cn_auw", alt: "Muse 3" },
  { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuALtEGv8VkNpilv5zQ1yF2WRk_QeLOZDBUp4OKrPFDvQJkGmbKkoAeRzQ8JOBFpZnkLkUkdEJ07YnKvIbBHLsK_zOFKXCN7VGDQXbDAns2_oo7FOi5uavp78XpSG_MreT510i5893t7vtouiB0QOwYyPm0J51VukMz9QEpLPmXXnvDXlbNTCztvQ8gPbqdvlMRYT5vqD2XtcnR7bSvWCrS7_w5NxjrvI_odgT6u4NrQ1h011ITjEw_-iYoq4_qVotSjlPxyYRRrbKvkjg", alt: "Muse 4" },
];

export default function InstagramGallery() {
  return (
    <section className="py-20 md:py-[120px] px-[6%] md:px-[8%]" style={{ background: "var(--color-card)" }}>
      {/* Header */}
      <RevealOnScroll>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "16px",
            }}
          >
            Follow our journey
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 5vw, 68px)",
              fontWeight: 300,
              letterSpacing: "0.02em",
              color: "var(--color-foreground)",
              marginBottom: "8px",
            }}
          >
            #ZamyaaMuse
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.1em",
              color: "var(--color-muted)",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            @zamyaa.by.jyoti
          </a>
        </div>
      </RevealOnScroll>

      {/* Photo grid — 2 columns on mobile, 4 columns on tablet/desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {PHOTOS.map((photo, i) => (
          <RevealOnScroll key={i} delay={i + 1}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                position: "relative",
                aspectRatio: i === 0 || i === 3 ? "4/5" : "1/1",
                overflow: "hidden",
                background: "var(--color-surface)",
              }}
              className="group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                style={{
                  objectFit: "cover",
                  transition: "transform 0.8s cubic-bezier(0.43, 0.13, 0.23, 0.96)",
                  filter: "brightness(0.9)",
                }}
                className="group-hover:scale-105 group-hover:brightness-75"
                sizes="(max-width: 640px) 50vw, 25vw"
              />

              {/* Instagram hover overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.4s ease",
                }}
                className="group-hover:opacity-100"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" opacity={0.9}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                </svg>
              </div>
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
