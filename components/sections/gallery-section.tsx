import { INITIAL_LIMIT } from '@/constants/pagination'
import GallerySectionClient from './gallery-section.client'
import { fetchGalleryPage } from '@/sanity/lib/gallery-pagination'

export default async function GallerySection() {
  const { tiles, nextCursor, hasMore } = await fetchGalleryPage({
    cursor: null,
    limit: INITIAL_LIMIT
  })

  return (
    <GallerySectionClient
      initialTiles={tiles}
      initialNextCursor={nextCursor}
      initialHasMore={hasMore}
    />
  )
}
