/**
 * Live user count — the one number the marketing site and noelsason.com both
 * quote.
 *
 * It is two measurements added together, and neither of them is a query this
 * app can run for itself:
 *
 *   - Chrome Web Store weekly users for the Scope extension. Google publishes
 *     it on the listing page only; there is no API and no webhook.
 *   - Apple accounts in Supabase auth (`auth.users`, provider `apple`). That
 *     one is a query, but it runs against the auth schema behind the
 *     service-role key.
 *
 * So the figures below are checked by hand and committed. That is deliberate:
 * a number in source review is a number someone looked at, and the page never
 * renders a zero because a scrape broke. Update both counts together and move
 * VERIFIED_ON with them.
 */

/** Chrome Web Store users for the Scope extension. */
export const EXTENSION_USERS = 80;

/** Apple accounts in Supabase auth. */
export const APPLE_ACCOUNTS = 24;

/** What the site shows: 80 + 24. */
export const LIVE_USERS = EXTENSION_USERS + APPLE_ACCOUNTS;

/** The day the two counts above were last checked at their sources. */
export const VERIFIED_ON = "2026-08-27";

const numberFormat = new Intl.NumberFormat("en-US");

export function formatUsers(count: number): string {
  return numberFormat.format(count);
}

/** "80 Chrome Web Store users + 24 Apple accounts" — the tooltip and aria text. */
export const LIVE_USERS_BREAKDOWN = `${formatUsers(EXTENSION_USERS)} Chrome Web Store users + ${formatUsers(APPLE_ACCOUNTS)} Apple accounts`;
