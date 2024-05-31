import merge from 'just-merge'
import { useReducer } from 'react'

interface State {
  hair_color?: string
  skin_color?: string
  eye_color?: string
  size?: string
}

function reducer(state: State, payload: Record<string, string>) {
  return merge({}, state, payload)
}

export default function useAttributes() {
  const [state, set] = useReducer(reducer, {})
  const data: Array<[[keyof State, string], Array<[string, string]>]> = [
    [
      ['hair_color', 'Color de cabello'],
      [
        ['Negro', 'black'],
        ['Castaño', 'brown'],
        ['Rubio', 'blonde'],
        ['Rojo', 'red'],
        ['Blanco', 'white']
      ]
    ],
    [
      ['skin_color', 'Color de piel'],
      [
        ['Clara', 'light'],
        ['Morena', 'medium'],
        ['Oscura', 'dark']
      ]
    ],
    [
      ['eye_color', 'Color de ojos'],
      [
        ['Negro', 'black'],
        ['Azul', 'blue'],
        ['Verde', 'green'],
        ['Marrón', 'brown'],
        ['Avellana', 'hazel'],
        ['Ámbar', 'amber'],
        ['Gris', 'grey']
      ]
    ],
    [
      ['size', 'Talla'],
      [
        ['S', 'small'],
        ['M', 'medium'],
        ['L', 'large'],
        ['XL', 'extra large'],
        ['XXL', 'double extra large']
      ]
    ]
  ]

  return { state, data, set }
}
