'use client';

import RichText, { Inline } from '@/components/RichText';
import { RATING_OPTIONS, CONFIDENCE_OPTIONS, typeLabel } from '@/lib/studio/schema';

const CONF = { low: 1, moderate: 2, high: 3 };

/** Live preview using the public site's own components and styles. */
export default function Preview({ post, topic, passages, loading }) {
  const c = post.claim;
  return (
    <aside className="ed-preview" aria-label="Preview">
      <div className="ed-preview-label">
        <span>Preview · {typeLabel(post.type)}</span>
        <span>{loading ? 'Loading verses…' : 'Hover a reference to test it'}</span>
      </div>

      <p className="kicker">{topic?.name ?? 'No topic'}</p>

      {post.type === 'claim' && c ? (
        <>
          <h1 className="claim-statement" style={{ fontSize: 34 }}>
            {c.statement || 'The claim'}
          </h1>
          <div className="verdict" style={{ gridTemplateColumns: '1fr', gap: 16, padding: 22 }}>
            <div className="verdict-left" style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
              <span className={`badge ${c.rating}`}>{RATING_OPTIONS.find((r) => r.id === c.rating)?.label}</span>
              <span className="confidence">
                <span className="confidence-bars" aria-hidden="true">
                  {[1, 2, 3].map((i) => (
                    <span key={i} className={i <= (CONF[c.confidence] ?? 0) ? 'on' : ''} />
                  ))}
                </span>
                {CONFIDENCE_OPTIONS.find((o) => o.id === c.confidence)?.label} confidence
              </span>
            </div>
            <p className="verdict-summary" style={{ margin: 0, fontSize: 18 }}>
              <Inline text={c.summary || 'Summary of the verdict.'} passages={passages} />
            </p>
          </div>
          {(c.evidence_for?.length > 0 || c.evidence_against?.length > 0) && (
            <div className="evidence-grid" style={{ marginTop: 20 }}>
              <div className="evidence-col">
                <h3>Supports the claim</h3>
                <ul>
                  {(c.evidence_for ?? []).filter(Boolean).map((e, i) => (
                    <li key={i}>
                      <Inline text={e} passages={passages} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="evidence-col">
                <h3>Counts against it</h3>
                <ul>
                  {(c.evidence_against ?? []).filter(Boolean).map((e, i) => (
                    <li key={i}>
                      <Inline text={e} passages={passages} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="article-title">{post.title || 'Untitled'}</h1>
          {post.dek && <p className="article-dek">{post.dek}</p>}
        </>
      )}

      <RichText
        blocks={(post.body ?? []).filter((b) => b.text || b.items?.some(Boolean) || b.title)}
        passages={passages}
        dropcap={post.type === 'article'}
      />

      {post.footnotes?.length > 0 && (
        <div className="endmatter" style={{ marginTop: 36 }}>
          <section>
            <h2>Notes</h2>
            <ol className="notes-list">
              {post.footnotes.map((f, i) => (
                <li key={i} id={`fn-${i + 1}`}>
                  <Inline text={f.text} passages={passages} />
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}
    </aside>
  );
}
