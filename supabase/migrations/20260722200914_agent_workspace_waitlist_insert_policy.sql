-- The waitlist insert previously required a service-role key that is not
-- configured in any environment, so every submission failed with a 503. Allow
-- the browser-facing roles to INSERT under a tightly scoped check instead.
--
-- There is still no SELECT, UPDATE, or DELETE policy on this table, so the
-- anon key cannot read, change, or remove the list -- only append a row that
-- satisfies the check below. The route still prefers the service-role key
-- when one is configured.

alter table public.agent_workspace_waitlist
  add constraint agent_workspace_waitlist_email_len
    check (char_length(email) between 3 and 254);

alter table public.agent_workspace_waitlist
  add constraint agent_workspace_waitlist_user_agent_len
    check (user_agent is null or char_length(user_agent) <= 512);

alter table public.agent_workspace_waitlist
  add constraint agent_workspace_waitlist_referrer_len
    check (referrer is null or char_length(referrer) <= 512);

create policy agent_workspace_waitlist_insert
  on public.agent_workspace_waitlist
  for insert
  to anon, authenticated
  with check (
    source = 'agent-workspace'
    and char_length(email) between 3 and 254
    and email like '%_@_%._%'
  );
