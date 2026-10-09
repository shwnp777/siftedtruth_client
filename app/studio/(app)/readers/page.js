import Link from 'next/link';
import { requireAdmin } from '@/lib/studio/auth';
import { setMessageHandled } from '@/app/studio/actions';
import { shortDate } from '@/components/studio/bits';

export const metadata = { title: 'Readers' };

const TOPIC_LABELS = { general: 'Question or comment', correction: 'Error report', tip: 'Story tip' };

export default async function ReadersPage({ searchParams }) {
  const { tab } = await searchParams;
  const view = tab === 'subscribers' ? 'subscribers' : 'messages';
  const { supabase } = await requireAdmin();

  const [messagesRes, subscribersRes] = await Promise.all([
    supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(500),
    supabase.from('subscribers').select('*').order('created_at', { ascending: false }),
  ]);
  const missing = messagesRes.error || subscribersRes.error;
  const messages = messagesRes.data ?? [];
  const subscribers = subscribersRes.data ?? [];
  const open = messages.filter((m) => !m.handled).length;

  return (
    <div className="st-page">
      <header className="st-head">
        <div>
          <p className="st-eyebrow">Audience</p>
          <h1 className="st-h1">Readers</h1>
          <p className="st-sub">Messages from the contact form and sign-ups for The Weekly Sift.</p>
        </div>
      </header>

      {missing && (
        <p className="st-error" style={{ marginBottom: 16 }}>
          Couldn’t load reader data. If you haven’t yet, run supabase/migrations/0004_readers.sql in the Supabase SQL
          Editor. ({missing.message})
        </p>
      )}

      <nav className="st-tabs" aria-label="Readers">
        <Link href="/studio/readers" aria-current={view === 'messages' ? 'page' : undefined}>
          Messages<span className="count">{open}</span>
        </Link>
        <Link href="/studio/readers?tab=subscribers" aria-current={view === 'subscribers' ? 'page' : undefined}>
          Subscribers<span className="count">{subscribers.length}</span>
        </Link>
      </nav>

      {view === 'messages' &&
        (messages.length === 0 ? (
          <div className="st-card" style={{ textAlign: 'center', padding: 48 }}>
            <p className="st-sub">No messages. They’ll appear here when readers use the contact form.</p>
          </div>
        ) : (
          <div className="st-table-wrap">
            <table className="st-table">
              <thead>
                <tr>
                  <th>Message</th>
                  <th>From</th>
                  <th>Received</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m.id} style={m.handled ? { opacity: 0.55 } : undefined}>
                    <td style={{ maxWidth: 560 }}>
                      <span className="st-type">{TOPIC_LABELS[m.topic] ?? m.topic}</span>
                      <span style={{ display: 'block', whiteSpace: 'pre-wrap', marginTop: 4 }}>{m.body}</span>
                      {m.page_url && (
                        <a href={m.page_url} className="dek" target="_blank" rel="noopener noreferrer">
                          {m.page_url}
                        </a>
                      )}
                    </td>
                    <td className="muted">
                      {m.name || 'Anonymous'}
                      {m.email && (
                        <>
                          <br />
                          <a href={`mailto:${m.email}`}>{m.email}</a>
                        </>
                      )}
                    </td>
                    <td className="muted">{shortDate(m.created_at)}</td>
                    <td>
                      <form action={setMessageHandled.bind(null, m.id, !m.handled)}>
                        <button type="submit" className="st-btn ghost">
                          {m.handled ? 'Reopen' : 'Mark handled'}
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      {view === 'subscribers' &&
        (subscribers.length === 0 ? (
          <div className="st-card" style={{ textAlign: 'center', padding: 48 }}>
            <p className="st-sub">No sign-ups. They’ll appear here when readers subscribe on the home page.</p>
          </div>
        ) : (
          <>
            <div className="st-card" style={{ marginBottom: 16 }}>
              <label className="st-sub" htmlFor="all-emails" style={{ display: 'block', marginBottom: 8 }}>
                Every address, ready to paste into your email tool:
              </label>
              <textarea
                id="all-emails"
                className="st-input"
                readOnly
                rows={3}
                style={{ width: '100%', fontFamily: 'ui-monospace, monospace', fontSize: 13 }}
                defaultValue={subscribers.map((s) => s.email).join(', ')}
              />
            </div>
            <div className="st-table-wrap">
              <table className="st-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Signed up</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s) => (
                    <tr key={s.id}>
                      <td>{s.email}</td>
                      <td className="muted">{shortDate(s.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ))}
    </div>
  );
}
