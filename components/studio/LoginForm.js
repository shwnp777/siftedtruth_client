'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/browser';

const MESSAGES = {
  'not-admin': 'That account isn’t an admin. Run supabase/make-admin.sql with its exact email, then sign in again.',
  'no-profile':
    'Signed in, but this account has no profile row. Run supabase/migrations/0001_init.sql again (it backfills profiles), then make-admin.sql.',
  db: 'Signed in, but the database refused to read your profile. Run supabase/migrations/0002_grants.sql in the SQL Editor, then sign in again.',
};

export default function LoginForm({ initialError, detail }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(
    initialError ? `${MESSAGES[initialError] ?? 'Sign-in problem.'}${detail ? ` (Database said: ${detail})` : ''}` : ''
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    router.replace('/studio');
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit}>
      <p className="st-eyebrow">Sifted Truth</p>
      <h1 className="st-h1" style={{ marginBottom: 6 }}>
        Studio
      </h1>
      <p className="st-sub" style={{ marginBottom: 28 }}>
        Sign in to write, publish and correct.
      </p>
      {error && (
        <p className="st-error" role="alert" style={{ marginBottom: 16 }}>
          {error}
        </p>
      )}
      <label className="st-field">
        <span>Email</span>
        <input
          className="st-input"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="st-field">
        <span>Password</span>
        <input
          className="st-input"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" className="st-btn" disabled={busy} style={{ width: '100%', marginTop: 8, minHeight: 46 }}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
