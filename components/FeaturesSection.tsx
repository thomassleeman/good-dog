import {FeatureIcon} from '@/components/FeatureIcon'
import type {HomePageQueryResult} from '@/sanity.types'

interface FeaturesSectionProps {
  data: NonNullable<HomePageQueryResult>
  dataAttribute: any
}

export function FeaturesSection({data, dataAttribute}: FeaturesSectionProps) {
  const {featuresTitle, features} = data

  if (!features || features.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4">
        {featuresTitle && (
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
            data-sanity={dataAttribute?.('featuresTitle')}
          >
            {featuresTitle}
          </h2>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature._key || index}
              className="text-center p-6 bg-white rounded-lg shadow-sm"
              data-sanity={dataAttribute?.(['features', {_key: feature._key}])}
            >
              <div className="mb-4 flex justify-center">
                <FeatureIcon icon={feature.icon} />
              </div>
              {feature.title && (
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
              )}
              {feature.description && (
                <p className="text-gray-600">{feature.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
