'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -200, my = -200, rx = -200, ry = -200, rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
    }
    const onOver = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('a, button')) return
      ring.style.width = '60px'; ring.style.height = '60px'
      ring.style.background = 'white'; ring.style.mixBlendMode = 'difference'
      ring.style.borderColor = 'white'
    }
    const onOut = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('a, button')) return
      ring.style.width = '40px'; ring.style.height = '40px'
      ring.style.background = 'transparent'; ring.style.mixBlendMode = 'normal'
      ring.style.borderColor = '#6366f1'
    }
    const tick = () => {
      const r = ringRef.current; if (!r) return
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1
      r.style.left = rx + 'px'; r.style.top = ry + 'px'
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div ref={dotRef}  style={{ position: 'fixed', width: '8px',  height: '8px',  borderRadius: '50%', background: '#6366f1',    pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%,-50%)', left: '-200px', top: '-200px' }} />
      <div ref={ringRef} style={{ position: 'fixed', width: '40px', height: '40px', borderRadius: '50%', background: 'transparent', pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%,-50%)', left: '-200px', top: '-200px', border: '2px solid #6366f1', transition: 'width .2s,height .2s,background .2s,border-color .2s' }} />
    </>
  )
}
