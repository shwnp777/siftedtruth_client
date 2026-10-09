-- ===========================================================================
-- Sifted Truth — topics can be shown or hidden in the site menu.
-- Run once in Supabase → SQL Editor. Safe to re-run.
-- ===========================================================================

alter table public.topics add column if not exists show_in_nav boolean not null default true;
