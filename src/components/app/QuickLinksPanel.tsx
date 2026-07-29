import Link from "next/link";

import {
  deleteStudentQuickLinkAction,
  saveStudentQuickLinkAction,
} from "@/app/app/actions";
import {
  DashboardQuickLink,
  StudentQuickLink,
} from "@/lib/data/models";

function LinkCard({ link }: { link: DashboardQuickLink }) {
  const className =
    "app-card-soft rounded-[1.25rem] p-4 transition hover:bg-[rgba(255,255,255,0.08)]";

  const content = (
    <>
      <p className="font-semibold text-white">{link.label}</p>
      <p className="mt-2 text-sm text-[var(--color-shell-copy)]">{link.description}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.12em] text-[var(--color-shell-copy-muted)]">
        {link.source === "preset" ? "Preset" : "Custom"}
      </p>
    </>
  );

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  );
}

export default function QuickLinksPanel({
  quickLinks,
  studentQuickLinks,
  redirectTo = "/app",
}: {
  quickLinks: DashboardQuickLink[];
  studentQuickLinks: StudentQuickLink[];
  redirectTo?: string;
}) {
  return (
    <section className="app-card rounded-[1.75rem] p-6">
      <p className="app-label">Quick links</p>
      <h2 className="mt-2 text-2xl">Keep the portals you actually use one click away</h2>
      <p className="mt-3 max-w-2xl app-copy">
        Start with Canvas, Gradescope, and Lectra, then add the specific student links you return to every week.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {quickLinks.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-white/8 bg-white/4 p-4">
        <p className="font-semibold text-white">Add a custom link</p>
        <form action={saveStudentQuickLinkAction} className="mt-4 grid gap-3 lg:grid-cols-[0.8fr_1.2fr_auto]">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <input
            type="text"
            name="label"
            required
            maxLength={80}
            placeholder="Label"
            className="h-12 rounded-[1rem] border border-white/10 bg-[rgba(8,10,14,0.48)] px-4 text-sm text-white outline-none placeholder:text-[var(--color-shell-copy-muted)]"
          />
          <input
            type="url"
            name="url"
            required
            placeholder="https://..."
            className="h-12 rounded-[1rem] border border-white/10 bg-[rgba(8,10,14,0.48)] px-4 text-sm text-white outline-none placeholder:text-[var(--color-shell-copy-muted)]"
          />
          <button type="submit" className="button-primary whitespace-nowrap">
            Save link
          </button>
        </form>
      </div>

      {studentQuickLinks.length > 0 ? (
        <div className="mt-5 space-y-3">
          {studentQuickLinks.map((link) => (
            <div key={link.id} className="app-card-soft rounded-[1.25rem] p-4">
              <form action={saveStudentQuickLinkAction} className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr_auto_auto]">
                <input type="hidden" name="linkId" value={link.id} />
                <input type="hidden" name="sortOrder" value={String(link.sortOrder)} />
                <input type="hidden" name="redirectTo" value={redirectTo} />
                <input
                  type="text"
                  name="label"
                  defaultValue={link.label}
                  required
                  maxLength={80}
                  className="h-11 rounded-[1rem] border border-white/10 bg-[rgba(8,10,14,0.48)] px-4 text-sm text-white outline-none"
                />
                <input
                  type="url"
                  name="url"
                  defaultValue={link.url}
                  required
                  className="h-11 rounded-[1rem] border border-white/10 bg-[rgba(8,10,14,0.48)] px-4 text-sm text-white outline-none"
                />
                <button type="submit" className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white">
                  Update
                </button>
              </form>
              <form action={deleteStudentQuickLinkAction} className="mt-3">
                <input type="hidden" name="linkId" value={link.id} />
                <input type="hidden" name="redirectTo" value={redirectTo} />
                <button type="submit" className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white">
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
