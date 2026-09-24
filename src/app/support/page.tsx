import Link from "next/link";

import Sheet from "@/components/motion/Sheet";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import { publicPageMetadata } from "@/lib/seo";
import { CHROME_WEB_STORE_URL, SUPPORT_EMAIL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

import "../_company/company.css";

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

      <Sheet labelledBy="support-title">
        <PageHead
          title={<span id="support-title">Something not working? Tell us.</span>}
          lede="Scope is built by a small team, and the same people who write the software answer the email. There is no ticket queue and no phone tree. Write to us and you will hear back from a person."
        />
        <div className="shell co-contact" style={{ paddingBottom: "var(--section)" }}>
          <a href={mailtoHref} className="co-card plane">
            <h2>Email us</h2>
            <p className="co-card-line">{SUPPORT_EMAIL}</p>
            <p>
              Bugs, questions, account help, feature requests, or anything about how your
              data is handled. Replies usually take a day or two.
            </p>
          </a>
          <StoreLink
            store="chrome-web-store"
            href={CHROME_WEB_STORE_URL}
            className="co-card plane"
          >
            <h2>Reinstall or update</h2>
            <p className="co-card-line">Chrome Web Store</p>
            <p>
              A surprising number of problems clear up after you update to the latest
              version from the Chrome Web Store and reload your LMS tab.
            </p>
          </StoreLink>
        </div>
      </Sheet>

      <Sheet className="section" labelledBy="email-title">
        <div className="shell split">
          <div>
            <h2 id="email-title" className="t-head" data-focus>
              What to put in the email.
            </h2>
            <p className="copy co-copy-gap">
              Four details get you a faster answer. Please do not send passwords or LMS
              login details. We never need them, and we will never ask for them.
            </p>
          </div>
          <div className="co-email plane" aria-label="An example support email">
            <div className="co-email-meta">
              <p>
                <span>To</span>
                <span>{SUPPORT_EMAIL}</span>
              </p>
              <p>
                <span>Subject</span>
                <span>Scope support</span>
              </p>
            </div>
            <div className="co-email-body">
              <ul className="feature-list">
                {emailChecklist.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Sheet>

      <Sheet className="section" labelledBy="product-title">
        <div className="shell">
          <h2 id="product-title" className="t-head" data-focus style={{ marginBottom: 40 }}>
            Where to look first.
          </h2>
          <div className="co-help">
            {productHelp.map((topic) => (
              <div key={topic.title}>
                <h3>{topic.title}</h3>
                <p>{topic.copy}</p>
                <Link href={topic.action.href} className="link">
                  {topic.action.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      <section className="on-desk shell section co-closing" aria-labelledby="closing-title">
        <h2 id="closing-title" className="t-title" data-focus>
          Still stuck? Write to us.
        </h2>
        <div className="actions">
          <a href={mailtoHref} className="btn btn-primary">
            Email support
          </a>
          <Link href="/privacy" className="btn btn-line">
            Privacy policy
          </Link>
          <Link href="/terms" className="btn btn-line">
            Terms
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
