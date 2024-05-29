import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { createClient } from '../lib/supabase'

export default async function Layout({ children }: PropsWithChildren) {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) return redirect('/')

  return <main>{children}</main>
}
