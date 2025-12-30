import { defineField, defineType } from 'sanity'

export const galleryItemType = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string'
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'Misal: 2024 atau "2024/2025"'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required()
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0
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
