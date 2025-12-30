import { LOAD_MORE_LIMIT } from '@/constants/pagination'
import { decodeCursor, fetchGalleryPage } from '@/sanity/lib/gallery-pagination'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const limitRaw = Number(searchParams.get('limit') ?? LOAD_MORE_LIMIT)
  const limit =
    Number.isFinite(limitRaw) && limitRaw > 0 && limitRaw <= 24
      ? limitRaw
      : LOAD_MORE_LIMIT

  const cursorParam = searchParams.get('cursor')
  const cursor = decodeCursor(cursorParam)

  const data = await fetchGalleryPage({ cursor, limit })

  return NextResponse.json(data)
}
