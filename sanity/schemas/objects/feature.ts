import {StarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Select an icon to display',
      options: {
        list: [
          {title: 'Shield (Insured)', value: 'shield'},
          {title: 'Heart (Family Owned)', value: 'heart'},
          {title: 'Calendar (Since Year)', value: 'calendar'},
          {title: 'Paw Print', value: 'paw'},
          {title: 'Star (Quality)', value: 'star'},
          {title: 'Clock (Reliable)', value: 'clock'},
          {title: 'Map Pin (Local)', value: 'mapPin'},
          {title: 'Check Circle (Verified)', value: 'check'},
        ],
      },
      initialValue: 'star',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
