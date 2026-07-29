# Scope Website (`scope-web`)

Next.js website and integration backend for Scope (formerly Canvascope).

**What this site has to say.** Scope is building the course workspace — the place
students actually do the work, rather than the place assignments get posted. The
site's job is to make that legible and route visitors to the right surface: Lectra
for iPad, the extension for the browser, Polya for tutoring. Company direction:
`../scope-docs/ROADMAP.md`.

Two hard constraints on public copy: nothing may claim an instructor product,
gradebook, roster sync, or LMS replacement — none of it is built — and nothing may
offer a paid tier, because there isn't one. Students use the workspace free.

> **Naming.** Page copy and metadata are already renamed to Scope. The remaining
> "Canvascope" strings in `src/app/layout.tsx` and `src/app/product/scope/page.tsx`
> are **intentional** SEO keyword retention so the former name still resolves —
> leave them. The domain is still `canvascope.org`, which is also what the YC
> application points at; changing it is a sequenced decision, not a
> find-and-replace.

## Local Development

From this directory:

```bash
npm run dev
```

Open:

- `http://localhost:3000`

## Core Responsibilities

- Public Scope marketing/site pages.
- Scope Google OAuth session endpoints.
- Public copy for the extension AI stack: unified Ask, cited Course Brain retrieval, Smart Planner, and explicit cloud fallback.
- Lectra integration endpoints for bootstrap, token exchange, reminders, and document-workflow context.
- RISC Cross-Account Protection proxy endpoint for Google account-risk events.
- Optional calendar/planner support surfaces for connected Scope workflows.

## Integration Docs

- `docs/LECTRA_SCOPE_INTEGRATION.md`
