import GameRepository from "./GameRepository"
import CardInterface from "../dto/CardInterface"
import GameInterface from "../dto/GameInterface"

type Query = {
  game: string
  limit?: number
  from?: number
  id?: number | number[]
}

export default class CardRepository {
  constructor(private readonly gameRepository: GameRepository) {}

  public async find(query: Query): Promise<CardInterface[]> {
    const game: GameInterface | undefined = await this.gameRepository.get(query.game)

    if (game === undefined) {
      throw new Error(`[CardRepository] Unknown game "${query.game}".`)
    }

    let result: CardInterface[] = game.cards
    if (query.id !== undefined) {
      result = result.filter((card: CardInterface): boolean => Array.isArray(query.id)
        ? query.id.includes(card.id)
        : card.id === query.id
      )
    }

    // Order
    result.sort((a: CardInterface, b: CardInterface): number => a.id - b.id)

    // Then limit
    if (query.limit !== undefined) {
      result = result.slice(query.from, (query.from ?? 0) + query.limit)
    }

    return result
  }
}