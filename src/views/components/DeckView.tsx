import React, { JSX } from "react"
import { List, ListItem } from "@mui/material"

import Deck from "../../lib/dto/Deck"
import DeckCard from "../../lib/dto/DeckCard"

import DeckCardView from "./DeckCardView"

type Props = {
  deck: Deck
  onCountChange: (count: number, card: DeckCard) => void
}

export default function DeckView({deck, onCountChange}: Props): JSX.Element {
  const handleCardAdd = (newCount: number, card: DeckCard) => {
    onCountChange(newCount, card)
  }

  return <>
    <List>
      {deck.cards.map((card: DeckCard, i: number): JSX.Element =>
        <ListItem key={i}>
          <DeckCardView card={card} onChange={(n: number): void => handleCardAdd(n, card)} />
        </ListItem>
      )}
    </List>
  </>
}