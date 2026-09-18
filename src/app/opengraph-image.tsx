import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "@/lib/og-card";

export const alt = "Scope: local-first Canvas and Brightspace search with cited AI answers";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderCard({
    label: "Scope for Canvas",
    title: "Search, ask, and move coursework in seconds.",
    subtitle: "A local-first Chrome extension for Canvas and Brightspace, with cited AI answers, search inside PDFs and scans, and two-way Lectra Notes workflows.",
    footer: "canvascope.org",
    note: "Free Chrome extension",
  });
}
