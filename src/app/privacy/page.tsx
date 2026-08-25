import type { Metadata } from "next";
import { Bot, CalendarPlus, Database, Lock, ShieldCheck, UserRound } from "lucide-react";

import JsonLd from "@/components/seo/JsonLd";
import PublicPageFrame from "@/components/public/PublicPageFrame";
import { breadcrumbSchema } from "@/lib/structured-data";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Scope and Lectra, operated by Scope Inc., access, use, store, share, retain, and protect account data, user content, and optional AI requests.",
  alternates: {
    canonical: "/privacy",
  },
};

const LAST_UPDATED = "July 28, 2026";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Local-first stays the default",
    copy:
      "Scope stores its core LMS search index in browser-local storage. The website reflects synced data only after you explicitly sign in or sync a document through connected product flows.",
  },
  {
    icon: Database,
    title: "Connected data is product data, not ad-tech data",
    copy:
      "When you sign in, the web app reads shared records such as course snapshots, document handoff metadata, Course Brain artifacts, and student profile facts. These records support the product itself rather than a tracking or advertising business model.",
  },
  {
    icon: Bot,
    title: "AI is local-first, with explicit fallback",
    copy:
      "The extension tries Chrome's on-device model first. If cloud fallback is used, retrieved prompt context is sent through authenticated Scope endpoints only to generate the requested answer.",
  },
  {
    icon: Lock,
    title: "Shared identity, scoped access",
    copy:
      "The website uses the same shared account system as Scope and Lectra. Access to synced records stays scoped to the signed-in user, protected by secure access controls, and hardened by cross-account protection events.",
  },
  {
    icon: CalendarPlus,
    title: "Calendar access is optional",
    copy:
      "If you use syllabus or planner calendar sync, Scope may request Google Calendar event access so selected course dates can be written to your calendar. Core search does not require it.",
  },
  {
    icon: UserRound,
    title: "Questions and support",
    copy: SUPPORT_EMAIL,
  },
];

export default function PrivacyPage() {
  return (
    <PublicPageFrame>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy", path: "/privacy" },
          ]),
        ]}
      />
      <section className="page-wrap legal-page">
        <div className="space-y-6">
          <p className="kicker">Privacy policy</p>
          <h1>
            How Scope handles your data.
          </h1>
          <p className="section-copy">
            This Privacy Policy explains how the Scope application and
            website (collectively, &ldquo;Scope,&rdquo; the
            &ldquo;Service&rdquo;), operated by Scope Inc., accesses, uses,
            stores, shares, retains, and protects your data, including
            data obtained from your Google Account. Scope is local-first
            where that matters most: course indexing, fast search, and
            day-to-day retrieval. Connected web and document workflows exist to
            support you, not to turn academic behavior into an analytics funnel.
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
                    <h2 className="">{section.title}</h2>
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
            <h2 className="text-3xl">Who we are</h2>
            <p className="section-copy">
              Scope is developed and operated by Scope Inc., previously named
              Canvascope Inc. The rename did not change the company, this
              policy, or how your data is handled. This
              policy applies to the Scope browser extension, the Scope
              website and web app, the Lectra Notes app distributed
              on the Apple App Store, and the Lectra-connected workflows that
              share the same account system. If you have any questions about this
              policy or your data, contact us at{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-semibold text-[var(--color-brand-deep)] underline underline-offset-4"
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">What Google user data we collect</h2>
            <p className="section-copy">
              When you choose to sign in with Google for account-linked product
              features, we request the limited OpenID Connect scopes{" "}
              <code>openid</code>, <code>email</code>, and <code>profile</code>.
              Through these scopes we access and collect the following Google
              user data:
            </p>
            <ul className="section-copy list-disc space-y-2 pl-6">
              <li>Your Google Account unique identifier (the &ldquo;sub&rdquo; claim)</li>
              <li>Your email address</li>
              <li>Your basic profile information, such as your name</li>
              <li>Your Google profile picture (if available)</li>
            </ul>
            <p className="section-copy">
              If you choose to use Scope&apos;s syllabus or planner calendar
              sync features, we may also request{" "}
              <code>https://www.googleapis.com/auth/calendar.events</code> so
              Scope can create selected course schedule events in Google
              Calendar. For that feature, we may store Google OAuth tokens needed
              to keep calendar writes working until you disconnect access or the
              tokens expire.
            </p>
            <p className="section-copy">
              We do <strong>not</strong> request or access your Gmail messages,
              Google Classroom data, contacts, or broad calendar read/write
              scopes beyond the event-level access described above. The optional
              Lectra Google Drive backup can only see the folder it creates
              (described in the Lectra sections below). We only receive data you
              explicitly authorize during the Google consent flow.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">How we use Google user data</h2>
            <p className="section-copy">
              We use the Google user data described above solely to provide and
              improve user-facing features of Scope. Specifically, we use it
              to:
            </p>
            <ul className="section-copy list-disc space-y-2 pl-6">
              <li>Authenticate you and create or restore your Scope account session</li>
              <li>
                Identify you across the shared Scope and Lectra account
                system so your synced course snapshots, documents, and Course
                Brain artifacts are scoped to you
              </li>
              <li>
                Personalize Scope AI responses when you save or allow
                Scope to auto-capture student profile facts such as current
                courses, study preferences, or pending todo count
              </li>
              <li>Display your name, email, and profile picture in the signed-in interface</li>
              <li>
                Create selected Google Calendar events when you explicitly run a
                calendar sync workflow
              </li>
              <li>Contact you about your account or provide support when needed</li>
            </ul>
            <p className="section-copy">
              We do <strong>not</strong> use Google user data for advertising,
              targeted or personalized ads, retargeting, profiling, selling to
              data brokers or information resellers, determining credit-worthiness,
              lending, building independent databases, or training, developing,
              or improving generalized artificial intelligence or machine
              learning models. Scope&rsquo;s use of information received
              from Google APIs adheres to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-brand-deep)] underline underline-offset-4"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">Scope browser extension and clipboard data</h2>
            <p className="section-copy">
              To support connected study workflows, help you organize assignments, and build your Student Profile, the Scope browser extension reads, stores, and syncs clipboard activity.
            </p>
            <p className="section-copy">
              Specifically, when you copy, cut, or paste content on Canvas, Brightspace, or other sites and applications, or when you load a page, the extension may capture the raw text currently in your clipboard (capped at 4,000 characters per entry for storage and sync limits). This raw text is stored securely in your browser-local storage and synced to our database under the same secure sync path used for your grades, notes, and tasks.
            </p>
            <p className="section-copy">
              We capture the actual text so that future features can reason over how you copy and study (such as which excerpts or phrasing you reference) to suggest similar resources later. The raw text is processed locally on your device to derive a content-light, privacy-preserving <code>assignment_engagement</code> summary for your Student Profile. This derived summary itself never contains the raw clipboard text. We do not use the raw clipboard text or any other user content to train, develop, or improve generalized AI or machine learning models.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">How we share, transfer, or disclose data</h2>
            <p className="section-copy">
              We do <strong>not</strong> sell your Google user data or any other
              personal data, and we do not transfer or disclose it to third
              parties for purposes other than providing or improving the Service.
              We share data only in the following limited circumstances:
            </p>
            <ul className="section-copy list-disc space-y-2 pl-6">
              <li>
                <strong>Service providers / subprocessors:</strong> We use trusted
                infrastructure providers, including Supabase (database and
                authentication) and our hosting provider, to store and
                process data strictly on our behalf and under contractual
                confidentiality and security obligations. These providers may not
                use your data for their own purposes.
              </li>
              <li>
                <strong>AI fallback providers:</strong> Scope tries Chrome&apos;s
                on-device model first. If you use cloud AI fallback, or if a
                full-course context question needs a larger cloud route,
                retrieved prompt context may be sent through authenticated
                Scope Supabase Edge Functions to Google Gemini or Anthropic
                Claude APIs solely to generate the requested answer. This does
                not change the local-first search index, and we do not use this
                data to train generalized AI models.
              </li>
              <li>
                <strong>Legal requirements:</strong> We may disclose data if
                required to do so by law, regulation, legal process, or
                enforceable governmental request.
              </li>
              <li>
                <strong>With your direction:</strong> We share data when you
                explicitly direct us to, such as syncing a document between
                connected Scope and Lectra workflows.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">How we protect your data</h2>
            <p className="section-copy">
              Security procedures are in place to protect the confidentiality of
              your data. We use encryption in transit (HTTPS/TLS) for all data
              exchanged with Google and our servers, and your session is carried
              in a signed, secure, HTTP-only cookie. Access to synced records is
              scoped to the authenticated user and protected by secure access
              controls. When Google Cross-Account Protection sends a valid
              account-risk event, Scope can revoke affected sessions and, for
              disabled accounts, block future token issuance until the account is
              re-enabled. We restrict internal access to personal data to what is
              necessary to operate and support the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">Lectra Notes and the Apple App Store</h2>
            <p className="section-copy">
              Lectra Notes is the Apple App Store app from Scope for iPhone
              and iPad. You sign in to Lectra with the same Scope
              account, using <strong>Sign in with Apple</strong> or Google,
              and Lectra lets you receive course PDFs, read them, annotate them
              by hand with Apple Pencil, and use a local Projects workspace with
              an editor, terminal, Git, Python, optional GitHub linking, and
              optional SSH connections that you start yourself. The sections below
              describe Lectra&rsquo;s data practices specifically and map them to
              the data types Apple uses in App Store privacy
              (&ldquo;Nutrition&rdquo;) labels. Lectra contains no third-party
              advertising, analytics, or tracking SDKs. It does count active
              users first-party, as described below.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">Data Lectra collects on Apple devices</h2>
            <p className="section-copy">
              Consistent with Apple&rsquo;s App Store privacy categories, Lectra
              collects the following data, and only to operate the app&rsquo;s
              features (&ldquo;App Functionality&rdquo;). Each type is
              <strong> linked to your identity</strong> because it is stored under
              your authenticated account:
            </p>
            <ul className="section-copy list-disc space-y-2 pl-6">
              <li>
                <strong>Contact Info - Name and Email Address:</strong> When
                you sign in, we receive your name and email address from Sign in
                with Apple or Google so we can create and restore your account. If
                you use Apple&rsquo;s <strong>Hide My Email</strong>, we only
                receive the private relay address Apple provides.
              </li>
              <li>
                <strong>User Content - Files and handwritten annotations:</strong>{" "}
                The course PDFs you send to Lectra, the highlights, underlines,
                ink strokes, and handwritten notes you add with Apple Pencil, and
                the notebooks, project files, code files, and GitHub repository
                content you choose to open or clone are stored so your work stays
                available inside the product and across your devices when sync is
                enabled.
              </li>
              <li>
                <strong>Identifiers - User ID and Device ID:</strong> We
                store your account user ID, GitHub account linkage metadata if
                you connect GitHub, and a per-install device identifier (a random
                ID generated on your device) so documents and projects can be
                delivered to the right Apple device and scoped to the right
                account.
              </li>
            </ul>
            <p className="section-copy">
              Lectra also collects one data type that is{" "}
              <strong>not linked to your identity</strong>:
            </p>
            <ul className="section-copy list-disc space-y-2 pl-6">
              <li>
                <strong>Usage &amp; Diagnostics - Product Interaction:</strong>{" "}
                So we can tell how many people actually use Lectra, the app sends
                a short &ldquo;someone is using this&rdquo; ping when you open it.
                The ping carries the random per-install identifier above, the
                platform, and the app version - nothing else. It works whether or
                not you have an account, so people using Lectra entirely offline
                are still counted. It never includes document names, document
                contents, annotations, or anything you wrote, and it is never
                combined with data from other companies or used for advertising.
              </li>
            </ul>
            <p className="section-copy">
              To deliver documents in near real time, Lectra also registers an
              Apple Push Notification service (APNs) device token, your
              device&rsquo;s name (for example, &ldquo;Jordan&rsquo;s iPad&rdquo;),
              and the device identifier above with our Supabase backend. These are
              used solely to wake the app and fetch your pending documents.
            </p>
            <p className="section-copy">
              Lectra does <strong>not</strong> request or collect your precise or
              coarse location, contacts, photo library, camera, microphone, health
              or fitness data, financial information, Safari/browser browsing
              history, or advertising data. Lectra does not include in-app
              purchases or collect purchase history.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">How Lectra uses your data</h2>
            <p className="section-copy">
              Under Apple&rsquo;s data-use definitions, Lectra uses the data above
              for <strong>App Functionality</strong> only: authenticating
              you, delivering and syncing your documents and annotations,
              registering your device for notifications, letting you edit local
              project files, connecting to GitHub when you choose to link it, and
              providing support. Some on-device study features personalize what
              you see (for example, generating a summary of the document in front
              of you), but this personalization happens on your device, as
              described below.
            </p>
            <p className="section-copy">
              Lectra does <strong>not</strong> use your data for Third-Party
              Advertising, for our own Advertising or Marketing, or for
              cross-app/cross-site Analytics, and we do not sell your data or share
              it with data brokers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">On-device study intelligence on Apple devices</h2>
            <p className="section-copy">
              Lectra&rsquo;s study tools, summaries, flashcards, tags, and
              answers, run on-device using Apple&rsquo;s on-device
              Foundation Models (Apple Intelligence) when your device supports them.
              The text of your documents is processed <strong>privately on your
              device</strong> to generate these results. Lectra does not send your
              document contents to Scope servers or to any third party to
              power these features, and your content is <strong>not</strong> used
              to train, develop, or improve any generalized AI or machine-learning
              models. If a device or OS does not support Apple Intelligence, these
              features are simply unavailable rather than routed off device.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">Lectra Agent and Anthropic Claude</h2>
            <p className="section-copy">
              Lectra Agent is an optional coding feature branded
              <strong> Lectra Agent &mdash; Powered by Claude</strong>. It is
              separate from the on-device study intelligence described above.
              To use it, you provide your own Anthropic API key. Anthropic bills
              your Anthropic account for those requests under its own terms.
            </p>
            <p className="section-copy">
              When you ask Lectra Agent to work, Lectra sends the prompt and the
              code or notebook context needed for that task directly from your
              device to Anthropic. Depending on the mode and tools you choose,
              this may include selected text, file contents, diffs, diagnostics,
              tool results, commands, and command output. Anthropic processes
              that data to return the requested response. Scope does not
              proxy these requests through Scope or Supabase servers and
              does not collect prompts, code, paths, commands, diffs, or agent
              responses as analytics or telemetry. Anthropic&rsquo;s processing is
              governed by its own{" "}
              <a
                href="https://www.anthropic.com/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-brand-deep)] underline underline-offset-4"
              >
                privacy policy
              </a>{" "}
              and the terms for your Anthropic account.
            </p>
            <p className="section-copy">
              Your Anthropic API key is stored in the Apple Keychain on the
              current device, scoped to your signed-in Lectra account. Lectra
              displays only the provider and final four characters after setup.
              The key is never stored in a project, included in diagnostics, or
              synced through iCloud. Lectra blocks common credential files,
              private keys, Git internals, and detected secrets from automatic
              context. If you explicitly unlock one protected file for one task,
              that conversation remains device-local.
            </p>
            <p className="section-copy">
              Coding-agent conversations are stored locally under your Lectra
              account. If you enable Lectra Cloud Sync and your plan includes it,
              Lectra can sync structured conversation history through your
              private iCloud container so the conversation list is available on
              your devices. Raw terminal output, local undo data, and the
              Anthropic API key are not included in that sync. You can delete
              agent conversations in Lectra, and account deletion removes local
              and synced agent history associated with that account.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">Lectra Projects, GitHub, terminal, and SSH</h2>
            <p className="section-copy">
              Lectra Projects is an optional local developer workspace inside the
              app. Project files, terminal history, Git metadata, and notebooks
              stay inside Lectra&rsquo;s app sandbox unless you explicitly sync,
              export, or push them somewhere else.
            </p>
            <p className="section-copy">
              If you connect GitHub, Lectra uses GitHub OAuth through the shared
              Scope account system or a personal access token you enter. The
              resulting GitHub token is stored in the iOS Keychain and attached
              only to requests made to GitHub so you can browse repositories,
              clone, pull, commit, and push. You can disconnect GitHub from
              Lectra, and GitHub access is also subject to GitHub&rsquo;s own terms
              and privacy policy.
            </p>
            <p className="section-copy">
              If you use SSH in the terminal, you enter the host, username, and
              credentials yourself. SSH passwords are used for the connection
              attempt and are not stored by Lectra. Known-host records are stored
              locally to warn if a host key changes. When you connect to a local
              network host, iPadOS may ask for local network permission; Lectra
              uses that access only for the user-entered development host or
              local service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">
              Sign in with Apple, iCloud, Google Drive, and notifications
            </h2>
            <p className="section-copy">
              <strong>Sign in with Apple.</strong> Lectra offers Sign in with Apple
              and requests only your name and email. You may choose to hide your
              email with Apple&rsquo;s private relay; we never receive more than
              what you authorize during the Apple sign-in flow.
            </p>
            <p className="section-copy">
              <strong>iCloud.</strong> If you enable cloud sync or backup, Lectra
              can store recovery snapshots of your documents in your own private
              iCloud (CloudDocuments) container and can sync structured Lectra
              Agent conversation history. This data lives in your personal iCloud
              account under Apple&rsquo;s control; we do not separately collect or
              read your iCloud backups. Anthropic API keys and raw agent tool
              output are never included in iCloud sync.
            </p>
            <p className="section-copy">
              <strong>Google Drive backup.</strong> If you connect Google Drive
              backup in Lectra, Lectra creates a folder in your own Google Drive
              and uploads copies of your documents, notebooks, and project files
              to it. Lectra uses Google&rsquo;s{" "}
              <code>https://www.googleapis.com/auth/drive.file</code> permission,
              which only allows access to files Lectra itself creates — it cannot
              see, read, or change anything else in your Drive. Uploads happen
              only while backup is connected; disconnecting it stops them, and
              the folder and its contents remain yours in your Drive. Google
              Drive backup is optional and never required to use Lectra.
            </p>
            <p className="section-copy">
              <strong>Push notifications.</strong> Lectra uses Apple Push
              Notification service to know when new documents are waiting. You can
              turn notifications off at any time in iOS Settings; document delivery
              then falls back to checking when you open the app.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">Tracking and App Tracking Transparency</h2>
            <p className="section-copy">
              Lectra does <strong>not</strong> track you as Apple defines
              tracking. We do not link your data with third-party data for targeted
              advertising or advertising measurement, we do not share your data
              with data brokers, and Lectra contains no advertising identifier
              (IDFA) usage and no third-party advertising or analytics SDKs.
              Because Lectra does not track you, it does not present the App
              Tracking Transparency prompt.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">Deleting your account from within Lectra</h2>
            <p className="section-copy">
              In line with Apple&rsquo;s account-deletion requirement, Lectra lets
              you permanently delete your account directly in the app from Account
              Settings. Account deletion runs a secure server-side function that
              removes your account and the associated server-side data, then signs
              you out and clears Lectra&rsquo;s on-device data for that account,
              including its Anthropic key and local coding-agent history. Synced
              coding-agent history in Lectra&rsquo;s private iCloud container is also
              removed through the app&rsquo;s account-deletion cleanup.
              You can also sign out to clear the active session, or email us to
              request deletion, as described next.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">Data retention and deletion</h2>
            <p className="section-copy">
              We retain your account and Google user data only for as long as
              needed to provide the Service and fulfill the purposes described in
              this policy, unless a longer retention period is required or
              permitted by law. When the retention period expires, or when data
              is no longer needed, we delete or anonymize it.
            </p>
            <p className="section-copy">
              You may sign out at any time to clear your active session. You may
              also request access to, correction of, or deletion of your personal
              data, including the Google user data, Google Calendar tokens,
              and synced product data associated with your account, by
              emailing us at{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-semibold text-[var(--color-brand-deep)] underline underline-offset-4"
              >
                {SUPPORT_EMAIL}
              </a>
              . Upon a verified request, we will delete your account data within a
              reasonable period, except where retention is required by law. You can
              also revoke Scope&rsquo;s access to your Google Account at any
              time from your{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-brand-deep)] underline underline-offset-4"
              >
                Google Account permissions page
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">Changes to this policy</h2>
            <p className="section-copy">
              We may update this Privacy Policy from time to time. If we change
              how we use Google user data, we will update this page and revise the
              &ldquo;Last updated&rdquo; date above, and where appropriate we will
              notify you within the product. Your continued use of the Service
              after changes take effect constitutes acceptance of the updated
              policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl">Contact us</h2>
            <p className="section-copy">
              For any questions, concerns, or requests regarding this Privacy
              Policy or your data, contact Scope Inc. at{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-semibold text-[var(--color-brand-deep)] underline underline-offset-4"
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </PublicPageFrame>
  );
}
