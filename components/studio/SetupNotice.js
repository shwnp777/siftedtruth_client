import Link from 'next/link';

/** Shown in the studio until Supabase keys are in .env.local. */
export default function SetupNotice() {
  return (
    <div className="st-setup">
      <p className="st-eyebrow">Studio setup</p>
      <h1 className="st-h1">Connect your Supabase project</h1>
      <p className="st-sub" style={{ marginBottom: 24 }}>
        The public site runs on sample data until the database is connected. Four steps:
      </p>
      <div className="st-card">
        <ol>
          <li>
            In Supabase, open <strong>SQL Editor</strong>, paste <code>supabase/migrations/0001_init.sql</code> and run
            it, then <code>0002_grants.sql</code>. Then run <code>supabase/seed.sql</code> for the sample posts (optional).
          </li>
          <li>
            Copy <code>.env.example</code> to <code>.env.local</code> and fill in{' '}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> from{' '}
            <strong>Project Settings → API</strong>.
          </li>
          <li>
            Create your login under <strong>Authentication → Users → Add user</strong>, then run{' '}
            <code>supabase/make-admin.sql</code> with your email.
          </li>
          <li>
            Restart <code>npm run dev</code> and come back to <Link href="/studio">/studio</Link>.
          </li>
        </ol>
      </div>
    </div>
  );
}
