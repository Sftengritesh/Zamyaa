import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/layout/CursorGlow";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ZAMYAA BY JYOTI | Handcrafted Elegance & Fine Ethnic Fashion",
    template: "%s | ZAMYAA BY JYOTI",
  },
  description:
    "Zamyaa by Jyoti — Handcrafted premium ethnic fashion. Timeless silhouettes woven with heritage, metallic silver embroidery and modern elegance.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ZAMYAA BY JYOTI | Handcrafted Elegance",
    description:
      "Zamyaa by Jyoti — Handcrafted premium ethnic fashion. Timeless silhouettes woven with heritage, metallic silver embroidery and modern elegance.",
    url: "/",
    siteName: "ZAMYAA BY JYOTI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZAMYAA BY JYOTI Handcrafted Elegance Showcase",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZAMYAA BY JYOTI | Handcrafted Elegance",
    description:
      "Zamyaa by Jyoti — Handcrafted premium ethnic fashion. Timeless silhouettes woven with heritage, metallic silver embroidery and modern elegance.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`} style={{ background: '#0e0d0c' }}>
      <body
        style={{ fontFamily: 'var(--font-body, "DM Sans", sans-serif)', background: '#0e0d0c' }}
        suppressHydrationWarning
      >
        <CursorGlow />
        <Navbar />
        {/* Hero pages are full-screen — no top padding needed; Navbar floats over */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
