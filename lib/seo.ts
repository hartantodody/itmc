import type { Metadata } from 'next'
import env from './environment'

export const defaultSeo: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: env.siteName,
    template: `%s | ${env.siteName}`
  },
  description:
    'Indonesia MICE Training Center (IMTC) provides competency-based training and development programs in the MICE and event industry.',
  applicationName: env.siteName,
  openGraph: {
    type: 'website',
    url: env.siteUrl,
    siteName: env.siteName,
    locale: 'id_ID'
  },
  twitter: {
    card: 'summary_large_image'
  },
  robots: {
    index: true,
    follow: true
  }
}
