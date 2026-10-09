-- ===========================================================================
-- Sifted Truth — explicit API grants
-- Newer Supabase projects don't automatically expose new tables to the API
-- roles. This grants them explicitly. Row-level security (from 0001) still
-- decides which rows each person can see or change. Safe to re-run.
-- ===========================================================================

grant usage on schema public to anon, authenticated;

grant select on public.topics, public.authors, public.sources, public.posts, public.post_sources, public.verses
  to anon, authenticated;

grant select, insert, update, delete on public.topics, public.authors, public.sources, public.posts,
  public.post_sources, public.verses
  to authenticated;

grant select, update on public.profiles to authenticated;

grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Check your admin account (replace the email). Expect: role = admin.
-- If this returns no row, the user and profile don't match: re-run
-- make-admin.sql with the exact email shown under Authentication → Users.
-- ---------------------------------------------------------------------------
-- select u.email, p.role
-- from auth.users u
-- left join public.profiles p on p.id = u.id
-- where u.email = 'you@example.com';
