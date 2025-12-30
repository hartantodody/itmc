import { defineField, defineType } from 'sanity'

export const trainingPackageType = defineType({
  name: 'trainingPackage',
  title: 'Training Package',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
    defineField({
      name: 'desc',
      title: 'Short Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'durationText',
      title: 'Duration (text)',
      type: 'string',
      description: 'Contoh: "3 hari" / "1–2 hari"'
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { title: 'Online', value: 'Online' },
          { title: 'Offline', value: 'Offline' },
          { title: 'Hybrid', value: 'Hybrid' }
        ]
      },
      initialValue: 'Offline'
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Basic', value: 'Basic' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' }
        ]
      },
      initialValue: 'Basic'
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'recommended',
      title: 'Recommended',
      type: 'boolean',
      initialValue: false
    }),

    defineField({
      name: 'maxParticipants',
      title: 'Max Participants',
      type: 'number',
      description: 'Contoh: 30'
    }),
    defineField({
      name: 'timeText',
      title: 'Time (text)',
      type: 'string',
      description: 'Contoh: "09.00 WIB – selesai (tentative)"'
    }),

    defineField({
      name: 'included',
      title: 'Included',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'excluded',
      title: 'Excluded',
      type: 'array',
      of: [{ type: 'string' }]
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
