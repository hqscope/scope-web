create table if not exists public.agent_workspace_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'agent-workspace',
  user_agent text null,
  referrer text null,
  created_at timestamptz not null default now()
);

create unique index if not exists agent_workspace_waitlist_email_key
  on public.agent_workspace_waitlist (lower(email));

alter table public.agent_workspace_waitlist enable row level security;

-- No RLS policies on purpose: the anon key ships in the browser bundle, so
-- clients must never read or write this table directly. Every insert goes
-- through the server-side /api/waitlist route using the service-role key,
-- which bypasses RLS.
--
-- Superseded by 20260722200000_agent_workspace_waitlist_insert_policy.sql: no
-- service-role key was ever configured, so a scoped insert-only policy now
-- carries the write path. Reads stay closed.
