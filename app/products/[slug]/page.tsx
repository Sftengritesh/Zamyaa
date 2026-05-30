import { client } from "@/lib/sanity/client";
import { productBySlugQuery } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";
import SectionHeader from "@/components/shared/SectionHeader";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import OptimizedImage from "@/components/shared/OptimizedImage";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/products/ProductCard";
import { urlFor } from "@/lib/sanity/image";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await client.fetch(productBySlugQuery, { slug });
    if (!product) return { title: "Product Not Found" };
    return {
      title: product.seo?.title || product.name,
      description: product.seo?.description || product.description,
      openGraph: {
        title: product.seo?.title || product.name,
        description: product.seo?.description || product.description,
        images: product.images?.[0] ? [{ url: urlFor(product.images[0]).url() }] : [],
      },
    };
  } catch {
    return { title: "Premium Masterpiece Details" };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  let product = null;

  try {
    product = await client.fetch(productBySlugQuery, { slug });
  } catch (error) {
    console.error("Failed fetching product details:", error);
  }

  // Handle static local placeholders if CMS isn't fully set up with this product
  if (!product) {
    if (slug === "sunehary-dhoop-kurta-set" || slug === "desi-dastaan-suit" || slug === "neel-pushp-scarf") {
      const displayTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      product = {
        name: displayTitle,
        price: slug.includes("kurta") ? 8999 : slug.includes("scarf") ? 4999 : 11999,
        description: "Experience Handcrafted ethnic excellence woven with premium fabrics, silver embroidery details and timeless design principles.",
        inStock: true,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [{ name: "Ivory Gold", hex: "#f5ecdb" }],
        fallbackUrl: slug.includes("kurta")
          ? "https://lh3.googleusercontent.com/aida-public/AB6AXuB6MM5ZKpxO0oRAB-gV24JxamzG1SHDSciuOkOnTXfk4F3Jf4WY7ZVATOgcbJ0Ni8mEhqZ30JCAjhm0eFoAEu1iP3tvCCQA6zIUekz-1x3Tk-6lqGXRgzp-FMtRvTO2VCwIPhimoxPcTCLGEw701ihEpym03JbgVqavK6jjSFZCw72r3svvBdzwjk-9lV6tvoNxPsRsZWujbpbuWc4SkM-i4T1s3dcGhenpAB-3LmysqG5lhJ09mXyaI1Q5nsNKOOPaLbXBLR4wg3d3AQ"
          : slug.includes("scarf")
          ? "https://lh3.googleusercontent.com/aida-public/AB6AXuA6eoJYbR6FzsqG_ui0Cd5plo8898YgoTCjxFwWCU2KUWWPbBMPvy30tlA1xALs6VAAUZHG9O3j9PSxK87DBq5j3XTdtyuAXf_HLnCkH9_za4YYd7kaowtlrgmEfyL1nPsY48SdjH1_U4I7VhBt6BYEluNgP7zh-rYvpyCIIKpBJZ6MK0SXVIqIj7trLDKalTRGpgVn8mOqETS87sYI2rNKh0pCFMjbwSn7VaQhPwcg8YK0tbIS9Tn3eOd-vqDVmB8JXPEsOrrh3_Axjw"
          : "https://lh3.googleusercontent.com/aida-public/AB6AXuBtv7eFs1zc_8Sr9r-O0Q4YmDQFpYwIo_cXfqUivDRtqXftB23nTe5BXuKLJFYtori7D6u2QsTN-gmFDe3-A2_K3ISqA0dZ0HjQLYVLGcZNKKgX7rkLPYusqhHcIpUZ1UWNoogJ5qgsxt1QDHPMOg53b_xhWSuicERzm86-oUldM8sFJ42zbEGybaLaKh2-RW_2G463a98HGBHdxETeQn-V0wlaVHpoIMS55jql82j4yTYBjXAp7DnTlb12HNIMH1N3XWrZqhkmDxpkDg",
        relatedProducts: [],
      };
    } else {
      notFound();
    }
  }

  // Determine active media URL
  const mainImgUrl = product.fallbackUrl || (product.images?.[0] ? urlFor(product.images[0]).url() : "/images/hero.png");

  return (
    <main className="py-20 md:py-[100px] px-[8%] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          
          {/* Images Section */}
          <RevealOnScroll className="relative select-none">
            <div className="aspect-[4/5] relative rounded-none overflow-hidden bg-card border border-border/40 shadow-sm">
              <OptimizedImage
                src={mainImgUrl}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Gallery Carousels if multiple exist */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4 mt-6">
                {product.images.map((img: any, i: number) => (
                  <div key={i} className="aspect-square relative rounded-none overflow-hidden cursor-pointer bg-card shadow-sm border border-border">
                    <OptimizedImage
                      src={urlFor(img).url()}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      fill
                      sizes="15vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </RevealOnScroll>
 
          {/* Product details */}
          <RevealOnScroll delay={1} className="flex flex-col">
            <div className="border-b border-border pb-6 mb-8">
              {product.collection && (
                <span className="text-xs tracking-[0.2em] uppercase text-accent font-medium block mb-2">
                  {product.collection.name}
                </span>
              )}
              <h1 className="text-4xl md:text-[54px] font-heading font-light text-foreground leading-[1.1] mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold font-body text-accent">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && product.comparePrice > product.price && (
                  <span className="text-lg text-muted line-through font-body">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </div>
            </div>
 
            {/* Description */}
            <p className="text-muted font-body text-base md:text-lg leading-relaxed mb-8">
              {product.description}
            </p>
 
            {/* Sizes Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs tracking-wider uppercase font-semibold text-foreground mb-4">
                  Select Size
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      className="w-12 h-12 rounded-none border border-border flex items-center justify-center text-xs font-semibold hover:border-accent hover:text-accent transition-colors bg-transparent cursor-pointer"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 flex-wrap mt-4 border-b border-border pb-8 mb-8">
              {product.inStock ? (
                <a href={`https://wa.me/919876543210?text=I%20am%20interested%20in%20purchasing%20the%20${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" className="w-full sm:w-auto">
                    Inquire via WhatsApp
                  </Button>
                </a>
              ) : (
                <Button variant="outline" className="w-full sm:w-auto opacity-50 cursor-not-allowed" disabled>
                  Sold Out
                </Button>
              )}
              <a href="/contact">
                <Button variant="outline" className="w-full sm:w-auto">
                  Book Virtual Atelier
                </Button>
              </a>
            </div>

            {/* Highlights details lists */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs tracking-wider uppercase font-bold text-foreground mb-2">
                  Composition & Care
                </h4>
                <p className="text-muted text-sm leading-relaxed">
                  Hand-spun fabrics adorned with metallic silver-threaded embellishments. Dry clean only. Iron inside-out at low temperatures.
                </p>
              </div>
              <div>
                <h4 className="text-xs tracking-wider uppercase font-bold text-foreground mb-2">
                  Shipping & Boutique Pickup
                </h4>
                <p className="text-muted text-sm leading-relaxed">
                  Bespoke and made-to-measure masterpieces ship within 10 to 14 business days. Free shipping across India.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Related products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <section className="border-t border-border pt-20">
            <SectionHeader
              label="Signature Edits"
              title="You May Also Appreciate"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {product.relatedProducts.map((rel: any, index: number) => (
                <ProductCard key={rel._id} product={rel} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
