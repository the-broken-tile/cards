import React, { JSX, useEffect, useState } from "react"
import { Link, useParams} from "react-router"
import { List, ListItem } from "@mui/material"

import { gameRepository, cardRepository } from '../../lib/container'
import GameInterface from "../../lib/dto/GameInterface"

import ErrorMessage from "../components/ErrorMessage"
import Loading from "../components/Loading"
import CardInterface from "../../lib/dto/CardInterface";

const EXAMPLE_DECK: string = "DwgAAIAACAAAgAAIAACAAAgAAIAACAAAgAAIAACAAAgAAIAACAAAgAAIAACAAAgAAIAA"

export default function Game(): JSX.Element {
  const { slug } = useParams()
  const [game, setGame] = useState<GameInterface|null>(null)
  const [cards, setCards] = useState<CardInterface[]>([])
  const [error, setError] = useState<string|null>(null)

  const fetchGame = async(): Promise<void> => {
    try {
      if (slug === undefined) {
        setError("name is required")
      } else {
        setGame(await gameRepository.get(slug))
      }
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const fetchCards = async(): Promise<void> => {
    try {
      if (slug === undefined) {
        setError("name is required")
      } else {
        setCards(await cardRepository.find({game: slug, from: 0, limit: 10}))
      }
    } catch (e) {
      setError((e as Error).message)
    }
  }

  useEffect((): void => {
    fetchGame()
  }, [slug])

  useEffect((): void => {
    fetchCards()
  }, [slug])

  if (error !== null) {
    return <ErrorMessage message={error} />
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
      {JSON.stringify(cards,  null, "  ")}
    </pre>
    </>
}
