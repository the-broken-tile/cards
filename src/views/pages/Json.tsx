import React, {useEffect, useState} from "react"
import { useParams } from "react-router"

import Game from '../../lib/dto/Game'
import { gameRepository } from '../../lib/container'

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

export default Json