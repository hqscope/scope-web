import { CHROME_WEB_STORE_URL } from "@/lib/site";

export type NavSection =
  | "extension"
  | "lectra"
  | "polya"
  | "mac"
  | "agent-workspace"
  | "compare"
  | "guides"
  | "direction"
  | "newsroom"
  | "support"
  | null;

export type NavLink = { href: string; label: string; section: NavSection; where?: string };

/** The products, in shipping order, with where each one runs. */
export const productLinks: NavLink[] = [
  { href: "/products/extension", label: "Extension", section: "extension", where: "Chrome" },
  { href: "/products/lectra", label: "Lectra Notes", section: "lectra", where: "iPad and iPhone" },
  { href: "/products/polya", label: "Polya", section: "polya", where: "Web" },
  { href: "/mac", label: "Lectra for Mac", section: "mac", where: "Mac" },
  {
    href: "/products/agent-workspace",
    label: "Agent Workspace",
    section: "agent-workspace",
    where: "Mac, in development",
  },
];

export const siteLinks: NavLink[] = [
  { href: "/compare", label: "Compare", section: "compare" },
  { href: "/guides", label: "Guides", section: "guides" },
  { href: "/direction", label: "Direction", section: "direction" },
  { href: "/newsroom", label: "Newsroom", section: "newsroom" },
  { href: "/support", label: "Support", section: "support" },
];

export const productSections: NavSection[] = productLinks.map((link) => link.section);

export type HeaderCta = {
  label: string;
  href: string;
  /** Store links open in a new tab and record a store_click event. */
  store?: "chrome-web-store" | "app-store";
};

export const defaultCta: HeaderCta = {
  label: "Add to Chrome",
  href: CHROME_WEB_STORE_URL,
  store: "chrome-web-store",
};
