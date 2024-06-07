'use server'

import type { UserMetadata } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import OpenAI from 'openai'
import sharp from 'sharp'
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

export async function updateUser(data: UserMetadata) {
  const supabase = createClient()

  await supabase.auth.updateUser({ data })

  revalidatePath('/home', 'layout')
}

export async function signOut() {
  const supabase = createClient()

  await supabase.auth.signOut()

  redirect('/')
}

export async function generateOutfit(
  gender: string,
  size: string,
  hairColor: string,
  skinColor: string,
  style: string,
  garments: string[],
  color: string
) {
  const [top, bottom, shoes] = garments
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const {
    data: [{ url }]
  } = await openai.images.generate({
    model: 'dall-e-3',
    prompt:
      `a ${gender} with ${size} size, ${hairColor} hair and ${skinColor} skin tone. He ` +
      `is wearing an ${style} style outfit. The outfit consists of a ${color} ${top}, ` +
      `${bottom} and ${shoes}. The entire body is visible.`,
    style: 'natural'
  })

  return url
}

export async function saveOutfit(user: string, url: string) {
  const supabase = createClient()
  const outfit = await fetch(url).then(response => response.arrayBuffer())
  const buffer = await sharp(outfit).resize(512, 512).webp().toBuffer()

  await supabase.storage.from('outfits').upload(`${user}/${nanoid()}.webp`, buffer, {
    contentType: 'image/webp'
  })
}
