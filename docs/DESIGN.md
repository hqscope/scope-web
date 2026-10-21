# Scope web design system

White pages, warm ink, and Scope red used sparingly. The product itself is the
picture: each page shows what the app does with a drawn illustration or a real
screenshot, and one interactive moment carries the home page (the ⌘K search demo).

Introduced October 2026. It replaces the "pages on a desk" system.

## Tokens

Defined in `src/app/globals.css` under `@theme`, so each is a Tailwind color
(`bg-wash`, `text-stone`, `border-line`, …).

| Token | Hex | Role |
| --- | --- | --- |
| `ink` | `#241e18` | Headings and primary text. Dark bands (`bg-ink text-white`). |
| `ink-soft` | `#3d352d` | Body text. |
| `paper` | `#ffffff` | Page background. |
| `wash` | `#f6f5f2` | Bands and panels that need separation. |
| `stone` | `#6b635b` | Secondary text. |
| `line` | `#e7e3dd` | Hairlines, dividers, frames. |
| `red` / `red-deep` / `red-tint` | `#c42b26` / `#a3221e` / `#fbeceb` | Brand accent: primary buttons, the logo's top bar, citations. Use sparingly. |
| `pen` / `marker` | `#2447c9` / `#fde68a` | Handwriting ink and highlighter, only inside product illustrations. |

Fonts: Schibsted Grotesk for everything (`font-sans`). Caveat (`font-hand`) only
for handwriting drawn inside illustrations.

## Type

- Page titles: `clamp(2.4rem–5.75rem)`, weight 600, tracking `-0.045em`, leading about 1.
- Section headings: `clamp(1.6rem–3.25rem)`, weight 600, tracking `-0.035em` to `-0.04em`.
- Body: 15.5–18px, leading 1.55–1.7. Keep measures under about 70 characters.
- Sentence case everywhere. No all-caps labels, no eyebrow above every heading,
  no "→" in button text, no numbered markers unless the content is a sequence.

## Layout

- Container: `mx-auto max-w-[1200px] px-5 sm:px-8`.
- Structure comes from hairlines (`border-line`, `divide-line`) and rounded
  frames (`rounded-[18px]` or `rounded-[22px]`), not shadowed card grids.
- Grids start at `grid-cols-1` so wide content can't push the page sideways at 390px.

## Building blocks

- `PageShell` wraps every public page (skip link, header, footer). Pass `active`
  for the nav and `cta` to change the header button.
- `PageHead`, `ArticleShell` (long-form with an "On this page" outline),
  `FaqList`, `RelatedLinks`, `ComparisonTable`, `MethodologyNote`, `NewsList`,
  `DeviceFrame`, `PreferredSource` in `src/components/site/`.
- `PageHero`, `SectionHeading`, `FeatureGrid`, `SplitSection`, `Requirements`,
  `Questions`, `ClosingCta` in `src/components/page-parts.tsx`.
- Buttons in `src/components/buttons.tsx`. Store buttons go through `StoreLink`,
  which records a `store_click` event.
- Long-form text: wrap plain semantic HTML in `.prose-scope`. Inline links use `.link`.

## Motion

One orchestrated moment per page at most (the home page's search demo types a
query once). Motion otherwise only answers a person's action. Everything respects
`prefers-reduced-motion`.
