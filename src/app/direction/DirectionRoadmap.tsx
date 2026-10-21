export type DirectionStage = {
  id: "today" | "next" | "eventually";
  when: string;
  status: string;
  lead: string;
  copy: string;
  /** Only what ships today is written in ink. */
  shipping: boolean;
};

/** Rail colours: ink for what ships, a graphite dash for what is planned. */
export const RAIL_INK = "border-ink";
export const RAIL_PENCIL = "border-dashed border-[#bdb5aa]";

/**
 * The roadmap as a timeline. What ships today sits on a solid ink rail and
 * reads in ink. Plans sit on a dashed rail and read in graphite, because
 * plans change.
 */
export default function DirectionRoadmap({ stages }: { stages: DirectionStage[] }) {
  return (
    <ol className="mt-10">
      {stages.map((stage) => {
        const pencilled = !stage.shipping;

        return (
          <li
            key={stage.id}
            id={stage.id}
            data-pencil={pencilled || undefined}
            className={`relative scroll-mt-24 border-l-2 pb-12 pl-6 last:pb-2 sm:pl-10 ${
              pencilled ? RAIL_PENCIL : RAIL_INK
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute -left-[7px] top-2 size-3 rounded-full ${
                pencilled ? "bg-paper ring-2 ring-inset ring-[#bdb5aa]" : "bg-ink"
              }`}
            />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,3fr)_minmax(0,8fr)] md:gap-10">
              <div>
                <p className="text-[22px] font-semibold leading-[1.2] tracking-[-0.025em] text-ink">
                  {stage.when}
                </p>
                <p className="mt-1 text-[14.5px] font-medium text-stone">{stage.status}</p>
              </div>
              <div>
                <p
                  className={`text-[clamp(1.25rem,2.2vw,1.6rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-balance ${
                    pencilled ? "text-stone" : "text-ink"
                  }`}
                >
                  {stage.lead}
                </p>
                <p
                  className={`mt-3 max-w-[60ch] text-[16.5px] leading-[1.65] ${
                    pencilled ? "text-stone" : "text-ink-soft"
                  }`}
                >
                  {stage.copy}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
