'use client'

import { Button } from '@headlessui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { signOut } from '~/lib/actions'

export default function Header() {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const links = [
    ['/home', 'Inicio'],
    ['/outfits', 'Mis Outfits']
  ]

  return (
    <header className="max-w-7xl flex justify-end px-6 py-5 md:px-12 md:py-7">
      <nav className="font-bold underline-offset-2">
        {links.map(([href, label]) => (
          <Link
            key={href}
            className={twMerge(
              'mr-7 text-primary/80 transition-colors hover:text-primary sm:mr-11',
              pathname === href && 'text-primary underline'
            )}
            href={href}
          >
            {label}
          </Link>
        ))}
      </nav>
      <Button
        className={twJoin(
          'px-2 border border-danger rounded-md font-bold text-danger',
          'transition-colors disabled:animate-pulse',
          !isPending && 'hover:bg-danger hover:text-default'
        )}
        disabled={isPending}
        onClick={() => startTransition(signOut)}
      >
        Cerrar Sesión
      </Button>
    </header>
  )
}
