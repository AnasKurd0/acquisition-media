'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function InlineLeadCapture() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useGSAP(
    () => {
      gsap.fromTo(
        '.ilc-content',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      )
    },
    { scope: sectionRef }
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
      // Mark as captured so the entry modal won't show on next visit
      if (typeof window !== 'undefined') {
        localStorage.setItem('am_entry_modal_v1', 'captured')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      ref={sectionRef}
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid #1a1a1a',
        borderBottom: '1px solid #1a1a1a',
        paddingTop: '64px',
        paddingBottom: '64px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      <div
        className="ilc-content"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          gap: '48px',
          alignItems: 'center',
          flexWrap: 'wrap',
          opacity: 0,
        }}
      >
        {/* Left — copy */}
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <p style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: '0.625rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: '#e8ff00',
            textTransform: 'uppercase',
            margin: '0 0 12px 0',
          }}>
            FREE — THE ACQUISITION ENGINE PLAYBOOK
          </p>
          <h2 style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            lineHeight: 1.0,
            margin: '0 0 12px 0',
          }}>
            <span style={{ color: '#f0f0f0', display: 'block' }}>Growing a business is hard.</span>
            <span style={{ color: '#e8ff00', display: 'block' }}>We make it a whole lot easier.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            color: '#555555',
            fontSize: '0.9375rem',
            lineHeight: 1.65,
            margin: 0,
          }}>
            More predictable. Less guessing. More clients, less stress. Get the exact paid acquisition playbook we use for every client — platform decisions, campaign architecture, tracking setup, UK benchmarks, and the full £7.25 CPL case study. All of it, free.
          </p>
        </div>

        {/* Right — form */}
        <div style={{ flex: '1 1 280px', minWidth: 0 }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate>
              <p style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                color: '#f0f0f0',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                marginBottom: '12px',
              }}>
                Send me the playbook →
              </p>
              <div style={{ display: 'flex', gap: '0' }}>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#060606',
                    border: '1px solid #1a1a1a',
                    borderRight: 'none',
                    color: '#f0f0f0',
                    padding: '13px 16px',
                    fontSize: '0.9375rem',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    outline: 'none',
                    minWidth: 0,
                  }}
                  onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = '#e8ff00' }}
                  onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = '#1a1a1a' }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: '#e8ff00',
                    color: '#060606',
                    border: 'none',
                    padding: '13px 20px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {submitting ? '…' : 'GET IT →'}
                </button>
              </div>
              {error && (
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#ff4444', fontSize: '0.75rem', margin: '8px 0 0 0' }}>
                  {error}
                </p>
              )}
              <p style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                color: '#333333',
                fontSize: '0.6875rem',
                margin: '8px 0 0 0',
                lineHeight: 1.5,
              }}>
                One email. No sequences. No spam. Ever.
              </p>
            </form>
          ) : (
            <div>
              <p style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: '1.75rem',
                color: '#e8ff00',
                letterSpacing: '0.04em',
                margin: '0 0 8px 0',
              }}>
                IT&apos;S ON ITS WAY.
              </p>
              <p style={{
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                color: '#555555',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Check your inbox — the playbook arrives immediately. Check spam if it&apos;s not there in 2 minutes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
