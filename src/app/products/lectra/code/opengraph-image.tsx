import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "@/lib/og-card";

export const alt = "Lectra Notes: Terminal, Git & Code Editor on iPad | Scope";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderCard({
    label: "Lectra Notes Code",
    title: "A real terminal, Git, and a code editor on your iPad.",
    subtitle: "A POSIX-style shell, Git and GitHub on the device, SSH, and Python, all offline beside your notes.",
    footer: "canvascope.org/products/lectra/code",
    note: "Free on the App Store",
  });
}
