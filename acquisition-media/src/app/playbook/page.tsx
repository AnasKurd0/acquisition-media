'use client'

import { openCalendly } from '@/lib/calendly'

const tocItems = [
  { num: '01', title: 'Platform Decision Framework', anchor: 'platform' },
  { num: '02', title: 'Campaign Architecture', anchor: 'architecture' },
  { num: '03', title: 'Conversion Tracking', anchor: 'tracking-setup' },
  { num: '04', title: 'UK Benchmark CPL Table', anchor: 'benchmarks' },
  { num: '05', title: 'The £7.25 Case Study', anchor: 'case-study' },
  { num: '06', title: '10-Question Agency Audit', anchor: 'audit' },
  { num: '07', title: '6 Warning Signs', anchor: 'warning-signs' },
]

const platformRows = [
  { industry: 'Home cleaning / housekeeping', google: '—', meta: '✓✓', tiktok: '✓' },
  { industry: 'Landscaping / gardening', google: '✓', meta: '✓✓', tiktok: '—' },
  { industry: 'Construction / renovation', google: '✓', meta: '✓✓', tiktok: '—' },
  { industry: 'Plumbing / electricians / trades', google: '✓✓', meta: '✓', tiktok: '—' },
  { industry: 'Dentistry / aesthetics', google: '✓✓', meta: '✓✓', tiktok: '✓' },
  { industry: 'Law / solicitors', google: '✓✓', meta: '✓', tiktok: '—' },
  { industry: 'Accountancy / financial services', google: '✓✓', meta: '—', tiktok: '—' },
  { industry: 'Personal training / wellness', google: '—', meta: '✓✓', tiktok: '✓✓' },
  { industry: 'Restaurants / hospitality', google: '✓', meta: '✓✓', tiktok: '✓✓' },
  { industry: 'Property management / letting', google: '✓✓', meta: '✓', tiktok: '—' },
]

const benchmarks = [
  { industry: 'Home cleaning', platform: 'Meta', good: '£5–15', avg: '£20–40', bad: '£60+' },
  { industry: 'Landscaping / gardening', platform: 'Meta', good: '£10–25', avg: '£35–70', bad: '£120+' },
  { industry: 'Construction / renovation', platform: 'Meta / Google', good: '£20–50', avg: '£60–120', bad: '£250+' },
  { industry: 'Trades (plumbing, electric)', platform: 'Google', good: '£15–40', avg: '£50–100', bad: '£180+' },
  { industry: 'Dentistry / aesthetics', platform: 'Google / Meta', good: '£20–50', avg: '£60–120', bad: '£200+' },
  { industry: 'Law / solicitors', platform: 'Google', good: '£40–90', avg: '£100–200', bad: '£400+' },
  { industry: 'Accountancy', platform: 'Google', good: '£25–60', avg: '£80–150', bad: '£300+' },
  { industry: 'Personal training', platform: 'Meta', good: '£8–20', avg: '£25–50', bad: '£80+' },
  { industry: 'Restaurants / hospitality', platform: 'Meta', good: '£2–8', avg: '£10–20', bad: '£40+' },
  { industry: 'Property management', platform: 'Google', good: '£30–70', avg: '£80–160', bad: '£300+' },
]

const auditQuestions = [
  {
    q: '"Who specifically will be building and managing my campaigns?"',
    good: '"I will" — or a named senior person you can speak to directly.',
    bad: '"Our team." That\'s not a person. That\'s a deflection.',
  },
  {
    q: '"How many clients will you be running at the same time?"',
    good: 'A specific, modest number. Under 10 comparable accounts.',
    bad: 'Vague. "We have capacity." Means: you\'re one of 80.',
  },
  {
    q: '"What conversion event will my campaign optimise for?"',
    good: 'Specific: WhatsApp click, form submission, phone call, calendar booking.',
    bad: '"Link clicks." "Traffic." "Reach." These are not leads.',
  },
  {
    q: '"Can I see the tracking setup before we launch?"',
    good: 'Yes. Here\'s how we\'ll verify it fires before spending.',
    bad: '"We\'ll set that up once the campaign is live." Wrong order.',
  },
  {
    q: '"What\'s your average CPL in my industry?"',
    good: 'A specific number. With context on the campaign that produced it.',
    bad: '"It depends." "Industry average is X." No first-party data.',
  },
  {
    q: '"What happens if you miss the target?"',
    good: 'A clear performance clause in the contract. In writing.',
    bad: 'A verbal promise. "We\'ll work harder." No accountability mechanism.',
  },
  {
    q: '"Will all ad accounts be in my name from day one?"',
    good: 'Yes. Always. No exceptions.',
    bad: '"We manage it through our agency account." Run.',
  },
  {
    q: '"How often will you report, and what will you include?"',
    good: 'Weekly. CPL, leads generated, spend, creative performance by ad.',
    bad: 'Monthly. Impressions. Reach. Engagement rate. Anything but leads.',
  },
  {
    q: '"What\'s the minimum contract term?"',
    good: '90 days — with a written performance clause and a clear exit.',
    bad: '6–12 months upfront. With no exit. From a standing start.',
  },
  {
    q: '"How will you prove the leads came from your ads, not elsewhere?"',
    good: 'UTM parameters, conversion events, call tracking, attribution.',
    bad: '"You\'ll see the enquiries come in." That\'s not attribution.',
  },
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
  { week: 'Week 1', leads: '3', spend: '£50', cpl: '~£17', note: 'Algorithm learning phase' },
  { week: 'Week 2', leads: '6', spend: '£50', cpl: '~£8', note: 'Optimisation kicks in' },
  { week: 'Week 3', leads: '11', spend: '£50', cpl: '~£5', note: 'Algorithm found its audience' },
  { week: 'Week 4', leads: '7', spend: '£50', cpl: '~£7', note: 'Creative refresh, strong finish' },
]

const adSteps = [
  { time: '0–3s', label: 'HOOK', desc: "Show the problem. A messy, cluttered space the viewer recognises. If they don't stop scrolling here, nothing else matters. Shoot 3 hook variations minimum." },
  { time: '3–8s', label: 'AGITATION', desc: 'Hold on the problem. Let the viewer feel the friction — the clutter, the embarrassment, the exhaustion of dealing with it themselves.' },
  { time: '8–20s', label: 'SOLUTION', desc: "Show the transformation. Clean, bright, satisfying. People don't want cleaning. They want a clean home. Every frame is built around that distinction." },
  { time: '20–25s', label: 'TRUST', desc: 'A testimonial line, a result, or a trust signal. One line is enough: "Over 50 homes cleaned this month." Simple. Credible. Necessary.' },
  { time: '25–30s', label: 'CTA', desc: 'One action. Message us on WhatsApp. Not "visit our website." Not "learn more." One tap. One step. One decision.' },
]

const architectureSteps = [
  {
    num: '01',
    title: 'Define The Offer (Not the Service)',
    body: "Your service is cleaning, landscaping, personal training. Your offer is the outcome — \"A spotless home, guaranteed, in 3 hours or you don't pay.\" Lead with the outcome. The service is just how you deliver it.",
  },
  {
    num: '02',
    title: 'Build One Campaign Per Offer',
    body: "One campaign. One objective: Conversions. Not traffic. Not reach. The platform will optimise for what you tell it — so tell it exactly what you want. People who fill out your form, tap your WhatsApp button, or call your number.",
  },
  {
    num: '03',
    title: 'Run 2–3 Ad Sets with Distinct Audiences',
    body: "Ad Set 1: Broad (age/gender only, let the algorithm self-select). Ad Set 2: Interest-targeted (relevant categories). Ad Set 3: Retargeting (website visitors, video viewers). Give each at least £10/day — never split a budget too thin.",
  },
  {
    num: '04',
    title: 'Launch 3 Creatives. Keep the Winner.',
    body: "Creative is the variable that matters most. Launch 3 ads in each ad set with different hooks. After 7 days and £50–100 spend, one will outperform. Pause the others. Iterate on the winner. Repeat monthly.",
  },
  {
    num: '05',
    title: 'Lowest-Friction Conversion Path',
    body: "The longer the path between ad and enquiry, the higher your CPL. WhatsApp button: 1 tap. Form on landing page: 3–5 fields max, mobile-first. Phone number click: fine for trades. Never send them to a homepage. Ever.",
  },
]

export default function PlaybookPage() {
  return (
    <>
      <style>{`
        @media (min-width: 1024px) {
          .pb-layout { display: grid !important; grid-template-columns: 200px 1fr; gap: 80px; align-items: start; }
          .pb-toc { display: flex !important; }
        }
        .pb-section + .pb-section { margin-top: 80px; padding-top: 80px; border-top: 1px solid #1a1a1a; }
        .pb-callout { border-left: 3px solid #e8ff00; padding: 20px 24px; background: #0d0d0d; margin: 32px 0; }
        .pb-table { width: 100%; border-collapse: collapse; }
        .pb-table th { background: #0d0d0d; padding: 12px 16px; font-family: var(--font-inter), Inter, sans-serif; font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em; color: #333333; text-align: left; border-bottom: 1px solid #1a1a1a; }
        .pb-table td { padding: 14px 16px; font-family: var(--font-inter), Inter, sans-serif; font-size: 0.875rem; color: #555555; border-bottom: 1px solid #1a1a1a; vertical-align: middle; }
        .pb-table tr:last-child td { border-bottom: none; }
        .pb-table tr:hover td { background: rgba(232,255,0,0.02); }
        .pb-bench-good { color: #e8ff00 !important; font-weight: 700; }
        .pb-bench-avg { color: #888888 !important; }
        .pb-bench-bad { color: #444444 !important; }
        .pb-results-row { display: grid; grid-template-columns: 90px 60px 60px 70px 1fr; gap: 16px; padding: 14px 24px; border-bottom: 1px solid #1a1a1a; align-items: center; }
        @media (max-width: 600px) {
          .pb-results-row { grid-template-columns: 80px 50px 50px 60px; }
          .pb-results-note { display: none; }
        }
        .pb-stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: #1a1a1a; }
        @media (min-width: 640px) { .pb-stat-grid { grid-template-columns: repeat(4, 1fr); } }
        .pb-platform-check { color: #e8ff00; font-weight: 700; font-size: 0.875rem; }
        .pb-platform-dash { color: #1a1a1a; font-size: 0.875rem; }
      `}</style>

      <div style={{ background: '#060606', minHeight: '100vh', paddingTop: '80px', paddingBottom: '120px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: '72px', paddingBottom: '72px', borderBottom: '1px solid #1a1a1a' }}>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', margin: '0 0 20px 0' }}>
              ACQUISITION MEDIA · FREE PLAYBOOK
            </p>
            <h1 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 0.95, margin: '0 0 0 0' }}>
              <span style={{ color: '#f0f0f0', display: 'block' }}>THE ACQUISITION</span>
              <span style={{ color: '#e8ff00', display: 'block' }}>ENGINE PLAYBOOK</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.75, margin: '24px 0 8px 0', maxWidth: '620px' }}>
              The exact paid acquisition system we use for every client. Platform decisions, campaign architecture, conversion tracking setup, UK benchmark CPL data, and the full case study behind the £7.25 CPL campaign. No theory. No generic advice. Exactly what we do and why it works.
            </p>
            <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.8125rem', lineHeight: 1.6, margin: '0 0 40px 0' }}>
              Use this to run your own campaigns — or to evaluate any agency you&apos;re considering paying.
            </p>
            <div className="pb-stat-grid">
              {[
                { val: '£7.25', label: 'Cost Per Lead' },
                { val: '27', label: 'Leads, 30 Days' },
                { val: '14×', label: 'ROI in 6 Months' },
                { val: '£200', label: 'Total Ad Spend' },
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

              {/* ─── 01 Platform Decision Framework ─── */}
              <div id="platform">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>01</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 24px 0' }}>PLATFORM DECISION FRAMEWORK</h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                  The biggest mistake most businesses make: choosing a platform based on what they&apos;ve heard, not based on how their customers actually buy. Google and Meta are not interchangeable. They reach buyers at entirely different moments with entirely different intent levels.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2px', margin: '32px 0', background: '#1a1a1a' }}>
                  {[
                    {
                      platform: 'GOOGLE ADS',
                      type: 'CAPTURED INTENT',
                      desc: "Someone searches \"plumber near me\" or \"cleaning service London.\" They're ready to buy right now. Google puts you at the top of that exact moment. Best for: any service people search for actively when they need it.",
                      ideal: 'Trades · Legal · Medical · Accountancy · Emergency services',
                    },
                    {
                      platform: 'META ADS',
                      type: 'CREATED INTENT',
                      desc: "Nobody scrolls Instagram looking for a personal trainer. But show the right person the right creative at the right moment, and you create desire they didn't have 30 seconds ago. Best for: visual services, transformation-based businesses.",
                      ideal: 'Cleaning · Landscaping · Fitness · Aesthetics · Renovation',
                    },
                    {
                      platform: 'TIKTOK ADS',
                      type: 'ALGORITHM-LED DISCOVERY',
                      desc: "TikTok's algorithm distributes content based on engagement signals, not demographics. The cost-per-lead is still dramatically underpriced in most UK service niches. First-mover advantage is real — but creative quality is everything.",
                      ideal: 'Hospitality · Fitness · Personal brands · Under-35 audiences',
                    },
                  ].map((col) => (
                    <div key={col.platform} style={{ background: '#0d0d0d', padding: '28px' }}>
                      <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.18em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 8px 0' }}>{col.platform}</p>
                      <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.25rem', color: '#f0f0f0', margin: '0 0 12px 0', letterSpacing: '0.03em' }}>{col.type}</p>
                      <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.7, margin: '0 0 16px 0' }}>{col.desc}</p>
                      <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.75rem', lineHeight: 1.5, margin: 0 }}>{col.ideal}</p>
                    </div>
                  ))}
                </div>

                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>Platform × Industry Matrix (UK)</p>
                <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
                  <table className="pb-table" style={{ minWidth: '400px' }}>
                    <thead>
                      <tr>
                        <th>INDUSTRY</th>
                        <th>GOOGLE</th>
                        <th>META</th>
                        <th>TIKTOK</th>
                      </tr>
                    </thead>
                    <tbody>
                      {platformRows.map((row) => (
                        <tr key={row.industry}>
                          <td style={{ color: '#f0f0f0' }}>{row.industry}</td>
                          <td><span className={row.google === '—' ? 'pb-platform-dash' : 'pb-platform-check'}>{row.google}</span></td>
                          <td><span className={row.meta === '—' ? 'pb-platform-dash' : 'pb-platform-check'}>{row.meta}</span></td>
                          <td><span className={row.tiktok === '—' ? 'pb-platform-dash' : 'pb-platform-check'}>{row.tiktok}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pb-callout">
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 8px 0' }}>THE FRAMEWORK IN ONE QUESTION</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                    Does your customer actively search for your service when they need it? If yes: start with Google. If no — they discover services passively, through lifestyle content and social feeds — start with Meta. When budget allows, run both simultaneously. The compounding effect of search intent + social discovery is where growth accelerates.
                  </p>
                </div>
              </div>

              {/* ─── 02 Campaign Architecture ─── */}
              <div id="architecture" className="pb-section">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>02</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 24px 0' }}>CAMPAIGN ARCHITECTURE</h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                  Most businesses either over-complicate their setup (20 ad sets, 40 creatives, six objectives) or under-invest in it (one boosted post, no structure). The architecture that generates leads within 48 hours is deliberately simple. Here&apos;s the exact setup we use for every new client.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', margin: '32px 0' }}>
                  {architectureSteps.map((step) => (
                    <div key={step.num} style={{ background: '#0d0d0d', padding: '24px 28px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#e8ff00', flexShrink: 0, letterSpacing: '0.05em', lineHeight: 1 }}>{step.num}</span>
                      <div>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '0.04em' }}>{step.title}</p>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>Budget Rules</p>
                <ul style={{ listStyle: 'none', margin: '0 0 32px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    'Minimum viable budget: £10/day — lower and the algorithm never learns',
                    'Target: £20–50/day to exit the learning phase within 2 weeks',
                    'Never split less than £10/day across multiple ad sets — too diluted to learn',
                    'Spending £300 over 30 days beats spending £300 over 3 days — consistency wins',
                    'Scale winning ad sets by 20% every 3–5 days max. Never double overnight.',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#e8ff00', fontWeight: 700, flexShrink: 0 }}>→</span>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pb-callout">
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 8px 0' }}>THE 48-HOUR LAUNCH CHECKLIST</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      'Pixel or conversion tracking installed and verified firing',
                      'Offer defined: one outcome, one action, zero confusion',
                      'Creative ready: at least 3 hook variations to test',
                      'Conversion path built: WhatsApp, form, or phone — mobile-first',
                      'Campaign objective set to Conversions — NOT traffic, NOT reach',
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, color: '#e8ff00', flexShrink: 0 }}>✓</span>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ─── 03 Conversion Tracking ─── */}
              <div id="tracking-setup" className="pb-section">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>03</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 24px 0' }}>CONVERSION TRACKING</h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                  This is the section most agencies don&apos;t want you to read — because it exposes exactly what they&apos;re not doing. Most businesses running paid ads are optimising for the wrong thing. They see &ldquo;link clicks&rdquo; in the dashboard and assume that means leads. It doesn&apos;t. The gap between link clicks and actual enquiries is where most ad budgets disappear.
                </p>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 32px 0' }}>
                  Tracking tells the algorithm what you actually want. Without it, the algorithm optimises for the cheapest action it can find — which is almost never a paying customer.
                </p>

                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>The Tracking Stack</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', margin: '0 0 32px 0', background: '#1a1a1a' }}>
                  {[
                    { tool: 'GOOGLE TAG MANAGER', role: 'The hub. All tracking fires through GTM — one container to rule them all. Install once, manage everything from a single interface without touching code.' },
                    { tool: 'META PIXEL', role: 'Tracks every visitor, every action, every conversion. The algorithm uses this data to find more people who behave like your best customers.' },
                    { tool: 'GOOGLE ANALYTICS 4', role: 'Full-funnel visibility — sessions, scroll depth, time on page, conversion paths. Your source of truth for what happens after the click.' },
                    { tool: 'CONVERSION EVENTS', role: 'The actions that matter: WhatsApp button tap, form submission, phone click, booking confirmed. These are what you optimise for — not clicks, not impressions.' },
                  ].map((item) => (
                    <div key={item.tool} style={{ background: '#0d0d0d', padding: '24px' }}>
                      <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 10px 0' }}>{item.tool}</p>
                      <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{item.role}</p>
                    </div>
                  ))}
                </div>

                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>Setup Sequence</p>
                <div>
                  {[
                    'Create a Google Tag Manager container → install the GTM snippet on every page',
                    'Add the Meta Pixel through GTM (no manual code installation needed)',
                    'Add GA4 configuration tag through GTM',
                    'Create custom triggers: WhatsApp button click, form submission, phone call click',
                    'Add conversion event tags for each trigger (Meta Custom Conversion + GA4 Event)',
                    'Verify using Meta Test Events tool before spending a single pound',
                    'Set your campaign objective to Conversions and select the event you just created',
                    'Do not judge performance until 50+ conversions — this is how long the algorithm needs to exit learning phase',
                  ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', padding: '14px 0', borderBottom: '1px solid #1a1a1a', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, color: '#e8ff00', letterSpacing: '0.1em', flexShrink: 0, paddingTop: '2px' }}>0{i + 1}</span>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.65 }}>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="pb-callout" style={{ marginTop: '32px' }}>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 8px 0' }}>THE REASON THIS MATTERS</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                    The £7.25 CPL from the case study below is directly attributable to correct conversion event tracking. Without it, the same campaign running identical creative and targeting was generating leads at £40–60 per enquiry. Same budget. Same creative. Different tracking. That&apos;s a 6× cost difference — from a single setup change.
                  </p>
                </div>
              </div>

              {/* ─── 04 UK Benchmark CPL Table ─── */}
              <div id="benchmarks" className="pb-section">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>04</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 24px 0' }}>UK BENCHMARK CPL TABLE</h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                  These are first-party UK benchmarks from campaigns we have run or directly audited — not industry estimates or US data converted at exchange rate. Use them to hold your current agency accountable, or to set realistic expectations before you start.
                </p>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.8125rem', lineHeight: 1.6, margin: '0 0 32px 0', fontStyle: 'italic' }}>
                  Note: all CPL figures assume correct conversion tracking setup. Without it, actual CPL degrades by 3–8× and will be invisible in your reporting.
                </p>

                <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                  <table className="pb-table" style={{ minWidth: '480px' }}>
                    <thead>
                      <tr>
                        <th>INDUSTRY</th>
                        <th>PLATFORM</th>
                        <th style={{ color: '#e8ff00' }}>GOOD CPL</th>
                        <th>AVERAGE CPL</th>
                        <th>BAD CPL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {benchmarks.map((row) => (
                        <tr key={row.industry}>
                          <td style={{ color: '#f0f0f0' }}>{row.industry}</td>
                          <td style={{ color: '#333333', fontSize: '0.8125rem' }}>{row.platform}</td>
                          <td><span className="pb-bench-good">{row.good}</span></td>
                          <td><span className="pb-bench-avg">{row.avg}</span></td>
                          <td><span className="pb-bench-bad">{row.bad}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  {[
                    { label: 'GOOD CPL', desc: 'What we target on every campaign. Achievable with proper setup.', color: '#e8ff00' },
                    { label: 'AVERAGE CPL', desc: 'What most agencies with decent tracking produce.', color: '#888888' },
                    { label: 'BAD CPL', desc: 'What happens without tracking, or with poor creative quality.', color: '#444444' },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: '5px' }} />
                      <div>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, color: item.color, margin: '0 0 2px 0', letterSpacing: '0.08em' }}>{item.label}</p>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.8125rem', margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pb-callout">
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 8px 0' }}>HOW TO USE THIS TABLE</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                    If your current agency is reporting CPL in the &ldquo;Bad&rdquo; range, ask them what conversion event they&apos;re optimising for. If the answer is &ldquo;link clicks&rdquo; — that&apos;s why. If your CPL is in the &ldquo;Average&rdquo; range, ask them how many creative variations they&apos;ve tested in the last 30 days. If the answer is zero — that&apos;s why. &ldquo;Good&rdquo; CPL requires both correct tracking and ongoing creative testing. Neither alone is sufficient.
                  </p>
                </div>
              </div>

              {/* ─── 05 Case Study ─── */}
              <div id="case-study" className="pb-section">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>05</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 8px 0' }}>THE £7.25 CASE STUDY</h2>
                <p style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(20px, 2.5vw, 32px)', color: '#555555', letterSpacing: '0.03em', lineHeight: 1.1, margin: '0 0 24px 0' }}>27 LEADS. £200 AD SPEND. 30 DAYS.</p>

                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 48px 0' }}>
                  This is every decision we made, in order. Not the polished version. The actual version — including why we chose Meta over Google at this budget, why we tracked WhatsApp clicks instead of link clicks, and why Week 1 was expensive and Week 3 was exceptional.
                </p>

                {/* 5a — The Brief */}
                <div style={{ paddingLeft: '24px', borderLeft: '1px solid #1a1a1a', marginBottom: '48px' }}>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>THE BRIEF</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                    Residential and commercial cleaning services. No previous ads. No existing creative. No website. Total budget: £200. Most agencies would have passed. The fundamentals were right, which is all that matters.
                  </p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      'Local service business — defined geographic area',
                      'Clear target customer — households',
                      'Meaningful profit per recurring job',
                      'WhatsApp as the booking channel — 1 tap, lowest possible friction',
                    ].map((item) => (
                      <li key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <span style={{ color: '#e8ff00', fontWeight: 700, flexShrink: 0, fontSize: '0.875rem' }}>✓</span>
                        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.65 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5b — The Ad */}
                <div style={{ paddingLeft: '24px', borderLeft: '1px solid #1a1a1a', marginBottom: '48px' }}>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>THE AD</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                    We scripted and produced a 30-second video commercial from scratch. A structured ad built around one job: stop the scroll, create desire, remove friction. The same 5-part structure we use for every video ad:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {adSteps.map((step) => (
                      <div key={step.label} style={{ display: 'grid', gridTemplateColumns: '56px 90px 1fr', gap: '16px', padding: '14px 0', borderBottom: '1px solid #1a1a1a', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.75rem', color: '#333333', fontStyle: 'italic', paddingTop: '2px' }}>{step.time}</span>
                        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', color: '#e8ff00', paddingTop: '2px' }}>{step.label}</span>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5c — The Targeting */}
                <div style={{ paddingLeft: '24px', borderLeft: '1px solid #1a1a1a', marginBottom: '48px' }}>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>THE TARGETING</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                    We chose Meta over Google. At £200 total, competing on branded cleaning search terms in a competitive local market would have diluted the budget beyond usefulness. The creative was strong enough to create desire. WhatsApp as CTA fits Meta&apos;s user behaviour perfectly — it&apos;s a tap, not a form.
                  </p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>The exact audience:</p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      'Women 25–55 (primary cleaning service buyers in this market)',
                      'Homeowners and renters — behavioural targeting',
                      '15km radius from the business location',
                      'Facebook Feed + Instagram Feed only — no Reels, no Stories',
                    ].map((item) => (
                      <li key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <span style={{ color: '#e8ff00', fontWeight: 700, flexShrink: 0, fontSize: '0.875rem' }}>→</span>
                        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.875rem', lineHeight: 1.65 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5d — Results */}
                <div style={{ paddingLeft: '24px', borderLeft: '1px solid #1a1a1a' }}>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>THE RESULTS</p>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.8, margin: '0 0 24px 0' }}>
                    The pattern below is normal for any properly built campaign — expensive early, improving fast as the algorithm learns who converts.
                  </p>
                  <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', marginBottom: '24px' }}>
                    <div className="pb-results-row">
                      {['WEEK', 'LEADS', 'SPEND', 'CPL', 'NOTE'].map((h) => (
                        <span key={h} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', color: '#333333' }} className={h === 'NOTE' ? 'pb-results-note' : ''}>{h}</span>
                      ))}
                    </div>
                    {weeklyResults.map((row) => (
                      <div key={row.week} className="pb-results-row">
                        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.875rem', color: '#f0f0f0', fontWeight: 600 }}>{row.week}</span>
                        <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.375rem', color: '#e8ff00' }}>{row.leads}</span>
                        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.875rem', color: '#555555' }}>{row.spend}</span>
                        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.875rem', color: '#555555' }}>{row.cpl}</span>
                        <span className="pb-results-note" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.75rem', color: '#333333', fontStyle: 'italic' }}>{row.note}</span>
                      </div>
                    ))}
                    <div className="pb-results-row" style={{ background: 'rgba(232,255,0,0.04)', borderBottom: 'none' }}>
                      <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.875rem', color: '#f0f0f0', fontWeight: 700 }}>TOTAL</span>
                      <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.75rem', color: '#e8ff00' }}>27</span>
                      <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.75rem', color: '#e8ff00' }}>£200</span>
                      <span style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: '1.75rem', color: '#e8ff00' }}>£7.25</span>
                      <span className="pb-results-note" />
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.9375rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                    Of those 27 leads, 6 became paying clients in month one. Cleaning services recurring at £80/month. 6 clients × £80 × 6 months = <strong style={{ color: '#f0f0f0' }}>£2,880 from a £200 spend. A 14× return in 6 months. From a single campaign.</strong>
                  </p>
                  <div className="pb-callout">
                    <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.15em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 8px 0' }}>THE LESSON</p>
                    <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                      Week 1 is always expensive. Don&apos;t pause a campaign in week 2. The learning phase needs time and data. Give any properly built campaign 30 days minimum before making structural changes. That&apos;s when you have enough signal to know whether the methodology works — not whether the first week was cheap.
                    </p>
                  </div>
                </div>
              </div>

              {/* ─── 06 10-Question Agency Audit ─── */}
              <div id="audit" className="pb-section">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>06</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 24px 0' }}>
                  10-QUESTION AGENCY AUDIT
                </h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 12px 0' }}>
                  Ask every agency these questions before signing anything. Score honestly. Use it to evaluate us too — we wrote these because we know exactly what the right answers sound like, and we&apos;re happy to be held to them.
                </p>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.8125rem', lineHeight: 1.6, margin: '0 0 32px 0' }}>
                  Scoring: 0–3 good answers → walk away. 4–6 → proceed with extreme caution. 7–10 → worth exploring.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {auditQuestions.map((item, i) => (
                    <div key={i} style={{ background: '#0d0d0d', padding: '24px 28px' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, color: '#e8ff00', letterSpacing: '0.1em', flexShrink: 0, paddingTop: '2px' }}>{String(i + 1).padStart(2, '0')}</span>
                        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#f0f0f0', fontSize: '0.9375rem', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{item.q}</p>
                      </div>
                      <div style={{ paddingLeft: '28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ background: 'rgba(232,255,0,0.04)', padding: '12px 14px', borderLeft: '2px solid #e8ff00' }}>
                          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', color: '#e8ff00', margin: '0 0 6px 0' }}>GOOD ANSWER</p>
                          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '0.8125rem', lineHeight: 1.6, margin: 0 }}>{item.good}</p>
                        </div>
                        <div style={{ background: '#060606', padding: '12px 14px', borderLeft: '2px solid #1a1a1a' }}>
                          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', color: '#333333', margin: '0 0 6px 0' }}>BAD ANSWER</p>
                          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.8125rem', lineHeight: 1.6, margin: 0 }}>{item.bad}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── 07 Warning Signs ─── */}
              <div id="warning-signs" className="pb-section">
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8ff00', textTransform: 'uppercase', margin: '0 0 12px 0' }}>07</p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#f0f0f0', letterSpacing: '0.03em', lineHeight: 1.05, margin: '0 0 24px 0' }}>
                  6 WARNING SIGNS YOUR AGENCY ISN&apos;T DOING THEIR JOB
                </h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.8, margin: '0 0 32px 0' }}>
                  Use this as a final checklist before signing any marketing contract — or to audit an agency you&apos;re already paying.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {warningSigns.map((item, i) => (
                    <div key={i} style={{ background: '#0d0d0d', padding: '28px 32px' }}>
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

              {/* ── CTA ── */}
              <div style={{ marginTop: '80px', paddingTop: '80px', borderTop: '1px solid #e8ff00', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', color: '#555555', textTransform: 'uppercase', margin: '0 0 20px 0' }}>
                  WHAT&apos;S NEXT
                </p>
                <h2 style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.0, margin: '0 0 24px 0' }}>
                  <span style={{ color: '#f0f0f0', display: 'block' }}>Want us to build</span>
                  <span style={{ color: '#e8ff00', display: 'block' }}>this for you?</span>
                </h2>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#555555', fontSize: '1rem', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 12px auto' }}>
                  The same methodology. Applied to your business. A specific lead number written into your contract before we spend a single pound — and guaranteed delivery within 90 days, or we work for free until we hit it.
                </p>
                <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#333333', fontSize: '0.8125rem', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 40px auto', fontStyle: 'italic' }}>
                  Maximum 4 clients at any time. 2 founding spots remaining at permanently locked founding rate.
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
