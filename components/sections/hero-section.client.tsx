'use client'

import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Award,
  Users,
  TrendingUp,
  LucideIcon,
  SquareCheckBig
} from 'lucide-react'
import { cn, safeImageUrl } from '@/lib/utils'
import { pickHeroSlideshowImages } from '@/lib/gallery'
import { HeroSlideshow } from '../common/hero-slideshow'

type StatCardProps = {
  icon: LucideIcon
  value: number
  label: string
  delayMs?: number
}

function StatCard({ icon: Icon, value, label }: StatCardProps) {
  const [count, setCount] = useState(value)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduce) return

    setCount(0)

    const duration = 1100
    const steps = 44
    const increment = value / steps
    let current = 0

    const timer = window.setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        window.clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => window.clearInterval(timer)
  }, [value])

  return (
    <div className='relative overflow-hidden rounded-2xl border border-white/12 bg-black/35 backdrop-blur-2xl p-3.5'>
      {/* scrim: bikin foto di belakang “mati” */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/45' />
      {/* highlight tipis biar tetap premium */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-white/8 to-transparent opacity-60' />

      <div className='relative flex items-center gap-3'>
        <div className='rounded-xl border border-white/15 bg-white/10 p-2'>
          <Icon className='h-5 w-5 text-white' />
        </div>

        <div className='leading-tight'>
          <div className='text-xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]'>
            {count}
            <span className='text-white/80'>+</span>
          </div>
          <div className='text-[11px] text-white/75 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]'>
            {label}
          </div>
        </div>
      </div>
    </div>
  )
}

type Particle = {
  size: number
  left: number
  top: number
  floatDuration: number
  floatDelay: number
  twinkleDuration: number
  twinkleDelay: number
  opacity: number
}

/** Deterministic seeded RNG (mulberry32) */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** convert useId() string -> stable numeric seed */
function hashStringToSeed(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function makeParticles(seedStr: string, count = 18): Particle[] {
  const rand = mulberry32(hashStringToSeed(seedStr))

  return Array.from({ length: count }).map(() => {
    const size = rand() * 3 + 2 // 2..5px
    const left = rand() * 100
    const top = rand() * 100
    const opacity = rand() * 0.16 + 0.06 // 0.06..0.22

    const floatDuration = rand() * 10 + 10 // 10..20s
    const floatDelay = rand() * 5 // 0..5s

    const twinkleDuration = rand() * 2.8 + 1.6 // 1.6..4.4s
    const twinkleDelay = rand() * 3.5 // 0..3.5s

    return {
      size,
      left,
      top,
      opacity,
      floatDuration,
      floatDelay,
      twinkleDuration,
      twinkleDelay
    }
  })
}

export default function HeroSection({ albums }: { albums: any[] }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  // ✅ stable seed, same on server + client -> NO hydration mismatch
  const seedId = useId()

  const particles = useMemo(() => makeParticles(seedId, 18), [seedId])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (rafRef.current) return

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        setMouse({
          x: (e.clientX / window.innerWidth - 0.5) * 18,
          y: (e.clientY / window.innerHeight - 0.5) * 18
        })
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const STATS = [
    { icon: Users, value: 1500, label: 'Peserta Terlatih' },
    { icon: Award, value: 40, label: 'Program Pelatihan' },
    { icon: TrendingUp, value: 20, label: 'Institusi & Mitra' }
  ] as const

  const slideshowImages = useMemo(() => {
    return pickHeroSlideshowImages(albums ?? [], 6)
  }, [albums])

  return (
    <section
      id='hero'
      className='relative flex items-center overflow-hidden py-16 sm:py-24 bg-imtc-horizon'
    >
      {/* background layers */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        {/* subtle parallax glows */}
        <div
          className='absolute -top-52 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl transition-transform duration-700 ease-out'
          style={{
            transform: `translate(calc(-50% + ${mouse.x}px), ${mouse.y}px)`
          }}
        />
        <div
          className='absolute -bottom-56 right-[-18%] h-[520px] w-[980px] rounded-full blur-3xl transition-transform duration-700 ease-out'
          style={{
            transform: `translate(${mouse.x * 0.5}px, ${mouse.y * 0.5}px)`,
            background:
              'radial-gradient(circle at 30% 30%, rgba(245,124,0,0.20), transparent 60%)'
          }}
        />

        {/* grid texture */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_85%_55%_at_50%_45%,#000,transparent)]' />

        {/* particles (float + twinkle) */}
        <div className='absolute inset-0' aria-hidden='true'>
          {particles.map((p, i) => (
            <div
              key={i}
              className='absolute rounded-full bg-white imtc-anim-float imtc-anim-twinkle'
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                opacity: p.opacity,
                animationDuration: `${p.floatDuration}s, ${p.twinkleDuration}s`,
                animationDelay: `${p.floatDelay}s, ${p.twinkleDelay}s`
              }}
            />
          ))}
        </div>

        {/* top/bottom vignette */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35' />

        {/* subtle moving beam */}
        <div className='absolute -left-1/2 top-[55%] h-40 w-[200%] rotate-[-8deg] opacity-30'>
          <div className='h-full w-full imtc-anim-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent' />
        </div>
      </div>

      <Container className='grid items-center gap-10 lg:grid-cols-2'>
        {/* left */}
        <div className='space-y-6'>
          <div className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 shadow-lg backdrop-blur-xl imtc-anim-fade-in-up'>
            <span className='font-mono font-semibold'>IMTC</span>
            <span className='text-white/50'>•</span>
            <span>Training & Development for MICE Industry</span>
          </div>

          {/* <h1 className='font-heading font-extrabold tracking-tight text-white'>
            <span className='mb-2 block text-4xl sm:text-5xl lg:text-6xl imtc-anim-slide-in-left'>
              <span>IND</span>
              <span className='inline-flex translate-y-[4px]'>
                <Image
                  src='/images/imtc-icon.webp'
                  alt=''
                  aria-hidden='true'
                  width={56}
                  height={56}
                  priority
                  className='h-[1em] w-[1em] object-contain'
                />
              </span>
              <span>NESIA</span>
            </span>

            <span
              className='block text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent imtc-anim-slide-in-left'
              style={{ animationDelay: '120ms' }}
            >
              MICE
            </span>

            <span
              className='block text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent imtc-anim-slide-in-left'
              style={{ animationDelay: '220ms' }}
            >
              Training Center
            </span>
          </h1> */}

          <h1 className='sr-only'>INDONESIA MICE TRAINING CENTER</h1>

          <img
            src='/images/imtc-logo-square-white.svg'
            alt=''
            aria-hidden='true'
            className='max-w-[480px] w-full h-auto'
          />

          <p
            className='max-w-xl text-base leading-relaxed text-white/80 sm:text-lg imtc-anim-fade-in'
            style={{ animationDelay: '320ms' }}
          >
            Pelatihan berbasis kompetensi untuk industri MICE & event yang
            mengacu pada standar kerja (SKKNI). Membantu institusi, korporasi,
            dan tim operasional menjalankan event secara profesional, terukur,
            dan akuntabel—dari pra-event, hari-H, hingga evaluasi pasca
            kegiatan.
          </p>

          <div
            className='flex flex-col gap-3 sm:flex-row sm:items-center imtc-anim-fade-in'
            style={{ animationDelay: '420ms' }}
          >
            <Button asChild size='lg' className='shadow-lg'>
              <Link href='/pelatihan'>
                Lihat Program Pelatihan <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>

            <Button
              asChild
              size='lg'
              variant='outline'
              className='border-white/30 hover:text-white hover:bg-white/10'
            >
              <Link href='#kontak'>Konsultasi</Link>
            </Button>
          </div>

          <div
            className='flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70 imtc-anim-fade-in'
            style={{ animationDelay: '520ms' }}
          >
            <span className='flex gap-2 items-center'>
              <SquareCheckBig className='size-4' /> Berbasis SKKNI MICE
            </span>
            <span className='flex gap-2 items-center'>
              <SquareCheckBig className='size-4' /> Publik & In-house Training
            </span>
            <span className='flex gap-2 items-center'>
              <SquareCheckBig className='size-4' /> Opsi Sertifikasi Kompetensi
            </span>
          </div>
        </div>

        {/* right */}
        <div
          className='relative imtc-anim-fade-in-up'
          style={{ animationDelay: '160ms' }}
        >
          <div className='relative'>
            <div className='relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/18 bg-white/10 shadow-2xl backdrop-blur-xl'>
              <div className='absolute inset-0 imtc-anim-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent' />

              <HeroSlideshow images={slideshowImages} buildUrl={safeImageUrl} />
            </div>

            {/* stats: DESKTOP overlay */}
            <div className='absolute -bottom-5 left-4 right-4 hidden grid-cols-3 gap-2 lg:grid imtc-anim-fade-in'>
              {STATS.map((s, idx) => (
                <StatCard
                  key={s.label}
                  icon={s.icon}
                  value={s.value}
                  label={s.label}
                  delayMs={idx * 120}
                />
              ))}
            </div>
          </div>

          {/* stats: MOBILE (not overlay) */}
          <div className='mt-5 grid grid-cols-3 gap-2 px-1 sm:px-0 lg:hidden imtc-anim-fade-in'>
            {STATS.map((s, idx) => (
              <StatCard
                key={s.label}
                icon={s.icon}
                value={s.value}
                label={s.label}
                delayMs={idx * 120}
              />
            ))}
          </div>

          <div className={cn('hidden lg:block', 'h-6')} />
        </div>
      </Container>
    </section>
  )
}
