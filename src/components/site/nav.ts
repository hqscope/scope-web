import {
  CHROME_WEB_STORE_URL,
  DOCS_URL,
  LINKEDIN_COMPANY_URL,
  SUPPORT_EMAIL,
  products,
} from "@/lib/site";

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
  | "about"
  | null;

export type NavLink = { href: string; label: string; section?: NavSection };

/** The header's links, left to right. */
export const headerLinks: NavLink[] = [
  { href: products.extension.href, label: "Extension", section: "extension" },
  { href: products.lectra.href, label: "Lectra Notes", section: "lectra" },
  { href: products.polya.href, label: "Polya", section: "polya" },
  { href: products.mac.href, label: "Mac", section: "mac" },
  { href: "/newsroom", label: "Newsroom", section: "newsroom" },
  { href: "/support", label: "Support", section: "support" },
];

/** The footer's columns. Every public page is reachable from here. */
export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Apps",
    links: [
      { href: products.extension.href, label: products.extension.name },
      { href: products.lectra.href, label: products.lectra.name },
      { href: products.polya.href, label: products.polya.name },
      { href: products.mac.href, label: products.mac.name },
      { href: products.agentWorkspace.href, label: products.agentWorkspace.name },
      { href: "/mcp", label: "AI assistants" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/guides", label: "Guides" },
      { href: "/compare", label: "Compare" },
      { href: DOCS_URL, label: "Documentation" },
      { href: "/newsroom", label: "Newsroom" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/direction", label: "Direction" },
      { href: "/research", label: "Research" },
      { href: "/press", label: "Press" },
      ...(LINKEDIN_COMPANY_URL ? [{ href: LINKEDIN_COMPANY_URL, label: "LinkedIn" }] : []),
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/support", label: "Support" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: `mailto:${SUPPORT_EMAIL}`, label: "Email us" },
    ],
  },
];

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
