'use client'

import { Button, Input, Transition } from '@headlessui/react'
import { type FormEvent, useRef, useState, useTransition } from 'react'
import { twJoin } from 'tailwind-merge'
import classes from '~/lib/classes'
import { signIn } from '../lib/actions'

export default function Form() {
  const ref = useRef<HTMLFormElement>(null)
  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState<string>()
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    startTransition(async () => {
      const { hasError, message } = await signIn(new FormData(ref.current!))

      if (!hasError) ref.current?.reset()

      setHasError(hasError)
      setMessage(message)
    })
  }

  return (
    <form
      ref={ref}
      className="grid justify-center lg:landscape:justify-start"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="my-5">
        <Input
          className={
            'w-72 rounded-md text-lg focus:border-primary focus:ring-primary sm:w-80'
          }
          type="email"
          name="email"
          placeholder="Ingresa tu correo"
        />
        <Transition
          show={!isPending && !!message}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <span className={twJoin('block text-sm', hasError && 'text-danger')}>
            *{message}
          </span>
        </Transition>
      </label>
      <Button
        className={twJoin(classes.button, 'disabled:animate-pulse sm:w-80')}
        type="submit"
        disabled={isPending}
      >
        Obtener enlace de acceso
      </Button>
    </form>
  )
}
