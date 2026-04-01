'use client'
import { openCalendly } from '@/lib/calendly'

const SPOTS_REMAINING = 4

export function AnnouncementBar() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        background: '#e8ff00',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      <p
        style={{
          margin: 0,
          color: '#060606',
          fontSize: '0.8125rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: '#060606',
            color: '#e8ff00',
            padding: '1px 8px',
            fontSize: '0.6875rem',
            letterSpacing: '0.15em',
            fontWeight: 700,
            marginRight: '10px',
            verticalAlign: 'middle',
          }}
        >
          {SPOTS_REMAINING} SPOTS LEFT
        </span>
        Founding client rate — 40% off, locked in forever. Ends when spots fill.
      </p>
      <button
        type="button"
        onClick={openCalendly}
        style={{
          background: '#060606',
          color: '#e8ff00',
          border: 'none',
          padding: '5px 16px',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          cursor: 'pointer',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          flexShrink: 0,
          transition: 'opacity 0.15s ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.8' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
      >
        CLAIM YOURS →
      </button>
    </div>
  )
}
