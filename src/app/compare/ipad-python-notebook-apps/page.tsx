import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import ComparisonTable from "@/components/public/ComparisonTable";
import MethodologyNote from "@/components/public/MethodologyNote";
import RelatedLinks from "@/components/public/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import { comparePath, comparisonsFor, getComparison } from "@/lib/compare";
import { getGuide, guidePath } from "@/lib/guides";
import { publicPageMetadata } from "@/lib/seo";
import { LECTRA_APP_STORE_CAMPAIGN_URL, LECTRA_DEFINITION } from "@/lib/site";
import {
  breadcrumbSchema,
  comparisonArticleSchema,
  competitorAppNode,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";

const comparison = getComparison("ipad-python-notebook-apps");
const annotateGuide = getGuide("annotate-lecture-slides-on-ipad");

export const metadata = publicPageMetadata({
  title: comparison.title,
  absoluteTitle: comparison.absoluteTitle,
  description: comparison.description,
  path: comparePath(comparison),
  keywords: comparison.keywords,
  type: "article",
  publishedTime: comparison.datePublished,
  modifiedTime: comparison.dateModified,
});

/* The other Lectra Notes comparisons, plus the iPad annotation guide. */
const relatedLinks = [
  ...comparisonsFor("lectra")
    .filter((item) => item.slug !== comparison.slug)
    .map((item) => ({
      href: comparePath(item),
      label: item.title,
      copy: item.copy,
    })),
  {
    href: guidePath(annotateGuide),
    label: annotateGuide.title,
    copy: annotateGuide.copy,
  },
];

const faqs: FaqEntry[] = [
  {
    question: "What is the best way to run Jupyter notebooks on an iPad?",
    answer:
      "There are several good options. Carnets is free, open-source, and the most faithful Jupyter experience — an actual Jupyter server running locally. Juno ($39.99 one-time) is a polished native IDE with heavy compiled packages like SciPy and scikit-learn. Lectra Notes is free and runs .ipynb notebooks with Python on the device, beside your Apple Pencil notes and PDFs — the right choice when the notebook belongs to a course, not just to itself.",
  },
  {
    question: "Can the iPad run Python offline?",
    answer:
      "Yes — all five apps here run Python on the device itself, with no remote server. Apple's platform rules shape the limits: extra packages installed at runtime must be pure Python in every app; compiled packages like SciPy only work where the app bundled them in advance (Juno and Carnets bundle the most).",
  },
  {
    question: "Which app has the most Python packages?",
    answer:
      "Carnets (especially its scipy edition) and Juno bundle the largest compiled sets — including SciPy, scikit-learn, and OpenCV. Lectra Notes bundles numpy, pandas, matplotlib, and Pillow, and installs pure-Python packages from PyPI; it does not bundle SciPy or scikit-learn today.",
  },
  {
    question: "Why choose Lectra Notes over a dedicated Jupyter app?",
    answer:
      "Because the notebook usually isn't alone. Lectra Notes keeps .ipynb notebooks in the same library as the lecture PDF and your handwritten work, and adds a terminal with Git, a code editor, and SSH — so the whole assignment lives in one place. If you need the heavier scientific stack, Juno or Carnets is the better tool, and pairing one of them with a notes app is a fine setup.",
  },
];

export default function IpadPythonAppsPage() {
  return (
    <PublicPageFrame active="compare" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            { name: comparison.title, path: comparePath(comparison) },
          ]),
          comparisonArticleSchema(
            comparison.title,
            comparePath(comparison),
            comparison.description,
            comparison.datePublished,
            comparison.dateModified,
            "#lectra-ipad",
          ),
          competitorAppNode("Juno", "https://juno.sh"),
          competitorAppNode("Carnets", "https://github.com/holzschu/Carnets"),
          competitorAppNode(
            "Pythonista 3",
            "https://omz-software.com/pythonista/",
          ),
          competitorAppNode("a-Shell", "https://github.com/holzschu/a-shell"),
          faqSchema(faqs),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Compare · Updated September 2026</p>
          <h1>Python on iPad: every notebook app, compared</h1>
          <p className="centered-hero-lede">
            Five apps run Python on the iPad itself, and they are different
            tools. Here is how they compare, including the two free,
            open-source options that are not ours.
          </p>
          <p className="hero-note">
            {LECTRA_DEFINITION} Juno, Carnets, Pythonista 3, and a-Shell are
            dedicated Python and notebook tools without note-taking.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="table">
        <div data-reveal>
          <ComparisonTable
            caption="iPad Python and Jupyter notebook apps compared, August 2026"
            columns={[
              "Lectra Notes",
              "Juno",
              "Carnets",
              "Pythonista 3",
              "a-Shell",
            ]}
            rows={[
              {
                label: "Price",
                cells: [
                  "Free, everything included",
                  "Free to browse; $39.99 one-time to run code",
                  "Free, open source",
                  "$9.99 one-time",
                  "Free, open source",
                ],
              },
              {
                label: ".ipynb notebooks",
                cells: [
                  "Yes — notebooks are documents in the same library as your notes",
                  "Yes — polished native IDE",
                  "Yes — a real local Jupyter/JupyterLab server",
                  "No — .py scripts and console only",
                  "No — command line only",
                ],
              },
              {
                label: "Bundled scientific stack",
                cells: [
                  "numpy, pandas, matplotlib, Pillow",
                  "NumPy, pandas, Matplotlib, SciPy, scikit-learn, OpenCV",
                  "20+ packages; scipy edition adds SciPy, scikit-learn, seaborn",
                  "NumPy, Matplotlib, pandas + unique iOS automation modules",
                  "Python 3.13 with NumPy, Matplotlib + clang, git, ssh, TeX",
                ],
              },
              {
                label: "Extra packages",
                cells: [
                  "Pure-Python from PyPI, kept for offline reuse",
                  "Pure-Python via its package manager",
                  "Pure-Python via %pip",
                  "Effectively none official",
                  "Pure-Python via pip",
                ],
              },
              {
                label: "Notes, PDFs & Pencil",
                cells: [
                  "Yes — full Apple Pencil markup, PDF library, scanner beside the notebooks",
                  "None",
                  "None",
                  "None",
                  "None",
                ],
              },
              {
                label: "Terminal / Git / SSH",
                cells: [
                  "Yes — a terminal with git, python, and pip; GitHub; SSH",
                  "No",
                  "No",
                  "No",
                  "Yes — the most complete Unix toolbox on iOS, incl. C/C++ via clang",
                ],
              },
            ]}
          />
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="verdicts">
        <div className="section-heading" data-reveal>
          <p className="kicker kicker-muted">Honest verdicts</p>
          <h2>Pick by what the notebook is for.</h2>
        </div>
        <div className="plain-grid" data-reveal style={{ marginTop: "2rem" }}>
          <div>
            <h3>Carnets</h3>
            <p>
              The most faithful Jupyter on iPad, free and open source — an
              actual local Jupyter server with a big compiled-package library.
              The UI is the stock Jupyter web interface, and heavy notebooks
              hit iOS memory limits, but it&apos;s a remarkable zero-cost tool.
            </p>
          </div>
          <div>
            <h3>Juno</h3>
            <p>
              The most polished dedicated notebook IDE, with SciPy,
              scikit-learn, and OpenCV built in — worth its $39.99 unlock if
              your coursework leans on the heavier stack.
            </p>
          </div>
          <div>
            <h3>Pythonista &amp; a-Shell</h3>
            <p>
              Different jobs: Pythonista is the iOS-automation specialist (no
              notebooks, aging Python 3.10); a-Shell is a free, full Unix
              toolbox — terminal-first, no notebook interface.
            </p>
          </div>
          <div>
            <h3>Lectra Notes</h3>
            <p>
              The one on this list that is also a note-taking app. Notebooks live
              beside the lecture PDF and your handwriting, with{" "}
              <Link href="/products/lectra/code">a terminal, Git, and SSH</Link>{" "}
              in the same place — free. When the notebook belongs to a course,
              this is the point.
            </p>
          </div>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="methodology">
        <div data-reveal>
          <MethodologyNote
            dateChecked="August 14, 2026"
            extraConcessions={[
              "Scientific stack: Lectra Notes does not bundle SciPy, scikit-learn, or OpenCV — Juno and Carnets carry the heavier compiled packages.",
              "Jupyter fidelity: Carnets runs an actual Jupyter server; Lectra Notes implements the .ipynb format natively rather than embedding Jupyter itself.",
            ]}
          />
        </div>
      </section>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>Python on iPad, answered.</h2>
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

      <RelatedLinks title="More comparisons" links={relatedLinks} />

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>Notebooks that live with the coursework.</h2>
          <p>
            <StoreLink store="app-store" href={LECTRA_APP_STORE_CAMPAIGN_URL}>
              Lectra Notes on the App Store
            </StoreLink>{" "}
            — free .ipynb notebooks with on-device Python, beside your notes.
            And if you just need raw Jupyter, Carnets is free and excellent —
            we mean that.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
