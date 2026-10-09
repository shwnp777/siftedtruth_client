'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';
import { saveTopic, deleteTopic, reorderTopics } from '@/app/studio/actions';
import { slugify } from '@/lib/studio/schema';

const BLANK = { id: null, name: '', slug: '', description: '', show_in_nav: true };

export default function TopicsManager({ initial }) {
  const router = useRouter();
  const [topics, setTopics] = useState(initial);
  const [form, setForm] = useState(BLANK);
  const [slugTouched, setSlugTouched] = useState(false);
  const [msg, setMsg] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [pending, start] = useTransition();

  const edit = (t) => {
    setForm({ id: t.id, name: t.name, slug: t.slug, description: t.description ?? '', show_in_nav: t.show_in_nav });
    setSlugTouched(true);
    setMsg(null);
  };
  const reset = () => {
    setForm(BLANK);
    setSlugTouched(false);
  };

  const submit = (e) => {
    e.preventDefault();
    setMsg(null);
    start(async () => {
      const res = await saveTopic(form);
      if (res.error) return setMsg({ kind: 'error', text: res.error });
      const saved = { ...res.topic, show_in_nav: res.topic.show_in_nav !== false };
      setTopics((list) =>
        form.id
          ? list.map((t) => (t.id === saved.id ? { ...t, ...saved } : t))
          : [...list, { ...saved, posts: 0 }]
      );
      setMsg({ kind: 'ok', text: form.id ? 'Topic updated.' : `Added “${saved.name}”.` });
      reset();
      router.refresh();
    });
  };

  const move = (i, d) => {
    const next = [...topics];
    const [t] = next.splice(i, 1);
    next.splice(i + d, 0, t);
    setTopics(next);
    start(async () => {
      const res = await reorderTopics(next.map((x) => x.id));
      if (res.error) setMsg({ kind: 'error', text: res.error });
    });
  };

  const toggleMenu = (t) => {
    const next = { ...t, show_in_nav: !t.show_in_nav };
    setTopics((list) => list.map((x) => (x.id === t.id ? next : x)));
    start(async () => {
      const res = await saveTopic(next);
      if (res.error) {
        setMsg({ kind: 'error', text: res.error });
        setTopics((list) => list.map((x) => (x.id === t.id ? t : x)));
      }
    });
  };

  const remove = (id) =>
    start(async () => {
      const res = await deleteTopic(id);
      setConfirmId(null);
      if (res.error) return setMsg({ kind: 'error', text: res.error });
      setTopics((list) => list.filter((t) => t.id !== id));
      if (form.id === id) reset();
    });

  return (
    <div className="src-layout">
      <div>
        <div className="st-table-wrap">
          <table className="st-table">
            <thead>
              <tr>
                <th aria-label="Order" />
                <th>Topic</th>
                <th>In menu</th>
                <th>Posts</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {topics.length === 0 && (
                <tr>
                  <td colSpan={5} className="st-empty">
                    No topics yet.
                  </td>
                </tr>
              )}
              {topics.map((t, i) => (
                <tr key={t.id}>
                  <td style={{ whiteSpace: 'nowrap', width: 72 }}>
                    <button type="button" className="st-icon-btn" onClick={() => move(i, -1)} disabled={i === 0 || pending} aria-label={`Move ${t.name} up`}>
                      <Icon name="up" size={16} />
                    </button>
                    <button
                      type="button"
                      className="st-icon-btn"
                      onClick={() => move(i, 1)}
                      disabled={i === topics.length - 1 || pending}
                      aria-label={`Move ${t.name} down`}
                    >
                      <Icon name="down" size={16} />
                    </button>
                  </td>
                  <td>
                    <span className="title" style={{ fontSize: 18 }}>
                      {t.name}
                    </span>
                    <span className="muted" style={{ fontSize: 13 }}>
                      /topics/{t.slug}
                    </span>
                    {t.description && (
                      <span className="dek" style={{ whiteSpace: 'normal', maxWidth: 380 }}>
                        {t.description}
                      </span>
                    )}
                  </td>
                  <td>
                    <label className="st-check">
                      <input type="checkbox" checked={t.show_in_nav} onChange={() => toggleMenu(t)} disabled={pending} />
                      <span className="sr-only">Show {t.name} in the site menu</span>
                      {t.show_in_nav ? 'Shown' : 'Hidden'}
                    </label>
                  </td>
                  <td className="muted">{t.posts}</td>
                  <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>
                    {confirmId === t.id ? (
                      <>
                        <button type="button" className="st-btn danger sm" onClick={() => remove(t.id)} disabled={pending}>
                          Delete
                        </button>{' '}
                        <button type="button" className="st-btn ghost sm" onClick={() => setConfirmId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button type="button" className="st-btn ghost sm" onClick={() => edit(t)}>
                          Edit
                        </button>{' '}
                        <button
                          type="button"
                          className="st-icon-btn"
                          onClick={() => setConfirmId(t.id)}
                          aria-label={`Delete ${t.name}`}
                          title={t.posts ? 'Move its posts to another topic first' : 'Delete topic'}
                        >
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
        <p className="st-hint" style={{ marginTop: 10 }}>
          The order here is the order in the site menu and in “Explore the archive” on the home page.
        </p>
      </div>

      <form className="st-card src-form" onSubmit={submit}>
        <h2 className="st-h2">{form.id ? 'Edit topic' : 'Add a topic'}</h2>
        {msg && (
          <p className={msg.kind === 'error' ? 'st-error' : 'st-ok'} style={{ marginBottom: 12 }} role="status">
            {msg.text}
          </p>
        )}
        <label className="st-field">
          <span>Name</span>
          <input
            className="st-input"
            required
            value={form.name}
            placeholder="e.g. Bible Study"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value, slug: slugTouched ? form.slug : slugify(e.target.value) })
            }
          />
        </label>
        <label className="st-field">
          <span>
            Address <span className="st-hint">/topics/…</span>
          </span>
          <input
            className="st-input"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm({ ...form, slug: e.target.value });
            }}
            onBlur={() => setForm((f) => ({ ...f, slug: slugify(f.slug) }))}
          />
          {form.id && <span className="st-hint">Changing this breaks links people may have shared to the old address.</span>}
        </label>
        <label className="st-field">
          <span>
            Description <span className="st-hint">shown on the topic page and home page</span>
          </span>
          <textarea
            className="st-textarea"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <label className="st-check" style={{ marginBottom: 16 }}>
          <input type="checkbox" checked={form.show_in_nav} onChange={(e) => setForm({ ...form, show_in_nav: e.target.checked })} />
          Show in the site menu
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" className="st-btn" disabled={pending}>
            {form.id ? 'Save changes' : 'Add topic'}
          </button>
          {form.id && (
            <button type="button" className="st-btn ghost" onClick={reset}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
