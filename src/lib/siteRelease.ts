/**
 * Store-listing facts the site repeats in copy, metadata, and structured
 * data: the shipping versions and the day they were read off the listings.
 *
 * Neither store has an API for this, so the values are checked by hand and
 * committed — the same discipline as src/lib/usage.ts. Update a version and
 * STORE_FACTS_VERIFIED_ON together.
 */

/** Scope for Canvas, as published on the Chrome Web Store. */
export const SCOPE_EXTENSION_VERSION = "11.0.5";

/** Lectra Notes, as published on the App Store. */
export const LECTRA_APP_VERSION = "7.0";

/** The day both versions above were last confirmed against the listings. */
export const STORE_FACTS_VERIFIED_ON = "2026-09-01";

export const RELEASE_VERSION = `v${SCOPE_EXTENSION_VERSION}`;
export const RELEASE_LABEL = "Current Release";

export const RELEASE_BADGE_TEXT = `${RELEASE_VERSION} - ${RELEASE_LABEL}`;
export const RELEASE_PRODUCT_HEADING = `Scope ${RELEASE_VERSION}.`;
