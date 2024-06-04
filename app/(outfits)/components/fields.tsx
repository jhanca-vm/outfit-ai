import { useEffect, useState } from 'react'
import Select from './select'

interface Props {
  handleChanges: (areCompleted: boolean) => void
}

export default function Fields({ handleChanges }: Props) {
  const [gender, setGender] = useState('')
  const [style, setStyle] = useState('')
  const [hairColor, setHairColor] = useState('')
  const [skinColor, setSkinColor] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    handleChanges(Boolean(gender && style && hairColor && skinColor && size))
  }, [handleChanges, gender, style, hairColor, skinColor, size])

  return (
    <div
      className={'grid gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-primary/50 pb-12'}
    >
      <Select
        className="sm:col-span-3"
        label="¿Cuál es su género?"
        id="gender"
        value={gender}
        handleChange={setGender}
      >
        <option value="woman">Mujer</option>
        <option value="man">Hombre</option>
      </Select>
      <Select
        className="sm:col-span-3"
        label="Descríbenos tu estilo"
        id="style"
        value={style}
        handleChange={setStyle}
      >
        {gender && (
          <>
            <option value="casual">Casual</option>
            <option value="elegant">Elegante</option>
            <option value="urban">Urbano</option>
            <option value="sporty">Deportivo</option>
            {gender === 'woman' && (
              <>
                <option value="sexy">Sexy</option>
                <option value="romantic">Romántico</option>
              </>
            )}
          </>
        )}
      </Select>
      <Select
        className="sm:col-span-2"
        label="Color de cabello"
        id="hair_color"
        value={hairColor}
        handleChange={setHairColor}
      >
        <option value="black">Negro</option>
        <option value="brown">Castaño</option>
        <option value="blonde">Rubio</option>
        <option value="red">Rojo</option>
      </Select>
      <Select
        className="sm:col-span-2"
        label="Color de piel"
        id="skin_color"
        value={skinColor}
        handleChange={setSkinColor}
      >
        <option value="light">Clara</option>
        <option value="medium">Morena</option>
        <option value="dark">Oscura</option>
      </Select>
      <Select
        className="sm:col-span-2"
        label="Talla"
        id="size"
        value={size}
        handleChange={setSize}
      >
        <option value="small">S</option>
        <option value="medium">M</option>
        <option value="large">L</option>
        <option value="extra large">XL</option>
        <option value="double extra large">XXL</option>
      </Select>
    </div>
  )
}
