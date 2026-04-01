'use client'
import { openCalendly } from '@/lib/calendly'

export default function FooterCTA() {
  return (
    <section className="bg-[#e8ff00] py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <p
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(56px, 9vw, 140px)',
            lineHeight: 1,
            color: '#060606',
            margin: 0,
          }}
        >
          YOUR COMPETITION
        </p>
        <p
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(56px, 9vw, 140px)',
            lineHeight: 1,
            color: '#060606',
            margin: 0,
          }}
        >
          ISN&apos;T WAITING.
        </p>
        <button
          type="button"
          onClick={openCalendly}
          className="mt-8 inline-block px-8 py-4 bg-[#060606] text-[#e8ff00] font-bold tracking-widest text-sm hover:bg-[#0d0d0d] transition-colors"
        >
          START GROWING TODAY →
        </button>
      </div>
    </section>
  )
}
