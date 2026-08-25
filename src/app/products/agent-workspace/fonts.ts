import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";

// The route keeps its own font instances so the weights it needs are requested
// here rather than on every other page. The families are the site's.
export const awSans = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-aw-sans",
  display: "swap",
});

export const awMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-aw-mono",
  display: "swap",
});
