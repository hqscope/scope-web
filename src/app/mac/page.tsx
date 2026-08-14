import type { Metadata } from "next";

import LectraForMacPage from "@/components/public/LectraForMacPage";

const description =
  "Lectra for Mac is the free Mac app: read and mark up documents, run notebooks, Python, and a terminal — and let Lectra on your iPad see and control this Mac, receive documents you send, and share its clipboard.";

export const metadata: Metadata = {
  title: "Lectra for Mac",
  description,
  alternates: {
    canonical: "/mac",
  },
  keywords: [
    "Lectra for Mac",
    "Lectra Mac app",
    // Retained through the consolidation so the former name still resolves.
    "Lectra Receiver",
    "Lectra remote desktop",
    "control Mac from iPad",
    "iPad remote desktop",
    "macOS PDF annotation",
    "Mac note-taking app",
  ],
  openGraph: {
    title: "Lectra for Mac",
    description:
      "The whole of Lectra on macOS — readings, markup, notebooks, Python, and a terminal — plus your Mac on your iPad whenever you want it.",
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
      "The whole of Lectra on macOS — readings, markup, notebooks, Python, and a terminal — plus your Mac on your iPad whenever you want it.",
    images: ["/brand/lectra-canvascope-lockup.png"],
  },
};

export default function MacPage() {
  return <LectraForMacPage />;
}
