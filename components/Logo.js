/**
 * The sieve mark: a grid of dots resting on a screen. The gold dot is the
 * find that stays; the dirt falls through below.
 */
export function LogoMark({ size = 54, accent = 'var(--accent)', ink = 'currentColor', title }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 54 54"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <line x1="4" y1="30" x2="50" y2="30" stroke={ink} strokeWidth="2" />
      <circle cx="11" cy="20" r="5" fill={ink} />
      <circle cx="27" cy="20" r="5" fill={accent} />
      <circle cx="43" cy="20" r="5" fill={ink} />
      <circle cx="19" cy="8" r="5" fill={ink} />
      <circle cx="35" cy="8" r="5" fill={ink} />
      <circle cx="16" cy="40" r="2.5" fill="#9A8F7E" />
      <circle cx="30" cy="44" r="2" fill="#9A8F7E" />
      <circle cx="40" cy="39" r="1.5" fill="#9A8F7E" />
    </svg>
  );
}
