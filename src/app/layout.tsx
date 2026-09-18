import type { Metadata, Viewport } from "next";
import "@/styles/site.css";

import MotionRoot from "@/components/motion/MotionRoot";
import JsonLd from "@/components/seo/JsonLd";
import SiteAnalytics from "@/components/seo/SiteAnalytics";
import { SCOPE_DEFINITION } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { schibsted } from "@/styles/fonts";

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
  // The sticky header paints into the status-bar strip and the landscape
  // notch through safe-area padding, which only works with cover.
  viewportFit: "cover",
  // The desk the pages sit on. The site has one scheme: cream paper on an
  // espresso desk reads the same in light and dark system settings.
  themeColor: "#14100c",
  colorScheme: "dark",
};

/**
 * Runs before first paint. Entrance motion (headings that write themselves
 * in, pen marks that draw) is opt-in through html[data-motion="on"], so a
 * visitor without JavaScript, or with reduced motion on, sees finished pages
 * from the first frame. If the observer never reports in, the attribute is
 * withdrawn so nothing can stay hidden.
 */
const motionBootstrap = `(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.setAttribute('data-motion','on');setTimeout(function(){if(!d.hasAttribute('data-focus-ready'))d.removeAttribute('data-motion')},3500)}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={schibsted.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <MotionRoot>{children}</MotionRoot>
        <SiteAnalytics />
      </body>
    </html>
  );
}
