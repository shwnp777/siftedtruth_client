import { pageMeta } from '@/lib/site';
import { VideoCard } from '@/components/Cards';
import { notFound } from 'next/navigation';
import { listPosts } from '@/lib/content';

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const metadata = pageMeta({
  title: 'Watch',
  description: 'On-site tours, claims examined and conversations with scholars.',
  path: '/watch',
});

export default async function WatchPage() {
  const videos = await listPosts({ type: 'video' });
  if (!videos.length) notFound();
  const series = [...new Set(videos.map((v) => v.video.series))];

  return (
    <div className="band-ink" style={{ paddingBottom: 80 }}>
      <div className="wrap">
        <header className="page-head" style={{ borderColor: '#2e3a4d' }}>
          <p className="kicker" style={{ color: 'var(--accent)' }}>
            Video
          </p>
          <h1>Watch</h1>
          <p style={{ color: 'var(--on-ink-2)' }}>On-site tours, claims examined and conversations with scholars.</p>
        </header>
        {series.map((s) => (
          <section key={s} style={{ marginBottom: 56 }} aria-labelledby={`series-${slugify(s)}`}>
            <h2 id={`series-${slugify(s)}`} className="label" style={{ color: 'var(--accent)', marginBottom: 20 }}>
              {s}
            </h2>
            <div className="grid-3">
              {videos
                .filter((v) => v.video.series === s)
                .map((v) => (
                  <VideoCard key={v.id} post={v} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// Re-check the database every 5 minutes (also refreshed instantly when the studio saves).
export const revalidate = 300;
