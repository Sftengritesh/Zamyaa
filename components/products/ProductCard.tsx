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
      <div className="product-img-wrap aspect-[4/5] relative rounded-[32px_32px_10px_10px] overflow-hidden bg-card shadow-card group-hover:shadow-card-hover group-hover:translate-y-[-10px] transition-all duration-700 ease-[var(--ease-out-expo)]">
        {primarySrc && (
          <OptimizedImage
            src={primarySrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-[1s] group-hover:scale-105"
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
        <div className="absolute top-4 left-4 z-[5] flex flex-col gap-2">
          {!product.inStock && (
            <span className="text-[10px] tracking-wider uppercase font-semibold bg-red-600 text-white py-1 px-3 rounded-full">
              Sold Out
            </span>
          )}
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="text-[10px] tracking-wider uppercase font-semibold bg-accent text-black py-1 px-3 rounded-full">
              Sale
            </span>
          )}
        </div>
      </div>

      <div className="mt-6">
        {product.collection && (
          <span className="text-[10px] tracking-[0.15em] uppercase text-accent font-semibold block mb-1">
            {product.collection.name}
          </span>
        )}
        <h3 className="text-[28px] font-heading font-normal text-foreground group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-center gap-3 mt-2">
          <span className="font-body text-sm font-semibold">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="font-body text-sm text-muted line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
