import { IMTC_CONTACT } from '@/data/contact.data'

export type ContactIntent =
  | 'general'
  | 'ask-recommendation'
  | 'request-quotation'
  | 'in-house'
  | 'certification'
  | 'schedule-call'

export type ContactMessagePayload = {
  name?: string
  org?: string
  role?: string
  phoneOrEmail?: string
  city?: string
  preferredFormat?: 'Online' | 'Offline' | 'Hybrid'
  targetProgram?: 'Event Management' | 'LO & Registration' | 'Custom' | string
  participants?: number
  dateRange?: string
  venue?: string
  notes?: string
}

const line = (label: string, value?: string | number) =>
  value === undefined || value === null || value === ''
    ? ''
    : `${label}: ${value}`

const compactLines = (lines: string[]) => lines.filter(Boolean).join('\n')

export function buildContactMessage(
  intent: ContactIntent,
  payload: ContactMessagePayload = {}
) {
  const opener = payload.name
    ? `Halo IMTC, saya ${payload.name}.`
    : `Halo IMTC.`

  const common = compactLines([
    '',
    line('Instansi/Perusahaan', payload.org),
    line('Peran', payload.role),
    line('Kontak saya', payload.phoneOrEmail),
    line('Kota', payload.city),
    line('Preferensi format', payload.preferredFormat),
    line('Jumlah peserta', payload.participants),
    line('Perkiraan waktu', payload.dateRange),
    line('Lokasi/Venue', payload.venue),
    payload.notes ? `Catatan: ${payload.notes}` : ''
  ])

  switch (intent) {
    case 'general':
      return compactLines([
        opener,
        '',
        'Saya ingin bertanya terkait program pelatihan MICE & event di IMTC.',
        common,
        '',
        'Mohon info langkah berikutnya (opsi jadwal, format, dan mekanisme). Terima kasih.'
      ])

    case 'ask-recommendation':
      return compactLines([
        opener,
        '',
        'Saya butuh rekomendasi program pelatihan yang paling cocok untuk kebutuhan tim kami.',
        line('Target program', payload.targetProgram),
        common,
        '',
        'Boleh dibantu rekomendasikan paket + outline singkat materi? Terima kasih.'
      ])

    case 'request-quotation':
      return compactLines([
        opener,
        '',
        'Saya ingin meminta penawaran (quotation) untuk pelatihan bidang MICE.',
        line('Program yang diminati', payload.targetProgram),
        common,
        '',
        'Mohon kirimkan estimasi biaya, durasi, dan kebutuhan teknis pelaksanaan. Terima kasih.'
      ])

    case 'in-house':
      return compactLines([
        opener,
        '',
        'Kami tertarik untuk in-house training (custom program) untuk tim internal.',
        line('Fokus/Topik', payload.targetProgram),
        common,
        '',
        'Mohon info opsi penyusunan modul, timeline, dan requirement pelaksanaan. Terima kasih.'
      ])

    case 'certification':
      return compactLines([
        opener,
        '',
        'Kami ingin info program pelatihan yang dapat diarahkan menuju sertifikasi kompetensi (opsional).',
        line('Cluster yang diminati', payload.targetProgram),
        common,
        '',
        'Mohon info alur pelatihan + opsi uji kompetensi (jika tersedia). Terima kasih.'
      ])

    case 'schedule-call':
      return compactLines([
        opener,
        '',
        'Apakah bisa dijadwalkan call singkat untuk konsultasi kebutuhan pelatihan?',
        common,
        '',
        'Mohon rekomendasi slot waktu. Terima kasih.'
      ])

    default:
      return buildContactMessage('general', payload)
  }
}

export function buildWhatsAppUrl(message: string) {
  const base = `https://wa.me/${IMTC_CONTACT.whatsapp.e164}`
  const text = encodeURIComponent(message)
  return `${base}?text=${text}`
}
