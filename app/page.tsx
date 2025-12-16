import HeroSection from '@/components/sections/hero-section'
import AboutSection from '@/components/sections/about-section'
import TrainingPreviewSection from '@/components/sections/training-preview-section'
import ClientsSection from '@/components/sections/clients-section'
import ContactSection from '@/components/sections/contact-section'
import MiniGallerySection from '@/components/sections/mini-gallery-section'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ClientsSection />

      <TrainingPreviewSection />
      <MiniGallerySection />

      <ContactSection />
    </main>
  )
}
