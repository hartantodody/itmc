import { NextResponse } from 'next/server'
import { client as sanityClient } from '@/sanity/lib/client'
import { galleryAlbumListQuery } from '@/sanity/lib/queries'
import type { AlbumListItem } from '@/sanity/types'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const limitRaw = Number(searchParams.get('limit') ?? 12)
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(limitRaw, 1), 24)
    : 12

  const offsetRaw = Number(searchParams.get('offset') ?? 0)
  const offset = Number.isFinite(offsetRaw) ? Math.max(offsetRaw, 0) : 0

  const items =
    (await sanityClient.fetch<AlbumListItem[]>(
      galleryAlbumListQuery,
      { offset, end: offset + limit },
      { next: { revalidate: 60 } }
    )) ?? []

  const nextOffset = items.length === limit ? offset + limit : null

  return NextResponse.json({
    items,
    nextOffset,
    hasMore: nextOffset !== null
  })
}
