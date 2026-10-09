-- ===========================================================================
-- Sifted Truth — launch cleanup. Run in Supabase → SQL Editor. Safe to re-run.
--
-- Nothing is deleted. Sample posts go back to Draft so they leave the site but
-- stay in the studio (delete them there whenever you like), and leftover
-- bracketed placeholders are cleared.
-- ===========================================================================

-- 1. Sample posts and videos without a YouTube ID → Draft.
update public.posts
set status = 'draft'
where status in ('published', 'scheduled')
  and (
    title ilike '[Sample]%'
    or body::text ilike '%placeholder%'
    or (type = 'video' and coalesce(video->>'youtube_id', '') = '')
  );

-- 2. Placeholder photo credits such as "[Photo credit]".
update public.posts
set hero = hero - 'credit'
where hero->>'credit' ~ '^\s*\[.*\]\s*$';

-- 3. Placeholder author bio ("[Your bio]"). Write your real one here or in
--    Supabase → Table Editor → authors.
update public.authors
set bio = null
where bio ~ '^\s*\[.*\]\s*$';

-- Check: anything still live that looks unfinished? Expect no rows.
select type, slug, title, status
from public.posts
where status in ('published', 'scheduled')
  and (title ilike '%[%' or body::text ~* '\[(add|your|image|photo|sample|transcript|guest)');
