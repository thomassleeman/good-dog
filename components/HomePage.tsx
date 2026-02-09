import {HeroSection} from '@/components/HeroSection'
import {AboutSection} from '@/components/AboutSection'
import {FeaturesSection} from '@/components/FeaturesSection'
import {TestimonialsSection} from '@/components/TestimonialsSection'
import {CtaSection} from '@/components/CtaSection'
import type {HomePageQueryResult} from '@/sanity.types'
import {studioUrl} from '@/sanity/lib/api'
import {createDataAttribute} from 'next-sanity'

export interface HomePageProps {
  data: HomePageQueryResult | null
}

export async function HomePage({data}: HomePageProps) {
  if (!data) return null

  const dataAttribute =
    data._id && data._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: data._id,
          type: data._type,
        })
      : null

  return (
    <div>
      <HeroSection data={data} dataAttribute={dataAttribute} />
      <AboutSection data={data} dataAttribute={dataAttribute} />
      <FeaturesSection data={data} dataAttribute={dataAttribute} />
      <TestimonialsSection data={data} dataAttribute={dataAttribute} />
      <CtaSection data={data} dataAttribute={dataAttribute} />
    </div>
  )
}
