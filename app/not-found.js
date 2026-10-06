import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap" style={{ padding: '96px 0 120px', textAlign: 'center' }}>
      <p className="kicker">404</p>
      <h1 className="article-title" style={{ marginTop: 12 }}>
        Nothing left in the sieve
      </h1>
      <p className="article-dek" style={{ maxWidth: 520, margin: '16px auto 28px' }}>
        We couldn’t find that page. It may have moved, or it may never have existed.
      </p>
      <Link href="/" className="btn">
        Back to the front page
      </Link>
    </div>
  );
}
