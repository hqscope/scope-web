create table if not exists public.workspace_item_state (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_key text not null,
  item_type text not null check (item_type in ('upcoming_work', 'document', 'course_brain')),
  status text not null default 'open' check (status in ('open', 'in_progress', 'done', 'snoozed')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high')),
  pinned boolean not null default false,
  deferred_until timestamptz null,
  note text null,
  source_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, item_key)
);

create index if not exists workspace_item_state_status_idx
  on public.workspace_item_state (user_id, status, deferred_until);

create index if not exists workspace_item_state_pinned_idx
  on public.workspace_item_state (user_id, pinned, updated_at desc);

create index if not exists workspace_item_state_type_idx
  on public.workspace_item_state (user_id, item_type);

create or replace function public.workspace_item_state_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists workspace_item_state_set_updated_at on public.workspace_item_state;

create trigger workspace_item_state_set_updated_at
before update on public.workspace_item_state
for each row
execute function public.workspace_item_state_set_updated_at();

alter table public.workspace_item_state enable row level security;

drop policy if exists "workspace_item_state_select_own" on public.workspace_item_state;
create policy "workspace_item_state_select_own"
on public.workspace_item_state
for select
using ((select auth.uid()) = user_id);

drop policy if exists "workspace_item_state_insert_own" on public.workspace_item_state;
create policy "workspace_item_state_insert_own"
on public.workspace_item_state
for insert
with check ((select auth.uid()) = user_id);

drop policy if exists "workspace_item_state_update_own" on public.workspace_item_state;
create policy "workspace_item_state_update_own"
on public.workspace_item_state
for update
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "workspace_item_state_delete_own" on public.workspace_item_state;
create policy "workspace_item_state_delete_own"
on public.workspace_item_state
for delete
using ((select auth.uid()) = user_id);
