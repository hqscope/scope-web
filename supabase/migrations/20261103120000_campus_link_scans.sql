-- Campus QR links: one row per visit to www.canvascope.org/go/<campus>.
-- The /go route writes a row after redirecting the visitor; the internal
-- /app/admin/campus-links page reads the totals and scan times.
--
-- Deliberately minimal: no IP address, no raw user agent, no cookie or
-- visitor id. The privacy policy says the website collects no personal data,
-- and a campus, a time, and a coarse device class keep that true.

create table if not exists public.campus_link_scans (
  id bigint generated always as identity primary key,
  campus text not null check (char_length(campus) between 1 and 64),
  device text not null default 'other'
    check (device in ('ios', 'android', 'desktop', 'other')),
  scanned_at timestamptz not null default now()
);

create index if not exists campus_link_scans_campus_scanned_at_idx
  on public.campus_link_scans (campus, scanned_at desc);

create index if not exists campus_link_scans_scanned_at_idx
  on public.campus_link_scans (scanned_at desc);

-- RLS on with no policies: only the server, through the service role, reads
-- or writes this table. The anon key ships in browser bundles, so it must not
-- be able to inflate or read the counts.
alter table public.campus_link_scans enable row level security;

-- security_invoker makes the view apply the caller's RLS, so the anon and
-- authenticated roles see nothing through it either. Without it the view
-- would run as its owner and expose the totals over the public API.
create or replace view public.campus_link_scan_totals
  with (security_invoker = true) as
  select
    campus,
    count(*)::bigint as scans,
    min(scanned_at) as first_scan,
    max(scanned_at) as last_scan
  from public.campus_link_scans
  group by campus;

revoke all on public.campus_link_scans from anon, authenticated;
revoke all on public.campus_link_scan_totals from anon, authenticated;
