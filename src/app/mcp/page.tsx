import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLd from "@/components/seo/JsonLd";
import PageShell from "@/components/site/PageShell";
import { ButtonLink } from "@/components/buttons";
import { ClosingCta, FeatureGrid, PageHero, Questions, Requirements, SectionHeading } from "@/components/page-parts";
import { publicPageMetadata } from "@/lib/seo";
import { products, SCOPE_CONNECTOR_GOOGLE_LIVE, SCOPE_CONNECTOR_URL, SUPPORT_EMAIL } from "@/lib/site";
import { breadcrumbSchema, faqSchema, type FaqEntry } from "@/lib/structured-data";

const CONNECTOR_HOME = new URL(SCOPE_CONNECTOR_URL).origin;

export const metadata: Metadata = publicPageMetadata({
  title: "Scope in Claude, ChatGPT, and other AI assistants",
  description:
    "Connect Scope to the AI assistant you already use. It can find your course files, see what's due in Canvas, and read your syllabi, with your own sign-in and read-only access to Canvas.",
  path: "/mcp",
  keywords: ["Scope MCP", "Canvas MCP server", "Canvas Claude connector", "Canvas ChatGPT", "MCP for students", "Scope connector"],
});

const features = [
  {
    title: "See what's due",
    body: "Ask what's due this week across every Canvas course, with submission status and links back to each assignment.",
  },
  {
    title: "Find the right file",
    body: "Search your courses' modules, pages, and files, and the PDFs in your Scope library, then read them in the chat.",
  },
  {
    title: "Check the rules",
    body: "Pull grading weights, late policies, exam dates, and office hours from your syllabi before you plan your week.",
  },
  {
    title: "Catch up on announcements",
    body: "Get the latest announcements and discussion threads from each course in one place.",
  },
  {
    title: "Review your feedback",
    body: "Read your own submissions, scores, and rubric comments to see what to work on next.",
  },
  SCOPE_CONNECTOR_GOOGLE_LIVE
    ? {
        title: "Bring in Google",
        body: "Connect Google to search your email, plan around your calendar, and work in your Docs, Sheets, and Forms. Anything that sends, shares, or changes something asks you first.",
      }
    : {
        title: "Your to-dos and notes",
        body: "Bring the to-dos and dashboard notes you keep in Scope for Canvas into the conversation.",
      },
];

const faqs: FaqEntry[] = [
  {
    question: "Can the assistant change anything in Canvas?",
    answer:
      "No. Canvas and your Scope library are read-only. The assistant can't submit work, post, or change grades or settings.",
  },
  {
    question: "Will it do my homework for me?",
    answer:
      `It's there to help you find, plan, and understand your coursework. Your course's rules on AI help still apply, and the assistant is asked to follow them. For tutoring that stays inside a study mode you choose, use ${products.polya.name}.`,
  },
  {
    question: "How does it get into my Canvas courses?",
    answer:
      "You make an access token in Canvas and paste it on Scope's connect page, never into a chat. You can remove it any time, from Scope or by deleting the token in Canvas. If your school doesn't let students make access tokens, Canvas can't be connected yet.",
  },
  ...(SCOPE_CONNECTOR_GOOGLE_LIVE
    ? [
        {
          question: "Why does Google warn that the app isn't verified?",
          answer:
            "Google hasn't reviewed Scope's Google connection, so it shows a warning before you allow access. To continue, choose Advanced, then go to Scope. Google and Canvas access are optional; the connector works without them.",
        },
      ]
    : []),
  {
    question: "What does Scope keep?",
    answer:
      "Your connections and a 30-day log of which tools ran, never what they read. Your files, course content, and messages go straight to your assistant and aren't stored by Scope.",
  },
  {
    question: "Something isn't working. Who do I ask?",
    answer: `Email ${SUPPORT_EMAIL}.`,
  },
  {
    question: "How do I disconnect?",
    answer: `Remove Scope from your assistant's settings, or disconnect any assistant or account at ${CONNECTOR_HOME.replace("https://", "")}/account. You can also delete everything Scope's connector keeps for you there.`,
  },
];

function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mt-5 space-y-3 text-[16px] leading-[1.6] text-ink-soft">
      {items.map((item, index) => (
        <li key={index} className="grid grid-cols-[1.75rem_1fr] gap-2">
          <span className="font-semibold text-stone">{index + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

const address = <code className="rounded-md border border-line bg-wash px-1.5 py-0.5 text-[14px] text-ink [overflow-wrap:anywhere]">{SCOPE_CONNECTOR_URL}</code>;

export default function ConnectorPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "AI assistants", path: "/mcp" },
          ]),
          faqSchema(faqs),
        ]}
      />
      <PageHero
        kicker="Scope for AI assistants"
        title="Your courses, in the assistant you already use."
        lede="Connect Scope to Claude, ChatGPT, or another assistant. Ask what's due, find the right reading, and check your syllabus without leaving the chat."
        actions={
          <>
            <ButtonLink href="#setup" variant="primary" size="lg">
              Set it up
            </ButtonLink>
            <ButtonLink href={`${CONNECTOR_HOME}/account`} variant="secondary" size="lg">
              Manage connections
            </ButtonLink>
          </>
        }
      />

      <section aria-labelledby="setup" className="border-y border-line bg-wash">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            id="setup"
            title="Add one address."
            intro="Every assistant that supports custom connectors uses the same address. You sign in with your Scope account the first time."
          />
          <div className="mt-8 rounded-[18px] border border-line bg-paper p-6">
            <p className="text-[15px] font-semibold text-ink">Connector address</p>
            <p className="mt-2 text-[16px]">{address}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div>
              <h3 className="text-[20px] font-semibold tracking-[-0.02em]">Claude</h3>
              <Steps
                items={[
                  "On claude.ai or the Claude desktop app, open Customize, then Connectors.",
                  <>Choose <strong>Add custom connector</strong> and enter the address.</>,
                  "Sign in with your Scope account when asked. Scope then works in Claude on the web, desktop, and phone.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-[20px] font-semibold tracking-[-0.02em]">ChatGPT</h3>
              <Steps
                items={[
                  "In ChatGPT, open Settings, then Security and login, and turn on Developer mode.",
                  <>Go to Plugins, choose <strong>+</strong>, name it Scope, and enter the address.</>,
                  "Sign in with your Scope account when asked.",
                ]}
              />
            </div>
            <div>
              <h3 className="text-[20px] font-semibold tracking-[-0.02em]">Claude Code</h3>
              <Steps
                items={[
                  <>
                    Run{" "}
                    <code className="rounded-md border border-line bg-paper px-1.5 py-0.5 text-[13px] text-ink [overflow-wrap:anywhere]">
                      claude mcp add --transport http scope {SCOPE_CONNECTOR_URL}
                    </code>
                  </>,
                  <>Type <strong>/mcp</strong> in Claude Code and sign in with your Scope account.</>,
                ]}
              />
            </div>
          </div>
          <p className="mt-10 max-w-[62ch] text-[15.5px] leading-[1.6] text-stone">
            To bring in Canvas, ask your assistant to connect Canvas. It gives you a link to a Scope page where you paste a
            Canvas access token.
          </p>
        </div>
      </section>

      <FeatureGrid
        id="what-it-does"
        title="What you can ask."
        intro="The assistant reads only your own accounts, with your sign-in."
        features={features}
      />

      <Requirements
        items={[
          { label: "Assistant", value: "Claude, ChatGPT, Claude Code, or another assistant that supports custom connectors." },
          { label: "Account", value: "A Scope account. Sign in with Google or GitHub." },
          {
            label: "Canvas",
            value: "A Canvas access token, made in Canvas under Account, then Settings. Some schools don't allow them.",
          },
          { label: "Price", value: "Free." },
        ]}
      />

      <Questions items={faqs} />

      <ClosingCta
        title="Bring your courses into the chat."
        body={`Add ${SCOPE_CONNECTOR_URL.replace("https://", "")} to your assistant and sign in with Scope.`}
        actions={
          <ButtonLink href="#setup" variant="inverted" size="lg">
            Set it up
          </ButtonLink>
        }
      />
    </PageShell>
  );
}
