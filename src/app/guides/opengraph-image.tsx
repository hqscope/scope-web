import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "@/lib/og-card";

export const alt = "Scope guides: the manual way first, then ours";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderCard({
    label: "Guides",
    title: "The manual way first. Then ours.",
    subtitle: "Step-by-step walkthroughs for Canvas and iPad study work that show how to do it by hand before showing where Scope for Canvas or Lectra Notes shortens it.",
    footer: "canvascope.org/guides",
    note: "Scope for Canvas and Lectra Notes",
  });
}
