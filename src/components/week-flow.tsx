"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

export type FlowStep = {
  title: string;
  body: string;
  app: string;
  scene: ReactNode;
};

/** The five steps of an ordinary week, as tabs with a drawn scene for each. */
export function WeekFlow({ steps }: { steps: FlowStep[] }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const current = steps[active];

  const move = (delta: number) => {
    const next = (active + delta + steps.length) % steps.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="A week with Scope"
        className="flex flex-col"
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        {steps.map((step, index) => {
          const selected = index === active;
          return (
            <button
              key={step.title}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className="group grid grid-cols-[2.25rem_1fr] gap-x-3 border-t border-line py-5 text-left first:border-t-0"
            >
              <span
                className={`mt-0.5 inline-flex size-7 items-center justify-center rounded-full text-[13px] font-semibold tabular-nums transition-colors ${
                  selected ? "bg-red text-white" : "bg-wash text-stone group-hover:text-ink"
                }`}
              >
                {index + 1}
              </span>
              <span>
                <span className={`flex flex-wrap items-baseline gap-x-3 text-[19px] font-semibold tracking-[-0.02em] ${selected ? "text-ink" : "text-stone group-hover:text-ink"}`}>
                  {step.title}
                  <span className="text-[13px] font-medium tracking-normal text-stone">{step.app}</span>
                </span>
                <span
                  className={`grid transition-[grid-template-rows] duration-300 ${selected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <span className="overflow-hidden">
                    <span className="block pt-2 text-[15.5px] leading-relaxed text-stone">{step.body}</span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="flex min-h-[380px] items-center rounded-[22px] bg-wash p-5 sm:p-10"
      >
        <div key={active} className="w-full animate-rise">
          {current.scene}
        </div>
      </div>
    </div>
  );
}
