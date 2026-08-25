import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import PolyaChatMock from "@/components/public/mocks/PolyaChatMock";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { CHROME_WEB_STORE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Polya — a tutor that knows the course",
  description:
    "Polya grounds every hint in your actual course materials and cites the page, slide, or lecture moment it came from. Socratic by default: guided help that gets you to the answer, not past it.",
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
    title: "Polya — a tutor that knows the course",
    description:
      "Not a chatbot that knows everything and nothing. Every hint comes from your course materials, with the source linked.",
    type: "website",
    url: "/products/polya",
  },
};

const principles = [
  {
    label: "Grounded",
    title: "Your course, not the internet",
    copy:
      "Hints come from the slides, readings, and recordings your instructor actually posted. If it isn't in the course, Polya says so.",
  },
  {
    label: "Cited",
    title: "Every answer points home",
    copy:
      "The page, the slide, the minute of lecture. Click through and read the source yourself — that's the point.",
  },
  {
    label: "Guided",
    title: "To the answer, not past it",
    copy:
      "Socratic by default. Polya asks what you tried, narrows the gap, and makes you do the last step.",
  },
];

const faqs: FaqEntry[] = [
  {
    question: "Why is it called Polya?",
    answer:
      "After George Pólya, the mathematician who wrote How to Solve It. His argument was that you learn by being led to the answer rather than handed it — which is the whole design of this tutor.",
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
    <PublicPageFrame active="polya" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Polya", path: "/products/polya" },
          ]),
          faqSchema(faqs),
        ]}
      />

      {/* --- Hero --- */}
      <section className="page-wrap centered-hero" data-reveal>
        <p className="kicker kicker--center">Polya — web · free</p>
        <h1>
          A tutor that knows the <em>course.</em>
        </h1>
        <p className="centered-hero-lede">
          Named for George Pólya, who taught that you learn by being led to the
          answer — not handed it. Polya grounds every hint in your actual course
          materials and cites where it came from.
        </p>
        <div className="pill-actions">
          <Link href="/products/polya#try" className="button-primary">
            Try Polya — free
          </Link>
          <Link href="/products/extension" className="button-secondary">
            Pairs with the extension →
          </Link>
        </div>
      </section>

      {/* --- The exchange --- */}
      <section className="page-wrap strip-section" data-reveal="scale">
        <div className="chat-stage">
          <PolyaChatMock
            header="Math 53 · grounded in 214 documents"
            question="I keep getting the wrong sign when I set up the Lagrangian for problem 3. Where am I going wrong?"
            answer="Before I point at the step — write your constraint as g(x, y) = 0. Did you move the constant to the left side first? In lecture your professor set up the same form with the constant on the left. Compare your ∇g against slide 22 and tell me what differs."
            sources={["Lecture 14 · Slide 22", "Recording · 31:04"]}
            replyHint="Polya won't do the problem for you"
          />
        </div>
      </section>

      {/* --- Principles --- */}
      <section className="section-band">
        <div className="page-wrap">
          <h2 className="section-heading" data-reveal>
            Not a chatbot that knows everything and nothing.
          </h2>
          <div
            className="plain-grid stack-top"
            data-reveal="stagger"
            style={{ "--stagger-step": "80ms" } as CSSProperties}
          >
            {principles.map((principle, index) => (
              <div
                key={principle.label}
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <p className="kicker kicker--bare">{principle.label}</p>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="page-wrap faq-section">
        <h2 className="section-heading" data-reveal>
          Questions people actually ask.
        </h2>
        <div className="faq-list" data-reveal>
          {faqs.map((faq) => (
            <div key={faq.question} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="page-wrap final-cta" id="try" data-reveal>
        <h2>Get unstuck without getting carried.</h2>
        <div className="pill-actions">
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            Add Scope to Chrome — free
          </a>
        </div>
        <p className="hero-note">
          Works best with the Scope extension installed
        </p>
      </section>
    </PublicPageFrame>
  );
}
