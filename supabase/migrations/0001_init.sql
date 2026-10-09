-- ===========================================================================
-- Sifted Truth — initial schema
-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Safe to re-run: every statement is guarded.
-- ===========================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Profiles & roles
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role text not null default 'member' check (role in ('admin', 'member')),
  created_at timestamptz not null default now()
);

-- Every new auth user gets a profile (role 'member').
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for users created before this migration.
insert into public.profiles (id, display_name)
select id, split_part(email, '@', 1) from auth.users
on conflict (id) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- ---------------------------------------------------------------------------
-- Shared updated_at trigger
-- ---------------------------------------------------------------------------

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Content tables
-- ---------------------------------------------------------------------------

create table if not exists public.authors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role text,
  bio text,
  profile_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  sort int not null default 0
);

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'secondary' check (kind in ('primary', 'secondary')),
  author text,
  title text not null,
  publication text,
  year int,
  pages text,
  url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists sources_touch on public.sources;
create trigger sources_touch before update on public.sources
  for each row execute function public.touch_updated_at();

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('article', 'dispatch', 'video', 'claim')),
  slug text not null,
  title text not null default '',
  dek text,
  topic_id uuid references public.topics (id) on delete set null,
  author_id uuid references public.authors (id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published', 'archived')),
  featured boolean not null default false,
  published_at timestamptz,
  reading_minutes int,
  hero jsonb,                                   -- { src, alt, caption, credit }
  body jsonb not null default '[]'::jsonb,      -- [{ type, text, ... }]
  footnotes jsonb not null default '[]'::jsonb, -- [{ n, text, source_id }]
  corrections jsonb not null default '[]'::jsonb, -- [{ date, text }]
  video jsonb,                                  -- { youtube_id, duration, series, chapters, transcript }
  claim jsonb,                                  -- { statement, origin, rating, confidence, summary, evidence_for, evidence_against, reviewed_at, history }
  dispatch jsonb,                               -- { label, original_outlet, original_url }
  related_slug text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (type, slug)
);

create index if not exists posts_public_idx on public.posts (status, published_at desc);
create index if not exists posts_topic_idx on public.posts (topic_id);

drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts
  for each row execute function public.touch_updated_at();

create table if not exists public.post_sources (
  post_id uuid not null references public.posts (id) on delete cascade,
  source_id uuid not null references public.sources (id) on delete cascade,
  sort int not null default 0,
  primary key (post_id, source_id)
);

-- Bible text (filled later from the official BSB / KJV files).
create table if not exists public.verses (
  version text not null,
  book_id text not null,
  chapter int not null,
  verse int not null,
  text text not null,
  primary key (version, book_id, chapter, verse)
);

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.authors enable row level security;
alter table public.topics enable row level security;
alter table public.sources enable row level security;
alter table public.posts enable row level security;
alter table public.post_sources enable row level security;
alter table public.verses enable row level security;

-- profiles: you can read your own; admins read and manage all. Nobody can promote themselves.
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles for select using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles admin write" on public.profiles;
create policy "profiles admin write" on public.profiles for update using (public.is_admin()) with check (public.is_admin());

-- reference tables: everyone reads, admins write
do $$
declare t text;
begin
  foreach t in array array['authors', 'topics', 'sources', 'verses'] loop
    execute format('drop policy if exists "%1$s public read" on public.%1$I', t);
    execute format('create policy "%1$s public read" on public.%1$I for select using (true)', t);
    execute format('drop policy if exists "%1$s admin write" on public.%1$I', t);
    execute format('create policy "%1$s admin write" on public.%1$I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- posts: the public sees live posts (published, or scheduled and due); admins see and manage everything
drop policy if exists "posts public read" on public.posts;
create policy "posts public read" on public.posts for select
  using (
    (status in ('published', 'scheduled') and published_at is not null and published_at <= now())
    or public.is_admin()
  );
drop policy if exists "posts admin write" on public.posts;
create policy "posts admin write" on public.posts for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "post_sources public read" on public.post_sources;
-- (the subquery runs under the posts policy, so links to drafts stay hidden)
create policy "post_sources public read" on public.post_sources for select
  using (exists (select 1 from public.posts p where p.id = post_id));
drop policy if exists "post_sources admin write" on public.post_sources;
create policy "post_sources admin write" on public.post_sources for all
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Starter rows
-- ---------------------------------------------------------------------------

insert into public.topics (slug, name, description, sort) values
  ('apologetics', 'Apologetics', 'Arguments for the faith, weighed fairly against the strongest objections.', 1),
  ('archaeology', 'Archaeology', 'Sites, inscriptions and finds that touch the biblical world.', 2),
  ('church-history', 'Church History', 'Two thousand years of councils, schisms, saints and scholars.', 3),
  ('bible-manuscripts', 'Bible & Manuscripts', 'How the text came to us, copy by copy and language by language.', 4)
on conflict (slug) do nothing;

insert into public.authors (slug, name, role, bio) values
  ('editor', 'The Editor', 'Founder & Editor', '[Your bio]')
on conflict (slug) do nothing;
