'use client'

import type { ImageLoaderProps } from 'next/image'

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${src}`
  )

  url.searchParams.set('width', width.toString())
  url.searchParams.set('quality', (quality || 75).toString())

  return url.href
}
