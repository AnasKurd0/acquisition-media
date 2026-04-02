'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { openCalendly } from '@/lib/calendly'
import { SPOTS_REMAINING } from '@/data/spots'

gsap.registerPlugin(ScrollTrigger)

const coreStack = [
  { name: 'Conversion-Engineered Website', desc: 'Custom-built to convert visitors into enquiries — not just look good. Mobile-first, sub-1s load, SEO architecture, booking system wired in.', value: '£4,500' },
  { name: 'Google Ads — Built, Managed, Optimised', desc: 'Full build, daily monitoring, bid optimisation. First enquiries typically arrive within 48 hours of campaign launch.', value: '£800/mo' },
  { name: 'Meta Ads — Done Completely For You', desc: 'Facebook + Instagram. Audience build, creative direction, A/B testing, retargeting. Not set up and left. Actively managed.', value: '£800/mo' },
  { name: 'Full Conversion Tracking Setup', desc: 'Google Tag Manager + conversion events wired to every lead source. You will always know which campaign, which ad, which keyword paid for itself.', value: '£600' },
  { name: 'Booking System Integration', desc: 'One tap from ad to calendar booking. No friction. No phone tag. No lost enquiries in a contact form nobody checks.', value: '£400' },
  { name: 'Weekly Performance Reports', desc: 'Plain-English summary every Monday. Cost-per-lead, what changed, what is changing next. Two minutes to read. No jargon. No excuses.', value: '£200/mo' },
  { name: 'Direct WhatsApp Access to Anas', desc: 'Personal number. Response within hours. The person running your campaigns is the person you can reach. Not a ticket system.', value: '£500/mo' },
  { name: '90-Day Results Guarantee', desc: 'A specific lead target agreed in writing before we start. Hit it or we work without charge until we do. No renegotiation.', value: 'Cannot be purchased elsewhere' },
  { name: 'Month-to-Month After 90 Days', desc: 'Cancel with 30 days notice. No exit fees. No 12-month lock-in. You stay because results compound — not because a contract forces you.', value: 'Cannot be purchased elsewhere' },
]

const bonuses = [
  {
    num: '①',
    name: 'The 48-Hour Launch Watch',
    body: "For the first 48 hours your campaign is live, Anas monitors every signal morning and evening — every ad, every bid, every conversion. Not automated. Not delegated. The person who built it, watching it in real time so problems are caught in hours, not the next monthly review. No agency managing 50+ clients can do this. We can because we cap at 4.",
    value: 'Cannot be purchased anywhere else',
    note: 'Active from campaign launch',
  },
  {
    num: '②',
    name: 'The Competitor Intelligence Sweep',
    body: "Before your first pound is spent, we reverse-engineer your top 3 competitors — every live ad, every tested angle, every active platform. You enter the market knowing exactly what your audience has already seen, what they are bored of, and where the gap is. You don't go live guessing. You go live knowing.",
    value: '£600+ equivalent value',
    note: 'Delivered 7 days before launch',
  },
  {
    num: '③',
    name: 'Your 90-Day Pipeline Blueprint',
    body: "On the strategy call, we build your custom 90-day plan — target CPL for your niche, projected lead volume at each spend level, which channel to launch first, and the exact metrics that tell us whether it's working. Written. Specific. Yours to keep permanently — whether you become a client or not. No strings attached.",
    value: '£500 value — yours free',
    note: 'Built live on the strategy call',
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
            THE ACQUISITION ENGINE — FOUNDING CLIENT PROGRAMME
          </p>
          <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(44px, 6.5vw, 96px)', lineHeight: 1.0, margin: '0 0 24px 0' }}>
            <span style={{ color: '#555555', display: 'block' }}>New clients.</span>
            <span style={{ color: '#f0f0f0', display: 'block' }}>Every week.</span>
            <span style={{ color: '#e8ff00', display: 'block' }}>Predictably.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.75, maxWidth: '600px', margin: '0 auto' }}>
            Not because you got lucky. Because you built a system. The Acquisition Engine is our proven paid acquisition methodology — deployed, managed, and guaranteed for your business. Here is everything founding clients receive.
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.125rem', color: '#f0f0f0', letterSpacing: '0.04em', margin: 0, lineHeight: 1.1 }}>
                        {item.name.toUpperCase()}
                      </h3>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', flexShrink: 0 }}>
                        {item.value}
                      </span>
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
                  Total equivalent value at a traditional agency:
                </p>
                <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#555555', textDecoration: 'line-through', margin: 0 }}>
                  £27,100+
                </p>
              </div>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', fontStyle: 'italic', margin: '8px 0 0 0' }}>
                Founding clients pay 40% below this — permanently locked in. As we scale and raise prices, founding clients keep their rate forever. Exact investment confirmed on the strategy call.
              </p>
            </div>
          </div>

          {/* Right — guarantees + scarcity + CTA */}
          <div ref={rightRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px', opacity: 0 }}>

            {/* Three Guarantees */}
            <div style={{ border: '1px solid #e8ff00', background: '#0d0d0d', padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(232,255,0,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', marginBottom: '20px' }}>
                  THREE GUARANTEES. IN WRITING.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.125rem', color: '#f0f0f0', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                    90-DAY RESULTS GUARANTEE
                  </h3>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                    We agree a specific lead target in your contract before a single pound is spent. Hit it within 90 days or we work without charge until we do. No renegotiation. No excuses.
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '20px', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.125rem', color: '#f0f0f0', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                    48-HOUR FAST-START GUARANTEE
                  </h3>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                    First qualified enquiry from your Google Ads within 48 hours of launch — or billing pauses until it happens.
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}>
                  <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.125rem', color: '#f0f0f0', letterSpacing: '0.05em', margin: '0 0 8px 0' }}>
                    30-DAY WORRY-FREE EXIT
                  </h3>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                    If you are unhappy with anything in your first 30 days — the communication, the direction, the creative — we refund your first month's retainer in full. No clauses. No minimum spend threshold. Full refund.
                  </p>
                </div>
              </div>
            </div>

            {/* Scarcity */}
            <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '32px', textAlign: 'center' }}>
              <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#e8ff00', lineHeight: 1.05, margin: '0 0 8px 0' }}>
                {SPOTS_REMAINING} OF 4 FOUNDING SPOTS REMAINING.
              </p>
              <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(15px, 2.2vw, 22px)', color: '#f0f0f0', lineHeight: 1.1, margin: '0 0 16px 0' }}>
                4 CLIENTS. MAXIMUM. EVER. THAT IS WHY THE GUARANTEE EXISTS.
              </p>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                The {SPOTS_REMAINING} remaining businesses receive founding rates locked permanently, all three bonuses below, and direct access to Anas for the life of the engagement. When they are gone, this offer closes. No waitlist.
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
                CLAIM ONE OF {SPOTS_REMAINING} REMAINING SPOTS →
              </button>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', lineHeight: 1.6, margin: 0, fontStyle: 'italic', textAlign: 'center' }}>
                30-minute call. We build your 90-day pipeline blueprint live. Pricing, timeline, and lead targets all confirmed on the call. Yours to keep whether you move forward or not.
              </p>
            </div>
          </div>
        </div>

        {/* Bonuses — full width */}
        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '48px' }}>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', marginBottom: '32px', textAlign: 'center' }}>
            FOUNDING CLIENT BONUSES — ONLY FOR THE REMAINING {SPOTS_REMAINING} SPOTS:
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
