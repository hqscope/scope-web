import type { Metadata } from "next";
import Link from "next/link";
import { Bot, GraduationCap, Lock, ShieldCheck, UserCheck } from "lucide-react";

import JsonLd from "@/components/seo/JsonLd";
import PublicPageFrame from "@/components/public/PublicPageFrame";
import { breadcrumbSchema } from "@/lib/structured-data";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | Scope",
  description:
    "The terms for using Scope, Lectra Notes, and the Scope web workspace: accounts, your content, academic integrity, AI features, third-party platforms, and the as-is nature of the product.",
  alternates: {
    canonical: "/terms",
  },
};

const LAST_UPDATED = "July 28, 2026";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Free, and provided as is",
    copy:
      "Scope and Lectra are free and still evolving. We work toward stability, but we provide the product as is, without warranties, and you keep your own copies of critical academic files.",
  },
  {
    icon: GraduationCap,
    title: "Academic integrity stays yours",
    copy:
      "Scope is a study tool, not a way around your course rules. You are responsible for following your school and instructor academic-integrity policies.",
  },
  {
    icon: Bot,
    title: "The AI helps you study, it cannot submit your work",
    copy:
      "Scope AI creates study aids and answers grounded in your course context. It is built so it cannot submit graded work for you, and its output can be wrong, so verify before you rely on it.",
  },
  {
    icon: Lock,
    title: "Your content stays yours",
    copy:
      "Your documents, annotations, notes, and profile facts remain yours. You grant us only the limited permissions needed to store, sync, and deliver them across the product.",
  },
  {
    icon: UserCheck,
    title: "Questions and support",
    copy: SUPPORT_EMAIL,
  },
];

export default function TermsPage() {
  return (
    <PublicPageFrame>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Terms", path: "/terms" },
          ]),
        ]}
      />
      <section className="page-wrap max-w-4xl py-14 lg:py-20">
        <div className="space-y-6">
          <p className="kicker">Terms of service</p>
          <h1 className="text-5xl sm:text-6xl">
            What Scope does, what it does not, and what stays your responsibility.
          </h1>
          <p className="section-copy text-lg">
            These Terms of Service (the &ldquo;Terms&rdquo;) govern your use of
            Scope, Lectra Notes, and the Scope
            website and web workspace (together, the &ldquo;Service&rdquo;),
            operated by Scope Inc. By installing, signing in to, or using
            the Service, you agree to these Terms. If you do not agree, do not
            use the Service.
          </p>
          <p className="section-copy text-sm opacity-80">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="mt-10 grid gap-4">
          {highlights.map((section) => {
            const Icon = section.icon;
            return (
              <article key={section.title} className="public-panel rounded-[1.5rem] p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-[var(--color-brand-soft)] p-3 text-[var(--color-brand)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl">{section.title}</h2>
                    <p className="mt-3 section-copy">
                      {section.copy === SUPPORT_EMAIL ? (
                        <a
                          href={`mailto:${SUPPORT_EMAIL}`}
                          className="font-semibold text-[var(--color-brand-deep)] underline underline-offset-4"
                        >
                          {SUPPORT_EMAIL}
                        </a>
                      ) : (
                        section.copy
                      )}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 space-y-12">
          <section className="space-y-4">
            <h2 className="text-3xl">1. Who we are and what these Terms cover</h2>
            <p className="section-copy">
              {
                "Scope is developed and operated by Scope Inc., previously named Canvascope Inc. The rename did not change the company, your agreement, or the Service. These Terms apply to the Scope browser extension, the Scope website and web workspace, Lectra Notes distributed on the Apple App Store, and the connected workflows that share the same account system. Your privacy is covered separately by our "
              }
              <Link
                href="/privacy"
                className="font-semibold text-[var(--color-brand-deep)] underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              {", which is incorporated into these Terms by reference."}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">2. Who can use the Service</h2>
            <p className="section-copy">
              {
                "Scope is built for students and is not directed to children under 13. You may use the Service only if you can form a binding agreement with Scope Inc. If you are under the age of majority in your jurisdiction, you may use the Service only with the involvement and consent of a parent, guardian, or your school. If you use the Service through a school or institutional account, you are responsible for complying with that institution's rules, and your institution's policies may also apply to your use."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">3. What the Service is</h2>
            <p className="section-copy">
              {
                "Scope is a local-first study tool. The browser extension can search your Canvas and Brightspace coursework, index and OCR PDFs on your device, answer questions grounded in your course context with citations, draft study plans, generate practice material, and move documents to and from Lectra Notes. Lectra lets you read and annotate course PDFs with Apple Pencil where supported, run on-device study tools, and, in its Projects workspace, edit notebooks and run a terminal, git, and Python on supported Apple devices. The web workspace shows connected product data such as synced documents and course coverage for the signed-in user."
              }
            </p>
            <p className="section-copy">
              {
                "The Service is free, and it is actively evolving. Some capabilities are experimental, and features may differ across the extension, Lectra, and the web workspace, or change over time. We may add, change, suspend, or remove features at any time."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">4. Your account</h2>
            <p className="section-copy">
              {
                "Some features require an account. You can sign in with Google or, on Lectra, with Sign in with Apple, using one shared identity across Scope, Lectra, and the web workspace. You are responsible for activity under your account and for keeping access to it secure. We may suspend or limit access to protect the Service, to respond to a security or account-risk signal (including Google Cross-Account Protection events), or to address a violation of these Terms. You can sign out at any time, and you can delete your account from within Lectra or by contacting us."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">5. Your content</h2>
            <p className="section-copy">
              {
                "You keep ownership of the content you bring to the Service, including the PDFs and documents you index or send, clipboard signals and copied/pasted text, the highlights, ink, and notes you add in Lectra, the code and files in Lectra Projects, and the profile facts you save. You grant Scope Inc. a limited, non-exclusive, worldwide, royalty-free license to host, store, process, transmit, sync, and display that content solely to operate and support the Service for you, including delivering documents between your devices and generating the results you request."
              }
            </p>
            <p className="section-copy">
              {
                "You are responsible for the content you bring to the Service and for having the rights to use it. Do not upload content you are not permitted to copy or store, and do not use the Service in a way that violates the rights of others or the terms of your learning platform or institution. We do not use your content to train, develop, or improve generalized AI or machine-learning models, as described in the Privacy Policy."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">6. Academic integrity</h2>
            <p className="section-copy">
              {
                "Scope is a productivity and study tool. It does not replace your course rules, your instructors' instructions, or your institution's academic-integrity policies, and using Scope does not excuse a violation of them. You are solely responsible for ensuring that the way you use the Service, and any AI-assisted output you submit or rely on, complies with those policies."
              }
            </p>
            <p className="section-copy">
              {
                "Scope AI is designed to help you find, understand, plan, and practice, not to do graded work for you. The Scope agent can read your course context and create study aids such as to-dos, calendar events, and study plans, but it is built so that it cannot submit graded work on your behalf, and actions that resemble turning in a graded assignment are blocked. You remain responsible for confirming and meeting your own submission requirements and deadlines."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">7. AI features</h2>
            <p className="section-copy">
              {
                "Scope tries an on-device model first and may use a cloud fallback for larger course-context questions, as described in the Privacy Policy. AI output can be inaccurate, incomplete, or out of date, and citations should be checked against the source material. AI output is not professional, legal, medical, financial, or academic advice. Do not rely on it as your sole source for graded work or important decisions, and verify anything that matters."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">8. Acceptable use</h2>
            <p className="section-copy">{"You agree not to:"}</p>
            <ul className="section-copy list-disc space-y-2 pl-6">
              <li>{"use the Service to violate any law or the rights of others;"}</li>
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
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">9. Third-party services and platforms</h2>
            <p className="section-copy">
              {
                "The Service works alongside platforms and providers operated by others, including Canvas (Instructure), Brightspace (D2L), Google, Apple, Gradescope, GitHub (for Lectra Projects), and our AI providers. Your use of those services is governed by their own terms and policies, and we are not responsible for them. Scope is an independent product and is not endorsed by, affiliated with, or sponsored by Instructure, D2L, Google, or Apple, and references to those platforms are for compatibility and description only. Scope's use of information from Google APIs adheres to the "
              }
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-brand-deep)] underline underline-offset-4"
              >
                Google API Services User Data Policy
              </a>
              {
                ", including the Limited Use requirements. Lectra is offered through the Apple App Store and is also subject to Apple's standard licensed-application terms."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">10. Intellectual property and license to you</h2>
            <p className="section-copy">
              {
                "The Service, including its software, design, and the Scope and Lectra names and logos, is owned by Scope Inc. and protected by intellectual property laws. Subject to these Terms, we grant you a personal, limited, non-exclusive, non-transferable, revocable license to use the Service for your own studies. We reserve all rights not expressly granted. Open-source components included in the Service remain governed by their own licenses, and in Lectra Projects your own repositories and code remain yours, with GitHub access subject to GitHub's terms."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">11. Disclaimers</h2>
            <p className="section-copy">
              {
                "The Service is provided on an as is and as available basis, without warranties of any kind, whether express, implied, or statutory, including any implied warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement. We do not warrant that the Service will be uninterrupted, error-free, secure, or that search results, indexing, AI output, document delivery, or calendar writes will be complete, accurate, or timely. You are responsible for keeping your own copies of critical academic files and for confirming your institution's requirements and deadlines."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">12. Limitation of liability</h2>
            <p className="section-copy">
              {
                "To the maximum extent permitted by law, Scope Inc. and its operators will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, lost work, missed deadlines, or academic outcomes such as grades, arising out of or relating to your use of, or inability to use, the Service. Because the Service is provided free of charge, to the maximum extent permitted by law our total liability for any claim relating to the Service is limited to one hundred U.S. dollars (USD 100). Some jurisdictions do not allow certain limitations, so some of these limitations may not apply to you."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">13. Indemnification</h2>
            <p className="section-copy">
              {
                "You agree to indemnify and hold harmless Scope Inc. from claims, damages, and expenses (including reasonable legal fees) arising out of your misuse of the Service, your violation of these Terms, or your violation of any law or the rights of a third party."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">14. Termination</h2>
            <p className="section-copy">
              {
                "You can stop using the Service at any time, sign out, or delete your account. We may suspend or terminate your access if you violate these Terms, if needed to protect the Service or other users, or to comply with law. When access ends, the licenses granted in these Terms end, and we will handle your data as described in the Privacy Policy. Sections that by their nature should survive termination, including content ownership, disclaimers, limitation of liability, and indemnification, will survive."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">15. Changes to the Service and these Terms</h2>
            <p className="section-copy">
              {
                "We may modify, suspend, or discontinue any part of the Service at any time. We may also update these Terms from time to time. When we do, we will revise the date above and, where appropriate, notify you within the product. Your continued use of the Service after updated Terms take effect means you accept them. If you do not agree to the changes, stop using the Service."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">16. Governing law</h2>
            <p className="section-copy">
              {
                "These Terms are governed by the laws of the United States and the state in which Scope Inc. is incorporated, without regard to conflict-of-laws principles, except where applicable consumer-protection law in your place of residence requires otherwise. Nothing in these Terms limits any non-waivable rights you have under the law of your jurisdiction."
              }
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">17. Contact us</h2>
            <p className="section-copy">
              {"Questions about these Terms can be sent to Scope Inc. at "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-semibold text-[var(--color-brand-deep)] underline underline-offset-4"
              >
                {SUPPORT_EMAIL}
              </a>
              {"."}
            </p>
          </section>
        </div>
      </section>
    </PublicPageFrame>
  );
}
