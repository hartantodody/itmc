// app/galeri/[slug]/page.tsx (atau file page kamu)

import Container from '@/components/common/container'
import PageHeader from '@/components/common/page-header'
import GalleryAlbumClient from '@/components/sections/gallery-album.client'
import { client as sanityClient } from '@/sanity/lib/client'
import { galleryAlbumBySlugQuery } from '@/sanity/lib/queries'
import type { AlbumDetail, AlbumImageItem } from '@/sanity/types'
import { notFound } from 'next/navigation'
import { Image as ImageIcon } from 'lucide-react'
import type { Metadata } from 'next'
import env from '@/lib/environment'

const PAGE_SIZE = 12

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

  if (!album?._id) return { robots: { index: false, follow: false } }

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

  const meta = [album.category ?? null, album.year ?? null]
    .filter(Boolean)
    .join(' • ')

  // ✅ Pagination prep (slice awal)
  const all = (album.images ?? []).filter((img) => Boolean((img as any)?.asset))
  const initialImages: AlbumImageItem[] = all.slice(0, PAGE_SIZE)
  const nextOffset = PAGE_SIZE < all.length ? PAGE_SIZE : null

  // (opsional) kalau kamu mau hemat payload, kamu bisa stop kirim album.images full ke client:
  const albumMeta: AlbumDetail = {
    _id: album._id,
    title: album.title,
    slug: album.slug,
    category: album.category,
    year: album.year,
    order: album.order
    // images sengaja gak dikirim full
  }

  return (
    <main className='relative overflow-hidden py-16 sm:py-20'>
      <Container className='space-y-12'>
        <PageHeader
          badge={{ label: 'Dokumentasi kegiatan', icon: ImageIcon }}
          title={album.title}
          description={meta || 'Foto dokumentasi kegiatan.'}
          actions={[
            { label: 'Kembali ke Galeri', href: '/galeri', variant: 'default' }
          ]}
        />

        <GalleryAlbumClient
          album={albumMeta}
          initialImages={initialImages}
          initialNextOffset={nextOffset}
          total={all.length}
          pageSize={PAGE_SIZE}
        />
      </Container>
    </main>
  )
}
