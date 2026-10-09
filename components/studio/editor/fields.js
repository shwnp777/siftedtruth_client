'use client';

import { useLayoutEffect, useRef } from 'react';
import Icon from '../Icon';

/** A textarea that grows with its content. */
export function AutoTextarea({ value, onChange, className = '', minRows = 1, ...rest }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);
  return (
    <textarea
      ref={ref}
      rows={minRows}
      className={className}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}

/** One text item per line <-> array of strings. */
export function LinesField({ label, hint, value = [], onChange, rows = 4, placeholder }) {
  return (
    <label className="st-field">
      <span>
        {label} {hint && <span className="st-hint">{hint}</span>}
      </span>
      <textarea
        className="st-textarea"
        rows={rows}
        placeholder={placeholder}
        value={value.join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n'))}
        onBlur={(e) =>
          onChange(
            e.target.value
              .split('\n')
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
      />
    </label>
  );
}

/** A list of repeating rows with add / remove / reorder. */
export function Rows({ items, onChange, render, makeNew, addLabel, numbered = true }) {
  const update = (i, next) => onChange(items.map((it, j) => (j === i ? next : it)));
  const remove = (i) => onChange(items.filter((_, j) => j !== i));
  const move = (i, d) => {
    const next = [...items];
    const [it] = next.splice(i, 1);
    next.splice(i + d, 0, it);
    onChange(next);
  };
  return (
    <div className="rows">
      {items.map((item, i) => (
        <div className="row-item" key={i}>
          <span className="num">{numbered ? i + 1 : '•'}</span>
          <div className="row-fields">{render(item, (next) => update(i, next), i)}</div>
          <div style={{ display: 'flex', gap: 2, paddingTop: 4 }}>
            <button type="button" className="st-icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
              <Icon name="up" size={16} />
            </button>
            <button
              type="button"
              className="st-icon-btn"
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1}
              aria-label="Move down"
            >
              <Icon name="down" size={16} />
            </button>
            <button type="button" className="st-icon-btn" onClick={() => remove(i)} aria-label="Remove">
              <Icon name="trash" size={16} />
            </button>
          </div>
        </div>
      ))}
      <div>
        <button type="button" className="st-btn ghost sm" onClick={() => onChange([...items, makeNew()])}>
          <Icon name="plus" size={14} /> {addLabel}
        </button>
      </div>
    </div>
  );
}

/** ISO string <-> value for <input type="datetime-local"> in the browser's time zone. */
export function toLocalInput(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
export function fromLocalInput(value) {
  return value ? new Date(value).toISOString() : null;
}
