import { groq } from 'next-sanity'
import { SITE_SETTINGS_ID } from '@/sanity/singletons'

/**
 * First few photos of an album, for the hover slideshow on gallery cards.
 * Four is enough to say "there's more inside" without making a card fetch
 * the whole album.
 */
const PREVIEW_IMAGES = `"previewImages": images[0...4]{
      _key,
      alt,
      asset,
      crop,
      hotspot
    }`

export const heroSlideshowAlbumsQuery = groq`
  *[_type == "galleryAlbum" && count(images) > 0]
  | order(order asc, year desc, _createdAt desc)
  [0...12]{
    _id,
    title,
    "slug": slug.current,
    year,
    category,
    images[][
      0...12
    ]{
      _key,
      alt,
      caption,
      asset,
      crop,
      hotspot
    }
  }
`

export const galleryAlbumListQuery = groq`
  *[_type == "galleryAlbum"]
  | order(order asc, year desc, _createdAt desc){
    _id,
    title,
    slug,
    category,
    year,
    order,
    description,
    coverImage{
      alt,
      asset,
      crop,
      hotspot
    },
    "imagesCount": count(images),
    ${PREVIEW_IMAGES}
  }
`

export const galleryAlbumBySlugQuery = groq`
  *[_type == "galleryAlbum" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    category,
    year,
    order,
    coverImage,
    images[]{
      _key,
      alt,
      caption,
      asset,
      crop,
      hotspot
    }
  }
`

export const galleryAlbumSlugsQuery = groq`
  *[_type == "galleryAlbum" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  } | order(_updatedAt desc)
`

export const miniGalleryAlbumsQuery = groq`
  *[_type == "galleryAlbum" && defined(slug.current)]
  | order(order asc, year desc, _createdAt desc)
  [0...4]{
    _id,
    title,
    "slug": slug.current,
    category,
    year,
    order,
    coverImage{
      alt,
      asset,
      crop,
      hotspot
    },
    "fallbackImage": images[0]{
      _key,
      alt,
      caption,
      asset,
      crop,
      hotspot
    },
    description,
    ${PREVIEW_IMAGES}
  }
`

export const trainingPackagesQuery = groq`
  *[_type == "trainingPackage"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    desc,
    durationText,
    format,
    level,
    highlights,
    recommended,
    maxParticipants,
    timeText,
    included,
    excluded,
    order
  }
`

export const trainingPackagesPreviewQuery = groq`
  *[_type == "trainingPackage"] 
  | order(order asc, _createdAt desc)[0...3] {
    _id,
    title,
    desc,
    "slug": slug.current,
    recommended,
    level,
    format,
    durationText,
    timeText,
    maxParticipants,
    highlights
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "${SITE_SETTINGS_ID}"][0]{
    heroImages[]{
      _key,
      alt,
      asset,
      crop,
      hotspot
    },
    heroStats[]{
      icon,
      value,
      label
    }
  }
`

export const latestAnnouncementsQuery = /* groq */ `
*[_type == "announcement"] | order(publishedAt desc)[0...$limit]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,

  // optional helper buat preview cepat
  "firstImage": images[0].image{
    asset->{
      _id,
      url,
      metadata { dimensions { width, height } }
    }
  },

  images[]{
    alt,
    caption,
    image{
      asset->{
        _id,
        url,
        metadata { dimensions { width, height } }
      }
    }
  },

  description
}
`
