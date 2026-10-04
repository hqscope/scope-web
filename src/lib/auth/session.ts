import { cache } from "react";
import { headers } from "next/headers";

import { AUTH_UNREACHABLE_HEADER } from "@/lib/auth/outage";
import { createServerSupabaseClient } from "@/lib/supabase/server-component";

export interface AuthenticatedAppUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
}

export const getAuthenticatedAppUser = cache(async () => {
  // The proxy already couldn't reach auth for this request; don't wait out a
  // second timeout here (P-36). Checked before creating the client, because
  // creating one with an expired session starts a refresh on its own.
  if ((await headers()).has(AUTH_UNREACHABLE_HEADER)) {
    return { supabase: null, user: null as AuthenticatedAppUser | null, error: null };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { supabase, user: null as AuthenticatedAppUser | null, error };
  }

  const metadata = user.user_metadata ?? {};
  const displayName =
    (typeof metadata.full_name === "string" && metadata.full_name) ||
    (typeof metadata.name === "string" && metadata.name) ||
    user.email ||
    "Scope user";

  const avatarUrl =
    typeof metadata.avatar_url === "string" ? metadata.avatar_url : null;

  return {
    supabase,
    user: {
      id: user.id,
      email: user.email ?? "",
      displayName,
      avatarUrl,
    },
    error: null,
  };
});
