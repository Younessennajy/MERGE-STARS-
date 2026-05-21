import { useEffect, useRef } from 'react'

type CoinAnim = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  ry: number
  vz: number
  phase: number
  opacity: number
}

interface Props {
  /** Number of faux-3d coins drifting in the backdrop */
  count?: number
  className?: string
}

/**
 * Lightweight decorative layer: metallic coin discs bouncing elastically inside a container.
 * Updates positions via requestAnimationFrame; pointer-events disabled.
 */
export default function BouncingCoinsBackground({ count = 11, className = '' }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const coinRefs = useRef<(HTMLDivElement | null)[]>([])
  const coinsRef = useRef<CoinAnim[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || count <= 0) return

    const bootstrap = (): CoinAnim[] => {
      const w = Math.max(wrap!.clientWidth, 100)
      const h = Math.max(wrap!.clientHeight, 100)
      const next: CoinAnim[] = []
      for (let i = 0; i < count; i++) {
        const r = 20 + Math.random() * 36
        const speed = 45 + Math.random() * 75
        const angle = Math.random() * Math.PI * 2
        next.push({
          x: r + Math.random() * Math.max(8, w - 2 * r),
          y: r + Math.random() * Math.max(8, h - 2 * r),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r,
          ry: Math.random() * 360,
          vz: 55 + Math.random() * 95,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.09 + Math.random() * 0.12,
        })
      }
      return next
    }

    coinsRef.current = bootstrap()

    const clampAll = () => {
      const w = wrap!.clientWidth
      const h = wrap!.clientHeight
      if (w <= 1 || h <= 1) return
      for (const c of coinsRef.current) {
        c.x = Math.min(Math.max(c.r + 4, c.x), Math.max(c.r + 4, w - c.r - 4))
        c.y = Math.min(Math.max(c.r + 4, c.y), Math.max(c.r + 4, h - c.r - 4))
      }
    }

    let last = performance.now()

    const resizeObserver = new ResizeObserver(() => clampAll())
    resizeObserver.observe(wrap)

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.055)
      last = now
      const W = wrap!.clientWidth
      const H = wrap!.clientHeight
      const list = coinsRef.current

      if (W < 40 || H < 40) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      for (let i = 0; i < list.length; i++) {
        const c = list[i]

        const nudge = Math.sin(now / 920 + c.phase)
        const wobbleRx = 10 + Math.sin(now * 0.0008 + c.phase * 3) * 9
        const wobbleRy = Math.sin(now * 0.0006 + i) * 16

        c.x += (c.vx + nudge * 6) * dt
        c.y += (c.vy + Math.cos(now * 0.0007 + i) * 6) * dt
        c.ry += c.vz * dt

        if (c.x < c.r + 4) {
          c.x = c.r + 4
          c.vx = Math.abs(c.vx) || 48
        } else if (c.x > W - c.r - 4) {
          c.x = W - c.r - 4
          c.vx = -Math.abs(c.vx) || -48
        }
        if (c.y < c.r + 4) {
          c.y = c.r + 4
          c.vy = Math.abs(c.vy) || 42
        } else if (c.y > H - c.r - 4) {
          c.y = H - c.r - 4
          c.vy = -Math.abs(c.vy) || -42
        }

        const el = coinRefs.current[i]
        if (!el) continue
        const d = Math.round(c.r * 2)
        el.style.setProperty('--coin-d', `${d}px`)
        el.style.width = `${d}px`
        el.style.height = `${d}px`
        el.style.opacity = String(c.opacity)
        el.style.transform =
          `translate3d(${c.x - c.r}px, ${c.y - c.r}px, 0) ` +
          `rotateX(${wobbleRx + 24}deg) ` +
          `rotateY(${c.ry + wobbleRy}deg) ` +
          `rotateZ(${Math.sin(now * 0.0004 + i) * 10}deg)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
    }
  }, [count])

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`.trim()}
      aria-hidden
      style={{
        perspective: '1600px',
        perspectiveOrigin: '50% 40%',
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          ref={(n) => {
            coinRefs.current[i] = n
          }}
          className="bouncing-coin-3d absolute left-0 top-0 rounded-full will-change-transform"
        >
          <span className="bouncing-coin-star">★</span>
        </div>
      ))}
    </div>
  )
}
