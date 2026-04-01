import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Acquisition Media',
  description: 'How Acquisition Media collects, uses, and protects your personal data.',
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: '1. Who We Are',
    content: `Acquisition Media is a performance marketing agency operating at acquisitionmedia.co.uk. We provide paid advertising management, performance website design, and full-funnel marketing services.

For the purposes of UK data protection law, Acquisition Media is the data controller responsible for your personal data.

Contact: hello@acquisitionmedia.co.uk`,
  },
  {
    title: '2. What Data We Collect',
    content: `We collect personal data in the following situations:

**When you submit the lead magnet form:**
— First name and email address (required)
— Business type (optional, if provided)

**When you book a strategy call via Calendly:**
— Name, email address, and any information you provide through the Calendly booking form. Calendly operates its own privacy policy which applies to data collected through their platform.

**When you visit our website:**
— Standard server logs (IP address, browser type, pages visited, time of visit) collected by Vercel, our hosting provider. This data is used for security and performance monitoring.
— We do not use analytics cookies or tracking pixels at this time.`,
  },
  {
    title: '3. How We Use Your Data',
    content: `**Lead magnet form submissions:**
— To deliver "The £200 Lead System" playbook to your email address
— We do not add you to marketing mailing lists or send follow-up sequences without your explicit consent
— We may contact you once to check whether the playbook was useful and whether we can help further. You can opt out of this contact at any time by replying to that email.

**Strategy call bookings:**
— To conduct the strategy call and prepare a growth plan for your business
— To follow up after the call if you request it

**Legal basis for processing (UK GDPR):**
— Lead magnet and enquiry data: Legitimate interest (delivering a requested service and conducting follow-up related to that service)
— All processing is limited to what is necessary for the stated purpose`,
  },
  {
    title: '4. How We Store and Protect Your Data',
    content: `Email submissions are processed via Resend (resend.com), a transactional email service. Resend stores sent email records on servers within the European Economic Area. Their privacy policy is available at resend.com/privacy.

Vercel (our hosting provider) processes server log data. Their privacy policy is available at vercel.com/legal/privacy-policy.

We do not sell, rent, or share your personal data with third parties for marketing purposes. We do not transfer your data outside the UK or EEA.

We retain email addresses and names from lead magnet submissions for a maximum of 24 months from the date of collection, after which they are deleted.`,
  },
  {
    title: '5. Your Rights',
    content: `Under UK GDPR, you have the right to:

— **Access** the personal data we hold about you
— **Rectification** of inaccurate or incomplete data
— **Erasure** ("right to be forgotten") — request that we delete your data
— **Restriction** of processing in certain circumstances
— **Data portability** — receive your data in a structured, commonly used format
— **Object** to processing based on legitimate interests

To exercise any of these rights, email us at hello@acquisitionmedia.co.uk. We will respond within 30 days.

You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) if you believe we have not handled your data correctly. ICO website: ico.org.uk`,
  },
  {
    title: '6. Cookies',
    content: `Our website uses only essential technical cookies required for the website to function. We do not use:

— Analytics cookies (Google Analytics, Hotjar, etc.)
— Advertising or retargeting cookies (Meta Pixel, Google Tag Manager)
— Non-essential third-party cookies

Calendly may set cookies when you interact with their booking widget. These are governed by Calendly's cookie policy.

You can control cookie settings in your browser at any time. Disabling essential cookies may affect website functionality.`,
  },
  {
    title: '7. Children',
    content: `Our services are intended for business owners and professionals. We do not knowingly collect personal data from anyone under the age of 18. If you believe we have collected data from a child, please contact us immediately at hello@acquisitionmedia.co.uk and we will delete it.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this privacy policy from time to time. Changes will be posted on this page with an updated effective date. If changes are material, we will note them at the top of this page.`,
  },
  {
    title: '9. Contact',
    content: `For any privacy-related questions, requests, or concerns:

Email: hello@acquisitionmedia.co.uk
Website: acquisitionmedia.co.uk`,
  },
]

export default function PrivacyPage() {
  return (
    <div style={{ background: '#060606', minHeight: '100vh', paddingTop: '100px', paddingBottom: '120px', paddingLeft: '24px', paddingRight: '24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '64px', paddingBottom: '48px', borderBottom: '1px solid #1a1a1a' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: '#555555', textDecoration: 'none', textTransform: 'uppercase', display: 'inline-block', marginBottom: '32px' }}>
            ← Acquisition Media
          </Link>
          <h1 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)', color: '#f0f0f0', lineHeight: 1.0, margin: '0 0 16px 0' }}>
            PRIVACY POLICY
          </h1>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', margin: 0 }}>
            Effective date: 1 April 2026 · Applies to acquisitionmedia.co.uk
          </p>
        </div>

        {/* Intro */}
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 64px 0' }}>
          We keep this short and plain. We collect very little data, we use it only for what you&apos;d expect, and we don&apos;t sell it to anyone. Here is everything you need to know.
        </p>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          {sections.map((section) => (
            <div key={section.title}>
              <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.375rem', color: '#f0f0f0', letterSpacing: '0.05em', margin: '0 0 20px 0' }}>
                {section.title}
              </h2>
              <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.8 }}>
                {section.content.split('\n\n').map((para, i) => {
                  if (para.startsWith('—')) {
                    const items = para.split('\n').filter(Boolean)
                    return (
                      <ul key={i} style={{ listStyle: 'none', margin: '0 0 16px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {items.map((item, j) => (
                          <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <span style={{ color: '#333333', flexShrink: 0 }}>—</span>
                            <span dangerouslySetInnerHTML={{ __html: item.replace(/^—\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong style="color:#f0f0f0">$1</strong>') }} />
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return (
                    <p
                      key={i}
                      style={{ margin: '0 0 16px 0' }}
                      dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#f0f0f0">$1</strong>') }}
                    />
                  )
                })}
              </div>
              <div style={{ height: '1px', background: '#1a1a1a', marginTop: '32px' }} />
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div style={{ marginTop: '64px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.8125rem', color: '#555555', textDecoration: 'none', borderBottom: '1px solid #1a1a1a', paddingBottom: '2px' }}>
            ← Back to site
          </Link>
          <Link href="/terms" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.8125rem', color: '#555555', textDecoration: 'none', borderBottom: '1px solid #1a1a1a', paddingBottom: '2px' }}>
            Terms of Service →
          </Link>
        </div>

      </div>
    </div>
  )
}
