import { TerminalSquare, NotebookPen } from "lucide-react";

/**
 * Static preview of the Lectra coding workspace: a notebook cell beside a
 * terminal. Self-contained styling (Tailwind + design tokens) — replaces the
 * unstyled legacy LectraWorkspaceShowcase, whose CSS no longer exists.
 */
export default function LectraWorkspacePreview() {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2"
      aria-label="Lectra notebook and terminal preview"
    >
      <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] shadow-sm">
        <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-4 py-2.5 text-xs font-medium text-[var(--color-ink-soft)]">
          <NotebookPen className="h-3.5 w-3.5" aria-hidden="true" />
          Problem set.ipynb
        </div>
        <div className="space-y-3 p-4 font-mono text-[0.78rem] leading-relaxed">
          <div className="rounded-lg bg-[var(--color-paper-deep)] p-3">
            <p className="text-[var(--color-ink-faint)]">In [3]:</p>
            <p className="text-[var(--color-ink)]">
              df.groupby(&quot;treatment&quot;).mean()
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-line)] p-3">
            <div className="flex items-end gap-1.5" aria-hidden="true">
              <span className="h-4 w-3 rounded-sm bg-[var(--color-brand)] opacity-40" />
              <span className="h-7 w-3 rounded-sm bg-[var(--color-brand)] opacity-60" />
              <span className="h-5 w-3 rounded-sm bg-[var(--color-brand)] opacity-50" />
              <span className="h-9 w-3 rounded-sm bg-[var(--color-brand)]" />
              <span className="h-6 w-3 rounded-sm bg-[var(--color-brand)] opacity-70" />
            </div>
            <p className="mt-2 text-[0.7rem] text-[var(--color-ink-faint)]">
              matplotlib — rendered on device
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/20 bg-[#1b1712] shadow-sm">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-xs font-medium text-white/60">
          <TerminalSquare className="h-3.5 w-3.5" aria-hidden="true" />
          Terminal — bio-lab
        </div>
        <div className="p-4 font-mono text-[0.78rem] leading-relaxed text-white/80">
          <p>
            <span className="text-emerald-400">$</span> git status
          </p>
          <p className="text-white/50">On branch main — 2 files changed</p>
          <p className="mt-2">
            <span className="text-emerald-400">$</span> python analysis.py
          </p>
          <p className="text-white/50">Wrote results.csv — offline, on iPad</p>
          <p className="mt-2">
            <span className="text-emerald-400">$</span>
            <span className="ml-1 inline-block h-3.5 w-2 animate-pulse bg-white/70 align-middle" />
          </p>
        </div>
      </div>
    </div>
  );
}
