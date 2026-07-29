import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Hanken_Grotesk,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

// Authenticated app shell keeps its original type system (do not change).
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Public marketing surface - new design language.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  description:
    "Scope 10.1 is the local-first Chrome extension for Canvas and Brightspace search, cited AI answers, PDF/OCR indexing, Smart Planner, and two-way Lectra document handoff.",
  applicationName: "Scope",
  authors: [{ name: "Scope Inc." }],
  creator: "Scope Inc.",
  publisher: "Scope Inc.",
  category: "education",
  keywords: [
    "Scope",
    "Scope 10.1",
    "Scope for Canvas",
    // Retained through the rename so the former name still resolves to us.
    "Canvascope",
    "Lectra",
    "Canvas LMS",
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
  openGraph: {
    title: "Scope",
    description:
      "The local-first Chrome extension for finding coursework, asking cited course-context questions, and moving PDFs between Scope and Lectra.",
    type: "website",
    siteName: "Scope",
    locale: "en_US",
    url: "/",
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
    description:
      "Search Canvas and Brightspace. Ask cited course context. Keep the core index local.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
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
        className={`${hankenGrotesk.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} ${geist.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  );
}
