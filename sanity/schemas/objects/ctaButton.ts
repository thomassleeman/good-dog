import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ctaButton',
  title: 'Call to Action Button',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal Page', value: 'internal'},
          {title: 'External URL', value: 'external'},
          {title: 'Phone Number', value: 'phone'},
          {title: 'Email', value: 'email'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      hidden: ({parent}) => parent?.linkType !== 'phone',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      hidden: ({parent}) => parent?.linkType !== 'email',
    }),
    defineField({
      name: 'style',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary (Filled)', value: 'primary'},
          {title: 'Secondary (Outline)', value: 'secondary'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
    },
    prepare({title, linkType}) {
      return {
        title,
        subtitle: linkType ? `${linkType} link` : 'No link type',
      }
    },
  },
})
