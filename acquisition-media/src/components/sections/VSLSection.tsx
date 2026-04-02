'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { openCalendly } from '@/lib/calendly'

gsap.registerPlugin(ScrollTrigger)

// Set NEXT_PUBLIC_VSL_VIDEO_ID in .env.local once you have a YouTube video ID
const VSL_VIDEO_ID = process.env.NEXT_PUBLIC_VSL_VIDEO_ID || ''

export default function VSLSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (wrapperRef.current) {
        gsap.fromTo(
          wrapperRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: wrapperRef.current, start: 'top 75%', once: true } }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="vsl"
      ref={sectionRef}
      style={{ background: '#060606', paddingTop: '96px', paddingBottom: '96px', paddingLeft: '24px', paddingRight: '24px' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Pre-headline */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
            WATCH THIS FIRST — 4 MINUTES
          </p>
          <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.05, margin: '0 0 16px 0' }}>
            <span style={{ color: '#f0f0f0', display: 'block' }}>Why most ad spend is wasted.</span>
            <span style={{ color: '#e8ff00', display: 'block' }}>And exactly how to fix it.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            Anas walks through the exact methodology behind the 27-lead, £200-spend campaign — and why most agencies structurally cannot replicate it.
          </p>
        </div>

        {/* Video container */}
        <div ref={wrapperRef} style={{ opacity: 0 }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', border: '1px solid #1a1a1a' }}>
            {VSL_VIDEO_ID && playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${VSL_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Acquisition Media — Why most ad spend is wasted"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            ) : (
              <button
                type="button"
                onClick={() => VSL_VIDEO_ID ? setPlaying(true) : openCalendly()}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#0a0a0a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}
                aria-label="Play video"
              >
                <div
                  className="vsl-play-btn"
                  style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e8ff00', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="#060606">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>
                  {VSL_VIDEO_ID ? 'Play — 4 minutes' : 'Video coming soon'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Post-video CTA */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={openCalendly}
            className="vsl-cta"
            style={{ background: 'transparent', color: '#f0f0f0', border: '1px solid #1a1a1a', padding: '14px 32px', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'var(--font-inter), Inter, sans-serif', transition: 'border-color 0.2s ease, color 0.2s ease' }}
            onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = '#e8ff00'; b.style.color = '#e8ff00' }}
            onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = '#1a1a1a'; b.style.color = '#f0f0f0' }}
          >
            BOOK THE STRATEGY CALL →
          </button>
        </div>
      </div>

      <style>{`
        .vsl-play-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 32px rgba(232, 255, 0, 0.4);
        }
      `}</style>
    </section>
  )
}
