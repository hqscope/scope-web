/**
 * Campus QR links. Each campus gets a printed link,
 * www.canvascope.org/go/<slug>, that counts the visit and then opens the
 * campus landing page at /start/<lowercased slug>.
 *
 * The slug is what the QR code encodes and what the admin page groups by, so
 * never rename one after its code is printed: old prints would stop counting.
 * Add a campus by adding an entry here; nothing else needs to change.
 */
export type CampusLink = {
  /** As printed. Matched case-insensitively. */
  slug: string;
  /** Shown on the landing page and the admin page. */
  name: string;
};

export const CAMPUS_LINKS: readonly CampusLink[] = [
  { slug: "UCBerkeley", name: "UC Berkeley" },
  { slug: "UCLA", name: "UCLA" },
  { slug: "USC", name: "USC" },
  { slug: "UCDavis", name: "UC Davis" },
  { slug: "UCRiverside", name: "UC Riverside" },
  { slug: "UCSD", name: "UC San Diego" },
  { slug: "UofA", name: "U of A" },
  { slug: "CSULB", name: "Cal State Long Beach" },
  { slug: "UCI", name: "UC Irvine" },
];

export function findCampusLink(raw: string): CampusLink | null {
  const wanted = raw.trim().toLowerCase();
  return CAMPUS_LINKS.find((campus) => campus.slug.toLowerCase() === wanted) ?? null;
}

/** The printed, counted link. */
export function campusGoPath(campus: CampusLink): string {
  return `/go/${campus.slug}`;
}

/** Where the counted link lands. Lowercase so it reads cleanly in the address bar. */
export function campusLandingPath(campus: CampusLink): string {
  return `/start/${campus.slug.toLowerCase()}`;
}
