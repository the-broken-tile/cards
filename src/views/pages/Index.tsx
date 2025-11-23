import { useState, useEffect } from "react"
import { Link } from "react-router"

import { gameRepository } from '../../lib/container'
import Loading from "../components/Loading"

export default function Index() {
  const [gameList, setGameList] = useState<string[]|null>(null)

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
    {gameList.map((name: string, i: number) => <li key={i}><Link to={`/${name}.json`}>{name}</Link></li>)}
  </ul>
}