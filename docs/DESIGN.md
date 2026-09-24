# Scope web design system: pages on a desk, marked in red pen

Every section of the site is a sheet of plaster paper lying on an espresso
desk. As you scroll, the next sheet slides over the last, and the last one
settles back into the stack. The brand red is a pen. It circles, underlines,
and ticks things by hand, which ties the site to Lectra's Apple Pencil markup.
Plans are written in pencil and what ships today is in ink.

The colours are Scope's original palette. The typography, layout, and motion
are new as of September 2026. Nothing from the old layout comes back: no
uppercase kickers, no " · " meta strings, no "01 —" labels, no "→" in links,
no one-red-word headlines, no hairline broadsheet grids.

Everything lives in `src/styles/site.css` (tokens and shared classes),
`src/components/site/*` (chrome and content primitives), and
`src/components/motion/*` (motion primitives). Page-specific styles go in a
CSS file next to the page, imported by that page.

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| `--plaster` | `#f6f1e7` | The paper. Every `.sheet` is this. |
| `--plaster-deep` | `#efe7d8` | Sunken paper: notes, table stripes. |
| `--surface` | `#fbf7ee` | A card or panel lying on paper. |
| `--espresso` | `#241e18` | Ink. Text on paper. |
| `--desk` | `#14100c` | The desk: page ground, header, footer, desk sections. |
| `--red` | `#c42b26` | The pen on paper. Primary buttons on paper. |
| `--red-bright` | `#e5484d` | The pen on the desk. |
| `--graphite` | `#8d8277` | Pencil: plans and anything not shipped. |

Two contexts share one set of role variables. `:root` is the desk. `.sheet`
and `.paper` are paper. Components read only the roles, so they work on
either: `--bg --fg --fg-soft --fg-faint --plane --plane-sunk --rule
--rule-strong --pen --btn-bg --btn-fg`. The site has one colour scheme. It
does not change with the OS dark-mode setting.

## Type

Schibsted Grotesk (`--font-ui`) for everything: UI, headings, and reading.
`--font-read` is an alias for it. No serif and no italics anywhere.
`ui-monospace` (`--font-code`) only inside code content, never for labels.

Scale: `.t-display` (home hero only), `.t-title` (page H1, big section heads),
`.t-head` (H2), `.t-sub`, `.t-item` (H3). Body: `.lede`, `.copy`, `.small`.
Quiet context text: `.context-line` (above an H1) and `.margin-note`.

Never:
- uppercase or letter-spaced labels
- a label above every heading (one `.section-tag` naming the product is fine)
- " · " meta strings (write "A, B" or two sentences)
- "→" or "↓" in link or button text
- numbered markers unless the content really is a sequence

## Layout

- `<Sheet>` (from `src/components/motion/Sheet`) is a section of paper. Use
  it for almost every content block. Adjacent sheets overlap automatically.
  Props: `className`, `id`, `labelledBy`, `as`.
- `.on-desk` sections sit straight on the desk between sheets. Use them for
  one scene per page at most (a device, a demo) and for the closing CTA.
- Long-form pages (guides, comparisons, newsroom posts, legal) are one tall
  `<Sheet as="article">` holding the whole document.
- Inside a sheet: `.shell` container, `.section` / `.section-tight` padding.
  Put `.section` on the Sheet itself (`<Sheet className="section">`).
- `.split` (5/7), `.split--flip`, `.split--even`, `.split--top`.
- `.idea-grid` (+ `--3`) for parallel ideas in columns with a top rule.
- `.feature-list` (+ `--wide`) for title plus description rows. Each row gets
  a red pen tick automatically.
- `.plane` is a panel or card on paper. Use it for real objects, not to box
  every paragraph.
- Radii: sheet `--r-sheet`, device 28px, panel 12px, buttons and chips pill.

## Components (`src/components/site`)

- `PageShell({ active, cta })` wraps every public page. `active` is a
  `NavSection` from `nav.ts`. `cta`: `{ label, href, store? }`.
- `PageHead({ crumbs, context, title, lede, children, wide })`, usually as the
  first child of the first `<Sheet>`. `children` are the actions.
- `FaqList({ items, headingLevel })`. Items `{ question, answer, body? }`.
  `answer` is plain text and feeds `faqSchema()`.
- `ComparisonTable({ caption, columns, rows, ours })`.
- `MethodologyNote({ dateChecked, product, extraConcessions })`.
- `RelatedLinks({ title, links, id })`, `NewsList({ articles, showDescription })`.
- `DeviceFrame({ src, alt, width, height, sizes, priority })` for real screenshots.
- `Mark`, `Icons` (Menu, Close, Chevron, Star, Search, Download, External).
- Store buttons: `<StoreLink store=… href=… className="btn btn-primary">`
  from `src/components/seo/StoreLink` (it records the store_click event).
- Buttons: `.btn .btn-primary` (red on paper, cream on the desk) and
  `.btn .btn-line` (the pen loops around it on hover). Group in `.actions`.
  Text links: `.link` in a `.link-row`. Chips: `.chip`, `.chip-pen`.
  Callouts: `.note`, `.note-hi`.

## Motion

- Headings have no entrance animation. They are simply there. (The
  `data-focus` attribute on some headings is inert.)
- `<PenMark kind="circle" | "underline" | "double" | "strike" inset=… />` draws
  a red pen mark once when it scrolls into view. Put it inside a
  `position: relative` inline element and give that element's `.pen-mark`
  a height when using `inset: auto …`. At most one or two per sheet, on the
  thing a person should look at.
- Motion for React is loaded through `LazyMotion strict`. Import `m`, never
  `motion`, from `motion/react`. `MotionConfig reducedMotion="user"` is global.
- Hooks: `useOnScreen`, `useSeenOnce`, `useCanPin` in
  `src/components/motion/useInView.ts`.
- One signature scene per page at most, tied to what the page says.
- No fade-up on every section. No hover animation on every card.
- Pinned scroll scenes fall back to a plain stack below 560px of height and
  under reduced motion.

## Responsive contract

Every page is checked at 1440×900, 1280×800, 1376×1032, 1032×1376, 1180×820,
820×1180, 1133×744, 744×1133, 852×393, 393×852, 667×375, and 375×667.
No horizontal page scroll. Tables scroll inside `.table-wrap`. Touch targets
44px or larger. Nothing depends on hover.

## Copy rules

- Write for the student, not the engineer. No implementation details in UI copy.
- "Scope for Canvas" and "Lectra Notes" on first mention on a page.
- Never "nothing leaves your device" (there is an optional cloud fallback).
  Never "syncs with Canvas" (it is a one-tap send). Scope is not a quiz-answer tool.
- Nothing may claim an instructor product, gradebook, roster sync, LMS
  replacement, or a paid tier.
- Comparisons name where the competitor wins.
- `SCOPE_DEFINITION`, `LECTRA_DEFINITION`, and `TRADEMARK_DISCLAIMER` in
  `src/lib/site.ts` are used byte for byte.
- No em dashes, no semicolons, no "not X but Y", no Moreover or Furthermore.

Reduced motion: import `useReducedMotion` from `@/components/motion/useReducedMotion`,
never from `motion/react`. Motion's version reads the media query during the
hydrating render, so any markup that branches on it fails hydration.
