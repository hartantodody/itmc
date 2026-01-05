import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

export function HeroSlideshow({
  images,
  buildUrl
}: {
  images: any[]
  buildUrl: (img: any) => string | null
}) {
  const slides = useMemo(() => {
    return (images ?? [])
      .map((img) => ({
        url: buildUrl(img),
        alt: img?.alt ?? 'IMTC activity'
      }))
      .filter((x) => Boolean(x.url))
  }, [images, buildUrl])

  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const t = window.setInterval(() => {
      setIdx((v) => (v + 1) % slides.length)
    }, 3800)
    return () => window.clearInterval(t)
  }, [slides.length])

  if (slides.length === 0) {
    return (
      <div className='relative grid h-full w-full place-items-center p-8 text-center'>
        <div className='space-y-2'>
          <div className='text-2xl font-extrabold text-white'>
            Foto kegiatan
          </div>
          <p className='text-sm text-white/60'>Belum ada gambar di galeri.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='relative h-full w-full'>
      {slides.map((s, i) => (
        <div
          key={`${s.url}-${i}`}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            i === idx ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={s.url!}
            alt={s.alt}
            fill
            priority={i === 0}
            className='object-cover'
            sizes='(min-width: 1024px) 50vw, 100vw'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10' />
        </div>
      ))}
    </div>
  )
}
