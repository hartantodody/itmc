import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { client as sanityClient } from '@/sanity/lib/client'
import type { AlbumListItem } from '@/sanity/types'
import { urlFor } from '@/sanity/lib/image'
import { galleryAlbumListQuery } from '@/sanity/lib/queries'

function coverSrc(a: AlbumListItem) {
  const img = a.coverImage ?? null
  if (!img?.asset) return null
  return urlFor(img).width(1200).height(900).fit('crop').auto('format').url()
}

export default async function GalleryAlbumGrid() {
  const albums =
    (await sanityClient.fetch<AlbumListItem[]>(
      galleryAlbumListQuery,
      {},
      { next: { revalidate: 60 } }
    )) ?? []

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {albums.map((a) => {
        const src = coverSrc(a)
        const href = `/galeri/${a.slug.current}`

        return (
          <Link
            key={a._id}
            href={href}
            className={cn(
              'group relative overflow-hidden rounded-2xl border bg-card',
              'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg'
            )}
          >
            <div className='relative aspect-[4/3] w-full'>
              {src ? (
                <Image
                  src={src}
                  alt={a.title}
                  fill
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  className='object-cover transition-transform duration-300 group-hover:scale-105'
                />
              ) : (
                <div className='absolute inset-0 grid place-items-center overflow-hidden bg-muted'>
                  {/* small gradient background */}
                  <div className='pointer-events-none absolute inset-0'>
                    <div className='absolute -top-10 left-1/2 h-32 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-2xl' />
                    <div className='absolute -bottom-10 right-[-15%] h-28 w-64 rounded-full bg-accent/20 blur-2xl' />
                  </div>

                  {/* subtle white overlay biar soft */}
                  <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-transparent' />

                  {/* icon */}
                  <div className='relative flex flex-col items-center gap-2'>
                    <div className='relative h-16 w-16 sm:h-20 sm:w-20'>
                      <Image
                        src='/images/imtc-icon.webp'
                        alt='IMTC'
                        fill
                        sizes='80px'
                        className='object-contain drop-shadow-sm'
                        priority={false}
                      />
                    </div>
                    <div className='text-md font-semibold text-cyan-600'>
                      No cover image
                    </div>
                  </div>
                </div>
              )}

              <div className='absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/35 to-transparent'>
                <div className='font-heading text-base font-extrabold text-white'>
                  {a.title}
                </div>
                <div className='mt-1 text-xs text-white/85'>
                  {a.category ?? 'Kegiatan'}
                  {a.year ? ` • ${a.year}` : ''}
                  {typeof a.imagesCount === 'number'
                    ? ` • ${a.imagesCount} foto`
                    : ''}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
