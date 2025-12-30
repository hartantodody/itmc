// components/sections/gallery-album-grid.tsx (server)
import GalleryAlbumGridClient from './gallery-album-grid.client'
import { client as sanityClient } from '@/sanity/lib/client'
import { galleryAlbumListQuery } from '@/sanity/lib/queries'
import type { AlbumListItem } from '@/sanity/types'

const INITIAL = 12

export default async function GalleryAlbumGrid() {
  const items =
    (await sanityClient.fetch<AlbumListItem[]>(
      galleryAlbumListQuery,
      { offset: 0, end: INITIAL },
      { next: { revalidate: 60 } }
    )) ?? []

  const nextOffset = items.length === INITIAL ? INITIAL : null

  return (
    <GalleryAlbumGridClient
      initialItems={items}
      initialNextOffset={nextOffset}
      initialHasMore={nextOffset !== null}
    />
  )
}
