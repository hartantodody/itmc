import Link from 'next/link'
import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

import { client as sanityClient } from '@/sanity/lib/client'
import { trainingPackagesPreviewQuery } from '@/sanity/lib/queries'
import type { TrainingPackagePreview } from '@/sanity/types'

import TrainingPackageGrid from '@/components/common/training-package-grid'

export default async function TrainingPreviewSection() {
  const programs =
    (await sanityClient.fetch<TrainingPackagePreview[]>(
      trainingPackagesPreviewQuery,
      {},
      { next: { revalidate: 60 } }
    )) ?? []

  const data =
    programs.length > 0
      ? programs
      : ([
          {
            _id: 'fallback-1',
            title: 'Fundamental MICE & Event Planning',
            desc: 'Dasar perencanaan event: tujuan, timeline, stakeholder, dan konsep acara.',
            recommended: true,
            level: 'Basic',
            format: 'Offline',
            durationText: '3 hari'
          },
          {
            _id: 'fallback-2',
            title: 'Manajemen Operasional Event',
            desc: 'Run of show, koordinasi crew, vendor management, dan simulasi hari-H.',
            level: 'Intermediate',
            format: 'Offline',
            durationText: '3 hari'
          }
        ] as TrainingPackagePreview[])

  return (
    <section
      className='relative py-16 sm:py-20 bg-imtc-horizon text-primary-foreground'
      id='program'
    >
      <Container className='min-h-screen py-16 sm:py-20'>
        <div className='flex min-h-[calc(100vh-8rem)] flex-col justify-center gap-10'>
          {/* header */}
          <div className='mx-auto max-w-3xl space-y-4 text-center'>
            <div className='inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur'>
              Program unggulan
            </div>

            <h2 className='font-heading text-3xl font-extrabold tracking-tight sm:text-5xl'>
              <span className='text-accent'>Program</span> Pelatihan
            </h2>

            <p className='mx-auto max-w-2xl text-sm text-white/80 sm:text-base'>
              Program dapat disesuaikan sesuai kebutuhan institusi/perusahaan.
            </p>

            <div className='pt-2'>
              <Button asChild className='bg-white text-black hover:bg-white/90'>
                <Link href='/pelatihan'>
                  Lihat semua <ArrowRight className='ml-2 size-4' />
                </Link>
              </Button>
            </div>
          </div>

          {/* grid (preview dibuat ringkas: no highlights) */}
          <TrainingPackageGrid
            items={data}
            variant='preview'
            showHighlights={false}
          />
        </div>
      </Container>
    </section>
  )
}
