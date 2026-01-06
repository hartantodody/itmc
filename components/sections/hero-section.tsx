import HeroSectionClient from './hero-section.client'
import { client as sanityClient } from '@/sanity/lib/client'
import {
  heroSlideshowAlbumsQuery,
  siteSettingsQuery
} from '@/sanity/lib/queries'

export default async function HeroSection() {
  const albums = await sanityClient.fetch(
    heroSlideshowAlbumsQuery,
    {},
    { next: { revalidate: 60 } }
  )

  const settings = await sanityClient.fetch(
    siteSettingsQuery,
    {},
    { next: { revalidate: 60 } }
  )

  return <HeroSectionClient albums={albums} stats={settings?.heroStats} />
}
