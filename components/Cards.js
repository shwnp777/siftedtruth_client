import Link from 'next/link';
import Figure from './Figure';
import PlayDot from './PlayDot';
import { postHref } from '@/lib/content';
import { formatDate } from '@/lib/format';

export const RATINGS = {
  well_supported: { label: 'Well supported', short: 'Well supported' },
  debated: { label: 'Debated', short: 'Debated' },
  not_supported: { label: 'Not supported', short: 'Not supported' },
  insufficient: { label: 'Insufficient evidence', short: 'Insufficient' },
};

const CONFIDENCE = { low: 1, moderate: 2, high: 3 };

export function RatingBadge({ rating, large = false }) {
  const r = RATINGS[rating] ?? RATINGS.insufficient;
  return <span className={`badge ${rating}${large ? ' lg' : ''}`}>{r.label}</span>;
}

export function Confidence({ level }) {
  const n = CONFIDENCE[level] ?? 0;
  return (
    <span className="confidence">
      <span className="confidence-bars" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={i <= n ? 'on' : ''} />
        ))}
      </span>
      <span>
        {level ? level[0].toUpperCase() + level.slice(1) : 'Unrated'} confidence
      </span>
    </span>
  );
}

export function StoryCard({ post, showImage = true }) {
  return (
    <Link href={postHref(post)} className="story-card">
      {showImage && <Figure image={post.hero} ratio="3 / 2" caption={false} />}
      <p className="kicker">{post.topic?.name}</p>
      <h3>{post.title}</h3>
      {post.dek && <p>{post.dek}</p>}
      <div className="meta">
        {formatDate(post.published_at)}
        {post.reading_minutes && (
          <>
            <span className="meta-sep">·</span>
            {post.reading_minutes} min read
          </>
        )}
      </div>
    </Link>
  );
}

export function VideoCard({ post }) {
  return (
    <Link href={postHref(post)} className="video-card">
      <div className="video-thumb">
        <Figure image={{ src: post.video.thumbnail ?? null, alt: post.title }} dark caption={false}>
          <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PlayDot />
          </span>
          {post.video.duration && <span className="duration">{post.video.duration}</span>}
        </Figure>
      </div>
      <p className="series">{post.video.series}</p>
      <p className="title">{post.title}</p>
    </Link>
  );
}

export function ClaimCard({ post }) {
  return (
    <Link href={postHref(post)} className="claim-card">
      <RatingBadge rating={post.claim.rating} />
      <span className="statement">{post.claim.statement}</span>
      <Confidence level={post.claim.confidence} />
      <span className="meta">
        {[
          post.source_ids.length > 0 && `${post.source_ids.length} sources reviewed`,
          post.claim.reviewed_at && `Updated ${formatDate(post.claim.reviewed_at, { short: true })}`,
        ]
          .filter(Boolean)
          .join(' · ')}
      </span>
    </Link>
  );
}
