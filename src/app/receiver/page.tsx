import type { Metadata } from "next";

import LectraForMacPage from "@/components/public/LectraForMacPage";

// Lectra Receiver was absorbed into Lectra for Mac. /mac is the canonical URL,
// but this one is compiled into shipped Receiver builds and the iPad app, so it
// renders the same page rather than redirecting — a 200 here can never be a
// dead end for an app that cannot be updated to point somewhere else.
export const metadata: Metadata = {
  title: "Lectra for Mac",
  description:
    "Lectra Receiver is now part of Lectra for Mac — one free download with the whole Lectra app, plus your Mac on your iPad, documents sent from iPad, and a shared clipboard.",
  alternates: {
    canonical: "/mac",
  },
  keywords: [
    "Lectra Receiver",
    "Lectra Receiver Mac",
    "Lectra for Mac",
    "Lectra remote desktop",
    "control Mac from iPad",
    "iPad remote desktop",
  ],
  openGraph: {
    title: "Lectra for Mac",
    description:
      "Lectra Receiver is now part of Lectra for Mac. One download: the whole Lectra app, and your Mac on your iPad whenever you want it.",
    type: "website",
    url: "/mac",
    images: [
      {
        url: "/brand/lectra-canvascope-lockup.png",
        width: 1200,
        height: 630,
        alt: "Lectra for Mac",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lectra for Mac",
    description:
      "Lectra Receiver is now part of Lectra for Mac. One download: the whole Lectra app, and your Mac on your iPad whenever you want it.",
    images: ["/brand/lectra-canvascope-lockup.png"],
  },
};

export default function ReceiverPage() {
  return <LectraForMacPage />;
}
