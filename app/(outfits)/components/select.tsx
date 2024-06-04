import type { PropsWithChildren } from 'react'
import { twJoin } from 'tailwind-merge'

interface Props extends PropsWithChildren {
  className?: string
  label: string
  id: string
  value: string
  handleChange: (value: string) => void
}

export default function Select({
  className,
  label,
  id,
  value,
  children,
  handleChange
}: Props) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block">
        {label}
      </label>
      <select
        className={twJoin(
          'block mt-2 bg-grey w-full rounded-md border-0 py-1.5 shadow-sm ring-1',
          'ring-inset ring-primary/60 focus:ring-2 focus:ring-inset',
          'focus:ring-primary/70 sm:max-w-xs sm:text-sm sm:leading-6'
        )}
        name={id}
        id={id}
        value={value}
        onChange={({ currentTarget: { value } }) => handleChange(value)}
      >
        <option hidden />
        {children}
      </select>
    </div>
  )
}
