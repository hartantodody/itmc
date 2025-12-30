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
