import { client as sanityClient } from '@/sanity/lib/client'
import { galleryAlbumByIndexQuery } from '@/sanity/lib/queries'
import type { AlbumDoc, GalleryTile } from '@/sanity/types'

export type GalleryCursor = { albumIndex: number; imageIndex: number }

export function encodeCursor(c: GalleryCursor) {
  return Buffer.from(JSON.stringify(c), 'utf8').toString('base64url')
}

export function decodeCursor(input?: string | null): GalleryCursor | null {
  if (!input) return null
  try {
    const raw = Buffer.from(input, 'base64url').toString('utf8')
    const parsed = JSON.parse(raw)
    if (
      typeof parsed?.albumIndex === 'number' &&
      typeof parsed?.imageIndex === 'number' &&
      parsed.albumIndex >= 0 &&
      parsed.imageIndex >= 0
    ) {
      return { albumIndex: parsed.albumIndex, imageIndex: parsed.imageIndex }
    }
    return null
  } catch {
    return null
  }
}

async function fetchAlbumByIndex(index: number) {
  const res = await sanityClient.fetch<AlbumDoc[]>(
    galleryAlbumByIndexQuery,
    { index, end: index + 1 },
    { next: { revalidate: 60 } }
  )
  return res?.[0] ?? null
}

export async function fetchGalleryPage(opts: {
  cursor?: GalleryCursor | null
  limit?: number
}) {
  const limit = Math.min(Math.max(opts.limit ?? 8, 1), 24)
  let albumIndex = opts.cursor?.albumIndex ?? 0
  let imageIndex = opts.cursor?.imageIndex ?? 0

  const tiles: GalleryTile[] = []
  let hasMore = true

  while (tiles.length < limit) {
    const album = await fetchAlbumByIndex(albumIndex)
    if (!album) {
      hasMore = false
      break
    }

    const images = album.images ?? []
    if (images.length === 0 || imageIndex >= images.length) {
      albumIndex += 1
      imageIndex = 0
      continue
    }

    for (let i = imageIndex; i < images.length && tiles.length < limit; i++) {
      const img = images[i]
      if (!img?.asset) continue

      tiles.push({
        _id: album._id,
        _key: img._key,
        title: album.title,
        category: album.category,
        year: album.year,
        alt: img.alt ?? album.title,
        caption: img.caption,
        image: img
      })
      imageIndex = i + 1
    }

    if (imageIndex >= images.length) {
      albumIndex += 1
      imageIndex = 0
    }
  }

  const nextCursor = hasMore ? encodeCursor({ albumIndex, imageIndex }) : null
  return { tiles, nextCursor, hasMore }
}
