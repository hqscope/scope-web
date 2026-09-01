import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import JsonLd from "@/components/seo/JsonLd";
import SiteAnalytics from "@/components/seo/SiteAnalytics";
import { SCOPE_DEFINITION } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

// Bricolage is variable across optical size and weight; the display sizes
// need the full 200-800 range, so it is deliberately not pinned to a weight.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.canvascope.org",
  ),
  title: {
    default: "Scope",
    template: "%s | Scope",
  },
  description: `${SCOPE_DEFINITION} Lectra Notes, the free iPad app from Scope, is where the reading gets marked up and the notebook runs.`,
  applicationName: "Scope",
  authors: [{ name: "Scope Inc." }],
  creator: "Scope Inc.",
  publisher: "Scope Inc.",
  category: "education",
  keywords: [
    "Scope",
    "Scope for Canvas",
    // Retained through the rename so the former name still resolves to us.
    "Canvascope",
    "Lectra Notes",
    "Canvas LMS",
    "Canvas Chrome extension",
    "Canvas search",
    "Brightspace",
    "D2L",
    "Student productivity",
    "LMS search",
    "Canvas search extension",
    "Brightspace search extension",
    "PDF annotation",
    "on-device AI",
    "DropBridge",
    "Apple Pencil",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim()
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.trim() }
    : undefined,
  // Every indexable page sets its own card through publicPageMetadata(); this
  // is the fallback. No `url` here on purpose — a page that inherits it would
  // attribute its share card to the homepage.
  openGraph: {
    title: "Scope",
    description: SCOPE_DEFINITION,
    type: "website",
    siteName: "Scope",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Scope local-first Canvas and Brightspace search with cited AI answers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scope",
    description: SCOPE_DEFINITION,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The sticky header paints into the status-bar strip via safe-area
  // padding; without cover, iOS leaves that strip outside the layout
  // viewport and page content shows through above the header.
  viewportFit: "cover",
  themeColor: "#f6f1e7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${bricolage.variable} ${plexMono.variable} antialiased`}
      >
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
