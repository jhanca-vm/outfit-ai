'use server'

import type { UserMetadata } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { email, pipe, safeParse, string } from 'valibot'
import { createClient } from './supabase'

export async function signIn(formData: FormData) {
  const result = safeParse(pipe(string(), email()), formData.get('email'))

  if (!result.success) return { hasError: true, message: 'Ingrese un correo válido.' }

  const supabase = createClient()

  await supabase.auth.signInWithOtp({
    email: result.output,
    options: { emailRedirectTo: `${headers().get('origin')}/auth` }
  })

  return { hasError: false, message: 'Se ha enviado un enlace a tu correo.' }
}

export async function updateUser(data: UserMetadata, revalidate = false) {
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.updateUser({ data })

  if (revalidate) revalidatePath('/home', 'layout')

  return user!.user_metadata
}
