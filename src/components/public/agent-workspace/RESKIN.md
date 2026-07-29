# Reskinning the office demo

The demo is deliberately split in two. A new design drop from the Claude Design
project should only ever touch the **cosmetic layer**; the **behavioural layer**
is a contract the TypeScript depends on.

---

## 1. Cosmetic layer — safe to replace wholesale

Everything below lives in `office-demo.css` (plus the tokens and keyframes in
`../../../app/product/agent-workspace/agent-workspace.css`). None of it is read
by the simulation.

| What | Where |
| --- | --- |
| Colour tokens (`--aw-bg`, `--aw-claude`, `--aw-waiting`, …) | `agent-workspace.css`, `.aw-page` / `.public-page--dark` block |
| The 16 shared keyframes (`aw-pulse` `aw-glowp` `aw-blink` `aw-hop` `aw-conf` `aw-zzz` `aw-stroll` `aw-waddle` `aw-steam` `aw-twinkle` `aw-typea` `aw-typeb` `aw-armsup` `aw-armsupb` `aw-wavehand` `aw-floaty`) | `agent-workspace.css`, inside `@media (prefers-reduced-motion: no-preference)` — **defined once, never redefined here** |
| Demo-only keyframes (`aw-demo-walkin`, `aw-demo-walkout`) | `office-demo.css`, same media block, always `aw-demo-` prefixed |
| Every position, size, gradient and shadow in the room | `office-demo.css`, `.aw-o-*` rules |
| Every position, size and pose of a worker | `office-demo.css`, `.aw-w-*` rules |
| Window chrome, sidebar, inspect panel, debug panel | `office-demo.css`, `.aw-demo-*` rules |
| The inspect card's internals | `agent-workspace.css`, `.aw-ip-*` rules (shared with the marketing page's deep-dive illustration — one card design, one set of rules) |

**Rules a replacement sheet must keep:**

1. Every selector is scoped under `.aw-demo` (route stylesheets go
   document-global once loaded; this is the only barrier).
2. Every keyframe name starts with `aw-` and demo-only ones with `aw-demo-`.
3. **Every** animation, transition and looping declaration sits inside
   `@media (prefers-reduced-motion: no-preference)`. The base stratum must be a
   complete, legible, static office — that is what a reduced-motion visitor,
   and a visitor with JavaScript off, actually sees.
4. Animate `transform` and `opacity` only. The one exception is `aw-glowp`,
   which animates `box-shadow` on the ~10px status lamps — as designed.
5. Leave `.aw-demo[data-resting="true"] * { animation-play-state: paused }`
   alone. It is how the page stops burning CPU off screen.

---

## 2. Behavioural layer — changing these means changing code

### Structural class names

`.aw-demo` · `.aw-demo-toolbar` · `.aw-demo-stage` · `.aw-demo-world` ·
`.aw-demo-workers` · `.aw-demo-sidebar` · `.aw-demo-strip` ·
`.aw-demo-inspect` · `.aw-demo-debug` · `.aw-o` · `.aw-o-vacant` · `.aw-w` and
its `.aw-w-*` parts.

### Data attributes the CSS keys off

| Attribute | Values | Set by |
| --- | --- | --- |
| `data-status` on `.aw-w` | `working` `thinking` `waiting` `done` `idle` `walking` | `Worker.tsx` |
| `data-transit` on `.aw-w` | `none` `arriving` `leaving` | `Worker.tsx` |
| `data-shape` on `.aw-w` | `desk` (150 × 150) `walk` (60 × 86) | `Worker.tsx` |
| `data-selected` on `.aw-w` | `true` `false` | `Worker.tsx` |
| `data-tone` on `.aw-w-bubble` | `default` `warn` `done` `walk` | `StatusBubble.tsx` |
| `data-muted` on `.aw-w-screenline` | `true` `false` | `Worker.tsx` |
| `data-lighting` on `.aw-demo` | `night` `day` `dusk` | `OfficeDemo.tsx` |
| `data-resting` on `.aw-demo` | `true` `false` | `useOfficeSim.ts` (written straight to the DOM) |
| `data-inspecting` on `.aw-demo` | `true` `false` | `OfficeDemo.tsx` |
| `data-tucked` on `.aw-demo-sidebar` | `true` `false` | `Sidebar.tsx` |
| `data-current` on `.aw-demo-floor` | `true` `false` | `Sidebar.tsx` |

### Custom properties the components write

Set inline on `.aw-w`: `--aw-x` `--aw-y` `--aw-z` `--aw-skin` `--aw-torso-a`
`--aw-torso-b` `--aw-lamp` `--aw-fill` `--g` `--aw-walk-dx` `--aw-walk-dy`.
Set inline on `.aw-w-fill`: `--aw-progress`.
Set inline on `.aw-demo`: `--aw-day` `--aw-dusk` `--aw-night`.
Set inline on `.aw-demo-inspect .aw-ip`: `--aw-av-a` `--aw-av-b`.

A new sheet may restyle what these drive, but must keep consuming them.

### World geometry

The room is authored at **960 × 580**. `.aw-demo-stage` is a size container and
`.aw-demo-world` scales itself to fit with
`scale(min(tan(atan2(100cqw, 960px)), tan(atan2(100cqh, 580px))))` — the
`tan(atan2(…))` pair is the only way to turn two lengths into the plain number
`scale()` wants. Browsers without CSS trig maths fall back to the mockup's own
`0.84`. Changing the world size means changing those numbers in **both** places
and `WORLD_WIDTH` / `WORLD_HEIGHT` in `sim/cast.ts`.

Desk slots, the door position and the wander spot are data, in
`sim/cast.ts` (`DESKS`, `DOOR_X`, `DOOR_Y`) and `Worker.tsx` (`WANDER_X`,
`WANDER_Y`). Move a desk in the art and move it there too.

### Status → pose table

| Machine status | Pose |
| --- | --- |
| `working` | `aw-typea` / `aw-typeb` arms, provider-coloured lamp on `aw-glowp`, coral screen text, progress fill |
| `thinking` | same silhouette, arms slowed to 1.6s, lilac screen, "thinking…" bubble |
| `waiting` | `aw-hop` body, `aw-wavehand` raised arm, `#ffc454` lamp, yellow-bordered bubble |
| `done` | `aw-hop` body, `aw-armsup` / `aw-armsupb` arms, six `aw-conf` confetti squares, green screen, 100% bar |
| `idle` | the mockup's **paused** look: `saturate(.55) brightness(.82)`, three `aw-zzz` glyphs, static `#4a4162` lamp, head tilted 7°, no arms |
| `walking` + `transit: null` | `aw-stroll` around the water cooler with an inner `aw-waddle` |
| `walking` + `arriving` / `leaving` | one-shot `aw-demo-walkin` / `aw-demo-walkout` between the door and the desk |

`idle` is the internal name; **paused** is what it looks like and what the copy
calls it. Renaming one without the other will desynchronise the room.

---

## 3. The simulation (`sim/`)

Pure TypeScript, zero DOM. `buildInitialScene(seed)` is pure and returns the
mockup's posed cast, which is why the server render and the first client render
are identical and why the office is correct with JavaScript switched off.

- `prng.ts` — `mulberry32`, the only source of randomness.
- `cast.ts` — providers, desks, the copy pools, the opening scene.
- `states.ts` — dwell ranges, transition weights, event cadence.
- `engine.ts` — one event per `advance()`, plus the director invariants
  (one raised hand at a time, occupancy 4–6, minimum gap between events) and
  `determinismCheck()`.
- `store.ts` — immutable per-worker snapshots for `useSyncExternalStore`.

Copy lives in `cast.ts` and is written in the mockup's voice: what the agent is
doing, never how the app finds out.

---

## 4. Checks before shipping a reskin

- `npx tsc --noEmit`
- `npx eslint src/components/public/agent-workspace/`
- `?aw-debug=1` in development: the determinism self-check reports PASS, the
  invariant line reports PASS, and the status matrix renders every pose.
- Toggle "reduce motion" at the OS level: the office is still fully legible.
- Scroll it off screen: animations stop (`data-resting="true"`).
