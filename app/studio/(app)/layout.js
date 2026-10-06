import '../studio.css';
import { Suspense } from 'react';
import Link from 'next/link';
import StudioNav from '@/components/studio/StudioNav';
import SetupNotice from '@/components/studio/SetupNotice';
import { LogoMark } from '@/components/Logo';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { requireAdmin } from '@/lib/studio/auth';
import { signOut } from '../actions';

export const metadata = {
  title: { default: 'Studio', template: '%s · Studio' },
  robots: { index: false, follow: false },
};

export default async function StudioLayout({ children }) {
  if (!isSupabaseConfigured) return <SetupNotice />;
  const { user, profile } = await requireAdmin();

  return (
    <div className="st-shell">
      <aside className="st-side">
        <Link href="/studio" className="st-brand">
          <LogoMark size={34} ink="var(--on-ink)" />
          <span>
            <span className="name">Sifted Truth</span>
            <span className="tag">Studio</span>
          </span>
        </Link>
        <Suspense>
          <StudioNav />
        </Suspense>
        <div className="st-side-foot">
          <div className="who">{profile?.display_name || user.email}</div>
          <div style={{ fontSize: 12, color: '#7f8a9c' }}>{user.email}</div>
          <form action={signOut}>
            <button type="submit">Sign out</button>
          </form>
        </div>
      </aside>
      <div className="st-main">{children}</div>
    </div>
  );
}
