export const ABOUT_CONTENT = {
  badge: 'Tentang IMTC',
  title: 'Indonesia MICE Training Center',
  description:
    'IMTC berfokus pada pelatihan berbasis kompetensi untuk industri MICE & event. ' +
    'Program dirancang untuk membantu organisasi mengelola event secara profesional ' +
    'dan akuntabel—mulai dari perencanaan (pra-event), pelaksanaan (on-site), hingga ' +
    'monitoring & evaluasi (post-event). Metode pembelajaran interaktif dengan studi ' +
    'kasus dan diskusi, serta dapat diarahkan menuju sertifikasi kompetensi (opsional).',

  features: [
    {
      key: 'competency',
      title: 'Berbasis Kompetensi',
      desc: 'Mengacu pada standar kompetensi kerja nasional (SKKNI) bidang MICE',
      icon: 'GraduationCap'
    },
    {
      key: 'method',
      title: 'Metode Interaktif',
      desc: 'Diskusi kelompok, studi kasus, dan presentasi praktik',
      icon: 'Target'
    },
    {
      key: 'certification',
      title: 'Arah Sertifikasi',
      desc: 'Opsi uji kompetensi melalui LSP MICE (opsional)',
      icon: 'Sparkles'
    }
  ],

  timeline: [
    {
      key: 'pre',
      label: 'Pra-event',
      text: 'Perencanaan event: konsep kegiatan, kebutuhan sumber daya, dan persiapan teknis.'
    },
    {
      key: 'onsite',
      label: 'On-site',
      text: 'Pelaksanaan hari-H: koordinasi lapangan, alur peserta, dan kontrol operasional.'
    },
    {
      key: 'post',
      label: 'Post-event',
      text: 'Monitoring & evaluasi: laporan kegiatan, perbaikan proses, dan peningkatan standar kerja.'
    }
  ]
} as const
