import React, { JSX, useEffect, useState } from "react"
import { Link, useParams} from "react-router"
import { List, ListItem } from "@mui/material"

import { cardRepository } from '../../lib/container'

import ErrorMessage from "../components/ErrorMessage"
import Loading from "../components/Loading"
import CardInterface from "../../lib/dto/CardInterface";

export default function Card(): JSX.Element {
  const { slug, id } = useParams()
  const [error, setError] = useState<string | null>(null)
  const [card, setCard] = useState<CardInterface | null>(null)

  const fetchCard = async(): Promise<void> => {
    try {
      if (slug === undefined) {
        setError("name is required")

        return
      }

      if (id === undefined) {
        setError("id is required")

        return
      }

      const cards: CardInterface[] = await cardRepository.find({game: slug, id: Number(id)})

      if (cards.length !== 1) {
        setError("card not found")
      }

      setCard(cards[0])
    } catch (e) {
      setError((e as Error).message)
    }
  }

  useEffect((): void => {
    fetchCard()
  }, [slug, id])

  if (error !== null) {
    return <ErrorMessage message={error} />
  }

  if (card === null) {
    return <Loading />
  }

  return <>
    <nav>
      <List>
        <ListItem><Link to="/">Home</Link></ListItem>
      </List>
    </nav>
    <pre className="app">
      {JSON.stringify(card,  null, "  ")}
    </pre>
  </>
}