import type { Metadata } from 'next'
import Link from 'next/link'
import { TrackBooking } from '@/components/ui/TrackBooking'

export const metadata: Metadata = {
  title: "You're Booked — Acquisition Media",
  description: "Your strategy call is confirmed. Here's what to expect.",
  robots: { index: false, follow: false },
}

interface BookingDetails {
  name: string
  startTime: string
}

async function fetchBookingDetails(inviteeUri: string): Promise<BookingDetails | null> {
  const token = process.env.CALENDLY_API_TOKEN
  if (!token) return null
  try {
    const eventUri = inviteeUri.replace(/\/invitees\/[^/]+$/, '')
    const [invRes, evRes] = await Promise.all([
      fetch(inviteeUri, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }),
      fetch(eventUri, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }),
    ])
    if (!invRes.ok || !evRes.ok) return null
    const { resource: inv } = await invRes.json() as { resource: { name: string } }
    const { resource: ev } = await evRes.json() as { resource: { start_time: string } }
    return { name: inv.name, startTime: ev.start_time }
  } catch {
    return null
  }
}

function formatCallTime(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/London',
    timeZoneName: 'short',
  })
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ iu?: string }>
}) {
  const params = await searchParams
  const booking = params.iu ? await fetchBookingDetails(decodeURIComponent(params.iu)) : null

  const firstName = booking?.name?.split(' ')[0] ?? null

  const steps = [
    {
      num: '01',
      title: 'Check your inbox',
      body: 'A calendar invite from Calendly is on its way — it has your call date, time, and join link. Check spam if you don\'t see it within 5 minutes.',
    },
    {
      num: '02',
      title: "We'll prepare before the call",
      body: "We'll review your website, your market, and your top competitors before we speak — so we come with insight, not questions.",
    },
    {
      num: '03',
      title: 'The call itself',
      body: "No slides. No scripts. We audit your current setup live, identify your fastest path to leads, and build your growth plan on the call. You leave with it in writing.",
    },
  ]

  return (
    <div style={{ background: '#060606', minHeight: '100vh', paddingTop: '100px', paddingBottom: '120px', paddingLeft: '24px', paddingRight: '24px' }}>
      <TrackBooking />
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Confirmation badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #e8ff00', padding: '5px 14px', marginBottom: '40px' }}>
          <span style={{ color: '#e8ff00', fontSize: '0.75rem', fontWeight: 700 }}>✓</span>
          <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#e8ff00', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Booking Confirmed
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 8vw, 104px)', lineHeight: 1.0, margin: '0 0 24px 0' }}>
          {firstName ? (
            <>
              <span style={{ color: '#f0f0f0', display: 'block' }}>{"You're in,"}</span>
              <span style={{ color: '#e8ff00', display: 'block' }}>{firstName}.</span>
            </>
          ) : (
            <span style={{ color: '#f0f0f0', display: 'block' }}>{"You're in."}</span>
          )}
        </h1>

        {/* Call time box — shown when Calendly API returns data */}
        {booking && (
          <div style={{ borderLeft: '3px solid #e8ff00', background: '#0d0d0d', padding: '16px 20px', marginBottom: '32px', display: 'inline-block' }}>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#555555', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
              Your call is confirmed for
            </p>
            <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.375rem', color: '#e8ff00', letterSpacing: '0.04em', margin: 0 }}>
              {formatCallTime(booking.startTime)}
            </p>
          </div>
        )}

        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1.0625rem', lineHeight: 1.75, margin: '0 0 64px 0' }}>
          {"Here's exactly what happens next."}
        </p>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{ display: 'flex', gap: '24px', paddingBottom: '40px', marginBottom: '40px', borderBottom: i < steps.length - 1 ? '1px solid #1a1a1a' : 'none' }}
            >
              <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '2rem', color: '#1a1a1a', flexShrink: 0, lineHeight: 1.1, letterSpacing: '0.05em' }}>
                {step.num}
              </span>
              <div>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.375rem', color: '#f0f0f0', letterSpacing: '0.04em', margin: '0 0 8px 0' }}>
                  {step.title.toUpperCase()}
                </h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.75, margin: 0 }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Playbook CTA */}
        <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '32px', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', marginBottom: '12px' }}>
            While you wait
          </p>
          <h3 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#f0f0f0', letterSpacing: '0.04em', margin: '0 0 8px 0' }}>
            READ THE PLAYBOOK
          </h3>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.7, margin: '0 0 20px 0' }}>
            {"The exact 3-step framework we use to fill calendars for local service businesses. Read it before the call and you'll get twice as much from the session."}
          </p>
          <Link
            href="/playbook"
            style={{ display: 'inline-block', background: '#e8ff00', color: '#060606', padding: '11px 24px', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.12em', textDecoration: 'none', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            READ THE PLAYBOOK →
          </Link>
        </div>

        {/* Footer note */}
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', lineHeight: 1.65 }}>
          Questions before the call?{' '}
          <a href="mailto:hello@acquisitionmedia.co.uk" style={{ color: '#f0f0f0', textDecoration: 'none', borderBottom: '1px solid #1a1a1a' }}>
            hello@acquisitionmedia.co.uk
          </a>
        </p>

      </div>
    </div>
  )
}
