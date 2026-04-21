import {AboutSection} from '@/components/AboutSection'
import {CustomPortableText} from '@/components/CustomPortableText'
import {PageHeroSection} from '@/components/PageHeroSection'
import {PageCtaSection} from '@/components/PageCtaSection'
import {studioUrl} from '@/sanity/lib/api'
import {sanityFetch} from '@/sanity/lib/live'
import {pagesBySlugQuery, slugsByTypeQuery} from '@/sanity/lib/queries'
import type {Metadata, ResolvingMetadata} from 'next'
import {createDataAttribute, toPlainText, type PortableTextBlock} from 'next-sanity'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const {data: page} = await sanityFetch({
    query: pagesBySlugQuery,
    params,
    stega: false,
  })

  return {
    title: page?.title,
    description: page?.overview ? toPlainText(page.overview) : (await parent).description,
  }
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: slugsByTypeQuery,
    params: {type: 'page'},
    stega: false,
    perspective: 'published',
  })
  return data
}

export default async function PageSlugRoute({params}: Props) {
  const {data} = await sanityFetch({query: pagesBySlugQuery, params})

  // Only show the 404 page if we're in production, when in draft mode we might be about to create a page on this slug, and live reload won't work on the 404 route
  if (!data?._id && !(await draftMode()).isEnabled) {
    notFound()
  }

  const dataAttribute =
    data?._id && data._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: data._id,
          type: data._type,
        })
      : null

  const {
    title,
    titleFont,
    overview,
    heroImage,
    heroOverlayOpacity,
    heroButtons,
    body,
    ctaTitle,
    ctaSubtitle,
    ctaPhoneNumber,
    ctaButtons,
    ctaBackgroundImage,
  } = data ?? {}
  const subtitle = (data as any)?.subtitle as string | null | undefined

  return (
    <div>
      {/* Hero Section */}
      <PageHeroSection
        id={data?._id || ''}
        type={data?._type || ''}
        title={title || (data?._id ? 'Untitled' : '404 Page Not Found')}
        subtitle={subtitle}
        titleFont={titleFont}
        tagline={overview as PortableTextBlock[] | null}
        heroImage={heroImage}
        heroOverlayOpacity={heroOverlayOpacity}
        heroButtons={heroButtons as any}
        dataAttribute={dataAttribute}
      />

      {/* About Section */}
      {data && <AboutSection data={data as any} dataAttribute={dataAttribute} />}

      {/* Body Content */}
      {body && (
        <section className="py-16 md:py-24 px-4 max-w-4xl mx-auto">
          <div className="prose prose-lg prose-gray max-w-none">
            <CustomPortableText
              id={data?._id || null}
              type={data?._type || null}
              path={['body']}
              paragraphClasses="font-serif text-gray-600 text-xl mb-6"
              value={body as unknown as PortableTextBlock[]}
            />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <PageCtaSection
        ctaTitle={ctaTitle}
        ctaSubtitle={ctaSubtitle}
        ctaPhoneNumber={ctaPhoneNumber}
        ctaButtons={ctaButtons as any}
        ctaBackgroundImage={ctaBackgroundImage}
        dataAttribute={dataAttribute}
      />
    </div>
  )
}
