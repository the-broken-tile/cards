import React, { JSX, useEffect, useState } from "react"
import {useParams, useNavigate, NavigateFunction} from "react-router"

import { IDCodec } from "../../lib/encoding/id-codec"
import { gameRepository } from "../../lib/container"
import DeckModel from "../../lib/dto/Deck"
import GameInterface from "../../lib/dto/GameInterface"
import DeckCard from "../../lib/dto/DeckCard"

import Loading from "../components/Loading"
import DeckView from "../components/DeckView"
import ErrorMessage from "../components/ErrorMessage"

export default function Deck(): JSX.Element {
  const navigate: NavigateFunction = useNavigate()

  const { slug, encoded } = useParams()
  const [error, setError] = useState<string|null>(null)
  const [game, setGame] = useState<GameInterface|null>(null)
  const [deck, setDeck] = useState<DeckModel|null>(null)

  const fetchGame = async (): Promise<void> => {
    const g: GameInterface = await gameRepository.get(slug as string)
    setGame(g)
  }

  useEffect((): void => {
    fetchGame()
  }, [slug])

  useEffect((): void => {
    if (game === null || encoded === undefined) {
      return
    }

    try {
      setDeck(DeckModel.import(encoded, game))
    } catch (e) {
      setError((e as Error).message)
    }
  }, [encoded, game])

  const handleCardCountChange = (count: number, card: DeckCard): void => {
    if (deck === null || game === null) {
      return
    }

    deck.setCardCount(card, count)

    // @todo Known bug, last cards count decrease when another card's count is changed
    navigate(`/${game.slug}/deck/${deck.export()}`)
  }

  if (game === null || deck === null) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return <DeckView deck={deck} onCountChange={handleCardCountChange} />
}