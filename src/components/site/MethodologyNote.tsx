import { SUPPORT_EMAIL } from "@/lib/site";

export type MethodologyProduct = "lectra" | "scope";

const productName: Record<MethodologyProduct, string> = {
  lectra: "Lectra Notes",
  scope: "Scope for Canvas",
};

const sourceNote: Record<MethodologyProduct, string> = {
  lectra:
    "from each app's published pricing pages, documentation, and App Store listings, and not from hands-on testing of every feature. Lectra Notes facts come from its own engineering claims ledger, which tracks every public claim against the shipping code.",
  scope:
    "from each extension's Chrome Web Store listing, website, and documentation, and not from hands-on testing of every feature. Scope facts describe the extension as it ships.",
};

/* Standing concessions per product. The list is the point of the block,
   because a comparison that never says where we lose is not worth reading. */
const defaultConcessions: Record<MethodologyProduct, string[]> = {
  lectra: [
    "Audio: lecture recording arrived in version 8.0 on September 1, 2026. It is new and has not been through a full term of use, and Notability and Goodnotes have years of polish here.",
    "Cross-device: annotations do not sync between devices yet. Documents get backed up, but they are not mirrored to your other devices.",
    "Maturity: Lectra Notes shipped in 2026, and the apps compared here have had years longer to polish.",
  ],
  scope: [
    "Install base: Scope for Canvas has about 100 users. BetterCampus reports two million and Tasks for Canvas one million on the Chrome Web Store.",
    "Customization: Scope does not restyle Canvas, so there is no dark mode, no themes, and no dashboard card editing.",
    "Maturity: Scope reached the Chrome Web Store in 2026, and the extensions compared here have had years longer to polish.",
    "AI: answers try Chrome's on-device model first. When it is unavailable, an optional, clearly marked cloud fallback is used.",
  ],
};

/**
 * The honesty block every /compare and /guides page carries: how the facts
 * were compiled, when, and what our product does not do.
 */
export default function MethodologyNote({
  dateChecked,
  product = "lectra",
  extraConcessions = [],
}: {
  dateChecked: string;
  product?: MethodologyProduct;
  extraConcessions?: string[];
}) {
  const concessions = [...defaultConcessions[product], ...extraConcessions];

  return (
    <aside className="note" aria-label="How this comparison was made">
      <h2>How this comparison was made</h2>
      <p style={{ marginTop: 10 }}>
        {productName[product]} is our product. Competitor facts were compiled on{" "}
        {dateChecked} {sourceNote[product]} If something here is out of date,{" "}
        <a className="link" href={`mailto:${SUPPORT_EMAIL}`}>
          tell us
        </a>{" "}
        and we&apos;ll correct it.
      </p>
      <p style={{ marginTop: 16, fontWeight: 620, color: "var(--fg)" }}>
        Where {productName[product]} falls short today:
      </p>
      <ul>
        {concessions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
