// A drawn Polya chat in Guided mode. Decorative; the surrounding copy explains it.

const MODES = ["Open", "Guided", "Practice", "Review"] as const;

export function PolyaMock({ showModes = true }: { showModes?: boolean }) {
  return (
    <div aria-hidden="true" className="select-none overflow-hidden rounded-2xl bg-paper shadow-[0_24px_60px_-24px_rgba(36,30,24,0.35)] ring-1 ring-line">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-ink">STAT 134: Probability</p>
          <p className="text-[11.5px] text-stone">Chat</p>
        </div>
        {showModes ? (
          <div className="flex rounded-full bg-wash p-1 text-[11.5px] font-medium">
            {MODES.map((mode) => (
              <span
                key={mode}
                className={`rounded-full px-2.5 py-1 ${mode === "Guided" ? "bg-paper text-ink shadow-[0_1px_2px_rgba(36,30,24,0.12)]" : "text-stone"}`}
              >
                {mode}
              </span>
            ))}
          </div>
        ) : (
          <span className="rounded-full bg-wash px-2.5 py-1 text-[11.5px] font-medium text-ink">Guided</span>
        )}
      </div>

      <div className="space-y-4 px-5 py-5">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[13.5px] leading-relaxed text-white">
          How do I get E[X] when I only know how X behaves for each value of Y?
        </div>

        <div className="max-w-[92%] text-[13.5px] leading-relaxed text-ink-soft">
          <p>
            Start with one value of Y. If you knew Y = 4, what would you average X over? Write
            E[X | Y = 4] first, then think about what happens when Y varies
            <sup className="ml-0.5 rounded bg-red-tint px-1 text-[10px] font-semibold text-red">1</sup>.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-wash px-3 py-2 text-[12px] text-stone">
            <span className="font-semibold text-red">1</span>
            Lecture 14 slides, page 6
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <span className="rounded-full px-3 py-1.5 text-[12px] font-medium text-ink ring-1 ring-line">
            I&apos;m stuck — next step
          </span>
          <span className="rounded-full px-3 py-1.5 text-[12px] font-medium text-ink ring-1 ring-line">
            Check yourself
          </span>
        </div>
      </div>
    </div>
  );
}
