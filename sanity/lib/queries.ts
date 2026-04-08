import {defineQuery} from 'next-sanity'

export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _type,
    // Hero Section
    title,
    titleFont,
    tagline,
    heroImage,
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
      image,
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
      authorPhoto,
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
    ctaBackgroundImage,
    // SEO
    overview
  }
`)

export const testimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(_createdAt desc){
    _id,
    _type,
    authorName,
    authorPhoto,
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
    titleFont,
    overview,
    heroImage,
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
      image,
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
    ctaBackgroundImage
  }
`)

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    // Hero Section
    title,
    titleFont,
    overview,
    heroImage,
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
    coverImage,
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
    ctaBackgroundImage
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
