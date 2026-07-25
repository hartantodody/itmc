# Changelog (Docs)

Catatan perubahan penting yang memengaruhi arsitektur / perilaku, biar gampang dilacak.
Format tanggal: `YYYY-MM-DD`.

## 2026-07-25 — Hero slideshow: pindah dari fetch galeri → image statis

**Ringkas:** Sumber gambar slideshow di Hero Section diganti dari fetch album galeri
Sanity menjadi **image statis** di `public/images/hero/hero-1.JPG … hero-8.JPG`,
diacak urutannya tiap kunjungan.

**Alasan:** Klien ingin kurasi foto hero sendiri (lepas dari galeri).

**Yang berubah:**
- [components/sections/hero-section.tsx](../components/sections/hero-section.tsx)
  - Fetch `heroSlideshowAlbumsQuery` di-**comment** (tidak dihapus); import query-nya juga.
  - Fetch `siteSettingsQuery` (hero stats) **tetap aktif**.
  - `<HeroSectionClient>` tidak lagi menerima prop `albums`.
- [components/sections/hero-section.client.tsx](../components/sections/hero-section.client.tsx)
  - Import `safeImageUrl` & `pickHeroSlideshowImages` di-**comment**.
  - Tambah `HERO_STATIC_IMAGES` + helper `shuffleArray` (Fisher–Yates).
  - Logika `slideshowImages` lama (galeri) di-**comment**; diganti versi statis yang
    di-shuffle setelah mount (`useState` + `useEffect`) → aman dari hydration mismatch.
  - `HeroSlideshow` `buildUrl` diubah dari `safeImageUrl` → `(img) => img.src`.

**Sifat:** Kode lama **sengaja di-comment, bukan dihapus** (ditandai `⛔️ [DINONAKTIFKAN]`
/ `[LAMA]` vs `✅ [BARU]`) supaya gampang balik ke sumber galeri Sanity kalau dibutuhkan.

**Catatan operasional:**
- Ekstensi file **`.JPG` huruf besar** — penting untuk hosting case-sensitive (Vercel/Linux).
  Kalau file di-rename ke `.jpg`, update `HERO_STATIC_IMAGES`.
- File asli berukuran besar (1.5–6.8 MB). `next/image` meng-optimize saat disajikan,
  tapi disarankan kompres originalnya biar build & git lebih ringan.
- Fungsi lama yang jadi tidak terpakai tapi tetap ada: `pickHeroSlideshowImages`
  ([lib/gallery.ts](../lib/gallery.ts)) dan query `heroSlideshowAlbumsQuery`.
