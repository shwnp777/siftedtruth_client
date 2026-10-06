import Link from 'next/link';
import Figure from '@/components/Figure';
import NewsletterForm from '@/components/NewsletterForm';
import { StoryCard, VideoCard, ClaimCard } from '@/components/Cards';
import { getHome, postHref } from '@/lib/content';
import { formatDate } from '@/lib/format';

export default async function HomePage() {
  const { lead, articles, dispatches, videos, claims, topics } = await getHome();

  return (
    <>
      <h1 className="sr-only">Sifted Truth</h1>

      {/* Lead story + latest dispatches */}
      <section className="wrap lead-grid" aria-label="Top stories">
        {lead && (
          <article className="lead-story">
            <Link href={postHref(lead)}>
              <Figure image={lead.hero} ratio="16 / 9" caption={false} priority />
            </Link>
            <p className="kicker">
              <Link href={`/topics/${lead.topic.slug}`}>{lead.topic.name}</Link> · Long read
            </p>
            <h2 className="lead-title">
              <Link href={postHref(lead)}>{lead.title}</Link>
            </h2>
            <p className="lead-dek">{lead.dek}</p>
            <p className="meta">
              By {lead.author.name}
              <span className="meta-sep">·</span>
              {lead.reading_minutes} min read
              <span className="meta-sep">·</span>
              {lead.source_ids.length} sources
            </p>
          </article>
        )}

        <aside className="dispatch-rail" aria-labelledby="dispatches-h">
          <h2 id="dispatches-h" className="label">
            Latest Dispatches
          </h2>
          <div className="accent-bar" />
          <ul className="dispatch-list">
            {dispatches.map((d) => (
              <li key={d.id}>
                <Link href={postHref(d)}>
                  <span className="cat">{d.dispatch.label}</span>
                  <span className="title">{d.title}</span>
                  <span className="time">{formatDate(d.published_at, { short: true })}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/dispatches" className="text-link" style={{ marginTop: 12 }}>
            All dispatches →
          </Link>
        </aside>
      </section>

      {/* More reading */}
      {articles.length > 0 && (
        <section className="wrap" style={{ paddingBottom: 64 }} aria-labelledby="reading-h">
          <div className="section-head" style={{ borderTop: '2px solid var(--ink)', paddingTop: 16 }}>
            <h2 id="reading-h" className="section-title">
              More reading
            </h2>
          </div>
          <div className="grid-3">
            {articles.map((p) => (
              <StoryCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* Watch */}
      <section className="band band-ink" aria-labelledby="watch-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="watch-h" className="section-title">
              Watch
            </h2>
            <Link href="/watch" className="text-link">
              All episodes →
            </Link>
          </div>
          <div className="grid-3">
            {videos.map((v) => (
              <VideoCard key={v.id} post={v} />
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="band" aria-labelledby="topics-h">
        <div className="wrap">
          <h2 id="topics-h" className="section-title" style={{ marginBottom: 28 }}>
            Explore the archive
          </h2>
          <div className="grid-4">
            {topics.map((t) => (
              <Link key={t.id} href={`/topics/${t.slug}`} className="topic-card">
                <span className="name">{t.name}</span>
                <span className="desc">{t.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Claims Examined */}
      <section className="band band-paper" aria-labelledby="claims-h">
        <div className="wrap">
          <p className="kicker" style={{ marginBottom: 6 }}>
            Signature series
          </p>
          <div className="section-head" style={{ marginBottom: 8 }}>
            <h2 id="claims-h" className="section-title">
              Claims Examined
            </h2>
            <Link href="/claims" className="text-link">
              All reviews →
            </Link>
          </div>
          <p
            style={{
              margin: '0 0 28px',
              fontFamily: 'var(--serif)',
              fontSize: 19,
              color: 'var(--text-2)',
              maxWidth: 640,
            }}
          >
            Popular claims, from every side, rated against the primary evidence.{' '}
            <Link href="/standards#ratings" style={{ borderBottom: '1px solid var(--accent)' }}>
              How we rate
            </Link>
          </p>
          <div className="grid-3">
            {claims.map((c) => (
              <ClaimCard key={c.id} post={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="wrap newsletter" aria-labelledby="newsletter-h">
        <h2 id="newsletter-h">The Weekly Sift</h2>
        <p>The week’s discoveries, debates and dispatches, sifted into one Sunday letter.</p>
        <NewsletterForm />
      </section>
    </>
  );
}
