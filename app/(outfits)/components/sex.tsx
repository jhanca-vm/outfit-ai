import { Button } from '@headlessui/react'
import type { UserMetadata } from '@supabase/supabase-js'
import Image from 'next/image'
import { twJoin } from 'tailwind-merge'
import classes from '~/lib/classes'

type Sex = 'woman' | 'man'

interface Props {
  handleClick: (data: UserMetadata) => void
}

export default function Sex({ handleClick }: Props) {
  const options: Array<[Sex, string, number, number]> = [
    ['woman', 'Mujer', 564, 564],
    ['man', 'Hombre', 593, 704]
  ]

  return (
    <>
      <h1 className="font-bold text-4xl text-center">Soy:</h1>
      <div className="max-w-2xl grid grid-cols-2 gap-5 md:gap-7">
        {options.map(([value, label, width, height]) => (
          <div key={value}>
            <Image
              className="my-6 aspect-[4/5] rounded-md object-cover"
              src={`images/${value}.webp`}
              alt=""
              width={width}
              height={height}
              priority
            />
            <Button
              className={twJoin(classes.button, 'w-full')}
              onClick={() => handleClick({ sex: value })}
            >
              {label}
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}
