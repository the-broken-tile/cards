import Attribute from "./Attribute"
import Card from "./Card"
import ValidationRule from "./ValidationRule"
import Entity from "./Entity"
import GameInterface from "./GameInterface"

export default class Game implements GameInterface {
  constructor(
    public readonly name: string,
    public readonly attributes: Attribute[],
    public readonly cards: Card[],
    public readonly validationRules: ValidationRule[],
    public readonly entities: Entity[],
  ) {
  }

  public toJSON(): Record<string, any>[] {
    return this.cards
  }
}
