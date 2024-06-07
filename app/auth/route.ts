import { NextResponse } from 'next/server'
import { createClient } from '../lib/supabase'

export async function GET(request: Request) {
  console.log(
    request.headers.get('host'),
    request.headers.get('x-forwarded-host'),
    request.headers.get('x-forwarded-for'),
  )
  
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  if (code) {
    const supabase = createClient()

    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${url.origin}/home`)
}
