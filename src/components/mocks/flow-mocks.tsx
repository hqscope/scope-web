import { CheckIcon, KindBadge, SearchIcon } from "@/components/icons";

// Small drawn scenes for the "week of class" walkthrough. Decorative.

const panel =
  "select-none overflow-hidden rounded-2xl bg-paper shadow-[0_24px_60px_-24px_rgba(36,30,24,0.35)] ring-1 ring-line";

export function FindScene() {
  return (
    <div aria-hidden="true" className={panel}>
      <div className="flex h-14 items-center gap-3 border-b border-line px-5">
        <SearchIcon className="size-5 text-stone" />
        <span className="text-[16px] text-ink">lecture 14</span>
      </div>
      <ul className="p-2">
        {[
          { title: "Lecture 14: Conditional expectation", meta: "STAT 134, Slides", kind: "pdf" as const, selected: true },
          { title: "Lecture 14 recording", meta: "STAT 134, 51 min", kind: "video" as const },
          { title: "Lecture 14: Aldehydes and ketones", meta: "CHEM 3A, Slides", kind: "pdf" as const },
        ].map((row) => (
          <li key={row.title} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${row.selected ? "bg-wash" : ""}`}>
            <KindBadge kind={row.kind} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] text-ink">{row.title}</span>
              <span className="block text-[12px] text-stone">{row.meta}</span>
            </span>
            {row.selected && (
              <span className="rounded-full bg-ink px-3 py-1.5 text-[12px] font-semibold text-white">Send to iPad</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SendScene() {
  return (
    <div aria-hidden="true" className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      <div className={panel}>
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <span className="min-w-0 truncate text-[12px] text-stone">Lecture 14 slides.pdf</span>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-red px-3 py-1 text-[11.5px] font-semibold text-white">Send to Lectra</span>
        </div>
        <div className="space-y-2 bg-wash p-5">
          <div className="h-2.5 w-2/3 rounded bg-[#dcd6ce]" />
          <div className="h-2 w-full rounded bg-[#e7e2db]" />
          <div className="h-2 w-5/6 rounded bg-[#e7e2db]" />
          <div className="mt-3 h-10 w-1/2 rounded bg-[#e7e2db]" />
          <div className="h-2 w-4/6 rounded bg-[#e7e2db]" />
        </div>
      </div>
      <svg viewBox="0 0 40 16" className="mx-auto hidden h-4 w-10 text-stone sm:block">
        <path d="M2 8h34m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="rounded-[22px] bg-[#1d1915] p-2">
        <div className="rounded-[16px] bg-[#2b2520] p-3">
          <p className="px-1 text-[12px] font-semibold text-white">Scope Inbox</p>
          <ul className="mt-2 space-y-1.5">
            <li className="flex animate-rise items-center gap-2.5 rounded-lg bg-white/10 px-2.5 py-2">
              <span className="h-8 w-6 rounded-[3px] bg-white" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] text-white">Lecture 14 slides.pdf</span>
                <span className="block text-[10.5px] text-white/60">Just now</span>
              </span>
              <span className="size-2 rounded-full bg-[#ff5a52]" />
            </li>
            <li className="flex items-center gap-2.5 rounded-lg px-2.5 py-2">
              <span className="h-8 w-6 rounded-[3px] bg-white/70" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] text-white/80">Problem set 5.pdf</span>
                <span className="block text-[10.5px] text-white/50">Monday</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function HandInScene() {
  return (
    <div aria-hidden="true" className={panel}>
      <div className="border-b border-line px-5 py-3">
        <p className="text-[13px] font-semibold text-ink">Homework 6: Joint distributions</p>
        <p className="text-[11.5px] text-stone">File upload</p>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md px-3 py-1.5 text-[12.5px] text-ink-soft ring-1 ring-line">Choose file</span>
          <span className="rounded-md bg-red-tint px-3 py-1.5 text-[12.5px] font-semibold text-red ring-1 ring-red/30">
            Select from Lectra
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-wash px-4 py-3">
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-ink text-white">
            <CheckIcon className="size-3" />
          </span>
          <span className="min-w-0 flex-1 truncate text-[13px] text-ink">hw6-worked.pdf</span>
          <span className="text-[11.5px] text-stone">3 pages</span>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="font-hand text-[19px] leading-none text-pen">your call</span>
          <span className="rounded-md bg-ink px-4 py-2 text-[12.5px] font-semibold text-white">Submit assignment</span>
        </div>
      </div>
    </div>
  );
}
