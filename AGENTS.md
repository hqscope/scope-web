# AGENTS

Project-specific guidance for AI coding agents.

Public pages use the design system in `docs/DESIGN.md`: white pages, warm ink, Scope red used sparingly, Schibsted Grotesk, drawn product illustrations. It is implemented in `src/app/globals.css` (tokens, `.link`, `.prose-scope`), `src/components/site/*` (page chrome and content primitives), `src/components/page-parts.tsx`, `src/components/buttons.tsx`, and `src/components/mocks/*`. Every public page renders inside `PageShell`. Follow it for any public page.

Backend routes (`src/app/api`, `src/app/auth`, `src/app/login`, `src/proxy.ts`, `src/lib/{auth,data,http,server,supabase}`) are independent of the design. Don't change their behavior as part of page work.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
