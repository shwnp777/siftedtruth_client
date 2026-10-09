'use client';

import { Fragment } from 'react';
import Icon from '../Icon';
import { AutoTextarea } from './fields';
import { BLOCK_TYPES } from '@/lib/studio/schema';
import { splitReferences } from '@/lib/scripture';

const PLACEHOLDER = {
  p: 'Write… Scripture references like John 1:1–3 are linked automatically. Use [^1] for a footnote.',
  h2: 'Section heading',
  h3: 'Subheading',
  quote: 'Quoted text',
  list: 'One item per line',
  callout: 'Callout text',
};

function newBlock(type) {
  if (type === 'list') return { type, items: [''] };
  if (type === 'callout') return { type, title: '', text: '' };
  if (type === 'quote') return { type, text: '', cite: '' };
  return { type, text: '' };
}

/** Convert a block to another type, keeping its text. */
function convert(block, type) {
  const text = block.text ?? (block.items ?? []).join('\n');
  if (type === 'list') return { type, items: text.split('\n') };
  if (type === 'callout') return { type, title: block.title ?? '', text };
  if (type === 'quote') return { type, text, cite: block.cite ?? '' };
  return { type, text };
}

function RefChips({ texts }) {
  const refs = [];
  for (const t of texts) {
    if (!t) continue;
    for (const part of splitReferences(t)) {
      if (typeof part !== 'string' && !refs.includes(part.ref.label)) refs.push(part.ref.label);
    }
  }
  if (!refs.length) return null;
  return (
    <div className="blk-refs" aria-label="Scripture detected">
      {refs.map((r) => (
        <span key={r} className="blk-ref">
          <Icon name="book" size={12} />
          {r}
        </span>
      ))}
    </div>
  );
}

function Inserter({ onInsert, always }) {
  return (
    <div className={`blk-insert${always ? ' always' : ''}`}>
      {BLOCK_TYPES.map((t) => (
        <button key={t.id} type="button" onClick={() => onInsert(t.id)}>
          + {t.label}
        </button>
      ))}
    </div>
  );
}

export default function BlockEditor({ blocks, onChange }) {
  const update = (i, next) => onChange(blocks.map((b, j) => (j === i ? next : b)));
  const insertAt = (i, type) => {
    const next = [...blocks];
    next.splice(i, 0, newBlock(type));
    onChange(next);
  };
  const remove = (i) => onChange(blocks.filter((_, j) => j !== i));
  const move = (i, d) => {
    const next = [...blocks];
    const [b] = next.splice(i, 1);
    next.splice(i + d, 0, b);
    onChange(next);
  };

  // Pasting several paragraphs into a paragraph block splits them into blocks.
  const onPaste = (i) => (e) => {
    const text = e.clipboardData.getData('text/plain');
    if (blocks[i].type !== 'p' || !/\n\s*\n/.test(text)) return;
    e.preventDefault();
    const parts = text
      .split(/\n\s*\n/)
      .map((s) => s.replace(/\s*\n\s*/g, ' ').trim())
      .filter(Boolean);
    const el = e.target;
    const before = el.value.slice(0, el.selectionStart);
    const after = el.value.slice(el.selectionEnd);
    const first = { type: 'p', text: (before + parts[0]).trimStart() };
    const middle = parts.slice(1, -1).map((t) => ({ type: 'p', text: t }));
    const last = parts.length > 1 ? [{ type: 'p', text: parts[parts.length - 1] + after }] : [];
    if (parts.length === 1) first.text += after;
    const next = [...blocks];
    next.splice(i, 1, first, ...middle, ...last);
    onChange(next);
  };

  return (
    <div>
      {blocks.map((b, i) => (
        <Fragment key={i}>
          {i > 0 && <Inserter onInsert={(t) => insertAt(i, t)} />}
          <div className="blk">
            <div className="blk-head">
              <select
                className="blk-type"
                value={b.type}
                onChange={(e) => update(i, convert(b, e.target.value))}
                aria-label="Block type"
              >
                {BLOCK_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
              <div className="blk-tools">
                <button type="button" className="st-icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move block up">
                  <Icon name="up" size={16} />
                </button>
                <button
                  type="button"
                  className="st-icon-btn"
                  onClick={() => move(i, 1)}
                  disabled={i === blocks.length - 1}
                  aria-label="Move block down"
                >
                  <Icon name="down" size={16} />
                </button>
                <button type="button" className="st-icon-btn" onClick={() => remove(i)} aria-label="Delete block">
                  <Icon name="trash" size={16} />
                </button>
              </div>
            </div>

            {b.type === 'callout' && (
              <input
                className="blk-sub"
                style={{ borderTop: 0, paddingTop: 0, marginTop: 0, marginBottom: 4, fontWeight: 600 }}
                placeholder="Callout title (e.g. Our read)"
                value={b.title ?? ''}
                onChange={(e) => update(i, { ...b, title: e.target.value })}
              />
            )}

            {b.type === 'list' ? (
              <AutoTextarea
                className="blk-text"
                minRows={2}
                placeholder={PLACEHOLDER.list}
                value={(b.items ?? []).join('\n')}
                onChange={(v) => update(i, { ...b, items: v.split('\n') })}
                aria-label="List items"
              />
            ) : (
              <AutoTextarea
                className={`blk-text ${b.type}`}
                placeholder={PLACEHOLDER[b.type]}
                value={b.text}
                onChange={(v) => update(i, { ...b, text: v })}
                onPaste={onPaste(i)}
                aria-label={`${BLOCK_TYPES.find((t) => t.id === b.type)?.label} text`}
              />
            )}

            {b.type === 'quote' && (
              <input
                className="blk-sub"
                placeholder="Attribution (optional)"
                value={b.cite ?? ''}
                onChange={(e) => update(i, { ...b, cite: e.target.value })}
              />
            )}

            {b.type !== 'h2' && b.type !== 'h3' && <RefChips texts={[b.text, b.title, ...(b.items ?? [])]} />}
          </div>
        </Fragment>
      ))}
      <Inserter always onInsert={(t) => insertAt(blocks.length, t)} />
    </div>
  );
}
