import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
}

export default function Loading({ className }: Props) {
  return (
    <svg
      className={twMerge(
        'animate-spin w-16 fill-none stroke-2 stroke-primary/95',
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  )
}
