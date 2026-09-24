import type { AuthError } from "@supabase/supabase-js";

/**
 * A failed `getUser()` call during a Supabase outage (5xx, a 402 over quota,
 * a network failure, or a retryable fetch error) is not proof the session
 * itself is invalid. Only treat the user as signed out when GoTrue itself
 * says so with a definite 401 and an auth-specific error code (e.g.
 * `session_not_found`, `refresh_token_not_found`). Anything else means we
 * couldn't confirm the session either way, and callers must not redirect to
 * sign-in or persist cleared cookies.
 */
export function isDefiniteSignOut(error: AuthError | null | undefined): boolean {
  if (!error) return false;
  return error.status === 401 && typeof error.code === "string" && error.code.length > 0;
}

/** True when `error` is present but we can't tell if the session is actually invalid. */
export function isAuthOutage(error: AuthError | null | undefined): boolean {
  return Boolean(error) && !isDefiniteSignOut(error);
}
