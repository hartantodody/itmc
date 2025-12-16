'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '../common/container'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type MiniGalleryItem = {
  id: string
  title: string
  src: string
}

const ITEMS: MiniGalleryItem[] = [
  {
    id: '1',
    title: 'Pelatihan Event Planning',
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '2',
    title: 'Workshop Operasional',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '3',
    title: 'In-house Training',
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '4',
    title: 'Simulasi Hari-H',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80'
  }
] as const

const TILE_CLASS: Record<string, string> = {
  // layout “gak beraturan” tapi tetap enak
  '1': 'sm:col-span-2 sm:row-span-2',
  '2': 'sm:col-span-2 sm:row-span-1',
  '3': 'sm:col-span-1 sm:row-span-1',
  '4': 'sm:col-span-1 sm:row-span-1'
}

export default function MiniGallerySection() {
  return (
    <section className='relative overflow-hidden py-16 sm:py-20 bg-transparent text-primary-foreground'>
      <Container>
        <div className='mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-center gap-10'>
          {/* top content center */}
          <div className='space-y-5 text-center'>
            <div className='mx-auto inline-flex items-center rounded-full border border-black/15 bg-black/10 px-3 py-1 text-xs text-black/80 backdrop-blur'>
              Dokumentasi kegiatan
            </div>

            <h2 className='font-heading text-3xl font-extrabold tracking-tight sm:text-5xl text-black/80'>
              <span className='text-accent'>Galeri</span> Kegiatan IMTC
            </h2>

            <p className='mx-auto max-w-2xl text-sm text-black/80 sm:text-base '>
              Highlight kegiatan pelatihan & program. (Foto masih dummy)
            </p>

            <div className='pt-1'>
              <Button
                asChild
                className='bg-primary text-white hover:bg-primary/90'
              >
                <Link href='/galeri'>
                  Get started <ArrowRight className='ml-2 size-4' />
                </Link>
              </Button>
            </div>
          </div>

          {/* irregular grid */}
          <div className='mx-auto w-full max-w-6xl'>
            <div
              className={cn(
                'grid gap-3 sm:gap-4',
                'grid-cols-2 sm:grid-cols-4',
                // kasih tinggi “grid feel” biar kayak screenshot
                'auto-rows-[120px] sm:auto-rows-[140px] lg:auto-rows-[160px]'
              )}
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    'group relative overflow-hidden rounded-[28px]',
                    'border border-white/12 bg-white/5 backdrop-blur',
                    'shadow-sm transition-all duration-300',
                    'hover:-translate-y-0.5 hover:shadow-lg',
                    TILE_CLASS[item.id]
                  )}
                >
                  <div className='absolute inset-0'>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes='(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw'
                      className='object-cover transition-transform duration-500 group-hover:scale-[1.05]'
                      priority={false}
                    />
                  </div>

                  {/* base overlay (always on) */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent' />

                  {/* hover tint overlay (primary) */}
                  <div className='absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-primary/75 via-primary/20 to-transparent' />

                  {/* text (always visible) */}
                  <div className='absolute inset-x-0 bottom-0 p-4'>
                    <div className='font-heading text-sm font-extrabold text-white drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5'>
                      {item.title}
                    </div>
                    <div className='mt-1 text-xs text-white/80'>
                      Dokumentasi • IMTC
                    </div>
                  </div>

                  {/* optional: subtle corner shine */}
                  <div className='pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
