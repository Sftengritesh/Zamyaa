import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zamyaa.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/studio/",
        "/api/",
        "/_next/",
        "/static/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
