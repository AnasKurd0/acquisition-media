'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { openCalendly } from '@/lib/calendly'

gsap.registerPlugin(ScrollTrigger)

const VSL_VIDEO_ID = process.env.NEXT_PUBLIC_VSL_VIDEO_ID || ''

type PlayState = 'idle' | 'muted' | 'playing'

export default function VSLSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<PlayState>('idle')

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wrapperRef.current) return

      gsap.fromTo(
        wrapperRef.current,
        { scale: 0.88, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 70%',
            once: true,
            onEnter: () => {
              if (VSL_VIDEO_ID) {
                // Small delay so the scale animation finishes first
                setTimeout(() => setState('muted'), 700)
              }
            },
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const mutedSrc = `https://www.youtube.com/embed/${VSL_VIDEO_ID}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=0`
  const playingSrc = `https://www.youtube.com/embed/${VSL_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`

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
            WATCH BEFORE YOU DO ANYTHING ELSE — 8 MINUTES
          </p>
          <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 1.0, margin: '0 0 16px 0' }}>
            <span style={{ color: '#f0f0f0', display: 'block' }}>The reason your marketing</span>
            <span style={{ color: '#f0f0f0', display: 'block' }}>isn&apos;t working has nothing</span>
            <span style={{ color: '#e8ff00', display: 'block' }}>to do with your budget.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.75, maxWidth: '600px', margin: '0 auto 20px auto' }}>
            Anas breaks down the structural reason 90% of small business ad spend produces nothing — and walks through the exact methodology that generated 27 qualified leads for £200. Platform decisions. Campaign architecture. Conversion tracking. The agency audit. Every decision, explained.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
            {['The £7.25 CPL breakdown', 'Why tracking changes everything', 'How to audit your agency in 10 questions', 'The platform decision framework'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em', border: '1px solid #1a1a1a', padding: '4px 10px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Video container */}
        <div
          ref={wrapperRef}
          style={{ opacity: 0, transformOrigin: 'center center' }}
        >
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              border: '1px solid #1a1a1a',
              background: '#0a0a0a',
            }}
          >
            {/* Idle — play button */}
            {state === 'idle' && (
              <button
                type="button"
                onClick={() => VSL_VIDEO_ID ? setState('playing') : openCalendly()}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '20px',
                }}
                aria-label="Play video"
              >
                <div
                  className="vsl-play-btn"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: '#e8ff00',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="#060606">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    color: '#555555',
                    fontSize: '0.8125rem',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  {VSL_VIDEO_ID ? 'Play — 4 minutes' : 'Video coming soon'}
                </span>
              </button>
            )}

            {/* Muted autoplay — with unmute overlay */}
            {state === 'muted' && VSL_VIDEO_ID && (
              <>
                <iframe
                  src={mutedSrc}
                  title="Acquisition Media — Why most ad spend is wasted"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                />
                {/* Unmute bar */}
                <button
                  type="button"
                  onClick={() => setState('playing')}
                  aria-label="Unmute video"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(6,6,6,0.88)',
                    border: 'none',
                    borderTop: '1px solid #1a1a1a',
                    padding: '14px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(232,255,0,0.1)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(6,6,6,0.88)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      color: '#e8ff00',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                    }}
                  >
                    CLICK TO UNMUTE
                  </span>
                </button>
              </>
            )}

            {/* Unmuted — full player */}
            {state === 'playing' && VSL_VIDEO_ID && (
              <iframe
                src={playingSrc}
                title="Acquisition Media — Why most ad spend is wasted"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            )}
          </div>
        </div>

        {/* Post-video CTA */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={openCalendly}
            className="vsl-cta"
            style={{
              background: 'transparent',
              color: '#f0f0f0',
              border: '1px solid #1a1a1a',
              padding: '14px 32px',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
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
