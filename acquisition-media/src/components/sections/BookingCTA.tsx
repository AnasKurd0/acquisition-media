'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { openCalendly } from '@/lib/calendly'
import { SPOTS_REMAINING, SPOTS_TOTAL } from '@/data/spots'

gsap.registerPlugin(ScrollTrigger)

const deliverables = [
  {
    num: '01',
    title: 'Your Acquisition Score',
    desc: "We audit your current digital footprint live — website, ads (if any), tracking, conversion path — and score it across 5 dimensions. You'll know exactly what's working, what's broken, and what the priority is.",
  },
  {
    num: '02',
    title: 'Your Target CPL',
    desc: "The exact cost-per-lead you should be paying, benchmarked against our first-party UK data for your specific niche and postcode. Not an industry estimate. The actual number your campaign will be held to.",
  },
  {
    num: '03',
    title: 'Your 90-Day Revenue Forecast',
    desc: "A custom financial model built for your business: lead volume projections at 3 spend levels (£10/day, £20/day, £50/day), with your average job value and close rate factored in. You'll know your downside, your likely case, and your upside — in pounds, not percentages.",
  },
  {
    num: '04',
    title: 'The 3 Quick Wins',
    desc: "Three specific, actionable changes you can make this week — to your website, your Google Business Profile, or your current ads — that will improve your conversion rate before a single pound is spent on paid traffic.",
  },
  {
    num: '05',
    title: 'Your Platform Recommendation',
    desc: "Google, Meta, or TikTok — and exactly why for your specific business. We'll explain the decision, walk you through the campaign structure we'd use, and show you which benchmark CPL you'd be targeting. You'll understand the full plan.",
  },
]

export default function BookingCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll<HTMLElement>('.bca-line')
        gsap.fromTo(
          lines,
          { y: '100%' },
          { y: '0%', duration: 0.8, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: headlineRef.current, start: 'top 70%', once: true } }
        )
      }
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: contentRef.current, start: 'top 75%', once: true } }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="booking"
      ref={sectionRef}
      style={{ background: '#060606', paddingTop: '128px', paddingBottom: '128px', paddingLeft: '24px', paddingRight: '24px' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Top badge */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block',
            border: '1px solid #e8ff00',
            color: '#e8ff00',
            padding: '4px 14px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}>
            FREE — {SPOTS_REMAINING} OF {SPOTS_TOTAL} FOUNDING SPOTS REMAINING
          </span>
        </div>

        {/* Headline */}
        <div ref={headlineRef} style={{ textAlign: 'center', marginBottom: '24px', position: 'relative' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(232,255,0,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
          {[
            { text: 'BOOK YOUR FREE', color: '#555555' },
            { text: 'ACQUISITION', color: '#f0f0f0' },
            { text: 'BLUEPRINT SESSION', color: '#e8ff00' },
          ].map(({ text, color }) => (
            <div key={text} style={{ overflow: 'hidden', lineHeight: 1 }}>
              <div
                className="bca-line"
                style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 8.5vw, 130px)', lineHeight: 0.95, color }}
              >
                {text}
              </div>
            </div>
          ))}
        </div>

        {/* Value statement */}
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 64px auto', textAlign: 'center' }}>
          30 minutes. A working session — not a sales call. You&apos;ll leave with a complete, custom growth plan whether you hire us or not. Most businesses tell us this is the best marketing consultation they&apos;ve ever had. Most have paid far more for less.
        </p>

        {/* Two-column layout */}
        <div className="bca-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'start' }}>

          {/* Left — what you get */}
          <div ref={contentRef} style={{ opacity: 0 }}>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 24px 0' }}>
              WHAT YOU GET ON THE CALL — YOURS TO KEEP:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {deliverables.map((d) => (
                <div key={d.num} style={{ background: '#0d0d0d', padding: '20px 24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, color: '#e8ff00', letterSpacing: '0.1em', flexShrink: 0, paddingTop: '3px' }}>{d.num}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '0.03em' }}>{d.title}</p>
                    <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', lineHeight: 1.65, margin: 0 }}>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(232,255,0,0.04)', border: '1px solid rgba(232,255,0,0.15)', padding: '16px 20px', marginTop: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', fontStyle: 'italic', margin: 0 }}>
                Standard value of a custom acquisition audit &amp; growth strategy
              </p>
              <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#e8ff00' }}>£1,200+</span>
            </div>
          </div>

          {/* Right — CTA + social proof */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* CTA box */}
            <div style={{ background: '#0d0d0d', border: '1px solid #e8ff00', padding: '36px 32px' }}>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
                BOOK NOW — FREE
              </p>
              <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(22px, 3vw, 32px)', color: '#f0f0f0', lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '0.03em' }}>
                YOUR CUSTOM ACQUISITION PLAN, BUILT LIVE IN 30 MINUTES.
              </p>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.65, margin: '0 0 28px 0' }}>
                We run 3 of these sessions per week. Once the {SPOTS_REMAINING} remaining founding spots are taken, the session structure changes and the founding rate disappears permanently.
              </p>

              <button
                type="button"
                onClick={openCalendly}
                style={{ display: 'block', width: '100%', background: '#e8ff00', color: '#060606', padding: '20px 32px', fontSize: '0.9375rem', fontWeight: 700, letterSpacing: '0.1em', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-inter), Inter, sans-serif', textAlign: 'center', transition: 'opacity 0.2s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
              >
                BOOK MY ACQUISITION BLUEPRINT →
              </button>

              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.75rem', lineHeight: 1.5, margin: '12px 0 0 0', fontStyle: 'italic', textAlign: 'center' }}>
                Free. No commitment. Yours to keep.
              </p>
            </div>

            {/* Social proof / testimonial strip */}
            <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '24px' }}>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#555555', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
                HOW PAST SESSIONS HAVE GONE:
              </p>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.7, margin: '0 0 12px 0', fontStyle: 'italic' }}>
                &ldquo;I came in sceptical. Left with a full campaign plan and a CPL target I could actually hold someone to. Best 30 minutes I&apos;ve spent on marketing.&rdquo;
              </p>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.75rem', margin: '0 0 20px 0' }}>
                — Hazhar M., Residential Cleaning Services
              </p>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', lineHeight: 1.65, margin: 0 }}>
                We run this as a working session — not a pitch. You talk. We build your plan live. If it makes sense to work together, we&apos;ll say so in the last 5 minutes. No pressure before that.
              </p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 900px) {
          .bca-grid { grid-template-columns: 1.1fr 0.9fr !important; }
        }
      `}</style>
    </section>
  )
}
