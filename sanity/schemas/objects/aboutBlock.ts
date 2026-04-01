import {defineField, defineType, defineArrayMember} from 'sanity'
import {fontDecorators} from './fontOptions'

export default defineType({
  name: 'aboutBlock',
  title: 'About Block',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
            decorators: fontDecorators,
          },
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
          ],
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'position',
      title: 'Image Position',
      description: 'Which side of the text the image appears on',
      type: 'string',
      options: {
        list: [
          {title: 'Image Left', value: 'left'},
          {title: 'Image Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
  ],
  preview: {
    select: {
      title: 'text.0.children.0.text',
      media: 'image',
      position: 'position',
    },
    prepare({title, media, position}) {
      return {
        title: title || 'About Block',
        subtitle: `Image ${position || 'right'}`,
        media,
      }
    },
  },
})
