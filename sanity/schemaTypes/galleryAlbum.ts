import { defineField, defineType } from 'sanity'

export const galleryAlbumType = defineType({
  name: 'galleryAlbum',
  title: 'Gallery Activity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Activity Title',
      type: 'string',
      validation: (r) => r.required()
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required()
    }),

    // Album-level, not per photo — each image already carries its own
    // caption. Plain text by decision: a sentence or two is what the card
    // and the page's meta description can actually use.
    defineField({
      name: 'description',
      title: 'Deskripsi Album',
      type: 'text',
      rows: 3,
      description:
        'Ringkasan singkat kegiatan, 1–2 kalimat. Tampil di kartu galeri dan di bawah judul halaman album.',
      validation: (r) =>
        r.max(300).warning('Sebaiknya singkat — kartu galeri hanya menampilkan 2 baris.')
    }),

    defineField({ name: 'category', title: 'Category', type: 'string' }),

    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'Misal: 2024 atau "2024/2025"'
    }),

    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image (optional)',
      type: 'image',
      options: { hotspot: true }
    }),

    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (r) => r.warning('Sebaiknya diisi untuk SEO.')
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string'
            })
          ]
        }
      ]
    })
  ],
  orderings: [
    {
      title: 'Order, asc',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})
