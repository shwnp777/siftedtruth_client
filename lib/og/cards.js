/**
 * Share-card layouts (1200 × 630) for links posted to social media and
 * messaging apps. Rendered by next/og from each route's opengraph-image.js.
 *
 * Only flexbox and inline styles are available here (no site CSS).
 */

export const OG_SIZE = { width: 1200, height: 630 };

const C = {
  ink: '#16202E',
  ink2: '#2A3547',
  paper: '#F4EFE6',
  paper3: '#FBF8F2',
  rule: '#C9BEA9',
  onInk: '#F4EFE6',
  onInk2: '#C9C2B5',
  muted: '#4A4F57',
  gold: '#C9963F',
  goldInk: '#8A5A1E',
  faint: '#9A8F7E',
};

const RATING = {
  well_supported: { label: 'Well supported', bg: '#1F4D3A' },
  debated: { label: 'Debated', bg: '#7A5A12' },
  not_supported: { label: 'Not supported', bg: '#8C2F1E' },
  insufficient: { label: 'Insufficient evidence', bg: '#4A4F57' },
};
const CONFIDENCE = { low: 1, moderate: 2, high: 3 };

const DISPLAY = 'Newsreader Display';
const SERIF = 'Newsreader';
const SANS = 'Instrument Sans';

/** Pick a title size from its length so long headlines still fit in three lines. */
function titleSize(text = '', wide) {
  const n = text.length;
  if (wide) return n <= 45 ? 76 : n <= 70 ? 66 : n <= 100 ? 56 : n <= 130 ? 50 : 44;
  return n <= 36 ? 64 : n <= 55 ? 56 : n <= 78 ? 48 : n <= 105 ? 43 : 39;
}

const clip = (text = '', max) => (text.length > max ? `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…` : text);

/** The current site mark: five circles on a screen, the gold one in the middle. */
function Mark({ size = 44, ink = C.onInk }) {
  return (
    <svg width={size} height={size} viewBox="0 0 54 54">
      <line x1="4" y1="30" x2="50" y2="30" stroke={ink} strokeWidth="2" />
      <circle cx="11" cy="20" r="5" fill={ink} />
      <circle cx="27" cy="20" r="5" fill={C.gold} />
      <circle cx="43" cy="20" r="5" fill={ink} />
      <circle cx="19" cy="8" r="5" fill={ink} />
      <circle cx="35" cy="8" r="5" fill={ink} />
      <circle cx="16" cy="40" r="2.5" fill={C.faint} />
      <circle cx="30" cy="44" r="2" fill={C.faint} />
      <circle cx="40" cy="39" r="1.5" fill={C.faint} />
    </svg>
  );
}

function Brand({ dark = true, size = 30 }) {
  const color = dark ? C.onInk : C.ink;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <Mark size={size + 12} ink={color} />
      <span style={{ fontFamily: DISPLAY, fontSize: size, color, letterSpacing: -0.3 }}>Sifted Truth</span>
    </div>
  );
}

function Kicker({ children, color = C.gold }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 40, height: 3, background: color }} />
      <span
        style={{
          fontFamily: SANS,
          fontWeight: 600,
          fontSize: 19,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function Meta({ parts, color = C.onInk2 }) {
  const list = parts.filter(Boolean);
  if (!list.length) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontFamily: SANS, fontWeight: 500, fontSize: 20, color }}>
      {list.map((p, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
          {i > 0 && <span style={{ margin: '0 12px', color: C.gold }}>•</span>}
          {p}
        </span>
      ))}
    </div>
  );
}

function PlayButton({ size = 104 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size,
        background: C.gold,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 40px rgba(0,0,0,0.45)',
      }}
    >
      <svg width={size * 0.36} height={size * 0.36} viewBox="0 0 24 24">
        <path d="M7 4.5v15l12.5-7.5z" fill={C.ink} />
      </svg>
    </div>
  );
}

/** A photo panel that fades into the ink background on its left edge. */
function PhotoPanel({ photo, width, play }) {
  return (
    <div style={{ display: 'flex', position: 'relative', width, height: '100%' }}>
      <img src={photo} width={width} height={630} style={{ width, height: 630, objectFit: 'cover' }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height: 630,
          display: 'flex',
          backgroundImage: `linear-gradient(90deg, ${C.ink} 0%, rgba(22,32,46,0.6) 14%, rgba(22,32,46,0) 42%)`,
        }}
      />
      {play && (
        <div
          style={{ position: 'absolute', top: 0, left: 0, width, height: 630, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <PlayButton />
        </div>
      )}
    </div>
  );
}

/**
 * Articles, dispatches and videos: ink card, gold kicker, big serif headline,
 * a line of the subtitle, and the cover photo on the right when there is one.
 */
export function StoryCard({ kicker, title, dek, meta = [], photo, play = false }) {
  const wide = !photo;
  const size = titleSize(title, wide);
  const textWidth = wide ? 1072 : 600;
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: C.ink, position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: wide ? 1200 : 690,
          padding: '56px 0 52px 64px',
        }}
      >
        <Brand />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: textWidth }}>
          {kicker && <Kicker>{kicker}</Kicker>}
          <div
            style={{
              display: 'block',
              fontFamily: DISPLAY,
              fontSize: size,
              lineHeight: 1.06,
              letterSpacing: -0.5,
              color: C.onInk,
              lineClamp: 3,
            }}
          >
            {clip(title, 150)}
          </div>
          {dek && (
            <div
              style={{
                display: 'block',
                fontFamily: SERIF,
                fontSize: 26,
                lineHeight: 1.35,
                color: C.onInk2,
                lineClamp: 2,
              }}
            >
              {clip(dek, 170)}
            </div>
          )}
        </div>
        <Meta parts={meta} />
      </div>
      {photo && (
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, display: 'flex' }}>
          <PhotoPanel photo={photo} width={530} play={play} />
        </div>
      )}
    </div>
  );
}

function ConfidenceBars({ level }) {
  const n = CONFIDENCE[level] ?? 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{ width: 9, height: 10 + i * 7, borderRadius: 2, background: i <= n ? C.ink : C.rule }}
          />
        ))}
      </div>
      <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, color: C.ink }}>
        {level ? `${level[0].toUpperCase()}${level.slice(1)} confidence` : 'Confidence pending'}
      </span>
    </div>
  );
}

/**
 * Claims Examined: paper card with the claim in quotes and the verdict
 * (rating + confidence) front and centre, so the result reads in the preview.
 */
export function ClaimCard({ statement, rating, confidence, sources, photo }) {
  const r = RATING[rating] ?? RATING.insufficient;
  const wide = !photo;
  const size = titleSize(statement, wide) - 4;
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: C.paper, position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 14, background: r.bg, display: 'flex' }} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: wide ? 1200 : 790,
          padding: '54px 56px 50px 74px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Kicker color={C.goldInk}>Claims Examined</Kicker>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <div
            style={{
              display: 'block',
              fontFamily: DISPLAY,
              fontSize: size,
              lineHeight: 1.08,
              letterSpacing: -0.5,
              color: C.ink,
              lineClamp: 3,
            }}
          >
            {`“${clip(statement, 140)}”`}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: r.bg,
                color: '#FFFFFF',
                padding: '12px 22px 12px 18px',
                borderRadius: 6,
                fontFamily: SANS,
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 10, background: C.gold, display: 'flex' }} />
              {r.label}
            </div>
            <ConfidenceBars level={confidence} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Brand dark={false} size={28} />
          {sources > 0 && (
            <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: 20, color: C.muted }}>
              {sources} sources reviewed
            </span>
          )}
        </div>
      </div>
      {photo && (
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 410, display: 'flex' }}>
          <img src={photo} width={410} height={630} style={{ width: 410, height: 630, objectFit: 'cover' }} />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 410,
              height: 630,
              display: 'flex',
              backgroundImage: `linear-gradient(90deg, ${C.paper} 0%, rgba(244,239,230,0) 30%)`,
            }}
          />
        </div>
      )}
    </div>
  );
}

/** Home page, section pages and topics: the masthead as a card. */
export function BrandCard({ kicker, title, text }) {
  const frame = (
    <div
      style={{ position: 'absolute', top: 24, left: 24, right: 24, bottom: 24, border: `1px solid ${C.ink2}`, display: 'flex' }}
    />
  );

  if (!title) {
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: C.ink, position: 'relative' }}>
        {frame}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Mark size={120} />
          <div style={{ display: 'flex', fontFamily: DISPLAY, fontSize: 100, color: C.onInk, letterSpacing: -1.5, marginTop: 14 }}>
            Sifted Truth
          </div>
          <div style={{ width: 64, height: 3, background: C.gold, margin: '20px 0 22px', display: 'flex' }} />
          <div style={{ display: 'flex', fontFamily: SERIF, fontStyle: 'italic', fontSize: 34, color: C.onInk2 }}>
            Faith, history and the evidence beneath both
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 34,
              fontFamily: SANS,
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: 3,
              color: C.gold,
              textTransform: 'uppercase',
            }}
          >
            Apologetics · Archaeology · Church history · Claims examined
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: C.ink, position: 'relative' }}>
      {frame}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '64px 72px 60px',
        }}
      >
        <Brand />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: 980 }}>
          {kicker && <Kicker>{kicker}</Kicker>}
          <div style={{ display: 'flex', fontFamily: DISPLAY, fontSize: 96, lineHeight: 1, letterSpacing: -1.2, color: C.onInk }}>
            {title}
          </div>
          {text && (
            <div style={{ display: 'block', fontFamily: SERIF, fontSize: 30, lineHeight: 1.35, color: C.onInk2, lineClamp: 2 }}>
              {text}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', height: 8 }} />
      </div>
    </div>
  );
}
