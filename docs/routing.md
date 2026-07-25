# Routing

Next.js App Router, dua route group: `(site)` (publik) dan `(admin)` (Studio).
Route group **tidak** muncul di URL — cuma buat pisah layout.

## Public Routes — `(site)`

| URL | File | Rendering | Data |
|---|---|---|---|
| `/` | [app/(site)/page.tsx](../app/(site)/page.tsx) | Server (composed sections) | Sanity + static |
| `/pelatihan` | [app/(site)/pelatihan/page.tsx](../app/(site)/pelatihan/page.tsx) | Server async | `trainingPackagesQuery` (fallback benefits hardcoded) |
| `/galeri` | [app/(site)/galeri/page.tsx](../app/(site)/galeri/page.tsx) | Server shell + client grid | `GalleryAlbumGrid` (client, via API) |
| `/galeri/[slug]` | [app/(site)/galeri/[slug]/page.tsx](../app/(site)/galeri/[slug]/page.tsx) | Server async + `generateMetadata` | `galleryAlbumBySlugQuery` |

- `(site)/layout.tsx`: bungkus `Header` + `Footer` + decorative blur background.
- Semua page publik set metadata via `createPageMetadata()` (`lib/seo-helpers.ts`).
- `/galeri/[slug]` pakai `notFound()` kalau album gak ketemu, dan `generateMetadata` dinamis dari album.

## Admin Routes — `(admin)`

| URL | File | Keterangan |
|---|---|---|
| `/admin` (+ semua subpath) | [app/(admin)/admin/[[...index]]/page.tsx](../app/(admin)/admin/[[...index]]/page.tsx) | Sanity Studio, catch-all, `dynamic = 'force-static'` |

- `page.tsx` render `StudioClient` (`studio-client.tsx`, `'use client'`, `<NextStudio config={config} />`).
- Config dari root `sanity.config.ts` (`basePath: '/admin'`).
- `(admin)/layout.tsx`: `robots: noindex`, title `Admin`.
- Metadata/viewport di-re-export dari `next-sanity/studio`.

> Catatan: folder route pakai `[[...index]]` (bukan `[[...tool]]` seperti komentar default) — commit `a52e07d` rename buat fix route Studio.

## API Routes — `app/api`

| Endpoint | Method | Query params | Response | Dipakai oleh |
|---|---|---|---|---|
| `/api/announcements` | GET | `limit` (default 6, max 12) | `{ items, count }` | AnnouncementSection (client) |
| `/api/gallery/albums` | GET | `limit` (1–24, def 12), `offset` (≥0) | `{ items, nextOffset, hasMore }` | Gallery grid load-more |
| `/api/gallery/album` | GET | `slug` (wajib), `limit` (1–24), `offset` | `{ album, images, nextOffset, hasMore, total }` | Album detail load-more |

- `/api/announcements` set `dynamic = 'force-dynamic'` (anti-cache) + try/catch → 500 dengan `items: []` kalau error.
- `/api/gallery/*` pakai ISR `revalidate: 60`, clamp limit/offset, filter image tanpa `asset`.
- `/api/gallery/album` → 400 kalau tanpa slug, 404 kalau album gak ada.

## SEO / Metadata Routes

| Route | File | Isi |
|---|---|---|
| `/sitemap.xml` | [app/sitemap.ts](../app/sitemap.ts) | Static routes (`/`, `/pelatihan`, `/galeri`) + semua `/galeri/[slug]` dari `galleryAlbumSlugsQuery` |
| `/robots.txt` | [app/robots.ts](../app/robots.ts) | Allow all, disallow `/admin`, link sitemap |

- JSON-LD structured data (`Organization`, `WebSite`, `WebPage`) di-inject di `<head>` root via `components/seo/jsonld.tsx`.

## Pagination Constants

`constants/pagination.ts`:
```ts
INITIAL_LIMIT = 16
LOAD_MORE_LIMIT = 8
```
