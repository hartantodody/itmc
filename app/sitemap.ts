import type { MetadataRoute } from 'next'
import env from '@/lib/environment'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.siteUrl

  return [
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
}
