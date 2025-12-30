import type { MetadataRoute } from 'next'
import env from '@/lib/environment'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // kalau admin kamu mau diblok:
      { userAgent: '*', disallow: ['/admin'] }
    ],
    sitemap: `${env.siteUrl}/sitemap.xml`
  }
}
