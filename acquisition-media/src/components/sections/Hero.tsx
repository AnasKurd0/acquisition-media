'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { openCalendly } from '@/lib/calendly'
import { SPOTS_REMAINING } from '@/data/spots'

gsap.registerPlugin(ScrollTrigger)

const WebGLCanvas = dynamic(
  () => import('@/components/ui/WebGLCanvas').then((m) => ({ default: m.WebGLCanvas })),
  { ssr: false }
)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      // Respect prefers-reduced-motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        gsap.set(['.hero-badge', '.headline-line', '.hero-subhead', '.hero-cta', '.hero-proof'], { opacity: 1, y: 0, x: 0 })
        if (canvasRef.current) gsap.set(canvasRef.current, { opacity: 0.85 })
        return
      }

      const tl = gsap.timeline()

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
        0
      )

      tl.fromTo(
        '.headline-line',
        { y: '100%' },
        { y: '0%', duration: 0.7, ease: 'power3.out', stagger: 0.15 },
        0.2
      )

      tl.fromTo(
        '.hero-subhead',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.9
      )

      tl.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
        1.1
      )

      tl.fromTo(
        '.hero-proof',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        1.4
      )

      tl.fromTo(
        canvasRef.current,
        { opacity: 0 },
        { opacity: 0.85, duration: 1.5, ease: 'power2.inOut' },
        1.3
      )

      gsap.to(textRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100svh',
        position: 'relative',
        overflow: 'hidden',
        background: '#060606',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Mobile gradient fallback */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 0%, #1a2000 0%, #060606 60%)',
          zIndex: 0,
        }}
      />

      {/* WebGL canvas layer */}
      <div
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, opacity: 0, zIndex: 1 }}
      >
        <WebGLCanvas />
      </div>

      {/* Main content */}
      <div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '160px 24px 120px',
        }}
      >
        {/* Badge */}
        <div
          className="hero-badge"
          style={{
            display: 'inline-block',
            border: '1px solid #e8ff00',
            color: '#e8ff00',
            padding: '4px 12px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            marginBottom: '40px',
            opacity: 0,
          }}
        >
          ★ {SPOTS_REMAINING} FOUNDING SPOTS REMAINING
        </div>

        {/* Headlines */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ overflow: 'hidden' }}>
            <h1
              className="headline-line"
              style={{
                fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                fontSize: 'clamp(60px, 10vw, 160px)',
                lineHeight: 0.9,
                color: '#f0f0f0',
                margin: 0,
                display: 'block',
              }}
            >
              MORE CLIENTS.
            </h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h1
              className="headline-line"
              style={{
                fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                fontSize: 'clamp(60px, 10vw, 160px)',
                lineHeight: 0.9,
                color: '#f0f0f0',
                margin: 0,
                display: 'block',
              }}
            >
              EVERY WEEK.
            </h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h1
              className="headline-line"
              style={{
                fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                fontSize: 'clamp(60px, 10vw, 160px)',
                lineHeight: 0.9,
                color: '#e8ff00',
                margin: 0,
                display: 'block',
              }}
            >
              GUARANTEED.
            </h1>
          </div>
        </div>

        {/* Subheadline */}
        <p
          className="hero-subhead"
          style={{
            color: '#555555',
            maxWidth: '560px',
            fontSize: '17px',
            lineHeight: 1.75,
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            marginBottom: '32px',
            opacity: 0,
          }}
        >
          Most agencies hand your account to a junior and send reports nobody reads. We built the structural opposite — a maximum of 4 clients, every campaign built and managed by Anas personally, and a specific lead number written into your contract before we spend a single pound. Google Ads, Meta Ads, conversion website. 90 days to hit the target. Or we work for free.
        </p>

        {/* Offer summary strip */}
        <div
          className="hero-subhead"
          style={{
            maxWidth: '560px',
            marginBottom: '32px',
            padding: '16px 20px',
            background: '#0d0d0d',
            border: '1px solid #1a1a1a',
            opacity: 0,
          }}
        >
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            What&apos;s in the offer:
          </p>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.8125rem', lineHeight: 1.6, margin: '0 0 10px 0' }}>
            Custom website · Google Ads · Meta Ads · Conversion tracking · Weekly reports · Direct founder access · 5 written guarantees · 7 founding bonuses · Month-to-month after 90 days
          </p>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#e8ff00', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', margin: 0 }}>
            ★ {SPOTS_REMAINING} founding spots: permanently 40% below market rate + 7 exclusive bonuses
          </p>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={openCalendly}
            className="hero-cta"
            style={{
              display: 'inline-block',
              background: '#e8ff00',
              color: '#060606',
              padding: '12px 24px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              fontSize: '14px',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              textDecoration: 'none',
              opacity: 0,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            BOOK A FREE STRATEGY CALL →
          </button>
          <a
            href="#our-process"
            className="hero-cta"
            style={{
              display: 'inline-block',
              border: '1px solid #1a1a1a',
              color: '#f0f0f0',
              padding: '12px 24px',
              fontSize: '14px',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              textDecoration: 'none',
              opacity: 0,
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor = '#555555'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.borderColor = '#1a1a1a'
            }}
          >
            See How It Works ↓
          </a>
        </div>

        {/* Social proof micro-row */}
        <div
          className="hero-proof"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '24px',
            opacity: 0,
          }}
        >
          {['✓ Google + Meta Ads', '✓ Custom Website', '✓ 5 Written Guarantees', '✓ 7 Founding Bonuses', '✓ Max 4 Clients — 40× More Attention'].map((item) => (
            <span
              key={item}
              style={{
                color: '#f0f0f0',
                fontSize: '11px',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                letterSpacing: '0.05em',
                fontWeight: 700,
                border: '1px solid #1a1a1a',
                padding: '3px 10px',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 2,
        }}
      >
        <span
          style={{
            color: '#555555',
            fontSize: '11px',
            letterSpacing: '0.2em',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontWeight: 600,
          }}
        >
          SCROLL
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            color: '#e8ff00',
            animation: 'hero-bounce 1.4s ease-in-out infinite',
          }}
        >
          <path
            d="M2 5L8 11L14 5"
            stroke="#e8ff00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <style>{`
        @keyframes hero-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
      `}</style>
    </div>
  )
}
