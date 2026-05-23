import Image from "next/image";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

export default function HeritageSection() {
  return (
    <section style={{ background: "var(--color-background)", overflow: "hidden", padding: "80px 6%" }}
      className="md:py-[140px] md:px-[8%]">
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <RevealOnScroll>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="flex items-center justify-center gap-4 mb-5">
              <div style={{ width: "40px", height: "1px", background: "var(--color-border-strong)" }} />
              <div style={{ width: "5px", height: "5px", background: "var(--color-accent)", transform: "rotate(45deg)" }} />
              <div style={{ width: "40px", height: "1px", background: "var(--color-border-strong)" }} />
            </div>
            <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500,
              letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "var(--color-accent)", marginBottom: "16px" }}>
              Signature Accent
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5.5vw, 80px)",
              fontWeight: 300, lineHeight: 1.05, color: "var(--color-foreground)", letterSpacing: "0.02em" }}>
              The Silver Thread<br />of Heritage
            </h2>
          </div>
        </RevealOnScroll>

        {/* Contained image — max height capped so it doesn't dominate page */}
        <RevealOnScroll delay={1}>
          <div className="relative overflow-hidden mb-14"
            style={{ width: "100%", height: "clamp(200px, 35vw, 480px)" }}>
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzZBQhYaAGFT6RT9gu8G_40ZOc71klrBrI1cXVDyW3uUzchKIwtTMah3_LXyFLUNRPIxTUs1YO9ggvHdvx0dKxzprJaIcieYQotZBUnKgSBbmhHT32fQXRK6oG-IM7e0tMunqmA3bRbgmHVMi6e7NvScZLAoyt-We2BWLUgUn9xLCZrOMfM4ZkIUhiWaNH1XprLdptL1S-065F7kUGIhUcqn5fY0IYfdEPBLOPDptpW03HQi5_lxu5vX-UiH2mBRuel-8JLMTLnuFEng"
              alt="Heritage fabric"
              fill
              style={{ objectFit: "cover", objectPosition: "center 30%", filter: "brightness(0.85)" }}
              sizes="100vw"
            />
            {/* Ghost watermark — desktop only */}
            <div className="absolute bottom-6 right-[4%] hidden md:block pointer-events-none select-none"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(60px, 10vw, 140px)",
                fontWeight: 300, letterSpacing: "0.05em", color: "rgba(201,168,76,0.1)", lineHeight: 1 }}>
              ZAMYAA
            </div>
          </div>
        </RevealOnScroll>

        {/* Bottom text row */}
        <RevealOnScroll delay={2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left quote — desktop only */}
            <div className="hidden md:block"
              style={{ borderLeft: "1px solid var(--color-border-strong)", paddingLeft: "24px" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 300,
                fontStyle: "italic" as const, lineHeight: 1.6, color: "var(--color-muted)" }}>
                "Crafted by hands that have woven stories across generations."
              </p>
            </div>
            {/* Center paragraph */}
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.5vw, 15px)", fontWeight: 300,
              lineHeight: 1.85, color: "var(--color-muted)", textAlign: "center" as const }}>
              While our aesthetic is light and ethereal, our roots are deep. We use our signature silver-threaded indigo as a subtle anchor — a reminder of the timeless heritage that flows through every contemporary silhouette.
            </p>
            {/* Right detail — desktop only */}
            <div className="hidden md:block"
              style={{ borderRight: "1px solid var(--color-border-strong)", paddingRight: "24px", textAlign: "right" as const }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500,
                letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--color-accent)", marginBottom: "8px" }}>
                Since 2012
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 300,
                fontStyle: "italic" as const, color: "var(--color-muted)" }}>
                Handloom weaving from the heartland of India
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
