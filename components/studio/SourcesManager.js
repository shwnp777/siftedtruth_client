'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';
import { saveSource, deleteSource } from '@/app/studio/actions';

const BLANK = { id: null, kind: 'secondary', author: '', title: '', publication: '', year: '', pages: '', url: '', notes: '' };

export default function SourcesManager({ initial }) {
  const router = useRouter();
  const [sources, setSources] = useState(initial);
  const [form, setForm] = useState(BLANK);
  const [filter, setFilter] = useState('');
  const [kind, setKind] = useState('');
  const [msg, setMsg] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [pending, start] = useTransition();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setMsg(null);
    start(async () => {
      const res = await saveSource(form);
      if (res.error) return setMsg({ kind: 'error', text: res.error });
      setSources((list) => {
        const used = list.find((s) => s.id === res.source.id)?.used ?? 0;
        const next = { ...res.source, used };
        return form.id ? list.map((s) => (s.id === next.id ? next : s)) : [next, ...list];
      });
      setMsg({ kind: 'ok', text: form.id ? 'Source updated.' : 'Source added.' });
      setForm(BLANK);
      router.refresh();
    });
  };

  const remove = (id) =>
    start(async () => {
      const res = await deleteSource(id);
      if (res.error) return setMsg({ kind: 'error', text: res.error });
      setSources((list) => list.filter((s) => s.id !== id));
      setConfirmId(null);
      if (form.id === id) setForm(BLANK);
    });

  const f = filter.trim().toLowerCase();
  const shown = sources.filter(
    (s) =>
      (!kind || s.kind === kind) &&
      (!f || [s.author, s.title, s.publication].filter(Boolean).join(' ').toLowerCase().includes(f))
  );

  return (
    <div className="src-layout">
      <div>
        <div className="st-toolbar">
          <div className="st-chips">
            {[
              ['', 'All'],
              ['primary', 'Primary'],
              ['secondary', 'Secondary'],
            ].map(([k, label]) => (
              <a
                key={k || 'all'}
                href="#"
                aria-current={kind === k ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setKind(k);
                }}
              >
                {label} ({k ? sources.filter((s) => s.kind === k).length : sources.length})
              </a>
            ))}
          </div>
          <div className="st-search">
            <input
              className="st-input"
              placeholder="Search author, title, publication…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Search sources"
            />
          </div>
        </div>

        <div className="st-table-wrap">
          <table className="st-table">
            <thead>
              <tr>
                <th>Kind</th>
                <th>Source</th>
                <th>Used in</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {shown.length === 0 && (
                <tr>
                  <td colSpan={4} className="st-empty">
                    No sources match.
                  </td>
                </tr>
              )}
              {shown.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className={`source-tag ${s.kind}`}>{s.kind}</span>
                  </td>
                  <td>
                    <span style={{ display: 'block' }}>
                      {s.author && <>{s.author}, </>}
                      <em>{s.title}</em>
                    </span>
                    <span className="muted" style={{ fontSize: 13 }}>
                      {[s.publication, s.year, s.pages].filter(Boolean).join(' · ')}
                      {s.url && (
                        <>
                          {' · '}
                          <a href={s.url} target="_blank" rel="noreferrer">
                            link ↗
                          </a>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="muted">
                    {s.used} post{s.used === 1 ? '' : 's'}
                  </td>
                  <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>
                    {confirmId === s.id ? (
                      <>
                        <button type="button" className="st-btn danger sm" onClick={() => remove(s.id)} disabled={pending}>
                          Delete{s.used ? ` (unlinks ${s.used})` : ''}
                        </button>{' '}
                        <button type="button" className="st-btn ghost sm" onClick={() => setConfirmId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="st-btn ghost sm"
                          onClick={() =>
                            setForm({ ...BLANK, ...Object.fromEntries(Object.entries(s).map(([k, v]) => [k, v ?? ''])) })
                          }
                        >
                          Edit
                        </button>{' '}
                        <button type="button" className="st-icon-btn" onClick={() => setConfirmId(s.id)} aria-label="Delete source">
                          <Icon name="trash" size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form className="st-card src-form" onSubmit={submit}>
        <h2 className="st-h2">{form.id ? 'Edit source' : 'Add a source'}</h2>
        {msg && (
          <p className={msg.kind === 'error' ? 'st-error' : 'st-ok'} style={{ marginBottom: 12 }} role="status">
            {msg.text}
          </p>
        )}
        <div className="seg" role="group" aria-label="Kind" style={{ marginBottom: 14 }}>
          {['primary', 'secondary'].map((k) => (
            <button key={k} type="button" aria-pressed={form.kind === k} onClick={() => setForm({ ...form, kind: k })}>
              {k[0].toUpperCase() + k.slice(1)}
            </button>
          ))}
        </div>
        <p className="st-hint" style={{ marginTop: -6, marginBottom: 14 }}>
          Primary: inscriptions, manuscripts, excavation reports, ancient texts. Secondary: scholarship about them.
        </p>
        <label className="st-field">
          <span>Title</span>
          <input className="st-input" required value={form.title} onChange={set('title')} />
        </label>
        <label className="st-field">
          <span>Author(s)</span>
          <input className="st-input" value={form.author} onChange={set('author')} />
        </label>
        <label className="st-field">
          <span>Publication / publisher</span>
          <input className="st-input" value={form.publication} onChange={set('publication')} placeholder="e.g. Israel Exploration Journal 43" />
        </label>
        <div className="st-row">
          <label className="st-field">
            <span>Year</span>
            <input className="st-input" inputMode="numeric" value={form.year} onChange={set('year')} />
          </label>
          <label className="st-field">
            <span>Pages</span>
            <input className="st-input" value={form.pages} onChange={set('pages')} />
          </label>
        </div>
        <label className="st-field">
          <span>Link</span>
          <input className="st-input" type="url" value={form.url} onChange={set('url')} placeholder="https://" />
        </label>
        <label className="st-field">
          <span>
            Notes <span className="st-hint">not shown on pages, but not secret</span>
          </span>
          <textarea className="st-textarea" rows={3} value={form.notes} onChange={set('notes')} />
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" className="st-btn" disabled={pending}>
            {form.id ? 'Save changes' : 'Add source'}
          </button>
          {form.id && (
            <button type="button" className="st-btn ghost" onClick={() => setForm(BLANK)}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
