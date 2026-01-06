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
