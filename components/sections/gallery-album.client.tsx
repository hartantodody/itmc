'use client'

import Image from 'next/image'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import type { AlbumDetail, AlbumImageItem } from '@/sanity/types'

function safeImageUrl(image: any, w = 1200, h = 900) {
  try {
    if (!image?.asset) return null
    return urlFor(image).width(w).height(h).fit('crop').auto('format').url()
  } catch {
    return null
  }
}

async function fetchAlbumImages(params: {
  slug: string
  offset?: number
  limit?: number
}) {
  const qs = new URLSearchParams()
  qs.set('slug', params.slug)
  qs.set('offset', String(params.offset ?? 0))
  qs.set('limit', String(params.limit ?? 12))

  const res = await fetch(`/api/gallery/album?${qs.toString()}`, {
    method: 'GET',
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to load album images')
  return (await res.json()) as {
    album: {
      _id: string
      title: string
      slug: { current: string } | string
      category?: string
      year?: string
    }
    images: AlbumImageItem[]
    nextOffset: number | null
    hasMore: boolean
    total: number
  }
}

export default function GalleryAlbumClient({
  album,
  initialImages,
  initialNextOffset,
  total,
  pageSize = 12
}: {
  album: AlbumDetail
  initialImages: AlbumImageItem[]
  initialNextOffset: number | null
  total: number
  pageSize?: number
}) {
  const slug =
    typeof (album.slug as any) === 'string'
      ? (album.slug as any)
      : album.slug?.current

  const [images, setImages] = useState<AlbumImageItem[]>(initialImages)
  const [nextOffset, setNextOffset] = useState<number | null>(initialNextOffset)
  const [hasMore, setHasMore] = useState<boolean>(initialNextOffset != null)
  const [loadingMore, setLoadingMore] = useState(false)

  const loadingRef = useRef(false)

  const [active, setActive] = useState<{
    img: AlbumImageItem
    index: number
  } | null>(null)

  const loadMore = useCallback(async () => {
    if (!slug) return
    if (!hasMore || nextOffset == null) return
    if (loadingRef.current) return

    loadingRef.current = true
    setLoadingMore(true)

    try {
      const data = await fetchAlbumImages({
        slug,
        offset: nextOffset,
        limit: pageSize
      })

      setImages((prev) => {
        const seen = new Set(prev.map((x) => x._key))
        const merged = [...prev]
        for (const it of data.images) {
          if (it?._key && !seen.has(it._key)) merged.push(it)
        }
        return merged
      })

      setNextOffset(data.nextOffset)
      setHasMore(data.hasMore)
    } finally {
      setLoadingMore(false)
      loadingRef.current = false
    }
  }, [slug, hasMore, nextOffset, pageSize])

  const thumbSources = useMemo(
    () =>
      images.map((img, idx) => ({
        key: img._key,
        src: safeImageUrl(img, 900, 675),
        alt: img.alt?.trim() || `${album.title} #${idx + 1}`
      })),
    [images, album.title]
  )

  return (
    <>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
        {images.map((img, idx) => {
          const t = thumbSources[idx]
          return (
            <button
              key={img._key}
              type='button'
              onClick={() => setActive({ img, index: idx })}
              className={cn(
                'group relative overflow-hidden rounded-2xl border bg-card text-left',
                'cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
              )}
              aria-label={`Open image ${idx + 1} in ${album.title}`}
            >
              <div className='relative aspect-[4/3] w-full'>
                {t?.src ? (
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                ) : (
                  <div className='absolute inset-0 grid place-items-center bg-muted text-xs text-muted-foreground'>
                    Image not available
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {hasMore && nextOffset != null ? (
        <div className='mt-8 flex flex-col items-center gap-2'>
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
          <div className='text-xs text-muted-foreground'>
            Menampilkan {images.length} dari {total} foto
          </div>
        </div>
      ) : (
        <div className='mt-8 text-center text-xs text-muted-foreground'>
          {total ? `Semua foto sudah ditampilkan (${total}).` : null}
        </div>
      )}

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className='max-w-5xl overflow-hidden p-0'>
          <DialogTitle className='sr-only'>{album.title} image</DialogTitle>

          {active ? (
            <div className='relative aspect-[16/10] w-full bg-black'>
              {(() => {
                const big = safeImageUrl(active.img, 1600, 1000)
                const alt =
                  active.img.alt?.trim() ||
                  `${album.title} #${active.index + 1}`
                return big ? (
                  <Image
                    src={big}
                    alt={alt}
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

          {active?.img?.caption ? (
            <div className='p-4 text-sm text-muted-foreground'>
              {active.img.caption}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
