import { Fragment } from 'react';
import VerseRef from './VerseRef';
import Figure from './Figure';
import { splitReferences } from '@/lib/scripture';
import { VERSIONS, DEFAULT_VERSION } from '@/lib/bible-versions';

const MARKUP = /(\*\*[^*]+\*\*|\*[^*]+\*|\[\^\d+\])/g;

/**
 * Inline text: **bold**, *italic*, [^n] footnote markers, and automatic
 * Scripture references (rendered as hover popovers when `passages` has them).
 */
export function Inline({ text, passages = {} }) {
  if (!text) return null;
  const parts = text.split(MARKUP).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('[^')) {
      const n = part.slice(2, -1);
      return (
        <sup key={i} className="fn-ref" id={`fnref-${n}`}>
          <a href={`#fn-${n}`} aria-label={`Note ${n}`}>
            {n}
          </a>
        </sup>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return (
      <Fragment key={i}>
        {splitReferences(part).map((seg, j) =>
          typeof seg === 'string' ? (
            <Fragment key={j}>{seg}</Fragment>
          ) : passages[seg.ref.key] ? (
            <VerseRef
              key={j}
              label={seg.raw}
              passages={passages[seg.ref.key]}
              versions={VERSIONS}
              defaultVersion={DEFAULT_VERSION}
            />
          ) : (
            <Fragment key={j}>{seg.raw}</Fragment>
          )
        )}
      </Fragment>
    );
  });
}

/** Renders a post body (array of blocks). */
export default function RichText({ blocks = [], passages, dropcap = true, className = '' }) {
  return (
    <div className={`prose ${dropcap ? '' : 'no-dropcap'} ${className}`.trim()}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return <h2 key={i}>{b.text}</h2>;
          case 'h3':
            return <h3 key={i}>{b.text}</h3>;
          case 'quote':
            return (
              <blockquote key={i}>
                <Inline text={b.text} passages={passages} />
                {b.cite && <cite>— {b.cite}</cite>}
              </blockquote>
            );
          case 'list':
            return (
              <ul key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} passages={passages} />
                  </li>
                ))}
              </ul>
            );
          case 'callout':
            return (
              <aside key={i} className="callout">
                {b.title && <p className="label">{b.title}</p>}
                <Inline text={b.text} passages={passages} />
              </aside>
            );
          case 'figure':
            return <Figure key={i} image={b} ratio="3 / 2" />;
          default:
            return (
              <p key={i}>
                <Inline text={b.text} passages={passages} />
              </p>
            );
        }
      })}
    </div>
  );
}
