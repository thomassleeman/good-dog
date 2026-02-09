import {CustomPortableText} from '@/components/CustomPortableText'
import ImageBox from '@/components/ImageBox'
import type {HomePageQueryResult} from '@/sanity.types'

interface AboutSectionProps {
  data: NonNullable<HomePageQueryResult>
  dataAttribute: any
}

export function AboutSection({data, dataAttribute}: AboutSectionProps) {
  const {aboutTitle, aboutContent, aboutImage} = data

  if (!aboutTitle && !aboutContent) return null

  return (
    <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          {aboutTitle && (
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              data-sanity={dataAttribute?.('aboutTitle')}
            >
              {aboutTitle}
            </h2>
          )}

          {aboutContent && aboutContent.length > 0 && (
            <div
              className="prose prose-lg text-gray-600"
              data-sanity={dataAttribute?.('aboutContent')}
            >
              <CustomPortableText
                id={data._id}
                type={data._type}
                path={['aboutContent']}
                value={aboutContent as any}
                paragraphClasses="mb-4"
              />
            </div>
          )}
        </div>

        {aboutImage && (
          <div data-sanity={dataAttribute?.('aboutImage')}>
            <ImageBox
              image={aboutImage}
              alt="About us"
              width={600}
              height={400}
              classesWrapper="rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  )
}
