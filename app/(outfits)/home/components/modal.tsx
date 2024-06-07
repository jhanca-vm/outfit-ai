import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import { useEffect, useState, useTransition } from 'react'
import { twJoin } from 'tailwind-merge'
import Button from '~/components/button'
import { saveOutfit } from '~/lib/actions'

interface Props {
  user: string
  outfit?: string
  setOutfit: (outfit?: string) => void
}

export default function Modal({ user, outfit, setOutfit }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function save() {
    startTransition(async () => {
      await saveOutfit(user, outfit!)

      setOpen(false)
      setOutfit(undefined)
    })
  }

  useEffect(() => {
    if (outfit) setOpen(true)
  }, [outfit])

  return (
    <Transition show={open}>
      <Dialog
        className="relative z-10"
        onClose={value => {
          if (!isPending) setOpen(value)
        }}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary bg-opacity-50 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className={
              'flex min-h-full items-center justify-center p-4 text-center sm:p-0'
            }
          >
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={twJoin(
                  'relative transform overflow-hidden rounded-lg bg-default shadow-xl',
                  'transition-all sm:my-8 sm:w-full sm:max-w-lg'
                )}
              >
                <div className="bg-default px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  {outfit && (
                    <Image src={outfit} alt="" width={1024} height={1024} unoptimized />
                  )}
                </div>
                <div className="bg-grey px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button
                    className="w-full disabled:opacity-50 sm:ml-3 sm:w-auto"
                    loading={isPending}
                    onClick={save}
                  >
                    Guardar
                  </Button>
                  <Button
                    className={twJoin(
                      'mt-3 w-full bg-danger hover:bg-danger/95 sm:mt-0 sm:w-auto',
                      'disabled:opacity-50'
                    )}
                    disabled={isPending}
                    onClick={() => setOpen(false)}
                  >
                    Descartar
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
