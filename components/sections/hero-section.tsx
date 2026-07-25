import HeroSectionClient from './hero-section.client'
import { client as sanityClient } from '@/sanity/lib/client'
import {
  // heroSlideshowAlbumsQuery, // (DINONAKTIFKAN) sumber slideshow dari galeri Sanity
  siteSettingsQuery
} from '@/sanity/lib/queries'

export default async function HeroSection() {
  // ⛔️ [DINONAKTIFKAN] Slideshow hero sekarang pakai image statis dari
  // public/images/hero/ (lihat hero-section.client.tsx). Fetch album galeri
  // di bawah SENGAJA di-comment (JANGAN dihapus) supaya gampang balik ke
  // sumber galeri Sanity kalau nanti dibutuhkan lagi.
  // const albums = await sanityClient.fetch(
  //   heroSlideshowAlbumsQuery,
  //   {},
  //   { next: { revalidate: 60 } }
  // )

  // ✅ Stats hero tetap dari Sanity (siteSettings.heroStats).
  const settings = await sanityClient.fetch(
    siteSettingsQuery,
    {},
    { next: { revalidate: 60 } }
  )

  // ⛔️ [LAMA] return <HeroSectionClient albums={albums} stats={settings?.heroStats} />
  // ✅ [BARU] albums tidak lagi dikirim — slideshow pakai image statis di client.
  return <HeroSectionClient stats={settings?.heroStats} />
}
