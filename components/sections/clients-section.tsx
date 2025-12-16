import React from 'react'
import Container from '../common/container'

const CLIENTS = [
  'Client A',
  'Client B',
  'Client C',
  'Client D',
  'Client E',
  'Client F',
  'Client G',
  'Client H'
] as const

export default function ClientsSection() {
  return (
    <section
      id='klien'
      className='relative isolate overflow-hidden py-16 sm:py-20 text-black'
    >
      <Container className='space-y-10'>
        {/* centered header */}
        <div className='mx-auto max-w-3xl space-y-4 text-center'>
          <div className='inline-flex items-center rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs  backdrop-blur'>
            Partner & kolaborasi
          </div>

          <h2 className='font-bold text-3xl tracking-tight sm:text-5xl'>
            <span className='text-accent'>Klien</span> & Partner
          </h2>

          <p className='mx-auto max-w-2xl text-sm sm:text-base'>
            Beberapa institusi yang pernah bekerja sama (dummy placeholder).
          </p>
        </div>

        {/* infinite carousel strip */}
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 w-20  z-10' />
          <div className='pointer-events-none absolute inset-y-0 right-0 w-20  z-10' />

          <div className='overflow-hidden'>
            <div
              className='flex gap-3 animate-scroll'
              style={{
                width: 'max-content'
              }}
            >
              {/* First set */}
              {CLIENTS.map((name, i) => (
                <div
                  key={`first-${i}`}
                  className='min-w-[170px] sm:min-w-[200px] flex h-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-white/12 hover:shadow-md'
                >
                  <span className='font-mono text-xs'>{name}</span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {CLIENTS.map((name, i) => (
                <div
                  key={`second-${i}`}
                  className='min-w-[170px] sm:min-w-[200px] flex h-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-white/12 hover:shadow-md'
                >
                  <span className='font-mono text-xs'>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
