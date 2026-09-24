import Link from "next/link";

import ComparisonTable from "@/components/site/ComparisonTable";
import FaqList from "@/components/site/FaqList";
import MethodologyNote from "@/components/site/MethodologyNote";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import { comparePath, getComparison } from "@/lib/compare";
import { publicPageMetadata } from "@/lib/seo";
import { LECTRA_APP_STORE_CAMPAIGN_URL, LECTRA_DEFINITION } from "@/lib/site";
import {
  breadcrumbSchema,
  comparisonArticleSchema,
  competitorAppNode,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";

import CompareArticle, { lectraCta, lectraRelatedLinks, Pen } from "../CompareArticle";

const comparison = getComparison("ipad-python-notebook-apps");

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

const faqs: FaqEntry[] = [
  {
    question: "What is the best way to run Jupyter notebooks on an iPad?",
    answer:
      "There are several good options. Carnets is free, open-source, and the most faithful Jupyter experience, with an actual Jupyter server running locally. Juno ($39.99 one-time) is a polished native IDE with heavy compiled packages like SciPy and scikit-learn. Lectra Notes is free and runs .ipynb notebooks with Python on the device, beside your Apple Pencil notes and PDFs. It is the right choice when the notebook belongs to a course and does not stand on its own.",
  },
  {
    question: "Can the iPad run Python offline?",
    answer:
      "Yes. All five apps here run Python on the device itself, with no remote server. Apple's platform rules shape the limits. Extra packages installed at runtime must be pure Python in every app, and compiled packages like SciPy only work where the app bundled them in advance (Juno and Carnets bundle the most).",
  },
  {
    question: "Which app has the most Python packages?",
    answer:
      "Carnets (especially its scipy edition) and Juno bundle the largest compiled sets, including SciPy, scikit-learn, and OpenCV. Lectra Notes bundles numpy, pandas, matplotlib, and Pillow, and installs pure-Python packages from PyPI. It does not bundle SciPy or scikit-learn today.",
  },
  {
    question: "Why choose Lectra Notes over a dedicated Jupyter app?",
    answer:
      "Because the notebook usually isn't alone. Lectra Notes keeps .ipynb notebooks in the same library as the lecture PDF and your handwritten work, and adds a terminal with Git, a code editor, and SSH, so the whole assignment lives in one place. If you need the heavier scientific stack, Juno or Carnets is the better tool, and pairing one of them with a notes app is a fine setup.",
  },
];

export default function IpadPythonAppsPage() {
  return (
    <>
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
          competitorAppNode("Pythonista 3", "https://omz-software.com/pythonista/"),
          competitorAppNode("a-Shell", "https://github.com/holzschu/a-shell"),
          faqSchema(faqs),
        ]}
      />

      <CompareArticle
        cta={lectraCta}
        context="Updated September 2026. Lectra Notes is ours."
        title="Python on iPad: every notebook app, compared"
        lede={
          <>
            Five apps run Python on the iPad itself, and they are different tools.
            Here is how they compare, including the two free,{" "}
            <Pen>open-source options</Pen> that are not ours.
          </>
        }
        definition={
          <>
            {LECTRA_DEFINITION} Juno, Carnets, Pythonista 3, and a-Shell are
            dedicated Python and notebook tools without note-taking.
          </>
        }
        actions={
          <>
            <StoreLink
              store="app-store"
              href={LECTRA_APP_STORE_CAMPAIGN_URL}
              className="btn btn-primary"
            >
              Get Lectra Notes for free
            </StoreLink>
            <a href="#table" className="btn btn-line">
              See the comparison
            </a>
          </>
        }
        sections={[
          {
            id: "table",
            title: "All five, side by side.",
            outline: "Side by side",
            content: (
              <div className="compare-table-wide">
              <ComparisonTable
                caption="iPad Python and Jupyter notebook apps compared, August 2026"
                columns={["Lectra Notes", "Juno", "Carnets", "Pythonista 3", "a-Shell"]}
                ours={0}
                rows={[
                  {
                    label: "Price",
                    cells: [
                      "Free, everything included",
                      "Free to browse, $39.99 one-time to run code",
                      "Free, open source",
                      "$9.99 one-time",
                      "Free, open source",
                    ],
                  },
                  {
                    label: ".ipynb notebooks",
                    cells: [
                      "Yes. Notebooks are documents in the same library as your notes",
                      "Yes, in a polished native IDE",
                      "Yes, on a real local Jupyter and JupyterLab server",
                      "No. .py scripts and console only",
                      "No. Command line only",
                    ],
                  },
                  {
                    label: "Bundled scientific stack",
                    cells: [
                      "numpy, pandas, matplotlib, Pillow",
                      "NumPy, pandas, Matplotlib, SciPy, scikit-learn, OpenCV",
                      "20+ packages, and the scipy edition adds SciPy, scikit-learn, seaborn",
                      "NumPy, Matplotlib, pandas, plus unique iOS automation modules",
                      "Python 3.13 with NumPy and Matplotlib, plus clang, git, ssh, and TeX",
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
                    label: "Notes, PDFs, and Pencil",
                    cells: [
                      "Yes. Full Apple Pencil markup, a PDF library, and a scanner beside the notebooks",
                      "None",
                      "None",
                      "None",
                      "None",
                    ],
                  },
                  {
                    label: "Terminal, Git, and SSH",
                    cells: [
                      "Yes. A terminal with git, python, and pip, plus GitHub and SSH",
                      "No",
                      "No",
                      "No",
                      "Yes. The most complete Unix toolbox on iOS, including C and C++ via clang",
                    ],
                  },
                ]}
              />
              </div>
            ),
          },
          {
            id: "verdicts",
            title: "Pick by what the notebook is for.",
            outline: "Honest verdicts",
            content: (
              <div className="compare-verdicts">
                <div>
                  <h3>Carnets</h3>
                  <p>
                    The most faithful Jupyter on iPad, free and open source, with
                    an actual local Jupyter server and a big compiled-package
                    library. The UI is the stock Jupyter web interface, and heavy
                    notebooks hit iOS memory limits, but it&apos;s a remarkable
                    zero-cost tool.
                  </p>
                </div>
                <div>
                  <h3>Juno</h3>
                  <p>
                    The most polished dedicated notebook IDE, with SciPy,
                    scikit-learn, and OpenCV built in. It is worth its $39.99
                    unlock if your coursework leans on the heavier stack.
                  </p>
                </div>
                <div>
                  <h3>Pythonista and a-Shell</h3>
                  <p>
                    These do different jobs. Pythonista is the iOS-automation
                    specialist (no notebooks, aging Python 3.10), and a-Shell is a
                    free, full Unix toolbox that is terminal-first with no notebook
                    interface.
                  </p>
                </div>
                <div data-ours="true">
                  <h3>Lectra Notes</h3>
                  <p>
                    The one on this list that is also a note-taking app. Notebooks
                    live beside the lecture PDF and your handwriting, with{" "}
                    <Link className="link" href="/products/lectra/code">
                      a terminal, Git, and SSH
                    </Link>{" "}
                    in the same place, for free. When the notebook belongs to a
                    course, this is the point.
                  </p>
                </div>
              </div>
            ),
          },
          {
            id: "methodology",
            outline: "How this was made",
            content: (
              <MethodologyNote
                dateChecked="August 14, 2026"
                extraConcessions={[
                  "Scientific stack: Lectra Notes does not bundle SciPy, scikit-learn, or OpenCV. Juno and Carnets carry the heavier compiled packages.",
                  "Jupyter fidelity: Carnets runs an actual Jupyter server. Lectra Notes implements the .ipynb format natively and does not embed Jupyter itself.",
                ]}
              />
            ),
          },
          {
            id: "faq",
            title: "Python on iPad, answered.",
            outline: "Questions",
            content: <FaqList items={faqs} />,
          },
        ]}
        related={{
          title: "More comparisons.",
          links: lectraRelatedLinks(comparison.slug),
        }}
        closing={{
          title: "Notebooks that live with the coursework.",
          body: (
            <p>
              Lectra Notes gives you free .ipynb notebooks with on-device Python,
              beside your notes. And if you just need raw Jupyter, Carnets is free
              and excellent. We mean that.
            </p>
          ),
          actions: (
            <StoreLink
              store="app-store"
              href={LECTRA_APP_STORE_CAMPAIGN_URL}
              className="btn btn-primary"
            >
              Lectra Notes on the App Store
            </StoreLink>
          ),
        }}
      />
    </>
  );
}
