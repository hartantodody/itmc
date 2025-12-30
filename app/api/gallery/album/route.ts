// app/api/gallery/album/route.ts
import { NextResponse } from 'next/server'
import { client as sanityClient } from '@/sanity/lib/client'
import { galleryAlbumBySlugQuery } from '@/sanity/lib/queries'
import type { AlbumDoc } from '@/sanity/types'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  if (!slug)
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

  const limitRaw = Number(searchParams.get('limit') ?? 12)
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(limitRaw, 1), 24)
    : 12

  const offsetRaw = Number(searchParams.get('offset') ?? 0)
  const offset = Number.isFinite(offsetRaw) ? Math.max(offsetRaw, 0) : 0

  const album = await sanityClient.fetch<AlbumDoc | null>(
    galleryAlbumBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  )

  if (!album) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const images = (album.images ?? []).filter((img) => Boolean(img?.asset))
  const slice = images.slice(offset, offset + limit)

  const nextOffset = offset + limit < images.length ? offset + limit : null

  return NextResponse.json({
    album: {
      _id: album._id,
      title: album.title,
      slug: album.slug,
      category: album.category,
      year: album.year
    },
    images: slice,
    nextOffset,
    hasMore: nextOffset !== null,
    total: images.length
  })
}
