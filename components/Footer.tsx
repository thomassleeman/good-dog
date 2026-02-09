import {CustomPortableText} from '@/components/CustomPortableText'
import type {PortableTextBlock} from 'next-sanity'
import type {PathSegment} from 'sanity'

interface FooterProps {
  id: string | null
  type: string | null
  footer?: PortableTextBlock[] | null
}

export function Footer({id, type, footer}: FooterProps) {
  if (!footer || footer.length === 0) {
    return null
  }

  const path: PathSegment[] = ['footer']

  return (
    <footer className="bottom-0 w-full bg-gray-100 p-2">
      <div className="w-full py-12 text-center md:py-20">
        <CustomPortableText
          id={id}
          type={type}
          path={path}
          paragraphClasses="text-md md:text-xl"
          value={footer}
        />
      </div>
      <p className="mt-4 text-sm text-gray-600">&copy; Good dog {new Date().getFullYear()}</p>
    </footer>
  )
}
