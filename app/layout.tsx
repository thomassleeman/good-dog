import './globals.css'
import {
  Caveat,
  Caveat_Brush,
  Comic_Neue,
  Handlee,
  IBM_Plex_Mono,
  Indie_Flower,
  Inter,
  Kranky,
  PT_Serif,
  Sansita,
} from 'next/font/google'

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
  // weight: ['500', '700', '800'],
})
const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})
const kranky = Kranky({
  variable: '--font-kranky',
  subsets: ['latin'],
  weight: '400',
})
const comicNeue = Comic_Neue({
  variable: '--font-comic-neue',
  subsets: ['latin'],
  weight: '400',
})
const indieFlower = Indie_Flower({
  variable: '--font-indie-flower',
  subsets: ['latin'],
  weight: '400',
})
const caveatBrush = Caveat_Brush({
  variable: '--font-caveat-brush',
  subsets: ['latin'],
  weight: '400',
})
const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: '400',
})
const handlee = Handlee({
  variable: '--font-handlee',
  subsets: ['latin'],
  weight: '400',
})
const sansita = Sansita({
  variable: '--font-sansita',
  subsets: ['latin'],
  weight: '400',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${serif.variable} ${kranky.variable} ${comicNeue.variable} ${indieFlower.variable} ${caveatBrush.variable} ${caveat.variable} ${handlee.variable} ${sansita.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
