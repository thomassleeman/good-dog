import {urlForImage} from '@/sanity/lib/utils'
import Image from 'next/image'

interface ImageBoxProps {
  'image'?: {asset?: any}
  'alt'?: string
  'width'?: number
  'height'?: number
  'size'?: string
  'classesWrapper'?: string
  'data-sanity'?: string
  'fill'?: boolean
}

export default function ImageBox({
  image,
  alt = 'Cover image',
  width = 3500,
  height = 2000,
  size = '100vw',
  classesWrapper,
  fill = false,
  ...props
}: ImageBoxProps) {
  const imageUrl = image && urlForImage(image)?.height(height).width(width).fit('crop').url()

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
          />
        ) : (
          <Image
            className="h-auto w-full object-cover"
            alt={alt}
            width={width}
            height={height}
            sizes={size}
            src={imageUrl}
          />
        )
      )}
    </div>
  )
}
