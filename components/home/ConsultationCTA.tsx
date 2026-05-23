"use client";

import Link from "next/link";
import Image from "next/image";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

export default function ConsultationCTA() {
  return (
    <section
      className="section-luxury"
      style={{
        background: "var(--color-background)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image with deep overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzZBQhYaAGFT6RT9gu8G_40ZOc71klrBrI1cXVDyW3uUzchKIwtTMah3_LXyFLUNRPIxTUs1YO9ggvHdvx0dKxzprJaIcieYQotZBUnKgSBbmhHT32fQXRK6oG-IM7e0tMunqmA3bRbgmHVMi6e7NvScZLAoyt-We2BWLUgUn9xLCZrOMfM4ZkIUhiWaNH1XprLdptL1S-065F7kUGIhUcqn5fY0IYfdEPBLOPDptpW03HQi5_lxu5vX-UiH2mBRuel-8JLMTLnuFEng"
          alt=""
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center 40%",
            filter: "brightness(0.15) saturate(0.5)",
          }}
          aria-hidden
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, var(--color-background) 0%, rgba(10,9,8,0.7) 50%, var(--color-background) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <RevealOnScroll>
          {/* Top ornament */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <div style={{ width: "60px", height: "1px", background: "var(--color-border-strong)" }} />
            <div style={{ width: "6px", height: "6px", background: "var(--color-accent)", transform: "rotate(45deg)" }} />
            <div style={{ width: "60px", height: "1px", background: "var(--color-border-strong)" }} />
          </div>

          <span
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "24px",
            }}
          >
            Private Consultation
          </span>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 6vw, 84px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "0.02em",
              color: "var(--color-foreground)",
              marginBottom: "28px",
            }}
          >
            Styled for You,<br />By Our Artisans
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "var(--color-muted)",
              marginBottom: "56px",
              maxWidth: "560px",
              margin: "0 auto 56px",
            }}
          >
            Experience the Zamyaa atelier from the comfort of your home, or visit our studio for a bespoke styling session curated just for you.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 44px",
                background: "var(--color-accent)",
                color: "#0a0908",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.4s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-accent-light)";
                (e.currentTarget as HTMLElement).style.letterSpacing = "0.25em";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.letterSpacing = "0.2em";
              }}
            >
              Book Appointment
            </Link>

            <Link
              href="/collections"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "16px 40px",
                border: "1px solid var(--color-border-strong)",
                color: "var(--color-foreground)",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.4s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-strong)";
                (e.currentTarget as HTMLElement).style.color = "var(--color-foreground)";
              }}
            >
              Browse Collections
            </Link>
          </div>

          {/* Bottom ornament */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginTop: "80px",
            }}
          >
            <div style={{ width: "60px", height: "1px", background: "var(--color-border)" }} />
            <div style={{ width: "4px", height: "4px", background: "var(--color-muted)", transform: "rotate(45deg)" }} />
            <div style={{ width: "60px", height: "1px", background: "var(--color-border)" }} />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
