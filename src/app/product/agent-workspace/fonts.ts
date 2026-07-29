import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

// The Agent Workspace page ships its own type pairing (from the product
// mockup); loading it here keeps the fonts off every other route.
export const awSans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-aw-sans",
  display: "swap",
});

export const awMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-aw-mono",
  display: "swap",
});
