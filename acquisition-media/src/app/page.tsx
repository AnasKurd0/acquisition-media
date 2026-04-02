import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import TheProblem from '@/components/sections/TheProblem'
import VSLSection from '@/components/sections/VSLSection'
import PerfectFor from '@/components/sections/PerfectFor'
import Services from '@/components/sections/Services'
import SocialProof from '@/components/sections/SocialProof'
import OurProcess from '@/components/sections/OurProcess'
import BenchmarkStats from '@/components/sections/BenchmarkStats'
import ROICalculator from '@/components/sections/ROICalculator'
import ComparisonTable from '@/components/sections/ComparisonTable'
import WhyUs from '@/components/sections/WhyUs'
import Guarantee from '@/components/sections/Guarantee'
import GrandSlamOffer from '@/components/sections/GrandSlamOffer'
import FounderSection from '@/components/sections/FounderSection'
import BookingCTA from '@/components/sections/BookingCTA'
import LeadMagnet from '@/components/sections/LeadMagnet'
import FAQ from '@/components/sections/FAQ'
import FooterCTA from '@/components/sections/FooterCTA'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <SocialProof />
        <PerfectFor />
        <Services />
        <OurProcess />
        <ROICalculator />
        <BenchmarkStats />
        <TheProblem />
        <VSLSection />
        <WhyUs />
        <ComparisonTable />
        <Guarantee />
        <FAQ />
        <GrandSlamOffer />
        <FounderSection />
        <BookingCTA />
        <LeadMagnet />
        <FooterCTA />
      </main>
      <Footer />
    </>
  )
}
