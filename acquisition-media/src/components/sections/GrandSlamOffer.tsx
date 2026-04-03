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
    name: 'The 48-Hour Command Centre',
    solves: 'Eliminates: "What if nothing happens when we go live?"',
    body: "When your campaigns launch, Anas personally monitors every signal for the first 48 hours. CPL in real time. Bid strategy adjustments as data arrives. Conversion event verification. Creative performance by placement. Ad delivery pacing. Not automated alerts forwarded to a junior. The person who built your campaign, watching it run, making live adjustments the moment data starts moving. A problem caught in hour 2 doesn't cost you £800. A problem caught at the monthly review might cost you £4,000. This level of launch attention is physically impossible when you're managing 50+ accounts. With a maximum of 4 clients, it's standard.",
    value: '£2,500 market equivalent',
    note: 'Active from the moment campaigns go live',
  },
  {
    num: '②',
    name: 'The Video Ad Production Pack',
    solves: 'Eliminates: "I don\'t know how to make an ad that stops the scroll."',
    body: "We write a complete 30-second direct-response video script built specifically for your business, your target customer, and your service category — not a template with your name swapped in. The script is engineered around a single job: stop the scroll in 2 seconds, create desire in 20 seconds, remove friction in 8 seconds. Included: a shot-by-shot creative direction brief (what to film, in what order, what angles, what to say, what music works and what kills attention), a second hook variation to A/B test from day one, and a guide for filming on an iPhone that produces results indistinguishable from expensive production. You arrive on filming day. The strategy is done. The script is written. The direction is planned. Agencies charge £1,500+ for standalone video scripting. It arrives with your launch pack.",
    value: '£1,500 market equivalent',
    note: 'Delivered with your full launch pack',
  },
  {
    num: '③',
    name: 'The Competitor Intelligence Dossier',
    solves: 'Eliminates: "What if they just run the same ads as everyone else?"',
    body: "Seven days before your first ad runs, you receive a detailed intelligence report on your top 3 local competitors. Every live ad they're running across Google and Meta. The messaging angles they've already tested. The keywords they're bidding on and the specific gaps they're missing. The geographic areas they're neglecting. What their landing pages say. What their offers are. What they've abandoned — which usually means it didn't work. You enter the market knowing exactly what your audience has already seen and is bored of. You go live knowing the gap, not guessing at it. Most agencies never do this because it takes time. We do it because it determines the strategy for everything that follows.",
    value: '£1,800 market equivalent',
    note: 'Delivered 7 days before launch',
  },
  {
    num: '④',
    name: 'The "Dead Money" Audit',
    solves: 'Eliminates: "I\'ve tried ads before and wasted money. What\'s different?"',
    body: "If you've run any paid advertising previously — boosted posts, Google Express, a few hundred on Facebook — we do a forensic audit before we start. Every conversion event that fired or didn't fire. Every keyword that spent without converting. Every audience that burned budget without generating a qualified lead. A line-by-line breakdown of exactly where your money went and exactly why it didn't work. Then we explain what we're doing differently and why it produces a different result. The average business we audit has 4–7 fixable issues they don't know about. You'll know every one of them before we spend your first pound.",
    value: '£1,800 market equivalent',
    note: 'Completed before any spend — your baseline reset',
  },
  {
    num: '⑤',
    name: 'The Lead Nurture Machine (5-Email Sequence)',
    solves: 'Eliminates: "Leads come in, then disappear without booking."',
    body: "Most leads that don't convert on day one are not lost — they're undecided. Undecided leads choose whoever follows up first, most persistently, most credibly. Without a follow-up system, that's your competitor. We write and set up a 5-part automated email sequence for your business: same-hour arrival email, credibility builder with social proof, objection-handling email addressing the top 3 reasons people hesitate, case study email with a real result, and an urgency close. Triggered automatically for every enquiry that doesn't book within 48 hours. Average open rate on properly built sequences: 45%+. Agencies charge £2,400+ for standalone email copywriting. Built before your launch date — included.",
    value: '£2,400 market equivalent',
    note: 'Written before launch — automated from day one',
  },
  {
    num: '⑥',
    name: 'The Local Domination Package',
    solves: 'Eliminates: "I\'m invisible on Google Maps while competitors get free traffic."',
    body: "The fastest, cheapest leads in any local market come from Google Maps — and most businesses leave them on the table. Before your first paid ad goes live, we build your local organic presence: complete Google Business Profile optimisation (keyword-rich descriptions, full category structure, Q&A seeding with the exact questions your prospects search), photo strategy brief, and a post-booking review request system wired into your confirmation flow. The review system matters most: every client you close through paid ads feeds an automated flow that compounds your Maps ranking over time. Most local businesses have a 40% complete profile that actively costs them ranking. We fix it before any spend.",
    value: '£800 market equivalent',
    note: 'Completed in week 1 — before any campaigns launch',
  },
  {
    num: '⑦',
    name: 'The Permanent Rate Lock',
    solves: 'Eliminates: "Prices will increase once I\'m dependent on them."',
    body: "Every founding client receives one thing no standard client will ever access: their rate, permanently locked. Not locked for the first year. Not subject to annual review. Not revised when our results warrant higher fees — which they will. Permanently. The rate you agree on the day you sign is the rate you pay five years from now. Standard rates will increase. Founding rates do not. At a conservative 10% annual standard rate increase, this lock is worth over £60,000 in cumulative savings over 5 years — at current pricing. The mechanism to access this expires when the last founding spot is taken. After that, it is gone. There is no way to recreate it later.",
    value: '£60,000+ lifetime savings equivalent',
    note: `Only ${SPOTS_REMAINING} of 4 founding spots remain — then gone`,
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
              7 FOUNDING CLIENT BONUSES — {SPOTS_REMAINING} SPOTS ONLY:
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
              <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Founding bonus value (7 bonuses)</span>
              <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#f0f0f0' }}>£10,200+ cash (+ £60,000+ rate lock)</span>
            </div>
            <div style={{ background: '#060606', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', border: '1px solid #e8ff00' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#e8ff00', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
                  TOTAL EQUIVALENT VALUE (YEAR 1 SERVICES + BONUSES + RATE LOCK)
                </p>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', fontStyle: 'italic', margin: 0 }}>
                  Founding clients access everything at 40% below standard rate — permanently. Standard clients pay market rate from day one.
                </p>
              </div>
              <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#e8ff00', flexShrink: 0 }}>£156,200+</span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .gso-middle { grid-template-columns: 1.5fr 1fr !important; }
          .gso-bonus-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .gso-bonus-grid .gso-bonus:last-child { grid-column: 1 / -1 !important; }
          .gso-totals-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
