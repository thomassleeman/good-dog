import {resolveHref} from '@/sanity/lib/utils'
import Link from 'next/link'

interface CtaButtonProps {
  button: {
    _key?: string
    label?: string
    linkType?: 'internal' | 'external' | 'phone' | 'email'
    internalLink?: {_type?: string; slug?: string}
    externalUrl?: string
    phoneNumber?: string
    email?: string
    style?: 'primary' | 'secondary'
  }
  dataAttribute?: string
}

export function CtaButton({button, dataAttribute}: CtaButtonProps) {
  const {label, linkType, internalLink, externalUrl, phoneNumber, email, style = 'primary'} = button

  if (!label) return null

  const baseStyles =
    'inline-flex items-center justify-center w-[200px] h-[45px] rounded-lg font-semibold text-base transition-all duration-200'
  const primaryStyles = 'bg-stone-600 text-white hover:bg-stone-700'
  const secondaryStyles = 'border-2 border-white text-white hover:bg-white hover:text-gray-900'

  const buttonStyles = `${baseStyles} ${style === 'primary' ? primaryStyles : secondaryStyles}`

  let href = '#'
  if (linkType === 'internal' && internalLink) {
    href = resolveHref(internalLink._type, internalLink.slug) || '#'
  } else if (linkType === 'external' && externalUrl) {
    href = externalUrl
  } else if (linkType === 'phone' && phoneNumber) {
    href = `tel:${phoneNumber.replace(/\s/g, '')}`
  } else if (linkType === 'email' && email) {
    href = `mailto:${email}`
  }

  const isExternal = linkType === 'external' || linkType === 'phone' || linkType === 'email'

  if (isExternal) {
    return (
      <a
        href={href}
        className={buttonStyles}
        data-sanity={dataAttribute}
        {...(linkType === 'external' ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
      >
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className={buttonStyles} data-sanity={dataAttribute}>
      {label}
    </Link>
  )
}
