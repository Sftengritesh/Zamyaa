"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string;
  wrapperClassName?: string;
  /** Classes applied to the outer container div (sizing, aspect-ratio, border-radius etc.) */
  containerClassName?: string;
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuBtv7eFs1zc_8Sr9r-O0Q4YmDQFpYwIo_cXfqUivDRtqXftB23nTe5BXuKLJFYtori7D6u2QsTN-gmFDe3-A2_K3ISqA0dZ0HjQLYVLGcZNKKgX7rkLPYusqhHcIpUZ1UWNoogJ5qgsxt1QDHPMOg53b_xhWSuicERzm86-oUldM8sFJ42zbEGybaLaKh2-RW_2G463a98HGBHdxETeQn-V0wlaVHpoIMS55jql82j4yTYBjXAp7DnTlb12HNIMH1N3XWrZqhkmDxpkDg",
  wrapperClassName,
  containerClassName,
  className,
  fill,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        "overflow-hidden",
        // If fill prop → become absolute inset-0 to fill positioned parent
        fill ? "absolute inset-0" : "relative",
        // Show skeleton shimmer while loading for non-fill images
        isLoading && !fill && "skeleton",
        wrapperClassName,
        containerClassName
      )}
      // If explicit width/height numbers are given without fill, size the container
      style={
        !fill && width && height
          ? {
              width: typeof width === "number" ? `${width}px` : width,
              height: typeof height === "number" ? `${height}px` : height,
            }
          : undefined
      }
    >
      <Image
        src={imgSrc || fallbackSrc}
        alt={alt ?? "Zamyaa Fashion"}
        // Always use fill internally so the container controls dimensions
        fill={true}
        className={cn(
          "object-cover w-full h-full transition-all duration-700 ease-out",
          isLoading ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100",
          // Pass hover/group classes through to the image element
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (fallbackSrc && imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
