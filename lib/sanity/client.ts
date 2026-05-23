import { createClient } from "next-sanity";

// Sanity Project ID must only contain a-z, 0-9, and dashes.
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummyprjid";
export const projectId = /^[a-z0-9-]+$/i.test(rawProjectId) ? rawProjectId : "dummyprjid";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

// Preview client (no CDN cache)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
