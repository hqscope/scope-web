import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Caveat } from "next/font/google";

import JsonLd from "@/components/seo/JsonLd";
import SiteAnalytics from "@/components/seo/SiteAnalytics";
import { SCOPE_DEFINITION } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { schibsted } from "@/styles/fonts";
import "./globals.css";

// Only used for the handwriting drawn inside product illustrations.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500"],
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
  authors: [{ name: "Noel Jubil Sason" }],
  creator: "Noel Jubil Sason",
  publisher: "Noel Jubil Sason",
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
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${schibsted.variable} ${caveat.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
