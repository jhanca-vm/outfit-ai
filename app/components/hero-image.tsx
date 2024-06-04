'use client'

import Image from 'next/image'
import { twJoin } from 'tailwind-merge'

interface Props {
  className?: string
  src: string
}

function loader({ src }: { src: string }) {
  return `https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-${src}`
}

export default function HeroImage({ className, src }: Props) {
  return (
    <figure
      className={twJoin('relative h-64 w-44 overflow-hidden rounded-lg', className)}
    >
      <Image
        className="object-cover object-center"
        loader={loader}
        src={src}
        alt=""
        fill
        sizes="50vw"
        priority
      />
    </figure>
  )
}
