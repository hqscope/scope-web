// A drawn iPad screen showing a lecture PDF with student ink on it.
// Decorative: every element is aria-hidden and the caption carries the meaning.

function ToolDot({ active = false, color }: { active?: boolean; color: string }) {
  return (
    <span
      className="size-[18px] rounded-full"
      style={{
        background: color,
        boxShadow: active ? `0 0 0 2px #2b2520, 0 0 0 4px ${color}` : undefined,
      }}
    />
  );
}

export function LectraMock({ recording = true }: { recording?: boolean }) {
  return (
    <div aria-hidden="true" className="select-none rounded-[30px] bg-[#1d1915] p-2.5 shadow-[0_30px_80px_-30px_rgba(36,30,24,0.55)]">
      <div className="overflow-hidden rounded-[22px] bg-[#2b2520]">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 text-white/80">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="text-[15px]">‹</span>
            <span className="truncate text-[12px] font-medium">Lecture 14: Conditional expectation</span>
          </div>
          <div className="flex items-center gap-3">
            <ToolDot color="#2447c9" active />
            <ToolDot color="#c42b26" />
            <ToolDot color="#241e18" />
            <span className="hidden h-[18px] w-7 rounded-[5px] bg-[#fde68a] sm:block" />
          </div>
        </div>

        {/* Page */}
        <div className="relative mx-3 mb-3 rounded-[6px] bg-white px-6 pb-8 pt-6 sm:px-9">
          {recording && (
            <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-[#241e18] py-1 pl-2 pr-3 text-[10.5px] font-medium text-white">
              <span className="size-2 animate-pulse rounded-full bg-[#ff5a52]" />
              24:13
              <span className="flex h-3 items-end gap-[2px]">
                {[5, 9, 4, 11, 7, 10, 3, 8].map((h, i) => (
                  <span key={i} className="w-[2px] rounded-full bg-white/70" style={{ height: h }} />
                ))}
              </span>
            </div>
          )}

          <p className="text-[10px] font-medium text-stone">STAT 134, Lecture 14</p>
          <h3 className="mt-1 text-[17px] font-semibold tracking-[-0.02em] text-ink">
            14.2 The tower property
          </h3>
          <p className="mt-3 max-w-[34ch] text-[11px] leading-[1.6] text-ink-soft">
            Conditioning on <i>Y</i> turns the expectation of <i>X</i> into a function of <i>Y</i>.
{" "}
            <span className="rounded-[2px] bg-marker/85 box-decoration-clone px-0.5">
              Averaging that function recovers the original mean.
            </span>
          </p>

          <div className="relative mt-5 inline-block rounded-md bg-wash px-4 py-2.5 text-[15px] tracking-tight text-ink">
            <span className="font-serif italic">E</span>[<span className="font-serif italic">X</span>] = <span className="font-serif italic">E</span>[ <span className="font-serif italic">E</span>[<span className="font-serif italic">X</span> | <span className="font-serif italic">Y</span>] ]
            {/* Ink circle around the formula */}
            <svg className="pointer-events-none absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
              <path d="M18 34 C 10 12, 80 4, 130 6 C 182 8, 196 22, 190 38 C 184 54, 110 58, 60 54 C 26 51, 12 44, 22 28" fill="none" stroke="#2447c9" strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          <p className="mt-5 max-w-[36ch] text-[11px] leading-[1.6] text-ink-soft">
            Example. A die is rolled, then a coin is flipped that many times. Let <i>X</i> count heads.
          </p>

          {/* Handwritten notes */}
          <div className="pointer-events-none absolute right-5 top-[92px] hidden rotate-[-4deg] font-hand text-[21px] leading-none text-pen sm:block">
            tower rule!
            <svg viewBox="0 0 90 30" className="ml-2 mt-1 h-6 w-20 overflow-visible">
              <path d="M70 2 C 60 18, 40 26, 6 26 M6 26 l9 -7 M6 26 l10 5" fill="none" stroke="#2447c9" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="mt-4 rotate-[-1.5deg] font-hand text-[19px] leading-tight text-pen">
            E[X|Y] = Y/2, so E[X] = 3.5/2 = 1.75
            <svg viewBox="0 0 200 8" className="mt-0.5 h-2 w-52 overflow-visible">
              <path d="M2 5 C 50 1, 120 7, 198 3" fill="none" stroke="#c42b26" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
