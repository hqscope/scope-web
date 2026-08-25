import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  FileJson,
  NotebookPen,
  PackageOpen,
  PencilLine,
  WifiOff,
} from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  lectraFeaturePageSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { LECTRA_APP_STORE_URL } from "@/lib/site";

const description =
  "Lectra Notes runs real Jupyter .ipynb notebooks on iPad — on-device Python with numpy, pandas, and matplotlib, no cloud kernel, fully offline.";

export const metadata: Metadata = {
  title: "Lectra Notes — Jupyter Notebooks on iPad, Offline",
  description,
  alternates: {
    canonical: "/products/lectra/notebooks",
  },
  keywords: [
    "iPad Python notebook",
    "Jupyter iPad",
    "run ipynb on iPad",
    "Python on iPad offline",
    "iPad data science app",
    "numpy pandas matplotlib iPad",
    "Jupyter notebook app for students",
    "Lectra Notes notebooks",
  ],
  openGraph: {
    title: "Lectra Notes — Jupyter Notebooks on iPad, Offline",
    description,
    type: "website",
    url: "/products/lectra/notebooks",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lectra Notes — Jupyter Notebooks on iPad, Offline",
    description,
  },
};

const features = [
  {
    icon: FileJson,
    title: "Real .ipynb files",
    copy:
      "Notebooks are genuine Jupyter documents. Import one from class, work it, and it round-trips — cells, outputs, and metadata preserved.",
  },
  {
    icon: NotebookPen,
    title: "A live kernel, on the iPad",
    copy:
      "Code cells run real CPython on the device with state that persists across cells — variables defined in one cell are there in the next.",
  },
  {
    icon: BarChart3,
    title: "Charts where you made them",
    copy:
      "numpy, pandas, matplotlib, and Pillow ship built in. Plots render inline in the notebook, computed entirely on the iPad.",
  },
  {
    icon: PackageOpen,
    title: "More packages when you need them",
    copy:
      "Install many pure-Python packages from PyPI in a cell; installs are kept locally so the notebook still runs next time, offline.",
  },
  {
    icon: WifiOff,
    title: "No cloud kernel, no account",
    copy:
      "Nothing executes on a server. Airplane mode in lecture, a basement lab, a flight home — the notebook neither knows nor cares.",
  },
  {
    icon: PencilLine,
    title: "Beside your handwriting",
    copy:
      "Notebooks live in the same library as your PDFs and Pencil notes — the reading, the derivation, and the computation stay together.",
  },
];

const faqs: FaqEntry[] = [
  {
    question: "Can I run Jupyter notebooks on an iPad?",
    answer:
      "Yes. Lectra Notes opens and runs real .ipynb notebooks with an on-device Python kernel — markdown and code cells, persistent state, and inline plots, with no cloud kernel behind it.",
  },
  {
    question: "Does it need an internet connection?",
    answer:
      "No. Python runs entirely on the iPad, so notebooks execute offline. You only need a connection the moment you install a new package from PyPI — after that, the install is kept locally.",
  },
  {
    question: "Which packages are included?",
    answer:
      "numpy, pandas, matplotlib, and Pillow ship with the app, and many pure-Python packages can be installed from PyPI inside a notebook cell.",
  },
  {
    question: "Is it real Python?",
    answer:
      "Yes — real CPython running on the device, not a subset or a remote interpreter. The same code that runs in class runs in Lectra Notes.",
  },
  {
    question: "Are notebooks a paid feature?",
    answer:
      "No. Lectra Notes is free with no tiers or subscriptions — notebooks, the terminal, Git, and the code editor are all part of the free app.",
  },
];

export default function LectraNotebooksPage() {
  return (
    <PublicPageFrame
      active="lectra"
      footerVariant="slim"
      headerCta={{ label: "Get Lectra", href: LECTRA_APP_STORE_URL, external: true }}
    >
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lectra", path: "/products/lectra" },
            { name: "Notebooks", path: "/products/lectra/notebooks" },
          ]),
          lectraFeaturePageSchema(
            "Lectra Notes — Jupyter Notebooks on iPad, Offline",
            "/products/lectra/notebooks",
            description,
          ),
          faqSchema(faqs),
          howToSchema(
            "How to run a Jupyter notebook on an iPad",
            "/products/lectra/notebooks",
            "Run a real .ipynb notebook with on-device Python using Lectra Notes, free on the App Store.",
            [
              {
                name: "Get Lectra Notes",
                text: "Download Lectra Notes free from the App Store on your iPad.",
              },
              {
                name: "Open a notebook",
                text: "Import an .ipynb file through the Files app or the share sheet, or create a new notebook in the library.",
              },
              {
                name: "Run the cells",
                text: "Tap run — code executes in on-device Python with numpy, pandas, and matplotlib available, and plots render inline.",
              },
              {
                name: "Hand it back",
                text: "Export the notebook as a standard .ipynb — cells, outputs, and metadata intact — and share it anywhere.",
              },
            ],
          ),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Lectra Notes · Notebooks</p>
          <h1>Jupyter notebooks that run on your iPad. Offline.</h1>
          <p className="centered-hero-lede">
            Real .ipynb files, a real Python kernel, and inline charts — in the
            same library as your readings and handwritten notes. No cloud
            kernel, no account, no connection required.
          </p>
          <div className="pill-actions">
            <a
              href={LECTRA_APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="button-primary"
            >
              Download on the App Store
            </a>
            <Link href="/products/lectra" className="button-secondary">
              All of Lectra Notes →
            </Link>
          </div>
          <p className="hero-note">iPadOS 18+ · Free</p>
        </div>
      </section>

      <section className="page-wrap section-pad" id="features">
        <h2 className="sr-only">Notebook features in Lectra Notes</h2>
        <div className="plain-grid" data-reveal>
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title}>
                <Icon
                  className="h-5 w-5 text-[var(--color-brand)]"
                  aria-hidden="true"
                />
                <h3 className="mt-3">{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-band" id="how">
        <div className="page-wrap split-section" style={{ paddingBlock: 0 }}>
          <div data-reveal>
            <p className="kicker kicker-muted">How it works</p>
            <h2>Import, run, hand back.</h2>
          </div>
          <div data-reveal>
            <p
              style={{
                color: "var(--color-ink-soft)",
                fontSize: "1rem",
                lineHeight: 1.65,
              }}
            >
              Import an .ipynb through the Files app or the share sheet — or
              start a fresh notebook — then run cells against on-device Python.
              When it&apos;s done, export a standard notebook that opens in
              Jupyter anywhere. For scripts, a shell, and version control, see{" "}
              <Link href="/products/lectra/code">the coding workspace</Link>;
              for handwritten work on paper styles, that&apos;s what{" "}
              <Link href="/products/lectra">the rest of Lectra Notes</Link> is
              for.
            </p>
          </div>
        </div>
      </section>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>Notebooks on iPad, answered.</h2>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>Run your first cell today.</h2>
          <p>
            <a href={LECTRA_APP_STORE_URL} target="_blank" rel="noreferrer">
              Lectra Notes on the App Store
            </a>{" "}
            — free, offline, and ready for the problem set.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
