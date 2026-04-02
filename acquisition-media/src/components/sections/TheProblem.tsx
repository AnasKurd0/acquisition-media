'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface PainPoint {
  number: string
  title: string
  description: string
}

const PAIN_POINTS: PainPoint[] = [
  {
    number: '01',
    title: 'THEY BUILT YOU A PRETTY WEBSITE. THEN LEFT.',
    description:
      "A site that looks good but loads slow, isn't built for SEO, and has no booking system. Looks = vanity. Conversions = the goal.",
  },
  {
    number: '02',
    title: 'THEIR ADS SPENT YOUR BUDGET. THEN BLAMED THE MARKET.',
    description:
      'Generic targeting. No testing. Monthly PDFs full of graphs that say nothing. Your budget was their salary, not your results.',
  },
  {
    number: '03',
    title: 'THEY LOCKED YOU INTO 12 MONTHS. THEN UNDERDELIVERED.',
    description:
      "By the time you realised it wasn't working, you were 7 months into a contract you couldn't exit.",
  },
  {
    number: '04',
    title: "YOU'VE NEVER SPOKEN TO THE PERSON RUNNING YOUR CAMPAIGNS.",
    description:
      "The senior who pitched you moved on. Your account is now line 83 on a junior's list. You email 'the team'. You wait days. Your budget keeps spending.",
  },
]

export default function TheProblem() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Pain point blocks reveal
      gsap.fromTo(
        '.problem-block',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      )

      // Left border line draws down
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="problem"
      ref={sectionRef}
      style={{
        background: '#060606',
        paddingTop: '128px',
        paddingBottom: '128px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Section headline */}
        <div style={{ marginBottom: '0' }}>
          <div
            style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 1,
              color: '#555555',
              display: 'block',
            }}
          >
            Why your last agency
          </div>
          <div
            style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 1,
              color: '#f0f0f0',
              display: 'block',
            }}
          >
            didn't work.
          </div>
        </div>

        {/* Pain point blocks with optional left rule */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: '80px',
          }}
        >
          {/* Left border line — desktop only */}
          <div
            ref={lineRef}
            aria-hidden="true"
            style={{
              flexShrink: 0,
              width: '1px',
              background: '#1a1a1a',
              alignSelf: 'stretch',
              display: 'none',
            }}
            className="problem-left-line"
          />

          {/* Blocks stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '64px',
              maxWidth: '896px',
              width: '100%',
            }}
          >
            {PAIN_POINTS.map((point) => (
              <div
                key={point.number}
                className="problem-block"
                style={{ position: 'relative', opacity: 0 }}
              >
                {/* Ghost number */}
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                    fontSize: 'clamp(80px, 12vw, 160px)',
                    lineHeight: 1,
                    color: '#e8ff00',
                    opacity: 0.15,
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {point.number}
                </div>

                {/* Title overlapping ghost number */}
                <div
                  style={{
                    fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                    fontSize: 'clamp(28px, 4vw, 52px)',
                    color: '#f0f0f0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    lineHeight: 1.1,
                    marginTop: '-2rem',
                  }}
                >
                  {point.title}
                </div>

                {/* Description */}
                <p
                  style={{
                    color: '#555555',
                    fontSize: '18px',
                    lineHeight: 1.7,
                    maxWidth: '672px',
                    marginTop: '16px',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show left line on desktop via style tag */}
      <style>{`
        @media (min-width: 768px) {
          .problem-left-line {
            display: block !important;
          }
        }
      `}</style>
    </section>
  )
}
