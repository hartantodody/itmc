# IMTC Company Website — Docs

Referensi internal buat project **IMTC (Indonesia MICE Training Center)** company website.
Tujuannya biar cepat paham struktur project tanpa harus grep dari nol.

> Company profile / marketing site untuk lembaga pelatihan berbasis kompetensi
> di industri **MICE & event** (event management, liaison officer, registration, in-house training).

## Daftar Dokumen

| Dokumen | Isi |
|---|---|
| [architecture.md](./architecture.md) | Tech stack, rendering strategy, data flow, diagram arsitektur |
| [routing.md](./routing.md) | Semua route (site + admin), halaman, dan API endpoints |
| [sanity.md](./sanity.md) | Schema CMS, GROQ queries, TypeScript types, env |
| [frontend.md](./frontend.md) | Sections, components, static data, lib helpers, fonts, SEO |
| [changelog.md](./changelog.md) | Catatan perubahan arsitektur / perilaku |

## TL;DR Tech Stack

- **Framework:** Next.js `15.5.9` (App Router, Turbopack dev) + React `19.1.0`
- **Language:** TypeScript `5`
- **CMS:** Sanity `v4` (Studio embedded di `/admin`) via `next-sanity`
- **Styling:** Tailwind CSS `v4` + shadcn/ui (Radix primitives) + `tw-animate-css`
- **Animation:** Framer Motion `12`
- **Forms:** react-hook-form + zod
- **Charts:** Recharts `2.15.4` (via shadcn chart component)
- **Package manager:** **bun** (ada `bun.lock`)
- **Bahasa konten:** Indonesia (`lang="id"`)

## Command

```bash
bun dev      # next dev --turbopack (localhost:3000)
bun run build
bun start
bun run lint
```

## Struktur Folder (top-level)

```
app/            # Next.js App Router — route groups (site) & (admin), API routes
components/     # UI (shadcn), layout, sections, common, seo
constants/      # konstanta kecil (pagination)
data/           # konten statis / hardcoded (about, clients, contact)
hooks/          # custom hooks (use-mobile)
interfaces/     # TS types non-sanity (ClientItem)
lib/            # helpers: seo, env, fonts, gallery, contact-templates, utils
sanity/         # config CMS: client, queries, schema, types, structure
public/         # assets: fonts, images, og, favicon
docs/           # <-- dokumen ini
```

## Environment Variables

`.env.local` (semua `NEXT_PUBLIC_*`, jadi client-exposed):

| Var | Fungsi |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Base URL, dipakai SEO / sitemap / robots |
| `NEXT_PUBLIC_SITE_NAME` | Nama brand default |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project id (wajib, di-assert) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (wajib, di-assert) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Optional, default `2025-12-24` |

## Catatan Cepat

- Semua halaman publik ada di route group **`(site)`**; Sanity Studio di route group **`(admin)`** di path `/admin`.
- Section homepage adalah **server components** yang fetch dari Sanity, lalu render **`.client.tsx`** untuk interaktivitas.
- Data fetching pakai `client.fetch(...)` dengan ISR `revalidate: 60` (bukan `sanityFetch`/live meski `live.ts` tersedia).
- Sebagian konten masih **hardcoded** di `data/` (about, clients, contact) — belum semua dari CMS.
