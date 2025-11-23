import {useState, useEffect, JSX} from "react"

import { gameRepository } from '../../lib/container'
import Loading from "../components/Loading"
import GameLink from "../components/GameLink"

export default function Index(): JSX.Element {
  const [gameList, setGameList] = useState<[string, string][]|null>(null)

  const fetchGame = async (): Promise<void> => {
    setGameList(await gameRepository.allNames())
  }

  useEffect((): void => {
    fetchGame()
  }, [gameList])

  if (gameList === null) {
    return <Loading />
  }

  return <ul>
    {gameList.map(([slug, name]: [string, string], i: number) => <li key={i}><GameLink name={name} slug={slug} /></li>)}
  </ul>
}