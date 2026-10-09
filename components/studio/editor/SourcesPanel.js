'use client';

import { useState } from 'react';
import Link from 'next/link';
import { saveSource } from '@/app/studio/actions';

const cite = (s) => [s.author, s.title].filter(Boolean).join(', ') + (s.year ? ` (${s.year})` : '');

/** Pick the sources for a post; selected ones keep the order they were ticked in. */
export default function SourcesPanel({ sources, selected, onChange, onSourceAdded }) {
  const [filter, setFilter] = useState('');
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ kind: 'secondary', author: '', title: '', year: '' });
  const [error, setError] = useState('');

  const toggle = (id) => onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);

  const f = filter.trim().toLowerCase();
  const list = [
    ...selected.map((id) => sources.find((s) => s.id === id)).filter(Boolean),
    ...sources.filter((s) => !selected.includes(s.id)),
  ].filter((s) => !f || cite(s).toLowerCase().includes(f));

  const add = async () => {
    setError('');
    const res = await saveSource(draft);
    if (res.error) return setError(res.error);
    onSourceAdded(res.source);
    onChange([...selected, res.source.id]);
    setDraft({ kind: 'secondary', author: '', title: '', year: '' });
    setAdding(false);
  };

  return (
    <div className="ed-panel">
      <h3>
        Sources <span className="st-hint">· {selected.length} selected</span>
      </h3>
      <input
        className="st-input"
        placeholder="Filter sources…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Filter sources"
        style={{ marginBottom: 8 }}
      />
      <div className="src-pick">
        {list.length === 0 && <p className="st-empty" style={{ padding: 10 }}>No sources yet.</p>}
        {list.map((s) => (
          <label key={s.id}>
            <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggle(s.id)} />
            <span>
              <span className="k">{s.kind}</span>
              <br />
              {cite(s)}
            </span>
          </label>
        ))}
      </div>

      {adding ? (
        <div style={{ marginTop: 12 }}>
          {error && <p className="st-error" style={{ marginBottom: 8 }}>{error}</p>}
          <div className="seg" style={{ marginBottom: 8 }}>
            {['primary', 'secondary'].map((k) => (
              <button key={k} type="button" aria-pressed={draft.kind === k} onClick={() => setDraft({ ...draft, kind: k })}>
                {k[0].toUpperCase() + k.slice(1)}
              </button>
            ))}
          </div>
          <input
            className="st-input"
            placeholder="Title"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            style={{ marginBottom: 6 }}
          />
          <div className="st-row" style={{ gridTemplateColumns: '1fr 90px', marginBottom: 8 }}>
            <input
              className="st-input"
              placeholder="Author"
              value={draft.author}
              onChange={(e) => setDraft({ ...draft, author: e.target.value })}
            />
            <input
              className="st-input"
              placeholder="Year"
              inputMode="numeric"
              value={draft.year}
              onChange={(e) => setDraft({ ...draft, year: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button type="button" className="st-btn sm" onClick={add}>
              Add & select
            </button>
            <button type="button" className="st-btn ghost sm" onClick={() => setAdding(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 13 }}>
          <button type="button" className="st-btn ghost sm" onClick={() => setAdding(true)}>
            + Quick add
          </button>
          <Link href="/studio/sources" target="_blank" style={{ alignSelf: 'center', color: 'var(--muted)' }}>
            Manage library ↗
          </Link>
        </div>
      )}
    </div>
  );
}
