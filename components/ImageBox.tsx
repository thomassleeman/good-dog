import {urlForImage} from '@/sanity/lib/utils'
import Image from 'next/image'

type ImageAsset = {
  _id?: string | null
  _ref?: string | null
  url?: string | null
  metadata?: {
    lqip?: string | null
    dimensions?: {width?: number | null; height?: number | null; aspectRatio?: number | null} | null
  } | null
}

interface ImageBoxProps {
  'image'?: {asset?: ImageAsset | null} | null
  'alt'?: string
  'width'?: number
  'height'?: number
  'size'?: string
  'classesWrapper'?: string
  'data-sanity'?: string
  'fill'?: boolean
  'priority'?: boolean
}

export default function ImageBox({
  image,
  alt = 'Cover image',
  width = 1600,
  height = 900,
  size = '100vw',
  classesWrapper,
  fill = false,
  priority = false,
  ...props
}: ImageBoxProps) {
  const imageUrl = image && urlForImage(image as any)?.height(height).width(width).fit('crop').url()
  const lqip = image?.asset?.metadata?.lqip ?? undefined

  return (
    <div
      className={`w-full overflow-hidden rounded-[3px] bg-gray-50 ${classesWrapper} ${fill ? 'relative' : ''}`}
      data-sanity={props['data-sanity']}
    >
      {imageUrl && (
        fill ? (
          <Image
            className="object-cover"
            alt={alt}
            fill
            sizes={size}
            src={imageUrl}
            priority={priority}
            {...(lqip ? {placeholder: 'blur' as const, blurDataURL: lqip} : {})}
          />
        ) : (
          <Image
            className="h-auto w-full object-cover"
            alt={alt}
            width={width}
            height={height}
            sizes={size}
            src={imageUrl}
            priority={priority}
            {...(lqip ? {placeholder: 'blur' as const, blurDataURL: lqip} : {})}
          />
        )
      )}
    </div>
  )
}
