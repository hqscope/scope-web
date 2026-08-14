import type { Metadata } from "next";
import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import ComparisonTable from "@/components/public/ComparisonTable";
import MethodologyNote from "@/components/public/MethodologyNote";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  comparisonArticleSchema,
  competitorAppNode,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { LECTRA_APP_STORE_URL } from "@/lib/site";

const description =
  "Every real way to run Python and Jupyter notebooks on an iPad in 2026 — Juno, Carnets, Pythonista, a-Shell, and Lectra Notes — compared honestly, including where each is the right choice.";

export const metadata: Metadata = {
  title: "iPad Python Notebook Apps",
  description,
  alternates: {
    canonical: "/compare/ipad-python-notebook-apps",
  },
  keywords: [
    "iPad Python notebook",
    "Jupyter on iPad",
    "run ipynb on iPad",
    "Juno vs Carnets",
    "Python IDE iPad",
    "iPad data science apps",
  ],
};

const faqs: FaqEntry[] = [
  {
    question: "What is the best way to run Jupyter notebooks on an iPad?",
    answer:
      "There are several genuinely good options. Carnets is free, open-source, and the most faithful Jupyter experience — an actual Jupyter server running locally. Juno ($39.99 one-time) is a polished native IDE with heavy compiled packages like SciPy and scikit-learn. Lectra Notes is free and runs .ipynb notebooks with on-device Python beside your Apple Pencil notes and PDFs — the right choice when the notebook belongs to a course, not just to itself.",
  },
  {
    question: "Can the iPad run Python offline?",
    answer:
      "Yes — all five apps here run Python entirely on the device with no server. Apple's platform rules shape the limits: extra packages installed at runtime must be pure Python in every app; compiled packages like SciPy only work where the app bundled them in advance (Juno and Carnets bundle the most).",
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
    <PublicPageFrame active="lectra" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            {
              name: "iPad Python notebook apps",
              path: "/compare/ipad-python-notebook-apps",
            },
          ]),
          comparisonArticleSchema(
            "iPad Python Notebook Apps",
            "/compare/ipad-python-notebook-apps",
            description,
            "2026-08-14",
            "2026-08-14",
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
          <p className="kicker">Compare · Updated August 2026</p>
          <h1>Every real way to run Python on an iPad.</h1>
          <p className="centered-hero-lede">
            Five apps run Python natively on iPad, and they&apos;re genuinely
            different tools. This is the honest map — including the two
            excellent free, open-source options that aren&apos;t ours.
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
                  "Yes — native documents with a persistent kernel",
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
                  "Yes — shell with git, python, pip; GitHub; SSH with full PTY",
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
              The only one that is also a note-taking app. Notebooks live
              beside the lecture PDF and your handwriting, with{" "}
              <Link href="/product/lectra/code">a terminal, Git, and SSH</Link>{" "}
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

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>Notebooks that live with the coursework.</h2>
          <p>
            <a href={LECTRA_APP_STORE_URL} target="_blank" rel="noreferrer">
              Lectra Notes on the App Store
            </a>{" "}
            — free .ipynb notebooks with on-device Python, beside your notes.
            And if you just need raw Jupyter, Carnets is free and excellent —
            we mean that.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
