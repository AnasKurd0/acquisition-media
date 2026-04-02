'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { openCalendly } from '@/lib/calendly'
import { SPOTS_REMAINING } from '@/data/spots'

gsap.registerPlugin(ScrollTrigger)

// One-time deliverables — charged once at project start
const onetimeStack = [
  {
    name: 'Custom Conversion Website',
    desc: 'Hand-engineered to turn visitors into booked enquiries. Mobile-first, sub-1s load time, full SEO architecture, booking system wired in. Not a template. Not a WordPress theme. A purpose-built acquisition machine — built around the specific traffic your ads send.',
    value: '£9,500',
  },
  {
    name: 'Google Ads Campaign Build',
    desc: 'Deep keyword research, match-type architecture, negative keyword lists, Quality Score optimisation, ad copy written and A/B structured from day one. The campaign foundation determines your CPL for the entire life of the engagement — we build it right once.',
    value: '£2,800',
  },
  {
    name: 'Meta Ads Campaign Build',
    desc: 'Audience profiling, lookalike seeding, full funnel architecture — cold traffic, warm retargeting, hot conversion campaigns. Facebook and Instagram built as a single unified acquisition system, not two platforms bolted together with copy-pasted ads.',
    value: '£2,800',
  },
  {
    name: 'Full Conversion Tracking & Attribution Setup',
    desc: 'Google Tag Manager, GA4 with custom events, Meta Pixel with Conversions API, server-side tracking where needed, and UTM taxonomy across every touchpoint. Every lead traced to its exact source — platform, campaign, ad set, ad, keyword. The data layer that makes every decision provable.',
    value: '£2,200',
  },
  {
    name: 'High-Conversion Lead Capture Flow',
    desc: 'One tap from ad to booked appointment. Landing page copy, form architecture, calendar integration, thank-you page, and redirect logic — every friction point removed. The difference between 3% and 12% conversion rate is usually this flow.',
    value: '£1,500',
  },
]

// Monthly ongoing services — active for the life of the engagement
const monthlyStack = [
  {
    name: 'Google Ads — Daily Active Management',
    desc: 'Bid strategy adjusted daily. Search terms audited weekly. Ad copy rotated and tested continuously. Quality Score improved month-on-month. This is not a set-and-check service. Every day your campaigns run, someone who knows your account is watching them.',
    value: '£1,900/mo',
  },
  {
    name: 'Meta Ads — Creative Testing & Optimisation',
    desc: 'New creatives tested every two weeks. Audience pools refreshed as they saturate. Retargeting sequences built and rebuilt as prospects move through the funnel. Campaigns that compound — not campaigns that plateau at month two and quietly die.',
    value: '£1,900/mo',
  },
  {
    name: 'Weekly Performance Reports + Strategy',
    desc: "Every Monday. Cost per lead, lead volume, best-performing ads, what changed this week, what changes next week. Plain English — two minutes to read. No vanity metrics. No 'reach' and 'impressions' disguising a bad CPL. Numbers that tell you the truth.",
    value: '£600/mo',
  },
  {
    name: 'Direct Founder Access — WhatsApp + Same-Day Response',
    desc: "Your personal line to the person running your campaigns. Not a ticket system. Not a shared inbox routed to a junior. Anas's number, directly. Hours, not days. Any question, any time. No other agency on the planet offers this — because no other agency limits to 4 clients.",
    value: '£1,200/mo',
  },
]

const bonuses = [
  {
    num: '①',
    name: 'The 48-Hour Launch Watch',
    solves: 'The fear: nothing happens when we go live.',
    body: "For the first 48 hours your campaigns are live, Anas monitors every signal — every ad, every bid, every conversion event — morning and evening. Not automated alerts. Not a dashboard someone checks weekly. The person who built it, watching it run in real time. Problems caught in hours, not discovered at the monthly review. No agency carrying 50+ accounts can do this. With 4 clients, we always can.",
    value: '£2,500 market equivalent',
    note: 'Active from campaign launch — first 48 hours',
  },
  {
    num: '②',
    name: 'The Competitor Intelligence Report',
    solves: "The fear: they'll just run the same ads as everyone else.",
    body: "Before your first pound is spent, we reverse-engineer your top 3 local competitors — every live ad, every message angle, every platform they're active on. You enter the market knowing exactly what your audience has already seen and is bored of. You don't go live guessing. You go live knowing the gap. Most agencies never do this. We do it before we spend anything.",
    value: '£1,800 market equivalent',
    note: 'Delivered 7 days before launch',
  },
  {
    num: '③',
    name: 'Your 90-Day Pipeline Blueprint',
    solves: "The fear: I don't know if this is right for my business.",
    body: "On the strategy call, we build your 90-day acquisition plan live — target CPL benchmarked for your niche and postcode, projected lead volume at each spend level, which channel to launch first, and the exact metrics that signal it's working. Written. Specific. Yours permanently — whether you become a client or not. No asterisks.",
    value: '£1,200 value — yours free',
    note: 'Built live on the strategy call — yours to keep',
  },
  {
    num: '④',
    name: 'Lead Nurture Email Sequence',
    solves: "The fear: leads come in but don't convert.",
    body: "Most leads that don't book on day one are not lost — they're just undecided. We write a 5-email nurture sequence for your business: follow-up, objection handling, social proof, urgency, and close. Sent automatically to every enquiry who doesn't book within 48 hours. Agencies charge £2,400+ for standalone email copywriting. It's included.",
    value: '£2,400 market equivalent',
    note: 'Written before launch — automated from day one',
  },
  {
    num: '⑤',
    name: 'Founding Rate — Locked Permanently',
    solves: 'The fear: prices go up when we are dependent on them.',
    body: "Standard clients pay market rate. Founding clients — the first 4 — pay 40% below that rate, locked forever. Not for the first year. Not subject to review. Permanently. As we grow, as demand increases, as our results warrant higher fees — your rate does not change. The only way to access this is to be one of the first 4. After that, the door closes.",
    value: 'Priceless — no mechanism to recreate',
    note: `Only ${SPOTS_REMAINING} of the 4 founding spots remain`,
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
        gsap.fromTo(stackItems, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05, scrollTrigger: { trigger: stackRef.current, start: 'top 75%', once: true } })
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
            THE FULL OFFER — THE 90-DAY ACQUISITION ENGINE
          </p>
          <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(44px, 6.5vw, 96px)', lineHeight: 1.0, margin: '0 0 32px 0' }}>
            <span style={{ color: '#555555', display: 'block' }}>New clients.</span>
            <span style={{ color: '#f0f0f0', display: 'block' }}>Every week.</span>
            <span style={{ color: '#e8ff00', display: 'block' }}>You didn&apos;t touch it.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, maxWidth: '620px', margin: '0 auto 16px' }}>
            It is Monday morning. You check your phone before your first meeting. Three new enquiries from the weekend. You know exactly which ad generated each one, exactly what it cost, and exactly what is coming next week — because the numbers are in your report from this morning. You close your phone. Your pipeline is running. You did not touch it.
          </p>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.875rem', lineHeight: 1.65, maxWidth: '560px', margin: '0 auto', fontStyle: 'italic' }}>
            That is what The Acquisition Engine builds. Here is everything you receive — and exactly what it is worth at standard market rates.
          </p>
        </div>

        {/* Middle — two columns */}
        <div className="gso-middle" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', marginBottom: '48px' }}>

          {/* Left — the full stack */}
          <div>
            <div ref={stackRef}>

              {/* One-time deliverables */}
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', marginBottom: '16px' }}>
                ONE-TIME BUILD — DELIVERED BEFORE LAUNCH:
              </p>
              {onetimeStack.map((item, i) => (
                <div
                  key={i}
                  className="gso-item"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 0', borderBottom: '1px solid #1a1a1a', opacity: 0 }}
                >
                  <span style={{ color: '#e8ff00', fontSize: '0.875rem', flexShrink: 0, lineHeight: 1.5, marginTop: '1px' }}>★</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.0625rem', color: '#f0f0f0', letterSpacing: '0.04em', margin: 0, lineHeight: 1.1 }}>
                        {item.name.toUpperCase()}
                      </h3>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#e8ff00', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.06em', flexShrink: 0 }}>
                        {item.value}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* One-time subtotal */}
              <div className="gso-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#0d0d0d', border: '1px solid #1a1a1a', marginTop: '4px', marginBottom: '32px', opacity: 0 }}>
                <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>One-time build value</span>
                <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#f0f0f0' }}>£18,800</span>
              </div>

              {/* Monthly services */}
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', marginBottom: '16px' }}>
                ONGOING MANAGEMENT — ACTIVE EVERY DAY:
              </p>
              {monthlyStack.map((item, i) => (
                <div
                  key={i}
                  className="gso-item"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 0', borderBottom: '1px solid #1a1a1a', opacity: 0 }}
                >
                  <span style={{ color: '#e8ff00', fontSize: '0.875rem', flexShrink: 0, lineHeight: 1.5, marginTop: '1px' }}>★</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.0625rem', color: '#f0f0f0', letterSpacing: '0.04em', margin: 0, lineHeight: 1.1 }}>
                        {item.name.toUpperCase()}
                      </h3>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#e8ff00', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.06em', flexShrink: 0 }}>
                        {item.value}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* Monthly subtotal */}
              <div className="gso-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#0d0d0d', border: '1px solid #1a1a1a', marginTop: '4px', opacity: 0 }}>
                <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Monthly services × 12 months</span>
                <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#f0f0f0' }}>£67,200</span>
              </div>

              {/* Year 1 grand total */}
              <div className="gso-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 20px', background: '#0d0d0d', border: '2px solid #e8ff00', marginTop: '4px', opacity: 0 }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
                    Year 1 equivalent value if you hired the specialists separately
                  </p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', fontStyle: 'italic', margin: 0 }}>
                    Founding clients: 40% below this — locked permanently.
                  </p>
                </div>
                <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: '#e8ff00', flexShrink: 0, marginLeft: '16px' }}>£86,000+</span>
              </div>

            </div>
          </div>

          {/* Right — guarantees + scarcity + CTA */}
          <div ref={rightRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px', opacity: 0 }}>

            {/* Three Guarantees */}
            <div style={{ border: '1px solid #e8ff00', background: '#0d0d0d', padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(232,255,0,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', marginBottom: '20px' }}>
                  FIVE GUARANTEES. IN YOUR CONTRACT.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.15em', color: '#555555', textTransform: 'uppercase', margin: '0 0 6px 0' }}>① 90-DAY RESULTS GUARANTEE</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                    A specific lead number agreed and written into your contract before we start. Hit it in 90 days or we work without charge until we do. Not &ldquo;measurable improvement.&rdquo; A number.
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '20px', marginBottom: '20px' }}>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.15em', color: '#555555', textTransform: 'uppercase', margin: '0 0 6px 0' }}>② 48-HOUR FAST-START GUARANTEE</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                    First qualified enquiry from your Google Ads within 48 hours of launch — or billing pauses until it happens.
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '20px', marginBottom: '20px' }}>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.15em', color: '#555555', textTransform: 'uppercase', margin: '0 0 6px 0' }}>③ 30-DAY WORRY-FREE EXIT</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                    Unhappy with anything in your first 30 days — the communication, the direction, the creative. Full refund of your first month&apos;s retainer. No questions. No clauses.
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '20px', marginBottom: '20px' }}>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.15em', color: '#555555', textTransform: 'uppercase', margin: '0 0 6px 0' }}>④ COMPETITOR EXCLUSIVITY GUARANTEE</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                    We will never take a direct competitor as a client while you are active with us. One business per niche, per area. You do not compete for our attention — and your competitors cannot buy the same advantage.
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.15em', color: '#555555', textTransform: 'uppercase', margin: '0 0 6px 0' }}>⑤ FULL DATA OWNERSHIP GUARANTEE</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                    Your ad accounts, your website, your tracking, your data — all in your name, always. If you leave tomorrow, you walk away with everything we built. No hostage accounts. No ransom fees. Yours.
                  </p>
                </div>
              </div>
            </div>

            {/* Scarcity */}
            <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '28px' }}>
              <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(20px, 3vw, 32px)', color: '#e8ff00', lineHeight: 1.1, margin: '0 0 8px 0' }}>
                {SPOTS_REMAINING} OF 4 FOUNDING SPOTS REMAINING.
              </p>
              <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(13px, 2vw, 18px)', color: '#f0f0f0', lineHeight: 1.2, margin: '0 0 12px 0' }}>
                THESE {SPOTS_REMAINING} CLIENTS LOCK THIS RATE FOREVER. STANDARD CLIENTS PAY MARKET RATE.
              </p>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', lineHeight: 1.65, margin: 0 }}>
                After founding spots close, we continue taking standard clients at market rate — same service, same founder access, no locked pricing. Founding rate is only available to the {SPOTS_REMAINING} remaining. When they are gone, this price does not come back.
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
                30-minute call. We build your 90-day pipeline blueprint live — yours to keep whether you move forward or not. Pricing, lead targets, and timeline all confirmed on the call.
              </p>
            </div>
          </div>
        </div>

        {/* Bonuses — full width */}
        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', marginBottom: '8px' }}>
              5 FOUNDING CLIENT BONUSES — {SPOTS_REMAINING} SPOTS ONLY:
            </p>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '580px', margin: '0 auto' }}>
              Each bonus exists to dissolve one specific fear. We thought through every objection you might have — and decided to eliminate all of them.
            </p>
          </div>

          <div ref={bonusRef} className="gso-bonus-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2px', background: '#1a1a1a', marginBottom: '20px' }}>
            {bonuses.map((b) => (
              <div key={b.num} className="gso-bonus" style={{ background: '#0d0d0d', padding: '32px', opacity: 0 }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#e8ff00', flexShrink: 0, lineHeight: 1.1 }}>{b.num}</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.125rem', color: '#f0f0f0', letterSpacing: '0.04em', margin: '0 0 2px 0', lineHeight: 1.1 }}>
                      {b.name.toUpperCase()}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.75rem', fontStyle: 'italic', margin: 0 }}>
                      {b.solves}
                    </p>
                  </div>
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

          {/* Bonus total + grand total */}
          <div style={{ display: 'grid', gap: '2px', background: '#1a1a1a' }} className="gso-totals-grid">
            <div style={{ background: '#0d0d0d', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Founding bonus value (5 bonuses)</span>
              <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#f0f0f0' }}>£7,900+ (+ priceless)</span>
            </div>
            <div style={{ background: '#060606', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', border: '1px solid #e8ff00' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#e8ff00', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
                  TOTAL YEAR 1 EQUIVALENT VALUE
                </p>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', fontStyle: 'italic', margin: 0 }}>
                  Founding clients access this at 40% below standard market rate — permanently locked.
                </p>
              </div>
              <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#e8ff00', flexShrink: 0 }}>£93,900+</span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .gso-middle { grid-template-columns: 1.5fr 1fr !important; }
          .gso-bonus-grid { grid-template-columns: repeat(3, 1fr) !important; }
          /* 5th bonus spans full row on its own - actually let's do 3+2 natural flow */
          .gso-totals-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
