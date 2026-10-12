'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import type { AlbumPreviewImage } from '@/sanity/types'

export type SlideshowFrame = { src: string; alt: string }

/** Time each photo holds before the next one fades in. */
const FRAME_MS = 1400

type CoverLike = (AlbumPreviewImage | (Partial<AlbumPreviewImage> & { asset?: unknown })) | null | undefined

/**
 * Cover first, then the album's first few photos — deduped by asset, since
 * the cover is often also image #1 and fading a photo into itself reads as
 * a stutter rather than a transition.
 *
 * Every frame gets the same 4:3 crop as the cover, so cycling never makes
 * the card jump between aspect ratios.
 */
export function buildAlbumFrames(
  cover: CoverLike,
  previews: AlbumPreviewImage[] | undefined,
  fallbackAlt: string
): SlideshowFrame[] {
  const seen = new Set<string>()
  const frames: SlideshowFrame[] = []
  for (const img of [cover, ...(previews ?? [])]) {
    if (!img?.asset) continue
    const ref = (img.asset as { _ref?: string })._ref ?? JSON.stringify(img.asset)
    if (seen.has(ref)) continue
    seen.add(ref)
    frames.push({
      src: urlFor(img as AlbumPreviewImage)
        .width(1200)
        .height(900)
        .fit('crop')
        .auto('format')
        .url(),
      alt: (img as { alt?: string }).alt ?? fallbackAlt
    })
  }
  return frames
}

/**
 * Cycles an album's photos while its card is hovered or focused.
 *
 * Hover is read from the nearest ancestor marked `data-slideshow-root`
 * (the card's link) instead of from this element. The card stacks gradient
 * and text layers on top of the photo, and those would swallow the pointer
 * if this layer listened for itself — this way the whole card counts, and
 * the card markup doesn't need to know any of it.
 *
 * Only the first frame is mounted until the card is hovered once. A gallery
 * page renders a dozen cards; mounting every frame upfront would turn a
 * dozen image downloads into fifty.
 */
export function AlbumHoverSlideshow({
  frames,
  sizes,
  className
}: {
  frames: SlideshowFrame[]
  sizes: string
  /** Extra classes for each image, e.g. a hover zoom. */
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [armed, setArmed] = useState(false)
  const reducedMotion = useRef(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      reducedMotion.current = media.matches
    }
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const root = ref.current?.closest('[data-slideshow-root]')
    if (!root) return
    const enter = () => {
      setArmed(true)
      setHovered(true)
    }
    const leave = () => {
      setHovered(false)
      // Back to the cover — at rest a card shows the photo the editor
      // chose to represent the album.
      setActive(0)
    }
    root.addEventListener('mouseenter', enter)
    root.addEventListener('mouseleave', leave)
    root.addEventListener('focusin', enter)
    root.addEventListener('focusout', leave)
    return () => {
      root.removeEventListener('mouseenter', enter)
      root.removeEventListener('mouseleave', leave)
      root.removeEventListener('focusin', enter)
      root.removeEventListener('focusout', leave)
    }
  }, [])

  useEffect(() => {
    if (!hovered || frames.length < 2 || reducedMotion.current) return
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % frames.length)
    }, FRAME_MS)
    return () => window.clearInterval(timer)
  }, [hovered, frames.length])

  const mounted = armed ? frames : frames.slice(0, 1)

  return (
    <div ref={ref} className='absolute inset-0'>
      {mounted.map((frame, index) => (
        <Image
          key={frame.src}
          src={frame.src}
          // Only the cover is announced; the cycling frames are decoration
          // on top of it, and a screen reader shouldn't read four alts.
          alt={index === 0 ? frame.alt : ''}
          aria-hidden={index !== 0}
          fill
          sizes={sizes}
          className={cn(
            'object-cover transition-[opacity,transform] duration-700',
            index === active ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      ))}

      {frames.length > 1 ? (
        <span
          aria-hidden
          className='pointer-events-none absolute right-3 top-3 z-10 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
        >
          {frames.map((frame, index) => (
            <span
              key={frame.src}
              className={cn(
                'h-1 rounded-full transition-all duration-500',
                index === active ? 'w-4 bg-white' : 'w-1 bg-white/50'
              )}
            />
          ))}
        </span>
      ) : null}
    </div>
  )
}
