# Scope Website (`scope-web`)

Next.js website and integration backend for Scope (formerly Canvascope), served at canvascope.org.

**What this site has to say.** Scope is building the course workspace — the place
students actually do the work, rather than the place assignments get posted. The
site's job is to make that legible and route visitors to the right surface: Lectra
Notes for iPad, the extension for the browser, Polya for tutoring. Company direction:
`../scope-docs/ROADMAP.md`.

Two hard constraints on public copy: nothing may claim an instructor product,
gradebook, roster sync, or LMS replacement — none of it is built — and nothing may
offer a paid tier, because there isn't one. Students use the workspace free.

> **Naming.** Page copy and metadata are renamed to Scope. The remaining
> "Canvascope" strings in `src/app/layout.tsx` and `src/app/products/extension/page.tsx`
> keywords are **intentional** SEO keyword retention so the former name still
> resolves — leave them. The domain is still `canvascope.org`; changing it is a
> sequenced decision, not a find-and-replace.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build      # fails if public/updates/appcast.xml has no release
```

## Where things live

- `src/lib/site.ts`: product names, definitions, store and download URLs, support email. Pages read from here.
- `src/lib/compare.ts`, `src/lib/guides.ts`, `src/lib/newsroom.ts`: registries that feed the hubs, sitemap, llms.txt, and each page's metadata.
- `src/lib/seo.ts` and `src/lib/structured-data.ts`: per-page metadata and JSON-LD.
- `src/components/site/`: `PageShell`, header, footer, and content primitives. See `docs/DESIGN.md`.
- `next.config.ts`: every legacy redirect (`/product/*`, `/mission`, `/blog`, `/apply`, `/app/authorize`) and the Lectra for Mac `/downloads/*` redirects derived from the appcast.

## Core responsibilities

- Public Scope marketing pages, guides, comparisons, and the newsroom.
- Scope Google OAuth session endpoints and the Google RISC receiver.
- Lectra integration endpoints for bootstrap, token exchange, reminders, and link tokens.
- The Lectra for Mac Sparkle feed (`public/updates/appcast.xml`) and download redirects.
- `/api/internal/social-snapshot` for the social automation, `/api/public/usage`, and the Agent Workspace waitlist.

## Integration docs

- `docs/LECTRA_SCOPE_INTEGRATION.md`
- `docs/RECEIVER_DISTRIBUTION.md`
- `docs/ACTIVITY_METRICS.md`
