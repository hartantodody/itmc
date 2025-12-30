import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Variant = 'preview' | 'page'

type BaseItem = {
  _id: string
  title: string
  desc?: string
  // slug?: string
  recommended?: boolean
  level?: string
  format?: string
  durationText?: string
  timeText?: string
  maxParticipants?: number
  highlights?: string[]
}

function Chip({
  children,
  variant
}: {
  children: React.ReactNode
  variant: Variant
}) {
  if (variant === 'preview') {
    return (
      <span className='rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-white/85 backdrop-blur'>
        {children}
      </span>
    )
  }

  return (
    <span className='rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] text-foreground/80'>
      {children}
    </span>
  )
}

export default function TrainingPackageCard({
  item,
  variant = 'page',
  showHighlights,
  highlightLimit = 4
}: {
  item: BaseItem
  variant?: Variant
  showHighlights?: boolean
  highlightLimit?: number
}) {
  // ✅ Tidak ada detail page → arahkan semua ke /pelatihan
  const href = '/pelatihan'

  // // ✅ Kalau nanti ada detail page, uncomment ini:
  // const href = item.slug ? `/pelatihan/${item.slug}` : '/pelatihan'

  const isPreview = variant === 'preview'

  // default behavior:
  // - preview: highlights off
  // - page: highlights on
  const resolvedShowHighlights =
    typeof showHighlights === 'boolean' ? showHighlights : !isPreview

  const chips = [
    item.level ? String(item.level) : null,
    item.format ? String(item.format) : null
  ].filter(Boolean) as string[]

  const highlights = (item.highlights ?? []).slice(0, highlightLimit)

  /**
   * ✅ Kunci biar tinggi rata:
   * - Card = flex-col + h-full
   * - CardContent = flex-1 flex-col
   * - Footer = mt-auto
   */
  const cardClass = cn(
    'relative h-full flex flex-col overflow-hidden rounded-[28px]',
    isPreview
      ? // ✅ landing/preview: bikin lebih “solid” biar gak aneh di background gradient
        'border border-white/15 bg-black/20 text-white backdrop-blur'
      : 'border bg-card text-card-foreground'
  )

  const CardBody = (
    <Card className={cardClass}>
      <CardHeader className='space-y-3'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex flex-wrap items-center gap-2'>
            {item.recommended ? (
              isPreview ? (
                <span className='rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-black'>
                  Recommended
                </span>
              ) : (
                <Badge>Recommended</Badge>
              )
            ) : null}

            {chips.map((t) => (
              <Chip key={t} variant={variant}>
                {t}
              </Chip>
            ))}
          </div>

          {item.durationText ? (
            <div
              className={cn(
                'shrink-0 text-right text-[11px]',
                isPreview ? 'text-white/75' : 'text-muted-foreground'
              )}
            >
              <div
                className={cn('font-semibold', isPreview && 'text-white/85')}
              >
                {item.durationText}
              </div>

              {!isPreview && item.timeText ? (
                <div className='mt-0.5'>{item.timeText}</div>
              ) : null}
            </div>
          ) : null}
        </div>

        <CardTitle
          className={cn(
            'font-heading text-xl font-extrabold sm:text-2xl',
            isPreview ? 'text-white' : ''
          )}
        >
          {item.title}
        </CardTitle>

        {item.desc ? (
          <p
            className={cn(
              'text-sm leading-relaxed',
              isPreview ? 'text-white/75' : 'text-muted-foreground'
            )}
          >
            {item.desc}
          </p>
        ) : null}
      </CardHeader>

      <CardContent className='flex-1 flex flex-col gap-5'>
        {/* ✅ Preview: meta box dimatiin biar ringkas */}
        {!isPreview && (item.maxParticipants || item.timeText) ? (
          <div className='grid gap-2 sm:grid-cols-2'>
            {item.maxParticipants ? (
              <div className='rounded-2xl border bg-card px-3 py-2 text-xs'>
                <div className='text-[11px] text-muted-foreground'>
                  Maks. Peserta
                </div>
                <div className='font-semibold'>
                  {item.maxParticipants} orang / batch
                </div>
              </div>
            ) : null}

            {item.timeText ? (
              <div className='rounded-2xl border bg-card px-3 py-2 text-xs'>
                <div className='text-[11px] text-muted-foreground'>Waktu</div>
                <div className='font-semibold'>{item.timeText}</div>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* highlights */}
        {resolvedShowHighlights && highlights.length ? (
          <div className={cn(isPreview ? '' : 'pt-1')}>
            {isPreview ? (
              <>
                <div className='text-[11px] font-semibold text-white/75'>
                  Highlight materi
                </div>
                <ul className='mt-2 space-y-2'>
                  {highlights.map((h) => (
                    <li key={h} className='flex gap-2 text-sm text-white/75'>
                      <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60' />
                      <span className='leading-relaxed'>{h}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <ul className='space-y-2 text-sm'>
                {highlights.map((h) => (
                  <li key={h} className='flex gap-2'>
                    <CheckCircle2 className='mt-0.5 h-4 w-4 text-primary' />
                    <span className='text-foreground/85'>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}

        {/* ✅ Footer selalu “nempel bawah” */}
        <div className='mt-auto space-y-3'>
          {isPreview ? (
            <div className='h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent' />
          ) : null}

          <div
            className={cn(
              isPreview ? 'flex items-center justify-between' : 'grid gap-3'
            )}
          >
            {isPreview ? (
              <>
                <Link
                  href={href}
                  className='inline-flex items-center text-sm font-semibold text-white/90 hover:text-white'
                >
                  Lihat detail paket <ArrowRight className='ml-2 size-4' />
                </Link>

                <Link
                  href='/#kontak'
                  className='text-xs text-white/75 underline-offset-4 hover:text-white hover:underline'
                >
                  Konsultasi
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/#kontak'
                  className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90'
                >
                  Tanya Paket
                </Link>

                <Link
                  href={href}
                  className='inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-semibold hover:bg-muted'
                >
                  Detail
                </Link>
              </>
            )}
          </div>

          <p
            className={cn(
              'text-xs',
              isPreview ? 'text-white/60' : 'text-muted-foreground'
            )}
          >
            *Biaya tidak ditampilkan di website. Silakan kontak untuk penawaran.
          </p>
        </div>
      </CardContent>
    </Card>
  )

  /**
   * ✅ Border animasi:
   * - HANYA di page (/pelatihan) biar gak “nabrak” background landing yang gradient + glass
   * - Preview: recommended tetap ada badge, tapi wrapper animasi dimatiin
   */
  const useAnimatedBorder = !isPreview && item.recommended

  if (!useAnimatedBorder) return CardBody

  return (
    <div className='animated-border h-full'>
      <div className='animated-border-inner h-full'>{CardBody}</div>
    </div>
  )
}
