import Link from 'next/link';
import Icon from '@/components/studio/Icon';
import { StatusPill, shortDate } from '@/components/studio/bits';
import { RatingBadge } from '@/components/Cards';
import { requireAdmin } from '@/lib/studio/auth';
import { listAllPosts } from '@/lib/studio/data';
import { TYPES, STATUSES, typeLabel } from '@/lib/studio/schema';

export const metadata = { title: 'Posts' };

function href(base, params) {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v));
  const s = q.toString();
  return s ? `${base}?${s}` : base;
}

export default async function PostsPage({ searchParams }) {
  const { type, status, q, deleted } = await searchParams;
  const { supabase } = await requireAdmin();
  const all = await listAllPosts(supabase, { q });
  const ofType = type ? all.filter((p) => p.type === type) : all;
  const posts = status ? ofType.filter((p) => p.status === status) : ofType;
  const current = TYPES.find((t) => t.id === type);

  return (
    <div className="st-page">
      <header className="st-head">
        <div>
          <p className="st-eyebrow">Content</p>
          <h1 className="st-h1">{current ? current.plural : 'All posts'}</h1>
        </div>
        <Link href={`/studio/posts/new?type=${type || 'article'}`} className="st-btn gold">
          <Icon name="plus" />
          New {current ? current.label.toLowerCase() : 'article'}
        </Link>
      </header>

      {deleted && (
        <p className="st-ok" style={{ marginBottom: 16 }}>
          Post deleted.
        </p>
      )}

      <nav className="st-tabs" aria-label="Post type">
        <Link href={href('/studio/posts', { status, q })} aria-current={!type ? 'page' : undefined}>
          All<span className="count">{all.length}</span>
        </Link>
        {TYPES.map((t) => (
          <Link key={t.id} href={href('/studio/posts', { type: t.id, status, q })} aria-current={type === t.id ? 'page' : undefined}>
            {t.plural}
            <span className="count">{all.filter((p) => p.type === t.id).length}</span>
          </Link>
        ))}
      </nav>

      <div className="st-toolbar">
        <div className="st-chips" role="group" aria-label="Status">
          <Link href={href('/studio/posts', { type, q })} aria-current={!status ? 'true' : undefined}>
            Any status
          </Link>
          {STATUSES.map((s) => (
            <Link key={s.id} href={href('/studio/posts', { type, status: s.id, q })} aria-current={status === s.id ? 'true' : undefined}>
              {s.label} ({ofType.filter((p) => p.status === s.id).length})
            </Link>
          ))}
        </div>
        <form className="st-search" action="/studio/posts" role="search">
          {type && <input type="hidden" name="type" value={type} />}
          {status && <input type="hidden" name="status" value={status} />}
          <label htmlFor="post-search" className="sr-only">
            Search titles
          </label>
          <input id="post-search" className="st-input" name="q" defaultValue={q} placeholder="Search titles…" />
          <button type="submit" className="st-btn ghost" aria-label="Search">
            <Icon name="search" />
          </button>
        </form>
      </div>

      {posts.length === 0 ? (
        <div className="st-card" style={{ textAlign: 'center', padding: 48 }}>
          <p className="st-sub" style={{ marginBottom: 16 }}>
            {q ? `No posts match “${q}”.` : 'Nothing here yet.'}
          </p>
          <Link href={`/studio/posts/new?type=${type || 'article'}`} className="st-btn">
            Start writing
          </Link>
        </div>
      ) : (
        <div className="st-table-wrap">
          <table className="st-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Topic</th>
                <th>Status</th>
                <th>Published</th>
                <th>Edited</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <span className="st-type">{typeLabel(p.type)}</span>
                    {p.featured && (
                      <span className="st-type" style={{ color: 'var(--muted-2)', marginLeft: 8 }}>
                        ★ Featured
                      </span>
                    )}
                    <Link href={`/studio/posts/${p.id}`} className="title">
                      {p.title || 'Untitled'}
                    </Link>
                    {p.type === 'claim' && p.claim?.rating ? (
                      <span style={{ display: 'inline-block', marginTop: 6 }}>
                        <RatingBadge rating={p.claim.rating} />
                      </span>
                    ) : (
                      p.dek && <span className="dek">{p.dek}</span>
                    )}
                  </td>
                  <td className="muted">{p.topic?.name ?? '—'}</td>
                  <td>
                    <StatusPill status={p.status} publishedAt={p.published_at} />
                  </td>
                  <td className="muted">{shortDate(p.published_at)}</td>
                  <td className="muted">{shortDate(p.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
