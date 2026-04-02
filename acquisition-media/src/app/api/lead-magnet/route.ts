import { NextRequest, NextResponse } from 'next/server'

// To activate:
// 1. Sign up at https://resend.com (free — 3,000 emails/month)
// 2. Add a verified sending domain (or use onboarding@resend.dev for testing)
// 3. Add to .env.local:
//    RESEND_API_KEY=re_xxxxxxxxxxxx
//    RESEND_FROM=Acquisition Media <hello@yourdomain.com>
// 4. Upload your playbook PDF somewhere (Google Drive, Notion, S3, etc.)
//    and replace PLAYBOOK_URL below with the public link

const PLAYBOOK_URL = process.env.NEXT_PUBLIC_PLAYBOOK_URL ?? '#'

export async function POST(request: NextRequest) {
  let body: { firstName?: string; email?: string; industry?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { firstName, email } = body
  if (!firstName?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM ?? 'Acquisition Media <onboarding@resend.dev>'

  if (!apiKey) {
    // Dev fallback — log the lead, return success so UX still works
    console.log(`[LeadMagnet] Lead captured (no RESEND_API_KEY): ${email} — ${firstName}`)
    return NextResponse.json({ ok: true })
  }

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#060606;">
  <div style="background:#060606;color:#f0f0f0;font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:48px 32px;">
    <p style="font-family:'Bebas Neue',Arial,sans-serif;font-size:11px;color:#555555;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 24px 0;">
      ACQUISITION MEDIA
    </p>
    <h1 style="font-family:'Bebas Neue',Arial,sans-serif;font-size:40px;color:#e8ff00;margin:0 0 4px 0;letter-spacing:0.05em;line-height:1.05;">
      THE £200 LEAD SYSTEM
    </h1>
    <p style="font-family:Inter,Arial,sans-serif;font-size:12px;color:#555555;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 40px 0;">
      CASE STUDY + FULL PLAYBOOK · 6 SECTIONS
    </p>

    <p style="font-size:16px;line-height:1.7;color:#f0f0f0;margin:0 0 16px 0;">
      Hi ${firstName},
    </p>
    <p style="font-size:15px;line-height:1.75;color:#555555;margin:0 0 40px 0;">
      Here's the exact breakdown of how we generated 27 qualified leads for £200 in 30 days — the ad creative, targeting setup, tracking, and week-by-week results. Plus the 6 red flags that tell you an agency is wasting your money.
    </p>

    <div style="background:#0d0d0d;border:1px solid #1a1a1a;padding:28px 32px;margin:0 0 40px 0;">
      <p style="font-size:11px;font-weight:700;color:#e8ff00;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 20px 0;">WHAT'S INSIDE:</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">01</span>The Brief — what we had to work with</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">02</span>The Ad — exact commercial structure and script</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">03</span>The Targeting — audience build and platform choice</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">04</span>The Tracking — how we traced every lead</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">05</span>The Results — £7.25 CPL, 27 leads, 30 days</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">06</span>6 Warning Signs Your Agency Isn't Doing Their Job</td></tr>
      </table>
    </div>

    <a href="${PLAYBOOK_URL}" style="display:inline-block;background:#e8ff00;color:#060606;padding:18px 36px;font-family:Inter,Arial,sans-serif;font-weight:700;font-size:13px;letter-spacing:0.12em;text-decoration:none;text-transform:uppercase;">
      ACCESS YOUR PLAYBOOK →
    </a>

    <p style="font-size:12px;color:#333333;margin:48px 0 0 0;font-style:italic;line-height:1.6;">
      One email. No sequences. No spam. Ever.<br>
      — Acquisition Media
    </p>
  </div>
</body>
</html>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from, to: email.trim(), subject: "The £200 Lead System — your playbook is here", html }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[LeadMagnet] Resend error:', err)
      return NextResponse.json({ error: 'Send failed' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[LeadMagnet] Unexpected error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
