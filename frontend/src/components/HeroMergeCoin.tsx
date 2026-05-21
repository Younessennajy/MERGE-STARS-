/** Decorative coin for the landing hero — no external image asset required */
export default function HeroMergeCoin({
  className = '',
  'aria-label': ariaLabel = 'MERGE STARS coin emblem',
}: {
  className?: string
  'aria-label'?: string
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label={ariaLabel}
      style={{ filter: 'drop-shadow(0 0 42px rgba(201,168,76,0.45))' }}
    >
      <defs>
        <linearGradient id="coin-gold-edge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8a6914" />
          <stop offset="35%" stopColor="#f5d78e" />
          <stop offset="65%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#5c4a12" />
        </linearGradient>
        <linearGradient id="coin-gold-face" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5d78e" />
          <stop offset="50%" stopColor="#c9a84c" />
          <stop offset="100%" stopColor="#9a7820" />
        </linearGradient>
        <radialGradient id="coin-shine" cx="35%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#fff8e8" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#f5d78e" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="182" fill="url(#coin-gold-edge)" />
      <circle cx="200" cy="200" r="168" fill="#0c0c0c" />
      <circle cx="200" cy="200" r="154" fill="url(#coin-gold-face)" />
      <circle cx="200" cy="200" r="154" fill="url(#coin-shine)" />
      {/* Inner ring */}
      <circle cx="200" cy="200" r="118" fill="none" stroke="#2a2310" strokeWidth="2.5" opacity="0.5" />
      <circle cx="200" cy="200" r="132" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
      {/* Star */}
      <path
        fill="#0a0a0a"
        opacity="0.92"
        d="M200 118l21.8 67.3h70.7l-57.2 41.6 21.8 67.3-57.1-41.5-57.2 41.5 21.8-67.3-57.1-41.6h70.7z"
      />
      <text
        x="200"
        y="288"
        textAnchor="middle"
        fill="#0a0a0a"
        fontSize="14"
        fontWeight="700"
        letterSpacing="0.35em"
        opacity="0.75"
      >
        MERGE
      </text>
    </svg>
  )
}
