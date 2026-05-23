import { client } from "@/lib/sanity/client";
import { activeBannersQuery, featuredCollectionsQuery, featuredProductsQuery } from "@/lib/sanity/queries";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import AtelierSection from "@/components/home/AtelierSection";
import HeritageSection from "@/components/home/HeritageSection";
import InstagramGallery from "@/components/home/InstagramGallery";
import ConsultationCTA from "@/components/home/ConsultationCTA";
import ProductCard from "@/components/products/ProductCard";
import SectionHeader from "@/components/shared/SectionHeader";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

// Configure default cache settings
export const revalidate = 3600; // ISR cache for 1 hour

export default async function HomePage() {
  let banners = [];
  let collections = [];
  let featuredProducts = [];

  try {
    // Try to fetch data dynamically from Sanity if configured
    banners = await client.fetch(activeBannersQuery);
    collections = await client.fetch(featuredCollectionsQuery);
    featuredProducts = await client.fetch(featuredProductsQuery);
  } catch (error) {
    console.warn("Failed fetching from CMS, using high fidelity placeholders:", error);
  }

  return (
    <main className="min-h-screen">
      {/* 1. Hero banner section */}
      <HeroBanner banners={banners} />

      {/* 2. Collections Showcase */}
      <FeaturedCollections collections={collections} />

      {/* 3. Featured Products Showcase */}
      <section className="section-luxury" style={{ background: "var(--color-card)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <SectionHeader
            label="Signature Edits"
            title="Featured Masterpieces"
            viewAllLink="/collections"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.map((product: any, index: number) => (
                <RevealOnScroll key={product._id} delay={index + 1}>
                  <ProductCard product={product} index={index} />
                </RevealOnScroll>
              ))
            ) : (
              // Premium High-Fidelity Fallback Products for initial storefront
              [
                {
                  _id: "p1",
                  name: "Sunehary Dhoop Suit",
                  slug: "sunehary-dhoop-suit",
                  price: 4999,
                  comparePrice: 5999,
                  inStock: true,
                  images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuB6MM5ZKpxO0oRAB-gV24JxamzG1SHDSciuOkOnTXfk4F3Jf4WY7ZVATOgcbJ0Ni8mEhqZ30JCAjhm0eFoAEu1iP3tvCCQA6zIUekz-1x3Tk-6lqGXRgzp-FMtRvTO2VCwIPhimoxPcTCLGEw701ihEpym03JbgVqavK6jjSFZCw72r3svvBdzwjk-9lV6tvoNxPsRsZWujbpbuWc4SkM-i4T1s3dcGhenpAB-3LmysqG5lhJ09mXyaI1Q5nsNKOOPaLbXBLR4wg3d3AQ"],
                  collection: { name: "Sunehary Dhoop" }
                },
                {
                  _id: "p2",
                  name: "Desi Dastaan Kurta Set",
                  slug: "desi-dastaan-kurta-set",
                  price: 3499,
                  inStock: true,
                  images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBtv7eFs1zc_8Sr9r-O0Q4YmDQFpYwIo_cXfqUivDRtqXftB23nTe5BXuKLJFYtori7D6u2QsTN-gmFDe3-A2_K3ISqA0dZ0HjQLYVLGcZNKKgX7rkLPYusqhHcIpUZ1UWNoogJ5qgsxt1QDHPMOg53b_xhWSuicERzm86-oUldM8sFJ42zbEGybaLaKh2-RW_2G463a98HGBHdxETeQn-V0wlaVHpoIMS55jql82j4yTYBjXAp7DnTlb12HNIMH1N3XWrZqhkmDxpkDg"],
                  collection: { name: "Desi Dastaan" }
                },
                {
                  _id: "p3",
                  name: "Neel Pushp Hand-Embroidered Scarf",
                  slug: "neel-pushp-scarf",
                  price: 1899,
                  comparePrice: 2499,
                  inStock: false,
                  images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuA6eoJYbR6FzsqG_ui0Cd5plo8898YgoTCjxFwWCU2KUWWPbBMPvy30tlA1xALs6VAAUZHG9O3j9PSxK87DBq5j3XTdtyuAXf_HLnCkH9_za4YYd7kaowtlrgmEfyL1nPsY48SdjH1_U4I7VhBt6BYEluNgP7zh-rYvpyCIIKpBJZ6MK0SXVIqIj7trLDKalTRGpgVn8mOqETS87sYI2rNKh0pCFMjbwSn7VaQhPwcg8YK0tbIS9Tn3eOd-vqDVmB8JXPEsOrrh3_Axjw"],
                  collection: { name: "Neel Pushp" }
                }
              ].map((product: any, index: number) => (
                <RevealOnScroll key={product._id} delay={index + 1}>
                  <ProductCard product={product} index={index} />
                </RevealOnScroll>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. Atelier Craftsmanship process */}
      <AtelierSection />

      {/* 5. Signature Accent / Heritage */}
      <HeritageSection />

      {/* 6. InstagramMuse Gallery */}
      <InstagramGallery />

      {/* 7. Virtual/Studio Consultation Booking */}
      <ConsultationCTA />
    </main>
  );
}
