import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {fontDecorators} from '../objects/fontOptions'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorPhoto',
      title: 'Author Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'array',
      of: [
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: fontDecorators,
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'petName',
      title: 'Pet Name (optional)',
      type: 'string',
      description: 'e.g., "Owner of Max the Labrador"',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (rule) => rule.min(1).max(5),
      initialValue: 5,
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'petName',
      media: 'authorPhoto',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle || 'No pet name',
        media,
      }
    },
  },
})
