'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { AlbumListItem } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'

function coverSrc(a: AlbumListItem) {
  const img = a.coverImage ?? null
  if (!img?.asset) return null
  return urlFor(img).width(1200).height(900).fit('crop').auto('format').url()
}

async function fetchAlbums(params: { offset?: number; limit?: number }) {
  const qs = new URLSearchParams()
  qs.set('offset', String(params.offset ?? 0))
  qs.set('limit', String(params.limit ?? 12))

  const res = await fetch(`/api/gallery/albums?${qs.toString()}`, {
    method: 'GET',
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to load albums')
  return (await res.json()) as {
    items: AlbumListItem[]
    nextOffset: number | null
    hasMore: boolean
  }
}

export default function GalleryAlbumGridClient({
  initialItems,
  initialNextOffset,
  initialHasMore
}: {
  initialItems: AlbumListItem[]
  initialNextOffset: number | null
  initialHasMore: boolean
}) {
  const [items, setItems] = useState(initialItems)
  const [nextOffset, setNextOffset] = useState<number | null>(initialNextOffset)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [loadingMore, setLoadingMore] = useState(false)

  const loadingRef = useRef(false)

  const loadMore = useCallback(async () => {
    if (!hasMore || nextOffset == null) return
    if (loadingRef.current) return
    loadingRef.current = true
    setLoadingMore(true)

    try {
      const data = await fetchAlbums({ offset: nextOffset, limit: 12 })
      setItems((prev) => {
        const seen = new Set(prev.map((x) => x._id))
        const merged = [...prev]
        for (const it of data.items) {
          if (!seen.has(it._id)) merged.push(it)
        }
        return merged
      })
      setNextOffset(data.nextOffset)
      setHasMore(data.hasMore)
    } finally {
      setLoadingMore(false)
      loadingRef.current = false
    }
  }, [hasMore, nextOffset])

  const sources = useMemo(
    () =>
      items.map((a) => ({
        id: a._id,
        src: coverSrc(a)
      })),
    [items]
  )

  return (
    <>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {items.map((a, idx) => {
          const src = sources[idx]?.src
          const href = `/galeri/${a.slug.current}`

          return (
            <Link
              key={a._id}
              href={href}
              className={cn(
                'group relative overflow-hidden rounded-2xl border bg-card',
                'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg'
              )}
            >
              <div className='relative aspect-[4/3] w-full'>
                {src ? (
                  <Image
                    src={src}
                    alt={a.title}
                    fill
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                ) : (
                  <div className='absolute inset-0 grid place-items-center overflow-hidden bg-muted'>
                    <div className='pointer-events-none absolute inset-0'>
                      <div className='absolute -top-10 left-1/2 h-32 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-2xl' />
                      <div className='absolute -bottom-10 right-[-15%] h-28 w-64 rounded-full bg-accent/20 blur-2xl' />
                    </div>

                    <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-transparent' />

                    <div className='relative flex flex-col items-center gap-2'>
                      <div className='relative h-16 w-16 sm:h-20 sm:w-20'>
                        <Image
                          src='/images/imtc-icon.webp'
                          alt='IMTC'
                          fill
                          sizes='80px'
                          className='object-contain drop-shadow-sm'
                        />
                      </div>
                      <div className='text-md font-semibold text-cyan-600'>
                        No cover image
                      </div>
                    </div>
                  </div>
                )}

                <div className='absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/35 to-transparent'>
                  <div className='font-heading text-base font-extrabold text-white'>
                    {a.title}
                  </div>
                  <div className='mt-1 text-xs text-white/85'>
                    {a.category ?? 'Kegiatan'}
                    {a.year ? ` • ${a.year}` : ''}
                    {typeof a.imagesCount === 'number'
                      ? ` • ${a.imagesCount} foto`
                      : ''}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {hasMore && nextOffset != null ? (
        <div className='mt-8 flex justify-center'>
          <button
            type='button'
            onClick={loadMore}
            disabled={loadingMore}
            className={cn(
              'rounded-xl border bg-card px-4 py-2 text-sm font-semibold',
              'hover:bg-accent hover:text-accent-foreground transition',
              loadingMore && 'opacity-60 pointer-events-none'
            )}
          >
            {loadingMore ? 'Loading...' : 'Load more'}
          </button>
        </div>
      ) : null}
    </>
  )
}
