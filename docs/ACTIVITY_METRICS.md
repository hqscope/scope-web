# Active-user metrics

Live counts of who is actually using each Scope product — signed in or not.

## Public portfolio usage counter

`GET /api/public/usage` exposes a deliberately narrow, cached aggregate for
public sites. It returns the Chrome Web Store's public extension-user count,
the number of Supabase Auth users with an Apple identity, their arithmetic sum,
and a generation timestamp. It never returns auth rows or user identifiers.

The combined number is a cross-product reach figure, not a deduplicated count
of people: someone who uses both products may appear in both inputs. The route
keeps the service-role key server-only, allows cross-origin reads of the public
aggregate, and caches responses at the CDN for one hour. If either upstream
source cannot be verified, it returns `503` rather than publishing a partial
total.

The portfolio keeps a last-verified static fallback and refreshes it from this
endpoint in the browser. Deploy this backend route before deploying a portfolio
change that depends on a newer response shape. Rollback is removal of the route
and its `src/lib/data/publicUsage.ts` helper; there is no database migration or
RLS change to reverse.

## Where the numbers come from

| Piece | Lives in |
|---|---|
| `activity_installs`, `activity_hours` tables + `activity_summary()` / `activity_summary_total()` / `activity_timeseries()` | `lectra-ios/backend/migrations/20260819120000_product_activity.sql` |
| `track-activity` edge function (unauthenticated by design) | `lectra-ios/backend/functions/track-activity/` |
| Dashboard | `/app/admin/metrics` in this repo |
| Text snapshot for the YC record | `scope-docs/yc/metrics/pull_metrics.py` → `METRICS.md` |

Clients ping only on real interaction. Idle time does not count — see the
comment at the top of `scope-platform/apps/extension/src/background/activity.js`
for why that matters and what would break if it changed.

## Configuration

The dashboard needs two environment variables. **Without either one it fails
closed** — the page 404s or reports "no service-role key configured" rather
than leaking anything.

| Variable | Value |
|---|---|
| `NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY` | The project's service-role key. Required: the activity tables have RLS on with no policies, so there is deliberately no anon or authenticated read path. |
| `SCOPE_ADMIN_USER_IDS` | Comma-separated Supabase user ids allowed to open `/app/admin/metrics`. Unset means nobody. |

Set both in Vercel (Production and Preview). Never expose either with a
`NEXT_PUBLIC_` prefix.

There is no navigation link to the dashboard on purpose — a link visible to
non-admins would advertise a page they cannot open. Go to `/app/admin/metrics`
directly.

## Reading the numbers honestly

- **Products measure different things and must not be summed.** The extension,
  Lectra on iPad, the Receiver, and Polya count real interaction. `lectra_mac`
  counts *hosts online*, because a background receiver has no interaction to
  count.
- **Deduplication is account-first, install-second.** Someone signed in on two
  devices counts once; someone anonymous on two devices counts twice. The bias
  is downward for signed-in users, never upward.
- **Instrumentation started 2026-08-19.** Any window longer than the time since
  then is a floor, not a measured period. Do not cite the yearly column as a
  year until 2027-08-19.
- **"Live" means active in the last 10 minutes** — two missed five-minute
  heartbeats of tolerance.

## Retention

`activity_hours` is pruned past 400 days by the `activity-hours-retention` cron
job. `activity_installs` is never pruned: it is one row per install and backs
the all-time and install counts.
