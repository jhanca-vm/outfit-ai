import { createClient } from '~/lib/supabase'
import Garments from './components/garments'

export default async function Page() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  const userData = data.user!.user_metadata

  return (
    <main className="mx-auto max-w-6xl px-6 pb-12 grid md:grid-cols-3">
      <Garments userData={userData} />
    </main>
  )
}
