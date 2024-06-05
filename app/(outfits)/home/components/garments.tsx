'use client'

import kebabCase from 'just-kebab-case'
import get from 'just-safe-get'
import Image from 'next/image'
import { useState } from 'react'
import { twJoin } from 'tailwind-merge'
import useGarments from '../hooks/use-garments'
import Tabs from './tabs'
import Button from '~/components/button'
import type { UserMetadata } from '@supabase/supabase-js'

interface Props {
  userData: UserMetadata
}

export default function Garments({ userData }: Props) {
  const { gender, style } = userData
  const { tabs, data, state, outfit, isLoading, dispatch, generate } =
    useGarments(userData)
  const [selectedTab, setSelectedTab] = useState('top')

  return (
    <>
      <section className={isLoading ? 'pointer-events-none' : undefined}>
        <Tabs data={tabs} selectedTab={selectedTab} handleClick={setSelectedTab} />
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
                    src={`garments/${gender}/${style}/${selectedTab}/${kebabCase(
                      id
                    )}.webp`}
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
      </section>
      <section className="w-full max-w-xs mx-auto">
        <figure
          className={twJoin(
            'relative aspect-square bg-primary/10 overflow-hidden rounded-lg',
            'border-2 border-dashed border-primary/20',
            isLoading && 'bg-gradient-to-r from-primary/10 to-primary/5 animate-pulse'
          )}
        >
          {outfit && <Image src={outfit} alt="" fill sizes="50vw" unoptimized />}
        </figure>
        <Button
          className="w-full mt-6 disabled:opacity-25 disabled:pointer-events-none"
          loading={isLoading}
          onClick={generate}
        >
          Generar Outfit
        </Button>
      </section>
    </>
  )
}
