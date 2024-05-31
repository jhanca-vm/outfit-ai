import { Button } from '@headlessui/react'
import type { UserMetadata } from '@supabase/supabase-js'
import Image from 'next/image'
import { twJoin } from 'tailwind-merge'
import classes from '~/lib/classes'

type Style = 'casual' | 'elegant' | 'urban' | 'sport'

interface Props {
  handleClick: (data: UserMetadata) => void
}

export default function Style({ handleClick }: Props) {
  const options: Array<[Style, string, number, number]> = [
    ['casual', 'Casual', 281, 285],
    ['elegant', 'Elegante', 286, 285],
    ['urban', 'Urbano', 284, 284],
    ['sport', 'Deportivo', 555, 750]
  ]

  return (
    <>
      <h1 className="mb-6 font-bold text-3xl text-center">Descríbenos tu estilo:</h1>
      <div
        className={twJoin(
          'max-w-lg grid grid-cols-2 gap-x-5 gap-y-7 sm:gap-x-7 sm:gap-y-8',
          'lg:max-w-6xl lg:landscape:grid-cols-4'
        )}
      >
        {options.map(([value, label, width, height]) => (
          <div key={value}>
            <Image
              className="mb-5 aspect-[6/7] rounded-md object-cover object-top"
              src={`images/${value}.webp`}
              alt=""
              width={width}
              height={height}
              priority
            />
            <Button
              className={twJoin(classes.button, 'w-full')}
              onClick={() => handleClick({ style: value })}
            >
              {label}
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}
