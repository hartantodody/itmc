// sanity/schemaTypes/galleryAlbumType.ts
import { defineField, defineType } from 'sanity'

export const galleryAlbumType = defineType({
  name: 'galleryAlbum',
  title: 'Gallery Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
      validation: (r) => r.required()
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
              description: 'Disarankan untuk aksesibilitas & SEO',
              validation: (r) => r.warning('Sebaiknya diisi untuk SEO.')
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Opsional'
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
