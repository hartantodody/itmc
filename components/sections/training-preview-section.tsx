import Link from 'next/link'
import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PROGRAMS = [
  {
    title: 'Fundamental MICE & Event Planning',
    desc: 'Dasar perencanaan event: tujuan, timeline, stakeholder, dan konsep acara.'
  },
  {
    title: 'Manajemen Operasional Event',
    desc: 'Run of show, koordinasi crew, vendor management, dan simulasi hari-H.'
  },
  {
    title: 'Conference & Meeting Management',
    desc: 'Standar penyelenggaraan rapat/konferensi: venue, peserta, protokol, layanan.'
  }
] as const

export default function TrainingPreviewSection() {
  return (
    <section className='relative py-16 sm:py-20 bg-imtc-horizon text-primary-foreground'>
      {' '}
      {/* background */}
      <Container className='min-h-screen py-16 sm:py-20'>
        <div className='flex min-h-[calc(100vh-8rem)] flex-col justify-center gap-10'>
          {/* centered header */}
          <div className='mx-auto max-w-3xl space-y-4 text-center'>
            <div className='inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur'>
              Program unggulan
            </div>

            <h2 className='font-heading text-3xl font-extrabold tracking-tight sm:text-5xl'>
              <span className='text-accent'>Program</span> Pelatihan
            </h2>

            <p className='mx-auto max-w-2xl text-sm text-white/80 sm:text-base'>
              Berikut beberapa program unggulan (dummy dulu). Nanti tinggal
              diganti dari Sanity.
            </p>

            <div className='pt-2'>
              <Button asChild className='bg-white text-black hover:bg-white/90'>
                <Link href='/pelatihan'>
                  Lihat semua <ArrowRight className='ml-2 size-4' />
                </Link>
              </Button>
            </div>
          </div>

          {/* fixed showcase grid */}
          <div className='grid gap-4 md:grid-cols-3'>
            {PROGRAMS.map((p) => (
              <article
                key={p.title}
                className={cn(
                  'rounded-[28px] border border-white/12 bg-white/10 p-6 backdrop-blur',
                  'shadow-sm transition-all duration-300',
                  'hover:-translate-y-0.5 hover:bg-white/12 hover:shadow-lg'
                )}
              >
                <div className='space-y-3'>
                  <h3 className='font-heading text-lg font-extrabold text-white sm:text-xl'>
                    {p.title}
                  </h3>
                  <p className='text-sm leading-relaxed text-white/75'>
                    {p.desc}
                  </p>
                </div>

                <div className='mt-6'>
                  <Link
                    href='/pelatihan'
                    className='inline-flex items-center text-sm font-semibold text-white/90 hover:text-white'
                  >
                    Detail program <ArrowRight className='ml-2 size-4' />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
