import GameFactory from "./factory/GameFactory"
import Game from "./dto/Game"
import gameDefinitions from "../definitions"

const definitions = gameDefinitions as Record<string, Record<string, any>>

export default class GameRepository {
  constructor(private readonly gameFactory: GameFactory) {
  }

  public get(name: string): Game {
    return this.gameFactory.build(definitions[name])
  }

  public allNames(): string[] {
    return Object.keys(definitions)
  }
}