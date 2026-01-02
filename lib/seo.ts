// lib/seo.ts
import type { Metadata } from 'next'
import env from './environment'

const ogImage = `${env.siteUrl}/og/default.jpg`

export const defaultSeo: Metadata = {
  metadataBase: new URL(env.siteUrl),

  title: {
    default: env.siteName,
    template: `%s | ${env.siteName}`
  },

  description:
    'Indonesia MICE Training Center (IMTC) provides competency-based training and development programs in the MICE and event industry.',

  applicationName: env.siteName,

  alternates: {
    canonical: env.siteUrl
  },

  openGraph: {
    type: 'website',
    url: env.siteUrl,
    siteName: env.siteName,
    locale: 'id_ID',
    title: env.siteName,
    description:
      'Indonesia MICE Training Center (IMTC) provides competency-based training and development programs in the MICE and event industry.',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Indonesia MICE Training Center'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    images: [ogImage]
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-96.png', type: 'image/png', sizes: '96x96' }
    ]
  }

  // kalau kamu punya manifest
  // manifest: '/site.webmanifest'
}
