import React, {useEffect, useState} from 'react'

import ivionJson from "./definitions/ivion.json"
import Game from './lib/dto/Game'
import { gameFactory } from './lib/container'
import { IDCodec } from "./lib/encoding/id-codec"

const App = () => {
  const [game, setGame] = useState<Game|null>(null)
  const [error, setError] = useState<string|null>(null)

  useEffect((): void => {
    try {
      setGame(gameFactory.build(ivionJson))
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

export default App