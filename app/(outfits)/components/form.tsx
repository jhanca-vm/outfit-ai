'use client'

import { type FormEvent, useState, useTransition } from 'react'
import { twJoin } from 'tailwind-merge'
import Button from '~/components/button'
import { updateUser } from '~/lib/actions'
import Fields from './fields'

export default function Form() {
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    startTransition(async () => {
      await updateUser(Object.fromEntries(new FormData(event.currentTarget)))
    })
  }

  return (
    <main
      className={
        'relative isolate min-h-svh overflow-hidden grid place-items-center px-6 py-24'
      }
    >
      <div
        className={twJoin(
          'absolute inset-0 -z-10 opacity-20',
          'bg-[radial-gradient(45rem_50rem_at_top,theme(colors.grey),white)]'
        )}
      />
      <div
        className={twJoin(
          'absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left',
          'skew-x-[-30deg] bg-white shadow-xl shadow-primary/10 ring-1',
          'ring-default sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center'
        )}
      />
      {isStarted ? (
        <form onSubmit={handleSubmit}>
          <Fields handleChanges={setIsCompleted} />
          <Button
            className="mt-6 ml-auto px-6 items-center gap-1 disabled:bg-primary/40"
            disabled={!isCompleted}
            loading={isPending}
          >
            Guardar
          </Button>
        </form>
      ) : (
        <section className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            ¡Bienvenid@ a OutfitAI!
          </h1>
          <p className="my-6 text-lg leading-8 text-balance text-primary/80">
            Responde unas breves preguntas para que descubras cuáles son los outfits
            perfectos para tu perfil.
          </p>
          <Button className="mx-auto px-8" onClick={() => setIsStarted(true)}>
            Comenzar
          </Button>
        </section>
      )}
    </main>
  )
}
