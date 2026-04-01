import {CtaButton} from '@/components/CtaButton'
import {CustomPortableText} from '@/components/CustomPortableText'
import ImageBox from '@/components/ImageBox'
import type {HomePageQueryResult} from '@/sanity.types'

interface HeroSectionProps {
  data: NonNullable<HomePageQueryResult>
  dataAttribute: any
}

const fontClassMap: Record<string, string> = {
  sans: 'font-sans',
  serif: 'font-serif',
  mono: 'font-mono',
  kranky: 'font-kranky',
}

export function HeroSection({data, dataAttribute}: HeroSectionProps) {
  const {title, titleFont, tagline, heroImage, heroOverlayOpacity = 50, heroButtons} = data

  const titleFontClass = titleFont ? fontClassMap[titleFont] || 'font-sans' : 'font-sans'

  return (
    <section className="relative min-h-[70vh] w-full flex items-center justify-center">
      {heroImage && (
        <div className="absolute inset-0">
          <ImageBox
            image={heroImage}
            alt="Hero background"
            width={1920}
            height={1080}
            fill
            classesWrapper="w-full h-full !rounded-none"
            data-sanity={dataAttribute?.('heroImage')}
          />
        </div>
      )}

      <div
        className="absolute inset-0"
        style={{backgroundColor: `rgba(0, 0, 0, ${(heroOverlayOpacity ?? 50) / 100})`}}
      />

      <div className="relative z-10 text-center py-6 px-4 max-w-4xl mx-auto">
        {title && (
          <h1
            className={`text-4xl md:text-6xl font-bold text-white mb-6 ${titleFontClass}`}
            data-sanity={dataAttribute?.('title')}
          >
            {title}
          </h1>
        )}

        {tagline && tagline.length > 0 && (
          <div
            className="text-xl md:text-2xl text-white/90 mb-8"
            data-sanity={dataAttribute?.('tagline')}
          >
            <CustomPortableText
              id={data._id}
              type={data._type}
              path={['tagline']}
              value={tagline as any}
            />
          </div>
        )}

        {heroButtons && heroButtons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {heroButtons.map((button, index) => (
              <CtaButton
                key={button._key || index}
                button={button as any}
                dataAttribute={dataAttribute?.(['heroButtons', {_key: button._key}])}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
