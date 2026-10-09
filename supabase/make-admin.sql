-- Make your account an admin.
-- 1. Supabase Dashboard → Authentication → Users → Add user (email + password, "Auto confirm").
-- 2. Replace the email below with yours, then run this in the SQL Editor.

update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');

-- Check: should return one row with role = admin
select p.id, u.email, p.role
from public.profiles p
join auth.users u on u.id = p.id
where p.role = 'admin';
