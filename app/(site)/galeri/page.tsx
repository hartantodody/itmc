import Container from '@/components/common/container'
import PageHeader from '@/components/common/page-header'
import GalleryAlbumGrid from '@/components/sections/gallery-album-grid'
import { createPageMetadata } from '@/lib/seo-helpers'
import { BookOpen } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = createPageMetadata({
  title: 'Galeri',
  description: 'Dokumentasi kegiatan dan highlight program pelatihan IMTC.',
  pathname: '/galeri'
})

export default function GalleryPage() {
  return (
    <main className='py-16 sm:py-20'>
      <Container className='space-y-12'>
        <PageHeader
          badge={{ label: 'Dokumentasi kegiatan', icon: BookOpen }}
          title='Galeri Kegiatan IMTC'
          description='Pilih kegiatan untuk melihat foto dokumentasi.'
        />

        <GalleryAlbumGrid />
      </Container>
    </main>
  )
}
