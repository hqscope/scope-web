import Link from "next/link";

import { ButtonLink } from "@/components/buttons";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import { publicPageMetadata } from "@/lib/seo";
import { CHROME_WEB_STORE_URL, SUPPORT_EMAIL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = publicPageMetadata({
  title: "Support",
  description:
    "Get help with Scope for Canvas, Lectra Notes, Agent Workspace, and your Scope account. Email canvascopeextension@gmail.com and a person will read it.",
  path: "/support",
});

const mailtoHref = `mailto:${SUPPORT_EMAIL}?subject=Scope%20support`;

const productHelp = [
  {
    title: "Scope for Canvas",
    copy: "If search comes up empty or a course looks out of date, open a course page in your LMS and let it finish indexing, then search again. Tell us your school and the course you were looking at, and we can narrow it down quickly.",
    action: { href: "/products/extension", label: "About the extension" },
  },
  {
    title: "Lectra Notes",
    copy: "Help with importing PDFs, annotating, exporting, and moving documents between Lectra Notes and Scope has its own page.",
    action: { href: "/support/lectra", label: "Lectra Notes support" },
  },
  {
    title: "Agent Workspace",
    copy: "Agent Workspace is still in early access. If you are on the list and something is broken, email us and mention which build you are running.",
    action: { href: "/products/agent-workspace", label: "About Agent Workspace" },
  },
  {
    title: "Account and data",
    copy: "Sign-in trouble, deleting your account, or a question about what we store and why. You can also disconnect Scope from your Google Account at any time.",
    action: { href: "/privacy", label: "Privacy policy" },
  },
];

const emailChecklist = [
  "Which app you were using: the Chrome extension, Lectra Notes, or the website",
  "Your school and the course, if it is a search or indexing problem",
  "What you expected to happen, and what happened instead",
  "A screenshot, if the problem is something you can see",
];

const cardClasses =
  "group flex flex-col rounded-[22px] bg-wash p-7 transition-colors hover:bg-[#efede8] sm:p-9";

export default function SupportPage() {
  return (
    <PageShell active="support">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Support", path: "/support" },
          ]),
        ]}
      />

      <PageHead
        title="Something not working? Tell us."
        lede="Scope is built by a small team, and the same people who write the software answer the email. There is no ticket queue and no phone tree. Write to us and you will hear back from a person."
      />

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 px-5 pb-20 sm:px-8 sm:pb-28 md:grid-cols-2">
        <a href={mailtoHref} className={cardClasses}>
          <h2 className="text-[clamp(1.4rem,2.6vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em]">
            Email us
          </h2>
          <p className="mt-2 text-[16px] font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 wrap-anywhere group-hover:decoration-red">
            {SUPPORT_EMAIL}
          </p>
          <p className="mt-4 max-w-[46ch] text-[15.5px] leading-[1.6] text-ink-soft">
            Bugs, questions, account help, feature requests, or anything about how your
            data is handled. Replies usually take a day or two.
          </p>
        </a>
        <StoreLink store="chrome-web-store" href={CHROME_WEB_STORE_URL} className={cardClasses}>
          <h2 className="text-[clamp(1.4rem,2.6vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em]">
            Reinstall or update
          </h2>
          <p className="mt-2 text-[16px] font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 group-hover:decoration-red">
            Chrome Web Store
          </p>
          <p className="mt-4 max-w-[46ch] text-[15.5px] leading-[1.6] text-ink-soft">
            A surprising number of problems clear up after you update to the latest
            version from the Chrome Web Store and reload your LMS tab.
          </p>
        </StoreLink>
      </div>

      <section aria-labelledby="email-title" className="border-y border-line bg-wash">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2
              id="email-title"
              className="max-w-[18ch] text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
            >
              What to put in the email.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-stone">
              Four details get you a faster answer. Please do not send passwords or LMS
              login details. We never need them, and we will never ask for them.
            </p>
          </div>
          <figure
            className="min-w-0 overflow-hidden rounded-[22px] bg-paper ring-1 ring-line"
            aria-label="An example support email"
          >
            <dl className="divide-y divide-line border-b border-line text-[14.5px]">
              <div className="flex gap-4 px-6 py-3.5">
                <dt className="w-16 shrink-0 text-stone">To</dt>
                <dd className="min-w-0 font-medium text-ink wrap-anywhere">{SUPPORT_EMAIL}</dd>
              </div>
              <div className="flex gap-4 px-6 py-3.5">
                <dt className="w-16 shrink-0 text-stone">Subject</dt>
                <dd className="min-w-0 font-medium text-ink">Scope support</dd>
              </div>
            </dl>
            <ul className="list-disc space-y-3 py-6 pl-11 pr-6 text-[15.5px] leading-[1.55] text-ink-soft marker:text-red">
              {emailChecklist.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </section>

      <section
        aria-labelledby="product-title"
        className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28"
      >
        <h2
          id="product-title"
          className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
        >
          Where to look first.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {productHelp.map((topic) => (
            <div key={topic.title} className="flex flex-col border-t border-line py-7">
              <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{topic.title}</h3>
              <p className="mt-2 max-w-[52ch] text-[15.5px] leading-[1.6] text-stone">
                {topic.copy}
              </p>
              <Link href={topic.action.href} className="link mt-4 w-fit text-[15px]">
                {topic.action.label}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="closing-title"
        className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-8 sm:pb-32"
      >
        <div className="flex flex-col gap-8 rounded-[22px] bg-wash p-8 sm:p-12 md:flex-row md:items-end md:justify-between">
          <h2
            id="closing-title"
            className="max-w-[16ch] text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
          >
            Still stuck? Write to us.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={mailtoHref} size="lg">
              Email support
            </ButtonLink>
            <ButtonLink href="/privacy" variant="secondary" size="lg">
              Privacy policy
            </ButtonLink>
            <ButtonLink href="/terms" variant="secondary" size="lg">
              Terms
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
