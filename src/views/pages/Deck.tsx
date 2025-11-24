import React, { JSX, useEffect, useState } from "react"
import { useParams } from "react-router"

import { IDCodec } from "../../lib/encoding/id-codec"
import { gameRepository } from "../../lib/container"
import DeckModel from "../../lib/dto/Deck"
import GameInterface from "../../lib/dto/GameInterface"
import DeckCard from "../../lib/dto/DeckCard"

import Loading from "../components/Loading"
import DeckView from "../components/DeckView"
import Error from "../components/Error"

export default function Deck(): JSX.Element {
  const { name, encoded } = useParams()
  const [ids, setIds] = useState<number[]>([])
  const [error, setError] = useState<string|null>(null)
  const [game, setGame] = useState<GameInterface|null>(null)
  const [deck, setDeck] = useState<DeckModel|null>(null)

  const fetchGame = async (): Promise<void> => {
    const g: GameInterface = await gameRepository.get(name as string)
    setGame(g)
  }

  useEffect((): void => {
    try {
      setIds(IDCodec.decodeFromString(encoded as string))
    } catch (e) {
      setError((e as Error).message)
    }
  }, [encoded])

  useEffect((): void => {
    fetchGame()
  })

  useEffect((): void => {
    if (game === null) {
      return
    }

    setDeck(new DeckModel(game, ids))
  }, [ids, game])

  const handleCardCountChange = (count: number, card: DeckCard): void => {
    if (deck === null) {
      return
    }

    let c: DeckCard | undefined = deck.get(card)
    if (c === undefined) {
      c = deck.add(card, count)
    }
    c.count = count
    setDeck(deck.clone()) // @todo maybe make deck immutable
  }

  if (game === null || deck === null) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} />
  }

  return <DeckView deck={deck} onCountChange={handleCardCountChange} />
}