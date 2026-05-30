"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";

interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: { asset: { _ref: string } };
  ctaText?: string;
  ctaLink?: string;
}

const FALLBACK_HERO = {
  title: "The Essence of\nEthereal Elegance",
  subtitle: "Desi Dastaan — Spring Edit",
  description: "Handcrafted silhouettes inspired by earth and indigo skies.",
  ctaText: "Explore Collection",
  ctaLink: "/collections",
  image: "/images/hero.png",
};

export default function HeroBanner({ banners }: { banners: Banner[] }) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const items = banners?.length > 0
    ? banners.map(b => ({
      title: b.title,
      subtitle: b.subtitle || "",
      description: b.description || "",
      ctaText: b.ctaText || "Explore",
      ctaLink: b.ctaLink || "/collections",
      image: (() => { try { return urlFor(b.image).url(); } catch { return FALLBACK_HERO.image; } })(),
    }))
    : [FALLBACK_HERO];

  useEffect(() => {
    setLoaded(true);
    if (items.length <= 1) return;
    const id = setInterval(() => setCurrent(c => (c + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, []);

  const item = items[current];

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "600px",
        overflow: "hidden",
        background: "#0a0908",
      }}
    >
      {/* Background image */}
      {items.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(0.43, 0.13, 0.23, 0.96)",
            zIndex: i === current ? 1 : 0,
          }}
        >
          {/* Desktop view: 3-column vertical triptych */}
          <div
            className="hidden md:grid grid-cols-3 h-full w-full gap-[1px]"
            style={{ background: "var(--color-border)" }}
          >
            {/* Panel 1: Left */}
            <div className="relative overflow-hidden h-full">
              <Image
                src={s.image}
                alt={`${s.title} Left Detail`}
                fill
                priority={i === 0}
                quality={90}
                sizes="(max-width: 768px) 0vw, 33vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  animation: i === current ? "heroZoomLeft 14s ease-out forwards" : "none",
                }}
              />
            </div>

            {/* Panel 2: Center */}
            <div className="relative overflow-hidden h-full">
              <Image
                src={s.image}
                alt={`${s.title} Center`}
                fill
                priority={i === 0}
                quality={90}
                sizes="(max-width: 768px) 0vw, 34vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  animation: i === current ? "heroZoomCenter 14s ease-out forwards" : "none",
                }}
              />
            </div>

            {/* Panel 3: Right */}
            <div className="relative overflow-hidden h-full">
              <Image
                src={s.image}
                alt={`${s.title} Right Detail`}
                fill
                priority={i === 0}
                quality={90}
                sizes="(max-width: 768px) 0vw, 33vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  animation: i === current ? "heroZoomRight 14s ease-out forwards" : "none",
                }}
              />
            </div>
          </div>

          {/* Mobile view: Single cover image */}
          <div className="block md:hidden relative h-full w-full">
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={i === 0}
              quality={90}
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
                animation: i === current ? "heroZoomCenter 12s ease-out forwards" : "none",
              }}
            />
          </div>
        </div>
      ))}

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(to bottom, rgba(10,9,8,0.25) 0%, rgba(10,9,8,0.15) 40%, rgba(10,9,8,0.75) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(to right, rgba(10,9,8,0.55) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          display: "flex",
          alignItems: "flex-end",
          padding: "0 6% 80px",
        }}
      >
        <div style={{ maxWidth: "700px" }}>
          {/* Label */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.9s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div style={{ width: "30px", height: "1px", background: "var(--color-accent)" }} />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
              }}
            >
              {item.subtitle || "New Collection"}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 7vw, 84px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "0.01em",
              color: "#f5f0e8",
              marginBottom: "20px",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              whiteSpace: "pre-line",
            }}
          >
            {item.title}
          </h1>

          {/* Desc */}
          {item.description && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "rgba(245, 240, 232, 0.65)",
                marginBottom: "40px",
                maxWidth: "480px",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: "all 1s 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              {item.description}
            </p>
          )}

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 1s 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <Link
              href={item.ctaLink}
              className="w-full sm:w-auto justify-center"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 30px",
                background: "var(--color-accent)",
                color: "#0a0908",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-accent-light)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {item.ctaText}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto justify-center text-center"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 30px",
                border: "1px solid rgba(245, 240, 232, 0.3)",
                color: "rgba(245, 240, 232, 0.85)",
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
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(245, 240, 232, 0.3)";
                (e.currentTarget as HTMLElement).style.color = "rgba(245, 240, 232, 0.85)";
              }}
            >
              Our Atelier
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "6%",
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          opacity: loaded ? 0.6 : 0,
          transition: "opacity 1s 1.2s ease",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--color-foreground)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, var(--color-accent), transparent)",
          }}
        />
      </div>

      {/* Slide indicators */}
      {items.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 4,
            display: "flex",
            gap: "8px",
          }}
        >
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "24px" : "6px",
                height: "2px",
                background: i === current ? "var(--color-accent)" : "rgba(245, 240, 232, 0.3)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.4s ease",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
