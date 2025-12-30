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

// ✅ Section yang background-nya gelap
const DARK_SECTION_IDS = ['hero', 'program', 'kontak'] as const

export default function Header() {
  const pathname = usePathname()

  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // scrollspy active section (untuk underline nav)
  const [activeHash, setActiveHash] = useState<string>('')

  // ✅ apakah sekarang sedang di area background gelap?
  const [onDark, setOnDark] = useState(false)

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

  // scrollspy + dark-section detector (home only)
  useEffect(() => {
    if (!isHome) {
      setActiveHash('')
      setOnDark(false)
      return
    }

    const sectionEls = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[]

    const darkEls = DARK_SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[]

    // jika belum ada elementnya (misal belum kebaca), stop
    if (sectionEls.length === 0 && darkEls.length === 0) return

    // 1) observer untuk active section (tentang/klien/kontak)
    const sectionObs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0]

        if (visible?.target?.id) setActiveHash(visible.target.id)
      },
      {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: [0.1, 0.2, 0.35, 0.5, 0.7]
      }
    )

    sectionEls.forEach((el) => sectionObs.observe(el))

    // 2) observer untuk “onDark”
    const darkObs = new IntersectionObserver(
      (entries) => {
        // kalau salah satu dark section “cukup masuk”, set onDark true
        const anyDarkVisible = entries.some(
          (e) => e.isIntersecting && (e.intersectionRatio ?? 0) > 0.08
        )
        setOnDark(anyDarkVisible)
      },
      {
        root: null,
        // bikin trigger “lebih cepat” begitu masuk area hero/program/kontak
        rootMargin: '-10% 0px -70% 0px',
        threshold: [0, 0.05, 0.1, 0.2]
      }
    )

    darkEls.forEach((el) => darkObs.observe(el))

    return () => {
      sectionObs.disconnect()
      darkObs.disconnect()
    }
  }, [isHome])

  const getIsActive = (href: string, hash?: string) => {
    // full pages
    if (href === '/pelatihan') return pathname === '/pelatihan'
    if (href === '/galeri') return pathname === '/galeri'

    // section links only meaningful on home
    if (!isHome || !hash) return false
    return activeHash === hash
  }

  const navLinkBase = useMemo(
    () =>
      'relative text-sm font-medium transition-colors ' +
      'after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full ' +
      'after:transition-all after:duration-300 after:ease-out hover:after:w-full',
    []
  )

  // theme classes (auto)
  const shellClass = cn(
    'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
    // HOME + belum scroll → transparan (numpuk hero)
    isHome && !scrolled
      ? 'border-transparent bg-transparent text-white'
      : onDark
        ? cn(
            'border-b border-white/10 bg-black/25 text-white backdrop-blur-xl',
            'supports-backdrop-filter:bg-black/20'
          )
        : cn(
            'border-b border-white/10 bg-background/55 text-foreground backdrop-blur-xl',
            'supports-backdrop-filter:bg-background/40'
          ),
    scrolled ? 'shadow-[0_10px_30px_-18px_rgba(0,0,0,0.75)]' : 'shadow-none'
  )

  const navLinkClass = (active: boolean) =>
    cn(
      navLinkBase,
      onDark
        ? 'text-white/80 hover:text-white after:bg-white/80'
        : 'text-foreground/70 hover:text-foreground after:bg-primary',
      active &&
        (onDark
          ? 'text-white after:w-full after:bg-white'
          : 'text-foreground after:w-full after:bg-primary')
    )

  return (
    <header className={shellClass}>
      {/* brand glow layer */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div
          className={cn(
            'absolute -top-10 left-1/4 h-20 w-72 rounded-full blur-2xl',
            onDark ? 'bg-white/10' : 'bg-primary/15'
          )}
        />
        <div
          className={cn(
            'absolute -top-12 right-1/4 h-20 w-72 rounded-full blur-2xl',
            onDark ? 'bg-white/8' : 'bg-accent/12'
          )}
        />
      </div>

      <Container className='flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <div
            className={cn(
              'grid size-9 place-items-center rounded-xl border shadow-sm',
              onDark
                ? 'border-white/15 bg-white/90'
                : 'border-white/10 bg-white/5'
            )}
          >
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
            <div
              className={cn(
                'font-heading text-base font-extrabold tracking-tight',
                onDark ? 'text-white' : 'text-foreground'
              )}
            >
              IMTC
            </div>
            <div
              className={cn(
                'text-xs',
                onDark ? 'text-white/70' : 'text-muted-foreground'
              )}
            >
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
                className={navLinkClass(active)}
              >
                {item.label}
              </Link>
            )
          })}

          <Button
            asChild
            size='sm'
            className={cn(
              'shadow-sm',
              onDark && 'bg-white text-black hover:bg-white/90'
            )}
            variant={onDark ? 'default' : 'default'}
          >
            <Link href='/#kontak'>Hubungi</Link>
          </Button>
        </nav>

        {/* Mobile button */}
        <Button
          variant='ghost'
          size='icon'
          className={cn(
            'md:hidden',
            onDark ? 'text-white hover:bg-white/10' : ''
          )}
          aria-label='Toggle menu'
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className='size-5' /> : <Menu className='size-5' />}
        </Button>
      </Container>

      {/* Mobile menu */}
      {open ? (
        <div
          className={cn(
            'border-t md:hidden',
            onDark ? 'border-white/10' : 'border-white/10'
          )}
        >
          <div
            className={cn(
              // mobile panel background biar kebaca juga
              onDark
                ? 'bg-black/30 backdrop-blur-xl'
                : 'bg-background/60 backdrop-blur-xl'
            )}
          >
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
                        onDark
                          ? active
                            ? 'bg-white/12 text-white'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                          : active
                            ? 'bg-primary/15 text-foreground'
                            : 'text-foreground/75 hover:bg-white/5 hover:text-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}

                <Button
                  asChild
                  className={cn(
                    'mt-2',
                    onDark && 'bg-white text-black hover:bg-white/90'
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Link href='/#kontak'>Hubungi</Link>
                </Button>
              </div>
            </Container>
          </div>
        </div>
      ) : null}
    </header>
  )
}
