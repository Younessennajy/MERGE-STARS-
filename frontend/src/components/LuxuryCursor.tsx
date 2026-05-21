import { useEffect, useRef } from 'react'

/**
 * Gold dot + soft trailing ring. Disabled for touch and reduced-motion.
 */
export default function LuxuryCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const trail = useRef({ x: 0, y: 0 })
  const raf = useRef(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    document.documentElement.classList.add('luxury-cursor-active')

    const setPos = (x: number, y: number) => {
      pos.current = { x, y }
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`
        dotRef.current.style.top = `${y}px`
      }
    }

    const onMove = (e: MouseEvent) => setPos(e.clientX, e.clientY)

    const tick = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.14
      trail.current.y += (pos.current.y - trail.current.y) * 0.14
      if (trailRef.current) {
        trailRef.current.style.left = `${trail.current.x}px`
        trailRef.current.style.top = `${trail.current.y}px`
      }
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('luxury-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="luxury-cursor-dot" aria-hidden />
      <div ref={trailRef} className="luxury-cursor-trail" aria-hidden />
    </>
  )
}
