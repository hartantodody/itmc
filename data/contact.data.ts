// src/data/contact.data.ts
export type ContactLink = {
  label: string
  href: string
}

export type ImtcContact = {
  brand: {
    short: string
    long: string
  }
  email: {
    address: string
    mailto: string
  }
  whatsapp: {
    // E.164 digits only for wa.me
    e164: string // e.g. "62817700343"
    display: string // e.g. "+62 817-700-343"
    picName?: string // optional: "Andita Pusparani"
  }
  instagram: {
    handle: string // without @
    url: string
  }
  address: {
    label: string
    lines: string[]
  }
  socials: ContactLink[]
}

export const IMTC_CONTACT: ImtcContact = {
  brand: {
    short: 'IMTC',
    long: 'Indonesia MICE Training Center'
  },
  email: {
    address: 'micetrainingcenter@gmail.com',
    mailto: 'mailto:micetrainingcenter@gmail.com'
  },
  whatsapp: {
    e164: '62817700343',
    display: '+62 817-700-343',
    picName: 'Andita Pusparani'
  },
  instagram: {
    handle: 'indonesiamicetrainingcenter',
    url: 'https://instagram.com/indonesiamicetrainingcenter'
  },
  address: {
    label: 'Kantor',
    lines: [
      'Gedung Permata Cikini, Lt 2 R.206',
      'Jalan Pegangsaan Timur No. 7, Cikini',
      'Jakarta Pusat 10440'
    ]
  },
  socials: [
    {
      label: 'Instagram',
      href: 'https://instagram.com/indonesiamicetrainingcenter'
    }
    // nanti kalau website/linkedin/youtube sudah resmi tinggal tambah di sini
  ]
}
