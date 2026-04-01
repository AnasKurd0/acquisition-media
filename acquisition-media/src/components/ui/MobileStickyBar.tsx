'use client'
import { useEffect, useState } from 'react'
import { openCalendly } from '@/lib/calendly'

export function MobileStickyBar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="mobile-sticky-bar" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      background: '#e8ff00', padding: '12px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
      transform: visible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.3s ease',
    }}>
      <p style={{ margin: 0, color: '#060606', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.05em', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
        4 founding spots remaining
      </p>
      <button type="button" onClick={openCalendly} style={{ background: '#060606', color: '#e8ff00', border: 'none', padding: '10px 20px', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.12em', cursor: 'pointer', fontFamily: 'var(--font-inter), Inter, sans-serif', flexShrink: 0 }}>
        BOOK FREE CALL →
      </button>
      <style>{`@media (min-width: 768px) { .mobile-sticky-bar { display: none !important; } }`}</style>
    </div>
  )
}
