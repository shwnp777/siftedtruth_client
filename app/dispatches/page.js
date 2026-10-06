import Link from 'next/link';
import { listPosts, postHref } from '@/lib/content';
import { formatDate } from '@/lib/format';

export const metadata = {
  title: 'Dispatches',
  description: 'Short, sourced briefs on new discoveries, publications and claims in the news.',
};

export default async function DispatchesPage() {
  const dispatches = await listPosts({ type: 'dispatch' });
  return (
    <div className="wrap">
      <header className="page-head">
        <p className="kicker">News</p>
        <h1>Dispatches</h1>
        <p>Short, sourced briefs on new discoveries, publications and claims making the rounds.</p>
      </header>
      <ul className="list-rows">
        {dispatches.map((d) => (
          <li key={d.id}>
            <Link href={postHref(d)} className="row-link">
              <time className="when" dateTime={d.published_at}>
                {formatDate(d.published_at)}
              </time>
              <div>
                <span className="kicker">{d.dispatch.label}</span>
                <h2>{d.title}</h2>
                {d.dek && <p>{d.dek}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
