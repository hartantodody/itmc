import { defineField, defineType } from 'sanity'

export const heroStat = defineType({
  name: 'heroStat',
  title: 'Hero Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Users', value: 'Users' },
          { title: 'Award', value: 'Award' },
          { title: 'TrendingUp', value: 'TrendingUp' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: { title: 'label', subtitle: 'icon' }
  }
})
