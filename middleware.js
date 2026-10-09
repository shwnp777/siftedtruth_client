import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './lib/supabase/config';

/**
 * Runs only on /studio. Refreshes the Supabase session cookie and sends
 * signed-out visitors to the login page. (Admin role is checked again in the
 * studio layout and enforced by row-level security in the database.)
 */
export async function middleware(request) {
  const url = SUPABASE_URL;
  const key = SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.next(); // not configured yet: studio shows setup steps

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLogin = request.nextUrl.pathname.startsWith('/studio/login');
  if (!user && !isLogin) {
    const login = request.nextUrl.clone();
    login.pathname = '/studio/login';
    login.search = '';
    return NextResponse.redirect(login);
  }
  return response;
}

export const config = {
  matcher: ['/studio/:path*'],
};
