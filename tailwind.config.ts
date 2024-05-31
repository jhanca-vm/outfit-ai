import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        default: '#fcfcfc',
        primary: '#343f4b',
        danger: '#931925',
        grey: '#e5e9f2'
      },
      fontFamily: {
        sans: 'var(--font-lato)'
      }
    }
  },
  plugins: [forms]
}

export default config
