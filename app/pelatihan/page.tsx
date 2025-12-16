import Link from 'next/link'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

type Paket = {
  id: string
  title: string
  desc: string
  duration: string
  format: 'Online' | 'Offline' | 'Hybrid'
  level: 'Basic' | 'Intermediate' | 'Advanced'
  highlights: string[]
  recommended?: boolean
}

const PACKAGES: Paket[] = [
  {
    id: 'event-planning',
    title: 'Event Planning Fundamentals',
    desc: 'Fondasi perencanaan event: objective, rundown, budget, risk, dan koordinasi tim.',
    duration: '1–2 hari',
    format: 'Hybrid',
    level: 'Basic',
    highlights: [
      'Struktur perencanaan event end-to-end',
      'Template rundown & timeline',
      'Budgeting & vendor checklist',
      'Simulasi studi kasus'
    ],
    recommended: true
  },
  {
    id: 'mice-operations',
    title: 'MICE Operations & On-site Execution',
    desc: 'Kesiapan operasional saat hari-H: SOP, briefing, flow peserta, dan kontrol lapangan.',
    duration: '2 hari',
    format: 'Offline',
    level: 'Intermediate',
    highlights: [
      'SOP operasional & role assignment',
      'Manajemen flow registrasi',
      'Problem solving di lapangan',
      'Post-event report & evaluasi'
    ]
  },
  {
    id: 'service-excellence',
    title: 'Service Excellence for Event Team',
    desc: 'Standar pelayanan peserta & stakeholder: komunikasi, etika, dan penanganan komplain.',
    duration: '1 hari',
    format: 'Online',
    level: 'Basic',
    highlights: [
      'Komunikasi profesional',
      'Handling complaint & escalation',
      'Service mindset & etiquette',
      'Roleplay skenario'
    ]
  }
]

const BENEFITS = [
  'Materi dapat disesuaikan sesuai kebutuhan institusi/perusahaan',
  'Pilihan format: online, offline, atau hybrid',
  'Template & SOP praktis untuk implementasi',
  'Pendampingan diskusi studi kasus (opsional)'
] as const

export const metadata = {
  title: 'Program Pelatihan',
  description:
    'Paket pelatihan IMTC untuk industri MICE & event: planning, operasional, service excellence, dan program in-house.'
}

export default function PelatihanPage() {
  return (
    <main className='relative overflow-hidden py-16 sm:py-20'>
      {/* background brand glow */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute -top-28 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl' />
        <div className='absolute -bottom-28 right-[-10%] h-72 w-[40rem] rounded-full bg-accent/20 blur-3xl' />
      </div>

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
            Berikut contoh paket pelatihan (dummy dulu). Nanti tinggal kita
            ganti datanya dari Sanity: judul, deskripsi, durasi, format, dan
            highlight.
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
          <div className='flex items-end justify-between gap-4'>
            <div className='space-y-1'>
              <h2 className='font-heading text-2xl font-extrabold'>
                Pilih Paket
              </h2>
              <p className='text-sm text-muted-foreground'>
                Paket dapat di-custom (durasi, modul, dan fokus).
              </p>
            </div>
          </div>

          <div className='grid gap-6 lg:grid-cols-3'>
            {PACKAGES.map((p) => (
              <Card
                key={p.id}
                className={
                  p.recommended
                    ? 'border-primary/30 shadow-[0_16px_40px_-30px_rgba(31,106,225,0.6)]'
                    : ''
                }
              >
                <CardHeader className='space-y-3'>
                  <div className='flex items-center justify-between gap-2'>
                    <Badge variant={p.recommended ? 'default' : 'secondary'}>
                      {p.recommended ? 'Recommended' : p.level}
                    </Badge>
                    <div className='text-xs text-muted-foreground'>
                      {p.format} • {p.duration}
                    </div>
                  </div>

                  <CardTitle className='font-heading text-xl font-extrabold'>
                    {p.title}
                  </CardTitle>

                  <p className='text-sm text-muted-foreground'>{p.desc}</p>
                </CardHeader>

                <CardContent className='space-y-5'>
                  <ul className='space-y-2 text-sm'>
                    {p.highlights.map((h) => (
                      <li key={h} className='flex gap-2'>
                        <CheckCircle2 className='mt-0.5 h-4 w-4 text-primary' />
                        <span className='text-foreground/85'>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className='flex gap-3 flex-wrap'>
                    <Button asChild className='w-full'>
                      <Link href='/#kontak'>Tanya Paket</Link>
                    </Button>
                    <Button asChild variant='outline' className='w-full'>
                      <Link href={`/pelatihan/${p.id}`}>Detail</Link>
                    </Button>
                  </div>

                  <p className='text-xs text-muted-foreground'>
                    *Halaman detail bisa kita buat setelah struktur paket final.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
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
                {BENEFITS.map((b) => (
                  <li key={b} className='flex gap-2'>
                    <CheckCircle2 className='mt-0.5 h-4 w-4 text-accent' />
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
                Untuk in-house training, kita bisa susun modul sesuai kebutuhan.
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

              <p className='text-xs text-muted-foreground'>
                *Konten masih dummy. Nanti kita isi sesuai materi asli dari
                client.
              </p>
            </CardContent>
          </Card>
        </section>
      </Container>
    </main>
  )
}
