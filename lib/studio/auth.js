import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * The signed-in admin, or a redirect to the login page.
 * Returns { supabase, user, profile } for use in studio pages and actions.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/studio/login');

  const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
  if (error) redirect(`/studio/login?error=db&detail=${encodeURIComponent(error.message)}`);
  if (!profile) redirect('/studio/login?error=no-profile');
  if (profile.role !== 'admin') redirect('/studio/login?error=not-admin');

  return { supabase, user, profile };
}

/** Same check for server actions: returns null instead of redirecting. */
export async function adminOrNull() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
  return profile?.role === 'admin' ? { supabase, user } : null;
}
