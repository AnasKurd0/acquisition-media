'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only show on pointer devices
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current!
    const ringEl = ringRef.current!

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      gsap.set(dot, { x: e.clientX - 4, y: e.clientY - 4 })
    }

    const onEnterMagnetic = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      const label = el.dataset.cursor || ''
      gsap.to(ringEl, { scale: 1.8, backgroundColor: '#e8ff00', duration: 0.25 })
      if (labelRef.current) {
        labelRef.current.textContent = label
        gsap.to(labelRef.current, { opacity: 1, duration: 0.2 })
      }
    }

    const onLeaveMagnetic = () => {
      gsap.to(ringEl, { scale: 1, backgroundColor: 'transparent', duration: 0.25 })
      if (labelRef.current) gsap.to(labelRef.current, { opacity: 0, duration: 0.15 })
    }

    let raf: number
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.08
      ring.current.y += (pos.current.y - ring.current.y) * 0.08
      gsap.set(ringEl, { x: ring.current.x - 18, y: ring.current.y - 18 })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    document.addEventListener('mousemove', onMove)

    const magneticEls = document.querySelectorAll('[data-cursor]')
    magneticEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnterMagnetic)
      el.addEventListener('mouseleave', onLeaveMagnetic)
    })

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      magneticEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterMagnetic)
        el.removeEventListener('mouseleave', onLeaveMagnetic)
      })
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#f0f0f0',
          pointerEvents: 'none',
          zIndex: 99999,
          top: 0,
          left: 0,
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid #e8ff00',
          pointerEvents: 'none',
          zIndex: 99998,
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: '#060606',
            opacity: 0,
            pointerEvents: 'none',
            fontFamily: 'Inter, sans-serif',
          }}
        />
      </div>
    </>
  )
}
