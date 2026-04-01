import {CustomPortableText} from '@/components/CustomPortableText'
import ImageBox from '@/components/ImageBox'
import type {HomePageQueryResult} from '@/sanity.types'

interface AboutSectionProps {
  data: NonNullable<HomePageQueryResult>
  dataAttribute: any
}

export function AboutSection({data, dataAttribute}: AboutSectionProps) {
  const {aboutTitle, aboutBlocks} = data

  if (!aboutTitle && (!aboutBlocks || aboutBlocks.length === 0)) return null

  return (
    <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
      {aboutTitle && (
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-12"
          data-sanity={dataAttribute?.('aboutTitle')}
        >
          {aboutTitle}
        </h2>
      )}

      {aboutBlocks?.map((block, index) => {
        const imageLeft = block.position === 'left'

        return (
          <div
            key={block._key}
            className={`grid md:grid-cols-2 gap-12 items-center ${index > 0 ? 'mt-16' : ''}`}
          >
            {block.image && (
              <div
                className={`${imageLeft ? 'md:order-first' : 'md:order-last'}`}
                data-sanity={dataAttribute?.(['aboutBlocks', index, 'image'])}
              >
                <ImageBox
                  image={block.image}
                  alt="About us"
                  width={600}
                  height={400}
                  classesWrapper="rounded-lg shadow-lg"
                />
              </div>
            )}

            {block.text && block.text.length > 0 && (
              <div
                className="prose prose-lg text-gray-600"
                data-sanity={dataAttribute?.(['aboutBlocks', index, 'text'])}
              >
                <CustomPortableText
                  id={data._id}
                  type={data._type}
                  path={['aboutBlocks', index, 'text']}
                  value={block.text as any}
                  paragraphClasses="mb-4"
                />
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}
