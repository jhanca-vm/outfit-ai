import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import type { PropsWithChildren } from 'react'
import { twJoin } from 'tailwind-merge'
import 'tailwindcss/tailwind.css'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato'
})

export const metadata: Metadata = { title: 'OutfitAI' }

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="es" className={twJoin(lato.variable, 'min-w-[375px]')}>
      <body className="bg-default text-primary">{children}</body>
    </html>
  )
}
