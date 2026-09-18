import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "@/lib/og-card";

export const alt = "Lectra Notes: iPad PDF Annotation & Study Companion | Scope";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderCard({
    label: "Lectra Notes",
    title: "Mark up course readings by hand.",
    subtitle: "Annotate PDFs with Apple Pencil, organize readings, and use private on-device intelligence that works with Scope.",
    footer: "canvascope.org/products/lectra",
    note: "Available on the App Store",
  });
}
