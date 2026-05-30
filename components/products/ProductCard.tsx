"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/image";
import OptimizedImage from "@/components/shared/OptimizedImage";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice?: number;
    images?: Array<{ asset: { _ref: string } }>;
    inStock: boolean;
    collection?: { name: string };
  };
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const primaryImage = product.images?.[0];
  const secondaryImage = product.images?.[1] || product.images?.[0];

  const getImgUrl = (img: any) => {
    if (!img) return "https://lh3.googleusercontent.com/aida-public/AB6AXuBtv7eFs1zc_8Sr9r-O0Q4YmDQFpYwIo_cXfqUivDRtqXftB23nTe5BXuKLJFYtori7D6u2QsTN-gmFDe3-A2_K3ISqA0dZ0HjQLYVLGcZNKKgX7rkLPYusqhHcIpUZ1UWNoogJ5qgsxt1QDHPMOg53b_xhWSuicERzm86-oUldM8sFJ42zbEGybaLaKh2-RW_2G463a98HGBHdxETeQn-V0wlaVHpoIMS55jql82j4yTYBjXAp7DnTlb12HNIMH1N3XWrZqhkmDxpkDg";
    if (typeof img === "string") return img;
    if (img.asset) {
      try {
        return urlFor(img).url();
      } catch (e) {
        return "https://lh3.googleusercontent.com/aida-public/AB6AXuBtv7eFs1zc_8Sr9r-O0Q4YmDQFpYwIo_cXfqUivDRtqXftB23nTe5BXuKLJFYtori7D6u2QsTN-gmFDe3-A2_K3ISqA0dZ0HjQLYVLGcZNKKgX7rkLPYusqhHcIpUZ1UWNoogJ5qgsxt1QDHPMOg53b_xhWSuicERzm86-oUldM8sFJ42zbEGybaLaKh2-RW_2G463a98HGBHdxETeQn-V0wlaVHpoIMS55jql82j4yTYBjXAp7DnTlb12HNIMH1N3XWrZqhkmDxpkDg";
      }
    }
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuBtv7eFs1zc_8Sr9r-O0Q4YmDQFpYwIo_cXfqUivDRtqXftB23nTe5BXuKLJFYtori7D6u2QsTN-gmFDe3-A2_K3ISqA0dZ0HjQLYVLGcZNKKgX7rkLPYusqhHcIpUZ1UWNoogJ5qgsxt1QDHPMOg53b_xhWSuicERzm86-oUldM8sFJ42zbEGybaLaKh2-RW_2G463a98HGBHdxETeQn-V0wlaVHpoIMS55jql82j4yTYBjXAp7DnTlb12HNIMH1N3XWrZqhkmDxpkDg";
  };

  const primarySrc = getImgUrl(primaryImage);
  const secondarySrc = getImgUrl(secondaryImage);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col no-underline text-foreground select-none relative text-center"
    >
      <div className="product-img-wrap aspect-[4/5] relative rounded-none overflow-hidden bg-card border border-border/40 shadow-sm group-hover:shadow-card-hover group-hover:border-accent/40 transition-all duration-700 ease-[var(--ease-out-expo)]">
        {primarySrc && (
          <OptimizedImage
            src={primarySrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] group-hover:scale-103"
            priority={index < 3}
          />
        )}
        
        {/* Secondary image for hover flip */}
        {secondarySrc && secondarySrc !== primarySrc && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-[2]">
            <OptimizedImage
              src={secondarySrc}
              alt={`${product.name} Alternate View`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 z-[5] flex flex-col gap-1.5">
          {!product.inStock && (
            <span className="text-[9px] tracking-widest uppercase font-semibold bg-background/95 text-red-700 border border-red-200/60 py-1 px-2.5 shadow-sm rounded-none">
              Sold Out
            </span>
          )}
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="text-[9px] tracking-widest uppercase font-semibold bg-accent text-background py-1 px-2.5 shadow-sm rounded-none">
              Sale
            </span>
          )}
        </div>
      </div>

      <div className="mt-5">
        {product.collection && (
          <span className="text-[10px] tracking-[0.15em] uppercase text-accent font-semibold block mb-1">
            {product.collection.name}
          </span>
        )}
        <h3 className="text-[24px] font-heading font-light text-foreground group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-center gap-3 mt-1.5">
          <span className="font-body text-xs font-semibold text-foreground/80">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="font-body text-xs text-muted line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
