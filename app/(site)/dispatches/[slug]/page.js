import Link from 'next/link';
import { notFound } from 'next/navigation';
import RichText from '@/components/RichText';
import { Sources, Corrections } from '@/components/EndMatter';
import { getPost, getSlugs, getSources, getPassagesForPost, listPosts, postHref } from '@/lib/content';
import { formatDate } from '@/lib/format';

export async function generateStaticParams() {
  return (await getSlugs('dispatch')).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost('dispatch', slug);
  return post ? { title: post.title, description: post.dek } : {};
}

export default async function DispatchPage({ params }) {
  const { slug } = await params;
  const post = await getPost('dispatch', slug);
  if (!post) notFound();

  const [sources, passages, more] = await Promise.all([
    getSources(post.source_ids),
    getPassagesForPost(post),
    listPosts({ type: 'dispatch', exclude: post.id, limit: 4 }),
  ]);
  const d = post.dispatch;

  return (
    <article className="wrap" style={{ paddingBottom: 72 }}>
      <div style={{ maxWidth: 'var(--measure)', margin: '0 auto' }}>
        <header style={{ paddingTop: 48 }}>
          <p className="kicker">
            <Link href="/dispatches">Dispatch</Link> · {d.label}
          </p>
          <h1 className="article-title" style={{ fontSize: 40 }}>
            {post.title}
          </h1>
          <div className="byline">
            <span>
              By <strong>{post.author.name}</strong>
            </span>
            <span className="meta-sep">·</span>
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          </div>
        </header>

        <div style={{ marginTop: 32 }}>
          <RichText blocks={post.body} passages={passages} dropcap={false} />
        </div>

        {(d.original_outlet || d.original_url) && (
          <div className="callout" style={{ marginTop: 32, fontFamily: 'var(--sans)', fontSize: 15 }}>
            <p className="label">Original report</p>
            {d.original_url ? (
              <a href={d.original_url} className="text-link" rel="noopener" target="_blank">
                {d.original_outlet} ↗
              </a>
            ) : (
              <span>{d.original_outlet}</span>
            )}
          </div>
        )}

        <div className="endmatter">
          <Sources sources={sources} />
          <Corrections corrections={post.corrections} />
          {more.length > 0 && (
            <section aria-labelledby="more-h">
              <h2 id="more-h">More dispatches</h2>
              <ul className="dispatch-list">
                {more.map((m) => (
                  <li key={m.id}>
                    <Link href={postHref(m)}>
                      <span className="cat">{m.dispatch.label}</span>
                      <span className="title">{m.title}</span>
                      <span className="time">{formatDate(m.published_at, { short: true })}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}

// Re-check the database every 5 minutes (also refreshed instantly when the studio saves).
export const revalidate = 300;
