import {CtaButton} from '@/components/CtaButton'
import {CustomPortableText} from '@/components/CustomPortableText'
import ImageBox from '@/components/ImageBox'
import type {PortableTextBlock} from 'next-sanity'
import Image from 'next/image'
import whatsApp from './../public/images/WhatsAppButtonGreenLarge.png'

interface PageHeroSectionProps {
  id: string
  type: string
  title: string
  titleFont?: string | null
  tagline?: PortableTextBlock[] | null
  heroImage?: any
  heroOverlayOpacity?: number | null
  heroButtons?: Array<{
    _key?: string
    label?: string
    linkType?: 'internal' | 'external' | 'phone' | 'email'
    internalLink?: {_type?: string; slug?: string}
    externalUrl?: string
    phoneNumber?: string
    email?: string
    style?: 'primary' | 'secondary'
  }> | null
  dataAttribute?: any
}

const fontClassMap: Record<string, string> = {
  sans: 'font-sans',
  serif: 'font-serif',
  mono: 'font-mono',
  kranky: 'font-kranky',
}

export function PageHeroSection({
  id,
  type,
  title,
  titleFont,
  tagline,
  heroImage,
  heroOverlayOpacity = 50,
  heroButtons,
  dataAttribute,
}: PageHeroSectionProps) {
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

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
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
            className="text-xl md:text-2xl text-white/90 mb-4"
            data-sanity={dataAttribute?.('overview')}
          >
            <CustomPortableText id={id} type={type} path={['overview']} value={tagline} />
          </div>
        )}
        <a
          className="inline-block mb-4"
          aria-label="Chat on WhatsApp"
          href="https://wa.me/447736916056"
        >
          {' '}
          <Image src={whatsApp} alt="Chat on WhatsApp" width={200} height={60} />{' '}
        </a>

        {heroButtons && heroButtons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {heroButtons.map((button, index) => (
              <CtaButton
                key={button._key || index}
                button={button}
                dataAttribute={dataAttribute?.(['heroButtons', {_key: button._key}])}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
