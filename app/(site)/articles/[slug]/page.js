import Link from 'next/link';
import { notFound } from 'next/navigation';
import Figure from '@/components/Figure';
import RichText from '@/components/RichText';
import { StoryCard } from '@/components/Cards';
import { Notes, Sources, Corrections, AuthorBox } from '@/components/EndMatter';
import { getPost, getSlugs, getSources, getPassagesForPost, listPosts } from '@/lib/content';
import { formatDate } from '@/lib/format';
import { pageMeta } from '@/lib/site';

export async function generateStaticParams() {
  return (await getSlugs('article')).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost('article', slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.dek,
    path: `/articles/${slug}`,
    type: 'article',
    article: {
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: post.author?.name ? [post.author.name] : undefined,
      section: post.topic?.name,
    },
  });
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = await getPost('article', slug);
  if (!post) notFound();

  const [sources, passages, related] = await Promise.all([
    getSources(post.source_ids),
    getPassagesForPost(post),
    listPosts({ type: 'article', exclude: post.id, limit: 3 }),
  ]);
  const verseLabels = Object.values(passages).map((p) => Object.values(p)[0]?.label).filter(Boolean);
  const primaryCount = sources.filter((s) => s.kind === 'primary').length;
  const updated = post.updated_at !== post.published_at;

  return (
    <article>
      <header className="wrap">
        <div className="article-head">
          <p className="kicker breadcrumb">
            <Link href={`/topics/${post.topic.slug}`}>{post.topic.name}</Link>
          </p>
          <h1 className="article-title">{post.title}</h1>
          <p className="article-dek">{post.dek}</p>
          <div className="byline">
            <span>
              By <strong>{post.author.name}</strong>
            </span>
            <span className="meta-sep">·</span>
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            {updated && (
              <>
                <span className="meta-sep">·</span>
                <span>Updated {formatDate(post.updated_at, { short: true })}</span>
              </>
            )}
            {post.reading_minutes && (
              <>
                <span className="meta-sep">·</span>
                <span>{post.reading_minutes} min read</span>
              </>
            )}
            {sources.length > 0 && (
              <>
                <span className="meta-sep">·</span>
                <a href="#sources-h">{sources.length} sources</a>
              </>
            )}
          </div>
        </div>
        <div className="article-hero">
          <Figure image={post.hero} ratio="16 / 9" priority />
        </div>
      </header>

      <div className="wrap article-layout">
        <div>
          <RichText blocks={post.body} passages={passages} />
          <div className="endmatter">
            <Notes footnotes={post.footnotes} passages={passages} />
            <Sources sources={sources} />
            <Corrections corrections={post.corrections} />
            <AuthorBox author={post.author} />
          </div>
        </div>

        <aside className="article-aside" aria-label="About this article">
          <div className="aside-sticky">
            {sources.length > 0 && (
            <div className="aside-block">
              <p className="label">Sourcing</p>
              <div className="aside-stat">{sources.length}</div>
              <div className="meta" style={{ marginTop: 6 }}>
                sources · {primaryCount} primary
              </div>
              <a href="#sources-h" className="text-link" style={{ marginTop: 12, fontSize: 13 }}>
                View sources
              </a>
            </div>
            )}
            {verseLabels.length > 0 && (
              <div className="aside-block">
                <p className="label">Scripture in this article</p>
                <ul>
                  {verseLabels.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
                <p className="meta" style={{ marginTop: 10, fontSize: 13 }}>
                  Hover or tap any reference to read it.
                </p>
              </div>
            )}
            <div className="aside-block">
              <p className="label">Our standards</p>
              <p style={{ margin: 0, color: 'var(--muted)' }}>
                We correct errors openly.{' '}
                <Link href="/standards#corrections" style={{ borderBottom: '1px solid var(--accent)' }}>
                  Corrections policy
                </Link>
              </p>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="band band-paper" aria-labelledby="related-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="related-h" className="section-title">
                Keep reading
              </h2>
            </div>
            <div className="grid-3">
              {related.map((p) => (
                <StoryCard key={p.id} post={p} />
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
