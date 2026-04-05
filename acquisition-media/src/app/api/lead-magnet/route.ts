import { NextRequest, NextResponse } from 'next/server'

const PLAYBOOK_URL = process.env.NEXT_PUBLIC_PLAYBOOK_URL ?? 'https://acquisitionmedia.co.uk/playbook'

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
  const name = firstName?.trim() || 'there'

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log(`[LeadMagnet] Lead captured (no RESEND_API_KEY): ${email}`)
    return NextResponse.json({ ok: true })
  }

  const subject = "The Acquisition Engine Playbook — yours now"

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
      PLATFORM DECISION · CAMPAIGN ARCHITECTURE · TRACKING · UK BENCHMARKS · CASE STUDY · AGENCY AUDIT
    </p>

    <p style="font-size:16px;line-height:1.7;color:#f0f0f0;margin:0 0 12px 0;">
      Hi ${name},
    </p>
    <p style="font-size:15px;line-height:1.75;color:#555555;margin:0 0 16px 0;">
      Here is the complete paid acquisition system we use for every client. Not a PDF with stock photos and generic advice — the actual thinking, the actual decisions, the actual numbers.
    </p>
    <p style="font-size:15px;line-height:1.75;color:#555555;margin:0 0 40px 0;">
      Seven sections. Platform decision framework, campaign architecture, full tracking setup, UK benchmark CPL data, the £7.25 case study in full detail, 10-question agency audit, and 6 warning signs. Read it in one sitting. Then decide if you want us to run it for you.
    </p>

    <div style="background:#0d0d0d;border:1px solid #1a1a1a;padding:28px 32px;margin:0 0 40px 0;">
      <p style="font-size:11px;font-weight:700;color:#e8ff00;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 20px 0;">WHAT'S INSIDE:</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">01</span>Platform Decision Framework — Google vs Meta vs TikTok for your niche</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">02</span>Campaign Architecture — the 5-step system that generates leads in 48 hours</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">03</span>Conversion Tracking Setup — the setup that makes £7 CPL possible</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">04</span>UK Benchmark CPL Table — 10 industries, what good/average/bad actually looks like</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">05</span>The £7.25 Case Study — 27 leads, £200, every decision explained</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">06</span>10-Question Agency Audit (good answer vs bad answer, side by side)</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#555555;"><span style="color:#e8ff00;margin-right:12px;">07</span>6 Warning Signs your agency isn't doing their job</td></tr>
      </table>
    </div>

    <a href="${PLAYBOOK_URL}" style="display:inline-block;background:#e8ff00;color:#060606;padding:18px 36px;font-family:Inter,Arial,sans-serif;font-weight:700;font-size:13px;letter-spacing:0.12em;text-decoration:none;text-transform:uppercase;">
      ACCESS YOUR PLAYBOOK →
    </a>

    <p style="font-size:12px;color:#333333;margin:48px 0 0 0;line-height:1.6;">
      One email. No sequences. No spam. Ever.<br>
      — Anas, Acquisition Media
    </p>
  </div>
</body>
</html>`

  // Try senders in order of preference. Always return success to frontend
  // so the form never shows an error — log failures for debugging.
  const senders = [
    process.env.RESEND_FROM,
    'Acquisition Media <onboarding@resend.dev>',
  ].filter(Boolean) as string[]

  // Deduplicate in case RESEND_FROM is already the fallback
  const uniqueSenders = [...new Set(senders)]

  for (const from of uniqueSenders) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ from, to: email.trim(), subject, html }),
      })

      if (res.ok) {
        console.log(`[LeadMagnet] Email sent to ${email} via ${from}`)
        return NextResponse.json({ ok: true })
      }

      const errText = await res.text()
      console.warn(`[LeadMagnet] Failed with sender "${from}": ${errText}`)
    } catch (err) {
      console.warn(`[LeadMagnet] Exception with sender "${from}":`, err)
    }
  }

  // All senders failed — log the lead but still return success to the user
  // so the form doesn't show an error. Check Resend dashboard / logs for delivery issues.
  console.error(`[LeadMagnet] All senders failed for ${email}. Check domain verification in Resend dashboard.`)
  return NextResponse.json({ ok: true })
}
