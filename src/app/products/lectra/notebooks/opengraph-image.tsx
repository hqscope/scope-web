import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "@/lib/og-card";

export const alt = "Lectra Notes: Jupyter Notebooks on iPad, Offline | Scope";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderCard({
    label: "Lectra Notes Notebooks",
    title: "Jupyter notebooks that run on your iPad, offline.",
    subtitle: "Real .ipynb files and on-device Python with numpy, pandas, and matplotlib, with no cloud kernel.",
    footer: "canvascope.org/products/lectra/notebooks",
    note: "Free on the App Store",
  });
}
