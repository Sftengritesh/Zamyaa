import SectionHeader from "@/components/shared/SectionHeader";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import OptimizedImage from "@/components/shared/OptimizedImage";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata = {
  title: "Atelier Story & Heritage",
  description: "The fine handcraft of Zamyaa by Jyoti — timeless silhouettes inspired by ethnic heritage and modern elegance.",
};

export default function AboutPage() {
  return (
    <main className="py-20 md:py-[100px] px-[8%] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          label="Our Story"
          title="The House of Zamyaa"
          centered
        />

        {/* 1. Hero block */}
        <RevealOnScroll className="relative select-none my-16 rounded-[40px] overflow-hidden bg-card shadow-card max-h-[500px]">
          <OptimizedImage
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzZBQhYaAGFT6RT9gu8G_40ZOc71klrBrI1cXVDyW3uUzchKIwtTMah3_LXyFLUNRPIxTUs1YO9ggvHdvx0dKxzprJaIcieYQotZBUnKgSBbmhHT32fQXRK6oG-IM7e0tMunqmA3bRbgmHVMi6e7NvScZLAoyt-We2BWLUgUn9xLCZrOMfM4ZkIUhiWaNH1XprLdptL1S-065F7kUGIhUcqn5fY0IYfdEPBLOPDptpW03HQi5_lxu5vX-UiH2mBRuel-8JLMTLnuFEng"
            alt="Heritage Loom Looming"
            width={1400}
            height={500}
            className="object-cover w-full h-[300px] md:h-[450px]"
          />
        </RevealOnScroll>

        {/* 2. Brand vision block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[100px] items-start mb-24">
          <RevealOnScroll>
            <span className="text-xs tracking-[0.2em] uppercase text-accent font-semibold block mb-4">
              Vision & Philosophy
            </span>
            <h3 className="text-3xl md:text-[50px] font-heading font-light text-foreground leading-[1.2] mb-6">
              Woven with Heritage, Worn with Ethereal Grace
            </h3>
            <p className="text-muted font-body text-base md:text-lg leading-relaxed">
              Zamyaa by Jyoti was born out of a desire to reconcile traditional Indian craftsmanship with fluid modern silhouettes. We believe that ethnic fashion is not static history, but a living dialogue between generations.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <p className="text-muted font-body text-base md:text-lg leading-relaxed mb-6">
              Our master weaver units work in close synergy with state award-winning artisans to preserve rare handloom techniques. Every stitch, every thread of metallic silver embroidery is meticulously executed to create garments of unmatched excellence.
            </p>
            <p className="text-muted font-body text-base md:text-lg leading-relaxed">
              When you wear a Zamyaa creation, you carry forward the legacy of handspun craftsmanship tailored into modern architectural fits that adapt gracefully to any celebration.
            </p>
          </RevealOnScroll>
        </div>

        {/* 3. Overlap Atelier images story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <RevealOnScroll className="relative select-none">
            <div className="rounded-[40px] overflow-hidden bg-card shadow-card">
              <OptimizedImage
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUk2rJQDoMLwAix3ACU8lXOZ8G1rzlKu76GJZanLTfX9vh6ugTbFHunnHXMW9Jrlp9KrzYl_ArVVzlaAGpxdOJMyBclIXYKaXb_QRn6_8Bsx4mpdgWMnkLPtIP7CV1Tsu7O6fk3huMtxoZRF2lT2J8Bp51HJkEQXzAs771FsyH7ccX-xlwodHBxYh9BParBqg6ttfXjte1suQ-tYBfYTiBQdnpmoiAqgECMBvwAGkWPQtMXIBm1mJSNyFq7R_nOYhAK2qNt6_JGvvAPQ"
                alt="Crafting Zamyaa collection"
                width={700}
                height={500}
                className="object-cover w-full h-[350px] md:h-[450px]"
              />
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={1}>
            <span className="text-xs tracking-[0.2em] uppercase text-accent font-semibold block mb-4">
              Our Artisans
            </span>
            <h3 className="text-3xl md:text-[50px] font-heading font-light text-foreground leading-[1.2] mb-6">
              The Hands of Excellence
            </h3>
            <p className="text-muted font-body text-base md:text-lg leading-relaxed mb-8">
              Over 50 local families of generational handloom weavers and zardozi artisans form the core heart of the House of Zamyaa. By providing fair-wage structural ecosystems, we ensure these delicate craft practices thrive dynamically in modern boutique wardrobes.
            </p>
            <Link href="/collections">
              <Button variant="primary">Explore Masterpieces</Button>
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </main>
  );
}
