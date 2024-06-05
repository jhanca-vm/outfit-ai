import { twMerge } from 'tailwind-merge'

interface Props {
  data: string[][]
  selectedTab: string
  handleClick: (tab: string) => void
}

export default function Tabs({ data, selectedTab, handleClick }: Props) {
  return (
    <>
      <select className="w-full rounded-md border-primary/20 sm:hidden">
        {data.map(([tab, name]) => (
          <option value={tab} key={tab}>
            {name}
          </option>
        ))}
      </select>
      <div className="hidden border-b border-primary/30 sm:block">
        <nav className="-mb-px flex justify-center gap-6">
          {data.map(([tab, name]) => (
            <button
              className={twMerge(
                'shrink-0 border border-transparent p-3 text-sm text-primary/70',
                'transition-colors hover:text-primary/90',
                tab === selectedTab &&
                  'rounded-t-lg border-primary/30 border-b-grey !text-primary'
              )}
              type="button"
              key={tab}
              onClick={() => handleClick(tab)}
            >
              {name}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
