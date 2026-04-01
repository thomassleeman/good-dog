import {MobileNav} from '@/components/MobileNav'
import {OptimisticSortOrder} from '@/components/OptimisticSortOrder'
import type {SettingsQueryResult} from '@/sanity.types'
import {studioUrl} from '@/sanity/lib/api'
import {resolveHref} from '@/sanity/lib/utils'
import {createDataAttribute, stegaClean} from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'

interface NavbarProps {
  data: SettingsQueryResult
}
export function Navbar(props: NavbarProps) {
  const {data} = props
  const dataAttribute =
    data?._id && data?._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: data._id,
          type: data._type,
        })
      : null

  const homeItem = data?.menuItems?.find((item) => item._type === 'home')
  const homeHref =
    (homeItem ? resolveHref(homeItem._type, homeItem.slug) : '/') ?? '/'

  return (
    <header
      className="sticky top-0 z-50 bg-white/80 px-4 py-2 lg:py-4 backdrop-blur md:px-16 md:py-2 lg:px-32"
      data-sanity={dataAttribute?.('menuItems')}
    >
      {/* Mobile: logo + hamburger + expandable links */}
      <MobileNav menuItems={data?.menuItems ?? []} homeHref={homeHref} />

      {/* Desktop: logo + inline links */}
      <div className="hidden md:flex items-center justify-between">
        <Link href={homeHref}>
          <Image
            src="/images/gdog-logo.png"
            alt="Good Dog"
            width={120}
            height={40}
            className="w-16 lg:w-20 h-auto"
            priority
          />
        </Link>

        <nav className="flex items-center gap-x-5">
          <OptimisticSortOrder id={data?._id} path="menuItems">
            {data?.menuItems?.map((menuItem) => {
              const href = resolveHref(menuItem?._type, menuItem?.slug)
              if (!href || menuItem?._type === 'home') {
                return null
              }
              return (
                <Link
                  key={menuItem._key}
                  className="text-lg hover:text-black md:text-xl text-gray-600"
                  data-sanity={dataAttribute?.([
                    'menuItems',
                    {_key: menuItem._key as unknown as string},
                  ])}
                  href={href}
                >
                  {stegaClean(menuItem.title)}
                </Link>
              )
            })}
          </OptimisticSortOrder>
        </nav>
      </div>
    </header>
  )
}
