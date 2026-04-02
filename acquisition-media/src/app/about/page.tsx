'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { openCalendly } from '@/lib/calendly'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    title: 'Results are the only metric that matters.',
    body: "Not impressions. Not reach. Not a beautiful dashboard full of graphs that mean nothing. We measure success the same way you do: qualified leads in your pipeline and revenue in your account.",
  },
  {
    title: 'Fewer clients means better outcomes for everyone.',
    body: "Every agency says they care. The difference is structural. With a maximum of 4 clients, we have no choice but to care — because each one is a significant part of everything we do. That accountability produces better work.",
  },
  {
    title: 'Honest over comfortable.',
    body: "If paid ads are not the right move for your business right now, we will tell you. If a campaign is underperforming, we will tell you before you notice. We would rather lose a client than mislead one.",
  },
  {
    title: "Speed without shortcuts.",
    body: "48 hours to your first live Google Ads campaign. 4–6 weeks to a performance website. Fast because the process is tight — not because corners are cut. Every step has a reason.",
  },
]

const timeline = [
  {
    year: 'Late 2025',
    event: 'First campaign.',
    detail: "A residential and commercial cleaning company. No website, no ads, £200 budget. 27 qualified leads in 30 days at £7.25 cost-per-lead. The methodology that powers everything we do today was proven here.",
  },
  {
    year: 'Late 2025',
    event: 'Platform engineering.',
    detail: "Built a full multi-vendor marketplace from scratch — custom-engineered to process over £2 million in order value. The platform became the primary proof asset in investor conversations.",
  },
  {
    year: 'Late 2025',
    event: 'Organic performance.',
    detail: "Launched a conversion-first web presence for a multi-sector trade and consultancy firm. Inbound enquiries within three weeks of going live. £150,000+ in contracts closed with zero ad spend.",
  },
  {
    year: 'Early 2026',
    event: 'Acquisition Media launched.',
    detail: "The ad methodology, web engineering, and tracking systems formalised into one agency. 4 founding spots. Guaranteed results. Direct founder access. This site is the portfolio.",
  },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.about-hero-line'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12 }
        )
      }
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.querySelectorAll('[data-value]'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: valuesRef.current, start: 'top 75%', once: true } }
        )
      }
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.querySelectorAll('[data-entry]'),
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: timelineRef.current, start: 'top 75%', once: true } }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ background: '#060606', minHeight: '100vh', paddingTop: '100px' }}>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{ paddingBottom: '128px', paddingLeft: '24px', paddingRight: '24px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>

          <Link
            href="/"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: '#333333', textDecoration: 'none', textTransform: 'uppercase', display: 'inline-block', marginBottom: '48px' }}
            className="about-hero-line"
          >
            ← Acquisition Media
          </Link>

          <p className="about-hero-line" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', margin: '0 0 20px 0' }}>
            WHO WE ARE
          </p>

          <h1 className="about-hero-line" style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 1.0, margin: '0 0 32px 0' }}>
            <span style={{ color: '#f0f0f0', display: 'block' }}>Not a big agency.</span>
            <span style={{ color: '#e8ff00', display: 'block' }}>By design.</span>
          </h1>

          <p className="about-hero-line" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1.0625rem', lineHeight: 1.8, maxWidth: '600px', margin: 0 }}>
            Acquisition Media was founded by Anas Agha on a simple observation: the agencies charging the most deliver the least, because they take on too many clients to care about any of them. We built the opposite — a maximum of 4 clients, direct founder access, and a guarantee written into the contract before we start.
          </p>
        </div>
      </section>

      {/* ── Origin story ── */}
      <section style={{ paddingTop: '96px', paddingBottom: '96px', paddingLeft: '24px', paddingRight: '24px', borderBottom: '1px solid #1a1a1a', background: '#0d0d0d' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }} className="about-origin-grid">
          <div>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 24px 0' }}>
              WHY WE STARTED
            </p>
            <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 56px)', color: '#f0f0f0', lineHeight: 1.05, margin: '0 0 32px 0' }}>
              THE PROBLEM WITH MOST AGENCIES ISN&apos;T THEIR SKILLS. IT&apos;S THEIR INCENTIVES.
            </h2>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 20px 0' }}>
              A 50-client agency earns the same whether your campaign succeeds or fails. Your monthly retainer is revenue regardless of your results. There is no financial pressure on them to perform — only to retain you long enough to cover the next billing cycle.
            </p>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 20px 0' }}>
              We built Acquisition Media around the opposite incentive structure. With 4 clients maximum, every result we produce — or fail to produce — is immediately visible. Your success is our portfolio. Your failure is our reputation. That alignment doesn&apos;t happen at scale. It&apos;s only possible because we stay small deliberately.
            </p>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
              The 90-day guarantee isn&apos;t a marketing device. It&apos;s the logical result of believing in the process enough to be held accountable to it.
            </p>
          </div>
        </div>
      </section>

      {/* ── Track record timeline ── */}
      <section ref={timelineRef} style={{ paddingTop: '96px', paddingBottom: '96px', paddingLeft: '24px', paddingRight: '24px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
            THE WORK THAT GOT US HERE
          </p>
          <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 56px)', color: '#f0f0f0', lineHeight: 1.05, margin: '0 0 64px 0' }}>
            TRACK RECORD
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {timeline.map((item, i) => (
              <div
                key={i}
                data-entry
                style={{ display: 'grid', gap: '24px', paddingTop: '32px', paddingBottom: '32px', borderBottom: i < timeline.length - 1 ? '1px solid #1a1a1a' : 'none' }}
                className="about-timeline-row"
              >
                <div>
                  <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00' }}>
                    {item.year}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#f0f0f0', letterSpacing: '0.04em', margin: '0 0 12px 0', lineHeight: 1.1 }}>
                    {item.event.toUpperCase()}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.75, margin: 0 }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section ref={valuesRef} style={{ paddingTop: '96px', paddingBottom: '96px', paddingLeft: '24px', paddingRight: '24px', borderBottom: '1px solid #1a1a1a', background: '#0d0d0d' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
            HOW WE WORK
          </p>
          <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 56px)', color: '#f0f0f0', lineHeight: 1.05, margin: '0 0 64px 0' }}>
            WHAT WE BELIEVE
          </h2>

          <div style={{ display: 'grid', gap: '1px', background: '#1a1a1a' }} className="about-values-grid">
            {values.map((v, i) => (
              <div
                key={i}
                data-value
                style={{ background: '#0d0d0d', padding: '32px' }}
              >
                <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(18px, 2.2vw, 26px)', color: '#e8ff00', letterSpacing: '0.03em', margin: '0 0 12px 0', lineHeight: 1.15 }}>
                  {v.title.toUpperCase()}
                </h3>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.75, margin: 0 }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ paddingTop: '96px', paddingBottom: '96px', paddingLeft: '24px', paddingRight: '24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', margin: '0 0 20px 0' }}>
            2 FOUNDING SPOTS REMAINING
          </p>
          <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.0, margin: '0 0 24px 0' }}>
            <span style={{ color: '#f0f0f0', display: 'block' }}>If this resonates,</span>
            <span style={{ color: '#e8ff00', display: 'block' }}>let&apos;s talk.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 40px 0' }}>
            30 minutes. We audit your current situation, tell you exactly which channel is right for your business, and give you a written growth plan — whether you work with us or not.
          </p>
          <button
            type="button"
            onClick={openCalendly}
            style={{ background: '#e8ff00', color: '#060606', padding: '18px 44px', fontSize: '0.9375rem', fontWeight: 700, letterSpacing: '0.1em', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-inter), Inter, sans-serif', transition: 'opacity 0.2s ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
          >
            BOOK A FREE STRATEGY CALL →
          </button>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.8125rem', margin: '16px 0 0 0', fontStyle: 'italic' }}>
            Or email us directly: <a href="mailto:hello@acquisitionmedia.co.uk" style={{ color: '#555555', textDecoration: 'underline' }}>hello@acquisitionmedia.co.uk</a>
          </p>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .about-timeline-row { grid-template-columns: 80px 1fr !important; }
          .about-values-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
