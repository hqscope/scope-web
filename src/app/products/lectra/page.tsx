import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import PageShell from "@/components/site/PageShell";
import { AppStoreButton, ButtonLink } from "@/components/buttons";
import { HandInScene, SendScene } from "@/components/mocks/flow-mocks";
import { LectraMock } from "@/components/mocks/lectra-mock";
import {
  ClosingCta,
  FeatureGrid,
  PageHero,
  Questions,
  Requirements,
  SplitSection,
} from "@/components/page-parts";
import { publicPageMetadata } from "@/lib/seo";
import { LECTRA_APP_STORE_CAMPAIGN_URL, site } from "@/lib/site";
import {
  breadcrumbSchema,
  faqSchema,
  lectraSoftwareSchema,
  type FaqEntry,
} from "@/lib/structured-data";

const PAGE_PATH = "/products/lectra";

// Open Graph and Twitter images come from the sibling opengraph-image.tsx and
// twitter-image.tsx routes, which take precedence over config metadata.
export const metadata: Metadata = {
  ...publicPageMetadata({
    title: "Lectra Notes: Free iPad Note-Taking App for Students",
    description:
      "Lectra Notes is a free iPad note-taking app: Apple Pencil markup for lecture slides and PDFs, an offline library, plus Python notebooks, a terminal, and Git. No subscription.",
    path: PAGE_PATH,
    keywords: [
      "Lectra Notes",
      "Scope Lectra",
      "Lectra App Store",
      "Apple Pencil PDF annotation",
      "iPad Python notebook",
      "Jupyter iPad",
      "iPad terminal",
      "git on iPad",
      "Lectra on-device AI",
      "Attach from Lectra",
      "student PDF annotation",
      "iPad study companion",
      "iPad PDF editor",
      "handwritten notes iPad",
      "local-first document reader",
      "DropBridge v3",
      "iPad note-taking app for students",
      "free note taking app iPad",
      "annotate lecture slides iPad",
    ],
  }),
  // Safari's Smart App Banner on iPhone and iPad. The id is the one in
  // LECTRA_APP_STORE_URL; the argument sends the banner tap back here.
  itunes: {
    appId: "6759754531",
    appArgument: "https://www.canvascope.org/products/lectra",
  },
};

const features = [
  {
    title: "Write on any page",
    body: "Write, highlight, erase, select, and draw shapes with Apple Pencil. Double-tap, squeeze, and hover work the way you'd expect.",
  },
  {
    title: "Record the lecture",
    body: "Record while you write, then tap your notes to hear that moment.",
  },
  {
    title: "Search your handwriting",
    body: "Find words in your PDFs, your typed notes, and your handwriting.",
  },
  {
    title: "Notebooks and scans",
    body: "Start from blank, lined, grid, dotted, or Cornell paper. Scan worksheets and handouts into PDFs you can mark up.",
  },
  {
    title: "Ask about a document",
    body: "Summaries and answers about your documents are written on your iPad with Apple Intelligence, on supported devices. They're off until you turn them on.",
  },
  {
    title: "Python, on your iPad",
    body: "Run Python and open Jupyter notebooks with charts, with no internet connection. A terminal, Git, and a code editor are there when a course needs them.",
  },
];

const faqs: FaqEntry[] = [
    {
      question: "Do I need an account?",
      answer:
        "No. Choose Sign in later and everything stays on your iPad. Sign in if you want a backup copy of your pages or want to receive PDFs from Chrome.",
    },
    {
      question: "Do my notes sync between devices?",
      answer:
        "No. When you're signed in, Lectra Notes keeps a backup copy of your pages with your markup drawn on them. Your editable ink stays on your iPad.",
    },
    {
      question: "Do I need Apple Intelligence?",
      answer:
        "Only for summaries and answers about your documents. Everything else works on any supported iPad.",
    },
    {
      question: "Why is it called Lectra Notes on the App Store?",
      answer: "That's its full name. Search the App Store for Lectra Notes to find it.",
    },
];

export default function LectraPage() {
  return (
    <PageShell
      active="lectra"
      cta={{
        label: "Get Lectra Notes",
        href: LECTRA_APP_STORE_CAMPAIGN_URL,
        store: "app-store",
      }}
    >
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lectra Notes", path: PAGE_PATH },
          ]),
          lectraSoftwareSchema(),
          faqSchema(faqs),
        ]}
      />
      <PageHero
        kicker="Lectra Notes, a free app for iPad"
        title="Read it, mark it up, work it out."
        lede="Lectra Notes is where your course documents turn into work. Write on PDFs with Apple Pencil, record the lecture while you take notes, and when the reading turns into code, run a Python notebook in the same library."
        actions={
          <>
            <AppStoreButton variant="primary" />
            <ButtonLink href={`${site.docsUrl}/lectra/overview`} variant="secondary" size="lg">
              Read the guide
            </ButtonLink>
          </>
        }
        visual={<LectraMock />}
      />

      <FeatureGrid
        id="features"
        title="Everything a reading turns into."
        intro="Your library lives on your iPad and works without an internet connection. You don't need an account to use it."
        features={features}
      />

      <SplitSection
        id="from-chrome"
        title="From the course site to your iPad, and back."
        body={
          <>
            <p>
              With Scope for Canvas in Chrome, send a course PDF to Lectra Notes in one step. It
              lands in the Scope Inbox in your library.
            </p>
            <p>
              When you&apos;re done, choose Select from Lectra on a Canvas or Gradescope upload page
              to attach your marked-up PDF. You still press submit.
            </p>
          </>
        }
        visual={<SendScene />}
      />

      <SplitSection
        id="hand-in"
        title="Hand in what you wrote, not a photo of it."
        reverse
        body={
          <p>
            Export a clean PDF with your ink on it to hand in or share, or keep a full Lectra copy
            you can keep editing later.
          </p>
        }
        visual={<HandInScene />}
      />

      <Requirements
        items={[
          { label: "Device", value: "An iPad with iPadOS 18 or later. Lectra Notes also runs on iPhone with iOS 18 or later." },
          { label: "Apple Pencil", value: "Recommended for handwriting. You can also write with your finger." },
          {
            label: "Account",
            value: "Optional. You need one only to back up your pages and to receive files sent from Scope for Canvas.",
          },
          { label: "Price", value: "Free, with no ads and no tracking." },
        ]}
      />

      <Questions items={faqs} />

      <ClosingCta
        title="Get Lectra Notes for iPad."
        body="Free on the App Store. Open a PDF and start writing."
        actions={<AppStoreButton variant="inverted" />}
      />
    </PageShell>
  );
}
