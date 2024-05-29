import clsx from 'clsx/lite'
import Image from 'next/image'
import { permanentRedirect } from 'next/navigation'
import Form from './components/form'
import { createClient } from './lib/supabase'

export default async function Page() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) return permanentRedirect('/home')

  return (
    <main
      className={
        'min-h-svh max-w-7xl mx-auto flex p-6 sm:p-12 md:p-16 lg:items-center lg:pb-24'
      }
    >
      <section
        className={clsx(
          'w-full flex flex-col items-center gap-10 sm:gap-12',
          'lg:landscape:flex-row-reverse lg:landscape:*:flex-1'
        )}
      >
        <figure>
          <Image
            className="mx-auto rounded-lg"
            src="images/hero.webp"
            alt=""
            width={626}
            height={417}
            priority
          />
        </figure>
        <div className="text-center lg:landscape:text-left">
          <h1 className="text-5xl uppercase md:text-6xl">Outfit AI</h1>
          <p
            className={
              'my-3 text-xl text-balance sm:my-4 md:text-2xl lg:text-3xl lg:text-pretty'
            }
          >
            Genera tu propio outfit de acuerdo a tus atributos.
          </p>
          <Form />
        </div>
      </section>
    </main>
  )
}
