import type { UserMetadata } from '@supabase/supabase-js'
import { colord, extend } from 'colord'
import namesPlugin from 'colord/plugins/names'
import get from 'just-safe-get'
import { useEffect, useReducer, useState, useTransition } from 'react'
import { generateOutfit } from '~/lib/actions'
import useGarmentData from './use-garment-data'

extend([namesPlugin])

function reducer(state: Record<string, string>, payload: Record<string, string>) {
  return { ...state, ...payload }
}

export default function useGarments(userData: UserMetadata) {
  const { gender, size, hairColor, skinColor } = userData
  const data = useGarmentData()
  const [style, setStyle] = useState<string>(userData.style)
  const [outfit, setOutfit] = useState<string>()
  const [isLoading, startTransition] = useTransition()
  const [state, dispatch] = useReducer(reducer, {
    top: get(data, `${gender}.${style}.top`)[0][0],
    bottom: get(data, `${gender}.${style}.bottom`)[0][0],
    shoes: get(data, `${gender}.${style}.shoes`)[0][0]
  })

  function generate(color: string) {
    startTransition(async () => {
      setOutfit(undefined)

      const image = await generateOutfit(
        gender,
        size,
        hairColor,
        skinColor,
        style,
        Object.values(state),
        colord(color).toName({ closest: true })!
      )

      setOutfit(image)
    })
  }

  useEffect(() => {
    dispatch({
      top: get(data, `${gender}.${style}.top`)[0][0],
      bottom: get(data, `${gender}.${style}.bottom`)[0][0],
      shoes: get(data, `${gender}.${style}.shoes`)[0][0]
    })
  }, [style])

  return {
    isLoading,
    styleState: { value: style, setValue: setStyle },
    outfitState: { value: outfit, setValue: setOutfit },
    reducer: { state, dispatch },
    generate
  }
}
