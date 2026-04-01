import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { MobileStickyBar } from '@/components/ui/MobileStickyBar'

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
  title: 'Acquisition Media — Performance Websites & Paid Ads',
  description:
    'We build websites that convert and run paid ads that fill your calendar. Google Ads, Meta Ads, TikTok Ads, and custom performance websites. 90-day results guarantee.',
  keywords: [
    'web design agency',
    'performance marketing',
    'Google Ads management',
    'Meta Ads agency',
    'TikTok Ads',
    'local SEO',
    'performance websites',
  ],
  openGraph: {
    title: 'Acquisition Media — More Clients. Predictably. Guaranteed.',
    description:
      'Full-funnel marketing agency. Performance websites + paid ads. 90-day results guarantee or we work for free.',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acquisition Media',
    description: 'Performance Websites & Paid Ads. 90-Day Guarantee.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body className="bg-[#060606] text-[#f0f0f0] overflow-x-hidden">
        <AnnouncementBar />
        <MobileStickyBar />
        <SmoothScrollProvider>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
