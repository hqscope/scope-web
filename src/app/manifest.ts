import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Scope",
    short_name: "Scope",
    description:
      "Local-first Chrome extension for Canvas and Brightspace search, cited AI answers, PDF/OCR indexing, Smart Planner, and two-way Lectra document handoff.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f1e7",
    // Matches viewport.themeColor in layout.tsx, so an installed shortcut and
    // the browser chrome paint the same plaster ground.
    theme_color: "#f6f1e7",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/brand/scope-icon-512.png",
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
