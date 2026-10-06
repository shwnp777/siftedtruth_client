import '../studio.css';
import LoginForm from '@/components/studio/LoginForm';
import SetupNotice from '@/components/studio/SetupNotice';
import { LogoMark } from '@/components/Logo';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export const metadata = { title: 'Studio sign in', robots: { index: false } };

export default async function LoginPage({ searchParams }) {
  if (!isSupabaseConfigured) return <SetupNotice />;
  const { error } = await searchParams;
  return (
    <div className="st-login">
      <div className="st-login-art">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LogoMark size={40} ink="var(--on-ink)" />
          <span style={{ fontFamily: 'var(--serif)', fontSize: 24 }}>Sifted Truth</span>
        </div>
        <blockquote>
          “Prove all things; hold fast that which is good.”
          <cite>1 THESSALONIANS 5:21 · KJV</cite>
        </blockquote>
      </div>
      <div className="st-login-form">
        <LoginForm initialError={error} />
      </div>
    </div>
  );
}
