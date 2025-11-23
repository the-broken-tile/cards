import Attribute from "./Attribute"
import ValidationRule from "./ValidationRule"
import Entity from "./Entity"
import GameInterface from "./GameInterface"
import CardInterface from "./CardInterface"

export default class Game implements GameInterface {
  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly attributes: Attribute[],
    public readonly cards: CardInterface[],
    public readonly validationRules: ValidationRule[],
    public readonly entities: Entity[],
  ) {
  }

  public toJSON(): Record<string, any> {
    return {
      name: this.name,
      cards: this.cards,
    }
  }
}
