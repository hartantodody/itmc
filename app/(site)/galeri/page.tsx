import Container from '@/components/common/container'
import GallerySection from '@/components/sections/gallery-section'
import { createPageMetadata } from '@/lib/seo-helpers'
import { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Galeri',
  description: 'Dokumentasi kegiatan dan highlight program pelatihan IMTC.',
  pathname: '/galeri'
})

export default function GalleryPage() {
  return (
    <main className='py-16 sm:py-20'>
      <Container className='space-y-8'>
        <div className='space-y-2'>
          <h1 className='font-heading text-4xl font-extrabold tracking-tight sm:text-5xl'>
            Galeri Kegiatan
          </h1>
          <p className='max-w-2xl text-muted-foreground'>
            Dokumentasi kegiatan pelatihan dan program IMTC. (Foto hanya Dummy)
          </p>
        </div>

        <GallerySection />
      </Container>
    </main>
  )
}
