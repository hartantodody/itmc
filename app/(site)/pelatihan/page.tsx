import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import { client as sanityClient } from '@/sanity/lib/client'
import { trainingPackagesQuery } from '@/sanity/lib/queries'
import type { TrainingPackage } from '@/sanity/types'

import TrainingPackageGrid from '@/components/common/training-package-grid'
import { Metadata } from 'next'
import { createPageMetadata } from '@/lib/seo-helpers'

export const metadata: Metadata = createPageMetadata({
  title: 'Program Pelatihan',
  description:
    'Program pelatihan IMTC untuk industri MICE & event: event management, liaison officer, registration, dan in-house.',
  pathname: '/pelatihan'
})

const BENEFITS_FALLBACK = [
  'Materi dapat disesuaikan sesuai kebutuhan institusi/perusahaan',
  'Pelaksanaan offline (opsi format lain bisa menyusul)',
  'Template & SOP praktis untuk implementasi',
  'Pendampingan diskusi studi kasus (opsional)'
] as const

export default async function PelatihanPage() {
  const packages =
    (await sanityClient.fetch<TrainingPackage[]>(
      trainingPackagesQuery,
      {},
      { next: { revalidate: 60 } }
    )) ?? []

  return (
    <main className='relative overflow-hidden py-16 sm:py-20'>
      <Container className='space-y-12'>
        {/* Header */}
        <section className='space-y-5'>
          <Badge variant='secondary' className='gap-2'>
            <Sparkles className='h-3.5 w-3.5' />
            Program Pelatihan IMTC
          </Badge>

          <h1 className='font-heading text-4xl font-extrabold tracking-tight sm:text-5xl'>
            Paket Pelatihan untuk Industri MICE & Event
          </h1>

          <p className='max-w-2xl text-muted-foreground sm:text-lg'>
            Pilih paket sesuai kebutuhan. Detail program, materi, dan
            pelaksanaan dapat disesuaikan.
          </p>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <Button asChild size='lg'>
              <Link href='/#kontak'>
                Konsultasi Kebutuhan <ArrowRight className='ml-2 size-4' />
              </Link>
            </Button>

            <Button asChild size='lg' variant='outline'>
              <Link href='/galeri'>Lihat Dokumentasi</Link>
            </Button>
          </div>
        </section>

        <Separator />

        {/* Packages */}
        <section className='space-y-6'>
          <div className='space-y-1'>
            <h2 className='font-heading text-2xl font-extrabold'>
              Pilih Paket
            </h2>
            <p className='text-sm text-muted-foreground'>
              Durasi, modul, dan fokus dapat di-custom.
            </p>
          </div>

          <TrainingPackageGrid items={packages} variant='page' showHighlights />
        </section>

        {/* Benefits */}
        <section className='grid gap-6 lg:grid-cols-12'>
          <Card className='lg:col-span-7'>
            <CardHeader>
              <CardTitle className='font-heading text-2xl font-extrabold'>
                Kenapa IMTC
              </CardTitle>
              <p className='text-sm text-muted-foreground'>
                Fokus ke implementasi dan standar kerja yang jelas.
              </p>
            </CardHeader>
            <CardContent>
              <ul className='space-y-3 text-sm'>
                {BENEFITS_FALLBACK.map((b) => (
                  <li key={b} className='flex gap-2'>
                    <span className='mt-2 h-1.5 w-1.5 rounded-full bg-accent' />
                    <span className='text-foreground/85'>{b}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className='lg:col-span-5'>
            <CardHeader>
              <CardTitle className='font-heading text-2xl font-extrabold'>
                Custom Program
              </CardTitle>
              <p className='text-sm text-muted-foreground'>
                Untuk in-house training, modul dapat disusun sesuai kebutuhan.
              </p>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='rounded-2xl border bg-card p-4'>
                <div className='text-sm font-semibold'>Contoh output</div>
                <div className='mt-1 text-sm text-muted-foreground'>
                  SOP, checklist operasional, template briefing, dan format
                  evaluasi pasca kegiatan.
                </div>
              </div>

              <Button asChild size='lg' className='w-full'>
                <Link href='/#kontak'>Konsultasi Program In-house</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  )
}
