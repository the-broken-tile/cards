import React, {useEffect, useState} from "react"
import { useParams } from "react-router"

import Game from "../../lib/dto/Game"
import {gameRepository} from "../../lib/container"
import {IDCodec} from "../../lib/encoding/id-codec"
import Card from "../../lib/dto/Card"

import CardView from "../components/CardView"

export default function CardList() {
  const { name, encoded } = useParams()
  const [ids, setIds] = useState<number[]>([])
  const [error, setError] = useState<string|null>(null)
  const [game] = useState<Game>(gameRepository.get(name as string))

  useEffect((): void => {
    try {
      setIds(IDCodec.decodeFromString(encoded as string))
    } catch (e) {
      setError((e as Error).message)
    }
  }, [])

  if (error) {
    return <>{error}</>
  }

  return <ul>
    {ids.map((id: number, i: number) => <li key={i}>
      <CardView card={game.cards.find((c: Card): boolean => c.id === id)!} />
    </li>
    )}
  </ul>
}