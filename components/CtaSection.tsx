import ImageBox from '@/components/ImageBox'
import {CtaButton} from '@/components/CtaButton'
import type {HomePageQueryResult} from '@/sanity.types'

interface CtaSectionProps {
  data: NonNullable<HomePageQueryResult>
  dataAttribute: any
}

export function CtaSection({data, dataAttribute}: CtaSectionProps) {
  const {ctaTitle, ctaSubtitle, ctaPhoneNumber, ctaButtons, ctaBackgroundImage} = data

  if (!ctaTitle && !ctaPhoneNumber) return null

  return (
    <section className="relative py-16 md:py-24">
      {ctaBackgroundImage && (
        <div className="absolute inset-0">
          <ImageBox
            image={ctaBackgroundImage}
            alt="Contact background"
            width={1920}
            height={600}
            classesWrapper="w-full h-full !rounded-none"
          />
          <div className="absolute inset-0 bg-stone-900/80" />
        </div>
      )}

      {!ctaBackgroundImage && (
        <div className="absolute inset-0 bg-stone-800" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {ctaTitle && (
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            data-sanity={dataAttribute?.('ctaTitle')}
          >
            {ctaTitle}
          </h2>
        )}

        {ctaSubtitle && (
          <p
            className="text-xl text-white/90 mb-6"
            data-sanity={dataAttribute?.('ctaSubtitle')}
          >
            {ctaSubtitle}
          </p>
        )}

        {ctaPhoneNumber && (
          <a
            href={`tel:${ctaPhoneNumber.replace(/\s/g, '')}`}
            className="text-2xl md:text-3xl font-bold text-white hover:text-stone-300 transition-colors mb-8 inline-block"
            data-sanity={dataAttribute?.('ctaPhoneNumber')}
          >
            {ctaPhoneNumber}
          </a>
        )}

        {ctaButtons && ctaButtons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {ctaButtons.map((button, index) => (
              <CtaButton
                key={button._key || index}
                button={button as any}
                dataAttribute={dataAttribute?.(['ctaButtons', {_key: button._key}])}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
