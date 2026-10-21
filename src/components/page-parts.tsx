import type { ReactNode } from "react";

// Building blocks shared by the product and company pages.

export function PageHero({
  kicker,
  title,
  lede,
  actions,
  visual,
}: {
  kicker: string;
  title: string;
  lede: string;
  actions: ReactNode;
  visual?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20">
      <div className={visual ? "grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16" : ""}>
        <div>
          <p className="text-[15px] font-medium text-stone">{kicker}</p>
          <h1 className="mt-5 max-w-[14ch] text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[0.97] tracking-[-0.046em]">
            {title}
          </h1>
          <p className="mt-6 max-w-[48ch] text-[18px] leading-[1.55] text-ink-soft">{lede}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>
        </div>
        {visual && <div>{visual}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  id,
  title,
  intro,
}: {
  id: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-[40rem]">
      <h2 id={id} className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]">
        {title}
      </h2>
      {intro && <p className="mt-5 text-[17px] leading-[1.55] text-stone">{intro}</p>}
    </div>
  );
}

export type Feature = { title: string; body: string };

export function FeatureGrid({
  id,
  title,
  intro,
  features,
}: {
  id: string;
  title: string;
  intro?: string;
  features: Feature[];
}) {
  return (
    <section aria-labelledby={id} className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
      <SectionHeading id={id} title={title} intro={intro} />
      <dl className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="border-t border-line py-7">
            <dt className="text-[17px] font-semibold tracking-[-0.015em]">{feature.title}</dt>
            <dd className="mt-2 text-[15.5px] leading-[1.6] text-stone">{feature.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function SplitSection({
  id,
  title,
  body,
  visual,
  reverse = false,
}: {
  id: string;
  title: string;
  body: ReactNode;
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <section aria-labelledby={id} className="bg-wash">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <div className={reverse ? "lg:order-2" : ""}>
          <h2 id={id} className="max-w-[18ch] text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]">
            {title}
          </h2>
          <div className="mt-5 max-w-[46ch] space-y-4 text-[17px] leading-[1.6] text-stone">{body}</div>
        </div>
        <div className={reverse ? "lg:order-1" : ""}>{visual}</div>
      </div>
    </section>
  );
}

export function Requirements({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <section aria-labelledby="requirements" className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <h2 id="requirements" className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
          What you need
        </h2>
        <dl className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <div key={item.label} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-[15px] font-semibold">{item.label}</dt>
              <dd className="text-[15px] leading-[1.6] text-stone">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Questions({ items }: { items: { question: string; answer: ReactNode }[] }) {
  return (
    <section aria-labelledby="questions" className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <h2 id="questions" className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
          Questions
        </h2>
        <div className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[16.5px] font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="relative size-4 shrink-0">
                  <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-stone" />
                  <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-stone transition-transform group-open:scale-y-0" />
                </span>
              </summary>
              <div className="max-w-[62ch] pb-5 text-[15.5px] leading-[1.65] text-stone">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingCta({ title, body, actions }: { title: string; body: string; actions: ReactNode }) {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-20 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="max-w-[18ch] text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {title}
          </h2>
          <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.55] text-white/65">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>
      </div>
    </section>
  );
}
