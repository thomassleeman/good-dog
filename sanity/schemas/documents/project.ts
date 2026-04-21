import {DocumentIcon, ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {fontDecorators, fontOptions} from '../objects/fontOptions'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  groups: [
    {name: 'hero', title: 'Hero Section'},
    {name: 'details', title: 'Project Details'},
    {name: 'content', title: 'Project Content'},
    {name: 'cta', title: 'Contact CTA'},
  ],
  fields: [
    // ===== HERO SECTION =====
    defineField({
      name: 'title',
      description: 'This field is the title of your project.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'Optional sub-heading displayed below the title. Useful if you want to split the heading into two parts.',
      type: 'string',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'overview',
      description: 'Used both for the <meta> description tag for SEO, and displayed as tagline in the hero section.',
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
      description: 'Background image for the hero section. If not set, the cover image will be used.',
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

    // ===== PROJECT DETAILS =====
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'This image will be used as the cover image for the project. If you choose to add it to the show case projects, this is the image displayed in the list within the homepage.',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      group: 'details',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'duration',
      group: 'details',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      group: 'details',
    }),

    // ===== PROJECT CONTENT =====
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'array',
      group: 'content',
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
})
