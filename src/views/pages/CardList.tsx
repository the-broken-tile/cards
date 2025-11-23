import React, {useEffect, useState} from "react"
import { useParams } from "react-router"

import {gameRepository} from "../../lib/container"
import CardInterface from "../../lib/dto/CardInterface"
import {IDCodec} from "../../lib/encoding/id-codec"
import GameInterface from "../../lib/dto/GameInterface"

import CardView from "../components/CardView"
import Loading from "../components/Loading"

export default function CardList() {
  const { name, encoded } = useParams()
  const [ids, setIds] = useState<number[]>([])
  const [error, setError] = useState<string|null>(null)
  const [game, setGame] = useState<GameInterface|null>(null)

  const fetchGame = async () => {
    const g: GameInterface = await gameRepository.get(name as string)
    setGame(g)
  }
  useEffect((): void => {
    try {
      setIds(IDCodec.decodeFromString(encoded as string))
    } catch (e) {
      setError((e as Error).message)
    }
  }, [])

  useEffect((): void => {
    fetchGame()
  })

  if (game === null) {
    return <Loading />
  }

  if (error) {
    return <>{error}</>
  }

  return <ul>
    {ids.map((id: number, i: number) => <li key={i}>
      <CardView card={game.cards.find((c: CardInterface): boolean => c.id === id)!} />
    </li>
    )}
  </ul>
}