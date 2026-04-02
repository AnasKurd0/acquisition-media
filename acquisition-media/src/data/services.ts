export interface Service {
  id: string
  number: string
  title: string
  tagline: string
  mechanism: string
  outcome: string
  whoFor: string
  features: string[]
}

export const services: Service[] = [
  {
    id: 'websites',
    number: '01',
    title: 'Performance Websites',
    tagline: 'Your 24/7 sales machine. Never late, never off-message, never loses a lead.',
    mechanism: "Most websites are built by designers thinking in aesthetics. We build in conversions. Every element — headline, layout, copy, load speed, booking flow — is engineered around a single outcome: visitor books. Not visitor browses. Not visitor leaves impressed. Visitor books. Sub-1 second load time, mobile-first layout that converts on the device 70% of your traffic uses, and a booking system that makes saying yes frictionless.",
    outcome: "Clients typically see a 2–4× improvement in enquiry rate compared to their previous template site within the first 30 days. The difference is not the design — it's that the page was built to convert, not just to exist.",
    whoFor: "Any service business relying on enquiries or appointments — currently running no website, a slow one, or a generic template that looks fine but books nobody.",
    features: [
      'Custom-built — zero templates, zero themes',
      'Booking system integration (Calendly, Acuity, or native)',
      'Sub-1 second load time, mobile-first architecture',
      'SEO-ready structure from day one',
      'Conversion copywriting included',
      'Delivered in 4–6 weeks',
    ],
  },
  {
    id: 'google',
    number: '02',
    title: 'Google Ads',
    tagline: "Capture buyers the moment they're ready. First result. Every time.",
    mechanism: "When someone in your area types 'emergency plumber' or 'best personal trainer near me' — they have already decided to buy. They are looking for who, not whether. Google Ads puts your business at the top of that moment. We research every keyword, build every campaign, write every ad, and manage every bid — daily. Your cost-per-lead drops as your Quality Score compounds. First qualified enquiry typically within 48 hours of launch.",
    outcome: "Most clients reach 3–8× ROAS by month 3. The mechanism is simple: high-intent traffic, a high-converting landing page, daily optimisation. When all three are running simultaneously, the numbers move fast.",
    whoFor: "Local service businesses where a single client is worth £500–£20,000+. Works fastest for businesses where the buyer is actively searching — trades, clinics, legal, fitness, home services.",
    features: [
      'Local search + Google Maps campaigns',
      'Display & remarketing',
      'Full keyword research + match-type strategy',
      'Daily bid monitoring + weekly ad rotation tests',
      'Negative keyword management',
      'Month-to-month — no lock-in',
    ],
  },
  {
    id: 'meta',
    number: '03',
    title: 'Meta Ads',
    tagline: 'Reach your exact customer before they even know they need you.',
    mechanism: "Facebook and Instagram let you target by demographic, behaviour, life event, and interest — placing your business in front of people who look exactly like your best existing clients, before they've started searching. We build the audience from scratch, write the copy, direct the creative, and run structured A/B tests until we isolate what converts. Then we scale it. Retargeting sequences recapture warm visitors who left without booking.",
    outcome: "Creates the brand awareness that makes your Google search campaigns convert at higher rates. Standalone Meta CPL is typically 20–40% lower than search in established campaigns — and the two channels compound each other.",
    whoFor: "Businesses with a defined customer profile that benefits from reach and visual storytelling. Especially effective for fitness, beauty, wellness, food, childcare, and any service where the offer benefits from creative presentation.",
    features: [
      'Facebook + Instagram unified campaigns',
      'Lookalike audience build + interest targeting',
      'Creative direction + ad copywriting',
      'Systematic A/B testing every two weeks',
      'Retargeting sequences for warm traffic',
      'Month-to-month — no lock-in',
    ],
  },
  {
    id: 'tiktok',
    number: '04',
    title: 'TikTok Ads',
    tagline: 'The most powerful targeting engine ever built. Still underpriced. Not for long.',
    mechanism: "TikTok's algorithm has solved the content discovery problem. It knows what its users want before they do — and it's applied the same logic to advertising. Native short-form ads reach your exact audience at CPLs 30–50% below equivalent Meta campaigns. That gap exists because your competitors have not moved here yet. We build the creative strategy, write scripts, structure targeting, and optimise from day one — before your market figures out this is where their buyers are.",
    outcome: "Early mover advantage in a market before saturation. CPLs that compound downward as your creative library grows and your pixel matures. The businesses that enter TikTok in 2025 will look like the businesses that entered Facebook Ads in 2015.",
    whoFor: "Forward-thinking businesses targeting 18–45 demographics: fitness, beauty, food, lifestyle, wellness, education, and services with strong visual or transformation elements.",
    features: [
      'Short-form video ad strategy + script direction',
      'Audience targeting + lookalike build',
      'Creative iteration — new tests every two weeks',
      'CPLs typically 30–50% lower than Meta',
      'Early mover advantage — before your competitors',
      'Month-to-month — no lock-in',
    ],
  },
]
