import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { latestAnnouncementsQuery } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic' // optional, biar ga ke-cache

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const raw = Number(searchParams.get('limit'))
    const limit = Math.min(Number.isFinite(raw) && raw > 0 ? raw : 6, 12)

    const items = await client.fetch(latestAnnouncementsQuery, { limit })

    return NextResponse.json({
      items,
      count: Array.isArray(items) ? items.length : 0
    })
  } catch (err: any) {
    console.error('[api/announcements] error:', err)

    return NextResponse.json(
      {
        items: [],
        count: 0,
        error: err?.message ?? 'Unknown error'
      },
      { status: 500 }
    )
  }
}
