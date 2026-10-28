// src/pages/Home.tsx
import { SEOHead } from '@components/seo/SEOHead'
import { HeroSection } from '@components/sections/HeroSection'
import { TrustStrip } from '@components/sections/TrustStrip'
import { BenefitsSection } from '@components/sections/BenefitsSection'
import { ServicesPreview } from '@components/sections/ServicesPreview'
import { ProcessSection } from '@components/sections/ProcessSection'
import { TeamPreview } from '@components/sections/TeamPreview'
import { TestimonialsSection } from '@components/sections/TestimonialsSection'
import { BlogPreview } from '@components/sections/BlogPreview'
import { CTABand } from '@components/sections/CTABand'

const BASE_URL = 'https://topangadentalcare.com'

export default function Home() {
  return (
    <>
      <SEOHead
        title="Dentist in Woodland Hills, CA"
        description="Topanga Dental Care — trusted family dentist in Woodland Hills at Gateway Plaza. Cleanings, implants, root canals, wisdom teeth. Rated 4.6★ · (818) 347-8444."
        canonical={BASE_URL}
      />
      <HeroSection />
      <TrustStrip />
      <BenefitsSection />
      <ServicesPreview />
      <ProcessSection />
      <TeamPreview />
      <TestimonialsSection />
      <BlogPreview />
      <CTABand />
    </>
  )
}
