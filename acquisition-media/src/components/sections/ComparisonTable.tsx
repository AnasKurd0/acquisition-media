'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { openCalendly } from '@/lib/calendly'

gsap.registerPlugin(ScrollTrigger)

const rows = [
  {
    feature: "Who runs your campaigns",
    us: "Anas — the founder. The same person you spoke to on the call.",
    them: "Junior account exec. The senior who pitched you has moved on.",
  },
  {
    feature: "When things go wrong",
    us: "Message Anas directly. Same-day response. We absorb the cost.",
    them: "Email the account team. Wait for next month's review. Bill stays.",
  },
  {
    feature: "How to reach us",
    us: "WhatsApp the founder. Hours, not days.",
    them: "Email the account manager. Allow 2–3 business days.",
  },
  {
    feature: "How many clients we run simultaneously",
    us: "Maximum 4. You are never a small fish.",
    them: "50–200+. Your account is line 83 on the client list.",
  },
  {
    feature: "When your campaign goes live",
    us: "Google Ads: 48 hours. Website: 4–6 weeks.",
    them: "Brief → strategy → review → approval → launch. 6–10 weeks.",
  },
  {
    feature: "What happens at day 90",
    us: "Results delivered — or we waive that month's retainer and keep working.",
    them: "Invoice sent. Results not guaranteed.",
  },
  {
    feature: "After year one",
    us: "Month-to-month. Cancel with 30 days notice. No exit fees.",
    them: "Roll into another 12-month contract. Or pay to leave.",
  },
]

export default function ComparisonTable() {
  const tableRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validRows = rowRefs.current.filter(Boolean) as HTMLTableRowElement[]
      gsap.fromTo(
        validRows,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="comparison"
      style={{
        background: '#0d0d0d',
        paddingTop: '128px',
        paddingBottom: '128px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 6vw, 80px)',
            lineHeight: 1.05,
            margin: '0 0 48px 0',
            textAlign: 'center',
          }}
        >
          <span style={{ color: '#555555', display: 'block' }}>You&apos;ve heard &ldquo;we&apos;re different&rdquo;</span>
          <span style={{ color: '#f0f0f0', display: 'block' }}>before. Let&apos;s be specific.</span>
        </h2>

        {/* Table wrapper */}
        <div
          ref={tableRef}
          style={{ overflowX: 'auto' }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: '0.875rem',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '16px 20px',
                    color: '#555555',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid #1a1a1a',
                    background: '#0d0d0d',
                    width: '30%',
                  }}
                >
                  Feature
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '16px 20px',
                    color: '#060606',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid #e8ff00',
                    background: '#e8ff00',
                    width: '35%',
                  }}
                >
                  ACQUISITION MEDIA
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '16px 20px',
                    color: '#555555',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid #1a1a1a',
                    background: '#060606',
                    width: '35%',
                  }}
                >
                  Traditional Agency
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  ref={(el) => { rowRefs.current[i] = el }}
                  style={{ opacity: 0 }}
                >
                  <td
                    style={{
                      padding: '16px 20px',
                      color: '#f0f0f0',
                      borderBottom: '1px solid #1a1a1a',
                      fontWeight: 500,
                      background: '#0d0d0d',
                    }}
                  >
                    {row.feature}
                  </td>
                  <td
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid rgba(232,255,0,0.15)',
                      background: 'rgba(232,255,0,0.04)',
                    }}
                  >
                    <span style={{ color: '#e8ff00', fontWeight: 600 }}>✓</span>
                    <span style={{ color: '#f0f0f0', marginLeft: '8px' }}>{row.us}</span>
                  </td>
                  <td
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid #1a1a1a',
                      background: '#060606',
                    }}
                  >
                    <span style={{ color: '#555555' }}>✗</span>
                    <span style={{ color: '#555555', marginLeft: '8px' }}>{row.them}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={openCalendly}
            style={{
              background: '#e8ff00',
              color: '#060606',
              padding: '16px 32px',
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
          >
            CLAIM YOUR FOUNDING SPOT →
          </button>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', marginTop: '12px', fontStyle: 'italic' }}>
            30 minutes. A custom growth plan. Yours to keep.
          </p>
        </div>
      </div>
    </section>
  )
}
