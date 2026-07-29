import { createClient } from "@supabase/supabase-js";

import { getSupabaseConfig } from "@/lib/supabase/config";

export function createAdminSupabaseClient() {
  const serviceRoleKey =
    process.env.NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!serviceRoleKey) {
    return null;
  }

  const { url } = getSupabaseConfig();

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Server-side writer for tables that are safe to write with the anon key
// because an RLS policy scopes exactly what may be inserted. Prefers the
// service-role key when one is configured; falls back to anon so the route
// keeps working in environments where that secret is not set.
export function createServerWriteSupabaseClient() {
  const admin = createAdminSupabaseClient();
  if (admin) {
    return admin;
  }

  const { url, anonKey } = getSupabaseConfig();

  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
