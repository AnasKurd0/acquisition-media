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
  if (!email?.trim()) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }
  // firstName is optional — used in email greeting if provided
  const name = firstName?.trim() || 'there'

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM ?? 'Acquisition Media <onboarding@resend.dev>'

  if (!apiKey) {
    // Dev fallback — log the lead, return success so UX still works
    console.log(`[LeadMagnet] Lead captured (no RESEND_API_KEY): ${email} — ${name}`)
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
    <h1 style="font-family:'Bebas Neue',Arial,sans-serif;font-size:44px;color:#e8ff00;margin:0 0 4px 0;letter-spacing:0.05em;line-height:1.0;">
      THE ACQUISITION ENGINE
    </h1>
    <h2 style="font-family:'Bebas Neue',Arial,sans-serif;font-size:28px;color:#f0f0f0;margin:0 0 4px 0;letter-spacing:0.04em;line-height:1.1;">
      COMPLETE PLAYBOOK
    </h2>
    <p style="font-family:Inter,Arial,sans-serif;font-size:11px;color:#555555;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 40px 0;">
      PLATFORM DECISION · CAMPAIGN ARCHITECTURE · TRACKING · BENCHMARKS · CASE STUDY · AGENCY AUDIT
    </p>

    <p style="font-size:16px;line-height:1.7;color:#f0f0f0;margin:0 0 12px 0;">
      Hi ${name},
    </p>
    <p style="font-size:15px;line-height:1.75;color:#555555;margin:0 0 16px 0;">
      Here is the complete paid acquisition system we use for every client — the frameworks, the numbers, the decisions, the benchmarks. Six sections. Everything.
    </p>
    <p style="font-size:15px;line-height:1.75;color:#555555;margin:0 0 40px 0;">
      This is not an ebook with stock photos and vague advice. This is the actual thinking behind the 27 leads, £200 spend, £7.25 CPL campaign. Read it. Then decide if you want us to run it for you.
    </p>

    <div style="background:#0d0d0d;border:1px solid #1a1a1a;padding:28px 32px;margin:0 0 40px 0;">
      <p style="font-size:11px;font-weight:700;color:#e8ff00;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 20px 0;">WHAT'S INSIDE:</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">01</span>Platform Decision — Google vs Meta vs TikTok for your specific niche</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">02</span>Campaign Architecture — the structure that scales</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">03</span>Conversion Tracking — how to trace every lead to its exact source</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">04</span>48-Hour Health Check — UK benchmark CPL table by industry</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">05</span>The Case Study — 27 leads, £200 spend, £7.25 CPL. Every detail.</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">06</span>10-Question Agency Audit — use it to evaluate any agency (including us)</td></tr>
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
      body: JSON.stringify({ from, to: email.trim(), subject: "The Acquisition Engine Playbook — yours now", html }),
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
