'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { AnnouncementItem } from '@/sanity/types'
import { ArrowLeft, ArrowRight, Newspaper } from 'lucide-react'

function safeImageUrl(image: any, w = 1600) {
  try {
    if (!image?.asset) return null
    return urlFor(image).width(w).fit('max').auto('format').url()
  } catch {
    return null
  }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return iso
  }
}

async function fetchAnnouncements(limit = 6) {
  const qs = new URLSearchParams()
  qs.set('limit', String(limit))

  const res = await fetch(`/api/announcements?${qs.toString()}`, {
    method: 'GET',
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to load announcements')
  return (await res.json()) as { items: AnnouncementItem[]; count: number }
}

/** PortableText components untuk annotation link dari schema */
const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className='mb-3 leading-relaxed'>{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className='mt-6 mb-3 text-xl font-semibold'>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className='mt-5 mb-2 text-lg font-semibold'>{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className='my-4 border-l-4 border-primary pl-4 italic text-muted-foreground'>
        {children}
      </blockquote>
    )
  },

  list: {
    bullet: ({ children }) => (
      <ul className='my-3 list-disc pl-6 space-y-1 marker:text-primary'>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className='my-3 list-decimal pl-6 space-y-1 marker:text-primary'>
        {children}
      </ol>
    )
  },

  listItem: {
    bullet: ({ children }) => <li className='leading-relaxed'>{children}</li>,
    number: ({ children }) => <li className='leading-relaxed'>{children}</li>
  },

  marks: {
    link: ({ value, children }) => {
      const href = value?.href as string | undefined
      const blank = Boolean(value?.blank)
      if (!href) return <>{children}</>

      return (
        <a
          href={href}
          target={blank ? '_blank' : undefined}
          rel={blank ? 'noopener noreferrer' : undefined}
          className='underline underline-offset-4 text-blue-500 hover:text-blue-700'
        >
          {children}
        </a>
      )
    },

    strong: ({ children }) => (
      <strong className='font-semibold'>{children}</strong>
    ),

    em: ({ children }) => <em className='italic'>{children}</em>,

    code: ({ children }) => (
      <code className='rounded bg-muted px-1.5 py-0.5 text-xs font-mono'>
        {children}
      </code>
    )
  }
}

type AnnouncementImageItem =
  | {
      image?: any
      alt?: string
      caption?: string
    }
  | any

function AnnouncementCarousel({
  slides,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 60vw',
  heightClassName = 'h-[420px]'
}: {
  slides: AnnouncementImageItem[]
  priority?: boolean
  sizes?: string
  heightClassName?: string
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  const count = slides?.length ?? 0

  return (
    <div className='relative'>
      <div className='overflow-hidden rounded-lg' ref={emblaRef}>
        <div className='flex'>
          {(slides ?? []).map((s, idx) => {
            const img = s?.image ?? s
            const src = safeImageUrl(img, 1600)

            return (
              <div key={idx} className='min-w-0 flex-[0_0_100%]'>
                <div
                  className={cn('relative w-full bg-muted', heightClassName)}
                >
                  {src ? (
                    <Image
                      src={src}
                      alt={s?.alt ?? 'Announcement image'}
                      fill
                      sizes={sizes}
                      className='object-contain'
                      priority={priority && idx === 0}
                    />
                  ) : (
                    <div className='absolute inset-0 grid place-items-center bg-muted text-xs text-muted-foreground'>
                      Image not available
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {count > 1 ? (
        <>
          <button
            type='button'
            onClick={scrollPrev}
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2',
              'rounded-full bg-black/40 text-white',
              'h-9 w-9 grid place-items-center backdrop-blur',
              'hover:bg-black/55 transition',
              'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50'
            )}
            disabled={selectedIndex === 0}
            aria-label='Previous image'
          >
            <ArrowLeft className='w-4 h-4' />
          </button>

          <button
            type='button'
            onClick={scrollNext}
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'rounded-full bg-black/40 text-white',
              'h-9 w-9 grid place-items-center backdrop-blur',
              'hover:bg-black/55 transition',
              'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50'
            )}
            disabled={selectedIndex === count - 1}
            aria-label='Next image'
          >
            <ArrowRight className='w-4 h-4' />
          </button>

          <div className='absolute bottom-3 right-3 rounded-full bg-black/45 px-2 py-1 text-[11px] text-white/85 backdrop-blur'>
            {selectedIndex + 1}/{count}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default function AnnouncementSectionClient({
  title = 'Announcement',
  subtitle = 'Latest updates and important notices.',
  limit = 6
}: {
  title?: string
  subtitle?: string
  limit?: number
}) {
  const [items, setItems] = useState<AnnouncementItem[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [active, setActive] = useState<AnnouncementItem | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)

    fetchAnnouncements(limit)
      .then((d) => {
        if (!mounted) return
        const arr = Array.isArray(d.items) ? d.items : []
        setItems(arr)
        setSelectedId((prev) => prev ?? arr[0]?._id ?? null)
      })
      .catch((e) => {
        console.error('[AnnouncementSection] fetch failed:', e)
        if (mounted) setItems([])
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [limit])

  const selected = useMemo(() => {
    if (!items.length) return null
    if (!selectedId) return items[0]
    return items.find((x) => x._id === selectedId) ?? items[0]
  }, [items, selectedId])

  const selectedSlides = ((selected as any)?.images ?? []) as any[]

  return (
    <section id='pengumuman' className='w-full py-16 sm:py-20'>
      <div className='mx-auto max-w-6xl px-4'>
        {/* centered header (match ClientsSection) */}
        <div className='mx-auto max-w-3xl space-y-4 text-center mb-10'>
          <div className='mx-auto inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur'>
            <Newspaper className='mr-2 h-4 w-4 text-accent' /> Informasi terbaru
          </div>

          <h2 className='font-heading text-3xl font-extrabold tracking-tight sm:text-5xl'>
            <span className='text-black'>{title}</span>
          </h2>

          <p className='mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base'>
            {subtitle}
          </p>
        </div>

        <div
          className={cn(
            'grid border rounded-2xl overflow-hidden',
            'lg:grid-cols-[1.2fr_0.8fr] items-stretch'
          )}
        >
          {/* Left: Selected hero */}
          <div
            className={cn(
              'relative overflow-hidden rounded-2xl border bg-card',
              'shadow-sm'
            )}
          >
            {loading ? (
              <div className='h-[420px] w-full animate-pulse bg-muted' />
            ) : selected ? (
              <>
                <AnnouncementCarousel
                  slides={selectedSlides}
                  priority
                  sizes='(max-width: 1024px) 100vw, 60vw'
                />
              </>
            ) : (
              <div className='h-[420px] w-full grid place-items-center bg-muted text-xs text-muted-foreground'>
                No announcements yet.
              </div>
            )}
          </div>

          {/* Right: List (Sidebar Professional) */}
          <div className='h-[420px] bg-muted/30 flex flex-col'>
            {/* header */}
            <div className='flex items-center justify-between gap-3 border-b bg-background/60 px-5 py-4 backdrop-blur'>
              <div className='min-w-0'>
                <div className='text-lg font-semibold text-foreground'>
                  Berita Terbaru
                </div>
                <div className='mt-0.5 text-xs text-muted-foreground'>
                  {loading ? 'Memuat…' : `${items.length} item`}
                </div>
              </div>

              {/* optional: small hint badge */}
              <div className='hidden sm:inline-flex items-center rounded-full border bg-background px-3 py-1 text-[11px] text-muted-foreground'>
                Klik item untuk ganti gambar
              </div>
            </div>

            {/* list */}
            <div className='flex-1 overflow-y-auto'>
              <div className='divide-y divide-border/70'>
                {loading ? (
                  <div className='p-5 space-y-3'>
                    {Array.from({ length: Math.max(limit, 3) }).map((_, i) => (
                      <div
                        key={i}
                        className='h-16 w-full animate-pulse rounded-lg bg-muted'
                      />
                    ))}
                  </div>
                ) : items.length ? (
                  items.map((it) => {
                    const isSelected = it._id === (selected?._id ?? null)

                    return (
                      <div
                        key={it._id}
                        role='button'
                        tabIndex={0}
                        onClick={() => setSelectedId(it._id)}
                        className={cn(
                          'group relative w-full text-left',
                          'px-5 py-4',
                          'transition-colors',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

                          // active
                          isSelected
                            ? 'bg-primary/10'
                            : 'hover:bg-background/70'
                        )}
                        aria-pressed={isSelected}
                      >
                        {/* active indicator bar */}
                        <span
                          className={cn(
                            'absolute left-0 top-3 bottom-3 w-1 rounded-r-full transition-opacity',
                            isSelected
                              ? 'bg-primary opacity-100'
                              : 'bg-transparent opacity-0'
                          )}
                        />

                        <div className='flex items-start justify-between gap-4'>
                          {/* text */}
                          <div className='min-w-0 flex-1'>
                            <div
                              className={cn(
                                'line-clamp-2 text-sm font-semibold leading-snug transition-colors',
                                isSelected
                                  ? 'text-foreground'
                                  : 'text-foreground'
                              )}
                            >
                              {it.title}
                            </div>

                            <div className='mt-1 text-xs text-muted-foreground'>
                              {it.publishedAt ? formatDate(it.publishedAt) : ''}
                            </div>

                            {(it as any).excerpt ? (
                              <div className='mt-2 line-clamp-2 text-xs text-muted-foreground'>
                                {(it as any).excerpt}
                              </div>
                            ) : null}
                          </div>

                          {/* detail button */}
                          <div className='shrink-0 pt-0.5'>
                            {isSelected && (
                              <div className='shrink-0 pt-0.5'>
                                <button
                                  type='button'
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActive(it)
                                  }}
                                  className={cn(
                                    'rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all duration-200',
                                    isSelected
                                      ? 'opacity-100 translate-x-0'
                                      : 'opacity-0 translate-x-2 pointer-events-none'
                                  )}
                                >
                                  Detail
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className='p-5 text-sm text-muted-foreground'>
                    No announcements yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog detail */}
      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className='max-w-none w-[calc(100vw-15rem)] h-[calc(100vh-15rem)] p-0'>
          <DialogTitle className='sr-only'>
            {active?.title ?? 'Announcement'}
          </DialogTitle>

          {active ? (
            <div className='grid gap-0 md:grid-cols-2'>
              {/* left: carousel */}
              <div className='border-b md:border-b-0 md:border-r'>
                <AnnouncementCarousel
                  slides={((active as any)?.images ?? []) as any[]}
                  sizes='(max-width: 768px) 100vw, 50vw'
                  heightClassName='h-[52vh] sm:h-[70vh] md:h-[calc(100vh-15rem)]'
                />
              </div>

              {/* right: content */}
              <div className='p-5 sm:p-6'>
                <div className='text-xs text-muted-foreground'>
                  {active.publishedAt ? formatDate(active.publishedAt) : null}
                </div>

                <h3 className='mt-2 text-xl font-semibold'>{active.title}</h3>

                {(active as any).excerpt ? (
                  <p className='mt-2 text-sm text-muted-foreground'>
                    {(active as any).excerpt}
                  </p>
                ) : null}

                {((active as any).description?.length ?? 0) > 0 ? (
                  <div className='prose prose-sm mt-4 text-sm max-w-none dark:prose-invert'>
                    <PortableText
                      value={(active as any).description}
                      components={portableComponents}
                    />
                  </div>
                ) : (
                  <div className='mt-4 text-sm text-muted-foreground'>
                    (No description)
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
