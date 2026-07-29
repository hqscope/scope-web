import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Canvascope",
    short_name: "Canvascope",
    description:
      "Local-first Chrome extension for Canvas and Brightspace search, cited AI answers, PDF/OCR indexing, Smart Planner, and two-way Lectra document handoff.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7f9",
    theme_color: "#e1121f",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
