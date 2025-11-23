import CardFactoryInterface from "./CardFactoryInterface"
import AttributeDefinition from "../dto/AttributeDefinition"
import CardInterface from "../dto/CardInterface"

export default class CardFactoryManager implements CardFactoryInterface {
  constructor(private readonly cardFactories: CardFactoryInterface[]) {
  }
  public supports(): boolean {
    return true
  }

  public build(payload: Record<string, any>, attributeDefinitions: AttributeDefinition[]): CardInterface {
    for (const cardFactory of this.cardFactories) {
      if (cardFactory.supports(payload)) {
        return cardFactory.build(payload, attributeDefinitions)
      }
    }

    throw new Error(`[CardFactoryManager] no available factory found for card ${JSON.stringify(payload)}`)
  }
}