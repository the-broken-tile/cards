import React, {useEffect, useState} from "react"
import { useParams } from "react-router"

import { gameRepository } from '../../lib/container'
import GameInterface from "../../lib/dto/GameInterface"

export default function Json() {
  const { name } = useParams()
  const [game, setGame] = useState<GameInterface|null>(null)
  const [error, setError] = useState<string|null>(null)

  const fetchGame = async(): Promise<void> => {
    try {
      if (name === undefined) {
        setError("name is required")
      } else {
        setGame(await gameRepository.get(name))
      }
    } catch (e) {
      setError((e as Error).message)
    }
  }
  useEffect((): void => {
    fetchGame()
  }, [])

  if (error !== null) {
    return <>Error: {error}</>
  }

  if (game === null) {
    return <>"Loading"</>
  }

  return <pre className="app">
    {JSON.stringify(game,  null, "  ")}
  </pre>
}
