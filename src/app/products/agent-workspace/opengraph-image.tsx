import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "@/lib/og-card";

export const alt = "Agent Workspace: Every agent. Every repo. One office. | Scope";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OpengraphImage() {
  return renderCard({
    label: "Agent Workspace for Mac",
    title: "Every agent. Every repo. One office.",
    subtitle: "A native menu-bar app for macOS that shows every live AI coding session in one place. Local-first.",
    footer: "canvascope.org/products/agent-workspace",
    note: "In development",
  });
}
