// src/components/seo/jsonld.tsx
import env from '@/lib/environment'
import { IMTC_CONTACT } from '@/data/contact.data'

function absoluteUrl(path: string) {
  if (!path.startsWith('/')) return path
  return `${env.siteUrl}${path}`
}

export function JsonLdBase() {
  // kamu gak punya /logo.png, jadi pakai icon yang ada:
  // public/images/imtc-icon.webp
  const logoUrl = absoluteUrl('/images/imtc-icon.webp')

  const orgId = `${env.siteUrl}#organization`
  const siteId = `${env.siteUrl}#website`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': orgId,
      name: IMTC_CONTACT.brand.long,
      alternateName: IMTC_CONTACT.brand.short,
      url: env.siteUrl,
      logo: logoUrl,
      email: IMTC_CONTACT.email.address,
      sameAs: [
        IMTC_CONTACT.instagram.url,
        ...IMTC_CONTACT.socials.map((s) => s.href)
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: IMTC_CONTACT.address.lines.join(', '),
        addressLocality: 'Jakarta Pusat',
        addressCountry: 'ID'
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: IMTC_CONTACT.email.address,
          telephone: `+${IMTC_CONTACT.whatsapp.e164}`,
          availableLanguage: ['id', 'en']
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': siteId,
      url: env.siteUrl,
      name: env.siteName,
      publisher: { '@id': orgId }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${env.siteUrl}/#webpage`,
      url: env.siteUrl,
      name: env.siteName,
      isPartOf: { '@id': siteId },
      about: { '@id': orgId }
    }
  ]

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
