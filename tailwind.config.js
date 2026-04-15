const {theme} = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
      kranky: 'var(--font-kranky)',
      'comic-neue': 'var(--font-comic-neue)',
      'indie-flower': 'var(--font-indie-flower)',
      'caveat-brush': 'var(--font-caveat-brush)',
      caveat: 'var(--font-caveat)',
      handlee: 'var(--font-handlee)',
      sansita: 'var(--font-sansita)',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
