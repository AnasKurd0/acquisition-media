import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Acquisition Media — Performance Websites & Paid Ads UK'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#060606',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Yellow accent border top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#e8ff00' }} />

        {/* Brand mark + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#e8ff00' }} />
          <span style={{ color: '#f0f0f0', fontSize: '18px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            ACQUISITION MEDIA
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginBottom: '40px' }}>
          <span style={{ color: '#f0f0f0', fontSize: '80px', fontWeight: 900, lineHeight: '0.95', letterSpacing: '-0.02em' }}>
            MORE CLIENTS.
          </span>
          <span style={{ color: '#f0f0f0', fontSize: '80px', fontWeight: 900, lineHeight: '0.95', letterSpacing: '-0.02em' }}>
            PREDICTABLY.
          </span>
          <span style={{ color: '#e8ff00', fontSize: '80px', fontWeight: 900, lineHeight: '0.95', letterSpacing: '-0.02em' }}>
            GUARANTEED.
          </span>
        </div>

        {/* Sub */}
        <p style={{ color: '#555555', fontSize: '22px', lineHeight: '1.5', margin: '0', maxWidth: '640px' }}>
          Performance websites + Google Ads + Meta Ads for UK local service businesses. 90-day results guarantee.
        </p>

        {/* Right side badge */}
        <div style={{
          position: 'absolute',
          right: '80px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #e8ff00',
          padding: '32px',
          gap: '8px',
        }}>
          <span style={{ color: '#e8ff00', fontSize: '48px', fontWeight: 900, lineHeight: 1 }}>90</span>
          <span style={{ color: '#e8ff00', fontSize: '14px', fontWeight: 700, letterSpacing: '0.15em' }}>DAY</span>
          <span style={{ color: '#f0f0f0', fontSize: '14px', fontWeight: 700, letterSpacing: '0.15em' }}>GUARANTEE</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
