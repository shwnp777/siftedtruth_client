import { Inline } from './RichText';
import { citationParts, formatDate, initials } from '@/lib/format';

export function Notes({ footnotes = [], passages }) {
  if (!footnotes.length) return null;
  return (
    <section aria-labelledby="notes-h">
      <h2 id="notes-h">Notes</h2>
      <ol className="notes-list">
        {footnotes.map((f) => (
          <li key={f.n} id={`fn-${f.n}`}>
            <Inline text={f.text} passages={passages} />
            <a href={`#fnref-${f.n}`} className="back" aria-label={`Back to note ${f.n} in text`}>
              ↩
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Sources({ sources = [], title = 'Sources' }) {
  if (!sources.length) return null;
  return (
    <section aria-labelledby="sources-h">
      <h2 id="sources-h">{title}</h2>
      <ul className="source-list">
        {sources.map((s) => {
          const c = citationParts(s);
          return (
            <li key={s.id}>
              <span className={`source-tag ${s.kind}`}>{s.kind}</span>
              <span>
                {c.author}, <cite>{c.title}</cite>
                {c.rest && <>. {c.rest}</>}.
                {s.url && (
                  <>
                    {' '}
                    <a href={s.url} className="text-link" style={{ fontSize: 13 }}>
                      Link
                    </a>
                  </>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Corrections({ corrections = [] }) {
  if (!corrections.length) return null;
  return (
    <section aria-labelledby="corrections-h">
      <h2 id="corrections-h">Corrections</h2>
      <div className="corrections">
        <ul>
          {corrections.map((c, i) => (
            <li key={i}>
              <time dateTime={c.date}>{formatDate(c.date)}</time>
              {c.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AuthorBox({ author }) {
  if (!author) return null;
  return (
    <section aria-labelledby="author-h">
      <h2 id="author-h">About the author</h2>
      <div className="author-box">
        <span className="avatar" aria-hidden="true">
          {initials(author.name)}
        </span>
        <div>
          <div className="name">{author.name}</div>
          {author.role && <div className="meta">{author.role}</div>}
          {author.bio && <p>{author.bio}</p>}
        </div>
      </div>
    </section>
  );
}
