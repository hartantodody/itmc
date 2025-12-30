import GalleryAlbumClient from '@/components/sections/gallery-album.client'
import type { AlbumImageItem, AlbumDetail } from '@/sanity/types'

export default async function GalleryAlbumSection({ slug }: { slug: string }) {
  const qs = new URLSearchParams()
  qs.set('slug', slug)
  qs.set('offset', '0')
  qs.set('limit', '12')

  const res = await fetch(`/api/gallery/album?${qs.toString()}`, {
    method: 'GET',
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to load album images')
  const data = (await res.json()) as {
    album: AlbumDetail
    images: AlbumImageItem[]
    nextOffset: number | null
    total: number
  }

  return (
    <GalleryAlbumClient
      album={data.album}
      initialImages={data.images}
      initialNextOffset={data.nextOffset}
      total={data.total}
      pageSize={12}
    />
  )
}
