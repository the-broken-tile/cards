import GameInterface from "./GameInterface"
import CardInterface from "./CardInterface"
import DeckCard from "./DeckCard"

export default class Deck {
  private _cards: DeckCard[] = []
  constructor(private readonly game: GameInterface, ids: number[]) {
    const cards: CardInterface[] = ids.map((id: number): CardInterface => game.cards.find((c: CardInterface): boolean => c.id === id)!)
    cards.sort((a: CardInterface, b: CardInterface): number => a.name.localeCompare(b.name, "en", { numeric: true }))

    for (const card of cards) {
      this.add(card)
    }
  }

  get cards(): DeckCard[] {
    return this._cards
  }

  public add(card: CardInterface, count: number = 1): DeckCard {
    const existing: DeckCard | undefined = this._cards.find((c: CardInterface): boolean => c.id === card.id)

    if (existing === undefined) {
      const c: DeckCard = new DeckCard(card, count)
      this._cards.push(c)

      return c
    }

    existing.count += count

    return existing
  }

  public remove(card: CardInterface): void {
    const existing: DeckCard | undefined = this._cards.find((c: CardInterface): boolean => c.id === card.id)

    if (existing === undefined) {
      return
    }

    existing.count--
    if (existing.count <= 0) {
      this._cards = this._cards.filter((c: CardInterface): boolean => c.id !== existing.id)
    }
  }

  public get(idOrCard: number | CardInterface): DeckCard | undefined {
    const id: number = typeof idOrCard === "number" ? idOrCard : idOrCard.id

    return this.cards.find((c: CardInterface): boolean => id === c.id)
  }

  public clone(): Deck {
    return new Deck(
      this.game,
      this._cards.reduce(
        (carry: number[], card: DeckCard): number [] => {
          return [...carry, ...new Array(card.count).fill(card.id)]
        },
        [],
      )
    )
  }
}