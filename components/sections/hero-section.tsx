import HeroSectionClient from './hero-section.client'
import { client as sanityClient } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import type { Image as SanityImage } from 'sanity'

type HeroImageFromSanity = SanityImage & { alt?: string }
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

  // Foto hero dari siteSettings.heroImages (diatur klien di Studio). URL
  // dibangun di server supaya client cukup menerima string. Kosong / tidak
  // terjangkau → client jatuh ke foto statis di public/images/hero/.
  const heroImages = ((settings?.heroImages ?? []) as HeroImageFromSanity[])
    .filter((img) => Boolean(img?.asset))
    .map((img) => ({
      // 1600px: hero-nya kartu 4:3 di setengah layar, bukan full-bleed —
      // cukup tajam di layar retina tanpa mengirim file ukuran poster.
      src: urlFor(img).width(1600).height(1200).fit('crop').auto('format').url(),
      alt: img.alt?.trim() || 'Dokumentasi kegiatan IMTC'
    }))

  // ⛔️ [LAMA] return <HeroSectionClient albums={albums} stats={settings?.heroStats} />
  return (
    <HeroSectionClient stats={settings?.heroStats} images={heroImages} />
  )
}
