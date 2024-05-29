import { type CookieMethods, createServerClient } from '@supabase/ssr'
import type { SupabaseClientOptions } from '@supabase/supabase-js'
import isEmpty from 'just-is-empty'
import { cookies } from 'next/headers'

interface Options extends SupabaseClientOptions<'public'> {
  cookies: CookieMethods
}

export function createClient(options: Options = { cookies: {} }) {
  if (isEmpty(options.cookies)) {
    const cookieStore = cookies()

    options.cookies = {
      get: key => cookieStore.get(key)?.value,
      set(key, value, options) {
        cookieStore.set({ name: key, value, ...options })
      },
      remove(key, options) {
        cookieStore.set({ name: key, value: '', ...options })
      }
    }
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || '',
    options
  )
}
