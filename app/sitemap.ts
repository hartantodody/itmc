import type { MetadataRoute } from 'next'
import env from '@/lib/environment'
import { client as sanityClient } from '@/sanity/lib/client'
import { galleryAlbumSlugsQuery } from '@/sanity/lib/queries'

type AlbumSlugRow = { slug: string; _updatedAt?: string }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.siteUrl

  const albums =
    (await sanityClient.fetch<AlbumSlugRow[]>(
      galleryAlbumSlugsQuery,
      {},
      { next: { revalidate: 60 } }
    )) ?? []

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${base}/pelatihan`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${base}/galeri`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    }
  ]

  const albumRoutes: MetadataRoute.Sitemap = albums.map((a) => ({
    url: `${base}/galeri/${a.slug}`,
    lastModified: a._updatedAt ? new Date(a._updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  }))

  return [...staticRoutes, ...albumRoutes]
}
