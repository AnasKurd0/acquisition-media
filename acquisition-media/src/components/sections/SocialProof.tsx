'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '20+', label: 'Qualified leads', sub: 'In the first 30 days of advertising' },
  { value: '$10', label: 'Cost per lead', sub: 'Meta Ads campaign, local service' },
  { value: '£150K+', label: 'In client deals', sub: 'Generated from organic web presence' },
  { value: 'Millions', label: 'In order volume capacity', sub: 'E-commerce marketplace we built' },
]

const caseStudies = [
  {
    tag: 'PAID ADS · CREATIVE PRODUCTION',
    industry: 'Cleaning Services',
    result: '20 qualified leads. 30 days. $200 spend.',
    description: 'We scripted, filmed, and produced a full video commercial from scratch — then ran the Meta Ads campaign. Within 30 days: 20+ direct WhatsApp enquiries from ready-to-book customers. $10 cost-per-lead.',
    quote: "I didn't think social media advertising could work for a cleaning company. They proved me wrong. They produced a full commercial for us, ran the campaign, and within 30 days I had over 20 direct enquiries straight to my WhatsApp. The cost was less than I spend on a week of supplies. I've never had marketing work like that.",
    client: 'Business Owner, Cleaning Services',
    services: ['Meta Ads', 'Video Commercial', 'Creative Direction'],
    accent: true,
  },
  {
    tag: 'WEB ENGINEERING · INVESTOR POSITIONING',
    industry: 'E-commerce Marketplace',
    result: '5 investor leads. Millions in platform order value.',
    description: "Built a full multi-vendor marketplace — custom engineered, capable of hosting tens of thousands of users and processing millions in order value. The platform's quality became the primary asset in investor conversations.",
    quote: "They built something I genuinely didn't think a small team could deliver — a fully functional multi-vendor marketplace capable of hosting tens of thousands of users and processing millions in order value. The platform is the reason investors are taking us seriously. When I show them what's been built, the conversation changes immediately.",
    client: 'Founder & Director, Online Marketplace',
    services: ['Platform Engineering', 'Multi-Vendor System', 'Investor-Ready Build'],
    accent: false,
  },
  {
    tag: 'PERFORMANCE WEBSITE · ORGANIC GROWTH',
    industry: 'Trade & Consultancy Firm',
    result: '10+ organic leads. £150K+ in business value.',
    description: "Built a professional web presence for a multi-sector trade and consultancy firm. Within weeks of going live, organic enquiries were coming in — no ad spend required. Those conversations turned into business deals worth over £150,000.",
    quote: "Within weeks of the website going live, we were generating organic enquiries without spending a penny on ads. Those leads translated into real business conversations worth over £150,000. For a firm like ours, a professional online presence was the missing piece — and this delivered exactly that.",
    client: 'Director, Multi-Sector Trade & Consultancy Firm',
    services: ['Performance Website', 'Organic SEO Architecture', 'Conversion Design'],
    accent: false,
  },
]

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statBlocks = statsRef.current?.querySelectorAll<HTMLElement>('.sp-stat')
      if (statBlocks && statBlocks.length > 0) {
        gsap.fromTo(
          statBlocks,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true },
          }
        )
      }

      const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.sp-card')
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', once: true },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="social-proof"
      ref={sectionRef}
      style={{ background: '#0d0d0d', paddingTop: '128px', paddingBottom: '128px', paddingLeft: '24px', paddingRight: '24px' }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

        {/* Headline */}
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', marginBottom: '16px' }}>
          CLIENT RESULTS
        </p>
        <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1.05, margin: '0 0 64px 0' }}>
          <span style={{ color: '#f0f0f0', display: 'block' }}>Early work.</span>
          <span style={{ color: '#e8ff00', display: 'block' }}>Real results.</span>
        </h2>

        {/* Stats strip */}
        <div
          ref={statsRef}
          className="sp-stats-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: '#1a1a1a', marginBottom: '64px' }}
        >
          {stats.map((s, i) => (
            <div key={i} className="sp-stat" style={{ background: '#0d0d0d', padding: '32px', opacity: 0 }}>
              <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 5vw, 72px)', color: '#e8ff00', lineHeight: 1, margin: '0 0 4px 0' }}>
                {s.value}
              </p>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                {s.label}
              </p>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', margin: 0 }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Case study cards */}
        <div ref={cardsRef} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              className="sp-card sp-card-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                background: cs.accent ? '#0a0f00' : '#060606',
                border: `1px solid ${cs.accent ? '#e8ff00' : '#1a1a1a'}`,
                opacity: 0,
              }}
            >
              {/* Left — result + description */}
              <div style={{ padding: '40px', borderBottom: '1px solid #1a1a1a' }} className="sp-card-left">
                <span style={{ display: 'inline-block', color: '#e8ff00', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', fontFamily: 'var(--font-inter), Inter, sans-serif', marginBottom: '12px' }}>
                  {cs.tag}
                </span>
                <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(22px, 3vw, 36px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.1, margin: '0 0 16px 0' }}>
                  {cs.result.toUpperCase()}
                </h3>
                <p style={{ color: '#555555', fontSize: '0.9375rem', lineHeight: 1.75, margin: '0 0 24px 0', maxWidth: '480px' }}>
                  {cs.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cs.services.map((s) => (
                    <span key={s} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', color: '#555555', border: '1px solid #1a1a1a', padding: '4px 10px', textTransform: 'uppercase' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — quote */}
              <div
                style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: cs.accent ? 'rgba(232,255,0,0.03)' : 'transparent' }}
                className="sp-card-right"
              >
                <div style={{ width: '24px', height: '2px', background: '#e8ff00', marginBottom: '20px' }} />
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.75, fontStyle: 'italic', margin: '0 0 20px 0' }}>
                  &ldquo;{cs.quote}&rdquo;
                </p>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
                  — {cs.client}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Honest note */}
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', fontStyle: 'italic', lineHeight: 1.65, marginTop: '48px', maxWidth: '640px' }}>
          We&apos;re building our track record. These are our early results — and they&apos;re why we offer the guarantee. Because we know the methodology works.
        </p>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .sp-stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (min-width: 768px) {
          .sp-card-grid { grid-template-columns: 1fr 1fr !important; }
          .sp-card-left { border-bottom: none !important; border-right: 1px solid #1a1a1a; }
        }
      `}</style>
    </section>
  )
}
