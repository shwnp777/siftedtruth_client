import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StoryCard } from '@/components/Cards';
import { getTopic, getTopics, listPosts, postHref, TYPE_LABELS } from '@/lib/content';
import { formatDate } from '@/lib/format';

export async function generateStaticParams() {
  return (await getTopics()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topic = await getTopic(slug);
  return topic ? { title: topic.name, description: topic.description } : {};
}

export default async function TopicPage({ params }) {
  const { slug } = await params;
  const topic = await getTopic(slug);
  if (!topic) notFound();

  const [posts, topics] = await Promise.all([listPosts({ topicSlug: slug }), getTopics()]);
  const articles = posts.filter((p) => p.type === 'article');
  const rest = posts.filter((p) => p.type !== 'article');

  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <header className="page-head">
        <p className="kicker">Topic</p>
        <h1>{topic.name}</h1>
        <p>{topic.description}</p>
      </header>

      <nav className="chips" aria-label="Topics">
        {topics.map((t) => (
          <Link key={t.id} href={`/topics/${t.slug}`} className="chip" aria-current={t.slug === slug ? 'true' : undefined}>
            {t.name}
          </Link>
        ))}
      </nav>

      {articles.length > 0 && (
        <section aria-labelledby="topic-articles-h" style={{ marginBottom: 56 }}>
          <h2 id="topic-articles-h" className="label" style={{ marginBottom: 20 }}>
            Articles
          </h2>
          <div className="grid-3">
            {articles.map((p) => (
              <StoryCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section aria-labelledby="topic-more-h">
          <h2 id="topic-more-h" className="label" style={{ marginBottom: 4 }}>
            Dispatches, video and claims
          </h2>
          <ul className="list-rows">
            {rest.map((p) => (
              <li key={p.id}>
                <Link href={postHref(p)} className="row-link">
                  <time className="when" dateTime={p.published_at}>
                    {formatDate(p.published_at)}
                  </time>
                  <div>
                    <span className="type-tag">{TYPE_LABELS[p.type]}</span>
                    <h2>{p.title}</h2>
                    {p.dek && <p>{p.dek}</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {posts.length === 0 && <p className="meta">Nothing published here yet.</p>}
    </div>
  );
}

// Re-check the database every 5 minutes (also refreshed instantly when the studio saves).
export const revalidate = 300;
