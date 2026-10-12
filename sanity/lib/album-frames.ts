// Plain module (no 'use client'): server components like the homepage
// mini-gallery build their frames here and hand the result to the client
// slideshow as props. Exporting this from the client component instead
// breaks prerendering — a server component can't call into a client module.
import { urlFor } from '@/sanity/lib/image'
import type { AlbumPreviewImage } from '@/sanity/types'

export type SlideshowFrame = { src: string; alt: string }

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
