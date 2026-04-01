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
    tagline: 'From first visit to booked appointment — we engineer the whole journey.',
    mechanism: "Most websites are built by designers thinking in visuals. We build in conversions. Every page is structured around a single goal: getting a visitor to book. Sub-1 second load, mobile-first layout, SEO architecture from day one, and a booking system that makes it frictionless to say yes.",
    outcome: "Typically 2–3x improvement in enquiry rate vs. a template site. Your best salesperson — available 24/7, never late, never off-message.",
    whoFor: "Any business relying on appointments or service enquiries — currently running no site or a slow, generic one.",
    features: [
      'Custom design — zero templates',
      'Booking system integration (Calendly, Acuity, Jane)',
      'Sub-1 second load time, mobile-first',
      'SEO architecture built in',
      'CMS so you own your content',
      'Delivered in 4–6 weeks',
    ],
  },
  {
    id: 'google',
    number: '02',
    title: 'Google Ads',
    tagline: "Own your market's search results. Capture demand at its peak.",
    mechanism: "When someone in your city types 'emergency dentist' or 'best personal trainer near me' — they're ready to book right now. Google Ads puts your business at the top of that intent moment. We build every keyword, write every ad, manage every bid, and run daily optimisations so your cost-per-lead drops every month.",
    outcome: "First qualified enquiry typically within 48 hours of launch. Most clients see 3–8x ROAS by month 3.",
    whoFor: "Local service businesses where a single client is worth £500–£10,000+.",
    features: [
      'Local search campaigns',
      'Display & remarketing',
      'Full keyword research + bidding strategy',
      'Daily monitoring, weekly reporting',
      'Shopping (for e-commerce)',
      'Month-to-month',
    ],
  },
  {
    id: 'meta',
    number: '03',
    title: 'Meta Ads',
    tagline: 'Reach your exact customer at the exact moment they are deciding.',
    mechanism: "Facebook and Instagram let you target by demographic, behaviour, and interest — reaching people who look exactly like your best existing clients, before they've even searched for you. We build the audience, write the copy, direct the creative, and test everything systematically until we find what converts.",
    outcome: "Creates awareness that feeds your Google search demand. Typical CPL 20–40% lower than search in established campaigns.",
    whoFor: "Businesses with a defined customer profile that benefits from reach and retargeting — especially those with a visual product or service.",
    features: [
      'Facebook + Instagram campaigns',
      'Audience research & build',
      'Creative direction + copywriting',
      'A/B testing every campaign',
      'Transparent weekly reporting',
      'Month-to-month',
    ],
  },
  {
    id: 'tiktok',
    number: '04',
    title: 'TikTok Ads',
    tagline: 'Get in early. Lower CPLs. More reach. Before your market wakes up.',
    mechanism: "TikTok's algorithm is the most powerful interest-targeting engine built to date — and it's still underpriced. Native-format short video ads reach your audience before your competitors have considered the platform. We handle script concepts, targeting strategy, and optimisation from day one.",
    outcome: "CPLs typically 30–50% lower than equivalent Meta campaigns. Platform advantage compounds — the longer you wait, the more expensive the entry.",
    whoFor: "Forward-thinking businesses targeting 18–40 demographics: fitness, beauty, food, lifestyle, and wellness services.",
    features: [
      'Short-form video ad strategy',
      'Script + concept direction',
      'Targeting & optimisation',
      'Lower CPLs than Google or Meta',
      'Growing platform = early mover advantage',
      'Month-to-month',
    ],
  },
]
