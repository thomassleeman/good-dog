import '@/styles/index.css'
import {Footer} from '@/components/Footer'
import {Navbar} from '@/components/Navbar'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {homePageQuery, settingsQuery} from '@/sanity/lib/queries'
import {urlForOpenGraphImage} from '@/sanity/lib/utils'
import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata, Viewport} from 'next'
import {toPlainText, type PortableTextBlock} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {draftMode} from 'next/headers'
import {Suspense} from 'react'
import {Toaster} from 'sonner'
import {handleError} from './client-functions'
import {DraftModeToast} from './DraftModeToast'

export async function generateMetadata(): Promise<Metadata> {
  const [{data: settings}, {data: homePage}] = await Promise.all([
    sanityFetch({query: settingsQuery, stega: false}),
    sanityFetch({query: homePageQuery, stega: false}),
  ])

  const ogImage = urlForOpenGraphImage(
    // @ts-expect-error - @TODO update @sanity/image-url types so it's compatible
    settings?.ogImage,
  )
  return {
    title: homePage?.title
      ? {
          template: `%s | ${homePage.title}`,
          default: homePage.title || 'Personal website',
        }
      : undefined,
    description: homePage?.overview ? toPlainText(homePage.overview) : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default async function IndexRoute({children}: {children: React.ReactNode}) {
  const {data} = await sanityFetch({query: settingsQuery})
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white text-black">
        <Navbar data={data} />
        <div className="flex-grow">{children}</div>
        <Footer
          id={data?._id || null}
          type={data?._type || null}
          footer={data?.footer as unknown as PortableTextBlock[]}
        />
      </div>
      <Toaster />
      <SanityLive onError={handleError} />
      {(await draftMode()).isEnabled && (
        <>
          <DraftModeToast />
          <VisualEditing />
        </>
      )}
      <SpeedInsights />
    </>
  )
}
