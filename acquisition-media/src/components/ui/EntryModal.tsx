'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'am_entry_modal_v1'

export function EntryModal() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Don't show if already dismissed or captured
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) return

    const timer = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, 'dismissed')
    setVisible(false)
  }

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
      localStorage.setItem(STORAGE_KEY, 'captured')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(6,6,6,0.85)',
          backdropFilter: 'blur(4px)',
          zIndex: 900,
          animation: 'em-fadein 0.35s ease',
        }}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="em-heading"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 901,
          width: '100%',
          maxWidth: '540px',
          background: '#0d0d0d',
          border: '1px solid #e8ff00',
          padding: '40px 36px 36px',
          animation: 'em-slidein 0.38s cubic-bezier(0.22,1,0.36,1)',
          margin: '0 16px',
          boxSizing: 'border-box',
        }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#555555',
            fontSize: '1.25rem',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '4px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#f0f0f0' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#555555' }}
        >
          ✕
        </button>

        {!submitted ? (
          <>
            {/* Badge */}
            <p style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#e8ff00',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              FREE — INSTANT DOWNLOAD
            </p>

            {/* Headline */}
            <h2
              id="em-heading"
              style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(32px, 6vw, 52px)',
                lineHeight: 0.95,
                color: '#f0f0f0',
                margin: '0 0 8px 0',
              }}
            >
              5–50+ NEW LEADS.
              <br />
              <span style={{ color: '#e8ff00' }}>THE EXACT SYSTEM. FREE.</span>
            </h2>

            {/* Subhead */}
            <p style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              color: '#555555',
              fontSize: '0.9375rem',
              lineHeight: 1.65,
              marginBottom: '24px',
            }}>
              The <strong style={{ color: '#f0f0f0' }}>Booked Solid Playbook</strong> — the exact Google &amp; Meta Ads system we use to generate qualified leads for local service businesses within 48 hours of launch. Platform decision framework, campaign architecture, and the 10-question audit that exposes why your current marketing isn&apos;t working.
            </p>

            {/* What's inside */}
            <div style={{
              background: '#060606',
              border: '1px solid #1a1a1a',
              padding: '16px 20px',
              marginBottom: '24px',
            }}>
              {[
                'Platform Decision Framework — Google vs Meta vs TikTok for your niche',
                'Campaign Architecture that generates leads within 48 hours',
                '10-Question Agency Audit (use it to evaluate us too)',
                'UK Benchmark CPL table by industry',
                'Real case study: 27 leads, £200 budget, local service business',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ color: '#e8ff00', flexShrink: 0, fontSize: '0.75rem', marginTop: '2px' }}>✓</span>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.8125rem', lineHeight: 1.5, margin: 0 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'flex', gap: '0', marginBottom: '12px', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    background: '#060606',
                    border: '1px solid #1a1a1a',
                    borderRight: 'none',
                    color: '#f0f0f0',
                    padding: '14px 16px',
                    fontSize: '0.9375rem',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    outline: 'none',
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
                    padding: '14px 24px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.7 : 1,
                    whiteSpace: 'nowrap',
                    transition: 'opacity 0.2s',
                  }}
                >
                  {submitting ? 'SENDING…' : 'SEND IT →'}
                </button>
              </div>
              {error && (
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#ff4444', fontSize: '0.8125rem', margin: '0 0 8px 0' }}>
                  {error}
                </p>
              )}
              <button
                type="button"
                onClick={dismiss}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#333333',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                  display: 'block',
                  textAlign: 'center',
                  width: '100%',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#555555' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#333333' }}
              >
                No thanks, I don&apos;t want more clients
              </button>
            </form>
          </>
        ) : (
          /* Success state */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📩</p>
            <h2 style={{
              fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
              fontSize: 'clamp(28px, 5vw, 44px)',
              color: '#e8ff00',
              margin: '0 0 12px 0',
              lineHeight: 1.1,
            }}>
              IT&apos;S ON ITS WAY.
            </h2>
            <p style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              color: '#555555',
              fontSize: '0.9375rem',
              lineHeight: 1.65,
              marginBottom: '28px',
            }}>
              Check your inbox — the Booked Solid Playbook is headed to <strong style={{ color: '#f0f0f0' }}>{email}</strong>. While you wait, have a look at exactly what we do and what we guarantee.
            </p>
            <button
              type="button"
              onClick={() => setVisible(false)}
              style={{
                background: '#e8ff00',
                color: '#060606',
                border: 'none',
                padding: '14px 32px',
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                cursor: 'pointer',
              }}
            >
              SEE THE OFFER →
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes em-fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes em-slidein {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 24px)); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }
        @media (max-width: 600px) {
          [role="dialog"] {
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            transform: none !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 32px 24px 40px !important;
            animation: em-slidein-mobile 0.38s cubic-bezier(0.22,1,0.36,1) !important;
          }
        }
        @keyframes em-slidein-mobile {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
