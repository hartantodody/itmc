// /sanity/schemas/documents/announcement.ts
import { defineField, defineType } from 'sanity'
import { richTextWithLinks } from './fields/richTextWithLinks'

export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required().min(5)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required()
    }),

    // ✅ carousel images
    defineField({
      name: 'images',
      title: 'Images (carousel)',
      type: 'array',
      of: [{ type: 'announcementImage' }],
      validation: (r) => r.required().min(1)
    }),

    // ✅ rich description with links
    richTextWithLinks,

    // opsional: “excerpt” plain text buat listing/card
    defineField({
      name: 'excerpt',
      title: 'Excerpt (for cards)',
      type: 'text',
      rows: 3
    })
  ],
  orderings: [
    {
      title: 'Published (newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0.image',
      subtitle: 'publishedAt'
    }
  }
})
