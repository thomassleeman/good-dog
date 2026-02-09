import {CustomPortableText} from '@/components/CustomPortableText'
import ImageBox from '@/components/ImageBox'
import {PageHeroSection} from '@/components/PageHeroSection'
import {PageCtaSection} from '@/components/PageCtaSection'
import {studioUrl} from '@/sanity/lib/api'
import {sanityFetch} from '@/sanity/lib/live'
import {projectBySlugQuery, slugsByTypeQuery} from '@/sanity/lib/queries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import type {Metadata, ResolvingMetadata} from 'next'
import {createDataAttribute, toPlainText, type PortableTextBlock} from 'next-sanity'
import {draftMode} from 'next/headers'
import Link from 'next/link'
import {notFound} from 'next/navigation'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata(
  {params}: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const {data: project} = await sanityFetch({
    query: projectBySlugQuery,
    params,
    stega: false,
  })
  const ogImage = urlForOpenGraphImage(
    // @ts-expect-error - @TODO update @sanity/image-url types so it's compatible
    project?.coverImage,
  )

  return {
    title: project?.title,
    description: project?.overview ? toPlainText(project.overview) : (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  }
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: slugsByTypeQuery,
    params: {type: 'project'},
    stega: false,
    perspective: 'published',
  })
  return data
}

export default async function ProjectSlugRoute({params}: Props) {
  const {data} = await sanityFetch({query: projectBySlugQuery, params})

  // Only show the 404 page if we're in production, when in draft mode we might be about to create a project on this slug, and live reload won't work on the 404 route
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
    coverImage,
    client,
    duration,
    site,
    tags,
    description,
    ctaTitle,
    ctaSubtitle,
    ctaPhoneNumber,
    ctaButtons,
    ctaBackgroundImage,
  } = data ?? {}

  const startYear = duration?.start ? new Date(duration.start).getFullYear() : undefined
  const endYear = duration?.end ? new Date(duration?.end).getFullYear() : 'Now'

  // Use heroImage if set, otherwise fallback to coverImage
  const backgroundImage = heroImage || coverImage

  return (
    <div>
      {/* Hero Section */}
      <PageHeroSection
        id={data?._id || ''}
        type={data?._type || ''}
        title={title || (data?._id ? 'Untitled' : '404 Project Not Found')}
        titleFont={titleFont}
        tagline={overview as PortableTextBlock[] | null}
        heroImage={backgroundImage}
        heroOverlayOpacity={heroOverlayOpacity}
        heroButtons={heroButtons as any}
        dataAttribute={dataAttribute}
      />

      {/* Project Details Section */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Cover Image & Details Card */}
          <div className="rounded-md border overflow-hidden">
            <ImageBox
              data-sanity={dataAttribute?.('coverImage')}
              image={coverImage as any}
              alt=""
              classesWrapper="relative aspect-[16/9]"
            />

            <div className="divide-inherit grid grid-cols-1 divide-y lg:grid-cols-4 lg:divide-x lg:divide-y-0">
              {/* Duration */}
              {!!(startYear && endYear) && (
                <div className="p-3 lg:p-4">
                  <div className="text-xs md:text-sm text-gray-500">Duration</div>
                  <div className="text-md md:text-lg font-medium">
                    <span data-sanity={dataAttribute?.('duration.start')}>{startYear}</span>
                    {' - '}
                    <span data-sanity={dataAttribute?.('duration.end')}>{endYear}</span>
                  </div>
                </div>
              )}

              {/* Client */}
              {client && (
                <div className="p-3 lg:p-4">
                  <div className="text-xs md:text-sm text-gray-500">Client</div>
                  <div className="text-md md:text-lg font-medium">{client}</div>
                </div>
              )}

              {/* Site */}
              {site && (
                <div className="p-3 lg:p-4">
                  <div className="text-xs md:text-sm text-gray-500">Site</div>
                  <Link
                    target="_blank"
                    className="text-md break-words md:text-lg font-medium text-stone-600 hover:text-stone-800"
                    href={site}
                  >
                    {site}
                  </Link>
                </div>
              )}

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="p-3 lg:p-4">
                  <div className="text-xs md:text-sm text-gray-500">Tags</div>
                  <div className="text-md flex flex-row flex-wrap md:text-lg font-medium">
                    {tags.map((tag: string, index: number) => (
                      <div key={index} className="mr-2 text-stone-600">
                        #{tag}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="max-w-4xl mx-auto">
              <CustomPortableText
                id={data?._id || null}
                type={data?._type || null}
                path={['description']}
                paragraphClasses="font-serif text-xl text-gray-600 mb-6"
                value={description as any}
              />
            </div>
          )}
        </div>
      </section>

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
