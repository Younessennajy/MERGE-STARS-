/** Ultra-thin gold line icons for the landing features bar */

const stroke = '#D4AF37'

type IconProps = { className?: string }

export function IconFilament3D({ className = 'w-9 h-9' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M12 36L24 8l12 28" stroke={stroke} strokeWidth="0.75" />
      <path d="M16 28h16" stroke={stroke} strokeWidth="0.75" />
      <path d="M18 22h12" stroke={stroke} strokeWidth="0.75" />
      <path d="M20 16h8" stroke={stroke} strokeWidth="0.75" />
      <path d="M8 36h32" stroke={stroke} strokeWidth="0.75" opacity="0.6" />
    </svg>
  )
}

export function IconPreciousMetals({ className = 'w-9 h-9' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M10 32L18 14h12l8 18" stroke={stroke} strokeWidth="0.75" />
      <path d="M14 28h20" stroke={stroke} strokeWidth="0.75" />
      <path d="M22 14v4" stroke={stroke} strokeWidth="0.75" />
      <path d="M10 32h28" stroke={stroke} strokeWidth="0.75" opacity="0.5" />
    </svg>
  )
}

export function IconLimitless({ className = 'w-9 h-9' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M14 24c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10"
        stroke={stroke}
        strokeWidth="0.85"
      />
      <path
        d="M34 24c0-5.5 4.5-10 10-10"
        stroke={stroke}
        strokeWidth="0.85"
      />
    </svg>
  )
}

export function IconSustainable({ className = 'w-9 h-9' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M24 8c-8 12-14 16-14 24a14 14 0 0 0 28 0c0-8-6-12-14-24z"
        stroke={stroke}
        strokeWidth="0.75"
      />
      <path d="M24 32v8" stroke={stroke} strokeWidth="0.75" opacity="0.5" />
    </svg>
  )
}

export function IconGlobal({ className = 'w-9 h-9' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="14" stroke={stroke} strokeWidth="0.75" />
      <ellipse cx="24" cy="24" rx="6" ry="14" stroke={stroke} strokeWidth="0.75" />
      <path d="M10 24h28" stroke={stroke} strokeWidth="0.75" />
      <path d="M12 18h24M12 30h24" stroke={stroke} strokeWidth="0.75" opacity="0.55" />
    </svg>
  )
}

export const FEATURE_ICON_MAP = {
  filament: IconFilament3D,
  metals: IconPreciousMetals,
  limitless: IconLimitless,
  sustainable: IconSustainable,
  global: IconGlobal,
} as const
