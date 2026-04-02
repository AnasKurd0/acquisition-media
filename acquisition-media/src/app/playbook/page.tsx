'use client'

import { openCalendly } from '@/lib/calendly'

const tocItems = [
  { num: '01', title: 'The Brief', anchor: 'brief' },
  { num: '02', title: 'The Ad', anchor: 'ad' },
  { num: '03', title: 'The Targeting', anchor: 'targeting' },
  { num: '04', title: 'The Tracking', anchor: 'tracking' },
  { num: '05', title: 'The Results', anchor: 'results' },
  { num: '06', title: '6 Warning Signs', anchor: 'warning-signs' },
]

const warningSigns = [
  {
    sign: 'They send monthly reports.',
    detail: 'Weekly reporting is table stakes. Monthly PDFs give agencies four weeks of cover for every mistake. Ask for weekly reporting. If the answer is no, ask why.',
  },
  {
    sign: "You've never spoken to the person running your campaigns.",
    detail: '"Account manager" is a polite word for the layer between you and the people doing the actual work. If you can\'t get direct access to whoever built your campaign, you have no idea what\'s actually happening.',
  },
  {
    sign: 'They talk about impressions and reach instead of leads.',
    detail: "Impressions don't pay your rent. Leads do. If your agency's reports are full of reach numbers and engagement metrics but never mention cost-per-lead, they're hiding behind vanity metrics.",
  },
  {
    sign: 'They boosted posts instead of running proper campaigns.',
    detail: "Boosting a post is not advertising. It's spending money to show content to random people with no targeting, no optimisation, and no conversion tracking. Real campaigns are built in Ads Manager.",
  },
  {
    sign: "There's no conversion tracking set up.",
    detail: 'Ask your agency: "What conversion event are we optimising for?" If they can\'t answer immediately — or if the answer is "link clicks" — your budget is funding a guessing algorithm, not a learning one.',
  },
  {
    sign: 'They want a 12-month contract before proving anything.',
    detail: 'Confidence looks like: "Give us 90 days. If we don\'t deliver, you walk." A 12-month lock-in from a cold start is fear — fear that they won\'t be able to keep you otherwise.',
  },
]

const weeklyResults = [
  { week: 'Week 1', leads: '3', spend: '£50', cpl: '~£17', note: 'Algorithm learning' },
  { week: 'Week 2', leads: '6', spend: '£50', cpl: '~£8', note: 'Optimisation kicks in' },
  { week: 'Week 3', leads: '11', spend: '£50', cpl: '~£5', note: 'Algorithm found its audience' },
  { week: 'Week 4', leads: '7', spend: '£50', cpl: '~£7', note: 'Creative refresh, strong finish' },
]

const adSteps = [
  { time: '0–3s', label: 'HOOK', desc: "Show the problem. A messy, cluttered space the viewer recognises. If they don't stop here, nothing else matters." },
  { time: '3–8s', label: 'AGITATION', desc: 'Hold on the problem. Let the viewer feel the friction — the clutter, the embarrassment, the exhaustion of dealing with it themselves.' },
  { time: '8–20s', label: 'SOLUTION', desc: "Show the transformation. Clean, bright, satisfying. People don't want cleaning. They want a clean home. Every frame is built around that distinction." },
  { time: '20–25s', label: 'TRUST', desc: 'A testimonial line, a result, or a trust signal. One line is enough: "Over 50 homes cleaned this month." Simple. Credible.' },
  { time: '25–30s', label: 'CTA', desc: 'One action. Message us on WhatsApp. Not "visit our website." Not "learn more." One tap. One step. One decision.' },
]

export default function PlaybookPage() {
  return (
    <>
      <style>{`
        @media (min-width: 1024px) {
          .pb-layout { display: grid !important; grid-template-columns: 190px 1fr; gap: 80px; align-items: start; }
          .pb-toc { display: flex !important; }
        }
        .pb-section + .pb-section { margin-top: 80px; padding-top: 80px; border-top: 1px solid #1a1a1a; }
        .pb-callout { border-left: 3px solid #e8ff00; padding: 20px 24px; background: #0d0d0d; margin: 32px 0; }
        .pb-stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: #1a1a1a; }
        @media (min-width: 640px) { .pb-stat-grid { grid-template-columns: repeat(4, 1fr); } }
        .pb-results-table { background: #0d0d0d; border: 1px solid #1a1a1a; margin-bottom: 32px; }
        .pb-results-row { display: grid; grid-template-columns: 90px 60px 60px 60px; gap: 16px; padding: 14px 24px; border-bottom: 1px solid #1a1a1a; align-items: center; }
      `}</style>

      <div style={{ background: '#060606', minHeight: '100vh', paddingTop: '80px', paddingBottom: '120px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: '72px', paddingBottom: '72px', borderBottom: '1px solid #1a1a1a' }}>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', margin: '0 0 20px 0' }}>
              ACQUISITION MEDIA · FREE PLAYBOOK
            </p>
            <h1 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 1.0, margin: '0 0 0 0' }}>
              <span style={{ color: '#f0f0f0', display: 'block' }}>THE £200</span>
              <span style={{ color: '#e8ff00', display: 'block' }}>LEAD SYSTEM</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.75, margin: '24px 0 40px 0', maxWidth: '580px' }}>
              How we generated 27 qualified leads for £200 in 30 days. The exact ad creative, targeting decisions, tracking setup, and week-by-week results. No theory. No generic advice. Exactly what we did and why it worked.
            </p>
            <div className="pb-stat-grid">
              {[
                { val: '£200', label: 'Total Ad Spend' },
                { val: '27', label: 'Qualified Leads' },
                { val: '£7.25', label: 'Cost Per Lead' },
                { val: '30', label: 'Days' },
              ].map((s) => (
                <div key={s.label} style={{ background: '#0d0d0d', padding: '24px 20px' }}>
                  <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)', color: '#e8ff00', lineHeight: 1, margin: '0 0 4px 0' }}>{s.val}</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Body layout ── */}
          <div className="pb-layout" style={{ display: 'block' }}>

            {/* Sticky TOC — desktop only */}
            <div className="pb-toc" style={{ display: 'none', flexDirection: 'column', position: 'sticky', top: '48px' }}>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#555555', textTransform: 'uppercase', marginBottom: '16px' }}>
                CONTENTS
              </p>
              {tocItems.map((t) => (
                <a
                  key={t.anchor}
                  href={`#${t.anchor}`}
                  style={{ display: 'flex', gap: '10px', padding: '8px 0', textDecoration: 'none', alignItems: 'baseline', borderBottom: '1px solid #1a1a1a' }}
                >
                  <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, color: '#e8ff00', letterSpacing: '0.08em', flexShrink: 0 }}>{t.num}</span>
                  <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.8125rem', color: '#555555' }}>{t.title}</span>
                </a>
              ))}
            </div>

            {/* ── Main content ── */}
            <div>

              {/* 01 The Brief */}
              <div id="brief">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>01</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 24px 0' }}>THE BRIEF</h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                  The client ran a residential and commercial cleaning services business. No previous ads. No existing creative. No website. Total budget: £200.
                </p>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 24px 0' }}>
                  Most agencies would have passed. Too small. The fundamentals were right — which is all that matters:
                </p>
                <ul style={{ listStyle: 'none', margin: '0 0 24px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Local service business with a defined area',
                    'Clear target customer — households',
                    'Meaningful profit per job',
                    'WhatsApp as the booking channel — low friction, high conversion',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#e8ff00', fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
                  The goal was simple: generate direct WhatsApp messages from people ready to book a clean. Not website visits. Not form fills. People opening WhatsApp and typing &ldquo;I want a quote.&rdquo;
                </p>
              </div>

              {/* 02 The Ad */}
              <div id="ad" className="pb-section">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>02</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 24px 0' }}>THE AD</h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                  We scripted and produced a full video commercial from scratch. Not a boosted post. Not a static image with text over it. A structured ad built around one job: stopping the scroll and creating desire.
                </p>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 32px 0' }}>
                  The structure we used — the same one we use for every video ad we produce:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {adSteps.map((step) => (
                    <div key={step.label} style={{ display: 'grid', gridTemplateColumns: '56px 90px 1fr', gap: '16px', padding: '16px 0', borderBottom: '1px solid #1a1a1a', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.75rem', color: '#333333', fontStyle: 'italic', paddingTop: '2px' }}>{step.time}</span>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', color: '#e8ff00', paddingTop: '2px' }}>{step.label}</span>
                      <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pb-callout">
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 8px 0' }}>KEY INSIGHT</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                    The hook determines everything. If someone doesn&apos;t stop scrolling in the first 2 seconds, your targeting, your budget, and your offer are all irrelevant. Shoot multiple hook variations. Test them. The best-performing hook on a £200 campaign is worth knowing before you spend £2,000.
                  </p>
                </div>
              </div>

              {/* 03 The Targeting */}
              <div id="targeting" className="pb-section">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>03</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 24px 0' }}>THE TARGETING</h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                  The first decision on any campaign: Google or Meta? They are not interchangeable. They reach buyers at completely different moments.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', margin: '32px 0', background: '#1a1a1a' }}>
                  {[
                    { platform: 'GOOGLE ADS', type: 'CAPTURED INTENT', body: "Someone searches \"cleaning service near me.\" They're ready to book right now. Google puts you at the top of that moment. Best for: high-intent local searches where search volume exists." },
                    { platform: 'META ADS', type: 'CREATED INTENT', body: "Nobody scrolls Instagram looking for a cleaner. But show the right person the right creative and you create desire they didn't have five minutes ago. Best for: visual services, tight budgets, audiences that respond to transformation." },
                  ].map((col) => (
                    <div key={col.platform} style={{ background: '#0d0d0d', padding: '28px' }}>
                      <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 8px 0' }}>{col.platform}</p>
                      <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.125rem', color: '#f0f0f0', margin: '0 0 12px 0' }}>{col.type}</p>
                      <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{col.body}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 24px 0' }}>
                  For this campaign, we chose Meta. £200 wasn&apos;t enough to compete on Google in a competitive local market. The creative was strong enough to create desire. WhatsApp as a CTA fits Meta&apos;s user behaviour perfectly.
                </p>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>The exact audience:</p>
                <ul style={{ listStyle: 'none', margin: '0 0 24px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Women 25–55 (primary cleaning service buyers in this market)',
                    'Homeowners and renters — behavioural targeting',
                    '15km radius from the business location',
                    'Facebook Feed + Instagram Feed only — no Reels, no Stories for this campaign',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#e8ff00', fontWeight: 700, flexShrink: 0 }}>→</span>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pb-callout">
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 8px 0' }}>KEY INSIGHT</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                    A small budget spread across a massive audience is invisible. Tight targeting with strong creative beats broad targeting every time. When in doubt, go narrower — not wider.
                  </p>
                </div>
              </div>

              {/* 04 The Tracking */}
              <div id="tracking" className="pb-section">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>04</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 24px 0' }}>THE TRACKING</h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                  This is the section most agencies don&apos;t want you to read — because it exposes what they&apos;re not doing.
                </p>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 24px 0' }}>
                  Most businesses running Meta Ads are optimising for the wrong thing. They see &ldquo;link clicks&rdquo; in their dashboard and assume that means leads. It doesn&apos;t. Link clicks are people who tapped the ad. Leads are people who messaged you. The gap between those two numbers is where most ad budgets disappear.
                </p>
                <div className="pb-callout">
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 8px 0' }}>WHAT WE SET UP</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                    Meta can track WhatsApp button clicks as a custom conversion event. This tells the algorithm: &ldquo;find me more people who will do this specific thing.&rdquo; Without it, Meta optimises for page clicks. With it, Meta optimises for actual enquiries. Same budget. Completely different results.
                  </p>
                </div>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '32px 0 16px 0' }}>How to set it up:</p>
                <div>
                  {[
                    'Open Meta Events Manager',
                    'Create a custom conversion — name it "WhatsApp Lead"',
                    'Add the event pixel code to your WhatsApp button',
                    'Set your campaign objective to Conversions and select this event',
                    'Wait for 50+ conversions before drawing conclusions — this is how long the algorithm needs to learn who converts',
                  ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', padding: '14px 0', borderBottom: '1px solid #1a1a1a', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, color: '#e8ff00', letterSpacing: '0.1em', flexShrink: 0, paddingTop: '2px' }}>0{i + 1}</span>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.65 }}>{step}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.75, margin: '24px 0 0 0', fontStyle: 'italic' }}>
                  This single setup step is why our £7.25 CPL was achievable. Most businesses running the same ad without proper conversion tracking are paying £35–80+ per lead without ever knowing it.
                </p>
              </div>

              {/* 05 The Results */}
              <div id="results" className="pb-section">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>05</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 24px 0' }}>THE RESULTS</h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 32px 0' }}>
                  Here is what happened, week by week. The pattern below is normal for any properly built campaign — expensive early, improving fast as the algorithm learns.
                </p>
                <div className="pb-results-table">
                  <div className="pb-results-row">
                    {['WEEK', 'LEADS', 'SPEND', 'CPL'].map((h) => (
                      <span key={h} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', color: '#333333' }}>{h}</span>
                    ))}
                  </div>
                  {weeklyResults.map((row) => (
                    <div key={row.week} className="pb-results-row">
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.875rem', color: '#f0f0f0', fontWeight: 600 }}>{row.week}</span>
                      <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.375rem', color: '#e8ff00' }}>{row.leads}</span>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.875rem', color: '#555555' }}>{row.spend}</span>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.875rem', color: '#555555' }}>{row.cpl}</span>
                    </div>
                  ))}
                  <div className="pb-results-row" style={{ background: 'rgba(232,255,0,0.04)', borderBottom: 'none' }}>
                    <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.875rem', color: '#f0f0f0', fontWeight: 700 }}>TOTAL</span>
                    <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.75rem', color: '#e8ff00' }}>27</span>
                    <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.75rem', color: '#e8ff00' }}>£200</span>
                    <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.75rem', color: '#e8ff00' }}>£7.25</span>
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                  Of those 27 leads, 6 became paying clients in month one. Cleaning services recurring at £80/month. 6 clients × £80 × 6 months = <strong style={{ color: '#f0f0f0' }}>£2,880 in revenue from a £200 ad spend. A 14× return in 6 months — from a single campaign.</strong>
                </p>
                <div className="pb-callout">
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 8px 0' }}>THE LESSON</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                    Week 1 is always expensive. Don&apos;t judge a campaign by week 1. Don&apos;t pause it in week 2. Give the algorithm 90 days — that&apos;s when you have enough data to know whether the methodology works, not whether the first week was cheap.
                  </p>
                </div>
              </div>

              {/* 06 Warning Signs */}
              <div id="warning-signs" className="pb-section">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>06</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 24px 0' }}>
                  6 WARNING SIGNS YOUR AGENCY ISN&apos;T DOING THEIR JOB
                </h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 32px 0' }}>
                  Use this as a checklist before signing any marketing contract — or to audit an agency you&apos;re already paying.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {warningSigns.map((item, i) => (
                    <div key={i} style={{ background: '#0d0d0d', padding: '28px 32px', border: '1px solid #1a1a1a' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, color: '#e8ff00', letterSpacing: '0.1em', flexShrink: 0, paddingTop: '3px', whiteSpace: 'nowrap' }}>✗ {i + 1}</span>
                        <div>
                          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', fontWeight: 700, margin: '0 0 8px 0', lineHeight: 1.4 }}>
                            {item.sign}
                          </p>
                          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ marginTop: '80px', paddingTop: '80px', borderTop: '1px solid #e8ff00', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', margin: '0 0 20px 0' }}>
                  WHAT&apos;S NEXT
                </p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.0, margin: '0 0 24px 0' }}>
                  <span style={{ color: '#f0f0f0', display: 'block' }}>Want us to do</span>
                  <span style={{ color: '#e8ff00', display: 'block' }}>this for you?</span>
                </h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 40px auto' }}>
                  The same methodology. Applied to your business. Guaranteed to deliver more leads and more revenue within 90 days — or we work for free until we do. 2 founding spots remaining.
                </p>
                <button
                  type="button"
                  onClick={openCalendly}
                  style={{ background: '#e8ff00', color: '#060606', padding: '20px 48px', fontSize: '0.9375rem', fontWeight: 700, letterSpacing: '0.1em', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-inter), Inter, sans-serif', transition: 'opacity 0.2s ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                >
                  LOCK IN YOUR FOUNDING RATE →
                </button>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', margin: '16px 0 0 0', fontStyle: 'italic' }}>
                  30 minutes. A real growth plan. Yours to keep.
                </p>
                <p style={{ marginTop: '48px' }}>
                  <a href="/" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', letterSpacing: '0.08em', textDecoration: 'none', borderBottom: '1px solid #1a1a1a', paddingBottom: '2px' }}>
                    ← Back to acquisitionmedia.co.uk
                  </a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
