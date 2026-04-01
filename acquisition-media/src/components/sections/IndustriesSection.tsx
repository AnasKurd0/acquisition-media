'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { openCalendly } from '@/lib/calendly'

gsap.registerPlugin(ScrollTrigger)

const industries = [
  {
    emoji: '🦷',
    name: 'Dental & Allied Health',
    pitch: 'Physios, dentists, chiros. High LTV. High competition. Perfect fit.',
    badge: 'Website + Google Ads',
  },
  {
    emoji: '⚖️',
    name: 'Legal & Professional Services',
    pitch: 'Law firms, accountants, consultants. One client = $5K–$50K value.',
    badge: 'Website + Google Ads',
  },
  {
    emoji: '🔧',
    name: 'Trades & Contractors',
    pitch: 'Plumbers, builders, electricians. Google Ads fills your pipeline fast.',
    badge: 'Google Ads + Local SEO',
  },
  {
    emoji: '💪',
    name: 'Health & Wellness',
    pitch: 'Gyms, coaches, clinics. Meta Ads + TikTok = rapid membership growth.',
    badge: 'Meta Ads + TikTok',
  },
  {
    emoji: '🍽️',
    name: 'Hospitality & Venues',
    pitch: 'Restaurants, event spaces. Booking systems + ads = full tables.',
    badge: 'Website + Meta Ads',
  },
  {
    emoji: '🛒',
    name: 'E-commerce',
    pitch: 'DTC brands. Meta + TikTok creative strategy for sub-$5 CPL.',
    badge: 'Meta Ads + TikTok',
  },
]

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return
      const cards = cardsRef.current.querySelectorAll<HTMLDivElement>('.industry-card')
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="industries"
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
        <h2
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 6vw, 80px)',
            lineHeight: 1.05,
            margin: '0 0 16px 0',
          }}
        >
          <span style={{ color: '#555555', display: 'block' }}>We know your market.</span>
          <span style={{ color: '#f0f0f0', display: 'block' }}>Pick your industry.</span>
        </h2>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginTop: '48px',
          }}
          className="industries-grid"
        >
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="industry-card"
              style={{
                background: '#060606',
                border: '1px solid #1a1a1a',
                padding: '28px',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                cursor: 'default',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = '#e8ff00'
                el.style.transform = 'scale(1.01)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = '#1a1a1a'
                el.style.transform = 'scale(1)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{industry.emoji}</div>
              <h3
                style={{
                  fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                  fontSize: '1.25rem',
                  color: '#f0f0f0',
                  letterSpacing: '0.05em',
                  margin: '0 0 8px 0',
                }}
              >
                {industry.name}
              </h3>
              <p
                style={{
                  color: '#555555',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  margin: '0 0 16px 0',
                }}
              >
                {industry.pitch}
              </p>
              <span
                style={{
                  display: 'inline-block',
                  border: '1px solid #1a1a1a',
                  color: '#e8ff00',
                  padding: '3px 10px',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                Best combo: {industry.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <p style={{ color: '#555555', fontSize: '0.9375rem', marginBottom: '16px' }}>
            Don&apos;t see your industry?
          </p>
          <button
            type="button"
            onClick={openCalendly}
            style={{
              background: 'transparent',
              border: '1px solid #e8ff00',
              color: '#e8ff00',
              padding: '10px 24px',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'background 0.2s ease, color 0.2s ease',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.background = '#e8ff00'
              el.style.color = '#060606'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.background = 'transparent'
              el.style.color = '#e8ff00'
            }}
          >
            Book a call anyway →
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 768px) {
          .industries-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
