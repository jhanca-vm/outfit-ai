import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { createClient } from '../lib/supabase'
import Form from './components/form'

export default async function Layout({ children }: PropsWithChildren) {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) return redirect('/')

  const { user_metadata } = user

  if (!user_metadata.is_complete) return <Form metadata={user_metadata} />

  return <main>{children}</main>
}
