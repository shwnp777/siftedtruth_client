import Link from 'next/link';
import { notFound } from 'next/navigation';
import VideoPlayer from '@/components/VideoPlayer';
import RichText from '@/components/RichText';
import { VideoCard } from '@/components/Cards';
import { Sources } from '@/components/EndMatter';
import { getPost, getSlugs, getSources, getPassagesForPost, listPosts } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { YOUTUBE_URL, pageMeta } from '@/lib/site';

export async function generateStaticParams() {
  return (await getSlugs('video')).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost('video', slug);
  if (!post) return {};
  const meta = pageMeta({ title: post.title, description: post.dek, path: `/watch/${slug}`, type: 'video.other' });
  meta.openGraph.videos = [{ url: `https://www.youtube.com/embed/${post.video.youtube_id}` }];
  return meta;
}

export default async function VideoPage({ params }) {
  const { slug } = await params;
  const post = await getPost('video', slug);
  if (!post) notFound();

  const [sources, passages, more] = await Promise.all([
    getSources(post.source_ids),
    getPassagesForPost(post),
    listPosts({ type: 'video', exclude: post.id, limit: 3 }),
  ]);
  const v = post.video;

  return (
    <article>
      <div className="band-ink" style={{ padding: '40px 0 48px' }}>
        <div className="wrap" style={{ maxWidth: 1120 }}>
          <VideoPlayer youtubeId={v.youtube_id} title={post.title} />
          <p className="kicker" style={{ color: 'var(--accent)', marginTop: 24 }}>
            <Link href="/watch">{v.series || 'Watch'}</Link>
            {v.duration && ` · ${v.duration}`}
          </p>
          <h1 className="article-title" style={{ fontSize: 42, color: 'var(--on-ink)' }}>
            {post.title}
          </h1>
          <p className="article-dek" style={{ color: 'var(--on-ink-2)', fontSize: 20 }}>
            {post.dek}
          </p>
          <p className="meta" style={{ color: 'var(--on-ink-2)', marginTop: 14 }}>
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            <span className="meta-sep">·</span>
            <Link href={`/topics/${post.topic.slug}`}>{post.topic.name}</Link>
          </p>
        </div>
      </div>

      <div className="wrap article-layout">
        <div>
          <h2 className="label" style={{ marginBottom: 14 }}>
            Show notes
          </h2>
          <RichText blocks={post.body} passages={passages} dropcap={false} />

          <div className="endmatter">
            {v.chapters?.length > 0 && (
              <section aria-labelledby="chapters-h">
                <h2 id="chapters-h">Chapters</h2>
                <ol className="chapters">
                  {v.chapters.map((c) => (
                    <li key={c.t}>
                      <time>{c.t}</time>
                      <span>{c.label}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
            <Sources sources={sources} />
            {v.transcript?.length > 0 && (
              <details className="transcript">
                <summary>Transcript</summary>
                <RichText blocks={v.transcript} passages={passages} dropcap={false} />
              </details>
            )}
          </div>
        </div>
        <aside className="article-aside" aria-label="About this episode">
          <div className="aside-sticky">
            <div className="aside-block">
              <p className="label">Series</p>
              <div className="aside-stat" style={{ fontSize: 24 }}>
                {v.series}
              </div>
            </div>
            <div className="aside-block">
              <p className="label">Also on</p>
              <ul>
                <li>
                  <a href={`https://www.youtube.com/watch?v=${v.youtube_id}`} target="_blank" rel="noopener noreferrer">
                    Watch on YouTube ↗
                  </a>
                </li>
                {YOUTUBE_URL && (
                  <li>
                    <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                      Our channel ↗
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {more.length > 0 && (
        <section className="band band-ink" aria-labelledby="more-videos-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="more-videos-h" className="section-title">
                More episodes
              </h2>
            </div>
            <div className="grid-3">
              {more.map((m) => (
                <VideoCard key={m.id} post={m} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

// Re-check the database every 5 minutes (also refreshed instantly when the studio saves).
export const revalidate = 300;
