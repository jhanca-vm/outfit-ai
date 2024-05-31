'use client'

import { Button } from '@headlessui/react'
import type { UserMetadata } from '@supabase/supabase-js'
import { useState, useTransition } from 'react'
import Loading from '~/components/loading'
import { updateUser } from '~/lib/actions'
import classes from '~/lib/classes'
import Attributes from './attributes'
import Sex from './sex'
import Style from './style'

interface Props {
  metadata: UserMetadata
}

export default function Form({ metadata }: Props) {
  const [data, setData] = useState(metadata)
  const [isStarted, setIsStarted] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleClick(data: UserMetadata, revalidate = false) {
    startTransition(async () => setData(await updateUser(data, revalidate)))
  }

  return (
    <main className="min-h-svh grid place-items-center">
      <section className="p-6 pb-12">
        {isPending ? (
          <Loading />
        ) : !isStarted ? (
          <div className="text-center">
            <h1 className="font-bold text-3xl">
              <span className="block">Hola...</span>
              ¡Bienvenid@ a OutfitAI!
            </h1>
            <p className="mt-3 mb-6 max-w-lg text-lg sm:text-xl">
              ¡Responde a estas breves preguntas para que descubras cuáles son los outfits
              perfectos para tu perfil!
            </p>
            <Button className={classes.button} onClick={() => setIsStarted(true)}>
              Comenzar
            </Button>
          </div>
        ) : !Object.hasOwn(data, 'sex') ? (
          <Sex handleClick={handleClick} />
        ) : !Object.hasOwn(data, 'style') ? (
          <Style handleClick={handleClick} />
        ) : (
          <Attributes handleClick={handleClick} />
        )}
      </section>
    </main>
  )
}
