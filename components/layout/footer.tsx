import Link from 'next/link'
import Container from '@/components/common/container'
import { Instagram, Linkedin, Youtube, Globe, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const SOCIALS = [
  { label: 'Website', href: 'https://imtc.co.id', icon: Globe },
  { label: 'Instagram', href: 'https://instagram.com/imtc', icon: Instagram },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/imtc',
    icon: Linkedin
  },
  { label: 'YouTube', href: 'https://youtube.com/@imtc', icon: Youtube }
] as const

const NAV = [
  { label: 'Tentang', href: '/#tentang' },
  { label: 'Pelatihan', href: '/pelatihan' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Kontak', href: '/#kontak' }
] as const

export default function Footer() {
  return (
    <footer className='relative overflow-hidden border-t bg-background'>
      {/* subtle background texture */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl' />
        <div className='absolute -right-24 top-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl' />
        <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent' />
      </div>

      <Container className='grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12'>
        {/* Brand */}
        <div className='space-y-4 lg:col-span-4'>
          <div className='flex items-center gap-3'>
            <div className='grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 shadow-sm'>
              <Image
                src='/images/imtc-icon.webp'
                alt='IMTC'
                width={22}
                height={22}
                priority
                className='object-contain'
              />
            </div>

            <div className='space-y-0.5'>
              <div className='font-heading text-base font-extrabold leading-none'>
                IMTC
              </div>
              <div className='text-xs text-muted-foreground'>
                Indonesia MICE Training Center
              </div>
            </div>
          </div>

          <p className='max-w-sm text-sm leading-relaxed text-muted-foreground'>
            Pelatihan berbasis kompetensi untuk industri MICE & event — relevan,
            praktis, dan terukur untuk kebutuhan institusi.
          </p>

          <div className='flex flex-wrap items-center gap-2'>
            <span className='rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground'>
              Online
            </span>
            <span className='rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground'>
              Offline
            </span>
            <span className='rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground'>
              In-house
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className='space-y-3 lg:col-span-2'>
          <div className='font-heading text-sm font-extrabold'>Navigasi</div>
          <ul className='space-y-2 text-sm'>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className='group inline-flex items-center gap-2 text-foreground/70 transition hover:text-foreground'
                >
                  <span className='h-1.5 w-1.5 rounded-full bg-border transition group-hover:bg-primary' />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className='space-y-3 lg:col-span-3'>
          <div className='font-heading text-sm font-extrabold'>Kontak</div>

          <div className='rounded-2xl border bg-card p-4 text-sm'>
            <div className='space-y-3'>
              <div>
                <div className='text-xs text-muted-foreground'>Email</div>
                <a
                  href='mailto:info@imtc.co.id'
                  className='font-mono text-sm text-foreground hover:underline'
                >
                  info@imtc.co.id
                </a>
              </div>

              <div>
                <div className='text-xs text-muted-foreground'>WhatsApp</div>
                <a
                  href='https://wa.me/62xxxxxxxxxx'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-mono text-sm text-foreground hover:underline'
                >
                  +62 xxx-xxxx-xxxx
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className='space-y-3 lg:col-span-3'>
          <div className='font-heading text-sm font-extrabold'>Ikuti Kami</div>

          <div className='flex flex-wrap items-center gap-3'>
            {SOCIALS.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={item.label}
                  className='group inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-card text-foreground/70 shadow-sm transition hover:-translate-y-0.5 hover:text-foreground hover:shadow-md'
                >
                  <Icon className='h-4 w-4 transition-transform group-hover:scale-110' />
                </Link>
              )
            })}
          </div>

          <p className='text-xs text-muted-foreground'>
            Info kegiatan, pelatihan, dan update terbaru IMTC.
          </p>

          <Link
            href='/pelatihan'
            className='inline-flex items-center gap-2 text-sm text-foreground/80 transition hover:text-foreground'
          >
            Lihat program pelatihan
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </div>

        {/* Note */}
        <div className='space-y-3 lg:col-span-12'>
          <div className='rounded-2xl border bg-card p-4'>
            <div className='font-heading text-sm font-extrabold'>Catatan</div>
            <p className='mt-2 text-sm text-muted-foreground'>
              Program pelatihan tersedia untuk publik maupun in-house training.
              Materi dapat disesuaikan dengan kebutuhan institusi.
            </p>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className='border-t bg-background/60'>
        <Container className='flex flex-col gap-3 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
          <div>© {new Date().getFullYear()} Indonesia MICE Training Center</div>

          <div className='flex flex-wrap gap-4'>
            <Link href='#' className='hover:text-foreground'>
              Kebijakan Privasi
            </Link>
            <Link href='#' className='hover:text-foreground'>
              Syarat & Ketentuan
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
