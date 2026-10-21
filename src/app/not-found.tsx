import { ButtonLink } from "@/components/buttons";
import PageShell from "@/components/site/PageShell";

export default function NotFound() {
  return (
    <PageShell>
    <section className="mx-auto max-w-[1200px] px-5 py-28 sm:px-8 sm:py-40">
      <p className="text-[15px] font-medium text-stone">Page not found</p>
      <h1 className="mt-5 max-w-[16ch] text-[clamp(2.4rem,5.4vw,4rem)] font-semibold leading-[1] tracking-[-0.045em]">
        This page isn&apos;t here anymore.
      </h1>
      <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.55] text-stone">
        It may have moved when the site was rebuilt. Start from the home page, or look it up in the
        documentation.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">Go to the home page</ButtonLink>
        <ButtonLink href="https://docs.canvascope.org" variant="secondary" size="lg">
          Open the documentation
        </ButtonLink>
      </div>
    </section>
    </PageShell>
  );
}
