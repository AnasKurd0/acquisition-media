'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function ExitIntent() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    // Don't show on /qualify, /book, /thank-you pages
    const blocked = ['/qualify', '/book', '/thank-you']
    if (blocked.some((p) => window.location.pathname.startsWith(p))) return
    // Don't re-show if dismissed this session
    if (sessionStorage.getItem('exit-intent-dismissed')) return

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 20) return
      if (triggered.current) return
      triggered.current = true
      setVisible(true)
    }

    // Small delay so it doesn't fire immediately on page load
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', onMouseLeave)
    }, 8000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!visible || !overlayRef.current || !cardRef.current) return
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(cardRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 })
  }, [visible])

  function close() {
    if (!overlayRef.current) return
    sessionStorage.setItem('exit-intent-dismissed', '1')
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: () => {
        setVisible(false)
        setDismissed(true)
      }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: firstName.trim() || 'there', email: email.trim() }),
      })
    } catch { /* show success regardless */ }
    setLoading(false)
    setSubmitted(true)
    setTimeout(close, 3000)
  }

  if (!visible || dismissed) return null

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(6,6,6,0.85)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      <div
        ref={cardRef}
        style={{
          background: '#0d0d0d', border: '1px solid #e8ff00',
          maxWidth: '520px', width: '100%', padding: 'clamp(32px, 5vw, 48px)',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close"
          style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', color: '#333333', fontSize: '1.25rem', cursor: 'pointer', lineHeight: 1, padding: '4px' }}
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)', color: '#e8ff00', margin: '0 0 12px 0' }}>
              IT&apos;S ON ITS WAY.
            </p>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.65, margin: 0 }}>
              Check your inbox — the playbook arrives immediately. Check spam if it&apos;s not there in 2 minutes.
            </p>
          </div>
        ) : (
          <>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
              BEFORE YOU GO
            </p>
            <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.05, margin: '0 0 16px 0' }}>
              <span style={{ color: '#f0f0f0', display: 'block' }}>27 leads.</span>
              <span style={{ color: '#e8ff00', display: 'block' }}>£200 spend.</span>
              <span style={{ color: '#555555', display: 'block' }}>The exact playbook.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.7, margin: '0 0 28px 0' }}>
              The real case study — ad creative, targeting, tracking setup, and week-by-week results. £7.25 cost-per-lead. Free. No sales sequence.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="First name (optional)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ background: '#060606', border: '1px solid #1a1a1a', color: '#f0f0f0', padding: '13px 16px', fontSize: '0.9375rem', fontFamily: 'var(--font-inter), Inter, sans-serif', outline: 'none' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#555555' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#1a1a1a' }}
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ background: '#060606', border: '1px solid #1a1a1a', color: '#f0f0f0', padding: '13px 16px', fontSize: '0.9375rem', fontFamily: 'var(--font-inter), Inter, sans-serif', outline: 'none' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#555555' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#1a1a1a' }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{ background: '#e8ff00', color: '#060606', padding: '15px 24px', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-inter), Inter, sans-serif', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'SENDING...' : 'SEND ME THE PLAYBOOK →'}
              </button>
            </form>

            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.75rem', margin: '12px 0 0 0', fontStyle: 'italic', textAlign: 'center' }}>
              One email. No sequences. Unsubscribe any time.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
