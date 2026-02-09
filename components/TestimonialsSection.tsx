import {CustomPortableText} from '@/components/CustomPortableText'
import ImageBox from '@/components/ImageBox'
import type {HomePageQueryResult} from '@/sanity.types'

interface TestimonialsSectionProps {
  data: NonNullable<HomePageQueryResult>
  dataAttribute: any
}

export function TestimonialsSection({data, dataAttribute}: TestimonialsSectionProps) {
  const {testimonialsTitle, testimonials} = data

  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
      {testimonialsTitle && (
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          data-sanity={dataAttribute?.('testimonialsTitle')}
        >
          {testimonialsTitle}
        </h2>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial._id || index}
            className="bg-white p-6 rounded-lg shadow-md border border-stone-200"
            data-sanity={dataAttribute?.(['testimonials', index])}
          >
            {testimonial.rating && (
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}

            {testimonial.quote && (
              <blockquote className="text-gray-700 mb-4 italic">
                <CustomPortableText
                  id={testimonial._id || data._id}
                  type={testimonial._type || data._type}
                  path={['quote']}
                  value={testimonial.quote as any}
                />
              </blockquote>
            )}

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-stone-200">
              {testimonial.authorPhoto && (
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <ImageBox
                    image={testimonial.authorPhoto}
                    alt={testimonial.authorName || 'Customer'}
                    width={48}
                    height={48}
                    classesWrapper="w-full h-full"
                  />
                </div>
              )}
              <div>
                {testimonial.authorName && (
                  <p className="font-semibold text-gray-900">{testimonial.authorName}</p>
                )}
                {testimonial.petName && (
                  <p className="text-sm text-gray-500">{testimonial.petName}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
