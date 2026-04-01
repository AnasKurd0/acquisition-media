const STRIP_1_CONTENT =
  '★ PERFORMANCE WEBSITES ★ GOOGLE ADS ★ META ADS ★ TIKTOK ADS ★ LOCAL SEO ★ BOOKING SYSTEMS ★ FULL-FUNNEL MARKETING ★ 90-DAY GUARANTEE ★\u00A0'

const STRIP_2_CONTENT =
  "★ MORE CLIENTS ★ LESS GUESSWORK ★ ACQUISITION MEDIA ★ RESULTS OR YOU DON'T PAY ★ WEB DESIGN ★ PAID ADS ★ 90-DAY MONEY-BACK GUARANTEE ★\u00A0"

export default function Marquee() {
  return (
    <div aria-label="Services marquee">
      {/* Strip 1 — Electric Lime, scrolls left */}
      <div
        style={{
          background: '#e8ff00',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee-left 20s linear infinite',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              fontSize: '14px',
              letterSpacing: '0.15em',
              fontWeight: 700,
              color: '#060606',
            }}
          >
            {STRIP_1_CONTENT}
          </span>
          <span
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              fontSize: '14px',
              letterSpacing: '0.15em',
              fontWeight: 700,
              color: '#060606',
            }}
          >
            {STRIP_1_CONTENT}
          </span>
        </div>
      </div>

      {/* Strip 2 — Dark bg, scrolls right */}
      <div
        style={{
          background: '#0d0d0d',
          borderTop: '1px solid #1a1a1a',
          borderBottom: '1px solid #1a1a1a',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee-right 30s linear infinite',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              fontSize: '14px',
              letterSpacing: '0.15em',
              fontWeight: 700,
              color: '#f0f0f0',
            }}
          >
            {STRIP_2_CONTENT}
          </span>
          <span
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
              fontSize: '14px',
              letterSpacing: '0.15em',
              fontWeight: 700,
              color: '#f0f0f0',
            }}
          >
            {STRIP_2_CONTENT}
          </span>
        </div>
      </div>
    </div>
  )
}
