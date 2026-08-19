import { getAuthenticatedAppUser } from "@/lib/auth/session";

// Comma-separated Supabase user ids. Deliberately an env var rather than a
// database column or role: the only surface behind this gate is an internal
// metrics page, and a list in the deployment config is both auditable and
// impossible to escalate into from the app itself.
function adminUserIds(): Set<string> {
  const raw = process.env.SCOPE_ADMIN_USER_IDS ?? "";
  return new Set(
    raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
}

/**
 * The signed-in user if they are an admin, otherwise null.
 *
 * Callers should render a 404 rather than a 403 — an internal page should not
 * confirm its own existence to someone who cannot use it. With
 * SCOPE_ADMIN_USER_IDS unset this returns null for everybody, so a
 * misconfigured deploy fails closed.
 */
export async function getAdminUser() {
  const { user } = await getAuthenticatedAppUser();
  if (!user) return null;

  const allowed = adminUserIds();
  if (allowed.size === 0 || !allowed.has(user.id)) return null;

  return user;
}
