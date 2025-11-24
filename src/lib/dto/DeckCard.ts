import Attribute from "./Attribute"
import CardInterface from "./CardInterface"

export default class DeckCard implements CardInterface {
  constructor(private readonly card: CardInterface, public count: number = 1) {
  }

  get id(): number {
    return this.card.id
  }

  get name(): string {
    return this.card.name
  }

  get attributes(): Attribute[] {
    return this.card.attributes
  }
}