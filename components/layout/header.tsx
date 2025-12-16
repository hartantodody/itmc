'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Tentang', href: '/#tentang', hash: 'tentang' },
  { label: 'Pelatihan', href: '/pelatihan' },
  { label: 'Klien', href: '/#klien', hash: 'klien' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Kontak', href: '/#kontak', hash: 'kontak' }
] as const

const SECTION_IDS = ['tentang', 'klien', 'kontak'] as const

export default function Header() {
  const pathname = usePathname()

  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState<string>('')

  const isHome = pathname === '/'

  // shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // scrollspy for home sections
  useEffect(() => {
    if (!isHome) {
      setActiveHash('')
      return
    }

    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[]

    if (els.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        // pick the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0]

        if (visible?.target?.id) setActiveHash(visible.target.id)
      },
      {
        root: null,
        // tweak for header height; this makes "active" feel right
        rootMargin: '-30% 0px -60% 0px',
        threshold: [0.1, 0.2, 0.35, 0.5, 0.7]
      }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [isHome])

  const getIsActive = (href: string, hash?: string) => {
    // full pages
    if (href === '/pelatihan') return pathname === '/pelatihan'
    if (href === '/galeri') return pathname === '/galeri'

    // section links only meaningful on home
    if (!isHome || !hash) return false
    return activeHash === hash
  }

  const navLinkClass = useMemo(
    () =>
      'relative text-sm font-medium text-foreground/70 transition-colors hover:text-foreground ' +
      'after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full ' +
      'after:bg-primary after:transition-all after:duration-300 after:ease-out ' +
      'hover:after:w-full',
    []
  )

  const navLinkActiveClass = 'text-foreground after:w-full after:bg-primary'

  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        // glass shell
        'border-b border-white/10 bg-background/55 backdrop-blur-xl',
        // subtle gradient tint like "hostinger-ish"
        'supports-backdrop-filter:bg-background/40',
        scrolled ? 'shadow-[0_10px_30px_-18px_rgba(0,0,0,0.75)]' : 'shadow-none'
      )}
    >
      {/* brand glow layer */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute -top-10 left-1/4 h-20 w-72 rounded-full bg-primary/15 blur-2xl' />
        <div className='absolute -top-12 right-1/4 h-20 w-72 rounded-full bg-accent/12 blur-2xl' />
      </div>

      <Container className='flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          {/* ✅ Replace IM box with swirl icon */}
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

          <div className='leading-tight'>
            <div className='font-heading text-base font-extrabold tracking-tight text-foreground'>
              IMTC
            </div>
            <div className='text-xs text-muted-foreground'>
              Indonesia MICE Training Center
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className='hidden items-center gap-6 md:flex'>
          {NAV.map((item) => {
            const active = getIsActive(item.href, (item as any).hash)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(navLinkClass, active && navLinkActiveClass)}
              >
                {item.label}
              </Link>
            )
          })}

          <Button asChild size='sm' className='shadow-sm'>
            <Link href='/#kontak'>Hubungi</Link>
          </Button>
        </nav>

        {/* Mobile button */}
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'
          aria-label='Toggle menu'
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className='size-5' /> : <Menu className='size-5' />}
        </Button>
      </Container>

      {/* Mobile menu */}
      {open ? (
        <div className='border-t border-white/10 md:hidden'>
          <Container className='py-4'>
            <div className='flex flex-col gap-2'>
              {NAV.map((item) => {
                const active = getIsActive(item.href, (item as any).hash)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-xl px-3 py-2 text-sm font-medium transition',
                      active
                        ? 'bg-primary/15 text-foreground'
                        : 'text-foreground/75 hover:bg-white/5 hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}

              <Button asChild className='mt-2' onClick={() => setOpen(false)}>
                <Link href='/#kontak'>Hubungi</Link>
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
