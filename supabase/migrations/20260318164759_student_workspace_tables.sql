create table if not exists public.student_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  notes text null,
  due_at timestamptz null,
  status text not null default 'open' check (status in ('open', 'done')),
  repeat_daily boolean not null default false,
  raw_text text null,
  source_app text not null default 'canvascope-web',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists student_tasks_user_status_idx
  on public.student_tasks (user_id, status, due_at);

create index if not exists student_tasks_user_updated_idx
  on public.student_tasks (user_id, updated_at desc);

create or replace function public.student_tasks_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists student_tasks_set_updated_at on public.student_tasks;

create trigger student_tasks_set_updated_at
before update on public.student_tasks
for each row
execute function public.student_tasks_set_updated_at();

alter table public.student_tasks enable row level security;

drop policy if exists "student_tasks_select_own" on public.student_tasks;
create policy "student_tasks_select_own"
on public.student_tasks
for select
using ((select auth.uid()) = user_id);

drop policy if exists "student_tasks_insert_own" on public.student_tasks;
create policy "student_tasks_insert_own"
on public.student_tasks
for insert
with check ((select auth.uid()) = user_id);

drop policy if exists "student_tasks_update_own" on public.student_tasks;
create policy "student_tasks_update_own"
on public.student_tasks
for update
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "student_tasks_delete_own" on public.student_tasks;
create policy "student_tasks_delete_own"
on public.student_tasks
for delete
using ((select auth.uid()) = user_id);

create table if not exists public.student_quick_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  url text not null check (url ~* '^https?://'),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists student_quick_links_user_sort_idx
  on public.student_quick_links (user_id, sort_order, created_at);

create or replace function public.student_quick_links_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists student_quick_links_set_updated_at on public.student_quick_links;

create trigger student_quick_links_set_updated_at
before update on public.student_quick_links
for each row
execute function public.student_quick_links_set_updated_at();

alter table public.student_quick_links enable row level security;

drop policy if exists "student_quick_links_select_own" on public.student_quick_links;
create policy "student_quick_links_select_own"
on public.student_quick_links
for select
using ((select auth.uid()) = user_id);

drop policy if exists "student_quick_links_insert_own" on public.student_quick_links;
create policy "student_quick_links_insert_own"
on public.student_quick_links
for insert
with check ((select auth.uid()) = user_id);

drop policy if exists "student_quick_links_update_own" on public.student_quick_links;
create policy "student_quick_links_update_own"
on public.student_quick_links
for update
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "student_quick_links_delete_own" on public.student_quick_links;
create policy "student_quick_links_delete_own"
on public.student_quick_links
for delete
using ((select auth.uid()) = user_id);
