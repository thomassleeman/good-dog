'use client'

import {resolveHref} from '@/sanity/lib/utils'
import {stegaClean} from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'

interface MenuItem {
  _key: string | null
  _type: string
  title?: string | null
  slug?: string | null
}

interface MobileNavProps {
  menuItems: MenuItem[]
  homeHref: string
}

export function MobileNav({menuItems, homeHref}: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Top row: logo + hamburger — always in the same position */}
      <div className="flex items-center justify-between">
        <Link href={homeHref}>
          <Image
            src="/images/gdog-logo.png"
            alt="Good Dog"
            width={120}
            height={40}
            className="w-16 h-auto"
            priority
          />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="p-2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Expanded links — below the top row */}
      {open && (
        <nav className="flex flex-col items-center gap-4 py-6">
          {menuItems.map((item) => {
            const href = resolveHref(item._type, item.slug)
            if (!href || item._type === 'home') return null
            return (
              <Link
                key={item._key}
                href={href}
                onClick={() => setOpen(false)}
                className="text-xl text-gray-600 hover:text-black"
              >
                {stegaClean(item.title)}
              </Link>
            )
          })}
        </nav>
      )}
    </div>
  )
}
