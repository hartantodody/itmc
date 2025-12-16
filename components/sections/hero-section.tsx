'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className='relative overflow-hidden py-16 sm:py-20'>
      {/* background subtle */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        {/* Blue glow */}
        <div className='absolute -top-32 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />

        {/* Orange accent glow */}
        <div className='absolute -bottom-32 right-[-10%] h-72 w-[36rem] rounded-full bg-accent/20 blur-3xl' />
      </div>

      <Container className='grid items-center gap-10 lg:grid-cols-2'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='space-y-6'
        >
          <div className='inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-foreground/80'>
            <span className='font-mono'>IMTC</span>
            <span className='text-muted-foreground'>•</span>
            <span>Training & Development for MICE Industry</span>
          </div>

          <h1 className='font-heading text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
            <span className='inline-flex items-baseline gap-2'>
              {/* IND + O(icon) + NESIA */}
              <span className='text-foreground'>IND</span>

              <span className='inline-flex translate-y-[4px]'>
                <Image
                  src='/images/imtc-icon.webp'
                  alt='O'
                  width={56}
                  height={56}
                  priority
                  className='h-[1em] w-[1em] object-contain'
                />
              </span>

              <span className='text-foreground'>NESIA</span>
            </span>

            {/* MICE */}
            <span className='block text-accent'>MICE</span>

            {/* Training Center */}
            <span className='block text-primary'>Training Center</span>
          </h1>

          <p className='max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
            Pelatihan berbasis kompetensi untuk industri MICE & event. Cocok
            untuk institusi, korporasi, dan tim operasional yang butuh standar
            kerja yang jelas.
          </p>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <Button asChild size='lg'>
              <Link href='/pelatihan'>
                Lihat Program Pelatihan <ArrowRight className='ml-2 size-4' />
              </Link>
            </Button>

            <Button asChild size='lg' variant='outline'>
              <Link href='#kontak'>Konsultasi</Link>
            </Button>
          </div>

          <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground'>
            <span>✅ In-house / publik</span>
            <span>✅ Online / offline</span>
            <span>✅ Materi dapat disesuaikan</span>
          </div>
        </motion.div>

        {/* visual placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          className='relative'
        >
          <div className='aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-card shadow-sm'>
            <div className='grid h-full w-full place-items-center p-8 text-center'>
              <div className='space-y-3'>
                <div className='mx-auto grid size-14 place-items-center rounded-2xl border bg-background font-heading text-lg font-extrabold'>
                  IM
                </div>
                <div className='font-heading text-xl font-extrabold'>
                  Foto kegiatan / banner
                </div>
                <p className='text-sm text-muted-foreground'>
                  Placeholder dulu. Nanti bisa diganti gambar dari Sanity.
                </p>
              </div>
            </div>
          </div>

          <div className='pointer-events-none absolute -bottom-6 -left-6 hidden rounded-2xl border bg-background px-4 py-3 shadow-sm lg:block'>
            <div className='text-xs text-muted-foreground'>Trusted by</div>
            <div className='font-heading text-sm font-extrabold'>
              Clients & Partners
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
