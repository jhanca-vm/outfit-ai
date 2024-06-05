import type { UserMetadata } from '@supabase/supabase-js'
import get from 'just-safe-get'
import { useReducer, useState, useTransition } from 'react'
import { generateOutfit } from '~/lib/actions'

const tabs = [
  ['top', 'Prenda Superior'],
  ['bottom', 'Prenda Inferior'],
  ['shoes', 'Calzados']
]

const data = {
  man: {
    casual: {
      top: [
        ['t-shirt', 'Camiseta'],
        ['sweatshirt', 'Sudadera'],
        ['jacket', 'Chaqueta']
      ],
      bottom: [
        ['jeans', 'Jeans'],
        ['joggers', 'Joggers'],
        ['shorts', 'Shorts']
      ],
      shoes: [
        ['sneakers', 'Tenis'],
        ['loafers', 'Mocasines']
      ]
    },
    sporty: {
      top: [
        ['t-shirt', 'Camiseta'],
        ['sweatshirt', 'Sudadera']
      ],
      bottom: [
        ['joggers', 'Joggers'],
        ['shorts', 'Shorts']
      ],
      shoes: [['running shoes', 'Tenis']]
    },
    urban: {
      top: [
        ['hoodie', 'Sudadera'],
        ['jacket', 'Chaqueta']
      ],
      bottom: [
        ['jeans', 'Jeans'],
        ['joggers', 'Joggers']
      ],
      shoes: [
        ['vans', 'Vans'],
        ['boots', 'Botas']
      ]
    },
    elegant: {
      top: [
        ['shirt', 'Camisa'],
        ['blazer', 'Blazer']
      ],
      bottom: [['dress pants', 'Clásico']],
      shoes: [
        ['oxford shoes', 'Oxford'],
        ['brogues', 'Brogue']
      ]
    }
  }
}

function reducer(state: Record<string, string>, payload: Record<string, string>) {
  return { ...state, ...payload }
}

export default function useGarments(userData: UserMetadata) {
  const { gender, style, hairColor, skinColor } = userData
  const [state, dispatch] = useReducer(reducer, {
    top: get(data, `${gender}.${style}.top`)[0][0],
    bottom: get(data, `${gender}.${style}.bottom`)[0][0],
    shoes: get(data, `${gender}.${style}.shoes`)[0][0]
  })
  const [outfit, setOutfit] = useState<string>()
  const [isLoading, startTransition] = useTransition()

  function generate() {
    startTransition(async () => {
      setOutfit(undefined)

      const image = await generateOutfit(
        gender,
        hairColor,
        skinColor,
        style,
        Object.values(state)
      )

      setOutfit(image)
    })
  }

  return { tabs, data, state, outfit, isLoading, dispatch, generate }
}
