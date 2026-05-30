"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

interface HeritageStory {
  id: string;
  title: string;
  quote: string;
  description: string;
  image: string;
  details: string;
  highlights: string[];
}

const HERITAGE_STORIES: HeritageStory[] = [
  {
    id: "handloom",
    title: "Handloom Weaving",
    quote: "A rhythm of threads passed down over generations.",
    description: "Every weave carries a human touch. Our organic cottons and silks are hand-spun on traditional wooden looms in artisan villages, ensuring no two rolls are identical. This makes each silhouette a unique piece of living art.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjvo3pYIf5Xim_LwL8QkpNvK7B9AUg55Xe0oJsCihFFE6yPFa5y6NucSoT1dyuvbnDdK1bWIToct15WMj1N-MhWdIpwVceGB09mdzY7wbQXOWQSMn-ocYh7WH9A5nEnsdSGlrXNisQjlQtKCm6roQrBLA-3zDbC5fko1ZjfMnDO-h3Esw6fq6ImSJplCUJ4NVbO0ZsVXslok4HPnFETOFRHtC63wR8nDmIIrloyfpRyDmPRjcP6JrkGPMVzpJSJeyI1F72z2on_5M",
    details: "In Maheshwar and Chanderi, our weavers utilize centuries-old techniques to interlace cotton and mulberry silk yarns. The tension, the atmosphere, and the weaver's touch combine to produce a texture that machine looms cannot replicate. This heritage is the base of every dress in our collection.",
    highlights: ["Traditional wooden looms", "Mulberry silk & long-staple cotton", "Support for over 50 weaver households"]
  },
  {
    id: "indigo",
    title: "Organic Indigo Dyeing",
    quote: "Deep hues born from the earth.",
    description: "We use natural indigo extracted from the Indigofera tinctoria plant. Our artisans ferment the leaves in earth pits, creating a biological dye vat that yields shades from sky blue to deep midnight.",
    image: "/images/Daastaan.png",
    details: "Natural indigo dyeing is a slow, multi-stage alchemy. The fabric is submerged repeatedly into the dye vats, exposed to oxygen to turn blue, and then sun-cured. This organic process creates a shifting hue that reflects light uniquely, washing down to a beautifully seasoned texture over the years.",
    highlights: ["100% plant-derived indigo", "Zero chemical mordants", "Biodegradable wastewater cycles"]
  },
  {
    id: "zari",
    title: "Metallic Silver Zari",
    quote: "The signature silver thread that anchors our designs.",
    description: "Our signature mark is the delicate silver thread (zari) woven into the borders. It catches the sun, creating an ethereal shimmer that represents the lining of clouds and the light of heritage.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtv7eFs1zc_8Sr9r-O0Q4YmDQFpYwIo_cXfqUivDRtqXftB23nTe5BXuKLJFYtori7D6u2QsTN-gmFDe3-A2_K3ISqA0dZ0HjQLYVLGcZNKKgX7rkLPYusqhHcIpUZ1UWNoogJ5qgsxt1QDHPMOg53b_xhWSuicERzm86-oUldM8sFJ42zbEGybaLaKh2-RW_2G463a98HGBHdxETeQn-V0wlaVHpoIMS55jql82j4yTYBjXAp7DnTlb12HNIMH1N3XWrZqhkmDxpkDg",
    details: "Zari weaving involves wrapping metallic silver wire around a core thread of pure silk. This delicate thread is woven directly on the loom or hand-embroidered onto finished fabrics. The metallic luster gives our garments a weight and drape that is both elegant and timeless.",
    highlights: ["Silk-core metallic wire", "Authentic zari techniques", "Lustrous lighting reflectivity"]
  },
  {
    id: "slowfashion",
    title: "Slow Fashion Ethos",
    quote: "Honoring time, preservation, and minimal waste.",
    description: "We operate on a zero-inventory, slow production cycle. Each garment is made to order or created in small batches, respecting the natural limits of our artisans and the environment.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6eoJYbR6FzsqG_ui0Cd5plo8898YgoTCjxFwWCU2KUWWPbBMPvy30tlA1xALs6VAAUZHG9O3j9PSxK87DBq5j3XTdtyuAXf_HLnCkH9_za4YYd7kaowtlrgmEfyL1nPsY48SdjH1_U4I7VhBt6BYEluNgP7zh-rYvpyCIIKpBJZ6MK0SXVIqIj7trLDKalTRGpgVn8mOqETS87sYI2rNKh0pCFMjbwSn7VaQhPwcg8YK0tbIS9Tn3eOd-vqDVmB8JXPEsOrrh3_Axjw",
    details: "By resisting mass-production, we preserve both natural resources and artisan dignity. Each layout is planned to maximize fabric usage, and scraps are transformed into accent details or accessories. Zamyaa garments are built to last and meant to be passed down.",
    highlights: ["Small batch production", "Zero-waste cutting patterns", "Intergenerational durability"]
  }
];

export default function HeritageSection() {
  const [selectedStory, setSelectedStory] = useState<HeritageStory | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedStory]);

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
    <section style={{ background: "var(--color-background)", overflow: "hidden", padding: "80px 6%" }}
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
                  Signature Accent
                </span>
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 68px)",
                fontWeight: 300, lineHeight: 1.05, letterSpacing: "0.02em",
                color: "var(--color-foreground)" }}>
                The Silver Thread of Heritage
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

        {/* Scroll Track */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 hide-scrollbar scroll-smooth snap-x snap-mandatory pb-6"
          style={{
            scrollPaddingLeft: "4%",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {HERITAGE_STORIES.map((story, idx) => (
            <div 
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="snap-start flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[31vw] group cursor-pointer"
            >
              <RevealOnScroll delay={idx + 1}>
                {/* Image card */}
                <div className="relative overflow-hidden bg-card border border-border/40 rounded-none aspect-[3/4] shadow-sm group-hover:shadow-card-hover group-hover:border-accent/40 transition-all duration-500">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center", transition: "transform 1s ease" }}
                    className="group-hover:scale-105"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 31vw"
                  />
                  {/* Learn More Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                      style={{
                        fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500,
                        letterSpacing: "0.2em", textTransform: "uppercase" as const,
                        color: "white", border: "1px solid rgba(255,255,255,0.6)", padding: "8px 20px",
                        background: "rgba(28, 27, 26, 0.4)", backdropFilter: "blur(4px)"
                      }}>
                      Discover Story
                    </span>
                  </div>
                </div>

                {/* Details caption */}
                <div style={{ marginTop: "18px" }}>
                  <h3 className="group-hover:text-accent transition-colors" style={{
                    fontFamily: "var(--font-display)", fontSize: "22px",
                    fontWeight: 300, letterSpacing: "0.02em", color: "var(--color-foreground)", marginBottom: "4px",
                  }}>
                    {story.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontStyle: "italic", color: "var(--color-accent)", marginBottom: "8px" }}>
                    "{story.quote}"
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 300, color: "var(--color-muted)", lineHeight: "1.6" }}>
                    {story.description}
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Details Modal */}
      {selectedStory && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-[4px] animate-[fadeIn_0.3s_ease]"
          onClick={() => setSelectedStory(null)}
        >
          <div 
            className="bg-[var(--color-background)] border border-border text-foreground rounded-none max-w-4xl w-full h-auto md:h-[550px] overflow-y-auto md:overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2 animate-[fadeUp_0.4s_cubic-bezier(0.16,1,0.3,1)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedStory(null)}
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
                src={selectedStory.image}
                alt={selectedStory.title}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right Col: Contents */}
            <div className="overflow-y-auto h-full max-h-full">
              <div className="pt-8 px-8 md:pt-10 md:px-10 pb-0 flex flex-col justify-between min-h-full">
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-semibold block mb-2">
                    Heritage Story
                  </span>
                  <h3 className="text-3xl md:text-[36px] font-heading font-light leading-tight text-foreground mb-6">
                    {selectedStory.title}
                  </h3>
                  <p className="text-sm md:text-base font-heading italic text-accent mb-6 leading-relaxed">
                    "{selectedStory.quote}"
                  </p>
                  
                  {/* Ornament divider */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                    <div style={{ width: "30px", height: "1px", background: "var(--color-border-strong)" }} />
                    <div style={{ width: "4px", height: "4px", background: "var(--color-accent)", transform: "rotate(45deg)" }} />
                    <div style={{ width: "30px", height: "1px", background: "var(--color-border)" }} />
                  </div>

                  <p className="text-muted font-body text-sm md:text-base leading-relaxed mb-8">
                    {selectedStory.details}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] tracking-[0.15em] uppercase font-bold text-foreground">
                      Heritage Highlights
                    </h4>
                    <ul className="space-y-3 list-none p-0 m-0">
                      {selectedStory.highlights.map((highlight, index) => (
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
                    onClick={() => setSelectedStory(null)}
                    className="px-6 py-2.5 border border-accent text-accent font-body text-[10px] uppercase tracking-widest hover:bg-accent hover:text-background transition-all duration-300 cursor-pointer"
                  >
                    Return to Heritage
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
