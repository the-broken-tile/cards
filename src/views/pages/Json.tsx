import React, {useEffect, useState} from 'react'
import { useParams } from "react-router"

import Game from '../../lib/dto/Game'
import { gameRepository } from '../../lib/container'
import { IDCodec } from "../../lib/encoding/id-codec"

const Json = () => {
  const { name } = useParams()
  const [game, setGame] = useState<Game|null>(null)
  const [error, setError] = useState<string|null>(null)

  useEffect((): void => {
    try {
      if (name === undefined) {
        setError("name is required")
      } else {
        setGame(gameRepository.get(name))
      }
    } catch (e) {
      setError((e as Error).message)
    }
  }, [])

  const quadripleIds = (): number[] => {
    if (game === null) {
      return []
    }

    return game.cards.map(card => card.id)
      .reduce((carry: number[], id: number): number[] => {
        return [...carry, id, id, id, id]
      }, [])
  }

  if (error !== null) {
    return <>Error: {error}</>
  }

  if (game === null) {
    return <>"Loading"</>
  }

  return (
    <div className="app">
      <div>Encoded all 4x ids: {IDCodec.encodeToString(quadripleIds())}</div>
      <br />
      <div>Decoded all 4x ids: {IDCodec.decodeFromString(IDCodec.encodeToString(quadripleIds())).join(", ")}</div>
      <pre>{JSON.stringify(game,  null, "  ")}</pre>
    </div>
  )
}

export default Json