import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import TheProblem from '@/components/sections/TheProblem'
import PerfectFor from '@/components/sections/PerfectFor'
import SocialProof from '@/components/sections/SocialProof'
import Services from '@/components/sections/Services'
import OurProcess from '@/components/sections/OurProcess'
import ROICalculator from '@/components/sections/ROICalculator'
import VSLSection from '@/components/sections/VSLSection'
import ComparisonTable from '@/components/sections/ComparisonTable'
import Guarantee from '@/components/sections/Guarantee'
import GrandSlamOffer from '@/components/sections/GrandSlamOffer'
import FounderSection from '@/components/sections/FounderSection'
import FAQ from '@/components/sections/FAQ'
import BookingCTA from '@/components/sections/BookingCTA'
import LeadMagnet from '@/components/sections/LeadMagnet'
import FooterCTA from '@/components/sections/FooterCTA'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <TheProblem />
        <PerfectFor />
        <SocialProof />
        <Services />
        <OurProcess />
        <ROICalculator />
        <VSLSection />
        <ComparisonTable />
        <Guarantee />
        <GrandSlamOffer />
        <FounderSection />
        <FAQ />
        <BookingCTA />
        <LeadMagnet />
        <FooterCTA />
      </main>
      <Footer />
    </>
  )
}
