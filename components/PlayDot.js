export default function PlayDot({ size = 18 }) {
  return (
    <span className="play-dot">
      <svg width={size} height={size + 2} viewBox="0 0 18 20" aria-hidden="true">
        <path d="M2 2 L16 10 L2 18 Z" fill="#16202E" />
      </svg>
    </span>
  );
}
