import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import Sheet from "@/components/motion/Sheet";
import FaqList from "@/components/site/FaqList";
import Mark from "@/components/site/Mark";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import {
  breadcrumbSchema,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { CHROME_WEB_STORE_URL, POLYA_LOGIN_URL } from "@/lib/site";

import "./polya.css";
import HintScene from "./HintScene";

export const metadata: Metadata = {
  title: "Polya, a tutor that knows the course",
  description:
    "Polya grounds every hint in your actual course materials and cites the page, slide, or lecture moment it came from. It is Socratic by default, with guided help that gets you to the answer and stops there.",
  alternates: {
    canonical: "/products/polya",
  },
  keywords: [
    "Polya",
    "Scope Polya",
    "AI tutor",
    "course-grounded AI",
    "cited AI answers",
    "Socratic tutoring",
    "study help",
  ],
  openGraph: {
    title: "Polya, a tutor that knows the course",
    description:
      "Every hint comes from your course materials, with the source linked.",
    type: "website",
    url: "/products/polya",
  },
};

const principles = [
  {
    title: "Your course, and only your course",
    copy:
      "Hints come from the slides, readings, and recordings your instructor actually posted. If it isn't in the course, Polya says so.",
  },
  {
    title: "Every answer points home",
    copy:
      "The page, the slide, the minute of lecture. Click through and read the source yourself, because that's the point.",
  },
  {
    title: "It stops before the last step",
    copy:
      "Socratic by default. Polya asks what you tried, narrows the gap, and makes you do the last step.",
  },
];

const faqs: FaqEntry[] = [
  {
    question: "Why is it called Polya?",
    answer:
      "After George Pólya, the mathematician who wrote How to Solve It. He argued that you learn by being led to the answer instead of being handed it, and that is the whole design of this tutor.",
  },
  {
    question: "Where do the answers come from?",
    answer:
      "Only from your course materials: the slides, readings, pages, and recordings your instructor posted. Polya cites the page, slide, or lecture timestamp behind every hint, and says so plainly when something is not in the course.",
  },
  {
    question: "Will Polya just give me the answer?",
    answer:
      "No. Polya asks what you have already tried, narrows the gap, and leaves the last step to you. It is built to get you unstuck without carrying you.",
  },
  {
    question: "Do I need the Scope extension?",
    answer:
      "No, but Polya works best with it. The extension is what indexes your courses, so with it installed Polya already knows the material you are asking about.",
  },
];

export default function PolyaPage() {
  return (
    <PageShell active="polya">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Polya", path: "/products/polya" },
          ]),
          faqSchema(faqs),
        ]}
      />

      {/* Hero. */}
      <Sheet>
        <PageHead
          context="Polya, on the web and free"
          title="A tutor that knows the course."
          lede={
            <p>
              Named for George Pólya, who taught that you learn by being led to the
              answer instead of being handed it. Polya grounds every hint in your
              actual course materials and cites where it came from.
            </p>
          }
        >
          <Link href={POLYA_LOGIN_URL} className="btn btn-primary">
            Try Polya for free
          </Link>
          <Link href="/products/extension" className="btn btn-line">
            Pairs with the extension
          </Link>
        </PageHead>
      </Sheet>

      {/* The scene: one stuck step, circled and left for the student. */}
      <section className="on-desk section polya-scene-band" aria-labelledby="scene-title">
        <div className="shell">
          <div className="polya-scene-head">
            <h2 id="scene-title" className="t-head" data-focus>
              It finds the step. You fix it.
            </h2>
            <p className="margin-note">
              The hint points at the slide it came from and asks what differs. The
              last step stays yours.
            </p>
          </div>
          <HintScene
            header="Math 53, grounded in 214 documents"
            question="I keep getting the wrong sign when I set up the Lagrangian for problem 3. Where am I going wrong?"
            answer="Before I point at the step, write your constraint as g(x, y) = 0. Did you move the constant to the left side first? In lecture your professor set up the same form with the constant on the left. Compare your ∇g against slide 22 and tell me what differs."
            sources={["Lecture 14, slide 22", "Recording, 31:04"]}
            replyHint="Polya won't do the problem for you."
          />
        </div>
      </section>

      {/* Principles and questions. */}
      <Sheet className="section" labelledBy="principles-title">
        <div className="shell">
          <h2
            id="principles-title"
            className="t-head"
            data-focus
            style={{ maxWidth: "22ch" }}
          >
            A chatbot knows a little about everything. Polya knows your course.
          </h2>
          <div className="idea-grid idea-grid--3 polya-principles">
            {principles.map((principle) => (
              <div key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "var(--section)" }}>
            <h2 className="t-head polya-faq-head" data-focus>
              Questions people actually ask.
            </h2>
            <FaqList items={faqs} />
          </div>
        </div>
      </Sheet>

      {/* Close, on the desk. */}
      <section
        className="on-desk shell section polya-closing"
        id="try"
        aria-labelledby="closing-title"
      >
        <Mark size={48} />
        <h2 id="closing-title" className="t-title" data-focus>
          Get unstuck without getting carried.
        </h2>
        <div className="actions">
          <Link href={POLYA_LOGIN_URL} className="btn btn-primary">
            Try Polya for free
          </Link>
          <StoreLink
            store="chrome-web-store"
            href={CHROME_WEB_STORE_URL}
            className="btn btn-line"
          >
            Add Scope to Chrome for free
          </StoreLink>
        </div>
        <p className="btn-note">Works best with the Scope extension installed</p>
      </section>
    </PageShell>
  );
}
