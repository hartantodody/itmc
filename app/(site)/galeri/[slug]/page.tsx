// app/galeri/[slug]/page.tsx
import Container from '@/components/common/container'
import PageHeader from '@/components/common/page-header'
import GalleryAlbumClient from '@/components/sections/gallery-album.client'
import { client as sanityClient } from '@/sanity/lib/client'
import { galleryAlbumBySlugQuery } from '@/sanity/lib/queries'
import type { AlbumDetail } from '@/sanity/types'
import { notFound } from 'next/navigation'
import { Image as ImageIcon } from 'lucide-react'
import type { Metadata } from 'next'
import env from '@/lib/environment'

async function getAlbum(slug: string) {
  return sanityClient.fetch<AlbumDetail>(
    galleryAlbumBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  )
}

function buildDescription(album: AlbumDetail) {
  const meta = [album.category ?? null, album.year ?? null].filter(Boolean)
  return meta.length ? meta.join(' • ') : `Dokumentasi kegiatan ${album.title}.`
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const album = await getAlbum(params.slug)

  if (!album?._id) {
    return { robots: { index: false, follow: false } }
  }

  const title = album.title
  const description = buildDescription(album)
  const url = `${env.siteUrl}/galeri/${params.slug}`
  const ogImage = `${env.siteUrl}/og/default.jpg`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${env.siteName}`,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${env.siteName}`,
      description,
      images: [ogImage]
    }
  }
}

export default async function GalleryAlbumPage({
  params
}: {
  params: { slug: string }
}) {
  const album = await getAlbum(params.slug)
  if (!album?._id) return notFound()

  return (
    <main className='relative overflow-hidden py-16 sm:py-20'>
      <Container className='space-y-12'>
        <PageHeader
          badge={{ label: 'Dokumentasi kegiatan', icon: ImageIcon }}
          title={album.title}
          description={
            buildDescription(album).replace(
              /^Dokumentasi kegiatan .*?\.\s*$/,
              ''
            ) || buildDescription(album)
          }
          actions={[
            { label: 'Kembali ke Galeri', href: '/galeri', variant: 'outline' }
          ]}
        />

        <GalleryAlbumClient album={album} />
      </Container>
    </main>
  )
}
