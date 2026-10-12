import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (optional)',
      type: 'string'
    }),

    // Photos behind the homepage hero slideshow. Left empty, the site keeps
    // using the photos bundled in public/images/hero/, so clearing this
    // list can never blank the hero.
    defineField({
      name: 'heroImages',
      title: 'Foto Hero Beranda',
      type: 'array',
      description:
        'Foto slideshow di beranda. Urutan diacak setiap kunjungan. Kosongkan untuk memakai foto bawaan.',
      options: { layout: 'grid' },
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Keterangan Foto (Alt Text)',
              type: 'string',
              description:
                'Deskripsi singkat isi foto. Dibaca pembaca layar dan mesin pencari, tidak tampil di halaman.'
            })
          ]
        }
      ]
    }),

    defineField({
      name: 'heroStats',
      title: 'Hero Stats',
      type: 'array',
      of: [{ type: 'heroStat' }],
      validation: (Rule) => Rule.max(6)
    })
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Site Settings' }
    }
  }
})
