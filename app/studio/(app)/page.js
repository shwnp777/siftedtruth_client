import Link from 'next/link';
import Icon from '@/components/studio/Icon';
import { StatusPill, shortDate, dateTime } from '@/components/studio/bits';
import { requireAdmin } from '@/lib/studio/auth';
import { getDashboard } from '@/lib/studio/data';
import { TYPES, typeLabel } from '@/lib/studio/schema';

export const metadata = { title: 'Dashboard' };

const ICONS = { article: 'article', dispatch: 'dispatch', video: 'video', claim: 'claim' };

export default async function Dashboard() {
  const { supabase, profile, user } = await requireAdmin();
  const d = await getDashboard(supabase);
  const name = profile?.display_name || user.email.split('@')[0];
  const hour = Number(new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'America/New_York' }));
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="st-page">
      <header className="st-head">
        <div>
          <p className="st-eyebrow">Dashboard</p>
          <h1 className="st-h1">
            {greeting}, {name}.
          </h1>
          <p className="st-sub">
            {d.draftCount > 0
              ? `${d.draftCount} draft${d.draftCount === 1 ? '' : 's'} in progress.`
              : 'No drafts in progress. Start something new.'}
            {d.scheduled.length > 0 && ` ${d.scheduled.length} scheduled.`}
          </p>
        </div>
      </header>

      <div className="st-create">
        {TYPES.map((t) => (
          <Link key={t.id} href={`/studio/posts/new?type=${t.id}`}>
            <span className="t">
              <Icon name={ICONS[t.id]} />
              New {t.label.toLowerCase()}
            </span>
            <span className="d">{t.blurb}</span>
          </Link>
        ))}
      </div>

      <div className="st-tiles">
        <div className="st-card st-tile">
          <div className="n">{d.published}</div>
          <div className="k">Live on the site</div>
        </div>
        <div className="st-card st-tile">
          <div className="n">{d.draftCount}</div>
          <div className="k">Drafts</div>
        </div>
        <div className="st-card st-tile">
          <div className="n">{d.scheduled.length}</div>
          <div className="k">Scheduled</div>
        </div>
        <div className="st-card st-tile">
          <div className="n">{d.total}</div>
          <div className="k">
            {d.byType.map((t) => `${t.n} ${typeLabel(t.type).toLowerCase()}${t.n === 1 ? '' : 's'}`).join(' · ')}
          </div>
        </div>
      </div>

      <div className="st-grid-2">
        <section className="st-card">
          <h2 className="st-h2">Continue editing</h2>
          {d.drafts.length === 0 ? (
            <p className="st-empty">Nothing in draft.</p>
          ) : (
            <ul className="st-list">
              {d.drafts.map((p) => (
                <li key={p.id}>
                  <Link href={`/studio/posts/${p.id}`}>
                    <span>
                      <span className="st-type">{typeLabel(p.type)}</span>
                      <br />
                      {p.title || 'Untitled'}
                    </span>
                    <span className="when">Edited {shortDate(p.updated_at)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {d.scheduled.length > 0 && (
            <section className="st-card">
              <h2 className="st-h2">Scheduled</h2>
              <ul className="st-list">
                {d.scheduled.map((p) => (
                  <li key={p.id}>
                    <Link href={`/studio/posts/${p.id}`}>
                      <span>{p.title}</span>
                      <span className="when">{dateTime(p.published_at)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="st-card">
            <h2 className="st-h2">Recently published</h2>
            {d.recent.length === 0 ? (
              <p className="st-empty">Nothing published yet.</p>
            ) : (
              <ul className="st-list">
                {d.recent.map((p) => (
                  <li key={p.id}>
                    <Link href={`/studio/posts/${p.id}`}>
                      <span>{p.title}</span>
                      <span className="when">{shortDate(p.published_at)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
          {d.claimsDue.length > 0 && (
            <section className="st-card">
              <h2 className="st-h2">Claims due for review</h2>
              <p className="st-empty" style={{ paddingTop: 0 }}>
                Not reviewed in six months:
              </p>
              <ul className="st-list">
                {d.claimsDue.map((p) => (
                  <li key={p.id}>
                    <Link href={`/studio/posts/${p.id}`}>
                      <span>{p.title}</span>
                      <StatusPill status={p.status} publishedAt={p.published_at} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
