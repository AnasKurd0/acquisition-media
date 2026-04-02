import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { MobileStickyBar } from '@/components/ui/MobileStickyBar'
import { ExitIntent } from '@/components/ui/ExitIntent'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://acquisitionmedia.co.uk'),
  title: 'Acquisition Media — Performance Websites & Paid Ads UK',
  description:
    'UK performance marketing agency. We build high-converting websites and run Google Ads, Meta Ads & TikTok Ads for local service businesses. 90-day results guarantee or we work for free.',
  keywords: [
    'paid ads agency UK',
    'Google Ads management UK',
    'Facebook Ads agency UK',
    'Meta Ads agency UK',
    'TikTok Ads UK',
    'performance marketing agency UK',
    'web design agency UK',
    'digital marketing agency UK',
    'local business marketing',
    'performance websites UK',
    '90 day guarantee marketing',
    'local service business marketing',
  ],
  openGraph: {
    title: 'Acquisition Media — More Clients. Predictably. Guaranteed.',
    description:
      'UK performance marketing agency. Performance websites + paid ads for local service businesses. 90-day results guarantee or we work for free.',
    type: 'website',
    locale: 'en_GB',
    url: 'https://acquisitionmedia.co.uk',
    siteName: 'Acquisition Media',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acquisition Media — Performance Marketing UK',
    description: 'Performance Websites & Paid Ads for UK businesses. 90-Day Guarantee.',
  },
  alternates: {
    canonical: 'https://acquisitionmedia.co.uk',
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'yYYBhTov8Pha1UN_j-76geM0Ao4yhPnHFlnIV9SnEgw',
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Acquisition Media',
  description: 'UK performance marketing agency specialising in Google Ads, Meta Ads, TikTok Ads, and custom performance websites for local service businesses. 90-day results guarantee.',
  url: 'https://acquisitionmedia.co.uk',
  email: 'hello@acquisitionmedia.co.uk',
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  knowsAbout: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'Web Design', 'Performance Marketing', 'Conversion Rate Optimisation'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Performance Marketing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads Management', description: 'Full Google Ads campaign build, daily monitoring, and bid optimisation for local service businesses.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta Ads Management', description: 'Facebook and Instagram advertising for local service businesses. Audience build, creative direction, A/B testing.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance Website Design', description: 'Custom websites engineered to convert visitors into enquiries. Mobile-first, sub-1s load, booking system integrated.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'TikTok Ads Management', description: 'TikTok advertising for businesses targeting 18-40 demographics in the UK.' } },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      </head>
      <body className="bg-[#060606] text-[#f0f0f0] overflow-x-hidden">
        <AnnouncementBar />
        <MobileStickyBar />
        <SmoothScrollProvider>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
        <ExitIntent />
        <WhatsAppButton />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
        <Script id="clarity-init" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "w5gba1wmaj");
        `}</Script>
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments)}
              gtag('js',new Date());
              gtag('config','${process.env.NEXT_PUBLIC_GA4_ID}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  )
}
