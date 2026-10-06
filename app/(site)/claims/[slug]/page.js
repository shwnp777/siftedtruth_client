import Link from 'next/link';
import { notFound } from 'next/navigation';
import RichText, { Inline } from '@/components/RichText';
import { RatingBadge, Confidence, ClaimCard } from '@/components/Cards';
import { Sources, Corrections } from '@/components/EndMatter';
import { getPost, getSlugs, getSources, getPassagesForPost, listPosts } from '@/lib/content';
import { formatDate } from '@/lib/format';

export async function generateStaticParams() {
  return (await getSlugs('claim')).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost('claim', slug);
  return post ? { title: `Claim: ${post.claim.statement}`, description: post.claim.summary } : {};
}

export default async function ClaimPage({ params }) {
  const { slug } = await params;
  const post = await getPost('claim', slug);
  if (!post) notFound();

  const [sources, passages, more, related] = await Promise.all([
    getSources(post.source_ids),
    getPassagesForPost(post),
    listPosts({ type: 'claim', exclude: post.id, limit: 3 }),
    post.related_slug ? getPost('article', post.related_slug) : null,
  ]);
  const c = post.claim;
  const primary = sources.filter((s) => s.kind === 'primary').length;

  return (
    <article>
      <div className="wrap">
        <header className="claim-hero">
          <p className="kicker">
            <Link href="/claims">Claims Examined</Link> · {post.topic.name}
          </p>
          <h1 className="claim-statement">{c.statement}</h1>

          <section className="verdict" aria-label="Verdict">
            <div className="verdict-left">
              <p className="label">Our rating</p>
              <RatingBadge rating={c.rating} large />
              <Confidence level={c.confidence} />
            </div>
            <div>
              <p className="label">In brief</p>
              <p className="verdict-summary">
                <Inline text={c.summary} passages={passages} />
              </p>
            </div>
          </section>

          <div className="claim-meta-row">
            <span>
              <strong>{sources.length}</strong> sources reviewed ({primary} primary)
            </span>
            <span>
              Last reviewed <strong>{formatDate(c.reviewed_at)}</strong>
            </span>
            <span>
              By <strong>{post.author.name}</strong>
            </span>
            <Link href="/standards#ratings" className="text-link" style={{ fontSize: 13 }}>
              How we rate
            </Link>
          </div>
        </header>

        <div style={{ maxWidth: 900, margin: '0 auto', paddingBottom: 72 }}>
          <div className="endmatter">
            <section aria-labelledby="origin-h">
              <h2 id="origin-h">Where this claim comes from</h2>
              <p className="prose no-dropcap" style={{ margin: 0 }}>
                <Inline text={c.origin} passages={passages} />
              </p>
            </section>

            <section aria-labelledby="evidence-h">
              <h2 id="evidence-h">Weighing the evidence</h2>
              <div className="evidence-grid">
                <div className="evidence-col">
                  <h3>Supports the claim</h3>
                  <ul>
                    {c.evidence_for.map((e, i) => (
                      <li key={i}>
                        <Inline text={e} passages={passages} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="evidence-col">
                  <h3>Counts against it</h3>
                  <ul>
                    {c.evidence_against.map((e, i) => (
                      <li key={i}>
                        <Inline text={e} passages={passages} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {post.body.length > 0 && (
              <section aria-labelledby="discussion-h">
                <h2 id="discussion-h">Discussion</h2>
                <RichText blocks={post.body} passages={passages} dropcap={false} />
                {related && (
                  <p style={{ marginTop: 16 }}>
                    <Link href={`/articles/${related.slug}`} className="text-link">
                      Read the long read: {related.title} →
                    </Link>
                  </p>
                )}
              </section>
            )}

            <Sources sources={sources} title="Sources reviewed" />
            <Corrections corrections={post.corrections} />

            {c.history?.length > 0 && (
              <section aria-labelledby="history-h">
                <h2 id="history-h">Review history</h2>
                <ul className="chapters">
                  {c.history.map((h, i) => (
                    <li key={i} style={{ gridTemplateColumns: '140px minmax(0,1fr)' }}>
                      <time dateTime={h.date}>{formatDate(h.date, { short: true })}</time>
                      <span>{h.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <section className="band band-paper" aria-labelledby="more-claims-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="more-claims-h" className="section-title">
                More claims examined
              </h2>
            </div>
            <div className="grid-3">
              {more.map((m) => (
                <ClaimCard key={m.id} post={m} />
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
