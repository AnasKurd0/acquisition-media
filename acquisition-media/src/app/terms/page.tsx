import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Acquisition Media',
  description: 'Terms governing the use of Acquisition Media services and website.',
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: '1. Overview',
    content: `These Terms of Service ("Terms") govern your use of acquisitionmedia.co.uk (the "Site") and any services provided by Acquisition Media ("we", "us", "our").

By accessing the Site or engaging our services, you agree to these Terms. If you do not agree, please do not use the Site or engage our services.

These Terms are governed by the laws of England and Wales.`,
  },
  {
    title: '2. Services',
    content: `Acquisition Media provides the following services:

— Performance website design and development
— Paid advertising management (Google Ads, Meta Ads, TikTok Ads)
— Conversion tracking and analytics setup
— Booking system integration
— Full-funnel marketing strategy

The specific scope, deliverables, timeline, and pricing for each engagement are agreed in a separate written contract ("Service Agreement") signed before work begins. In the event of any conflict between these Terms and a Service Agreement, the Service Agreement takes precedence.`,
  },
  {
    title: '3. The 90-Day Guarantee',
    content: `Where a Service Agreement includes the 90-Day Results Guarantee, the following terms apply:

**What is guaranteed:** Measurable improvement in lead volume or revenue compared to the agreed baseline, within 90 days of campaign launch.

**Baseline:** Agreed in writing at onboarding, prior to campaign launch, based on your historical lead volume or revenue data.

**If the guarantee is not met:** We will continue providing the services at no additional management fee for up to 60 additional days, until the baseline is surpassed. If the baseline is not surpassed within this extended period, we will discuss a fair resolution with you.

**What voids the guarantee:**
— Failure to provide timely access to ad accounts, website, or required materials
— Pausing or significantly modifying campaigns without our agreement
— Reducing the agreed monthly ad spend budget by more than 20%
— Inaccurate or withheld baseline data provided at onboarding

**The Fast-Start Guarantee:** Where included in a Service Agreement, we guarantee the first qualified enquiry from Google Ads within 48 hours of campaign launch. If this does not occur, billing is paused until the first enquiry is received. "Qualified enquiry" means a genuine contact from a prospective client, not spam or irrelevant contacts.`,
  },
  {
    title: '4. Payment Terms',
    content: `Payment terms, amounts, and schedules are set out in the Service Agreement. Unless otherwise agreed:

— Website build payments are split between project kickoff and final delivery
— Monthly retainer fees are invoiced at the start of each billing period
— Invoices are due within 14 days of issue
— Late payments may incur interest at 8% above the Bank of England base rate under the Late Payment of Commercial Debts Act 1998

We reserve the right to pause services if invoices remain unpaid for more than 30 days past the due date.`,
  },
  {
    title: '5. Cancellation and Exit',
    content: `**Ad management retainers:** After the initial 3-month minimum term, either party may terminate the agreement with 30 days' written notice. No exit fees or penalties apply.

**Website build projects:** Cancellation during the build process may result in a partial payment obligation for work completed to date, as set out in the Service Agreement.

**Your assets:** Upon full payment of all outstanding invoices, you own all creative assets, website code, and ad account materials we have produced for you. We do not hold your assets hostage.

**Our right to terminate:** We reserve the right to terminate a Service Agreement immediately if a client engages in unlawful activity, provides materially false information, or breaches these Terms in a way that cannot reasonably be remedied.`,
  },
  {
    title: '6. Client Responsibilities',
    content: `To allow us to deliver results, you agree to:

— Provide timely access to ad accounts, Google Analytics, website admin, and any other required platforms
— Respond to requests for approval, feedback, or information within 5 business days
— Provide accurate information about your business, target audience, and baseline metrics
— Maintain the agreed monthly ad spend budget throughout the engagement
— Not make significant changes to your website, ad accounts, or campaigns without informing us

We cannot guarantee results if client-side delays, access issues, or unauthorised changes prevent us from executing the agreed strategy.`,
  },
  {
    title: '7. Intellectual Property',
    content: `**Your assets:** All creative assets, website code, ad copy, and strategy documents produced specifically for your business become your property upon full payment. You own the final deliverables.

**Our methodology:** Our processes, frameworks, and internal systems remain our intellectual property. Engaging our services does not grant you a licence to resell, reproduce, or teach our methodology.

**Third-party tools:** Some deliverables may incorporate third-party platforms (Calendly, Google Ads, Meta Ads Manager, etc.) governed by their own terms of service. We are not responsible for changes those platforms make to their products.`,
  },
  {
    title: '8. Results and Liability',
    content: `**No guarantee of specific results:** Except where a written guarantee is included in a Service Agreement, we do not guarantee specific revenue, lead volume, conversion rates, or return on ad spend. Digital marketing results depend on factors including market conditions, competition, client offer quality, and budget — many of which are outside our control.

**Limitation of liability:** To the maximum extent permitted by law, our total liability to you for any claim arising from our services shall not exceed the total fees paid by you in the three months preceding the claim.

**We are not liable for:** Loss of profit, loss of data, or indirect/consequential loss arising from our services, except where caused by our gross negligence or wilful misconduct.

**Ad spend:** Monthly ad spend is paid directly by the client to the advertising platform (Google, Meta, TikTok). We do not handle client ad spend funds. Any ad spend decisions are ultimately the client's responsibility.`,
  },
  {
    title: '9. Confidentiality',
    content: `Both parties agree to keep confidential any proprietary business information shared during the engagement (including but not limited to pricing, client lists, strategy documents, and financial information).

This obligation survives the termination of the Service Agreement for a period of two years.`,
  },
  {
    title: '10. Website Use',
    content: `You may use acquisitionmedia.co.uk for lawful purposes only. You must not:

— Attempt to gain unauthorised access to any part of the Site
— Use the Site to distribute malware or engage in phishing
— Reproduce or republish content from the Site without our written permission

The Site and its contents are provided "as is." We do not warrant that the Site will be uninterrupted, error-free, or free from viruses.`,
  },
  {
    title: '11. Changes to These Terms',
    content: `We may update these Terms from time to time. The current version will always be posted at acquisitionmedia.co.uk/terms with an effective date. Continued use of the Site or our services after changes constitutes acceptance of the updated Terms.

For active Service Agreements, material changes to Terms will be communicated in writing and do not apply retroactively without your agreement.`,
  },
  {
    title: '12. Governing Law and Disputes',
    content: `These Terms are governed by the laws of England and Wales. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts of England and Wales.

In the first instance, we will always attempt to resolve disputes informally. Please contact us at hello@acquisitionmedia.co.uk before initiating any formal proceedings.`,
  },
  {
    title: '13. Contact',
    content: `Acquisition Media
hello@acquisitionmedia.co.uk
acquisitionmedia.co.uk`,
  },
]

export default function TermsPage() {
  return (
    <div style={{ background: '#060606', minHeight: '100vh', paddingTop: '100px', paddingBottom: '120px', paddingLeft: '24px', paddingRight: '24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '64px', paddingBottom: '48px', borderBottom: '1px solid #1a1a1a' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', color: '#555555', textDecoration: 'none', textTransform: 'uppercase', display: 'inline-block', marginBottom: '32px' }}>
            ← Acquisition Media
          </Link>
          <h1 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)', color: '#f0f0f0', lineHeight: 1.0, margin: '0 0 16px 0' }}>
            TERMS OF SERVICE
          </h1>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', margin: 0 }}>
            Effective date: 1 April 2026 · Governed by English law
          </p>
        </div>

        {/* Intro */}
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 64px 0' }}>
          These terms are written to be readable. If something isn&apos;t clear, email us at hello@acquisitionmedia.co.uk. We&apos;d rather clarify upfront than have a disagreement later.
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
                  if (para.includes('\n—')) {
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
          <Link href="/privacy" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.8125rem', color: '#555555', textDecoration: 'none', borderBottom: '1px solid #1a1a1a', paddingBottom: '2px' }}>
            Privacy Policy →
          </Link>
        </div>

      </div>
    </div>
  )
}
