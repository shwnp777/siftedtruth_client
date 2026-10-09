export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Supabase's newer dashboards issue a "publishable" key (sb_publishable_…);
// older projects show the "anon" key. Either works here.
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True once .env.local (or Amplify) has the Supabase URL and a public key. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
