'use client'

import React, { useMemo, useState } from 'react'
import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

import { IMTC_CONTACT } from '@/data/contact.data'
import {
  buildContactMessage,
  buildWhatsAppUrl,
  type ContactIntent
} from '@/lib/contact-templates'

export default function ContactSection() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [notes, setNotes] = useState('')
  const [intent, setIntent] = useState<ContactIntent>('ask-recommendation')

  const message = useMemo(() => {
    return buildContactMessage(intent, {
      name,
      phoneOrEmail: contact,
      targetProgram: 'Custom', // nanti kalau kamu punya paket list, isi dari dropdown paket
      notes
    })
  }, [intent, name, contact, notes])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const url = buildWhatsAppUrl(message)
    window.open(url, '_blank', 'noopener,noreferrer')

    toast.success('Membuka WhatsApp untuk mengirim pesan…')
  }

  return (
    <section
      id='kontak'
      className='relative isolate overflow-hidden py-16 sm:py-20 bg-imtc-plan text-primary-foreground'
    >
      <div className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30' />
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
                <a
                  href={IMTC_CONTACT.email.mailto}
                  className='font-mono text-sm text-white hover:underline'
                >
                  {IMTC_CONTACT.email.address}
                </a>
              </div>

              <div className='space-y-1'>
                <div className='text-xs text-primary-foreground/70'>
                  WhatsApp
                </div>
                <a
                  href={`https://wa.me/${IMTC_CONTACT.whatsapp.e164}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-mono text-sm text-white hover:underline'
                >
                  {IMTC_CONTACT.whatsapp.display}
                </a>
                {IMTC_CONTACT.whatsapp.picName ? (
                  <div className='text-xs text-primary-foreground/70'>
                    a.n {IMTC_CONTACT.whatsapp.picName}
                  </div>
                ) : null}
              </div>
            </div>

            <div className='mt-4 grid gap-4 sm:grid-cols-2'>
              <div className='space-y-1'>
                <div className='text-xs text-primary-foreground/70'>
                  Instagram
                </div>
                <a
                  href={IMTC_CONTACT.instagram.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-mono text-sm text-white hover:underline'
                >
                  @{IMTC_CONTACT.instagram.handle}
                </a>
              </div>

              <div className='space-y-1'>
                <div className='text-xs text-primary-foreground/70'>
                  {IMTC_CONTACT.address.label}
                </div>
                <div className='text-sm text-white/90'>
                  {IMTC_CONTACT.address.lines.map((t) => (
                    <div key={t}>{t}</div>
                  ))}
                </div>
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
            {/* (optional) intent switch sederhana */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-white'>
                Tujuan pesan
              </label>
              <select
                value={intent}
                onChange={(e) => setIntent(e.target.value as ContactIntent)}
                className='h-10 w-full rounded-md border border-white/15 bg-white/10 px-3 text-sm text-white outline-none'
              >
                <option value='ask-recommendation'>
                  Minta rekomendasi paket
                </option>
                <option value='request-quotation'>
                  Minta penawaran (quotation)
                </option>
                <option value='in-house'>In-house training (custom)</option>
                <option value='certification'>
                  Info sertifikasi (opsional)
                </option>
                <option value='schedule-call'>Jadwalkan call</option>
                <option value='general'>Pertanyaan umum</option>
              </select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-white'>Nama</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nama kamu'
                className='border-white/15 bg-white/10 text-white placeholder:text-white/60'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-white'>
                Email / WhatsApp
              </label>
              <Input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder='contoh: email@domain.com / 08xxxx'
                className='border-white/15 bg-white/10 text-white placeholder:text-white/60'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-white'>
                Kebutuhan
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder='Ceritakan kebutuhan pelatihan...'
                rows={5}
                className='border-white/15 bg-white/10 text-white placeholder:text-white/60'
              />
            </div>

            <Button
              type='submit'
              className='w-full bg-white text-black hover:bg-white/90'
            >
              Kirim via WhatsApp
            </Button>

            <p className='text-xs text-primary-foreground/70'>
              Pesan akan dibuat otomatis dan dibuka di WhatsApp (bisa diedit
              sebelum kirim).
            </p>
          </div>
        </form>
      </Container>
    </section>
  )
}
