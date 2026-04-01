import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {fontDecorators, fontOptions} from '../objects/fontOptions'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero Section'},
    {name: 'about', title: 'About Section'},
    {name: 'features', title: 'Key Features'},
    {name: 'testimonials', title: 'Testimonials'},
    {name: 'cta', title: 'Contact CTA'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // ===== HERO SECTION =====
    defineField({
      name: 'title',
      description: 'Main headline displayed in the hero section.',
      title: 'Hero Title',
      type: 'string',
      validation: (rule) => rule.required(),
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
      name: 'tagline',
      title: 'Hero Tagline',
      description: 'Subheadline text displayed below the title.',
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
      type: 'string',
      group: 'about',
    }),
    defineField({
      name: 'aboutBlocks',
      title: 'About Section Blocks',
      description:
        'Each block is a row with text and an image. Set the position to control which side the image appears on.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'aboutBlock',
        }),
      ],
      group: 'about',
    }),

    // ===== KEY FEATURES SECTION =====
    defineField({
      name: 'featuresTitle',
      title: 'Features Section Title',
      type: 'string',
      initialValue: 'Why Choose Us',
      group: 'features',
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'feature',
        }),
      ],
      validation: (rule) => rule.max(4),
      group: 'features',
    }),

    // ===== TESTIMONIALS SECTION =====
    defineField({
      name: 'testimonialsTitle',
      title: 'Testimonials Section Title',
      type: 'string',
      initialValue: 'What Our Clients Say',
      group: 'testimonials',
    }),
    defineField({
      name: 'testimonials',
      title: 'Featured Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'testimonial'}],
        }),
      ],
      group: 'testimonials',
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

    // ===== SEO =====
    defineField({
      name: 'overview',
      description: 'Used for SEO meta description.',
      title: 'SEO Description',
      type: 'array',
      of: [
        defineArrayMember({
          lists: [],
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
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        subtitle: 'Home',
        title,
      }
    },
  },
})
