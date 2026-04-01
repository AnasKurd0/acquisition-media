'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { openCalendly } from '@/lib/calendly'

gsap.registerPlugin(ScrollTrigger)

const coreStack = [
  { name: 'Performance Website', desc: 'Custom-engineered to convert visitors into enquiries. Mobile-first, sub-1s load, SEO architecture, booking system integrated.', value: '£4,500' },
  { name: 'Google Ads Management', desc: 'Full build, daily monitoring, bid optimisation. First leads typically within 48 hours of launch.', value: '£800/mo' },
  { name: 'Meta Ads Management', desc: 'Facebook + Instagram. Audience build, creative direction, A/B testing, retargeting. Done for you.', value: '£800/mo' },
  { name: 'Conversion Tracking Setup', desc: 'Google Tag Manager + conversion events. Every lead traced to its exact source. You know what works.', value: '£600' },
  { name: 'Booking System Integration', desc: 'One tap from ad to calendar. No friction. No drop-off between traffic and enquiry.', value: '£400' },
  { name: 'Weekly Reports + Live Dashboard', desc: 'Plain-English summary every week. Cost-per-lead is the only number that matters.', value: 'Included' },
  { name: 'Direct Access — No Account Managers', desc: 'WhatsApp and email to the person running your campaigns. Response within 24 hours.', value: 'Included' },
  { name: '90-Day Results Guarantee', desc: 'Measurable improvement in lead volume or next month is free. Written into your contract before we start.', value: 'Priceless' },
  { name: 'Month-to-Month After 90 Days', desc: 'Cancel with 30 days notice. No exit fees. No 12-month lock-in. You stay because it works.', value: 'Priceless' },
]

const bonuses = [
  {
    num: '①',
    name: 'The Competitor Intelligence Dossier',
    body: "Before we spend a penny, we audit your top 3 competitors — which platforms they're on, what creative is running, what appears to be working. You enter the market with an intelligence advantage most agencies never provide.",
    value: '£500–£2,000 value',
    note: 'Delivered within 7 days of onboarding',
  },
  {
    num: '②',
    name: 'The 12-Month Acquisition Blueprint',
    body: "A custom projection of your results at month 1, 3, 6, and 12 — based on your business, your market, your average client value. A roadmap built on real numbers, not industry averages.",
    value: '£800 value',
    note: 'Delivered at week 1 strategy call',
  },
  {
    num: '③',
    name: 'The 30-Day Founder Review',
    body: "Both founders personally review every ad, every headline, every targeting decision for your entire first month. Structurally impossible at a large agency. Only possible because we take 4 clients.",
    value: 'Impossible to buy elsewhere',
    note: 'Ongoing throughout month 1',
  },
]

export default function GrandSlamOffer() {
  const sectionRef = useRef<HTMLElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const bonusRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (topRef.current) {
        gsap.fromTo(topRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: topRef.current, start: 'top 75%', once: true } })
      }
      const stackItems = stackRef.current?.querySelectorAll<HTMLElement>('.gso-item')
      if (stackItems) {
        gsap.fromTo(stackItems, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.06, scrollTrigger: { trigger: stackRef.current, start: 'top 75%', once: true } })
      }
      if (rightRef.current) {
        gsap.fromTo(rightRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: rightRef.current, start: 'top 75%', once: true } })
      }
      const bonusItems = bonusRef.current?.querySelectorAll<HTMLElement>('.gso-bonus')
      if (bonusItems) {
        gsap.fromTo(bonusItems, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: bonusRef.current, start: 'top 80%', once: true } })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="grand-slam-offer"
      ref={sectionRef}
      style={{ background: '#060606', paddingTop: '128px', paddingBottom: '128px', paddingLeft: '24px', paddingRight: '24px', borderTop: '1px solid #e8ff00', borderBottom: '1px solid #e8ff00' }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

        {/* Top — dream outcome */}
        <div ref={topRef} style={{ textAlign: 'center', marginBottom: '80px', opacity: 0 }}>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', marginBottom: '24px' }}>
            THE FOUNDING CLIENT ACQUISITION SYSTEM
          </p>
          <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1.0, margin: '0 0 24px 0' }}>
            <span style={{ color: '#555555', display: 'block' }}>Wake up Monday.</span>
            <span style={{ color: '#f0f0f0', display: 'block' }}>Pipeline&apos;s full.</span>
            <span style={{ color: '#e8ff00', display: 'block' }}>No guessing. Just growth.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.75, maxWidth: '600px', margin: '0 auto' }}>
            Most agencies sell you campaigns. We build you a system. One that generates qualified leads week after week — without you thinking about it. Here is everything the four founding clients receive.
          </p>
        </div>

        {/* Middle — two columns */}
        <div className="gso-middle" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', marginBottom: '48px' }}>

          {/* Left — core stack */}
          <div>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', marginBottom: '20px' }}>
              EVERYTHING INCLUDED:
            </p>
            <div ref={stackRef} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {coreStack.map((item, i) => (
                <div
                  key={i}
                  className="gso-item"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px 0', borderBottom: '1px solid #1a1a1a', opacity: 0 }}
                >
                  <span style={{ color: '#e8ff00', fontSize: '1rem', flexShrink: 0, lineHeight: 1.5 }}>★</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.125rem', color: '#f0f0f0', letterSpacing: '0.04em', margin: 0, lineHeight: 1.1 }}>
                        {item.name.toUpperCase()}
                      </h3>
                    </div>
                    <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', lineHeight: 1.6, margin: '4px 0 0 0' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Value total */}
            <div style={{ marginTop: '20px', padding: '20px', background: '#0d0d0d', border: '1px solid #1a1a1a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
                  Equivalent value at a traditional agency:
                </p>
                <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#555555', textDecoration: 'line-through', margin: 0 }}>
                  £26,000+
                </p>
              </div>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', fontStyle: 'italic', margin: '8px 0 0 0' }}>
                Founding clients pay significantly less — and that rate is locked in forever.
              </p>
            </div>
          </div>

          {/* Right — guarantee + scarcity + CTA */}
          <div ref={rightRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px', opacity: 0 }}>

            {/* Guarantee */}
            <div style={{ border: '1px solid #e8ff00', background: '#0d0d0d', padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(232,255,0,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', marginBottom: '20px' }}>
                  TWO GUARANTEES. IN WRITING.
                </p>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.25rem', color: '#f0f0f0', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                    90-DAY RESULTS GUARANTEE
                  </h3>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                    Measurable improvement in your lead volume within 90 days — or we don&apos;t collect that month&apos;s retainer and keep working until we deliver. Written into the contract.
                  </p>
                </div>
                <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}>
                  <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.25rem', color: '#f0f0f0', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                    48-HOUR FAST-START GUARANTEE
                  </h3>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                    First qualified lead from your Google Ads within 48 hours of campaign launch — or we pause billing until it happens.
                  </p>
                </div>
              </div>
            </div>

            {/* Scarcity */}
            <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '32px', textAlign: 'center' }}>
              <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#e8ff00', lineHeight: 1.05, margin: '0 0 8px 0' }}>
                4 FOUNDING SPOTS. TOTAL.
              </p>
              <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(16px, 2.5vw, 24px)', color: '#f0f0f0', lineHeight: 1.05, margin: '0 0 16px 0' }}>
                NOT 4 PER MONTH. 4. EVER.
              </p>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                These four businesses get founding rates locked in forever, direct founder access, and the three bonuses below. When they&apos;re gone, this offer closes permanently — no waitlist, no exceptions.
              </p>
            </div>

            {/* CTA */}
            <div>
              <button
                type="button"
                onClick={openCalendly}
                style={{ display: 'block', width: '100%', background: '#e8ff00', color: '#060606', padding: '22px 40px', fontSize: '0.9375rem', fontWeight: 700, letterSpacing: '0.1em', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-inter), Inter, sans-serif', transition: 'opacity 0.2s ease', marginBottom: '12px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
              >
                LOCK IN YOUR FOUNDING RATE →
              </button>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', lineHeight: 1.6, margin: 0, fontStyle: 'italic', textAlign: 'center' }}>
                30-minute call. A custom growth plan for your business. Yours to keep whether you move forward or not.
              </p>
            </div>
          </div>
        </div>

        {/* Bonuses — full width */}
        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '48px' }}>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', marginBottom: '32px', textAlign: 'center' }}>
            FOUNDING CLIENT BONUSES — NEVER OFFERED AGAIN AFTER THESE 4 SPOTS:
          </p>
          <div ref={bonusRef} className="gso-bonus-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2px', background: '#1a1a1a' }}>
            {bonuses.map((b) => (
              <div key={b.num} className="gso-bonus" style={{ background: '#0d0d0d', padding: '32px', opacity: 0 }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#e8ff00', flexShrink: 0, lineHeight: 1.1 }}>{b.num}</span>
                  <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.125rem', color: '#f0f0f0', letterSpacing: '0.04em', margin: 0, lineHeight: 1.1 }}>
                    {b.name.toUpperCase()}
                  </h3>
                </div>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.65, margin: '0 0 16px 0' }}>
                  {b.body}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#e8ff00', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                    {b.value}
                  </span>
                  <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', fontStyle: 'italic' }}>
                    {b.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .gso-middle { grid-template-columns: 1.4fr 1fr !important; }
          .gso-bonus-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
