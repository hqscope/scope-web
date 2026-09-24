import Link from "next/link";

import Sheet from "@/components/motion/Sheet";
import JsonLd from "@/components/seo/JsonLd";
import ComparisonTable from "@/components/site/ComparisonTable";
import PageShell from "@/components/site/PageShell";
import { publicPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { SUPPORT_EMAIL } from "@/lib/site";

import "../_company/company.css";
import LegalOutline, { type OutlineItem } from "../_company/LegalOutline";

export const metadata = publicPageMetadata({
  title: "Privacy Policy",
  description:
    "How Scope and Lectra Notes, operated by Scope Inc., access, use, store, share, retain, and protect account data, user content, and optional AI requests.",
  path: "/privacy",
});

const LAST_UPDATED = "September 17, 2026";

// The legal text below is carried over from the previous page byte for byte.
// Only the page structure around it is new.
const highlights = [
  {
    title: "Local-first stays the default",
    copy: "Scope stores its core LMS search index in browser-local storage. The website reflects synced data only after you explicitly sign in or sync a document through connected product flows.",
  },
  {
    title: "Connected data is product data, not ad-tech data",
    copy: "When you sign in, the web app reads shared records such as course snapshots, document handoff metadata, Course Brain artifacts, and student profile facts. These records support the product itself rather than a tracking or advertising business model.",
  },
  {
    title: "AI is local-first, with explicit fallback",
    copy: "The extension tries Chrome's on-device model first. If cloud fallback is used, the retrieved course context is sent through Scope's own servers only to generate the requested answer.",
  },
  {
    title: "Shared identity, scoped access",
    copy: "The website uses the same shared account system as Scope and Lectra Notes. Access to synced records stays scoped to the signed-in user, protected by secure access controls, and hardened by cross-account protection events.",
  },
  {
    title: "Calendar access is optional",
    copy: "If you use syllabus or planner calendar sync, Scope may request Google Calendar event access so selected course dates can be written to your calendar. Core search does not require it.",
  },
  {
    title: "Questions and support",
    copy: SUPPORT_EMAIL,
  },
];

const outline: OutlineItem[] = [
  {
    id: "who-we-are",
    label: "Who we are",
  },
  {
    id: "what-google-user-data-we-collect",
    label: "What Google user data we collect",
  },
  {
    id: "how-we-use-google-user-data",
    label: "How we use Google user data",
  },
  {
    id: "scope-browser-extension-permissions",
    label: "Scope browser extension permissions",
  },
  {
    id: "how-we-share-transfer-or-disclose-data",
    label: "How we share, transfer, or disclose data",
  },
  {
    id: "how-we-protect-your-data",
    label: "How we protect your data",
  },
  {
    id: "lectra-notes-and-the-apple-app-store",
    label: "Lectra Notes and the Apple App Store",
  },
  {
    id: "data-lectra-collects-on-apple-devices",
    label: "Data Lectra collects on Apple devices",
  },
  {
    id: "how-lectra-uses-your-data",
    label: "How Lectra uses your data",
  },
  {
    id: "on-device-study-intelligence-on-apple-devices",
    label: "On-device study intelligence on Apple devices",
  },
  {
    id: "lectra-agent-and-anthropic-claude",
    label: "Lectra Agent and Anthropic Claude",
  },
  {
    id: "lectra-projects-github-terminal-and-ssh",
    label: "Lectra Projects, GitHub, terminal, and SSH",
  },
  {
    id: "sign-in-with-apple-icloud-google-drive-and-notifications",
    label: "Sign in with Apple, iCloud, Google Drive, and notifications",
  },
  {
    id: "tracking-and-app-tracking-transparency",
    label: "Tracking and App Tracking Transparency",
  },
  {
    id: "deleting-your-account-from-within-lectra",
    label: "Deleting your account from within Lectra",
  },
  {
    id: "data-retention-and-deletion",
    label: "Data retention and deletion",
  },
  {
    id: "changes-to-this-policy",
    label: "Changes to this policy",
  },
  {
    id: "contact-us",
    label: "Contact us",
  },
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy", path: "/privacy" },
          ]),
        ]}
      />
      <Sheet as="article" labelledBy="privacy-title">
        <header className="shell page-head co-legal-head">
          <p className="context-line">Privacy policy</p>
          <h1
            id="privacy-title"
            className="t-title"
            data-focus
            style={{ maxWidth: "22ch" }}
          >
            How Scope handles your data.
          </h1>
          <div className="lede">
            <p>
              This Privacy Policy explains how the Scope application and website
              (collectively, &ldquo;Scope,&rdquo; the &ldquo;Service&rdquo;),
              operated by Scope Inc., accesses, uses, stores, shares, retains,
              and protects your data, including data obtained from your Google
              Account. Scope is local-first where that matters most: course
              indexing, fast search, and day-to-day retrieval. Connected web and
              document workflows exist to support you, not to turn academic
              behavior into an analytics funnel.
            </p>
          </div>
          <p className="small co-legal-updated">Last updated: {LAST_UPDATED}</p>
        </header>

        <div className="shell co-legal-body">
          <div className="co-legal-highlights">
            {highlights.map((section) => (
              <article key={section.title} className="plane">
                <h2>{section.title}</h2>
                <p>
                  {section.copy === SUPPORT_EMAIL ? (
                    <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                  ) : (
                    section.copy
                  )}
                </p>
              </article>
            ))}
          </div>

          <div className="reading">
            <div className="prose">
              <section>
                <h2 id="who-we-are">Who we are</h2>
                <p>
                  Scope is developed and operated by Scope Inc., previously
                  named Canvascope Inc. The rename did not change the company,
                  this policy, or how your data is handled. This policy applies
                  to the Scope browser extension, the Scope website and web app,
                  the Lectra Notes app distributed on the Apple App Store, and
                  the Lectra-connected workflows that share the same account
                  system. If you have any questions about this policy or your
                  data, contact us at{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
                </p>
              </section>

              <section>
                <h2 id="what-google-user-data-we-collect">
                  What Google user data we collect
                </h2>
                <p>
                  When you choose to sign in with Google for account-linked
                  product features, we request the limited OpenID Connect scopes{" "}
                  <code>openid</code>, <code>email</code>, and{" "}
                  <code>profile</code>. Through these scopes we access and
                  collect the following Google user data:
                </p>
                <ul>
                  <li>
                    Your Google Account unique identifier (the &ldquo;sub&rdquo;
                    claim)
                  </li>
                  <li>Your email address</li>
                  <li>Your basic profile information, such as your name</li>
                  <li>Your Google profile picture (if available)</li>
                </ul>
                <p>
                  If you choose to use Scope&apos;s syllabus or planner calendar
                  sync features, we may also request{" "}
                  <code>https://www.googleapis.com/auth/calendar.events</code>{" "}
                  so Scope can create selected course schedule events in Google
                  Calendar. For that feature, we may store Google OAuth tokens
                  needed to keep calendar writes working until you disconnect
                  access or the tokens expire.
                </p>
                <p>
                  We do <strong>not</strong> request or access your Gmail
                  messages, Google Classroom data, contacts, or broad calendar
                  read/write scopes beyond the event-level access described
                  above. The optional Lectra Google Drive backup can only see
                  the folder it creates (described in the Lectra sections
                  below). We only receive data you explicitly authorize during
                  the Google consent flow.
                </p>
              </section>

              <section>
                <h2 id="how-we-use-google-user-data">
                  How we use Google user data
                </h2>
                <p>
                  We use the Google user data described above solely to provide
                  and improve user-facing features of Scope. Specifically, we
                  use it to:
                </p>
                <ul>
                  <li>
                    Authenticate you and create or restore your Scope account
                    session
                  </li>
                  <li>
                    Identify you across the shared Scope and Lectra account
                    system so your synced course snapshots, documents, and
                    Course Brain artifacts are scoped to you
                  </li>
                  <li>
                    Personalize Scope AI responses when you save or allow Scope
                    to auto-capture student profile facts such as current
                    courses, study preferences, or pending todo count
                  </li>
                  <li>
                    Display your name, email, and profile picture in the
                    signed-in interface
                  </li>
                  <li>
                    Create selected Google Calendar events when you explicitly
                    run a calendar sync workflow
                  </li>
                  <li>
                    Contact you about your account or provide support when
                    needed
                  </li>
                </ul>
                <p>
                  We do <strong>not</strong> use Google user data for
                  advertising, targeted or personalized ads, retargeting,
                  profiling, selling to data brokers or information resellers,
                  determining credit-worthiness, lending, building independent
                  databases, or training, developing, or improving generalized
                  artificial intelligence or machine learning models.
                  Scope&rsquo;s use of information received from Google APIs
                  adheres to the{" "}
                  <a
                    href="https://developers.google.com/terms/api-services-user-data-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google API Services User Data Policy
                  </a>
                  , including the Limited Use requirements.
                </p>
              </section>

              <section>
                <h2 id="scope-browser-extension-permissions">
                  Scope browser extension permissions
                </h2>
                <p>
                  <strong>Permissions at a glance.</strong> What the Scope
                  browser extension asks for and what each item is used for, in
                  one place. The paragraphs of this policy are the controlling
                  description. For what to check before installing any Canvas
                  extension, see{" "}
                  <Link href="/guides/canvas-extension-safety">
                    Are Canvas extensions safe?
                  </Link>
                  .
                </p>
                <ComparisonTable
                  caption="Scope browser extension permissions at a glance"
                  columns={["Used for", "Optional?"]}
                  rows={[
                    {
                      label: "Canvas and Brightspace course pages",
                      cells: [
                        "Reading the course pages you open to build the LMS search index, which is stored in browser-local storage. The extension’s page features are declared for Canvas, Brightspace, Gradescope, Kaltura lecture-video pages, and Berkeley’s course scheduler, and are not loaded on login, logout, or single-sign-on pages.",
                        "Needed for search.",
                      ],
                    },
                    {
                      label: "All websites and local files",
                      cells: [
                        /* verify: why the all-sites host permission is declared */
                        "The extension declares access to all websites and to local files, so Chrome’s install prompt shows that access.",
                        "Granted at install. Site access can be narrowed afterwards in Chrome’s extension settings.",
                      ],
                    },
                    {
                      label: "Open tabs and navigation",
                      cells: [
                        "Lets the extension see the address and title of open tabs and when pages finish loading; Chrome describes this as reading browsing history. The Chrome Web Store listing discloses web history and user activity among the data handled.",
                        "Granted at install.",
                      ],
                    },
                    {
                      label: "Browser-local storage",
                      cells: [
                        "Holding the core LMS search index and your extension settings.",
                        "Needed.",
                      ],
                    },
                    {
                      label: "Google sign-in (openid, email, profile)",
                      cells: [
                        "Authenticating you and keeping synced course snapshots, documents, Course Brain artifacts, and student profile facts scoped to your account.",
                        "Optional; requested only for account-linked product features.",
                      ],
                    },
                    {
                      label: "Google Calendar (calendar.events)",
                      cells: [
                        "Creating selected course schedule events in Google Calendar when you run the syllabus or planner calendar sync. OAuth tokens are kept until you disconnect access or they expire.",
                        "Optional; requested only for that feature. Core search does not require it.",
                      ],
                    },
                    {
                      label: "AI answers",
                      cells: [
                        "Chrome’s on-device model first. If cloud fallback is used, or a full-course context question needs a larger cloud route, the retrieved course context is sent through Scope’s own servers to Google (Gemini) or Anthropic (Claude) solely to generate the requested answer.",
                        "Cloud fallback is optional.",
                      ],
                    },
                    {
                      label: "Never used for",
                      cells: [
                        "Selling your data, advertising, data brokers, or training generalized AI or machine learning models. Scope does not take quizzes, write submissions, or interact with Canvas quiz logs.",
                        "—",
                      ],
                    },
                  ]}
                />
                <p>
                  The Scope browser extension does not read, store, or sync your
                  clipboard.
                </p>
              </section>

              <section>
                <h2 id="how-we-share-transfer-or-disclose-data">
                  How we share, transfer, or disclose data
                </h2>
                <p>
                  We do <strong>not</strong> sell your Google user data or any
                  other personal data, and we do not transfer or disclose it to
                  third parties for purposes other than providing or improving
                  the Service. We share data only in the following limited
                  circumstances:
                </p>
                <ul>
                  <li>
                    <strong>Service providers / subprocessors:</strong> We use
                    infrastructure providers, including Supabase (database and
                    authentication) and our hosting provider, to store and
                    process data strictly on our behalf and under contractual
                    confidentiality and security obligations. These providers
                    may not use your data for their own purposes.
                  </li>
                  <li>
                    <strong>AI fallback providers:</strong> Scope tries
                    Chrome&apos;s on-device model first. If you use cloud AI
                    fallback, or if a full-course context question needs a
                    larger cloud route, the retrieved course context may be sent
                    through Scope&apos;s own servers to Google (Gemini) or
                    Anthropic (Claude) solely to generate the requested answer.
                    This does not change the local-first search index, and we do
                    not use this data to train generalized AI models.
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

              <section>
                <h2 id="how-we-protect-your-data">How we protect your data</h2>
                <p>
                  Security procedures are in place to protect the
                  confidentiality of your data. We use encryption in transit
                  (HTTPS/TLS) for all data exchanged with Google and our
                  servers, and your session is carried in a signed, secure,
                  HTTP-only cookie. Access to synced records is scoped to the
                  authenticated user and protected by secure access controls.
                  When Google Cross-Account Protection sends a valid
                  account-risk event, Scope can revoke affected sessions and,
                  for disabled accounts, block future token issuance until the
                  account is re-enabled. We restrict internal access to personal
                  data to what is necessary to operate and support the Service.
                </p>
              </section>

              <section>
                <h2 id="lectra-notes-and-the-apple-app-store">
                  Lectra Notes and the Apple App Store
                </h2>
                <p>
                  Lectra Notes is the Apple App Store app from Scope for iPhone
                  and iPad. You sign in to Lectra with the same Scope account,
                  using <strong>Sign in with Apple</strong> or Google, and
                  Lectra lets you receive course PDFs, read them, annotate them
                  by hand with Apple Pencil, and use a local Projects workspace
                  with an editor, terminal, Git, Python, optional GitHub
                  linking, and optional SSH connections that you start yourself.
                  The sections below describe Lectra&rsquo;s data practices
                  specifically and map them to the data types Apple uses in App
                  Store privacy (&ldquo;Nutrition&rdquo;) labels. Lectra
                  contains no third-party advertising, analytics, or tracking
                  SDKs. It does count active users first-party, as described
                  below.
                </p>
              </section>

              <section>
                <h2 id="data-lectra-collects-on-apple-devices">
                  Data Lectra collects on Apple devices
                </h2>
                <p>
                  Consistent with Apple&rsquo;s App Store privacy categories,
                  Lectra collects the following data, and only to operate the
                  app&rsquo;s features (&ldquo;App Functionality&rdquo;). Each
                  type is
                  <strong> linked to your identity</strong> because it is stored
                  under your authenticated account:
                </p>
                <ul>
                  <li>
                    <strong>Contact Info - Name and Email Address:</strong> When
                    you sign in, we receive your name and email address from
                    Sign in with Apple or Google so we can create and restore
                    your account. If you use Apple&rsquo;s{" "}
                    <strong>Hide My Email</strong>, we only receive the private
                    relay address Apple provides.
                  </li>
                  <li>
                    <strong>
                      User Content - Files and handwritten annotations:
                    </strong>{" "}
                    The course PDFs you send to Lectra, the highlights,
                    underlines, ink strokes, and handwritten notes you add with
                    Apple Pencil, and the notebooks, project files, code files,
                    and GitHub repository content you choose to open or clone
                    are stored so your work stays available inside the product
                    and across your devices when sync is enabled.
                  </li>
                  <li>
                    <strong>Identifiers - User ID and Device ID:</strong> We
                    store your account user ID, GitHub account linkage metadata
                    if you connect GitHub, and a per-install device identifier
                    (a random ID generated on your device) so documents and
                    projects can be delivered to the right Apple device and
                    scoped to the right account.
                  </li>
                </ul>
                <p>
                  Lectra also collects one data type that is{" "}
                  <strong>not linked to your identity</strong>:
                </p>
                <ul>
                  <li>
                    <strong>
                      Usage &amp; Diagnostics - Product Interaction:
                    </strong>{" "}
                    So we can tell how many people actually use Lectra, the app
                    sends a short &ldquo;someone is using this&rdquo; ping when
                    you open it. The ping carries the random per-install
                    identifier above, the platform, and the app version -
                    nothing else. It works whether or not you have an account,
                    so people using Lectra entirely offline are still counted.
                    It never includes document names, document contents,
                    annotations, or anything you wrote, and it is never combined
                    with data from other companies or used for advertising.
                  </li>
                </ul>
                <p>
                  To deliver documents in near real time, Lectra also registers
                  an Apple Push Notification service (APNs) device token, your
                  device&rsquo;s name (for example, &ldquo;Jordan&rsquo;s
                  iPad&rdquo;), and the device identifier above with our
                  servers. These are used solely to wake the app and fetch your
                  pending documents.
                </p>
                <p>
                  Lectra does <strong>not</strong> request or collect your
                  precise or coarse location, contacts, photo library, camera,
                  microphone, health or fitness data, financial information,
                  Safari/browser browsing history, or advertising data. Lectra
                  does not include in-app purchases or collect purchase history.
                </p>
              </section>

              <section>
                <h2 id="how-lectra-uses-your-data">
                  How Lectra uses your data
                </h2>
                <p>
                  Under Apple&rsquo;s data-use definitions, Lectra uses the data
                  above for <strong>App Functionality</strong> only:
                  authenticating you, delivering and syncing your documents and
                  annotations, registering your device for notifications,
                  letting you edit local project files, connecting to GitHub
                  when you choose to link it, and providing support. Some
                  on-device study features personalize what you see (for
                  example, generating a summary of the document in front of
                  you), but this personalization happens on your device, as
                  described below.
                </p>
                <p>
                  Lectra does <strong>not</strong> use your data for Third-Party
                  Advertising, for our own Advertising or Marketing, or for
                  cross-app/cross-site Analytics, and we do not sell your data
                  or share it with data brokers.
                </p>
              </section>

              <section>
                <h2 id="on-device-study-intelligence-on-apple-devices">
                  On-device study intelligence on Apple devices
                </h2>
                <p>
                  Lectra&rsquo;s study tools, summaries, flashcards, tags, and
                  answers, run on-device using Apple&rsquo;s on-device
                  Foundation Models (Apple Intelligence) when your device
                  supports them. The text of your documents is processed{" "}
                  <strong>privately on your device</strong> to generate these
                  results. Lectra does not send your document contents to Scope
                  servers or to any third party to power these features, and
                  your content is <strong>not</strong> used to train, develop,
                  or improve any generalized AI or machine-learning models. If a
                  device or OS does not support Apple Intelligence, these
                  features are simply unavailable rather than routed off device.
                </p>
              </section>

              <section>
                <h2 id="lectra-agent-and-anthropic-claude">
                  Lectra Agent and Anthropic Claude
                </h2>
                <p>
                  Lectra Agent is an optional coding feature branded
                  <strong> Lectra Agent &mdash; Powered by Claude</strong>. It
                  is separate from the on-device study intelligence described
                  above. To use it, you provide your own Anthropic API key.
                  Anthropic bills your Anthropic account for those requests
                  under its own terms.
                </p>
                <p>
                  When you ask Lectra Agent to work, Lectra sends the prompt and
                  the code or notebook context needed for that task directly
                  from your device to Anthropic. Depending on the mode and tools
                  you choose, this may include selected text, file contents,
                  diffs, diagnostics, tool results, commands, and command
                  output. Anthropic processes that data to return the requested
                  response. Scope does not route these requests through its own
                  servers and does not collect prompts, code, paths, commands,
                  diffs, or agent responses as analytics or telemetry.
                  Anthropic&rsquo;s processing is governed by its own{" "}
                  <a
                    href="https://www.anthropic.com/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    privacy policy
                  </a>{" "}
                  and the terms for your Anthropic account.
                </p>
                <p>
                  Your Anthropic API key is stored in the Apple Keychain on the
                  current device, scoped to your signed-in Lectra account.
                  Lectra displays only the provider and final four characters
                  after setup. The key is never stored in a project, included in
                  diagnostics, or synced through iCloud. Lectra blocks common
                  credential files, private keys, Git internals, and detected
                  secrets from automatic context. If you explicitly unlock one
                  protected file for one task, that conversation remains
                  device-local.
                </p>
                <p>
                  Coding-agent conversations are stored locally under your
                  Lectra account. If you enable Lectra Cloud Sync and your plan
                  includes it, Lectra can sync structured conversation history
                  through your private iCloud container so the conversation list
                  is available on your devices. Raw terminal output, local undo
                  data, and the Anthropic API key are not included in that sync.
                  You can delete agent conversations in Lectra, and account
                  deletion removes local and synced agent history associated
                  with that account.
                </p>
              </section>

              <section>
                <h2 id="lectra-projects-github-terminal-and-ssh">
                  Lectra Projects, GitHub, terminal, and SSH
                </h2>
                <p>
                  Lectra Projects is an optional local developer workspace
                  inside the app. Project files, terminal history, Git metadata,
                  and notebooks stay inside Lectra&rsquo;s app sandbox unless
                  you explicitly sync, export, or push them somewhere else.
                </p>
                <p>
                  If you connect GitHub, Lectra uses GitHub OAuth through the
                  shared Scope account system or a personal access token you
                  enter. The resulting GitHub token is stored in the iOS
                  Keychain and attached only to requests made to GitHub so you
                  can browse repositories, clone, pull, commit, and push. You
                  can disconnect GitHub from Lectra, and GitHub access is also
                  subject to GitHub&rsquo;s own terms and privacy policy.
                </p>
                <p>
                  If you use SSH in the terminal, you enter the host, username,
                  and credentials yourself. SSH passwords are used for the
                  connection attempt and are not stored by Lectra. Known-host
                  records are stored locally to warn if a host key changes. When
                  you connect to a local network host, iPadOS may ask for local
                  network permission; Lectra uses that access only for the
                  user-entered development host or local service.
                </p>
              </section>

              <section>
                <h2 id="sign-in-with-apple-icloud-google-drive-and-notifications">
                  Sign in with Apple, iCloud, Google Drive, and notifications
                </h2>
                <p>
                  <strong>Sign in with Apple.</strong> Lectra offers Sign in
                  with Apple and requests only your name and email. You may
                  choose to hide your email with Apple&rsquo;s private relay; we
                  never receive more than what you authorize during the Apple
                  sign-in flow.
                </p>
                <p>
                  <strong>iCloud.</strong> If you enable cloud sync or backup,
                  Lectra can store recovery snapshots of your documents in your
                  own private iCloud storage and can sync structured Lectra
                  Agent conversation history. This data lives in your personal
                  iCloud account under Apple&rsquo;s control; we do not
                  separately collect or read your iCloud backups. Anthropic API
                  keys and raw agent tool output are never included in iCloud
                  sync.
                </p>
                <p>
                  <strong>Google Drive backup.</strong> If you connect Google
                  Drive backup in Lectra, Lectra creates a folder in your own
                  Google Drive and uploads copies of your documents, notebooks,
                  and project files to it. Lectra uses Google&rsquo;s{" "}
                  <code>https://www.googleapis.com/auth/drive.file</code>{" "}
                  permission, which only allows access to files Lectra itself
                  creates — it cannot see, read, or change anything else in your
                  Drive. Uploads happen only while backup is connected;
                  disconnecting it stops them, and the folder and its contents
                  remain yours in your Drive. Google Drive backup is optional
                  and never required to use Lectra.
                </p>
                <p>
                  <strong>Push notifications.</strong> Lectra uses Apple Push
                  Notification service to know when new documents are waiting.
                  You can turn notifications off at any time in iOS Settings;
                  document delivery then falls back to checking when you open
                  the app.
                </p>
              </section>

              <section>
                <h2 id="tracking-and-app-tracking-transparency">
                  Tracking and App Tracking Transparency
                </h2>
                <p>
                  Lectra does <strong>not</strong> track you as Apple defines
                  tracking. We do not link your data with third-party data for
                  targeted advertising or advertising measurement, we do not
                  share your data with data brokers, and Lectra contains no
                  advertising identifier (IDFA) usage and no third-party
                  advertising or analytics SDKs. Because Lectra does not track
                  you, it does not present the App Tracking Transparency prompt.
                </p>
                <p>
                  The canvascope.org website uses Vercel Web Analytics and
                  Vercel Speed Insights: first-party page-view and performance
                  measurement served from this site, with no cookies, no
                  personal data, and no tracking across other sites.
                </p>
              </section>

              <section>
                <h2 id="deleting-your-account-from-within-lectra">
                  Deleting your account from within Lectra
                </h2>
                <p>
                  In line with Apple&rsquo;s account-deletion requirement,
                  Lectra lets you permanently delete your account directly in
                  the app from Account Settings. Account deletion removes your
                  account and the associated server-side data, then signs you
                  out and clears Lectra&rsquo;s on-device data for that account,
                  including its Anthropic key and local coding-agent history.
                  Synced coding-agent history in Lectra&rsquo;s private iCloud
                  container is also removed through the app&rsquo;s
                  account-deletion cleanup. You can also sign out to clear the
                  active session, or email us to request deletion, as described
                  next.
                </p>
              </section>

              <section>
                <h2 id="data-retention-and-deletion">
                  Data retention and deletion
                </h2>
                <p>
                  We retain your account and Google user data only for as long
                  as needed to provide the Service and fulfill the purposes
                  described in this policy, unless a longer retention period is
                  required or permitted by law. When the retention period
                  expires, or when data is no longer needed, we delete or
                  anonymize it.
                </p>
                <p>
                  You may sign out at any time to clear your active session. You
                  may also request access to, correction of, or deletion of your
                  personal data, including the Google user data, Google Calendar
                  tokens, and synced product data associated with your account,
                  by emailing us at{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Upon
                  a verified request, we will delete your account data within a
                  reasonable period, except where retention is required by law.
                  You can also revoke Scope&rsquo;s access to your Google
                  Account at any time from your{" "}
                  <a
                    href="https://myaccount.google.com/permissions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Account permissions page
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 id="changes-to-this-policy">Changes to this policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. If we
                  change how we use Google user data, we will update this page
                  and revise the &ldquo;Last updated&rdquo; date above, and
                  where appropriate we will notify you within the product. Your
                  continued use of the Service after changes take effect
                  constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 id="contact-us">Contact us</h2>
                <p>
                  For any questions, concerns, or requests regarding this
                  Privacy Policy or your data, contact Scope Inc. at{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
                </p>
              </section>
            </div>
            <LegalOutline items={outline} />
          </div>
        </div>
      </Sheet>
    </PageShell>
  );
}
