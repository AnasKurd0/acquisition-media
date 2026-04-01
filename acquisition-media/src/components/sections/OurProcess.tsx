'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { steps } from '@/data/process'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { period: 'DAY 1–3', title: 'Discovery', desc: 'Discovery call + market audit + competitor research' },
  { period: 'DAY 4–7', title: 'Strategy', desc: 'Full strategy delivered. Website wireframes approved.' },
  { period: 'WEEK 2–3', title: 'Build begins', desc: 'Website build begins. Ad accounts + pixels set up.' },
  { period: 'WEEK 4–5', title: 'Launch', desc: 'Website live. First campaigns launched.' },
  { period: 'WEEK 6–8', title: 'First optimisation', desc: 'Data in. First optimisation cycle complete.' },
  { period: 'MONTH 3', title: 'Guarantee checkpoint', desc: 'Lead volume measured vs. baseline.' },
  { period: 'MONTH 4+', title: 'Compound growth', desc: 'Compound growth begins. Monthly retainer continues.' },
]

export default function OurProcess() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsContainerRef = useRef<HTMLDivElement>(null)
  const connectorLineRef = useRef<HTMLDivElement>(null)
  const verticalLineRef = useRef<HTMLDivElement>(null)
  const timelineLineRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Part 1 — Step cards stagger
      const cards = stepsContainerRef.current?.querySelectorAll<HTMLElement>('.step-card')
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        )
      }

      // Desktop horizontal connector line
      if (connectorLineRef.current) {
        gsap.fromTo(
          connectorLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        )
      }

      // Mobile vertical line (steps)
      if (verticalLineRef.current) {
        gsap.fromTo(
          verticalLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.4,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        )
      }

      // Part 2 — Timeline scrub line
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'power2.out',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 0.5,
            },
          }
        )
      }

      // Timeline milestone cards
      const validCards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      validCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              once: true,
            },
            delay: i * 0.05,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="our-process"
      ref={sectionRef}
      style={{ background: '#0d0d0d', paddingTop: '128px', paddingBottom: '128px', paddingLeft: '24px', paddingRight: '24px' }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

        {/* Part 1 — Steps */}
        <h2
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(48px, 7vw, 96px)',
            color: '#555555',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Four steps.
        </h2>
        <h2
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(48px, 7vw, 96px)',
            color: '#f0f0f0',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Clients in 90 days.
        </h2>

        <div className="relative mt-20" ref={stepsContainerRef}>
          {/* Desktop connector line */}
          <div
            className="hidden md:block absolute"
            style={{
              top: '30%',
              left: '0',
              right: '0',
              height: '1px',
              backgroundColor: '#1a1a1a',
              transformOrigin: 'left center',
            }}
            ref={connectorLineRef}
          />

          {/* Mobile vertical line */}
          <div
            className="md:hidden absolute"
            style={{
              top: 0,
              bottom: 0,
              left: '1.25rem',
              width: '1px',
              backgroundColor: '#1a1a1a',
              transformOrigin: 'top center',
            }}
            ref={verticalLineRef}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="step-card relative">
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                    fontSize: 'clamp(80px, 10vw, 140px)',
                    color: '#e8ff00',
                    opacity: 0.06,
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {step.number}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontSize: '0.75rem',
                    color: '#e8ff00',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    marginTop: '-1rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  STEP {step.number}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                    fontSize: 'clamp(24px, 3vw, 40px)',
                    color: '#f0f0f0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    color: '#555555',
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                    marginTop: '0.75rem',
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #1a1a1a', marginTop: '96px', marginBottom: '96px' }} />

        {/* Part 2 — Timeline */}
        <h2
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 6vw, 80px)',
            lineHeight: 1.05,
            margin: '0 0 64px 0',
          }}
        >
          <span style={{ color: '#555555', display: 'block' }}>Day by day.</span>
          <span style={{ color: '#f0f0f0', display: 'block' }}>No surprises.</span>
        </h2>

        <div style={{ display: 'flex', gap: '48px' }} className="timeline-layout">
          {/* Vertical line column */}
          <div
            style={{ position: 'relative', width: '2px', flexShrink: 0, alignSelf: 'stretch' }}
            className="timeline-line-col"
          >
            <div
              style={{
                position: 'absolute', top: 0, bottom: 0, left: 0,
                width: '2px', background: '#1a1a1a',
              }}
            />
            <div
              ref={timelineLineRef}
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '2px', height: '100%',
                background: '#e8ff00',
                transformOrigin: 'top center',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* Milestone cards */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0' }}>
            {milestones.map((m, i) => (
              <div
                key={m.period}
                ref={(el) => { cardRefs.current[i] = el }}
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                  paddingBottom: i < milestones.length - 1 ? '32px' : '0',
                  opacity: 0,
                }}
              >
                {/* Dot on line */}
                <div
                  style={{
                    width: '10px', height: '10px',
                    borderRadius: '50%', background: '#e8ff00',
                    flexShrink: 0, marginTop: '6px', marginLeft: '-54px',
                  }}
                />
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      color: '#e8ff00',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      marginBottom: '4px',
                    }}
                  >
                    {m.period}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                      fontSize: '1.375rem',
                      color: '#f0f0f0',
                      letterSpacing: '0.05em',
                      margin: '0 0 4px 0',
                    }}
                  >
                    {m.title.toUpperCase()}
                  </h3>
                  <p
                    style={{
                      color: '#555555',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .timeline-line-col { display: none !important; }
          .timeline-layout { flex-direction: column !important; gap: 0 !important; }
        }
      `}</style>
    </section>
  )
}
