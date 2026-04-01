'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/data/services'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.service-card')
      if (!cards || cards.length === 0) return

      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }, cardsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      style={{ backgroundColor: '#060606' }}
      className="py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(48px, 7vw, 96px)',
            color: '#f0f0f0',
            lineHeight: 1.05,
          }}
        >
          Four services.
        </h2>
        <h2
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(48px, 7vw, 96px)',
            color: '#e8ff00',
            lineHeight: 1.05,
          }}
        >
          One outcome: clients.
        </h2>
      </div>

      <div
        ref={cardsRef}
        className="mt-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="service-card group p-8 md:p-10"
            style={{
              backgroundColor: '#0d0d0d',
              border: '1px solid transparent',
              transition: 'border-color 0.3s ease, transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.borderColor = '#e8ff00'
              el.style.transform = 'translateY(-4px)'
              el.style.boxShadow = '0 0 24px rgba(232, 255, 0, 0.08)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.borderColor = 'transparent'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            {/* Service number */}
            <p
              style={{
                color: '#e8ff00',
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                marginBottom: '1rem',
                opacity: 0.6,
              }}
            >
              {service.number}
            </p>

            {/* Title */}
            <h3
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(32px, 4vw, 56px)',
                color: '#f0f0f0',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                lineHeight: 1.05,
              }}
            >
              {service.title}
            </h3>

            {/* Tagline */}
            <p
              style={{
                color: '#555555',
                fontSize: '0.875rem',
                fontStyle: 'italic',
                marginTop: '0.5rem',
                marginBottom: '1.5rem',
                fontFamily: "var(--font-inter), Inter, sans-serif",
              }}
            >
              {service.tagline}
            </p>

            {/* How it works */}
            <p
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: '0.5625rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: '#555555',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              HOW IT WORKS
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                color: '#555555',
                fontSize: '0.875rem',
                lineHeight: 1.65,
                borderLeft: '2px solid #e8ff00',
                paddingLeft: '12px',
                marginBottom: '12px',
              }}
            >
              {service.mechanism}
            </p>

            {/* Outcome */}
            <p
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                color: '#e8ff00',
                fontSize: '0.8125rem',
                lineHeight: 1.55,
                marginBottom: '8px',
              }}
            >
              → {service.outcome}
            </p>

            {/* Who for */}
            <p
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                color: '#555555',
                fontSize: '0.8125rem',
                fontStyle: 'italic',
                lineHeight: 1.5,
                marginBottom: '0',
              }}
            >
              Best for: {service.whoFor}
            </p>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #1a1a1a', margin: '16px 0' }} />

            {/* Feature list */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {service.features.map((feature, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid #1a1a1a',
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                  }}
                >
                  <span
                    style={{
                      color: '#e8ff00',
                      flexShrink: 0,
                      fontSize: '0.875rem',
                      lineHeight: '1.4',
                    }}
                  >
                    →
                  </span>
                  <span style={{ color: '#555555', fontSize: '0.875rem', lineHeight: '1.4' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
