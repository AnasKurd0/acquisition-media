'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { CALENDLY_URL } from '@/lib/calendly'
import { trackEvent } from '@/lib/analytics'

function CalendlyEmbed() {
  const embedRef = useRef<HTMLDivElement>(null)
  const initialised = useRef(false)

  useEffect(() => {
    // Redirect to /thank-you when booking is confirmed — bypasses Calendly's
    // own "continue to site?" dialog entirely
    function handleMessage(e: MessageEvent) {
      if (typeof e.data === 'object' && e.data?.event === 'calendly.event_scheduled') {
        const inviteeUri = (e.data as { payload?: { invitee?: { uri?: string } } })?.payload?.invitee?.uri
        const dest = inviteeUri
          ? `/thank-you?iu=${encodeURIComponent(inviteeUri)}`
          : '/thank-you'
        window.location.href = dest
      }
    }
    window.addEventListener('message', handleMessage)

    const init = () => {
      if (initialised.current) return
      if (!embedRef.current) return
      if (typeof window === 'undefined' || !window.Calendly) return
      initialised.current = true
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: embedRef.current,
      })
    }

    // Try immediately — script may already be loaded (SPA navigation)
    init()

    // Poll briefly in case script hasn't fired yet (direct page load)
    if (!initialised.current) {
      const interval = setInterval(() => {
        if (window.Calendly) {
          init()
          clearInterval(interval)
        }
      }, 150)
      const timeout = setTimeout(() => clearInterval(interval), 5000)
      return () => {
        window.removeEventListener('message', handleMessage)
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div
      ref={embedRef}
      style={{ minWidth: '320px', height: '700px', width: '100%' }}
    />
  )
}

export default function BookPage() {
  useEffect(() => {
    trackEvent('begin_checkout', { event_category: 'booking_intent' })
  }, [])

  return (
    <div style={{ background: '#060606', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Back link */}
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: '#555555', textDecoration: 'none', textTransform: 'uppercase', display: 'inline-block', marginBottom: '48px' }}
        >
          ← Acquisition Media
        </Link>

        <div className="book-layout" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px', alignItems: 'start' }}>

          {/* Left — copy */}
          <div>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', marginBottom: '16px' }}>
              FREE STRATEGY CALL — 30 MINUTES
            </p>
            <h1 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1.0, margin: '0 0 20px 0', color: '#f0f0f0' }}>
              A real plan.<br />
              <span style={{ color: '#e8ff00' }}>Yours to keep.</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 40px 0', maxWidth: '440px' }}>
              Not a sales call. A working session. You&apos;ll leave with a written growth plan for your business — whether you work with us or not.
            </p>

            {/* What we cover */}
            <div style={{ borderLeft: '2px solid #e8ff00', paddingLeft: '20px', marginBottom: '40px' }}>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#555555', textTransform: 'uppercase', marginBottom: '16px' }}>
                What we cover:
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Where your leads are coming from — and where you\'re losing them',
                  'Which channel (Google, Meta, TikTok) is right for your business type',
                  'What a realistic cost-per-lead looks like in your specific market',
                  'Exactly what we\'d do in the first 30 days as your client',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#e8ff00', fontWeight: 700, flexShrink: 0, fontSize: '0.875rem', lineHeight: 1.7 }}>→</span>
                    <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.7 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
              {['✓ Google Certified', '✓ Meta Certified', '✓ TikTok Certified'].map((b) => (
                <span key={b} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', color: '#f0f0f0', border: '1px solid #1a1a1a', padding: '4px 10px' }}>
                  {b}
                </span>
              ))}
            </div>

            {/* Scarcity note */}
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', lineHeight: 1.65, fontStyle: 'italic' }}>
              We&apos;re accepting 4 founding clients total. After that, standard rates apply and the bonuses close permanently.
            </p>
          </div>

          {/* Right — Calendly embed */}
          <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', overflow: 'hidden' }}>
            <CalendlyEmbed />
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .book-layout { grid-template-columns: 420px 1fr !important; }
        }
      `}</style>
    </div>
  )
}
