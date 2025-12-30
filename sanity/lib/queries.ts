import { groq } from 'next-sanity'

export const galleryAlbumByIndexQuery = groq`
  *[_type == "galleryAlbum"]
  | order(order asc, year desc, _createdAt desc)
  [$index...$end]{
    _id,
    title,
    category,
    year,
    order,
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

export const miniGalleryAlbumsQuery = /* groq */ `
*[_type == "galleryAlbum"] | order(order asc, _createdAt desc) [0...4] {
  _id,
  title,
  category,
  year,
  order,
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
