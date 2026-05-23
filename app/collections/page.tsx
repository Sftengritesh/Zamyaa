import { client } from "@/lib/sanity/client";
import { allCollectionsQuery } from "@/lib/sanity/queries";
import SectionHeader from "@/components/shared/SectionHeader";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import OptimizedImage from "@/components/shared/OptimizedImage";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse premium seasonal edit collections of ethnic fashion by Zamyaa.",
};

export default async function CollectionsPage() {
  let collections = [];

  try {
    collections = await client.fetch(allCollectionsQuery);
  } catch (error) {
    console.error("Failed fetching collections, using fallbacks:", error);
  }

  // Fallback items if CMS database is not pre-populated
  const fallbackCollections = [
    {
      _id: "1",
      name: "Sunehary Dhoop",
      slug: "sunehary-dhoop",
      description: "Fresh as spring, graceful as ever 💚",
      coverImage: {
        asset: {
          _ref: "image-1",
        },
      },
      fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6MM5ZKpxO0oRAB-gV24JxamzG1SHDSciuOkOnTXfk4F3Jf4WY7ZVATOgcbJ0Ni8mEhqZ30JCAjhm0eFoAEu1iP3tvCCQA6zIUekz-1x3Tk-6lqGXRgzp-FMtRvTO2VCwIPhimoxPcTCLGEw701ihEpym03JbgVqavK6jjSFZCw72r3svvBdzwjk-9lV6tvoNxPsRsZWujbpbuWc4SkM-i4T1s3dcGhenpAB-3LmysqG5lhJ09mXyaI1Q5nsNKOOPaLbXBLR4wg3d3AQ",
    },
    {
      _id: "2",
      name: "Desi Dastaan",
      slug: "desi-dastaan",
      description: "Contemporary Festive Wear Collection",
      coverImage: {
        asset: {
          _ref: "image-2",
        },
      },
      fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtv7eFs1zc_8Sr9r-O0Q4YmDQFpYwIo_cXfqUivDRtqXftB23nTe5BXuKLJFYtori7D6u2QsTN-gmFDe3-A2_K3ISqA0dZ0HjQLYVLGcZNKKgX7rkLPYusqhHcIpUZ1UWNoogJ5qgsxt1QDHPMOg53b_xhWSuicERzm86-oUldM8sFJ42zbEGybaLaKh2-RW_2G463a98HGBHdxETeQn-V0wlaVHpoIMS55jql82j4yTYBjXAp7DnTlb12HNIMH1N3XWrZqhkmDxpkDg",
    },
    {
      _id: "3",
      name: "Neel Pushp",
      slug: "neel-pushp",
      description: "Fine Hand-Embroidered metallic scarfs & ethnic wear",
      coverImage: {
        asset: {
          _ref: "image-3",
        },
      },
      fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6eoJYbR6FzsqG_ui0Cd5plo8898YgoTCjxFwWCU2KUWWPbBMPvy30tlA1xALs6VAAUZHG9O3j9PSxK87DBq5j3XTdtyuAXf_HLnCkH9_za4YYd7kaowtlrgmEfyL1nPsY48SdjH1_U4I7VhBt6BYEluNgP7zh-rYvpyCIIKpBJZ6MK0SXVIqIj7trLDKalTRGpgVn8mOqETS87sYI2rNKh0pCFMjbwSn7VaQhPwcg8YK0tbIS9Tn3eOd-vqDVmB8JXPEsOrrh3_Axjw",
    },
  ];

  const itemsToRender = collections.length > 0 ? collections : fallbackCollections;

  return (
    <main className="py-20 md:py-[100px] px-[8%] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          label="Zamyaa Archive"
          title="All Collections"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {itemsToRender.map((collection: any, index: number) => {
            const imgSrc = collection.coverImage.asset._ref.startsWith("image-")
              ? collection.fallbackUrl
              : urlFor(collection.coverImage).url();

            return (
              <RevealOnScroll
                key={collection._id}
                delay={index + 1}
                className="group relative cursor-pointer"
              >
                <Link href={`/collections/${collection.slug}`} className="no-underline text-foreground block">
                  <div className="aspect-[4/5] relative rounded-[32px_32px_10px_10px] overflow-hidden bg-card shadow-card group-hover:shadow-card-hover group-hover:translate-y-[-10px] transition-all duration-700 ease-[var(--ease-out-expo)]">
                    <OptimizedImage
                      src={imgSrc}
                      alt={collection.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent z-[2]" />
                  </div>
                  <h3 className="text-[34px] font-heading font-normal text-foreground mt-6 group-hover:text-accent transition-colors duration-300">
                    {collection.name}
                  </h3>
                  {collection.description && (
                    <p className="text-muted text-sm leading-relaxed mt-2.5">
                      {collection.description}
                    </p>
                  )}
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </main>
  );
}
