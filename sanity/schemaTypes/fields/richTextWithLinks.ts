// /sanity/schemas/fields/richTextWithLinks.ts
import { defineArrayMember, defineField } from 'sanity'

export const richTextWithLinks = defineField({
  name: 'description',
  title: 'Description',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (r) => r.required()
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: true
              }
            ]
          }
        ]
      }
    })
  ]
})
