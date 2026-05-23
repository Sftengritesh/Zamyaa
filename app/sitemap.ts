import { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { sitemapQuery } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zamyaa.com";

  let products = [];
  let collections = [];

  try {
    const data = await client.fetch(sitemapQuery);
    products = data.products || [];
    collections = data.collections || [];
  } catch (error) {
    console.error("Failed loading dynamic sitemap slugs from Sanity:", error);
  }

  // Pre-configured static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
  ];

  // Map dynamic products
  const productRoutes = products.map((prod: any) => ({
    url: `${baseUrl}/products/${prod.slug}`,
    lastModified: prod._updatedAt ? new Date(prod._updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Map dynamic collections
  const collectionRoutes = collections.map((coll: any) => ({
    url: `${baseUrl}/collections/${coll.slug}`,
    lastModified: coll._updatedAt ? new Date(coll._updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
