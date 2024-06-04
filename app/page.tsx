import { permanentRedirect } from 'next/navigation'
import { twJoin } from 'tailwind-merge'
import Form from './components/form'
import HeroImage from './components/hero-image'
import { createClient } from './lib/supabase'

export default async function Page() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) return permanentRedirect('/home')

  return (
    <main
      className={
        'relative h-svh overflow-hidden pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40'
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <section className="sm:max-w-lg">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Outfit AI</h1>
          <p className="mt-4 text-xl text-primary/80">
            Genera tu propio outfit de acuerdo a tus atributos.
          </p>
          <Form />
        </section>
        <section
          aria-hidden="true"
          className={twJoin(
            'pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full',
            'lg:max-w-7xl'
          )}
        >
          <div
            className={twJoin(
              'absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2',
              'lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'
            )}
          >
            <div
              className={twJoin(
                'flex items-center space-x-6 lg:space-x-8 *:grid *:flex-shrink-0',
                '*:grid-cols-1 *:gap-y-6 *:lg:gap-y-8'
              )}
            >
              <div>
                <HeroImage className="sm:opacity-0 lg:opacity-100" src="01.jpg" />
                <HeroImage src="02.jpg" />
              </div>
              <div>
                <HeroImage src="03.jpg" />
                <HeroImage src="04.jpg" />
                <HeroImage src="05.jpg" />
              </div>
              <div>
                <HeroImage src="06.jpg" />
                <HeroImage src="07.jpg" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
