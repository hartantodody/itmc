'use client'

import Image from 'next/image'
import React from 'react'
import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(
      'Pesan terkirim (dummy). Nanti bisa disambung ke WhatsApp / email.'
    )
  }

  return (
    <section
      id='kontak'
      className='relative isolate overflow-hidden py-16 sm:py-20 bg-imtc-plan text-primary-foreground'
    >
      {/* BACKGROUND LAYERS */}
      <div className='pointer-events-none absolute inset-0 -z-10'>
        {/* watermark icon (quarter visible) */}

        {/* soft vignette biar teks kebaca */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30' />

        {/* optional: diagonal darker side (lebih halus, jangan 50%) */}
        <div className='absolute right-0 top-0 h-full w-[42%] bg-black/20 [clip-path:polygon(25%_0,100%_0,100%_100%,0_100%)]' />
      </div>

      <Container className='grid gap-10 lg:grid-cols-2 lg:gap-12'>
        {/* Left copy */}
        <div className='space-y-5'>
          <h2 className='font-heading text-4xl font-extrabold tracking-tight sm:text-5xl'>
            Bingung pilih <span className='text-accent'>paket pelatihan?</span>
          </h2>

          <p className='max-w-xl text-sm text-primary-foreground/85 sm:text-base'>
            Ceritakan kebutuhanmu — tim IMTC siap bantu rekomendasikan program
            paling cocok untuk institusi / tim kamu.
          </p>

          <div className='max-w-xl rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur'>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-1'>
                <div className='text-xs text-primary-foreground/70'>Email</div>
                <div className='font-mono text-sm text-white'>
                  info@imtc.co.id
                </div>
              </div>

              <div className='space-y-1'>
                <div className='text-xs text-primary-foreground/70'>
                  WhatsApp
                </div>
                <div className='font-mono text-sm text-white'>
                  +62 xxx-xxxx-xxxx
                </div>
              </div>
            </div>

            <div className='mt-4 space-y-1'>
              <div className='text-xs text-primary-foreground/70'>Lokasi</div>
              <div className='text-sm text-white/90'>
                Indonesia (detail menyusul)
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <form
          onSubmit={handleSubmit}
          className='rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur sm:p-7'
        >
          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-white'>Nama</label>
              <Input
                placeholder='Nama kamu'
                className='border-white/15 bg-white/10 text-white placeholder:text-white/60'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-white'>
                Email / WhatsApp
              </label>
              <Input
                placeholder='contoh: email@domain.com / 08xxxx'
                className='border-white/15 bg-white/10 text-white placeholder:text-white/60'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-white'>
                Kebutuhan
              </label>
              <Textarea
                placeholder='Ceritakan kebutuhan pelatihan...'
                rows={5}
                className='border-white/15 bg-white/10 text-white placeholder:text-white/60'
              />
            </div>

            <Button
              type='submit'
              className='w-full bg-white text-black hover:bg-white/90'
            >
              Kirim
            </Button>

            <p className='text-xs text-primary-foreground/70'>
              *Form ini dummy. Nanti bisa dihubungkan ke WhatsApp / email / API.
            </p>
          </div>
        </form>
      </Container>
    </section>
  )
}
