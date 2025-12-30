import GalleryAlbumClient from './gallery-album.client'

export default async function GalleryAlbumSection({ slug }: { slug: string }) {
  const res = await fetch(
    `/api/gallery/album?slug=${encodeURIComponent(slug)}&offset=0&limit=12`,
    {
      cache: 'no-store'
    }
  )
  const data = await res.json()

  return <GalleryAlbumClient album={data.album} />
}
