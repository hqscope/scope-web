import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "@/lib/og-card";

export const alt = "Scope comparisons: honest comparisons, including where the other app wins";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderCard({
    label: "Compare",
    title: "Honest comparisons, including where the other app wins.",
    subtitle: "Scope for Canvas and Lectra Notes next to the apps students already use, checked by hand with the trade-offs left in.",
    footer: "canvascope.org/compare",
    note: "Scope for Canvas and Lectra Notes",
  });
}
