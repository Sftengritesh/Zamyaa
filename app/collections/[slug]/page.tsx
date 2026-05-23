import { client } from "@/lib/sanity/client";
import { collectionBySlugQuery, productsByCollectionQuery } from "@/lib/sanity/queries";
import ProductCard from "@/components/products/ProductCard";
import SectionHeader from "@/components/shared/SectionHeader";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const collection = await client.fetch(collectionBySlugQuery, { slug });
    if (!collection) return { title: "Collection Not Found" };
    return {
      title: collection.seo?.title || collection.name,
      description: collection.seo?.description || collection.description,
    };
  } catch {
    return { title: "Zamyaa Collection" };
  }
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  let collection = null;
  let products = [];

  try {
    collection = await client.fetch(collectionBySlugQuery, { slug });
    if (!collection) {
      // Check fallbacks for static routes
      if (["sunehary-dhoop", "desi-dastaan", "neel-pushp"].includes(slug)) {
        collection = {
          name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
          description: "Premium handcrafted collection featuring timeless ethnic details and silhouettes.",
        };
      } else {
        notFound();
      }
    } else {
      products = await client.fetch(productsByCollectionQuery, { slug });
    }
  } catch (error) {
    console.error("Failed fetching collection details, using fallbacks:", error);
  }

  // High fidelity fallback items if database products aren't configured yet
  const fallbackProducts: Record<string, any[]> = {
    "sunehary-dhoop": [
      {
        _id: "s1",
        name: "Sunehary Dhoop Kurta Set",
        slug: "sunehary-dhoop-kurta-set",
        price: 8999,
        comparePrice: 12999,
        inStock: true,
        images: [{ asset: { _ref: "img-s1" } }],
        fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6MM5ZKpxO0oRAB-gV24JxamzG1SHDSciuOkOnTXfk4F3Jf4WY7ZVATOgcbJ0Ni8mEhqZ30JCAjhm0eFoAEu1iP3tvCCQA6zIUekz-1x3Tk-6lqGXRgzp-FMtRvTO2VCwIPhimoxPcTCLGEw701ihEpym03JbgVqavK6jjSFZCw72r3svvBdzwjk-9lV6tvoNxPsRsZWujbpbuWc4SkM-i4T1s3dcGhenpAB-3LmysqG5lhJ09mXyaI1Q5nsNKOOPaLbXBLR4wg3d3AQ",
        collection: { name: "Sunehary Dhoop" },
      }
    ],
    "desi-dastaan": [
      {
        _id: "d1",
        name: "Desi Dastaan Suit",
        slug: "desi-dastaan-suit",
        price: 11999,
        comparePrice: 15999,
        inStock: true,
        images: [{ asset: { _ref: "img-d1" } }],
        fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtv7eFs1zc_8Sr9r-O0Q4YmDQFpYwIo_cXfqUivDRtqXftB23nTe5BXuKLJFYtori7D6u2QsTN-gmFDe3-A2_K3ISqA0dZ0HjQLYVLGcZNKKgX7rkLPYusqhHcIpUZ1UWNoogJ5qgsxt1QDHPMOg53b_xhWSuicERzm86-oUldM8sFJ42zbEGybaLaKh2-RW_2G463a98HGBHdxETeQn-V0wlaVHpoIMS55jql82j4yTYBjXAp7DnTlb12HNIMH1N3XWrZqhkmDxpkDg",
        collection: { name: "Desi Dastaan" },
      }
    ],
    "neel-pushp": [
      {
        _id: "n1",
        name: "Neel Pushp Scarf",
        slug: "neel-pushp-scarf",
        price: 4999,
        comparePrice: 6999,
        inStock: true,
        images: [{ asset: { _ref: "img-n1" } }],
        fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6eoJYbR6FzsqG_ui0Cd5plo8898YgoTCjxFwWCU2KUWWPbBMPvy30tlA1xALs6VAAUZHG9O3j9PSxK87DBq5j3XTdtyuAXf_HLnCkH9_za4YYd7kaowtlrgmEfyL1nPsY48SdjH1_U4I7VhBt6BYEluNgP7zh-rYvpyCIIKpBJZ6MK0SXVIqIj7trLDKalTRGpgVn8mOqETS87sYI2rNKh0pCFMjbwSn7VaQhPwcg8YK0tbIS9Tn3eOd-vqDVmB8JXPEsOrrh3_Axjw",
        collection: { name: "Neel Pushp" },
      }
    ],
  };

  const renderedProducts = products.length > 0 ? products : (fallbackProducts[slug] || []);

  return (
    <main className="py-20 md:py-[100px] px-[8%] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          label="Seasonal Selection"
          title={collection.name}
        />
        
        {collection.description && (
          <RevealOnScroll className="max-w-[800px] mb-16">
            <p className="text-muted font-body text-base md:text-lg leading-relaxed">
              {collection.description}
            </p>
          </RevealOnScroll>
        )}

        {renderedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {renderedProducts.map((product: any, index: number) => {
              // Ensure image URL resolves fallback or Sanity
              if (product.fallbackUrl) {
                const adaptedProduct = { ...product };
                // Override card image rendering for fallback items
                return (
                  <RevealOnScroll key={product._id} delay={index + 1}>
                    <div className="group flex flex-col no-underline text-foreground select-none relative">
                      <Link href="/contact" className="no-underline text-foreground block">
                        <div className="product-img-wrap aspect-[4/5] relative rounded-[32px_32px_10px_10px] overflow-hidden bg-card shadow-card group-hover:shadow-card-hover group-hover:translate-y-[-10px] transition-all duration-700 ease-[var(--ease-out-expo)]">
                          <OptimizedImage
                            src={product.fallbackUrl}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-6">
                          <span className="text-[10px] tracking-[0.15em] uppercase text-accent font-semibold block mb-1">
                            {product.collection.name}
                          </span>
                          <h3 className="text-[28px] font-heading font-normal text-foreground group-hover:text-accent transition-colors duration-300">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="font-body text-sm font-semibold">
                              {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(product.price)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </RevealOnScroll>
                );
              }
              return (
                <RevealOnScroll key={product._id} delay={index + 1}>
                  <ProductCard product={product} index={index} />
                </RevealOnScroll>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-[32px] border border-border">
            <h3 className="text-2xl font-heading text-foreground mb-4">No Masterpieces Found</h3>
            <p className="text-muted max-w-md mx-auto">
              We are currently loading beautiful designs into this collection. Visit us again shortly!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
