import React, { JSX, useEffect, useState } from "react"
import {Link, useParams} from "react-router"

import { gameRepository } from '../../lib/container'
import GameInterface from "../../lib/dto/GameInterface"

import Loading from "../components/Loading"
const EXAMPLE_DECK: string = "DwgAAIAACAAAgAAIAACAAAgAAIAACAAAgAAIAACAAAgAAIAACAAAgAAIAACAAAgAAIAA"

export default function Game(): JSX.Element {
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
    return <Loading />
  }

  return <>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to={`/${game.slug}/deck/${EXAMPLE_DECK}`}>Example deck</Link></li>
      </ul>
    </nav>
    <pre className="app">
      {JSON.stringify(game,  null, "  ")}
    </pre>
    </>
}
