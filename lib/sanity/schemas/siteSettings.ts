import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "ZAMYAA BY JYOTI",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Handcrafted Elegance",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "ogImage",
      title: "Default OG Image",
      type: "image",
      description: "Default social sharing image (1200x630px recommended)",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "facebook", type: "url", title: "Facebook" },
        { name: "whatsapp", type: "string", title: "WhatsApp Number" },
        { name: "email", type: "string", title: "Email" },
        { name: "phone", type: "string", title: "Phone" },
      ],
    }),
    defineField({
      name: "address",
      title: "Store Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "announcementBar",
      title: "Announcement Bar Text",
      type: "string",
      description: "Text shown at the top of the site (e.g., 'Free shipping on orders over ₹2999')",
    }),
  ],
});
