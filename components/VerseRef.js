'use client';

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'st:bible-version';
const EVENT = 'st:bible-version';
const POP_WIDTH = 380;
const GAP = 8;

function readStoredVersion(fallback) {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || fallback;
  } catch {
    return fallback;
  }
}

/**
 * An inline Scripture reference that opens the passage in a small popover.
 * Opens on hover (mouse), focus (keyboard) or tap (touch); a click pins it open.
 * The chosen version is remembered and shared by every reference on the page.
 */
export default function VerseRef({ label, passages, versions, defaultVersion }) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [version, setVersion] = useState(defaultVersion);
  const [pos, setPos] = useState(null);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const timers = useRef({});
  const popId = useId();

  // Shared version preference
  useEffect(() => {
    setVersion(readStoredVersion(defaultVersion));
    const onChange = (e) => setVersion(e.detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, [defaultVersion]);

  const chooseVersion = (v) => {
    setVersion(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, v);
    } catch {}
    window.dispatchEvent(new CustomEvent(EVENT, { detail: v }));
  };

  const place = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rects = el.getClientRects();
    const r = rects[0] ?? el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const width = Math.min(POP_WIDTH, vw - 32);
    const left = Math.max(16, Math.min(r.left, vw - width - 16));
    const below = r.bottom + GAP;
    const roomBelow = vh - below;
    if (roomBelow < 260 && r.top > roomBelow) {
      setPos({ left, bottom: vh - r.top + GAP, width });
    } else {
      setPos({ left, top: below, width });
    }
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    window.addEventListener('scroll', place, { passive: true });
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener('scroll', place);
      window.removeEventListener('resize', place);
    };
  }, [open, place]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) close();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(timers.current.t), []);

  function close() {
    clearTimeout(timers.current.t);
    setOpen(false);
    setPinned(false);
  }

  const onPointerEnter = (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(timers.current.t);
    timers.current.t = setTimeout(() => setOpen(true), 120);
  };

  const onPointerLeave = (e) => {
    if (e.pointerType !== 'mouse' || pinned) return;
    clearTimeout(timers.current.t);
    timers.current.t = setTimeout(() => setOpen(false), 220);
  };

  const onClick = () => {
    clearTimeout(timers.current.t);
    if (open && !pinned) {
      setPinned(true); // opened by hover: a click keeps it open
    } else if (open) {
      close();
    } else {
      setOpen(true);
      setPinned(true);
    }
  };

  const onBlur = (e) => {
    if (!wrapRef.current?.contains(e.relatedTarget) && !pinned) setOpen(false);
  };

  const passage = passages?.[version] ?? null;
  const meta = versions.find((v) => v.id === version) ?? versions[0];

  return (
    <span
      ref={wrapRef}
      className="verse"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={onBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        className="verse-trigger"
        aria-expanded={open}
        aria-controls={open ? popId : undefined}
        onClick={onClick}
        onFocus={() => setOpen(true)}
      >
        {label}
      </button>
      {open && pos && (
        <span
          id={popId}
          className="verse-pop"
          role="dialog"
          onPointerDown={() => setPinned(true)}
          aria-label={`${passage?.label ?? label}, ${meta.name}`}
          style={{ position: 'fixed', top: pos.top, bottom: pos.bottom, left: pos.left, width: pos.width }}
        >
          <span className="verse-pop-head">
            <span>{passage?.label ?? label}</span>
            <span className="verse-versions" role="group" aria-label="Bible version">
              {versions.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  aria-pressed={v.id === version}
                  title={v.name}
                  onClick={() => chooseVersion(v.id)}
                >
                  {v.id}
                </button>
              ))}
            </span>
          </span>
          <span className="verse-body">
            {passage && passage.verses.length > 0 ? (
              passage.verses.map((v) => (
                <span key={v.n}>
                  <span className="verse-num">{v.n}</span>
                  {v.text}{' '}
                </span>
              ))
            ) : (
              <span className="verse-missing">This passage isn’t loaded in {meta.id} yet.</span>
            )}
          </span>
          <span className="verse-foot">
            <span>{meta.notice}</span>
            {passage && !passage.complete && passage.verses.length > 0 && <span>Partial passage</span>}
          </span>
        </span>
      )}
    </span>
  );
}
