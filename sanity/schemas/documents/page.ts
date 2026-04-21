import {DocumentIcon, ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {fontDecorators, fontOptions} from '../objects/fontOptions'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: DocumentIcon,
  groups: [
    {name: 'hero', title: 'Hero Section'},
    {name: 'about', title: 'About Section'},
    {name: 'content', title: 'Page Content'},
    {name: 'cta', title: 'Contact CTA'},
  ],
  fields: [
    // ===== HERO SECTION =====
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
      group: 'hero',
    }),
    defineField({
      type: 'string',
      name: 'subtitle',
      title: 'Subtitle',
      description: 'Optional sub-heading displayed below the title. Useful if you want to split the heading into two parts.',
      group: 'hero',
    }),
    defineField({
      name: 'titleFont',
      title: 'Title Font',
      type: 'string',
      options: {
        list: fontOptions,
        layout: 'radio',
      },
      initialValue: 'sans',
      group: 'hero',
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and displayed as tagline in the hero section.',
      title: 'Overview / Tagline',
      type: 'array',
      of: [
        // Paragraphs
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
      validation: (rule) => rule.max(155),
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'hero',
    }),
    defineField({
      name: 'heroOverlayOpacity',
      title: 'Hero Overlay Opacity',
      type: 'number',
      description: 'Darkness of overlay (0-100). Default: 50',
      validation: (rule) => rule.min(0).max(100),
      initialValue: 50,
      group: 'hero',
    }),
    defineField({
      name: 'heroButtons',
      title: 'Hero CTA Buttons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'ctaButton',
        }),
      ],
      validation: (rule) => rule.max(2),
      group: 'hero',
    }),

    // ===== ABOUT SECTION =====
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      description: 'Leave blank to leave the title out.',
      type: 'string',
      group: 'about',
    }),
    defineField({
      name: 'aboutBlocks',
      title: 'About Section Blocks',
      description:
        'Each block is a row with text and an image. Set the position to control which side the image appears on. Leave empty to hide this section.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'aboutBlock',
        }),
      ],
      group: 'about',
    }),

    // ===== PAGE CONTENT =====
    defineField({
      type: 'array',
      name: 'body',
      title: 'Body',
      description:
        "This is where you can write the page's content. Including custom blocks like timelines for more a more visual display of information.",
      group: 'content',
      of: [
        // Paragraphs
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
          styles: [],
        }),
        // Custom blocks
        defineArrayMember({
          name: 'timeline',
          type: 'timeline',
        }),
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              media: 'asset',
              title: 'caption',
            },
          },
          fields: [
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
      ],
    }),

    // ===== CONTACT CTA SECTION =====
    defineField({
      name: 'ctaTitle',
      title: 'CTA Section Title',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA Section Subtitle',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaPhoneNumber',
      title: 'Phone Number',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'ctaButton',
        }),
      ],
      validation: (rule) => rule.max(2),
      group: 'cta',
    }),
    defineField({
      name: 'ctaBackgroundImage',
      title: 'CTA Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'cta',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        subtitle: 'Page',
        title,
      }
    },
  },
})
