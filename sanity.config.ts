import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/lib/sanity/schemas";

const rawId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummyprjid";
const projectId = /^[a-z0-9-]+$/i.test(rawId) ? rawId : "dummyprjid";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "ZAMYAA — Content Studio",
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Site Settings (singleton)
            S.listItem()
              .title("⚙️ Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            // Products
            S.documentTypeListItem("product").title("👗 Products"),
            // Collections
            S.documentTypeListItem("collection").title("📁 Collections"),
            // Banners
            S.documentTypeListItem("banner").title("🖼️ Banners"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
