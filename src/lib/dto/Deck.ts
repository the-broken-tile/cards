import { IDCodec } from "../encoding/id-codec"

import GameInterface from "./GameInterface"
import CardInterface from "./CardInterface"
import DeckCard from "./DeckCard"

export default class Deck {
  private _cards: DeckCard[] = []
  constructor(private readonly game: GameInterface, ids: number[]) {
    this.initCards(ids)
  }

  public static import(encoded: string, game: GameInterface): Deck {
    return new Deck(game, IDCodec.decodeFromString(encoded))
  }

  get cards(): DeckCard[] {
    return this._cards
  }

  private initCards(ids: number[]): void {
    const cards: CardInterface[] = ids.map((id: number): CardInterface => this.game.cards.find((c: CardInterface): boolean => c.id === id)!)
    cards.sort((a: CardInterface, b: CardInterface): number => a.name.localeCompare(b.name, "en", { numeric: true }))

    for (const card of cards) {
      const existing: DeckCard | undefined = this._cards.find((c: CardInterface): boolean => c.id === card.id)

      if (existing === undefined) {
        const c: DeckCard = new DeckCard(card, 1)
        this._cards.push(c)

        continue
      }

      existing.count += 1
    }
  }

  public setCardCount(card: CardInterface, count: number): void {
    if (count <= 0) {
      this._cards = this._cards.filter((c: CardInterface): boolean => c.id !== card.id)

      return
    }

    const existing: DeckCard | undefined = this._cards.find((c: CardInterface): boolean => c.id === card.id)

    if (existing === undefined) {
      const c: DeckCard = new DeckCard(card, count)
      this._cards.push(c)

      return
    }

    existing.count = count
  }

  public export(): string {
    return IDCodec.encodeToString(this.exportIds())
  }

  private exportIds(): number[] {
    return this._cards.reduce<number[]>(
      (carry: number[], card: DeckCard): number[] => {
        return [...carry, ...new Array(card.count).fill(card.id)]
      },
      [] as number[]
    ) as unknown as number[]// spoiler, it's not unknown. Compiler messing up.
  }
}