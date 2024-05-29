import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        default: '#fcfcfc',
        primary: '#343f4b',
        danger: '#931925'
      },
      fontFamily: {
        sans: 'var(--font-lato)'
      }
    }
  },
  plugins: [forms, animate]
}

export default config
