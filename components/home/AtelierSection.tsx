"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

interface AtelierStep {
  step: string;
  title: string;
  description: string;
  image: string;
  details: string;
  highlights: string[];
}

const ATELIER_STEPS: AtelierStep[] = [
  {
    step: "01",
    title: "The Design & Conception",
    description: "Sketching silhouettes that balance traditional Indian drapes with modern proportions.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUk2rJQDoMLwAix3ACU8lXOZ8G1rzlKu76GJZanLTfX9vh6ugTbFHunnHXMW9Jrlp9KrzYl_ArVVzlaAGpxdOJMyBclIXYKaXb_QRn6_8Bsx4mpdgWMnkLPtIP7CV1Tsu7O6fk3huMtxoZRF2lT2J8Bp51HJkEQXzAs771FsyH7ccX-xlwodHBxYh9BParBqg6ttfXjte1suQ-tYBfYTiBQdnpmoiAqgECMBvwAGkWPQtMXIBm1mJSNyFq7R_nOYhAK2qNt6_JGvvAPQ",
    details: "Every garment begins with pencil and paper. Hand-drawn sketches form the blueprint, capturing precise pleats, falls, and the placement of metallic silver embroideries. Our patterns are tested through multiple cotton mockups to achieve a perfect, flattering flow.",
    highlights: ["Hand-sketched blueprints", "Cotton toile drape tests", "100% custom-fit measurements"]
  },
  {
    step: "02",
    title: "Sourcing & Fabric Curation",
    description: "Sourcing mulberry silks and hand-woven cottons directly from weaver cooperatives.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjvo3pYIf5Xim_LwL8QkpNvK7B9AUg55Xe0oJsCihFFE6yPFa5y6NucSoT1dyuvbnDdK1bWIToct15WMj1N-MhWdIpwVceGB09mdzY7wbQXOWQSMn-ocYh7WH9A5nEnsdSGlrXNisQjlQtKCm6roQrBLA-3zDbC5fko1ZjfMnDO-h3Esw6fq6ImSJplCUJ4NVbO0ZsVXslok4HPnFETOFRHtC63wR8nDmIIrloyfpRyDmPRjcP6JrkGPMVzpJSJeyI1F72z2on_5M",
    details: "Fabric is the soul of Zamyaa. We cooperate directly with handloom weavers across India to curate unique yarn combinations. These fabrics are then hand-dyed using organic plant-based dyes, resulting in natural, rich textures that breathe and drape beautifully.",
    highlights: ["Direct weaver partnerships", "Natural plant-based pigments", "Organic handloom cotton & silk"]
  },
  {
    step: "03",
    title: "Hand-Embroidery & Zari",
    description: "Artisans meticulously weave metallic silver threads directly into the patterns.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUk2rJQDoMLwAix3ACU8lXOZ8G1rzlKu76GJZanLTfX9vh6ugTbFHunnHXMW9Jrlp9KrzYl_ArVVzlaAGpxdOJMyBclIXYKaXb_QRn6_8Bsx4mpdgWMnkLPtIP7CV1Tsu7O6fk3huMtxoZRF2lT2J8Bp51HJkEQXzAs771FsyH7ccX-xlwodHBxYh9BParBqg6ttfXjte1suQ-tYBfYTiBQdnpmoiAqgECMBvwAGkWPQtMXIBm1mJSNyFq7R_nOYhAK2qNt6_JGvvAPQ",
    details: "Using fine needles and age-old embroidery frames, our master craftswomen apply metallic threads (Zari) to the fabric. Each leaf, motif, and vine is filled by hand. It takes between 40 to 120 hours of concentrated craftsmanship to complete a single masterpiece.",
    highlights: ["Signature metallic silver Zari", "40 - 120 hours per piece", "Generational craftswomen"]
  },
  {
    step: "04",
    title: "Precision Draping & Tailoring",
    description: "Transforming flat embroidered panels into floating three-dimensional silhouettes.",
    image: "/images/hero.png",
    details: "Our pattern master drafts each panel with absolute precision. The embroidered pieces are aligned, cut, and basted together. The final drape balances structure with comfort, ensuring the silver-threaded motifs flow gracefully along the body's natural curvature.",
    highlights: ["Custom tailored silhouettes", "Symmetrical panel matching", "Fluid movement styling"]
  },
  {
    step: "05",
    title: "Heirloom Finishing & Quality",
    description: "Every hem, hook, and seam is hand-finished and inspected under natural light.",
    image: "/images/Daastaan.png",
    details: "No garment leaves the atelier without passing a multi-point quality check. Hems are rolled by hand, seams are clean-finished, and the embroidery is pressed. Every piece is delivered in a linen heritage bag, ready to become a treasured heirloom for generations.",
    highlights: ["Hand-rolled hems & seams", "Linen protective packaging", "Multi-point heirloom checks"]
  }
];

export default function AtelierSection() {
  const [selectedStep, setSelectedStep] = useState<AtelierStep | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (selectedStep) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedStep]);

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
    <section style={{ background: "var(--color-card)", padding: "80px 6%" }}
      className="md:py-[140px] md:px-[8%]">
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <RevealOnScroll>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "56px",
            flexWrap: "wrap",
            gap: "24px"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "24px", height: "1px", background: "var(--color-accent)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500,
                  letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "var(--color-accent)" }}>
                  The Process
                </span>
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 68px)",
                fontWeight: 300, lineHeight: 1.05, letterSpacing: "0.02em",
                color: "var(--color-foreground)" }}>
                The Ethereal Atelier
              </h2>
            </div>

            {/* Scroll controls */}
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
        </RevealOnScroll>

        {/* Horizontal scroll track */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 hide-scrollbar scroll-smooth snap-x snap-mandatory pb-6"
          style={{
            scrollPaddingLeft: "4%",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {ATELIER_STEPS.map((step, idx) => (
            <div 
              key={step.step}
              onClick={() => setSelectedStep(step)}
              className="snap-start flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[31vw] group cursor-pointer"
            >
              <RevealOnScroll delay={idx + 1}>
                {/* Image card with luxury crop */}
                <div className="relative overflow-hidden bg-card border border-border/40 rounded-none aspect-[3/2] shadow-sm group-hover:shadow-card-hover group-hover:border-accent/40 transition-all duration-500">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center", transition: "transform 1s ease" }}
                    className="group-hover:scale-105"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 31vw"
                  />
                  {/* Step Overlay Index */}
                  <div style={{
                    position: "absolute", top: "16px", left: "16px",
                    fontFamily: "var(--font-display)", fontSize: "12px",
                    letterSpacing: "0.2em", color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                  }}>
                    {step.step}
                  </div>
                  {/* Learn More Prompt */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                      style={{
                        fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500,
                        letterSpacing: "0.2em", textTransform: "uppercase" as const,
                        color: "white", border: "1px solid rgba(255,255,255,0.6)", padding: "8px 20px",
                        background: "rgba(28, 27, 26, 0.4)", backdropFilter: "blur(4px)"
                      }}>
                      Learn More
                    </span>
                  </div>
                </div>

                {/* Details caption */}
                <div style={{ marginTop: "18px" }}>
                  <h3 className="group-hover:text-accent transition-colors" style={{
                    fontFamily: "var(--font-display)", fontSize: "22px",
                    fontWeight: 300, letterSpacing: "0.02em", color: "var(--color-foreground)", marginBottom: "8px",
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 300, color: "var(--color-muted)", lineHeight: "1.6" }}>
                    {step.description}
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Step Details Modal */}
      {selectedStep && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-[4px] animate-[fadeIn_0.3s_ease]"
          onClick={() => setSelectedStep(null)}
        >
          <div 
            className="bg-[var(--color-background)] border border-border text-foreground rounded-none max-w-4xl w-full h-auto md:h-[550px] overflow-y-auto md:overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2 animate-[fadeUp_0.4s_cubic-bezier(0.16,1,0.3,1)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedStep(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-foreground/60 hover:text-accent transition-colors cursor-pointer z-20 p-2 bg-background/80 md:bg-transparent rounded-none"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Left Col: Image */}
            <div className="relative h-[240px] md:h-full w-full">
              <Image
                src={selectedStep.image}
                alt={selectedStep.title}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div style={{
                position: "absolute", top: "24px", left: "24px",
                fontFamily: "var(--font-display)", fontSize: "16px",
                fontWeight: 300,
                color: "white", textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                letterSpacing: "0.15em"
              }}>
                STEP {selectedStep.step}
              </div>
            </div>

            {/* Right Col: Contents */}
            <div className="overflow-y-auto h-full max-h-full">
              <div className="pt-8 px-8 md:pt-10 md:px-10 pb-0 flex flex-col justify-between min-h-full">
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-semibold block mb-2">
                    Atelier Craftsmanship
                  </span>
                  <h3 className="text-3xl md:text-[36px] font-heading font-light leading-tight text-foreground mb-6">
                    {selectedStep.title}
                  </h3>
                  
                  {/* Ornament divider */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                    <div style={{ width: "30px", height: "1px", background: "var(--color-border-strong)" }} />
                    <div style={{ width: "4px", height: "4px", background: "var(--color-accent)", transform: "rotate(45deg)" }} />
                    <div style={{ width: "30px", height: "1px", background: "var(--color-border)" }} />
                  </div>

                  <p className="text-muted font-body text-sm md:text-base leading-relaxed mb-8">
                    {selectedStep.details}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] tracking-[0.15em] uppercase font-bold text-foreground">
                      Process Highlights
                    </h4>
                    <ul className="space-y-3 list-none p-0 m-0">
                      {selectedStep.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3 text-xs md:text-sm text-muted">
                          <div style={{ width: "4px", height: "4px", background: "var(--color-accent)", transform: "rotate(45deg)", marginTop: "6px", flexShrink: 0 }} />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action */}
                <div className="mt-8 pt-6 border-t border-border/60 flex justify-end">
                  <button 
                    onClick={() => setSelectedStep(null)}
                    className="px-6 py-2.5 border border-accent text-accent font-body text-[10px] uppercase tracking-widest hover:bg-accent hover:text-background transition-all duration-300 cursor-pointer"
                  >
                    Return to Atelier
                  </button>
                </div>
                {/* Scroll Spacer to prevent padding collapse */}
                <div className="h-8 md:h-10 w-full flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
