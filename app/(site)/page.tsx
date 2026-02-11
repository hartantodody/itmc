// app/page.tsx
import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/seo-helpers'

import HeroSection from '@/components/sections/hero-section'
import AboutSection from '@/components/sections/about-section'
import TrainingPreviewSection from '@/components/sections/training-preview-section'
import ClientsSection from '@/components/sections/clients-section'
import ContactSection from '@/components/sections/contact-section'
import MiniGallerySection from '@/components/sections/mini-gallery-section'
import AnnouncementSection from '@/components/sections/announcement-section'

export const metadata: Metadata = createPageMetadata({
  title: 'IMTC',
  description:
    'Indonesia MICE Training Center (IMTC) menyediakan pelatihan berbasis kompetensi untuk industri MICE & event: event management, liaison officer, registration, dan in-house training.',
  pathname: '/'
})

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <AnnouncementSection />
      <ClientsSection />
      <TrainingPreviewSection />
      <MiniGallerySection />
      <ContactSection />
    </main>
  )
}
