import type { Metadata } from "next";
import Link from "next/link";

import Sheet from "@/components/motion/Sheet";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import FaqList, { type FaqItem } from "@/components/site/FaqList";
import PageShell from "@/components/site/PageShell";
import {
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  lectraFeaturePageSchema,
} from "@/lib/structured-data";
import { LECTRA_APP_STORE_URL } from "@/lib/site";

import "../lectra.css";
import NotebookSheet, { NotebookBars } from "../_visuals/NotebookSheet";

const title = "Lectra Notes: Jupyter Notebooks on iPad, Offline";

const description =
  "Lectra Notes runs real Jupyter .ipynb notebooks on iPad, with on-device Python, numpy, pandas, and matplotlib. There is no cloud kernel, and it works fully offline.";

export const metadata: Metadata = {
  title,
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
    title,
    description,
    type: "website",
    url: "/products/lectra/notebooks",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const features = [
  {
    title: "Real .ipynb files",
    copy: "Notebooks are genuine Jupyter documents. Import one from class and work it, and it round-trips with its cells, outputs, and metadata preserved.",
  },
  {
    title: "A live kernel, on the iPad",
    copy: "Code cells run real CPython on the device, and state persists across cells, so a variable you define in one cell is there in the next.",
  },
  {
    title: "Charts where you made them",
    copy: "numpy, pandas, matplotlib, and Pillow ship built in. Plots render inline in the notebook and are computed entirely on the iPad.",
  },
  {
    title: "More packages when you need them",
    copy: "Install many pure-Python packages from PyPI in a cell. Installs are kept locally, so the notebook still runs next time, offline.",
  },
  {
    title: "No cloud kernel and no account",
    copy: "Nothing executes on a server. Airplane mode in lecture, a basement lab, or a flight home makes no difference to the notebook.",
  },
  {
    title: "Beside your handwriting",
    copy: "Notebooks live in the same library as your PDFs and Pencil notes, so the reading, the derivation, and the computation stay together.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "Can I run Jupyter notebooks on an iPad?",
    answer:
      "Yes. Lectra Notes opens and runs real .ipynb notebooks with an on-device Python kernel. You get markdown and code cells, persistent state, and inline plots, with no cloud kernel behind it.",
  },
  {
    question: "Does it need an internet connection?",
    answer:
      "No. Python runs entirely on the iPad, so notebooks execute offline. You only need a connection at the moment you install a new package from PyPI, and after that the install is kept locally.",
  },
  {
    question: "Which packages are included?",
    answer:
      "numpy, pandas, matplotlib, and Pillow ship with the app, and many pure-Python packages can be installed from PyPI inside a notebook cell.",
  },
  {
    question: "Is it real Python?",
    answer:
      "Yes. It is real CPython running on the device. It is not a subset or a remote interpreter, and the same code that runs in class runs in Lectra Notes.",
  },
  {
    question: "Are notebooks a paid feature?",
    answer:
      "No. Lectra Notes is free with no tiers or subscriptions. Notebooks, the terminal, Git, and the code editor are all part of the free app.",
  },
];

const howToSteps = [
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
    text: "Tap run. Code executes in on-device Python with numpy, pandas, and matplotlib available, and plots render inline.",
  },
  {
    name: "Hand it back",
    text: "Export the notebook as a standard .ipynb with its cells, outputs, and metadata intact, and share it anywhere.",
  },
];

function StoreActions() {
  return (
    <>
      <StoreLink
        store="app-store"
        href={LECTRA_APP_STORE_URL}
        className="btn btn-primary"
      >
        Download on the App Store
      </StoreLink>
      <Link href="/products/lectra" className="btn btn-line">
        All of Lectra Notes
      </Link>
    </>
  );
}

export default function LectraNotebooksPage() {
  return (
    <PageShell
      active="lectra"
      cta={{
        label: "Get Lectra Notes",
        href: LECTRA_APP_STORE_URL,
        store: "app-store",
      }}
    >
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lectra", path: "/products/lectra" },
            { name: "Notebooks", path: "/products/lectra/notebooks" },
          ]),
          lectraFeaturePageSchema(
            title,
            "/products/lectra/notebooks",
            description,
          ),
          faqSchema(faqs.map(({ question, answer }) => ({ question, answer }))),
          howToSchema(
            "How to run a Jupyter notebook on an iPad",
            "/products/lectra/notebooks",
            "Run a real .ipynb notebook with on-device Python using Lectra Notes, free on the App Store.",
            howToSteps,
          ),
        ]}
      />

      <Sheet labelledBy="notebooks-title">
        <header className="shell page-head lx-hero" id="hero">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/products/lectra">Lectra Notes</Link>
                </li>
              </ol>
            </nav>
            <h1 id="notebooks-title" className="t-title" data-focus>
              Jupyter notebooks that run on your iPad. Offline.
            </h1>
            <div className="lede">
              Lectra Notes gives you real .ipynb files, a real Python kernel,
              and inline charts, in the same library as your readings and
              handwritten notes. There is no cloud kernel and no account, and
              you don&rsquo;t need a connection.
            </div>
            <div className="actions">
              <StoreActions />
            </div>
            <p className="btn-note">Free, for iPadOS 18 and later.</p>
          </div>
          <NotebookSheet
            label="A Lectra Notes notebook called growth.ipynb, running Python on the iPad. One cell loads a CSV with pandas, the next plots the mean for each treatment as a bar chart, and a red pen note points at the tallest bar."
            file="growth.ipynb"
            kernel="Python 3.11, local"
            cells={[
              {
                n: 1,
                code: (
                  <>
                    <span className="k">import</span> pandas{" "}
                    <span className="k">as</span> pd
                    {"\n"}df = pd.read_csv(
                    <span className="s">&quot;growth.csv&quot;</span>)
                  </>
                ),
              },
              {
                n: 2,
                code: (
                  <>
                    df.groupby(<span className="s">&quot;treatment&quot;</span>
                    ).od.mean().plot.bar()
                  </>
                ),
                out: (
                  <NotebookBars
                    label="Bar chart of mean growth by treatment: control, low, mid, and high, with mid the tallest."
                    bars={[
                      { name: "control", value: 0.42 },
                      { name: "low", value: 0.61 },
                      { name: "mid", value: 0.93 },
                      { name: "high", value: 0.74 },
                    ]}
                  />
                ),
              },
            ]}
            note="plotted on the iPad, in airplane mode"
          />
        </header>
      </Sheet>

      <Sheet className="section" id="features" labelledBy="features-title">
        <div className="shell">
          <h2 id="features-title" className="t-head lx-intro" data-focus>
            A real notebook, with nothing running somewhere else.
          </h2>
          <div className="idea-grid idea-grid--3">
            {features.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      <Sheet className="section" id="how" labelledBy="how-title">
        <div className="shell split split--top">
          <div>
            <h2 id="how-title" className="t-head" data-focus>
              Import, run, hand back.
            </h2>
            <p className="copy lx-body">
              Import an .ipynb through the Files app or the share sheet, or
              start a fresh notebook, and run the cells against on-device
              Python. When you&rsquo;re done, export a standard notebook that
              opens in Jupyter anywhere. For scripts, a shell, and version
              control, see{" "}
              <Link href="/products/lectra/code">the coding workspace</Link>.
              For handwritten work on paper styles, that is what{" "}
              <Link href="/products/lectra">the rest of Lectra Notes</Link> is
              for.
            </p>
          </div>
          <ol
            className="lx-steps"
            aria-label="How to run a Jupyter notebook on an iPad"
          >
            {howToSteps.map((step) => (
              <li key={step.name}>
                <strong>{step.name}</strong>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </Sheet>

      <Sheet className="section" id="faq" labelledBy="faq-title">
        <div className="shell shell-narrow">
          <h2 id="faq-title" className="t-head lx-faq-head" data-focus>
            Notebooks on iPad, answered.
          </h2>
          <FaqList items={faqs} />
        </div>
      </Sheet>

      <section
        className="on-desk shell section lx-closing"
        id="download"
        aria-labelledby="closing-title"
      >
        <h2 id="closing-title" className="t-title" data-focus>
          Run your first cell today.
        </h2>
        <p className="lede">
          Lectra Notes is on the App Store. It is free, it works offline, and it
          is ready for the problem set.
        </p>
        <div className="actions">
          <StoreActions />
        </div>
      </section>
    </PageShell>
  );
}
