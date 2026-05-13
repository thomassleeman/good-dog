import {defineQuery} from 'next-sanity'

// Every image projection below dereferences `asset` and pulls `metadata.lqip`
// (a tiny base64 thumbnail) plus dimensions so the renderer can show a blur
// placeholder instantly instead of a long grey box while bytes load.

export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _type,
    // Hero Section
    title,
    subtitle,
    titleFont,
    tagline,
    heroImage{..., asset->{_id, url, metadata{lqip, dimensions}}},
    heroOverlayOpacity,
    heroButtons[]{
      _key,
      label,
      linkType,
      internalLink->{
        _type,
        "slug": slug.current
      },
      externalUrl,
      phoneNumber,
      email,
      style
    },
    // About Section
    aboutTitle,
    aboutBlocks[]{
      _key,
      text,
      image{..., asset->{_id, url, metadata{lqip, dimensions}}},
      position
    },
    // Features Section
    featuresTitle,
    features[]{
      _key,
      title,
      description,
      icon
    },
    // Testimonials Section
    testimonialsTitle,
    testimonials[]->{
      _id,
      _type,
      authorName,
      authorPhoto{..., asset->{_id, url, metadata{lqip, dimensions}}},
      quote,
      petName,
      rating
    },
    // CTA Section
    ctaTitle,
    ctaSubtitle,
    ctaPhoneNumber,
    ctaButtons[]{
      _key,
      label,
      linkType,
      internalLink->{
        _type,
        "slug": slug.current
      },
      externalUrl,
      phoneNumber,
      email,
      style
    },
    ctaBackgroundImage{..., asset->{_id, url, metadata{lqip, dimensions}}},
    // SEO
    overview
  }
`)

export const testimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(_createdAt desc){
    _id,
    _type,
    authorName,
    authorPhoto{..., asset->{_id, url, metadata{lqip, dimensions}}},
    quote,
    petName,
    rating
  }
`)

export const pagesBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    // Hero Section
    title,
    subtitle,
    titleFont,
    overview,
    heroImage{..., asset->{_id, url, metadata{lqip, dimensions}}},
    heroOverlayOpacity,
    heroButtons[]{
      _key,
      label,
      linkType,
      internalLink->{
        _type,
        "slug": slug.current
      },
      externalUrl,
      phoneNumber,
      email,
      style
    },
    // About Section
    aboutTitle,
    aboutBlocks[]{
      _key,
      text,
      image{..., asset->{_id, url, metadata{lqip, dimensions}}},
      position
    },
    // Page Content
    body,
    "slug": slug.current,
    // CTA Section
    ctaTitle,
    ctaSubtitle,
    ctaPhoneNumber,
    ctaButtons[]{
      _key,
      label,
      linkType,
      internalLink->{
        _type,
        "slug": slug.current
      },
      externalUrl,
      phoneNumber,
      email,
      style
    },
    ctaBackgroundImage{..., asset->{_id, url, metadata{lqip, dimensions}}}
  }
`)

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    // Hero Section
    title,
    subtitle,
    titleFont,
    overview,
    heroImage{..., asset->{_id, url, metadata{lqip, dimensions}}},
    heroOverlayOpacity,
    heroButtons[]{
      _key,
      label,
      linkType,
      internalLink->{
        _type,
        "slug": slug.current
      },
      externalUrl,
      phoneNumber,
      email,
      style
    },
    // Project Details
    coverImage{..., asset->{_id, url, metadata{lqip, dimensions}}},
    duration,
    client,
    site,
    tags,
    "slug": slug.current,
    // Project Content
    description,
    // CTA Section
    ctaTitle,
    ctaSubtitle,
    ctaPhoneNumber,
    ctaButtons[]{
      _key,
      label,
      linkType,
      internalLink->{
        _type,
        "slug": slug.current
      },
      externalUrl,
      phoneNumber,
      email,
      style
    },
    ctaBackgroundImage{..., asset->{_id, url, metadata{lqip, dimensions}}}
  }
`)

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    footer,
    menuItems[]{
      _key,
      ...@->{
        _type,
        "slug": slug.current,
        title
      }
    },
    ogImage,
  }
`)

export const slugsByTypeQuery = defineQuery(`
  *[_type == $type && defined(slug.current)]{"slug": slug.current}
`)
