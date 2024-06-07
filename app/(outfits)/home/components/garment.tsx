import kebabCase from 'just-kebab-case'
import get from 'just-safe-get'
import Image from 'next/image'
import type { Dispatch } from 'react'
import { twJoin } from 'tailwind-merge'
import useGarmentData from '../hooks/use-garment-data'

interface Props {
  gender: string
  style: string
  selectedTab: string
  state: Record<string, string>
  dispatch: Dispatch<Record<string, string>>
}

export default function Garment({ gender, style, selectedTab, state, dispatch }: Props) {
  const data = useGarmentData()

  return (
    <div className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-3">
      {get(data, `${gender}.${style}.${selectedTab}`).map(
        ([id, label]: [string, string]) => (
          <button
            className={twJoin(
              'group rounded-lg font-bold tracking-wide disabled:opacity-80',
              'disabled:ring-2 disabled:ring-primary'
            )}
            type="button"
            disabled={state?.[selectedTab] === id}
            key={id}
            onClick={() => dispatch({ [selectedTab]: id })}
          >
            <figure
              className={twJoin(
                'relative mb-1 aspect-[5/6] overflow-hidden rounded-lg',
                'pointer-events-none'
              )}
            >
              <Image
                className={twJoin(
                  'object-cover object-center',
                  state?.[selectedTab] !== id && 'group-hover:opacity-75'
                )}
                src={`garments/${gender}/${style}/${selectedTab}/${kebabCase(id)}.webp`}
                alt=""
                fill
                sizes="50vw"
                priority
              />
            </figure>
            {label}
          </button>
        )
      )}
    </div>
  )
}
