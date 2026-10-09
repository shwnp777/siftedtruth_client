import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config';

let client;

/**
 * Anonymous client for the public site. It never touches cookies, so public
 * pages stay statically generated and cacheable. RLS only lets it see
 * published posts.
 */
export function publicClient() {
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
