import { groq } from "next-sanity";

// ========================================
// PRODUCT QUERIES
// ========================================

export const allProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    price,
    comparePrice,
    images,
    featured,
    inStock,
    "collection": collection->{ name, "slug": slug.current }
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    name,
    "slug": slug.current,
    price,
    comparePrice,
    images,
    inStock,
    "collection": collection->{ name, "slug": slug.current }
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    name,
    "slug": slug.current,
    price,
    comparePrice,
    images,
    description,
    details,
    sizes,
    colors,
    featured,
    inStock,
    tags,
    seo,
    "collection": collection->{ name, "slug": slug.current },
    "relatedProducts": *[_type == "product" && collection._ref == ^.collection._ref && slug.current != $slug] [0...4] {
      _id,
      name,
      "slug": slug.current,
      price,
      images
    }
  }
`;

export const productsByCollectionQuery = groq`
  *[_type == "product" && collection->slug.current == $slug] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    price,
    comparePrice,
    images,
    inStock,
    "collection": collection->{ name, "slug": slug.current }
  }
`;

export const searchProductsQuery = groq`
  *[_type == "product" && (
    name match $query + "*" ||
    description match $query + "*" ||
    tags[] match $query + "*"
  )] | order(_createdAt desc) [0...20] {
    _id,
    name,
    "slug": slug.current,
    price,
    images,
    "collection": collection->{ name, "slug": slug.current }
  }
`;

// ========================================
// COLLECTION QUERIES
// ========================================

export const allCollectionsQuery = groq`
  *[_type == "collection"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    coverImage,
    featured
  }
`;

export const featuredCollectionsQuery = groq`
  *[_type == "collection" && featured == true] | order(order asc) [0...3] {
    _id,
    name,
    "slug": slug.current,
    description,
    coverImage
  }
`;

export const collectionBySlugQuery = groq`
  *[_type == "collection" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    name,
    "slug": slug.current,
    description,
    coverImage,
    seo
  }
`;

// ========================================
// BANNER QUERIES
// ========================================

export const activeBannersQuery = groq`
  *[_type == "banner" && active == true] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    image,
    ctaText,
    ctaLink
  }
`;

// ========================================
// SITE SETTINGS QUERIES
// ========================================

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    description,
    logo,
    ogImage,
    socialLinks,
    address,
    announcementBar
  }
`;

// ========================================
// SITEMAP QUERIES
// ========================================

export const sitemapQuery = groq`{
  "products": *[_type == "product"] { "slug": slug.current, _updatedAt },
  "collections": *[_type == "collection"] { "slug": slug.current, _updatedAt }
}`;
