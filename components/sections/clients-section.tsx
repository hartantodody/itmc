'use client'

import React, { useMemo } from 'react'
import Container from '../common/container'
import { cn } from '@/lib/utils'
import { ClientItem } from '@/interfaces/client'
import { CLIENTS } from '@/data/clients.data'

function MarqueeRow({
  items,
  durationSec = 32
}: {
  items: ClientItem[]
  durationSec?: number
}) {
  const doubled = useMemo(() => [...items, ...items], [items])

  return (
    <div className='relative w-full overflow-hidden'>
      <div
        className='flex w-max gap-4 animate-imtc-marquee'
        style={{ animationDuration: `${durationSec}s` }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className={cn(
              // ukuran card
              'shrink-0 min-w-[260px] sm:min-w-[320px]',
              'h-[92px] sm:h-[104px]',
              'flex flex-col items-center justify-center',

              // style
              'rounded-3xl border bg-card',
              'px-4 text-center',
              'transition-all duration-300',
              'hover:-translate-y-1 hover:shadow-lg'
            )}
            title={item.note ?? item.name}
          >
            {/* nama instansi */}
            <div className='font-heading text-sm sm:text-base font-extrabold text-foreground'>
              {item.name}
            </div>

            {/* tahun / note */}
            {item.note ? (
              <div className='mt-1 text-xs sm:text-sm text-muted-foreground'>
                {item.note}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ClientsSection() {
  return (
    <section id='klien' className='relative overflow-hidden py-16 sm:py-20'>
      <Container className='space-y-10'>
        {/* centered header */}
        <div className='mx-auto max-w-3xl space-y-4 text-center'>
          <div className='inline-flex items-center rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs text-foreground/75 backdrop-blur'>
            Partner & kolaborasi
          </div>

          <h2 className='font-heading text-3xl font-extrabold tracking-tight sm:text-5xl'>
            <span className='text-accent'>Klien</span> & Partner
          </h2>

          <p className='mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base'>
            Beberapa institusi yang pernah bekerja sama.
          </p>
        </div>

        {/* marquee */}
        <div className='relative'>
          {/* edge fades */}
          <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent' />
          <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent' />

          <MarqueeRow items={CLIENTS} durationSec={32} />
        </div>
      </Container>
    </section>
  )
}
