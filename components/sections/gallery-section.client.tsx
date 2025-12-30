'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import type { GalleryTile } from '@/sanity/types'
import { INITIAL_LIMIT, LOAD_MORE_LIMIT } from '@/constants/pagination'

function safeImageUrl(image: any, w = 1200, h = 900) {
  try {
    if (!image?.asset) return null
    return urlFor(image).width(w).height(h).fit('crop').auto('format').url()
  } catch {
    return null
  }
}

function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'overflow-hidden rounded-2xl border bg-card',
            'animate-pulse'
          )}
        >
          <div className='aspect-[4/3] w-full bg-muted' />
          <div className='space-y-2 p-3'>
            <div className='h-4 w-3/4 rounded bg-muted' />
            <div className='h-3 w-1/2 rounded bg-muted' />
          </div>
        </div>
      ))}
    </div>
  )
}

async function fetchTiles(params: { cursor?: string | null; limit?: number }) {
  const qs = new URLSearchParams()
  if (params.cursor) qs.set('cursor', params.cursor)
  qs.set('limit', String(params.limit ?? 8))

  const res = await fetch(`/api/gallery?${qs.toString()}`, {
    method: 'GET',
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to load gallery')
  return (await res.json()) as {
    tiles: GalleryTile[]
    nextCursor: string | null
    hasMore: boolean
  }
}

export default function GallerySectionClient({
  initialTiles,
  initialNextCursor,
  initialHasMore
}: {
  initialTiles: GalleryTile[]
  initialNextCursor: string | null
  initialHasMore: boolean
}) {
  const [tiles, setTiles] = useState<GalleryTile[]>(initialTiles)
  const [active, setActive] = useState<GalleryTile | null>(null)

  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor)
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore)
  const [loadingMore, setLoadingMore] = useState(false)
  const [initialLoading, setInitialLoading] = useState(false)

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(false)

  const loadMore = useCallback(async () => {
    if (!hasMore || !nextCursor) return
    if (loadingRef.current) return

    loadingRef.current = true
    setLoadingMore(true)

    try {
      const data = await fetchTiles({
        cursor: nextCursor,
        limit: LOAD_MORE_LIMIT
      })
      setTiles((prev) => {
        // dedupe by _id-_key
        const seen = new Set(prev.map((t) => `${t._id}-${t._key}`))
        const merged = [...prev]
        for (const t of data.tiles) {
          const k = `${t._id}-${t._key}`
          if (!seen.has(k)) merged.push(t)
        }
        return merged
      })
      setNextCursor(data.nextCursor)
      setHasMore(data.hasMore)
    } finally {
      setLoadingMore(false)
      loadingRef.current = false
    }
  }, [hasMore, nextCursor])

  // Optional: if you ever want to refresh initial client-side
  useEffect(() => {
    if (tiles.length > 0) return
    ;(async () => {
      setInitialLoading(true)
      try {
        const data = await fetchTiles({ cursor: null, limit: 8 })
        setTiles(data.tiles)
        setNextCursor(data.nextCursor)
        setHasMore(data.hasMore)
      } finally {
        setInitialLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Infinite scroll observer
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first?.isIntersecting) loadMore()
      },
      { root: null, rootMargin: '600px 0px', threshold: 0 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [loadMore])

  const thumbSources = useMemo(
    () =>
      tiles.map((t) => ({
        key: `${t._id}-${t._key}`,
        src: safeImageUrl(t.image, 900, 675)
      })),
    [tiles]
  )

  if (initialLoading) return <GridSkeleton count={INITIAL_LIMIT} />

  return (
    <>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
        {tiles.map((item, idx) => {
          const src = thumbSources[idx]?.src

          return (
            <button
              key={`${item._id}-${item._key}`}
              type='button'
              onClick={() => setActive(item)}
              className={cn(
                'group relative overflow-hidden rounded-2xl border bg-card text-left',
                'cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
              )}
              aria-label={`Open image: ${item.title}`}
            >
              <div className='relative aspect-[4/3] w-full'>
                {src ? (
                  <Image
                    src={src}
                    alt={item.alt ?? item.title ?? 'Gallery image'}
                    fill
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                ) : (
                  <div className='absolute inset-0 grid place-items-center bg-muted text-xs text-muted-foreground'>
                    Image not available
                  </div>
                )}

                <div
                  className={cn(
                    'absolute inset-x-0 bottom-0 p-3',
                    'bg-gradient-to-t from-black/80 via-black/35 to-transparent',
                    'transition-[background] duration-300',
                    'group-hover:from-primary/85 group-hover:via-primary/35 group-hover:to-transparent'
                  )}
                >
                  <div className='font-heading text-sm font-extrabold text-white transition-transform duration-300 group-hover:-translate-y-0.5'>
                    {item.title}
                  </div>
                  <div className='text-xs text-white/85'>
                    {item.category ?? 'Dokumentasi'}
                    {item.year ? ` • ${item.year}` : ''}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* sentinel for infinite scroll */}
      <div ref={sentinelRef} className='h-1 w-full' />

      {/* loading skeleton for next page */}
      {loadingMore ? (
        <div className='mt-4'>
          <GridSkeleton count={LOAD_MORE_LIMIT} />
        </div>
      ) : null}

      {/* fallback button (also useful UX) */}
      {hasMore && nextCursor && !loadingMore ? (
        <div className='mt-6 flex justify-center'>
          <button
            type='button'
            onClick={loadMore}
            className={cn(
              'rounded-xl border bg-card px-4 py-2 text-sm font-semibold',
              'hover:bg-accent hover:text-accent-foreground transition'
            )}
          >
            Load more
          </button>
        </div>
      ) : null}

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className='max-w-5xl overflow-hidden p-0'>
          <DialogTitle className='sr-only'>
            {active?.title ?? 'Gallery image'}
          </DialogTitle>

          {active ? (
            <div className='relative aspect-[16/10] w-full bg-black'>
              {(() => {
                const big = safeImageUrl(active.image, 1600, 1000)
                return big ? (
                  <Image
                    src={big}
                    alt={active.alt ?? active.title ?? 'Gallery image'}
                    fill
                    sizes='(max-width: 1024px) 100vw, 1024px'
                    className='object-contain'
                    priority
                  />
                ) : (
                  <div className='absolute inset-0 grid place-items-center text-xs text-white/70'>
                    Image not available
                  </div>
                )
              })()}
            </div>
          ) : null}

          {active ? (
            <div className='p-4'>
              <div className='font-heading text-lg font-extrabold'>
                {active.title}
              </div>
              <div className='text-sm text-muted-foreground'>
                {active.category ?? 'Dokumentasi'}
                {active.year ? ` • ${active.year}` : ''}
              </div>

              {active.caption ? (
                <div className='mt-2 text-sm text-foreground/80'>
                  {active.caption}
                </div>
              ) : null}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
