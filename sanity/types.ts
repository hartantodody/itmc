import type { Image as SanityImage } from 'sanity'

export type AlbumImageItem = SanityImage & {
  _key: string
  alt?: string
  caption?: string
}

export type AlbumDoc = {
  _id: string
  title: string
  category?: string
  year?: string
  order?: number
  images?: AlbumImageItem[]
}

export type GalleryTile = {
  _id: string
  _key: string
  title: string
  category?: string
  year?: string
  alt?: string
  caption?: string
  image: SanityImage
}

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
