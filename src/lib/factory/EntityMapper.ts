import Game from "../dto/Game"
import Card from "../dto/Card"
import Attribute from "../dto/Attribute"
import Entity from "../dto/Entity"

type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export default class EntityMapper {
  public map(game: Game): void {
    for (const card of game.cards) {
      this.mapCard(card, game.entities)
    }
  }

  private mapCard(card: Card, entities: Entity[]): void {
    for (const attribute of card.attributes) {
      this.mapAttribute(attribute, entities)
    }
  }

  private mapAttribute(attribute: Writeable<Attribute>, entities: Entity[]): void {
    if (attribute.type !== "entity") {
      return
    }

    if (typeof attribute.value !== "string") {
        return
    }

    const entity: Entity | undefined = entities.find((entity: Entity): boolean =>  attribute.value === entity.name && attribute.name === entity.id)

    if (entity !== undefined) {
      attribute.value = entity
    }
  }
}