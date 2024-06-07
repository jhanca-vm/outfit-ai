'use client'

import type { UserMetadata } from '@supabase/supabase-js'
import { Fragment, useState } from 'react'
import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/css'
import { twJoin } from 'tailwind-merge'
import Button from '~/components/button'
import useGarments from '../hooks/use-garments'
import Garment from './garment'
import Tabs from './tabs'
import Modal from './modal'
import IconChevron from './icon-chevron'

interface Props {
  userData: UserMetadata
}

export default function Garments({ userData }: Props) {
  const { isLoading, styleState, outfitState, reducer, generate } = useGarments(userData)
  const [selectedTab, setSelectedTab] = useState('top')
  const [color, setColor] = useColor('#343f4b')

  const styles = [
    ['casual', 'Casual'],
    ['elegant', 'Elegante'],
    ['urban', 'Urbano'],
    ['sporty', 'Deportivo']
  ]

  const tabs = [
    ['top', 'Prenda Superior'],
    ['bottom', 'Prenda Inferior'],
    ['shoes', 'Calzados']
  ]

  return (
    <>
      <nav
        className={twJoin(
          'my-2 py-1 px-2 bg-default/65 rounded shadow-sm md:col-span-3',
          isLoading && 'pointer-events-none'
        )}
      >
        <ul className="flex items-center gap-1 text-sm">
          {styles.map(([style, name], index) => (
            <Fragment key={style}>
              {index !== 0 && (
                <li>
                  <IconChevron />
                </li>
              )}
              <li
                className={style === styleState.value ? 'font-bold' : 'text-primary/90'}
              >
                <button type="button" onClick={() => styleState.setValue(style)}>
                  {name}
                </button>
              </li>
            </Fragment>
          ))}
        </ul>
      </nav>
      <section
        className={twJoin(
          'pt-6 md:col-span-2 md:pr-12 lg:pr-16',
          isLoading && 'pointer-events-none'
        )}
      >
        <Tabs data={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <Garment
          gender={userData.gender}
          style={styleState.value}
          selectedTab={selectedTab}
          state={reducer.state}
          dispatch={reducer.dispatch}
        />
      </section>
      <section className="w-full max-w-xs mx-auto pt-4">
        <h3 className="mb-2 text-center text-primary/90">Color principal</h3>
        <ColorPicker
          hideAlpha
          hideInput={['rgb', 'hsv']}
          color={color}
          onChange={setColor}
        />
        <Button
          className="w-full mt-6 disabled:opacity-25 disabled:pointer-events-none"
          loading={isLoading}
          onClick={() => generate(color.hex)}
        >
          Generar Outfit
        </Button>
      </section>
      <Modal
        user={userData.email}
        outfit={outfitState.value}
        setOutfit={outfitState.setValue}
      />
    </>
  )
}
