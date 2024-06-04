import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  loading?: boolean
}

export default function Button({
  className,
  disabled,
  loading,
  children,
  ...rest
}: Props) {
  return (
    <button
      className={twMerge(
        'flex items-center justify-center gap-x-1 rounded-md bg-primary px-3 py-2',
        'font-bold text-default tracking-wide shadow-sm transition-colors',
        'hover:bg-primary/95 focus-visible:outline focus-visible:outline-2',
        'focus-visible:outline-offset-2 focus-visible:outline-primary',
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <svg
          className="w-[1em] fill-none stroke-2 stroke-current animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinecap="round"
        >
          <path d="M12 3a9 9 0 1 0 9 9" />
        </svg>
      )}
      {children}
    </button>
  )
}
