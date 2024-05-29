import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from './app/lib/supabase'

export async function middleware(request: NextRequest) {
  const nextResponse = () => NextResponse.next({ request: { headers: request.headers } })

  let response = nextResponse()

  const supabase = createClient({
    cookies: {
      get: key => request.cookies.get(key)?.value,
      set(key, value, options) {
        const cookie = { name: key, value, ...options }

        request.cookies.set(cookie)
        response = nextResponse()
        response.cookies.set(cookie)
      },
      remove(key, options) {
        const cookie = { name: key, value: '', ...options }

        request.cookies.set(cookie)
        response = nextResponse()
        response.cookies.set(cookie)
      }
    }
  })

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}
