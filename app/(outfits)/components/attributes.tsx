import {
  Button,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition
} from '@headlessui/react'
import type { UserMetadata } from '@supabase/supabase-js'
import { twJoin, twMerge } from 'tailwind-merge'
import classes from '~/lib/classes'
import useAttributes from '../hooks/use-attributes'

interface Props {
  handleClick: (data: UserMetadata, revalidate?: boolean) => void
}

export default function Attributes({ handleClick }: Props) {
  const { state, data, set } = useAttributes()

  return (
    <>
      <h1 className="mb-6 text-center font-bold text-3xl">Selecciona tus atributos</h1>
      <div className="w-80 grid grid-cols-[max-content_1fr] gap-5 sm:w-96 sm:gap-x-7">
        {data.map(([[id, label], options]) => {
          const selected = options.find(([, value]) => value === state[id])

          return (
            <Listbox
              value={selected?.[1] || ''}
              onChange={value => set({ [id]: value })}
              key={id}
            >
              {({ open }) => (
                <>
                  <Label className="self-center text-lg">{label}</Label>
                  <div className="relative flex">
                    <ListboxButton
                      className={twJoin(
                        'relative w-full h-[2.125rem] pb-1.5 pt-1 pl-2 pr-8 bg-grey',
                        'rounded-md text-left  outline-none focus:shadow-sm focus:ring-1',
                        'focus:ring-inset focus:ring-primary/5'
                      )}
                    >
                      <span>{selected?.[0]}</span>
                      <svg
                        className={twJoin(
                          'absolute inset-y-0 right-0 my-auto w-5 mr-1.5 fill-none',
                          'stroke-2 stroke-primary/40'
                        )}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6l6 -6" />
                      </svg>
                    </ListboxButton>
                    <Transition
                      show={open}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ListboxOptions
                        className={twJoin(
                          'w-[var(--button-width)] max-h-40 bg-white rounded-md',
                          'shadow-lg ring-1 ring-inset ring-primary/5 outline-none'
                        )}
                        anchor={{ to: 'bottom start', gap: 4, padding: 24 }}
                      >
                        {options.map(([label, value]) => (
                          <ListboxOption
                            className={({ focus }) => {
                              return twJoin(focus && 'bg-grey/80', 'pb-1.5 pt-1 px-2')
                            }}
                            value={value}
                            key={value}
                          >
                            {label}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          )
        })}
      </div>
      <Button
        className={twMerge(classes.button, 'block w-24 text-base mt-6 mx-auto py-1.5')}
        disabled={Object.values(state).length !== 4}
        onClick={() => handleClick({ ...state, is_complete: true }, true)}
      >
        Guardar
      </Button>
    </>
  )
}
