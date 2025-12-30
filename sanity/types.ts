import type { Image as SanityImage } from 'sanity'

/** @see sanity/schemaTypes/galleryAlbum.ts */
export type AlbumImageItem = SanityImage & {
  _key: string
  alt?: string
  caption?: string
}

export type AlbumListItem = {
  _id: string
  title: string
  slug: { current: string }
  category?: string
  year?: string
  order?: number
  coverImage?: SanityImage
  imagesCount?: number
}

export type AlbumDetail = {
  _id: string
  title: string
  slug: { current: string }
  category?: string
  year?: string
  order?: number
  images?: AlbumImageItem[]
}

export type MiniGalleryAlbum = {
  _id: string
  title: string
  slug: string
  category?: string
  year?: string
  order?: number
  coverImage?: (SanityImage & { alt?: string }) | null
  fallbackImage?: (SanityImage & { _key?: string; alt?: string }) | null
}

/** @see sanity/schemaTypes/trainingPackage.ts */
export type TrainingPackage = {
  _id: string
  title: string

  // slug: { current: string } // ✅ dipakai kalau nanti ada detail page
  desc?: string
  durationText?: string
  format?: 'Online' | 'Offline' | 'Hybrid'
  level?: 'Basic' | 'Intermediate' | 'Advanced'
  highlights?: string[]
  recommended?: boolean
  maxParticipants?: number
  timeText?: string
  included?: string[]
  excluded?: string[]
  order?: number
}

/**
 * Preview type = subset yang "ringan"
 * (karena preview section gak butuh detail lengkap)
 */
export type TrainingPackagePreview = Pick<
  TrainingPackage,
  '_id' | 'title' | 'desc' | 'recommended' | 'level' | 'format' | 'durationText'
> & {
  // slug?: string // ✅ kalau query preview nanti mau flatten slug.current -> string
}
