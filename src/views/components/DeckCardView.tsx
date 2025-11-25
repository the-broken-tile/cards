import * as React from "react"
import { FormEvent, JSX } from "react"
import { NumberField } from "@base-ui-components/react/number-field"

import DeckCard from "../../lib/dto/DeckCard"

type Props = {
  card: DeckCard
  onChange: (value: number) => void
}

export default function DeckCardView({card, onChange}: Props): JSX.Element {
  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    const target: HTMLInputElement = e.target as HTMLInputElement
    const n: number = Number(target.value)
    if (isNaN(n)) {
      return
    }

    onChange(n)
  }
  const handleIncrease = (): void => {
    onChange(card.count + 1)
  }

  const handleDecrease = (): void => {
    onChange(card.count - 1)
  }

  return <>
    <NumberField.Root>
      <NumberField.ScrubArea>
        <label>{card.name}</label>
      </NumberField.ScrubArea>
      <NumberField.Group>
        <NumberField.Decrement onClick={handleDecrease}>
          -
        </NumberField.Decrement>
        <NumberField.Input value={card.count} onInput={handleChange}/>
        <NumberField.Increment onClick={handleIncrease}>
          +
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  </>
}
