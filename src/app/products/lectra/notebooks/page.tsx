import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink, buttonClasses } from "@/components/buttons";
import { AppleIcon } from "@/components/icons";
import { ClosingCta, FeatureGrid } from "@/components/page-parts";
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

import NotebookSheet, { Kw, NotebookBars, Str } from "../_visuals/NotebookSheet";

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
    body: "Notebooks are genuine Jupyter documents. Import one from class and work it, and it round-trips with its cells, outputs, and metadata preserved.",
  },
  {
    title: "A live kernel, on the iPad",
    body: "Code cells run real CPython on the device, and state persists across cells, so a variable you define in one cell is there in the next.",
  },
  {
    title: "Charts where you made them",
    body: "numpy, pandas, matplotlib, and Pillow ship built in. Plots render inline in the notebook and are computed entirely on the iPad.",
  },
  {
    title: "More packages when you need them",
    body: "Install many pure-Python packages from PyPI in a cell. Installs are kept locally, so the notebook still runs next time, offline.",
  },
  {
    title: "No cloud kernel and no account",
    body: "Nothing executes on a server. Airplane mode in lecture, a basement lab, or a flight home makes no difference to the notebook.",
  },
  {
    title: "Beside your handwriting",
    body: "Notebooks live in the same library as your PDFs and Pencil notes, so the reading, the derivation, and the computation stay together.",
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

/** A secondary button for the dark closing band. */
const onDarkSecondary =
  "inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-5 text-[15.5px] font-semibold tracking-[-0.01em] text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10";

function StoreActions({ onDark = false }: { onDark?: boolean }) {
  return (
    <>
      <StoreLink
        store="app-store"
        href={LECTRA_APP_STORE_URL}
        className={buttonClasses(onDark ? "inverted" : "primary", "lg")}
      >
        <AppleIcon className="size-[18px] -translate-y-px" />
        Download on the App Store
      </StoreLink>
      {onDark ? (
        <Link href="/products/lectra" className={onDarkSecondary}>
          All of Lectra Notes
        </Link>
      ) : (
        <ButtonLink href="/products/lectra" variant="secondary" size="lg">
          All of Lectra Notes
        </ButtonLink>
      )}
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

      <header
        id="hero"
        className="mx-auto max-w-[1200px] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16"
      >
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 text-[14px] text-stone">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href="/products/lectra" className="hover:text-ink">
                    Lectra Notes
                  </Link>
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 max-w-[18ch] text-[clamp(2.4rem,5vw,3.9rem)] font-semibold leading-[1] tracking-[-0.045em] text-balance">
              Jupyter notebooks that run on your iPad. Offline.
            </h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.6] text-ink-soft">
              Lectra Notes gives you real .ipynb files, a real Python kernel,
              and inline charts, in the same library as your readings and
              handwritten notes. There is no cloud kernel and no account, and
              you don&rsquo;t need a connection.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <StoreActions />
            </div>
            <p className="mt-4 text-[14px] text-stone">Free, for iPadOS 18 and later.</p>
          </div>
          <div className="min-w-0">
            <NotebookSheet
              label="A Lectra Notes notebook called growth.ipynb, running Python on the iPad. One cell loads a CSV with pandas, the next plots the mean for each treatment as a bar chart, and a red pen note points at the tallest bar."
              file="growth.ipynb"
              kernel="Python 3.11, local"
              cells={[
                {
                  n: 1,
                  code: (
                    <>
                      <Kw>import</Kw> pandas <Kw>as</Kw> pd
                      {"\n"}df = pd.read_csv(<Str>&quot;growth.csv&quot;</Str>)
                    </>
                  ),
                },
                {
                  n: 2,
                  code: (
                    <>
                      df.groupby(<Str>&quot;treatment&quot;</Str>).od.mean().plot.bar()
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
          </div>
        </div>
      </header>

      <FeatureGrid
        id="features"
        title="A real notebook, with nothing running somewhere else."
        features={features}
      />

      <section id="how" aria-labelledby="how-title" className="bg-wash">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2
              id="how-title"
              className="max-w-[18ch] text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
            >
              Import, run, hand back.
            </h2>
            <p className="mt-5 max-w-[48ch] text-[17px] leading-[1.65] text-stone">
              Import an .ipynb through the Files app or the share sheet, or
              start a fresh notebook, and run the cells against on-device
              Python. When you&rsquo;re done, export a standard notebook that
              opens in Jupyter anywhere. For scripts, a shell, and version
              control, see{" "}
              <Link href="/products/lectra/code" className="link">
                the coding workspace
              </Link>
              . For handwritten work on paper styles, that is what{" "}
              <Link href="/products/lectra" className="link">
                the rest of Lectra Notes
              </Link>{" "}
              is for.
            </p>
          </div>
          <ol
            aria-label="How to run a Jupyter notebook on an iPad"
            className="divide-y divide-line border-y border-line"
          >
            {howToSteps.map((step, index) => (
              <li key={step.name} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 py-5">
                <span aria-hidden="true" className="text-[17px] font-semibold tabular-nums text-stone">
                  {index + 1}
                </span>
                <div>
                  <strong className="block text-[17px] font-semibold tracking-[-0.015em] text-ink">
                    {step.name}
                  </strong>
                  <span className="mt-1.5 block text-[15.5px] leading-[1.6] text-stone">{step.text}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-title"
        className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h2
            id="faq-title"
            className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]"
          >
            Notebooks on iPad, answered.
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>

      <div id="download">
        <ClosingCta
          title="Run your first cell today."
          body="Lectra Notes is on the App Store. It is free, it works offline, and it is ready for the problem set."
          actions={<StoreActions onDark />}
        />
      </div>
    </PageShell>
  );
}
