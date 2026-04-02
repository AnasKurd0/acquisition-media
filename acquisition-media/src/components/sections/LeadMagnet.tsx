'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { trackEvent } from '@/lib/analytics'

gsap.registerPlugin(ScrollTrigger)

const playbookSections = [
  { num: '01', title: 'The Brief', body: 'What the client needed. What we had to work with. Why the standard approach fails for local service businesses.' },
  { num: '02', title: 'The Ad', body: "The exact commercial we produced — creative direction, script structure, and what made it convert. Templates included." },
  { num: '03', title: 'The Targeting', body: "How we built the audience. Why we chose Facebook + Instagram over Google for this campaign. The settings that matter." },
  { num: '04', title: 'The Tracking', body: "How we made sure every enquiry was traced back to the ad. The one setup step most businesses skip — and how it costs them." },
  { num: '05', title: 'The Results', body: '20+ direct WhatsApp enquiries. 30 days. $200 spend. $10 per qualified lead. What happened and why.' },
  { num: '06', title: '6 Warning Signs Your Agency Isn\'t Doing Their Job', body: "A checklist every business owner should have before signing any marketing contract. Red flags that cost businesses thousands." },
]

export default function LeadMagnet() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [industry, setIndustry] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(leftRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: leftRef.current, start: 'top 75%', once: true } })
      }
      if (rightRef.current) {
        gsap.fromTo(rightRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: rightRef.current, start: 'top 75%', once: true } })
      }
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !email.trim()) return
    setLoading(true)
    try {
      await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim(), industry: industry.trim() }),
      })
    } catch {
      // show success regardless — never block the user on a network error
    }
    setLoading(false)
    setSubmitted(true)
    trackEvent('generate_lead', { event_category: 'lead_magnet', method: 'playbook_form' })
  }

  return (
    <section
      id="lead-magnet"
      style={{ background: '#060606', paddingTop: '96px', paddingBottom: '96px', paddingLeft: '24px', paddingRight: '24px', borderTop: '1px solid #1a1a1a' }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '64px' }} className="lm-cols">

        {/* Left — form */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', marginBottom: '16px' }}>
            NOT READY TO BOOK A CALL?
          </p>

          <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 5vw, 68px)', lineHeight: 1.0, margin: '0 0 8px 0' }}>
            <span style={{ color: '#f0f0f0', display: 'block' }}>How we got</span>
            <span style={{ color: '#e8ff00', display: 'block' }}>20 leads for $200.</span>
          </h2>
          <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(22px, 3vw, 36px)', color: '#555555', lineHeight: 1.1, margin: '0 0 24px 0' }}>
            In 30 days. The exact playbook.
          </h2>

          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '32px', maxWidth: '440px' }}>
            The real case study — ad creative, targeting, tracking setup, and results. Plus the 6 red flags that tell you an agency is wasting your money. Free. No pitch sequence.
          </p>

          {submitted ? (
            <div style={{ padding: '28px', border: '1px solid #e8ff00', background: '#0d0d0d' }}>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '1rem', fontWeight: 700, margin: '0 0 8px 0' }}>
                <span style={{ color: '#e8ff00', marginRight: '8px' }}>✓</span>
                It&apos;s on its way.
              </p>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', margin: 0 }}>
                Check your inbox — the playbook arrives immediately. If it&apos;s not there in 2 minutes, check spam.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '440px' }}>
              <input
                type="text"
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', color: '#f0f0f0', padding: '14px 16px', fontSize: '0.9375rem', fontFamily: 'var(--font-inter), Inter, sans-serif', outline: 'none', transition: 'border-color 0.2s ease' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#555555' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#1a1a1a' }}
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', color: '#f0f0f0', padding: '14px 16px', fontSize: '0.9375rem', fontFamily: 'var(--font-inter), Inter, sans-serif', outline: 'none', transition: 'border-color 0.2s ease' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#555555' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#1a1a1a' }}
              />
              <input
                type="text"
                placeholder="What does your business sell? (optional)"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', color: '#f0f0f0', padding: '14px 16px', fontSize: '0.9375rem', fontFamily: 'var(--font-inter), Inter, sans-serif', outline: 'none', transition: 'border-color 0.2s ease' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#555555' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#1a1a1a' }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{ background: '#e8ff00', color: '#060606', padding: '16px 24px', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-inter), Inter, sans-serif', transition: 'opacity 0.2s ease', opacity: loading ? 0.7 : 1 }}
                onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
              >
                {loading ? 'SENDING...' : 'SEND ME THE PLAYBOOK →'}
              </button>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', margin: 0, fontStyle: 'italic' }}>
                One email. No sales sequence. Arrives immediately.
              </p>
            </form>
          )}
        </div>

        {/* Right — playbook preview */}
        <div ref={rightRef} style={{ opacity: 0 }}>
          <div
            style={{ border: '1px solid #1a1a1a', background: '#0d0d0d', overflow: 'hidden', transition: 'box-shadow 0.3s ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 40px rgba(232,255,0,0.06)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
          >
            {/* Card header */}
            <div style={{ background: '#e8ff00', padding: '20px 28px' }}>
              <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.375rem', color: '#060606', letterSpacing: '0.08em', margin: '0 0 2px 0' }}>
                THE £200 LEAD SYSTEM
              </p>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.75rem', color: '#060606', fontWeight: 600, opacity: 0.7, margin: 0, letterSpacing: '0.06em' }}>
                CASE STUDY + FULL PLAYBOOK · 6 SECTIONS
              </p>
            </div>

            {/* Sections */}
            <div style={{ padding: '8px 0' }}>
              {playbookSections.map((s, i) => (
                <div
                  key={i}
                  style={{ padding: '16px 28px', borderBottom: i < playbookSections.length - 1 ? '1px solid #1a1a1a' : 'none' }}
                >
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, color: '#e8ff00', letterSpacing: '0.1em', flexShrink: 0, paddingTop: '2px' }}>
                      {s.num}
                    </span>
                    <div>
                      <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 700, color: '#f0f0f0', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 3px 0' }}>
                        {s.title}
                      </p>
                      <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', lineHeight: 1.55, margin: 0 }}>
                        {s.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div style={{ padding: '16px 28px', borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', fontStyle: 'italic', margin: 0 }}>
                Free. Apply immediately. No experience needed.
              </p>
              <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#e8ff00', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                £200 SPENT → 20 LEADS
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .lm-cols { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
