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
    title: "YOU DON'T KNOW WHERE YOUR NEXT CLIENT IS COMING FROM.",
    description:
      "Some months you are turning work away. Others you are chasing invoices and wondering where the pipeline went. There is no system — only luck dressed as momentum. You cannot scale what you cannot predict.",
  },
  {
    number: '02',
    title: 'YOUR BEST CLIENTS FOUND YOU BY ACCIDENT.',
    description:
      "Referrals. Word of mouth. Someone who knew someone. The people who need you most are searching Google right now — and finding your competitors instead. 97% of buyers research online before contacting anyone. Most local businesses are invisible where it counts.",
  },
  {
    number: '03',
    title: "YOUR GROWTH DEPENDS ON WHO YOU KNOW, NOT HOW GOOD YOU ARE.",
    description:
      "You are exceptional at what you do. But the best business in your market is not winning — the most visible one is. Visibility is a system. Right now, you do not have one. You have a reputation. It does not compound on its own.",
  },
  {
    number: '04',
    title: "EVERY POUND YOU'VE SPENT ON MARKETING FELT LIKE A GAMBLE.",
    description:
      "You have tried something — ads, a website, maybe an agency. The money left. The uncertainty stayed. You have no idea which action drove the leads you did get, which means you cannot repeat it. That is not a marketing problem. That is a measurement problem.",
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
            Why your pipeline is
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
            unpredictable right now.
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
