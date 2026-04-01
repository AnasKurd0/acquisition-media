'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { openCalendly } from '@/lib/calendly'

gsap.registerPlugin(ScrollTrigger)

const profiles = [
  {
    tag: 'YOU\'VE GOT A SERVICE WORTH SELLING',
    headline: "But leads are unpredictable.",
    body: "You get clients from referrals, word-of-mouth, or previous relationships. Good months are great. Bad months are stressful. You need a system that generates demand consistently — not luck, not relationships, not hoping someone recommends you.",
    outcome: "Paid ads that fill your pipeline every month, regardless of referrals. A website that converts the traffic you're already getting. Predictable revenue starts with predictable leads.",
    accent: true,
  },
  {
    tag: 'YOU\'VE TRIED ADS BEFORE',
    headline: "And nothing showed for it.",
    body: "You boosted a Facebook post. Nothing happened. You hired an agency. They sent a monthly PDF and blamed the algorithm. You spent money with nothing to show for it. That experience was the agency's failure, not the platform's — and not yours.",
    outcome: "Campaigns built correctly from the start — right structure, right targeting, conversion tracking so you can see exactly which ad generated which lead. The difference between a failing campaign and a working one is usually setup, not budget.",
    accent: false,
  },
  {
    tag: 'YOUR CLIENTS ARE WORTH REAL MONEY',
    headline: "One client matters.",
    body: "You don't need hundreds of customers — you need the right ones. Whether a client is worth £500, £5,000, or £50,000 to your business, the maths on paid advertising works strongly in your favour if you do it right.",
    outcome: "A performance website and paid campaigns engineered around your specific client value. If your average client is worth £2,000+, a $25 cost-per-lead pays back 80x.",
    accent: false,
  },
]

export default function PerfectFor() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return
      const cards = cardsRef.current.querySelectorAll<HTMLDivElement>('.profile-card')
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="perfect-for"
      style={{
        background: '#0d0d0d',
        paddingTop: '128px',
        paddingBottom: '128px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        {/* Headline */}
        <div style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            <span style={{ color: '#555555', display: 'block' }}>This works for any business</span>
            <span style={{ color: '#f0f0f0', display: 'block' }}>where this sounds familiar.</span>
          </h2>
        </div>

        {/* Profile cards */}
        <div
          ref={cardsRef}
          style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
        >
          {profiles.map((profile, i) => (
            <div
              key={i}
              className="profile-card profile-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '0',
                background: profile.accent ? '#0a0f00' : '#060606',
                border: `1px solid ${profile.accent ? '#e8ff00' : '#1a1a1a'}`,
                padding: '0',
                opacity: 0,
              }}
            >
              {/* Left — problem */}
              <div style={{ padding: '40px', borderBottom: '1px solid #1a1a1a' }} className="profile-left">
                <span
                  style={{
                    display: 'inline-block',
                    color: '#e8ff00',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    marginBottom: '16px',
                  }}
                >
                  {profile.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                    fontSize: 'clamp(24px, 3vw, 40px)',
                    color: '#f0f0f0',
                    letterSpacing: '0.03em',
                    lineHeight: 1.1,
                    margin: '0 0 16px 0',
                  }}
                >
                  {profile.headline}
                </h3>
                <p
                  style={{
                    color: '#555555',
                    fontSize: '0.9375rem',
                    lineHeight: 1.75,
                    margin: 0,
                    maxWidth: '480px',
                  }}
                >
                  {profile.body}
                </p>
              </div>

              {/* Right — outcome */}
              <div
                style={{
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: profile.accent ? 'rgba(232,255,0,0.04)' : 'transparent',
                }}
                className="profile-right"
              >
                <p
                  style={{
                    color: '#555555',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    marginBottom: '12px',
                  }}
                >
                  What changes:
                </p>
                <p
                  style={{
                    color: '#f0f0f0',
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {profile.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <p style={{ color: '#555555', fontSize: '0.875rem', margin: 0 }}>
            Something else? If you&apos;re in business and you want more clients, we can probably help.
          </p>
          <button
            type="button"
            onClick={openCalendly}
            style={{
              background: 'transparent',
              border: '1px solid #555555',
              color: '#f0f0f0',
              padding: '8px 20px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease, color 0.2s ease',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = '#e8ff00'
              el.style.color = '#e8ff00'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = '#555555'
              el.style.color = '#f0f0f0'
            }}
          >
            Let's talk →
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .profile-left {
            border-bottom: none !important;
            border-right: 1px solid #1a1a1a;
          }
        }
      `}</style>
    </section>
  )
}
