// components/sections/mini-gallery-section.tsx (server)
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '../common/container'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { client as sanityClient } from '@/sanity/lib/client'
import { miniGalleryAlbumsQuery } from '@/sanity/lib/queries'
import type { MiniGalleryAlbum } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'

const TILE_CLASS: Record<string, string> = {
  '0': 'sm:col-span-2 sm:row-span-2',
  '1': 'sm:col-span-2 sm:row-span-1',
  '2': 'sm:col-span-1 sm:row-span-1',
  '3': 'sm:col-span-1 sm:row-span-1'
}

export default async function MiniGallerySection() {
  const albums =
    (await sanityClient.fetch<MiniGalleryAlbum[]>(
      miniGalleryAlbumsQuery,
      {},
      { next: { revalidate: 60 } }
    )) ?? []

  const tiles = albums.slice(0, 4)

  return (
    <section className='relative overflow-hidden py-16 sm:py-20 bg-transparent text-primary-foreground'>
      <Container>
        <div className='mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-center gap-10'>
          <div className='space-y-5 text-center'>
            <div className='mx-auto inline-flex items-center rounded-full border border-black/15 bg-black/10 px-3 py-1 text-xs text-black/80 backdrop-blur'>
              Dokumentasi kegiatan
            </div>

            <h2 className='font-heading text-3xl font-extrabold tracking-tight sm:text-5xl text-black/80'>
              <span className='text-accent'>Galeri</span> Kegiatan IMTC
            </h2>

            <p className='mx-auto max-w-2xl text-sm text-black/80 sm:text-base'>
              Highlight kegiatan pelatihan & program.
            </p>

            <div className='pt-1'>
              <Button
                asChild
                className='bg-primary text-white hover:bg-primary/90'
              >
                <Link href='/galeri'>
                  Lihat semua <ArrowRight className='ml-2 size-4' />
                </Link>
              </Button>
            </div>
          </div>

          <div className='mx-auto w-full max-w-6xl'>
            <div
              className={cn(
                'grid gap-3 sm:gap-4',
                'grid-cols-2 sm:grid-cols-4',
                'auto-rows-[120px] sm:auto-rows-[140px] lg:auto-rows-[160px]'
              )}
            >
              {tiles.map((a, idx) => {
                const cover = a.coverImage ?? a.fallbackImage ?? null
                const src = cover?.asset
                  ? urlFor(cover)
                      .width(1200)
                      .height(900)
                      .fit('crop')
                      .auto('format')
                      .url()
                  : null

                return (
                  <Link
                    key={a._id}
                    href={`/galeri/${a.slug}`}
                    className={cn(
                      'group relative overflow-hidden rounded-[28px]',
                      'border border-white/12 bg-white/5 backdrop-blur',
                      'shadow-sm transition-all duration-300',
                      'hover:-translate-y-0.5 hover:shadow-lg',
                      TILE_CLASS[String(idx)] ?? 'sm:col-span-1 sm:row-span-1'
                    )}
                    aria-label={`Open album: ${a.title}`}
                  >
                    <div className='absolute inset-0'>
                      {src ? (
                        <Image
                          src={src}
                          alt={cover?.alt ?? a.title}
                          fill
                          sizes='(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw'
                          className='object-cover transition-transform duration-500 group-hover:scale-[1.05]'
                        />
                      ) : (
                        <div className='relative h-full w-full overflow-hidden'>
                          {/* kecil aja sesuai request */}
                          <div className='pointer-events-none absolute inset-0'>
                            <div className='absolute -top-12 left-1/2 h-40 w-[22rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />
                            <div className='absolute -bottom-12 right-[-15%] h-36 w-[20rem] rounded-full bg-accent/20 blur-3xl' />
                          </div>

                          <div className='absolute inset-0 grid place-items-center'>
                            <Image
                              src='/images/imtc-icon.webp'
                              alt='IMTC'
                              width={72}
                              height={72}
                              className='opacity-90'
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent' />
                    <div className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-primary/75 via-primary/20 to-transparent' />

                    <div className='absolute inset-x-0 bottom-0 p-4'>
                      <div className='font-heading text-sm font-extrabold text-white drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5'>
                        {a.title}
                      </div>
                      <div className='mt-1 text-xs text-white/80'>
                        {[a.category ?? null, a.year ?? null]
                          .filter(Boolean)
                          .join(' • ') || 'Dokumentasi • IMTC'}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
