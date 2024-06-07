import Image from 'next/image'
import { createClient } from '~/lib/supabase'

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { data } = await supabase.storage.from('outfits').list(user?.email)

  return (
    <main className="max-w-6xl mx-auto p-6 bg-default/75 rounded-lg shadow-lg">
      <div className="  grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data
          ?.filter(({ name }) => name.endsWith('.webp'))
          .map(({ id, name }) => (
            <Image
              className="rounded"
              src={`outfits/${user?.email}/${name}`}
              alt=""
              key={id}
              width={512}
              height={512}
              priority
            />
          ))}
      </div>
    </main>
  )
}
