import { OG_CONTENT_TYPE, OG_SIZE, renderBrandCard } from "@/lib/og-card";

export const alt = "Study with Scope: free study tools for every student";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderBrandCard();
}
