import Link from "next/link";

import JsonLd from "@/components/seo/JsonLd";
import ArticleShell, { type OutlineItem } from "@/components/site/ArticleShell";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import { publicPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata = publicPageMetadata({
  title: "Terms of Service",
  description:
    "The terms for using Scope, Lectra Notes, and the Scope web workspace: accounts, your content, academic integrity, AI features, third-party platforms, and the as-is nature of the product.",
  path: "/terms",
});

const LAST_UPDATED = "September 17, 2026";

// The legal text below is carried over from the previous page byte for byte.
// Only the page structure around it is new.
const highlights = [
  {
    title: "Free, and provided as is",
    copy: "Scope and Lectra are free and still evolving. We work toward stability, but we provide the product as is, without warranties, and you keep your own copies of critical academic files.",
  },
  {
    title: "Academic integrity stays yours",
    copy: "Scope is a study tool, not a way around your course rules. You are responsible for following your school and instructor academic-integrity policies.",
  },
  {
    title: "The AI helps you study, it cannot submit your work",
    copy: "Scope AI creates study aids and answers grounded in your course context. It is built so it cannot submit graded work for you, and its output can be wrong, so verify before you rely on it.",
  },
  {
    title: "Your content stays yours",
    copy: "Your documents, annotations, notes, and profile facts remain yours. You grant us only the limited permissions needed to store, sync, and deliver them across the product.",
  },
  {
    title: "Questions and support",
    copy: SUPPORT_EMAIL,
  },
];

const outline: OutlineItem[] = [
  {
    id: "who-we-are-and-what-these-terms-cover",
    label: "1. Who we are and what these Terms cover",
  },
  {
    id: "who-can-use-the-service",
    label: "2. Who can use the Service",
  },
  {
    id: "what-the-service-is",
    label: "3. What the Service is",
  },
  {
    id: "your-account",
    label: "4. Your account",
  },
  {
    id: "your-content",
    label: "5. Your content",
  },
  {
    id: "academic-integrity",
    label: "6. Academic integrity",
  },
  {
    id: "ai-features",
    label: "7. AI features",
  },
  {
    id: "acceptable-use",
    label: "8. Acceptable use",
  },
  {
    id: "third-party-services-and-platforms",
    label: "9. Third-party services and platforms",
  },
  {
    id: "intellectual-property-and-license-to-you",
    label: "10. Intellectual property and license to you",
  },
  {
    id: "disclaimers",
    label: "11. Disclaimers",
  },
  {
    id: "limitation-of-liability",
    label: "12. Limitation of liability",
  },
  {
    id: "indemnification",
    label: "13. Indemnification",
  },
  {
    id: "termination",
    label: "14. Termination",
  },
  {
    id: "changes-to-the-service-and-these-terms",
    label: "15. Changes to the Service and these Terms",
  },
  {
    id: "governing-law",
    label: "16. Governing law",
  },
  {
    id: "contact-us",
    label: "17. Contact us",
  },
];

export default function TermsPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Terms", path: "/terms" },
          ]),
        ]}
      />
      <article aria-labelledby="terms-title">
        <PageHead
          wide
          context="Terms of service"
          title={
            <span id="terms-title">
              What Scope does, what it does not, and what stays your
              responsibility.
            </span>
          }
          lede={
            <>
              <p>
                These Terms of Service (the &ldquo;Terms&rdquo;) govern your use
                of Scope, Lectra Notes, and the Scope website and web workspace
                (together, the &ldquo;Service&rdquo;), operated by Noel Jubil Sason. By
                installing, signing in to, or using the Service, you agree to
                these Terms. If you do not agree, do not use the Service.
              </p>
              <p className="text-[14.5px] text-stone">Last updated: {LAST_UPDATED}</p>
            </>
          }
        />

        <div className="mx-auto max-w-[1200px] px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((section) => (
              <div key={section.title} className="rounded-[18px] bg-wash p-6">
                <h2 className="text-[16.5px] font-semibold leading-snug tracking-[-0.015em] text-ink">
                  {section.title}
                </h2>
                <p className="mt-2 text-[15.5px] leading-[1.6] text-stone">
                  {section.copy === SUPPORT_EMAIL ? (
                    <a href={`mailto:${SUPPORT_EMAIL}`} className="link wrap-anywhere">
                      {SUPPORT_EMAIL}
                    </a>
                  ) : (
                    section.copy
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        <ArticleShell outline={outline}>
          <h2 id="who-we-are-and-what-these-terms-cover">
            1. Who we are and what these Terms cover
          </h2>
          <p>
            {
              "Scope is developed and operated by Noel Jubil Sason, an individual developer. Scope is not a company or other legal entity. Scope was previously named Canvascope; the rename did not change who operates it, your agreement, or the Service. These Terms apply to the Scope browser extension, the Scope website and web workspace, Lectra Notes distributed on the Apple App Store, and the connected workflows that share the same account system. Your privacy is covered separately by our "
            }
            <Link href="/privacy">Privacy Policy</Link>
            {", which is incorporated into these Terms by reference."}
          </p>

          <h2 id="who-can-use-the-service">2. Who can use the Service</h2>
          <p>
            {
              "Scope is built for students and is not directed to children under 13. You may use the Service only if you can form a binding agreement with Noel Jubil Sason. If you are under the age of majority in your jurisdiction, you may use the Service only with the involvement and consent of a parent, guardian, or your school. If you use the Service through a school or institutional account, you are responsible for complying with that institution's rules, and your institution's policies may also apply to your use."
            }
          </p>

          <h2 id="what-the-service-is">3. What the Service is</h2>
          <p>
            {
              "Scope is a local-first study tool. The browser extension can search your Canvas and Brightspace coursework, index PDFs, including scanned ones, on your device, answer questions grounded in your course context with citations, draft study plans, generate practice material, and move documents to and from Lectra Notes. Lectra lets you read and annotate course PDFs with Apple Pencil where supported, run on-device study tools, and, in its Projects workspace, edit notebooks and run a terminal, git, and Python on supported Apple devices. The web workspace shows connected product data such as synced documents and course coverage for the signed-in user."
            }
          </p>
          <p>
            {
              "The Service is free, and it is actively evolving. Some capabilities are experimental, and features may differ across the extension, Lectra, and the web workspace, or change over time. We may add, change, suspend, or remove features at any time."
            }
          </p>

          <h2 id="your-account">4. Your account</h2>
          <p>
            {
              "Some features require an account. You can sign in with Google or, on Lectra, with Sign in with Apple, using one shared identity across Scope, Lectra, and the web workspace. You are responsible for activity under your account and for keeping access to it secure. We may suspend or limit access to protect the Service, to respond to a security or account-risk signal (including Google Cross-Account Protection events), or to address a violation of these Terms. You can sign out at any time, and you can delete your account from within Lectra or by contacting us."
            }
          </p>

          <h2 id="your-content">5. Your content</h2>
          <p>
            {
              "You keep ownership of the content you bring to the Service, including the PDFs and documents you index or send, the highlights, ink, and notes you add in Lectra, the code and files in Lectra Projects, and the profile facts you save. You grant Noel Jubil Sason a limited, non-exclusive, worldwide, royalty-free license to host, store, process, transmit, sync, and display that content solely to operate and support the Service for you, including delivering documents between your devices and generating the results you request."
            }
          </p>
          <p>
            {
              "You are responsible for the content you bring to the Service and for having the rights to use it. Do not upload content you are not permitted to copy or store, and do not use the Service in a way that violates the rights of others or the terms of your learning platform or institution. We do not use your content to train, develop, or improve generalized AI or machine-learning models, as described in the Privacy Policy."
            }
          </p>

          <h2 id="academic-integrity">6. Academic integrity</h2>
          <p>
            {
              "Scope is a productivity and study tool. It does not replace your course rules, your instructors' instructions, or your institution's academic-integrity policies, and using Scope does not excuse a violation of them. You are solely responsible for ensuring that the way you use the Service, and any AI-assisted output you submit or rely on, complies with those policies."
            }
          </p>
          <p>
            {
              "Scope AI is designed to help you find, understand, plan, and practice, not to do graded work for you. The Scope agent can read your course context and create study aids such as to-dos, calendar events, and study plans, but it is built so that it cannot submit graded work on your behalf, and actions that resemble turning in a graded assignment are blocked. You remain responsible for confirming and meeting your own submission requirements and deadlines."
            }
          </p>

          <h2 id="ai-features">7. AI features</h2>
          <p>
            {
              "Scope tries an on-device model first and may use a cloud fallback for larger course-context questions, as described in the Privacy Policy. AI output can be inaccurate, incomplete, or out of date, and citations should be checked against the source material. AI output is not professional, legal, medical, financial, or academic advice. Do not rely on it as your sole source for graded work or important decisions, and verify anything that matters."
            }
          </p>

          <h2 id="acceptable-use">8. Acceptable use</h2>
          <p>{"You agree not to:"}</p>
          <ul>
            <li>
              {"use the Service to violate any law or the rights of others;"}
            </li>
            <li>
              {
                "use the Service to access, copy, or store data you are not authorized to access, or in a way that breaks the terms of Canvas, Brightspace, your institution, or any other platform you connect;"
              }
            </li>
            <li>
              {
                "attempt to gain unauthorized access to the Service, other accounts, or our systems, or interfere with, overload, or disrupt the Service or its infrastructure;"
              }
            </li>
            <li>
              {
                "reverse engineer, decompile, or attempt to extract source code or credentials from the Service, except to the limited extent that applicable law permits;"
              }
            </li>
            <li>
              {
                "resell, sublicense, or commercially exploit the Service, or use it to build a competing product; or"
              }
            </li>
            <li>
              {
                "upload malicious code, or use the Service to store or distribute unlawful, infringing, or harmful content."
              }
            </li>
          </ul>

          <h2 id="third-party-services-and-platforms">
            9. Third-party services and platforms
          </h2>
          <p>
            {
              "The Service works alongside platforms and providers operated by others, including Canvas (Instructure), Brightspace (D2L), Google, Apple, Gradescope, GitHub (for Lectra Projects), and our AI providers. Your use of those services is governed by their own terms and policies, and we are not responsible for them. Scope is an independent product and is not endorsed by, affiliated with, or sponsored by Instructure, D2L, Google, or Apple, and references to those platforms are for compatibility and description only. Scope's use of information from Google APIs adheres to the "
            }
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google API Services User Data Policy
            </a>
            {
              ", including the Limited Use requirements. Lectra is offered through the Apple App Store and is also subject to Apple's standard licensed-application terms."
            }
          </p>

          <h2 id="intellectual-property-and-license-to-you">
            10. Intellectual property and license to you
          </h2>
          <p>
            {
              "The Service, including its software, design, and the Scope and Lectra names and logos, is owned by Noel Jubil Sason and protected by intellectual property laws. Subject to these Terms, we grant you a personal, limited, non-exclusive, non-transferable, revocable license to use the Service for your own studies. We reserve all rights not expressly granted. Open-source components included in the Service remain governed by their own licenses, and in Lectra Projects your own repositories and code remain yours, with GitHub access subject to GitHub's terms."
            }
          </p>

          <h2 id="disclaimers">11. Disclaimers</h2>
          <p>
            {
              "The Service is provided on an as is and as available basis, without warranties of any kind, whether express, implied, or statutory, including any implied warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement. We do not warrant that the Service will be uninterrupted, error-free, secure, or that search results, indexing, AI output, document delivery, or calendar writes will be complete, accurate, or timely. You are responsible for keeping your own copies of critical academic files and for confirming your institution's requirements and deadlines."
            }
          </p>

          <h2 id="limitation-of-liability">12. Limitation of liability</h2>
          <p>
            {
              "To the maximum extent permitted by law, Noel Jubil Sason will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, lost work, missed deadlines, or academic outcomes such as grades, arising out of or relating to your use of, or inability to use, the Service. Because the Service is provided free of charge, to the maximum extent permitted by law our total liability for any claim relating to the Service is limited to one hundred U.S. dollars (USD 100). Some jurisdictions do not allow certain limitations, so some of these limitations may not apply to you."
            }
          </p>

          <h2 id="indemnification">13. Indemnification</h2>
          <p>
            {
              "You agree to indemnify and hold harmless Noel Jubil Sason from claims, damages, and expenses (including reasonable legal fees) arising out of your misuse of the Service, your violation of these Terms, or your violation of any law or the rights of a third party."
            }
          </p>

          <h2 id="termination">14. Termination</h2>
          <p>
            {
              "You can stop using the Service at any time, sign out, or delete your account. We may suspend or terminate your access if you violate these Terms, if needed to protect the Service or other users, or to comply with law. When access ends, the licenses granted in these Terms end, and we will handle your data as described in the Privacy Policy. Sections that by their nature should survive termination, including content ownership, disclaimers, limitation of liability, and indemnification, will survive."
            }
          </p>

          <h2 id="changes-to-the-service-and-these-terms">
            15. Changes to the Service and these Terms
          </h2>
          <p>
            {
              "We may modify, suspend, or discontinue any part of the Service at any time. We may also update these Terms from time to time. When we do, we will revise the date above and, where appropriate, notify you within the product. Your continued use of the Service after updated Terms take effect means you accept them. If you do not agree to the changes, stop using the Service."
            }
          </p>

          <h2 id="governing-law">16. Governing law</h2>
          <p>
            {
              "These Terms are governed by the laws of the United States and the state in which Noel Jubil Sason resides, without regard to conflict-of-laws principles, except where applicable consumer-protection law in your place of residence requires otherwise. Nothing in these Terms limits any non-waivable rights you have under the law of your jurisdiction."
            }
          </p>

          <h2 id="contact-us">17. Contact us</h2>
          <p>
            {"Questions about these Terms can be sent to Noel Jubil Sason at "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            {"."}
          </p>
        </ArticleShell>
      </article>
    </PageShell>
  );
}
