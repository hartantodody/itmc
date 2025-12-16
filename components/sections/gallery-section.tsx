'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type GalleryItem = {
  id: string
  title: string
  src: string
  alt: string
  year?: string
  category?: string
}

const ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Pelatihan Event Planning',
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    alt: 'Training session'
  },
  {
    id: '2',
    title: 'Workshop Operasional Event',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    alt: 'Workshop'
  },
  {
    id: '3',
    title: 'Simulasi Hari-H',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80',
    alt: 'Event rehearsal'
  },
  {
    id: '4',
    title: 'Kelas Publik',
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
    alt: 'Public class'
  },
  {
    id: '5',
    title: 'In-house Training',
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    alt: 'In-house'
  },
  {
    id: '6',
    title: 'Sesi Diskusi',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Discussion'
  }
]

export default function GallerySection() {
  const [active, setActive] = useState<GalleryItem | null>(null)

  return (
    <>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
        {ITEMS.map((item) => (
          <button
            key={item.id}
            type='button'
            onClick={() => setActive(item)}
            className={cn(
              'group relative overflow-hidden rounded-2xl border bg-card text-left',
              'cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
            )}
            aria-label={`Open image: ${item.title}`}
          >
            <div className='relative aspect-[4/3] w-full'>
              <img
                src={item.src}
                alt={item.alt}
                className='absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
              />

              {/* TEXT BAR + OVERLAY (ini yang paling aman) */}
              <div
                className={cn(
                  'absolute inset-x-0 bottom-0 p-3',
                  // base: black gradient to transparent
                  'bg-gradient-to-t from-black/80 via-black/35 to-transparent',
                  // hover: shift to primary-ish highlight
                  'transition-[background] duration-300',
                  'group-hover:from-primary/85 group-hover:via-primary/35 group-hover:to-transparent transition-all'
                )}
              >
                <div className='font-heading text-sm font-extrabold text-white transition-transform duration-300 group-hover:-translate-y-0.5'>
                  {item.title}
                </div>

                <div className='text-xs text-white/85'>
                  {item.category ?? 'Dokumentasi'}{' '}
                  {item.year ? `• ${item.year}` : ''}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className='max-w-5xl overflow-hidden p-0'>
          <DialogTitle className='sr-only'>
            {active?.title ?? 'Gallery image'}
          </DialogTitle>

          {active ? (
            <div className='relative aspect-[16/10] w-full bg-black'>
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes='(max-width: 1024px) 100vw, 1024px'
                className='object-contain'
                priority
              />
            </div>
          ) : null}

          {active ? (
            <div className='p-4'>
              <div className='font-heading text-lg font-extrabold'>
                {active.title}
              </div>
              <div className='text-sm text-muted-foreground'>
                {active.category ?? 'Dokumentasi'}{' '}
                {active.year ? `• ${active.year}` : ''}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
