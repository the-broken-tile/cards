import React, { JSX, useEffect, useState } from "react"
import { Link, useParams} from "react-router"
import { List, ListItem } from "@mui/material"

import { gameRepository } from '../../lib/container'
import GameInterface from "../../lib/dto/GameInterface"

import Error from "../components/Error"
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
    return <Error message={error} />
  }

  if (game === null) {
    return <Loading />
  }

  return <>
    <nav>
      <List>
        <ListItem><Link to="/">Home</Link></ListItem>
        <ListItem><Link to={`/${game.slug}/deck/${EXAMPLE_DECK}`}>Example deck</Link></ListItem>
      </List>
    </nav>
    <pre className="app">
      {JSON.stringify(game,  null, "  ")}
    </pre>
    </>
}
