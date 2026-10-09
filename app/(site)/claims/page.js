import { pageMeta } from '@/lib/site';
import Link from 'next/link';
import { ClaimCard, RatingBadge, RATINGS } from '@/components/Cards';
import { notFound } from 'next/navigation';
import { listPosts } from '@/lib/content';

export const metadata = pageMeta({
  title: 'Claims Examined',
  description: 'Popular claims, from every side, rated against the primary evidence.',
  path: '/claims',
});

export default async function ClaimsPage() {
  const claims = await listPosts({ type: 'claim' });
  if (!claims.length) notFound();
  return (
    <>
      <div className="wrap">
        <header className="page-head">
          <p className="kicker">Signature series</p>
          <h1>Claims Examined</h1>
          <p>
            Popular claims, from skeptics and believers alike, rated against the primary evidence. We show our sources and
            update ratings when the evidence changes.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20, alignItems: 'center' }}>
            {Object.keys(RATINGS).map((r) => (
              <RatingBadge key={r} rating={r} />
            ))}
            <Link href="/standards#ratings" className="text-link" style={{ marginLeft: 6 }}>
              How we rate
            </Link>
          </div>
        </header>
      </div>
      <section className="wrap" style={{ paddingBottom: 80 }} aria-label="All reviews">
        <div className="grid-3">
          {claims.map((c) => (
            <ClaimCard key={c.id} post={c} />
          ))}
        </div>
      </section>
    </>
  );
}

// Re-check the database every 5 minutes (also refreshed instantly when the studio saves).
export const revalidate = 300;
