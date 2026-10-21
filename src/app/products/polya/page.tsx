import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import PageShell from "@/components/site/PageShell";
import { ButtonLink, PolyaButton } from "@/components/buttons";
import { PolyaMock } from "@/components/mocks/polya-mock";
import {
  ClosingCta,
  FeatureGrid,
  PageHero,
  Questions,
  Requirements,
  SectionHeading,
} from "@/components/page-parts";
import { publicPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema, type FaqEntry } from "@/lib/structured-data";

export const metadata: Metadata = publicPageMetadata({
  title: "Polya, a tutor that knows the course",
  description:
    "Polya grounds every hint in your actual course materials and cites the page, slide, or lecture moment it came from. It is Socratic by default, with guided help that gets you to the answer and stops there.",
  path: "/products/polya",
  keywords: [
    "Polya",
    "Scope Polya",
    "AI tutor",
    "course-grounded AI",
    "cited AI answers",
    "Socratic tutoring",
    "study help",
  ],
});

const modes = [
  {
    name: "Open",
    does: "Gives full answers and walkthroughs when you ask.",
    for: "Reading up and reviewing material you already understand.",
  },
  {
    name: "Guided",
    does: "Starts with hints and one step at a time. Holds the full solution until you've had a go.",
    for: "Homework and problem sets you're working through.",
    isDefault: true,
  },
  {
    name: "Practice",
    does: "You commit to an answer before Polya reveals anything. Answer keys are hidden.",
    for: "Testing yourself before an exam.",
  },
  {
    name: "Review",
    does: "Gives full worked solutions, then suggests a related problem to try.",
    for: "Going over work after the deadline.",
  },
];

const features = [
  {
    title: "Check every answer",
    body: "Each claim carries a numbered citation. Select it to open the PDF at the cited page, or the passage it came from.",
  },
  {
    title: "Get the next step",
    body: "Use I'm stuck — next step for one more hint, and Check yourself to try a related question on your own.",
  },
  {
    title: "Prepare for an exam",
    body: "Add an exam, map its topics, and practice exam-style questions written from your course. Answers are graded the same way every time.",
  },
  {
    title: "Bring in a course",
    body: "Import a Canvas course with Scope for Canvas, add a public class website, or upload your own PDFs and lecture transcripts.",
  },
  {
    title: "Leave a note for the tutor",
    body: "Tell Polya about a method your professor wants you to use, like the substitution method from Lecture 8.",
  },
  {
    title: "Use it in ChatGPT or Claude",
    body: "Connect Polya so the assistant you already use can search your course materials and follow the study mode you chose.",
  },
];

const faqs: FaqEntry[] = [
    {
      question: "Can Polya be wrong?",
      answer:
        "Yes. Polya is an AI tutor, and its answers can be wrong. Every answer that uses your course shows its sources, so you can open the page and check.",
    },
    {
      question: "Will Polya just give me the answers?",
      answer:
        "Not by default. In Guided mode, Polya starts with hints and holds the full solution until you've had a go. You choose each course's mode, and your syllabus and your school's honor code decide what help is allowed.",
    },
    {
      question: "Can my instructor set the study mode?",
      answer: "No. Study modes are your own choice for each course.",
    },
    {
      question: "Does ChatGPT or Claude have to follow my study mode?",
      answer:
        "Polya tells the assistant which mode you chose and asks it to check again for each new question. Polya can't force another company's assistant to follow it, so if one goes past your mode, remind it to check the course's study rules.",
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
      <PageHero
        kicker="Polya, a course-aware AI tutor"
        title="A tutor that knows your course."
        lede="Polya answers from your own readings, slides, and lectures, and every answer links to the page it came from. On a problem, it starts with a hint and gives you one step at a time."
        actions={
          <>
            <PolyaButton variant="primary" />
            <ButtonLink href={`${site.docsUrl}/polya/overview`} variant="secondary" size="lg">
              Read the guide
            </ButtonLink>
          </>
        }
        visual={<PolyaMock />}
      />

      <section aria-labelledby="modes" className="border-y border-line bg-wash">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            id="modes"
            title="You decide how much help you get."
            intro="Each course has a study mode, and you can change it any time. Concept questions get a full answer in every mode. The modes differ in how Polya handles problems you're asked to solve."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[22px] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
            {modes.map((mode) => (
              <div key={mode.name} className="flex flex-col bg-paper p-7">
                <h3 className="flex items-center gap-2.5 text-[20px] font-semibold tracking-[-0.02em]">
                  {mode.name}
                  {mode.isDefault && (
                    <span className="rounded-full bg-red-tint px-2 py-0.5 text-[12px] font-semibold tracking-normal text-red">
                      Default
                    </span>
                  )}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink-soft">{mode.does}</p>
                <p className="mt-5 border-t border-line pt-4 text-[14px] leading-[1.5] text-stone">
                  Good for {mode.for.charAt(0).toLowerCase() + mode.for.slice(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid
        id="features"
        title="Built to help you learn it."
        intro="Polya is built to help you understand the material, not to finish your work for you."
        features={features}
      />

      <Requirements
        items={[
          { label: "Browser", value: "Any web browser, on a computer, tablet, or phone." },
          { label: "Account", value: "A Google account to sign in. Polya keeps your courses for you." },
          {
            label: "Materials",
            value: "A Canvas course, a public course website, or PDFs and lecture transcripts on your device.",
          },
          { label: "Price", value: "Free." },
        ]}
      />

      <Questions items={faqs} />

      <ClosingCta
        title="Bring a course to Polya."
        body="Sign in with Google, add your course, and ask your first question."
        actions={<PolyaButton variant="inverted" />}
      />
    </PageShell>
  );
}
