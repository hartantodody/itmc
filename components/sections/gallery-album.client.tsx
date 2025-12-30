'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
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

export default function GalleryAlbumClient({ album }: { album: AlbumDetail }) {
  const [active, setActive] = useState<{
    img: AlbumImageItem
    index: number
  } | null>(null)

  const images = album.images ?? []

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
