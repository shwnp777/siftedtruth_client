-- ===========================================================================
-- Sifted Truth — newsletter sign-ups and reader messages.
-- Run once in Supabase → SQL Editor. Safe to re-run.
--
-- Anyone can add a row (that's the sign-up form and the contact form), but
-- only admins can read them, in the studio under Readers.
-- ===========================================================================

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,
  created_at timestamptz not null default now(),
  constraint subscribers_email_format check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(email) <= 254)
);
create unique index if not exists subscribers_email_key on public.subscribers (lower(email));

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  topic text not null default 'general' check (topic in ('general', 'correction', 'tip')),
  name text check (length(name) <= 200),
  email text check (length(email) <= 254),
  page_url text check (length(page_url) <= 500),
  body text not null check (length(body) between 1 and 5000),
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;
alter table public.messages enable row level security;

drop policy if exists "subscribers anyone insert" on public.subscribers;
create policy "subscribers anyone insert" on public.subscribers for insert with check (true);
drop policy if exists "subscribers admin all" on public.subscribers;
create policy "subscribers admin all" on public.subscribers for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "messages anyone insert" on public.messages;
create policy "messages anyone insert" on public.messages for insert with check (handled = false);
drop policy if exists "messages admin all" on public.messages;
create policy "messages admin all" on public.messages for all using (public.is_admin()) with check (public.is_admin());

grant insert on public.subscribers, public.messages to anon, authenticated;
grant select, update, delete on public.subscribers, public.messages to authenticated;
