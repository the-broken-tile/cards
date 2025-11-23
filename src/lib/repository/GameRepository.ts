import gameDefinitions from "../../definitions"
import GameFactory from "../factory/GameFactory"
import GameInterface from "../dto/GameInterface"

const definitions = gameDefinitions as Record<string, Record<string, any>>

export default class GameRepository {
  private readonly cached: Record<string, GameInterface> = {}

  constructor(private readonly gameFactory: GameFactory) {
  }

  public async get(name: string): Promise<GameInterface> {
    if (!this.cached[name]) {
      this.cached[name] = this.gameFactory.build(definitions[name])
    } else {
      console.log('using cache')
    }

    return this.cached[name]
  }

  /**
   * [slug, name] tuples
   */
  public async allNames(): Promise<[string, string][]> {
    return Object.keys(definitions).map((key: string): [string, string] => {
      return [definitions[key].slug, definitions[key].name]
    })
  }
}