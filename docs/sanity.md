# Sanity CMS

Sanity v4, Studio embedded di `/admin` (lihat [routing.md](./routing.md)).
Semua kode CMS ada di folder `sanity/`.

## File Map

| File | Fungsi |
|---|---|
| `sanity.config.ts` (root) | Config Studio: `basePath: '/admin'`, plugins `structureTool` + `visionTool` |
| `sanity.cli.ts` | Sanity CLI config |
| `sanity/env.ts` | `projectId`, `dataset` (di-assert wajib), `apiVersion` (def `2025-12-24`) |
| `sanity/lib/client.ts` | `createClient` (`useCdn: true`) |
| `sanity/lib/image.ts` | `urlFor()` image URL builder |
| `sanity/lib/live.ts` | `sanityFetch` + `SanityLive` (⚠️ belum dipakai) |
| `sanity/lib/queries.ts` | Semua GROQ query |
| `sanity/schemaTypes/*` | Definisi schema |
| `sanity/structure.ts` | Struktur Studio (default: list semua document type) |
| `sanity/types.ts` | TypeScript types hasil query |

## Schema Types

Terdaftar di `sanity/schemaTypes/index.ts`:

### `siteSettings` (document)
Singleton-ish settings. Field:
- `title` (string, optional)
- `heroStats[]` → array of `heroStat` (max 6)

### `heroStat` (object)
Dipakai di `siteSettings.heroStats`. Field:
- `icon` (string, list: `Users` | `Award` | `TrendingUp`) — nama Lucide icon
- `value` (number, ≥0)
- `label` (string)

### `galleryAlbum` (document) — title "Gallery Activity"
- `title` (string, req)
- `slug` (slug dari title, req)
- `category` (string)
- `year` (string, mis. `2024` atau `2024/2025`)
- `order` (number, default 0)
- `coverImage` (image, hotspot, optional)
- `images[]` (array of image, hotspot) — tiap image punya `alt` + `caption`
- Ordering: `order asc`

### `trainingPackage` (document)
- `title` (string, req), `slug` (req)
- `desc` (text, 3 rows)
- `durationText` (string, mis. "3 hari")
- `format` (list: `Online` | `Offline` | `Hybrid`, def Offline)
- `level` (list: `Basic` | `Intermediate` | `Advanced`, def Basic)
- `highlights[]` (string[])
- `recommended` (boolean, def false)
- `maxParticipants` (number)
- `timeText` (string)
- `included[]`, `excluded[]` (string[])
- `order` (number, def 0) — ordering `order asc`

### `announcement` (document)
- `title` (string, req min 5), `slug` (req)
- `publishedAt` (datetime, req, default now)
- `images[]` → array of `announcementImage` (req, min 1) — carousel
- `description` → rich text (Portable Text) dengan link annotation (lihat `fields/richTextWithLinks.ts`)
- `excerpt` (text, buat card)
- Ordering: `publishedAt desc`

### `announcementImage` (object)
- `image` (image, hotspot, req)
- `alt` (string, req min 3)
- `caption` (string)

### `richTextWithLinks` (field factory)
`fields/richTextWithLinks.ts` → field `description` bertipe array of `block` dengan annotation `link` (`href` URL req + `blank` boolean, default open new tab).

## GROQ Queries — `sanity/lib/queries.ts`

| Export | Untuk | Catatan |
|---|---|---|
| `heroSlideshowAlbumsQuery` | Hero slideshow | Album dengan ≥1 image, ambil 12 album × 12 image |
| `galleryAlbumListQuery` | List galeri | Semua album + `coverImage` + `imagesCount` |
| `galleryAlbumBySlugQuery` | Detail album | Full images by `$slug` |
| `galleryAlbumSlugsQuery` | Sitemap | Semua slug + `_updatedAt` |
| `miniGalleryAlbumsQuery` | Mini gallery homepage | 4 album, cover + `fallbackImage` (images[0]) |
| `trainingPackagesQuery` | Page `/pelatihan` | Semua field lengkap |
| `trainingPackagesPreviewQuery` | Homepage preview | 3 teratas, subset field, slug diflatten |
| `siteSettingsQuery` | Hero stats | Ambil `heroStats[]` saja |
| `latestAnnouncementsQuery` | API announcement | `$limit`, resolve `asset->` + dimensions, `firstImage` helper |

> Perhatikan: `latestAnnouncementsQuery` pakai `asset->` (dereference, resolve `url` + metadata), sedangkan query galeri simpan `asset` mentah dan resolve URL di sisi FE via `urlFor()`.

## TypeScript Types — `sanity/types.ts`

- `AlbumImageItem` = `SanityImage & { _key, alt?, caption? }`
- `AlbumListItem` — hasil `galleryAlbumListQuery`
- `AlbumDetail` — hasil `galleryAlbumBySlugQuery`
- `MiniGalleryAlbum` — hasil `miniGalleryAlbumsQuery`
- `TrainingPackage` — full (slug dikomentari, belum ada detail page)
- `TrainingPackagePreview` = `Pick<TrainingPackage, ...>`
- `AnnouncementItem` — announcement (content = `PortableTextBlock[]`)
