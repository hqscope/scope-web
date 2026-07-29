export type NewsroomTextBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type NewsroomArticle = {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  lede?: string;
  keywords: string[];
  body: NewsroomTextBlock[];
};

export const newsroomArticles: NewsroomArticle[] = [
  {
    slug: "introducing-the-lectra-document-format",
    title: "Introducing .lectra, a document you can actually hand to someone",
    date: "2026-07-21",
    category: "Engineering",
    description:
      "Lectra documents now save as .lectra packages: the reading, your handwriting, your notes, and where the document belongs in your library, all inside one file that opens in Files, AirDrops, and syncs through iCloud.",
    lede:
      "A document should be a thing you can hold, move, back up, and give to someone else. Ours finally is.",
    keywords: [
      "lectra file format",
      "lectra document",
      "portable coursework",
      "PDF annotation format",
      "student document workspace",
    ],
    body: [
      {
        type: "paragraph",
        text: "Until now, a Lectra document wasn't really one thing. The reading was a PDF in one place, your handwriting was somewhere else, your notes somewhere else again, and the parts that made it feel like yours, its title, the folder you filed it in, whether you'd starred it, weren't stored with the document at all. It worked, but it meant you couldn't hand a document to anyone, and you couldn't be certain you'd taken all of it with you when you backed it up.",
      },
      {
        type: "paragraph",
        text: "Documents now save as .lectra. Everything that makes a document a document lives inside it: the reading or notebook it's built on, every mark you've made on the page, your notes, its title, and where it sits in your library. Your iPad shows it as one document. So do Files, iCloud Drive, and AirDrop. You can send one to a classmate and it arrives whole, filed where it belongs, with your annotations still on the right words.",
      },
      {
        type: "paragraph",
        text: "The same format Lectra saves to is the one it shares, which is the part that matters most. There's no separate export that can quietly fall behind what the app actually stores. And because a .lectra carries its own title and filing, a library can be rebuilt from nothing but a folder of documents. Lose the app, reinstall it, drop the folder back in, and your library comes back the way you left it.",
      },
      {
        type: "paragraph",
        text: "A few things we cared about getting right. Reopening a document you already have asks whether you want to restore over your copy or keep both, instead of guessing. Annotations are tied to the content itself rather than to a file name, so renaming things never leaves your marks stranded. And a document checks itself when it opens: if a reading arrived damaged, Lectra says so rather than opening a broken page and letting you find out later.",
      },
      {
        type: "paragraph",
        text: "There's a deliberate seam inside every .lectra, between the material a document is built on and the layer you write on top of it. Right now that's just good hygiene: your work and the source are never the same thing, so neither can overwrite the other. It also happens to be the foundation for something we want to build, where an instructor hands out a package, updates it mid-semester, and your notes survive the update. That's not here yet. The format is ready for it.",
      },
    ],
  },
  {
    slug: "lectra-remote-desktop-reach-your-mac-from-your-ipad",
    title: "Lectra can now reach your Mac from your iPad, from anywhere",
    date: "2026-07-15",
    category: "Engineering",
    description:
      "Lectra added a Pro iPad-to-Mac remote desktop over WebRTC, with a companion Mac app, adaptive video quality, keyboard and pointer input, file transfer, and the ability to wake a sleeping Mac.",
    lede:
      "Sometimes the thing you need is just... on your Mac. Now you can reach it.",
    keywords: [
      "Lectra remote desktop",
      "iPad to Mac",
      "WebRTC",
      "remote access",
      "wake on LAN",
    ],
    body: [
      {
        type: "paragraph",
        text: "The workstation idea only really works if the iPad can reach the one machine that still has everything else on it: your Mac. So Lectra now includes a remote desktop. Pair it with a small companion Mac app, and your Mac's screen shows up live on your iPad, wherever you are, the full desktop and not a stripped-down mirror.",
      },
      {
        type: "paragraph",
        text: "Under the hood it works the way a video call does: a direct peer-to-peer connection carries the screen as live video, and the quality adapts on the fly to whatever your connection can handle, so it stays smooth instead of freezing. Your touches, keyboard, and typing travel back over the same connection, and you can move files across it too. If the Mac is asleep, Lectra can wake it first.",
      },
      {
        type: "paragraph",
        text: "The point isn't to replace your laptop. It's that the one file, the one app, the one thing stuck on your Mac stops being a reason to go find it. You read and annotate on the iPad, and when you need the real machine, it's a tap away.",
      },
    ],
  },
  {
    slug: "annotate-the-same-lectra-document-together-live",
    title: "You can now open the same Lectra document and annotate it together, live",
    date: "2026-07-12",
    category: "Product",
    description:
      "Lectra added real-time collaborative documents: two people can open the same PDF and watch each other's Apple Pencil ink appear as it's drawn, with each person's marks kept on their own layer.",
    lede:
      "Studying together shouldn't mean passing a PDF back and forth. Now you can just be in the same document.",
    keywords: [
      "Lectra collaboration",
      "real-time annotation",
      "shared documents",
      "study together",
      "Apple Pencil",
    ],
    body: [
      {
        type: "paragraph",
        text: "Group study, a shared problem set, a lab partner marking up the same reading. Until now that meant exporting, sending, and merging by hand. Lectra now lets two people open the same document and annotate it at the same time: your partner's Apple Pencil strokes appear on your page as they draw them, and yours on theirs.",
      },
      {
        type: "paragraph",
        text: "Making live ink feel instant without turning into a mess took some care. Apple Pencil reports well over a hundred points a second, so Lectra sends a steady, smoothed stream instead of flooding the connection. Each person's marks land on their own layer, so nobody overwrites anyone else's work, and every device converges on the same final page even when edits arrive out of order.",
      },
      {
        type: "paragraph",
        text: "It's also built to survive real life. You can keep annotating with no signal at all, and the moment you're back online your work syncs and catches up on anything you missed while you were away. Sharing is per-document, and if someone's access is removed their live session stops cleanly while their own local copy stays intact.",
      },
    ],
  },
  {
    slug: "lectras-coding-workspace-got-an-ai-agent-and-ssh",
    title: "Lectra's coding workspace got an AI agent and real SSH",
    date: "2026-07-09",
    category: "Engineering",
    description:
      "Lectra's on-iPad coding workspace added a coding agent that plans and edits with your approval, and a real SSH terminal for connecting to other machines.",
    lede:
      "The terminal, git, and Python were the foundation. This is what you can do on top of them now.",
    keywords: [
      "Lectra coding agent",
      "AI coding on iPad",
      "SSH terminal",
      "iPad IDE",
      "student coding",
    ],
    body: [
      {
        type: "paragraph",
        text: "Once Lectra had a real shell, real git, and real Python running on the iPad, the next question was what you build on top of them. Two things landed. The first is a coding agent: you describe what you want, and it reads your files, proposes edits, and runs your project's tests, working through the task a step at a time, showing every file change and command for your approval before anything happens, and refusing anything risky.",
      },
      {
        type: "paragraph",
        text: "It follows a deliberate rhythm instead of free-forming: write down the spec, break it into a checklist, do one item at a time, review the result, and only then commit, the same disciplined loop a careful engineer would use, kept in plain files you can read and edit yourself. It never pushes to GitHub unless you ask.",
      },
      {
        type: "paragraph",
        text: "The second addition is real SSH. The built-in terminal can now connect to another machine, a lab server or your own computer, and behaves like a genuine terminal, colors, full-screen programs and all, so the tools you'd run at a desk run from the iPad too. Between the agent and SSH, the iPad stops being a place you only read code and becomes a place you can actually work on it.",
      },
    ],
  },
  {
    slug: "lectra-notes-is-now-on-the-app-store",
    title: "Lectra Notes is now on the App Store",
    date: "2026-07-02",
    category: "Release",
    description:
      "Lectra Notes is live on the Apple App Store as a free iPhone and iPad app for private PDF study, annotation, organization, and Canvascope handoff.",
    lede:
      "Lectra is no longer just the iPad companion we were preparing for review. It's a real App Store app now.",
    keywords: [
      "Lectra Notes",
      "App Store",
      "Apple Pencil PDF annotation",
      "private PDF study",
      "Canvascope handoff",
    ],
    body: [
      {
        type: "paragraph",
        text: "Lectra Notes is live on the App Store as a free download for iPhone and iPad. The first public build focuses on the core student document loop: import a PDF, organize the library, read and mark up the page, and keep the work tied to the Canvascope flow when the file started in the browser.",
      },
      {
        type: "paragraph",
        text: "The product is intentionally first-party at launch. Lectra centers on documents, Apple Pencil annotation, backup and sync, private on-device intelligence where supported, and the handoff path with Canvascope. The older pre-release third-party experiments were removed from the shipping surface so the App Store version stays understandable and reviewable.",
      },
      {
        type: "paragraph",
        text: "This also changes the public Canvascope workflow. Students can now install Canvascope on Chrome, download Lectra Notes from the App Store, send readings to the Apple device, annotate them, and bring finished PDFs back into supported browser upload flows without treating downloads and file names as the workflow.",
      },
    ],
  },
  {
    slug: "canvascope-can-now-take-action-safely",
    title: "Canvascope can now take action, and it's built so it can't do your work for you",
    date: "2026-06-25",
    category: "Engineering",
    description:
      "Canvascope added a multi-step AI agent that reads course context, deadlines, grades, and calendar and creates study aids, while being unable to submit graded work.",
    lede:
      "For a long time the assistant could answer questions about your courses. Now it can take the next steps too, safely.",
    keywords: [
      "Canvascope agent",
      "AI study agent",
      "tool-using AI",
      "daily briefing",
      "academic integrity",
    ],
    body: [
      {
        type: "paragraph",
        text: "Until now, every action was still on you. Canvascope could read your courses and answer with citations, but you were the one who had to make the to-do, add the calendar event, or turn a pile of deadlines into a plan. The new agent closes that gap. Ask it something like \"help me get ready for my biochem class this week,\" and it can check your calendar, look up what's due, search your own course materials, and turn that into a study plan, to-dos, or calendar events.",
      },
      {
        type: "paragraph",
        text: "The difference is that it now works in steps instead of one shot. It decides what it needs, uses a tool to get it, looks at the result, and decides what to do next, a few times over, until it actually has an answer. And you can watch it happen: Checking your calendar, Looking up deadlines, Drafting a plan, each step ticking from in-progress to done, right in the side panel.",
      },
      {
        type: "paragraph",
        text: "What it's allowed to do is deliberately small. It can read your active page, your indexed course materials, upcoming deadlines, grades, and your calendar, and it can create study aids: a to-do, a calendar event, a study plan. That's the entire list.",
      },
      {
        type: "paragraph",
        text: "The part we care about most: it cannot submit your work. There is no button for it to press. That capability simply doesn't exist in the agent. On top of that, anything that creates something runs through a check that blocks work which looks like turning in a graded assignment, every action it takes is logged, anything it does can be undone, and a single switch pauses it completely. It stays inside the extension and only reaches out when a task needs it.",
      },
      {
        type: "paragraph",
        text: "It also checks in once a day, when you want it to, with a short briefing of what's coming up, so the first thing you see is a head start instead of a blank search box. This is the first step toward an assistant that doesn't just tell you what to do, but helps you get going, while keeping the one line that matters: it helps you learn, it never does the graded work for you.",
      },
    ],
  },
  {
    slug: "lectra-runs-a-real-terminal-git-and-python-on-ipad",
    title: "Lectra runs a real terminal, git, and Python on the iPad now",
    date: "2026-06-24",
    category: "Engineering",
    description:
      "Lectra gained a Projects workspace on iPad: a from-scratch POSIX shell, real git over authenticated HTTPS, and an embedded Python runtime, all sharing one sandboxed filesystem.",
    lede:
      "Notebooks got code into Lectra. This is about giving that code somewhere to actually live.",
    keywords: [
      "Lectra Projects",
      "iPad terminal",
      "isomorphic-git",
      "Python on iPad",
      "student coding workspace",
    ],
    body: [
      {
        type: "paragraph",
        text: "A lot of student work these days is just a repo. A data science project, a problem set that's really a few scripts, a lab notebook that you'd like to have version history for. So Lectra got a full Projects workspace, the idea being that this work can sit on the iPad instead of bouncing between a laptop and some cloud IDE. You can clone a GitHub repo, edit files right next to your PDFs and notebooks, run Python, and commit and push, all without leaving the app.",
      },
      {
        type: "paragraph",
        text: "I want to be clear this isn't a dressed-up text box. iOS gives you no fork/exec, so the terminal is a POSIX-style shell I wrote from scratch: a real lexer, parser, pipelines, redirection, globbing, and around two dozen built-in commands, all operating on the app's own files. Git is the genuine article too. isomorphic-git runs in a hidden web layer with its filesystem and network bridged down to native Swift, which means clone, commit, pull, and push are really talking to GitHub over authenticated HTTPS. Python runs through an embedded runtime, so python script.py does the thing you'd expect it to.",
      },
      {
        type: "paragraph",
        text: "The detail I'm proudest of is that all of it shares one sandboxed filesystem. The terminal, the editor, and git are looking at the exact same files, so git status shows precisely what the editor just saved. No hidden copies, no sync step in between. Every path stays inside the app's sandbox, and your GitHub token only ever gets attached to requests going to GitHub.",
      },
      {
        type: "paragraph",
        text: "There's also a one-tap Sync. It stages your latest edits, commits, pulls, and pushes in a single pass, so the thing you do constantly, save my work back to GitHub, is one button rather than five commands. Same thing I was going for with notebooks: if code shows up in your coursework, it should feel like part of the workspace, not the reason you have to go find your laptop.",
      },
    ],
  },
  {
    slug: "python-notebooks-are-first-class-lectra-documents",
    title: "Python notebooks are first-class Lectra documents now",
    date: "2026-06-23",
    category: "Product",
    description:
      "Lectra added native .ipynb support: create, edit, and run Python notebooks with persistent state right alongside PDFs, notes, and whiteboards in the same library.",
    lede:
      "Lectra started with PDFs. The problem is that almost no class actually fits in one file format.",
    keywords: [
      "Lectra notebooks",
      "ipynb support",
      "Python notebook iPad",
      "student data science",
      "document workspace",
    ],
    body: [
      {
        type: "paragraph",
        text: "Think about a data science assignment: there's the problem set PDF, a couple of markdown notes, and a short Python analysis. Or a biology lab, with a protocol, an annotated paper, and some quick calculation off to the side. In practice all of those pieces end up scattered across a PDF editor, a notebook site, a notes app, and wherever your file manager dumped the download.",
      },
      {
        type: "paragraph",
        text: "Native .ipynb support is my attempt to pull that back into one place. You can create a Python notebook from the same +New menu you already use for notebooks, whiteboards, folders, and PDF imports, and it lands in the current folder right next to the rest of the assignment, not off in some separate developer corner of the app.",
      },
      {
        type: "paragraph",
        text: "And it's a working notebook, not a preview. Lectra edits code and markdown cells, runs Python, captures the output, and holds state between cells. I'm not trying to turn the iPad into a desktop IDE. I just want the small bits of code that show up in actual coursework to feel like they belong with the reading and the annotation and the notes.",
      },
      {
        type: "paragraph",
        text: "The editor details are where a notebook either feels real or feels fake, so those got attention too: Python syntax highlighting, auto-indent after a colon, keyboard shortcuts for running cells and moving between them. Little things, but they're what keep it from feeling like a text box pretending to be a notebook.",
      },
      {
        type: "paragraph",
        text: "It's not finished. Notebook thumbnails still need their own look, deleting a notebook should clean up the files underneath it, and there's more to add. But the base is there now, and that's what I was after: PDFs, notes, whiteboards, folders, imports, and Python notebooks all sitting in one Lectra library.",
      },
    ],
  },
  {
    slug: "lectra-pdfs-can-now-come-back-into-browser-workflows",
    title: "Lectra PDFs can now come back into browser workflows",
    date: "2026-06-21",
    category: "Product",
    description:
      "Canvascope 10.1 adds an Attach from Lectra picker that can bring finished Lectra PDFs back into supported browser upload flows.",
    lede: "Canvascope 10.1 turned the Lectra handoff into a two-way workflow.",
    keywords: [
      "Canvascope 10.1",
      "Lectra PDF handoff",
      "Attach from Lectra",
      "Gradescope upload",
      "student workflow",
    ],
    body: [
      {
        type: "paragraph",
        text: "Canvascope can now surface a Select from Lectra picker inside supported browser upload flows. The picker loads a student's Lectra library through the extension background worker, shows searchable document rows, renders PDF thumbnails without breaking strict page security rules, and fills the page's file input with the finished PDF.",
      },
      {
        type: "paragraph",
        text: "The first consumer is Gradescope's upload modal, but the important part is the generic layer underneath it. Attach from Lectra is page-agnostic, so future assignment upload flows can use the same document picker instead of rebuilding the bridge one page at a time.",
      },
      {
        type: "paragraph",
        text: "Lectra also got release-build polish on the same day: cleaner export names, editor and library fixes, Xcode Cloud setup, shared scheme work, and cleanup around accidental dependency tracking. The goal is simple: annotate on iPad, then bring the finished file back to the browser without hunting through downloads.",
      },
    ],
  },
  {
    slug: "lectra-moved-into-app-store-release-shape",
    title: "Lectra moved into App Store release shape",
    date: "2026-06-20",
    category: "Release",
    description:
      "Lectra narrowed around first-party document import, organization, Apple Pencil annotation, on-device intelligence, backup, and Canvascope handoff before App Store submission.",
    lede:
      "Lectra became a tighter first-party app instead of a bundle of every experiment we had built.",
    keywords: [
      "Lectra App Store",
      "Apple Pencil PDF annotation",
      "document import",
      "on-device intelligence",
      "Canvascope handoff",
    ],
    body: [
      {
        type: "paragraph",
        text: "The iPad app now focuses on the core Lectra workflow: import documents, organize them, annotate with Apple Pencil, use private on-device intelligence, back up the library, and hand finished work back to Canvascope. That meant removing the pre-release Course Brain, Canvas course import, and Gradescope submission surfaces from the iPad target because those flows depended on third-party service access that is not ready for release.",
      },
      {
        type: "paragraph",
        text: "We kept the user's documents safe while narrowing the product. Legacy third-party traces are now cleanup and migration code only, with old imported files moved into neutral local folders instead of powering hidden integrations.",
      },
      {
        type: "paragraph",
        text: "This pass also added the App Store-facing pieces that matter before submission: privacy manifests for the app and share extension, account deletion support, App Review notes, refreshed app assets, and tests around the Documents-only release surface.",
      },
    ],
  },
  {
    slug: "lectra-gained-on-device-intelligence-and-shortcuts-hooks",
    title: "Lectra gained on-device intelligence and Shortcuts hooks",
    date: "2026-06-19",
    category: "Product",
    description:
      "Lectra added document summaries, tags, flashcards, practice quizzes, grounded Q&A, and App Intents built around Apple's Foundation Models path.",
    keywords: [
      "Lectra on-device AI",
      "Apple Foundation Models",
      "Shortcuts",
      "Siri",
      "study aids",
    ],
    body: [
      {
        type: "paragraph",
        text: "Lectra's intelligence layer moved onto the iPad. The app gained document summaries, auto-generated tags, flashcards, practice quizzes, and grounded document Q&A built around Apple's Foundation Models path.",
      },
      {
        type: "paragraph",
        text: "We also added App Intents for the workflows students should be able to trigger quickly: open a document, summarize a document, and generate study aids. Those intents make Lectra visible to Shortcuts and Siri instead of keeping every workflow trapped inside the app UI.",
      },
      {
        type: "paragraph",
        text: "The same work strengthened the Canvascope bridge. Export to Canvascope now waits for a real upload receipt, tracks terminal delivery states, and shows clear feedback when the desktop extension downloads, cancels, or needs to be opened. DropBridge is becoming a visible delivery system, not just a background upload.",
      },
    ],
  },
  {
    slug: "on-device-ai-comes-to-canvascope",
    title: "On-device AI comes to Canvascope",
    date: "2026-06-16",
    category: "Engineering",
    description:
      "Canvascope is integrating Chrome's built-in Gemini Nano model with retrieval across course PDFs, assignments, and Canvas content for cited course-aware AI.",
    lede:
      "Most AI study tools stop working the moment your connection gets spotty. We wanted Canvascope to work differently.",
    keywords: [
      "on-device AI",
      "Gemini Nano",
      "Canvas AI",
      "course citations",
      "local-first AI",
    ],
    body: [
      {
        type: "paragraph",
        text: "We've been integrating support for Chrome's built-in Gemini Nano model, which lets certain AI workflows run directly on your device instead of going to the cloud. Paired with retrieval-augmented generation across your course PDFs, assignments, and Canvas content, Canvascope can give answers that are grounded in your own materials with citations back to the original source.",
      },
      {
        type: "paragraph",
        text: "In practice, that means:",
      },
      {
        type: "list",
        items: [
          "AI that actually understands your courses, not just general knowledge",
          "Lower latency for supported on-device features",
          "More privacy, since some tasks never leave your device",
          "Some features that keep working even without internet",
        ],
      },
      {
        type: "paragraph",
        text: "We're excited about a future where educational AI isn't just more powerful. It's faster, more private, and built around a student's own knowledge.",
      },
    ],
  },
  {
    slug: "dropbridge-v2-handoff-between-lectra-and-canvascope-is-nearly-instant",
    title: "DropBridge v2: the handoff between Lectra and Canvascope is now nearly instant",
    date: "2026-06-14",
    category: "Engineering",
    description:
      "DropBridge v2 made the Lectra-to-Canvascope file workflow feel immediate with account-linked receive, delivery confirmation, and smarter prefetching.",
    keywords: [
      "DropBridge v2",
      "Lectra handoff",
      "Canvascope file transfer",
      "PDF delivery",
      "iPad annotation",
    ],
    body: [
      {
        type: "paragraph",
        text: "We rebuilt the way files move between Lectra on iPad and Canvascope on desktop, and it's one of the pieces of this whole project we're most proud of.",
      },
      {
        type: "paragraph",
        text: "With DropBridge v2, sending a PDF from your iPad to your desktop feels immediate. There's no manual pairing. Sign in once and the Canvascope extension auto-receives files. You get clear delivery confirmation, so your iPad knows the moment the desktop has finished downloading. Smarter prefetching loads PDFs in parallel on wake, so your library is ready before you reach for it.",
      },
      {
        type: "paragraph",
        text: "What used to feel like a handoff now feels like one connected workspace.",
      },
      {
        type: "paragraph",
        text: "Lectra Notes is now live on the App Store as the Apple-device side of this workflow. Its intelligence layer is built around Apple's on-device Foundation Models where supported, so students can summarize PDFs, ask questions, and generate flashcards and quizzes without turning private coursework into an advertising or analytics pipeline.",
      },
    ],
  },
  {
    slug: "dropbridge-got-safer-production-routing",
    title: "DropBridge got safer production routing",
    date: "2026-06-14",
    category: "Engineering",
    description:
      "Canvascope reconciled production Supabase migration history and added sender device routing so DropBridge can avoid duplicate or misdirected pickups.",
    keywords: [
      "DropBridge production routing",
      "Supabase migrations",
      "sender device id",
      "PDF delivery receipts",
      "Canvascope backend",
    ],
    body: [
      {
        type: "paragraph",
        text: "We repaired the DropBridge backend history before adding new delivery behavior. Ten production migrations were reconstructed from the remote migration table so local development matched the real Supabase project again.",
      },
      {
        type: "paragraph",
        text: "With history reconciled, we added sender_device_id to uploads. That gives DropBridge a clean way to distinguish the device sending a file from the device meant to receive it, which matters for instant delivery confirmation and for avoiding duplicate or misdirected pickups.",
      },
      {
        type: "paragraph",
        text: "It is backend plumbing, but it protects the thing students actually feel: a PDF leaves Lectra, wakes Canvascope, downloads on the right computer, and reports back without guesswork.",
      },
    ],
  },
  {
    slug: "student-profiles-ai-that-doesnt-treat-every-student-the-same",
    title: "Student Profiles: AI that doesn't treat every student the same",
    date: "2026-06-13",
    category: "Product",
    description:
      "Canvascope Student Profiles let AI features adapt to a student's major, academic goals, and study style while keeping profile data editable and deletable.",
    keywords: [
      "Student Profiles",
      "personalized AI study",
      "Smart Planner",
      "Course Brain",
      "student productivity",
    ],
    body: [
      {
        type: "paragraph",
        text: "Canvascope already understood your courses: lectures, PDFs, assignments, deadlines, and study schedules. What it didn't understand was the student behind them. Student Profiles close that gap.",
      },
      {
        type: "paragraph",
        text: "Canvascope now adapts to your major, your academic goals, and how you like to learn, across every AI feature. Course Brain can explain the same concept differently for a pre-med biology student than for a CS major. Smart Planner can build schedules around your real course load. Chat can tailor help to the way you actually study.",
      },
      {
        type: "paragraph",
        text: "We built it around two principles. Privacy first: profiles are editable, deletable, and fully under the student's control. Efficient by design: personalization is handled separately from course context, which preserves prompt caching and keeps costs down without sacrificing quality.",
      },
      {
        type: "paragraph",
        text: "There's a lot more to build here, but it's a big step toward making AI feel less generic and more personal.",
      },
    ],
  },
  {
    slug: "canvascope-added-real-account-event-protection",
    title: "Canvascope added real account-event protection",
    date: "2026-06-13",
    category: "Security",
    description:
      "Canvascope added Google Cross-Account Protection with RISC validation, event deduplication, Supabase user mapping, session revocation, and sign-in blocks.",
    keywords: [
      "Google Cross-Account Protection",
      "RISC",
      "Canvascope security",
      "Supabase sessions",
      "account protection",
    ],
    body: [
      {
        type: "paragraph",
        text: "Canvascope added Cross-Account Protection through Google's RISC security event stream. When Google reports a high-risk account event, Canvascope can validate the signed event, dedupe it, map it to the matching Supabase user, and revoke active sessions.",
      },
      {
        type: "paragraph",
        text: "Account-disabled events also set a sign-in block that the Supabase custom access token hook enforces on both sign-in and token refresh. If the account is later re-enabled, the block can be cleared. The hook is intentionally fail-open so an internal error cannot lock out the whole user base.",
      },
      {
        type: "paragraph",
        text: "This is not flashy UI, but it is the kind of infrastructure a student workspace needs before it handles more files, identity, and device-to-device workflow.",
      },
    ],
  },
  {
    slug: "canvascope-v10-connected-ai-planning-and-dropbridge",
    title: "Canvascope v10 connected AI, planning, and DropBridge",
    date: "2026-06-11",
    category: "Engineering",
    description:
      "Canvascope v10 connected its AI side panel, RAG retrieval, Smart Planner, and DropBridge v3 delivery infrastructure into one extension architecture.",
    lede: "Canvascope v10 turned several separate experiments into one extension architecture.",
    keywords: [
      "Canvascope v10",
      "Smart Planner",
      "DropBridge v3",
      "RAG",
      "Canvas extension AI",
    ],
    body: [
      {
        type: "paragraph",
        text: "The AI side panel moved onto a shared route that can use Chrome's on-device model when it is available and fall back through Supabase when needed. The RAG layer can read the active LMS page, parse PDFs, pull stored assignments and notes, and keep retrieval grounded enough that answers stay attached to real course material.",
      },
      {
        type: "paragraph",
        text: "Smart Planner also became a real surface. It reads upcoming deadlines, drafts study blocks, and turns approved blocks into saved to-dos, reminders, or calendar events. That work came out of the syllabus autopilot prototype and made planning part of the same assistant instead of a separate command.",
      },
      {
        type: "paragraph",
        text: "DropBridge v3 landed in the same release line with realtime receipts, heartbeat updates, hot-path indexes, targeted upload claims, and fallback polling. The point was not just speed; it was making Lectra-to-Canvascope delivery observable enough to debug when a file does not arrive.",
      },
    ],
  },
  {
    slug: "syllabus-autopilot-became-the-planner-prototype",
    title: "Syllabus autopilot became the planner prototype",
    date: "2026-06-09",
    category: "Product",
    description:
      "Canvascope started turning course deadlines into editable study plans that connect search, to-dos, calendar events, and reminders.",
    keywords: [
      "syllabus autopilot",
      "Smart Planner",
      "study plans",
      "course deadlines",
      "student calendar",
    ],
    body: [
      {
        type: "paragraph",
        text: "Canvascope started turning course deadlines into actual study plans. The syllabus autopilot work taught the extension to read academic structure, split deadlines into useful work blocks, and prepare those blocks for the same to-do, calendar, and reminder systems students already use.",
      },
      {
        type: "paragraph",
        text: "This was the bridge between search and planning. Instead of only finding the syllabus or listing due dates, Canvascope began asking what the student should do next and drafting the work into something editable.",
      },
      {
        type: "paragraph",
        text: "That prototype became the foundation for Smart Planner in v10.",
      },
    ],
  },
  {
    slug: "v8-made-the-side-panel-a-real-ai-workspace",
    title: "v8 made the side panel a real AI workspace",
    date: "2026-05-28",
    category: "Engineering",
    description:
      "Canvascope v8 pulled together local document parsing, active-page context, semantic matching, streaming fixes, and a dedicated chat surface beside the LMS.",
    keywords: [
      "Canvascope v8",
      "AI side panel",
      "local document parsing",
      "semantic matching",
      "course context",
    ],
    body: [
      {
        type: "paragraph",
        text: "The Canvascope side panel became more than a place to type a prompt. The v8 work pulled together local document parsing, active-page context, semantic matching, streaming fixes, and a dedicated chat surface that could sit beside a student's LMS instead of replacing it.",
      },
      {
        type: "paragraph",
        text: "The important change was context. Canvascope could start answering with awareness of the page, the student's indexed materials, and the course artifacts already stored locally. That set up the later v10 work where AI, planning, profiles, and citations share one path.",
      },
    ],
  },
  {
    slug: "canvascope-7-turning-canvas-into-a-real-student-workspace",
    title: "Canvascope 7.0.0: turning Canvas into a real student workspace",
    date: "2026-05-24",
    category: "Product",
    description:
      "Canvascope 7 introduced Zen Mode, theme switching, slash commands, quick notes, custom to-dos, GPA tools, and faster shortcuts inside Canvas.",
    lede:
      "What started as a way to search Canvas faster started becoming a full productivity layer for students.",
    keywords: [
      "Canvascope 7",
      "Zen Mode",
      "Canvas productivity",
      "slash commands",
      "student workspace",
    ],
    body: [
      {
        type: "paragraph",
        text: "The headline feature was Zen Mode. Type /zen inside Canvas and you open a full focus space built right into your school workflow:",
      },
      {
        type: "list",
        items: [
          "A built-in Pomodoro timer",
          "A current goal pulled from your to-do list",
          "Up-next task tracking",
          "Breathing animations for focus breaks",
          "Optional soundscapes like brown noise and binaural beats",
          "Work and break presets designed for deep study sessions",
        ],
      },
      {
        type: "paragraph",
        text: "Canvas is already where students check assignments, grades, files, and deadlines. Zen Mode brings the actual studying into that same place.",
      },
      {
        type: "paragraph",
        text: "We also introduced Themes. You can now customize how Canvas looks and feels, starting with Paper, a warmer, cleaner theme that makes Canvas feel less harsh. Also in this release: a new slash-command menu, theme switching inside Canvas, GPA and grade tools, quick notes and notebook browsing, custom to-dos, sync tools, and faster shortcuts for pinned items, dashboards, courses, and due dates.",
      },
    ],
  },
  {
    slug: "when-canvas-went-down-at-berkeley-your-materials-didnt-have-to",
    title: "When Canvas went down at Berkeley, your materials didn't have to",
    date: "2026-05-21",
    category: "Notes",
    description:
      "A UC Berkeley Canvas outage showed why students need previously indexed assignments, files, modules, pages, and announcements available when LMS systems fail.",
    keywords: [
      "Canvas outage",
      "Berkeley bCourses",
      "offline coursework",
      "LMS reliability",
      "local-first search",
    ],
    body: [
      {
        type: "paragraph",
        text: "This week's Canvas outage at UC Berkeley was a reminder of how fragile student workflows can be during finals. When bCourses went down following a cybersecurity incident, a lot of students suddenly lost access to assignments, lecture files, and course materials at the worst possible moment.",
      },
      {
        type: "paragraph",
        text: "One of the reasons I started building Canvascope was frustration with how dependent students are on digging through LMS pages just to find basic content. Over the past few months I'd been building systems to import and index materials directly from my courses, so I could search across assignments, files, modules, pages, and announcements from one place. During the outage, those indexed materials were still there.",
      },
      {
        type: "paragraph",
        text: "It reinforced something I keep coming back to: current LMS platforms are designed around how instructors upload content, not around how students actually learn and work. Canvascope started as a better way to search Canvas. We're building toward something bigger: a student-centered workspace, and eventually a student-first LMS. The best tools don't just work when systems are online; they help people keep working when systems fail.",
      },
    ],
  },
  {
    slug: "reliability-is-the-feature",
    title: "Reliability is the feature",
    date: "2026-05-19",
    category: "Notes",
    description:
      "Canvascope kept previously indexed content and synced Lectra files accessible during an LMS outage, reinforcing local-first reliability as a product feature.",
    keywords: [
      "Canvas reliability",
      "offline LMS search",
      "Lectra synced files",
      "finals prep",
      "coursework access",
    ],
    body: [
      {
        type: "paragraph",
        text: "Canvas going down during finals prep is close to a nightmare scenario. Students lose access to the exact materials they need most, at the exact worst time.",
      },
      {
        type: "paragraph",
        text: "During this outage, Canvascope kept working for any previously indexed content, and any files already synced into Lectra stayed accessible. That's the whole idea we're building toward: students should be able to reach their coursework even when the systems they depend on fail.",
      },
    ],
  },
  {
    slug: "canvascope-doesnt-just-search-anymore-it-predicts",
    title: "Canvascope doesn't just search anymore. It predicts.",
    date: "2026-04-21",
    category: "Product",
    description:
      "Canvascope began anticipating likely coursework based on routines, time of week, and course patterns so students can work with less searching.",
    keywords: [
      "predictive search",
      "Canvascope search",
      "course routines",
      "student workflow",
      "Canvas productivity",
    ],
    body: [
      {
        type: "paragraph",
        text: "Students don't search randomly. We follow routines. Every Friday I'm working on the same lab.",
      },
      {
        type: "paragraph",
        text: "So we taught Canvascope to anticipate. When you open it now, it suggests what you're probably looking for based on patterns like the time of week and your coursework. For me, that Friday lab is already there before I type a single character.",
      },
      {
        type: "paragraph",
        text: "No digging through modules. No clicking through tabs. No trying to remember where one file is buried. Just open, and it's there. This is the direction I care about most: tools that don't only respond to input, but anticipate it. Less searching, more doing.",
      },
    ],
  },
  {
    slug: "a-class-glitch-and-a-quiet-save",
    title: "A class glitch, and a quiet save",
    date: "2026-04-18",
    category: "Notes",
    description:
      "When Canvas Pages stopped working for a course, Canvascope's local index still made the course materials searchable.",
    keywords: [
      "Canvas Pages",
      "local index",
      "course search",
      "LMS outage",
      "Canvascope reliability",
    ],
    body: [
      {
        type: "paragraph",
        text: "There was a glitch in one of my classes this week. Canvas Pages for the course stopped working, and key materials were basically inaccessible while the instructors worked on a fix.",
      },
      {
        type: "paragraph",
        text: "Normally that's game over. But Canvascope had already indexed the course, so I just searched, and everything was still there. No stress, no waiting. Most tools only work when everything works. The best ones work when things break.",
      },
    ],
  },
  {
    slug: "canvas-to-ipad-to-annotated-to-back-to-work-in-seconds",
    title: "Canvas to iPad to annotated to back to work, in seconds",
    date: "2026-04-16",
    category: "Product",
    description:
      "Canvascope and Lectra connect finding a Canvas file, sending it to iPad, annotating it, and returning to work through a controlled file handoff.",
    keywords: [
      "Canvas to iPad",
      "PDF annotation workflow",
      "Lectra handoff",
      "Canvascope PDFs",
      "student annotation",
    ],
    body: [
      {
        type: "paragraph",
        text: "I just shipped a feature I've wanted for a long time: find a file in Canvas, send it to your iPad, annotate it, and drop it right back into your workflow.",
      },
      {
        type: "paragraph",
        text: "Under the hood it's a secure file handoff with real-time sync, and it's fully user-controlled. Nothing happens unless you click. But the tech isn't the point. The point is going from finding to opening to annotating in seconds. That's the difference between a tool and a workflow.",
      },
    ],
  },
  {
    slug: "wait-how-are-you-getting-that",
    title: "Wait... how are you getting that?",
    date: "2026-04-14",
    category: "Notes",
    description:
      "A broken Canvas course page showed how a local Canvascope index can make coursework available when classmates cannot reach the LMS page.",
    keywords: [
      "Canvas page failure",
      "Canvascope local search",
      "course materials",
      "LMS reliability",
      "student workflow",
    ],
    body: [
      {
        type: "paragraph",
        text: "Today in class, a course Canvas page stopped working and everyone around me started stressing. I wasn't. Canvascope had already indexed the course, so I just searched and everything was still there.",
      },
      {
        type: "paragraph",
        text: "The person next to me looked over: Wait... how are you getting that? That's when it clicked for me. Most tools only work when everything is working. The best ones work when things break. If Canvas has ever failed you at the worst possible time, you already know the feeling.",
      },
    ],
  },
  {
    slug: "from-seven-steps-to-one",
    title: "From seven steps to one",
    date: "2026-04-11",
    category: "Product",
    description:
      "Canvascope reduces repeated Canvas navigation and PDF handoff friction so students can open a file and send it to iPad in one flow.",
    keywords: [
      "Canvas workflow",
      "PDF to iPad",
      "Canvascope productivity",
      "Lectra",
      "student files",
    ],
    body: [
      {
        type: "paragraph",
        text: "Most students lose hours every week just navigating Canvas: click, module, scroll, wrong file, repeat. We cut that down to a single step.",
      },
      {
        type: "paragraph",
        text: "And with the latest update, sending a file to your iPad is essentially instant. No emailing yourself PDFs, no AirDrop juggling. Just click, and it's there. That's the bar now.",
      },
    ],
  },
  {
    slug: "biggest-update-yet-from-extension-to-full-workflow-platform",
    title: "The biggest update yet: from extension to full workflow platform",
    date: "2026-04-09",
    category: "Product",
    description:
      "Canvascope expanded from a Canvas search extension into a student workflow platform spanning PDFs, Lectra, web workspace, Brightspace, and local-first privacy.",
    keywords: [
      "Canvascope workflow platform",
      "Brightspace support",
      "D2L support",
      "Lectra PDF viewer",
      "web workspace",
    ],
    body: [
      {
        type: "paragraph",
        text: "Three months before this update, Canvascope was a Chrome extension that helped you search Canvas faster. It started becoming a full student workflow platform with several major pieces:",
      },
      {
        type: "list",
        items: [
          "Lectra PDF Viewer Overlay: open, view, and annotate PDFs directly in your browser.",
          "Lectra for iPad: Apple Pencil-native annotation built specifically for coursework.",
          "DropBridge: send a PDF from Canvascope to Lectra, annotate it, and send it back through one account-linked pipeline.",
          "Full web workspace: courses, assignments, documents, and deadlines in one dashboard.",
          "Brightspace and D2L support: the same search and workflow experience beyond Canvas.",
          "Privacy-first by default: data stays local unless the student chooses a connected feature.",
        ],
      },
    ],
  },
  {
    slug: "canvas-was-built-for-institutions-were-building-for-students",
    title: "Canvas was built for institutions. We're building for students.",
    date: "2026-04-07",
    category: "Notes",
    description:
      "Canvascope and Lectra are built around how students search, study, and take notes instead of how LMS platforms organize administration.",
    keywords: [
      "student-first LMS",
      "Canvas search",
      "student tools",
      "Lectra",
      "Canvascope",
    ],
    body: [
      {
        type: "paragraph",
        text: "Most LMS platforms are built for administration, and it shows: search is bad, navigation is slow, everything feels fragmented.",
      },
      {
        type: "paragraph",
        text: "We're flipping that. Lectra and Canvascope are built around how students actually study, actually search, and actually take notes. The goal isn't a better tool. It's a better system. And this is just the beginning.",
      },
    ],
  },
  {
    slug: "search-by-intent-not-by-keyword",
    title: "Search by intent, not by keyword",
    date: "2026-04-04",
    category: "Product",
    description:
      "Canvascope helps students search by what they mean, not just exact file names, then send relevant PDFs to iPad when annotation matters.",
    keywords: [
      "intent search",
      "Canvas search",
      "student file search",
      "Lectra handoff",
      "Canvascope extension",
    ],
    body: [
      {
        type: "paragraph",
        text: "Ever spent ten minutes hunting for one file on Canvas? Same. So we built something better.",
      },
      {
        type: "paragraph",
        text: "With this update, you can search your entire course instantly and find what you meant, not just exact keywords, then send any PDF to your iPad in one click. No digging, no guessing, no friction. Once you use it, it feels obvious.",
      },
    ],
  },
  {
    slug: "were-not-building-a-faster-airdrop",
    title: "We're not building a faster AirDrop",
    date: "2026-03-21",
    category: "Notes",
    description:
      "Canvascope plus Lectra is positioned as a coursework workflow, not generic file sharing, because it preserves the step from finding material to using it.",
    keywords: [
      "AirDrop alternative",
      "student PDF workflow",
      "Canvascope Lectra",
      "coursework handoff",
      "iPad annotation",
    ],
    body: [
      {
        type: "paragraph",
        text: "AirDrop moves files. What we're building between Canvascope and Lectra moves students straight into work.",
      },
      {
        type: "paragraph",
        text: "If AirDrop already works, why switch? Because this isn't about sending a PDF faster. It's about removing the friction between finding class material and actually using it. A student can find what they need in Canvascope and open it in Lectra right away to read, highlight, and annotate without breaking focus. AirDrop is general-purpose file sharing. Canvascope plus Lectra is a workflow built for students.",
      },
    ],
  },
  {
    slug: "tune-your-own-search",
    title: "Tune your own search",
    date: "2026-03-19",
    category: "Product",
    description:
      "Canvascope added a Custom Algorithm setting so students can tune ranking around due dates, course context, or file types.",
    keywords: [
      "custom search algorithm",
      "Canvascope search settings",
      "course context",
      "due dates",
      "file type ranking",
    ],
    body: [
      {
        type: "paragraph",
        text: "Search shouldn't be one-size-fits-all. Every student organizes their courses differently.",
      },
      {
        type: "paragraph",
        text: "So we added a Custom Algorithm setting that lets you tune how search works, prioritizing things like due dates, course context, or file types. The best product experience isn't forcing one workflow on everyone. It's adapting to yours.",
      },
    ],
  },
  {
    slug: "search-that-understands-what-you-meant",
    title: "Search that understands what you meant",
    date: "2026-03-17",
    category: "Product",
    description:
      "Canvascope maps student intent like a physics lab this week to related Canvas materials even when file names and module labels do not match.",
    keywords: [
      "semantic Canvas search",
      "intent-aware search",
      "Canvas files",
      "student search",
      "Canvascope",
    ],
    body: [
      {
        type: "paragraph",
        text: "Students lose minutes every time they look for something in Canvas, not because the content isn't there, but because it's named things like 1BLprelab5, Lab 5 Quiz, Modules, or Attendance.",
      },
      {
        type: "paragraph",
        text: "So a student searches physics lab this week. Most systems rely on exact labels and miss what the student actually means. We fixed that. Now search infers intent: if Canvas shows Lab 5 due this week, we surface the related lab materials automatically, even when the file names look nothing alike. One search, one result, done. It should have always worked this way.",
      },
    ],
  },
  {
    slug: "canvascope-4-removing-seven-steps",
    title: "Canvascope 4.0.0: the most underrated feature is removing seven steps",
    date: "2026-03-14",
    category: "Product",
    description:
      "Canvascope 4.0.0 made sending class PDFs from Canvas to Lectra on iPad faster with real-time wakeups, fallback polling, and richer course-context sync.",
    keywords: [
      "Canvascope 4",
      "Canvas PDF to iPad",
      "Lectra",
      "real-time wakeups",
      "course context sync",
    ],
    body: [
      {
        type: "paragraph",
        text: "The most underrated product feature isn't AI. It's deleting annoying steps. With 4.0.0, sending class PDFs from Canvas to Lectra on iPad became far faster and far simpler.",
      },
      {
        type: "paragraph",
        text: "Before, the workflow usually looked like: download the file, rename it, AirDrop it, find it again, import it, wait, then finally annotate. Now it's basically: open the PDF in Canvas, tap Send to Lectra, keep working.",
      },
      {
        type: "paragraph",
        text: "Under the hood we rebuilt the handoff with faster file delivery, real-time wake-ups for the signed-in iPad, fallback polling for reliability, and richer course-context sync so the receiving app understands more than just the raw file. In plain English: less file chaos, less context switching, less friction between laptop work and iPad annotation.",
      },
    ],
  },
  {
    slug: "100000-files-indexed",
    title: "100,000 files indexed",
    date: "2026-03-12",
    category: "Milestone",
    description:
      "Canvascope crossed 100,000 indexed files, highlighting how much coursework students manage and how useful fast local-first search can be.",
    keywords: [
      "100000 indexed files",
      "Canvascope milestone",
      "local-first search",
      "course files",
      "student productivity",
    ],
    body: [
      {
        type: "paragraph",
        text: "We just crossed 100,000 indexed files in Canvascope. The number matters less than what it represents: how much course content students manage every day, and how much it helps to find the right assignment, reading, or syllabus quickly and reliably.",
      },
      {
        type: "paragraph",
        text: "Canvascope is built around exactly that: fast local-first search and planner-aware retrieval that surfaces what you need without breaking focus. Meanwhile, Lectra is taking shape around Canvas handoff, a document library with folders and thumbnails, and cloud backup controls. A meaningful milestone, and a strong sign of momentum across both products.",
      },
    ],
  },
  {
    slug: "a-first-look-at-lectra-our-ipad-app",
    title: "A first look at Lectra, our iPad app",
    date: "2026-03-09",
    category: "Engineering",
    description:
      "Lectra's early build focused on Apple Pencil PDF annotation, a document vault, local-first persistence, flattened export, and direct Canvascope handoff.",
    keywords: [
      "Lectra iPad app",
      "Apple Pencil PDF editor",
      "document vault",
      "flattened PDF export",
      "Canvascope handoff",
    ],
    body: [
      {
        type: "paragraph",
        text: "Lectra is the Apple Pencil-first iPad app we're building as part of the Canvascope ecosystem. The goal is to make PDF annotation fast and natural on iPad while keeping a reliable workflow between iPad and desktop. The current build includes:",
      },
      {
        type: "list",
        items: [
          "A Pencil-first PDF editor with pen, highlighter, eraser, and lasso tools, plus adjustable stroke controls",
          "A document vault with folders, search, recents, and grid/list browsing",
          "PDF and image import, including blank documents for scratch work",
          "A local-first annotation pipeline with on-device persistence and flattened PDF export",
          "Direct handoff to the Canvascope extension on desktop, with upload status tracking",
          "Optional cloud backup with iCloud-aware fallback behavior",
        ],
      },
    ],
  },
  {
    slug: "canvascope-is-live-on-the-chrome-web-store",
    title: "Canvascope is live on the Chrome Web Store",
    date: "2026-03-07",
    category: "Milestone",
    description:
      "Canvascope launched as a real installable Chrome extension for local-first Canvas search across assignments, files, and modules.",
    keywords: [
      "Canvascope Chrome Web Store",
      "Canvas Chrome extension",
      "local-first Canvas search",
      "privacy-first extension",
      "student search",
    ],
    body: [
      {
        type: "paragraph",
        text: "Canvascope started as a fix for a problem I kept hitting as a student: finding anything in Canvas is harder than it should be. Today it's a real, installable product.",
      },
      {
        type: "paragraph",
        text: "Canvascope is a privacy-first Chrome extension that indexes your course materials locally and lets you search across assignments, files, and modules in plain language. It's local-first for performance and privacy, with zero third-party analytics or tracking, optimized for low-latency search, and designed to extend into bigger integrations down the line.",
      },
      {
        type: "paragraph",
        text: "This is where it all begins. Thank you to everyone who tested early versions, reported bugs, and shared feedback. Your input shaped this release and everything that's come since.",
      },
    ],
  },
];

const articleMap = new Map(
  newsroomArticles.map((article) => [article.slug, article]),
);

const articleDateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function getNewsroomArticle(slug: string): NewsroomArticle | undefined {
  return articleMap.get(slug);
}

export function getNewsroomArticlesBySlugs(slugs: string[]): NewsroomArticle[] {
  return slugs
    .map((slug) => getNewsroomArticle(slug))
    .filter((article): article is NewsroomArticle => Boolean(article));
}

export function formatArticleDate(date: string): string {
  return articleDateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

export function articlePath(article: Pick<NewsroomArticle, "slug">): string {
  return `/newsroom/${article.slug}`;
}

export function articlePlainText(article: NewsroomArticle): string {
  return article.body
    .flatMap((block) => (block.type === "paragraph" ? [block.text] : block.items))
    .join(" ");
}

export function articleReadingMinutes(article: NewsroomArticle): number {
  const wordCount = articlePlainText(article).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
}
