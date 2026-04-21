import {CustomPortableText} from '@/components/CustomPortableText'
import type {PathSegment} from 'sanity'

interface HeaderProps {
  id: string | null
  type: string | null
  path: PathSegment[]
  centered?: boolean
  description?: null | any[]
  title?: string | null
  titleFont?: string | null
  textColor?: 'default' | 'white'
}

const fontClassMap: Record<string, string> = {
  sans: 'font-sans',
  serif: 'font-serif',
  mono: 'font-mono',
  kranky: 'font-kranky',
  'comic-neue': 'font-comic-neue',
  'indie-flower': 'font-indie-flower',
  'caveat-brush': 'font-caveat-brush',
  caveat: 'font-caveat',
  handlee: 'font-handlee',
  sansita: 'font-sansita',
}

export function Header(props: HeaderProps) {
  const {id, type, path, title, titleFont, description, centered = false, textColor = 'default'} = props
  const titleFontClass = titleFont ? fontClassMap[titleFont] || 'font-sans' : 'font-sans'
  if (!description && !title) {
    return null
  }
  const titleColorClass = textColor === 'white' ? 'text-white' : ''
  const descriptionColorClass = textColor === 'white' ? 'text-white/90' : 'text-gray-600'

  return (
    <div className={`${centered ? 'text-center' : 'w-5/6 lg:w-3/5'}`}>
      {/* Title */}
      {title && (
        <div className={`text-3xl font-extrabold tracking-tight md:text-5xl ${titleFontClass} ${titleColorClass}`}>
          {title}
        </div>
      )}
      {/* Description */}
      {description && (
        <div className={`mt-4 text-pretty font-serif text-xl md:text-2xl ${descriptionColorClass}`}>
          <CustomPortableText id={id} type={type} path={path} value={description} />
        </div>
      )}
    </div>
  )
}
