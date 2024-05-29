'use client'

import clsx from 'clsx'
import { type FormEvent, useRef, useState, useTransition } from 'react'
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
        <input
          className={
            'w-72 rounded-md text-lg focus:border-primary focus:ring-primary sm:w-80'
          }
          type="email"
          name="email"
          placeholder="Ingresa tu correo"
        />
        {message && (
          <span
            className={clsx(
              'block text-sm',
              { 'animate-in fade-in': !isPending },
              { 'text-danger': hasError }
            )}
          >
            *{message}
          </span>
        )}
      </label>
      <button
        className={clsx(
          'w-72 p-2 rounded-md bg-primary/95 font-bold text-lg text-default',
          'transition-colors hover:bg-primary disabled:bg-primary/85',
          'disabled:animate-pulse sm:w-80'
        )}
        type="submit"
        disabled={isPending}
      >
        Obtener enlace de acceso
      </button>
    </form>
  )
}
