# Frontend — Components, Data, Lib

## Component Groups (`components/`)

| Folder | Isi |
|---|---|
| `ui/` | shadcn/ui components (Radix-based). ~70 file — button, card, dialog, carousel, form, chart, dll. Generated, jarang diedit manual. |
| `layout/` | `header.tsx`, `footer.tsx` — dipakai di `(site)/layout.tsx` |
| `sections/` | Blok besar per section homepage & galeri (server + `.client` pairs) |
| `common/` | Reusable: `container`, `page-header`, `feature-icon`, `hero-slideshow`, `training-package-card`, `training-package-grid` |
| `seo/` | `jsonld.tsx` — structured data injector |

> `components.json` = config shadcn/ui (alias, style). UI components di-manage via shadcn CLI.

### Sections (`components/sections/`)

Server component fetch data → render `.client.tsx` untuk interaktivitas:

| Server | Client pair | Data |
|---|---|---|
| `hero-section.tsx` | `hero-section.client.tsx` | hero albums + hero stats |
| `announcement-section.tsx` | `announcement-section.client.tsx` | via `/api/announcements` |
| `gallery-album-grid.tsx` | `gallery-album-grid.client.tsx` | via `/api/gallery/albums` |
| `gallery-album-section.tsx` / `gallery-album.client.tsx` | — | detail album |
| `about-section.tsx` | — (static) | `data/about.data.ts` |
| `clients-section.tsx` | — (static) | `data/clients.data.ts` |
| `contact-section.tsx` | — | `data/contact.data.ts` + WA builder |
| `training-preview-section.tsx` | — | Sanity preview (fallback hardcoded) |
| `mini-gallery-section.tsx` | — | Sanity mini gallery |

## Static Data (`data/`)

Konten yang masih hardcoded (belum di CMS):

| File | Isi | Type |
|---|---|---|
| `about.data.ts` | `ABOUT_CONTENT`: badge, title, description, `features[]` (icon Lucide), `timeline[]` (pra/on-site/post-event) | `as const` |
| `clients.data.ts` | `CLIENTS[]`: daftar 14 klien (nama + note tahun) | `ClientItem[]` |
| `contact.data.ts` | `IMTC_CONTACT`: brand, email, WhatsApp (e164 `62817700343`), Instagram, alamat kantor (Cikini, Jakpus), socials | `ImtcContact` |

## Lib Helpers (`lib/`)

| File | Export | Fungsi |
|---|---|---|
| `utils.ts` | `cn()`, `safeImageUrl()` | classname merge + safe Sanity image URL (null kalau invalid) |
| `environment.ts` | `env` (default) | `siteUrl`, `siteName`, `mode`, `sanity` config dari `NEXT_PUBLIC_*` |
| `fonts.ts` | `satoshi`, `cabinetGrotesk`, `jetbrainsMono` | next/font: Satoshi (`--font-sans`, local), Cabinet Grotesk (`--font-heading`, local), JetBrains Mono (`--font-mono`, Google) |
| `seo.ts` | `defaultSeo` | Metadata dasar (OG, Twitter, robots, icons) untuk root layout |
| `seo-helpers.ts` | `createPageMetadata()` | Builder metadata per-page (canonical, OG, twitter, noindex opsional) |
| `gallery.ts` | `pickHeroSlideshowImages()` | Algoritma round-robin pilih 6 image dari beberapa album biar variatif |
| `contact-templates.ts` | `buildContactMessage()`, `buildWhatsAppUrl()` | Generate pesan WA per-intent (general, quotation, in-house, dll.) → `wa.me` URL |

### `contact-templates.ts` — Contact Intents

`ContactIntent` = `general` \| `ask-recommendation` \| `request-quotation` \| `in-house` \| `certification` \| `schedule-call`.
`buildContactMessage(intent, payload)` menyusun teks bahasa Indonesia → `buildWhatsAppUrl()` encode ke `https://wa.me/62817700343?text=...`.

## Hooks (`hooks/`)

- `use-mobile.ts` → `useIsMobile()` (breakpoint detection, dipakai shadcn sidebar dll.)

## Interfaces (`interfaces/`)

- `client.ts` → `ClientItem { name, note? }`

## Fonts & Assets (`public/`)

- `public/fonts/satoshi/*` (Regular/Medium/Bold + italics)
- `public/fonts/cabinet-grotesk/*` (Medium/Bold/Extrabold)
- `public/images/`, `public/og/default.jpg` (OG image), favicons (`favicon.ico`, `favicon-48/96.png`)

## Styling

- Tailwind CSS v4 (config via `postcss.config.mjs` + `app/globals.css`, bukan `tailwind.config`).
- Font CSS vars: `--font-sans`, `--font-heading`, `--font-mono` di-set di root `body`.
- Warna: pakai token `primary`, `accent` (lihat blur decorative di `(site)/layout.tsx`).
- `tw-animate-css` untuk util animasi tambahan.
