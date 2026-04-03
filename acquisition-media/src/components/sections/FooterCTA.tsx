'use client'

import { openCalendly } from '@/lib/calendly'
import { SPOTS_REMAINING } from '@/data/spots'

export default function FooterCTA() {
  return (
    <section style={{ background: '#e8ff00', paddingTop: '80px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(6,6,6,0.5)', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
          {SPOTS_REMAINING} FOUNDING SPOTS REMAINING — THEN THIS RATE IS GONE FOREVER
        </p>
        <div style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 8vw, 120px)', lineHeight: 0.95, color: '#060606', margin: '0 0 24px 0' }}>
          <div>EVERY DAY YOU WAIT,</div>
          <div>YOUR COMPETITORS</div>
          <div>GET MORE TIME.</div>
        </div>
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: 'rgba(6,6,6,0.6)', fontSize: '1rem', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 12px auto' }}>
          Founding rate is 40% below standard — locked permanently. The next client who books this spot pays that rate forever. The one after them pays full market rate.
        </p>
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: 'rgba(6,6,6,0.45)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 40px auto' }}>
          Once the {SPOTS_REMAINING} remaining spots are gone, this price does not come back. Not next quarter. Not ever.
        </p>
        <button
          type="button"
          onClick={openCalendly}
          style={{ display: 'inline-block', background: '#060606', color: '#e8ff00', padding: '18px 48px', fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.9375rem', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-inter), Inter, sans-serif', transition: 'opacity 0.2s' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
        >
          CLAIM YOUR FOUNDING SPOT →
        </button>
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: 'rgba(6,6,6,0.4)', fontSize: '0.75rem', margin: '16px 0 0 0', fontStyle: 'italic' }}>
          Free 30-minute session. No commitment. Your plan is yours to keep.
        </p>
      </div>
    </section>
  )
}
