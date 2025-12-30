import type { Metadata } from 'next'
import env from './environment'

type PageSeo = {
  title: string
  description: string
  pathname: `/${string}` | '/'
  ogImage?: string // default fallback ke /og/default.jpg
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description,
  pathname,
  ogImage = `${env.siteUrl}/og/default.jpg`,
  noIndex
}: PageSeo): Metadata {
  const url = `${env.siteUrl}${pathname === '/' ? '' : pathname}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${title} | ${env.siteName}`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${env.siteName}`,
      description,
      images: [ogImage]
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true }
  }
}
