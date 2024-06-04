'use client'

import { Transition } from '@headlessui/react'
import { type FormEvent, useRef, useState, useTransition } from 'react'
import { twJoin } from 'tailwind-merge'
import { signIn } from '../lib/actions'
import Button from './button'

export default function Form() {
  const ref = useRef<HTMLFormElement>(null)
  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState<string>()
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    startTransition(async () => {
      const { hasError, message } = await signIn(new FormData(ref.current!))

      if (hasError) ref.current?.email.focus()

      setHasError(hasError)
      setMessage(message)
    })
  }

  return (
    <form ref={ref} className="my-10 max-w-xs" noValidate onSubmit={handleSubmit}>
      <label htmlFor="email" className="block mb-2">
        Ingresa tu correo
      </label>
      <input
        className={twJoin(
          'block w-full rounded-md border-0 py-1.5 shadow-sm text-primary/80 ring-1',
          'ring-inset ring-primary/60 focus:ring-2 focus:ring-inset',
          hasError ? 'focus:ring-danger/70' : 'focus:ring-primary/70'
        )}
        type="email"
        name="email"
        id="email"
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
        <span className={twJoin('pl-1 text-sm', hasError && 'text-danger')}>
          {message}
        </span>
      </Transition>
      <Button
        className="mt-5 w-full disabled:animate-pulse"
        type="submit"
        disabled={isPending}
      >
        Obtener enlace de acceso
      </Button>
    </form>
  )
}
