'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '../Icon';
import BlockEditor from './BlockEditor';
import Preview from './Preview';
import SourcesPanel from './SourcesPanel';
import { AutoTextarea, LinesField, Rows, toLocalInput, fromLocalInput } from './fields';
import { savePost, deletePost, previewPassages } from '@/app/studio/actions';
import {
  STATUSES,
  RATING_OPTIONS,
  CONFIDENCE_OPTIONS,
  VIDEO_SERIES,
  DISPATCH_LABELS,
  slugify,
  estimateMinutes,
  typeLabel,
} from '@/lib/studio/schema';
import { TYPE_PATHS } from '@/lib/post-paths';
import { collectReferenceKeys } from '@/lib/scripture';
import { textOf } from '@/lib/post-text';

const snapshot = (p) => JSON.stringify(p);

export default function PostEditor({ initial, topics, authors, sources: initialSources }) {
  const router = useRouter();
  const [post, setPost] = useState(initial);
  const [saved, setSaved] = useState(() => snapshot(initial));
  const [sources, setSources] = useState(initialSources);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id));
  const [message, setMessage] = useState(null); // { kind: 'ok' | 'error', text }
  const [saving, startSaving] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [passages, setPassages] = useState({});
  const [loadingVerses, setLoadingVerses] = useState(false);

  const dirty = snapshot(post) !== saved;
  const isLive = post.status === 'published' || post.status === 'scheduled';
  const topic = topics.find((t) => t.id === post.topic_id);

  /* ---------- state helpers ---------- */
  const patch = (changes) => setPost((p) => ({ ...p, ...changes }));
  const patchIn = (key, changes) => setPost((p) => ({ ...p, [key]: { ...(p[key] ?? {}), ...changes } }));

  const setTitle = (title) => {
    setPost((p) => ({ ...p, title, slug: slugTouched ? p.slug : slugify(title) }));
  };

  /* ---------- save ---------- */
  const doSave = useCallback(
    (overrides = {}) => {
      const payload = { ...post, ...overrides };
      setMessage(null);
      startSaving(async () => {
        const res = await savePost(payload);
        if (res?.error) {
          setMessage({ kind: 'error', text: res.error });
          return;
        }
        const next = {
          ...payload,
          id: res.id,
          slug: res.slug,
          published_at: res.published_at,
          claim: res.claim ?? payload.claim,
        };
        setPost(next);
        setSaved(snapshot(next));
        setSlugTouched(true);
        const verb =
          next.status === 'published' ? 'Published' : next.status === 'scheduled' ? 'Scheduled' : 'Saved';
        setMessage({ kind: 'ok', text: `${verb} at ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.` });
        if (!post.id) router.replace(`/studio/posts/${res.id}`);
        else router.refresh();
      });
    },
    [post, router]
  );

  // Cmd/Ctrl + S saves
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (!saving) doSave();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [doSave, saving]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const onLeave = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onLeave);
    return () => window.removeEventListener('beforeunload', onLeave);
  }, [dirty]);

  /* ---------- live preview verses ---------- */
  const refKeys = useMemo(() => collectReferenceKeys(textOf(post)).sort().join('|'), [post]);
  const fetched = useRef('');
  useEffect(() => {
    if (!showPreview || refKeys === fetched.current) return;
    const t = setTimeout(async () => {
      setLoadingVerses(true);
      const res = await previewPassages(refKeys ? refKeys.split('|') : []);
      fetched.current = refKeys;
      setPassages(res ?? {});
      setLoadingVerses(false);
    }, 450);
    return () => clearTimeout(t);
  }, [refKeys, showPreview]);

  /* ---------- primary action ---------- */
  const primary =
    post.status === 'draft' || post.status === 'archived'
      ? { label: 'Publish', run: () => doSave({ status: 'published' }) }
      : post.status === 'scheduled'
        ? { label: post.id && !dirty ? 'Scheduled' : 'Schedule', run: () => doSave() }
        : { label: 'Update', run: () => doSave() };

  const publicUrl = post.id && isLive ? `/${TYPE_PATHS[post.type]}/${post.slug}` : null;
  const bodyLabel = { article: 'Article', dispatch: 'Brief', video: 'Show notes', claim: 'Discussion' }[post.type];

  return (
    <>
      {/* ---------------- Top bar ---------------- */}
      <div className="ed-bar">
        <div className="ed-bar-left">
          <Link href={`/studio/posts?type=${post.type}`}>← {typeLabel(post.type)}s</Link>
          <span className={`st-pill ${post.status}`}>{STATUSES.find((s) => s.id === post.status)?.label}</span>
          <span className={`ed-save-state${dirty ? ' dirty' : ''}`} role="status">
            {saving ? 'Saving…' : dirty ? 'Unsaved changes' : message?.kind === 'ok' ? message.text : post.id ? 'All changes saved' : 'New'}
          </span>
        </div>
        <div className="ed-bar-right">
          {publicUrl && (
            <a href={publicUrl} target="_blank" rel="noreferrer" className="st-btn ghost sm">
              <Icon name="external" size={14} /> View live
            </a>
          )}
          <button
            type="button"
            className="st-btn ghost sm"
            aria-pressed={showPreview}
            onClick={() => setShowPreview((v) => !v)}
          >
            <Icon name="eye" size={14} /> {showPreview ? 'Hide preview' : 'Preview'}
          </button>
          <button type="button" className="st-btn ghost" onClick={() => doSave()} disabled={saving}>
            {isLive ? 'Save' : 'Save draft'}
          </button>
          <button type="button" className="st-btn gold" onClick={primary.run} disabled={saving}>
            {primary.label}
          </button>
        </div>
      </div>

      <div className={`ed-layout${showPreview ? ' with-preview' : ''}`}>
        {/* ---------------- Document ---------------- */}
        <div className="ed-doc">
          {message?.kind === 'error' && (
            <p className="st-error" role="alert" style={{ marginBottom: 18 }}>
              {message.text}
            </p>
          )}

          {post.type !== 'claim' && (
            <>
              <AutoTextarea
                className="ed-title"
                placeholder={post.type === 'video' ? 'Episode title' : 'Headline'}
                value={post.title}
                onChange={setTitle}
                aria-label="Title"
              />
              <AutoTextarea
                className="ed-dek"
                placeholder="Standfirst: one or two sentences that tell readers why this matters"
                value={post.dek}
                onChange={(v) => patch({ dek: v })}
                aria-label="Standfirst"
              />
            </>
          )}

          {/* Claim */}
          {post.type === 'claim' && (
            <>
              <p className="st-eyebrow">The claim</p>
              <AutoTextarea
                className="ed-title"
                placeholder="State the claim exactly as people make it"
                value={post.claim.statement}
                onChange={(v) =>
                  setPost((p) => ({
                    ...p,
                    claim: { ...p.claim, statement: v },
                    title: v,
                    slug: slugTouched ? p.slug : slugify(v),
                  }))
                }
                aria-label="Claim"
              />
              <AutoTextarea
                className="ed-dek"
                placeholder="Standfirst for cards and search results"
                value={post.dek}
                onChange={(v) => patch({ dek: v })}
                aria-label="Standfirst"
              />

              <section className="ed-section">
                <div className="ed-section-head">
                  <h2>Verdict</h2>
                </div>
                <div className="rating-pick" role="group" aria-label="Rating">
                  {RATING_OPTIONS.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      aria-pressed={post.claim.rating === r.id}
                      onClick={() => patchIn('claim', { rating: r.id })}
                    >
                      <span className={`badge ${r.id}`}>{r.label}</span>
                    </button>
                  ))}
                </div>
                <div style={{ margin: '14px 0', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span className="st-label">Confidence</span>
                  <div className="seg" role="group" aria-label="Confidence">
                    {CONFIDENCE_OPTIONS.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        aria-pressed={post.claim.confidence === o.id}
                        onClick={() => patchIn('claim', { confidence: o.id })}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="st-field">
                  <span>In brief</span>
                  <textarea
                    className="st-textarea"
                    rows={3}
                    placeholder="The verdict in two or three sentences."
                    value={post.claim.summary ?? ''}
                    onChange={(e) => patchIn('claim', { summary: e.target.value })}
                  />
                </label>
                <label className="st-field">
                  <span>Where this claim comes from</span>
                  <textarea
                    className="st-textarea"
                    rows={2}
                    value={post.claim.origin ?? ''}
                    onChange={(e) => patchIn('claim', { origin: e.target.value })}
                  />
                </label>
                <div className="st-row">
                  <LinesField
                    label="Supports the claim"
                    hint="one per line"
                    value={post.claim.evidence_for ?? []}
                    onChange={(v) => patchIn('claim', { evidence_for: v })}
                    rows={5}
                  />
                  <LinesField
                    label="Counts against it"
                    hint="one per line"
                    value={post.claim.evidence_against ?? []}
                    onChange={(v) => patchIn('claim', { evidence_against: v })}
                    rows={5}
                  />
                </div>
                {post.claim.history?.length > 0 && (
                  <div className="ed-help">
                    <strong>Review history</strong> (rating changes are logged automatically when you save)
                    <ul style={{ margin: '6px 0 0', paddingLeft: '1.1em' }}>
                      {post.claim.history.map((h, i) => (
                        <li key={i}>
                          {h.date}: {h.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </>
          )}

          {/* Video */}
          {post.type === 'video' && (
            <section className="ed-section">
              <div className="ed-section-head">
                <h2>Video</h2>
              </div>
              <div className="st-row">
                <label className="st-field">
                  <span>
                    YouTube video ID <span className="st-hint">the 11 characters after v=</span>
                  </span>
                  <input
                    className="st-input"
                    value={post.video.youtube_id ?? ''}
                    onChange={(e) => {
                      const v = e.target.value.trim();
                      const m = v.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
                      patchIn('video', { youtube_id: m ? m[1] : v });
                    }}
                    placeholder="Paste the URL or the ID"
                  />
                </label>
                <div className="st-row">
                  <label className="st-field">
                    <span>Duration</span>
                    <input
                      className="st-input"
                      value={post.video.duration ?? ''}
                      onChange={(e) => patchIn('video', { duration: e.target.value })}
                      placeholder="24:10"
                    />
                  </label>
                  <label className="st-field">
                    <span>Series</span>
                    <input
                      className="st-input"
                      list="series-list"
                      value={post.video.series ?? ''}
                      onChange={(e) => patchIn('video', { series: e.target.value })}
                    />
                    <datalist id="series-list">
                      {VIDEO_SERIES.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </label>
                </div>
              </div>
              {post.video.youtube_id?.length === 11 && (
                <div className="player" style={{ marginBottom: 16, borderRadius: 8, overflow: 'hidden' }}>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${post.video.youtube_id}`}
                    title="Video preview"
                    allowFullScreen
                  />
                </div>
              )}
              <p className="st-label" style={{ marginBottom: 8 }}>
                Chapters
              </p>
              <Rows
                items={post.video.chapters ?? []}
                onChange={(chapters) => patchIn('video', { chapters })}
                makeNew={() => ({ t: '', label: '' })}
                addLabel="Add chapter"
                render={(c, set) => (
                  <div className="st-row" style={{ gridTemplateColumns: '90px 1fr' }}>
                    <input className="st-input" placeholder="0:00" value={c.t} onChange={(e) => set({ ...c, t: e.target.value })} />
                    <input
                      className="st-input"
                      placeholder="Chapter title"
                      value={c.label}
                      onChange={(e) => set({ ...c, label: e.target.value })}
                    />
                  </div>
                )}
              />
              <label className="st-field" style={{ marginTop: 16 }}>
                <span>
                  Transcript <span className="st-hint">blank line between paragraphs</span>
                </span>
                <textarea
                  className="st-textarea"
                  rows={6}
                  value={(post.video.transcript ?? []).map((b) => b.text).join('\n\n')}
                  onChange={(e) =>
                    patchIn('video', {
                      transcript: e.target.value.split(/\n\s*\n/).map((text) => ({ type: 'p', text })),
                    })
                  }
                />
              </label>
            </section>
          )}

          {/* Dispatch */}
          {post.type === 'dispatch' && (
            <section className="ed-section">
              <div className="ed-section-head">
                <h2>Dispatch</h2>
              </div>
              <div className="st-row">
                <label className="st-field">
                  <span>Label</span>
                  <input
                    className="st-input"
                    list="dispatch-labels"
                    value={post.dispatch.label ?? ''}
                    onChange={(e) => patchIn('dispatch', { label: e.target.value })}
                  />
                  <datalist id="dispatch-labels">
                    {DISPATCH_LABELS.map((l) => (
                      <option key={l} value={l} />
                    ))}
                  </datalist>
                </label>
                <label className="st-field">
                  <span>Original outlet</span>
                  <input
                    className="st-input"
                    value={post.dispatch.original_outlet ?? ''}
                    onChange={(e) => patchIn('dispatch', { original_outlet: e.target.value })}
                    placeholder="e.g. Israel Antiquities Authority"
                  />
                </label>
              </div>
              <label className="st-field">
                <span>Link to the original report</span>
                <input
                  className="st-input"
                  type="url"
                  value={post.dispatch.original_url ?? ''}
                  onChange={(e) => patchIn('dispatch', { original_url: e.target.value })}
                  placeholder="https://"
                />
              </label>
            </section>
          )}

          {/* Body */}
          <section className="ed-section">
            <div className="ed-section-head">
              <h2>{bodyLabel}</h2>
              {post.type === 'article' && (
                <span className="st-hint">
                  {estimateMinutes(post.body)} min read · {post.body.length} blocks
                </span>
              )}
            </div>
            <p className="ed-help">
              Type references normally (<code>John 1:1–3</code>, <code>1 Cor 15:3-8</code>) and they become hover
              popovers. Footnotes: type <code>[^1]</code> where the note goes. Italic: <code>*word*</code>. Paste several
              paragraphs at once and they split into blocks.
            </p>
            <BlockEditor blocks={post.body} onChange={(body) => patch({ body })} />
          </section>

          {/* Footnotes */}
          <section className="ed-section">
            <div className="ed-section-head">
              <h2>Notes</h2>
              <span className="st-hint">Note 1 matches [^1] in the text</span>
            </div>
            <Rows
              items={post.footnotes}
              onChange={(footnotes) => patch({ footnotes })}
              makeNew={() => ({ text: '', source_id: null })}
              addLabel="Add note"
              render={(f, set) => (
                <>
                  <input
                    className="st-input"
                    placeholder="Note text, e.g. Biran and Naveh, 81–98."
                    value={f.text}
                    onChange={(e) => set({ ...f, text: e.target.value })}
                  />
                  <select
                    className="st-select"
                    value={f.source_id ?? ''}
                    onChange={(e) => set({ ...f, source_id: e.target.value || null })}
                    aria-label="Linked source"
                  >
                    <option value="">No linked source</option>
                    {sources.map((s) => (
                      <option key={s.id} value={s.id}>
                        {[s.author, s.title].filter(Boolean).join(', ')}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
          </section>

          {/* Corrections */}
          <section className="ed-section">
            <div className="ed-section-head">
              <h2>Corrections</h2>
              <span className="st-hint">Shown publicly at the end of the post</span>
            </div>
            <Rows
              items={post.corrections}
              numbered={false}
              onChange={(corrections) => patch({ corrections })}
              makeNew={() => ({ date: new Date().toISOString().slice(0, 10), text: '' })}
              addLabel="Add correction"
              render={(c, set) => (
                <div className="st-row" style={{ gridTemplateColumns: '150px 1fr' }}>
                  <input className="st-input" type="date" value={c.date} onChange={(e) => set({ ...c, date: e.target.value })} />
                  <input
                    className="st-input"
                    placeholder="What was wrong and what changed"
                    value={c.text}
                    onChange={(e) => set({ ...c, text: e.target.value })}
                  />
                </div>
              )}
            />
          </section>
        </div>

        {/* ---------------- Side: settings or preview ---------------- */}
        {showPreview ? (
          <Preview post={post} topic={topic} passages={passages} loading={loadingVerses} />
        ) : (
          <aside className="ed-side" aria-label="Post settings">
            <div className="ed-panel">
              <h3>Publishing</h3>
              <label className="st-field">
                <span>Status</span>
                <select className="st-select" value={post.status} onChange={(e) => patch({ status: e.target.value })}>
                  {STATUSES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="st-field">
                <span>
                  {post.status === 'scheduled' ? 'Goes live' : 'Publish date'}{' '}
                  <span className="st-hint">{post.status === 'published' ? 'blank = now' : ''}</span>
                </span>
                <input
                  className="st-input"
                  type="datetime-local"
                  value={toLocalInput(post.published_at)}
                  onChange={(e) => patch({ published_at: fromLocalInput(e.target.value) })}
                />
              </label>
              {post.type === 'article' && (
                <label className="st-check" style={{ marginBottom: 14 }}>
                  <input type="checkbox" checked={post.featured} onChange={(e) => patch({ featured: e.target.checked })} />
                  Lead story on the home page
                </label>
              )}
              <label className="st-field">
                <span>Author</span>
                <select
                  className="st-select"
                  value={post.author_id ?? ''}
                  onChange={(e) => patch({ author_id: e.target.value || null })}
                >
                  <option value="">—</option>
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="ed-panel">
              <h3>Details</h3>
              <label className="st-field">
                <span>Topic</span>
                <select
                  className="st-select"
                  value={post.topic_id ?? ''}
                  onChange={(e) => patch({ topic_id: e.target.value || null })}
                >
                  <option value="">Choose a topic</option>
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="st-field">
                <span>
                  URL slug <span className="st-hint">/{TYPE_PATHS[post.type]}/…</span>
                </span>
                <input
                  className="st-input"
                  value={post.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    patch({ slug: e.target.value });
                  }}
                  onBlur={() => patch({ slug: slugify(post.slug) })}
                />
              </label>
              {post.type === 'article' && (
                <label className="st-field">
                  <span>
                    Reading time <span className="st-hint">blank = {estimateMinutes(post.body)} min (auto)</span>
                  </span>
                  <input
                    className="st-input"
                    type="number"
                    min="1"
                    value={post.reading_minutes ?? ''}
                    onChange={(e) => patch({ reading_minutes: e.target.value ? Number(e.target.value) : null })}
                  />
                </label>
              )}
              {post.type === 'claim' && (
                <label className="st-field">
                  <span>
                    Related long read <span className="st-hint">article slug</span>
                  </span>
                  <input
                    className="st-input"
                    value={post.related_slug ?? ''}
                    onChange={(e) => patch({ related_slug: e.target.value })}
                  />
                </label>
              )}
            </div>

            {post.type !== 'video' && (
              <div className="ed-panel">
                <h3>Lead image</h3>
                <label className="st-field">
                  <span>
                    Image URL <span className="st-hint">uploads arrive with S3</span>
                  </span>
                  <input
                    className="st-input"
                    value={post.hero?.src ?? ''}
                    onChange={(e) => patchIn('hero', { src: e.target.value })}
                    placeholder="https://"
                  />
                </label>
                <label className="st-field">
                  <span>Alt text</span>
                  <input className="st-input" value={post.hero?.alt ?? ''} onChange={(e) => patchIn('hero', { alt: e.target.value })} />
                </label>
                <label className="st-field">
                  <span>Caption</span>
                  <input
                    className="st-input"
                    value={post.hero?.caption ?? ''}
                    onChange={(e) => patchIn('hero', { caption: e.target.value })}
                  />
                </label>
                <label className="st-field">
                  <span>Credit</span>
                  <input
                    className="st-input"
                    value={post.hero?.credit ?? ''}
                    onChange={(e) => patchIn('hero', { credit: e.target.value })}
                  />
                </label>
              </div>
            )}

            <SourcesPanel
              sources={sources}
              selected={post.source_ids}
              onChange={(source_ids) => patch({ source_ids })}
              onSourceAdded={(s) => setSources((list) => [...list, s])}
            />

            {post.id && (
              <div className="ed-panel">
                <h3>Danger zone</h3>
                {confirmDelete ? (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="st-btn danger sm"
                      onClick={() =>
                        startSaving(async () => {
                          const res = await deletePost(post.id);
                          if (res?.error) setMessage({ kind: 'error', text: res.error });
                        })
                      }
                    >
                      Yes, delete permanently
                    </button>
                    <button type="button" className="st-btn ghost sm" onClick={() => setConfirmDelete(false)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="st-hint" style={{ marginTop: 0 }}>
                      Prefer <strong>Archived</strong> to take a post down but keep it.
                    </p>
                    <button type="button" className="st-btn danger sm" onClick={() => setConfirmDelete(true)}>
                      Delete post
                    </button>
                  </>
                )}
              </div>
            )}
          </aside>
        )}
      </div>
    </>
  );
}
