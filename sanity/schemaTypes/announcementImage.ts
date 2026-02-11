// /sanity/schemas/objects/announcementImage.ts
import { defineField, defineType } from 'sanity'

export const announcementImage = defineType({
  name: 'announcementImage',
  title: 'Announcement Image',
  type: 'object',
  fields: [
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
      validation: (r) => r.required().min(3)
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string'
    })
  ],
  preview: {
    select: { title: 'alt', media: 'image', subtitle: 'caption' }
  }
})
