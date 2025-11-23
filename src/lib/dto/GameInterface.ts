import Card from "./Card"
import Attribute from "./Attribute"
import ValidationRule from "./ValidationRule"
import Entity from "./Entity"

export default interface GameInterface {
  readonly name: string
  readonly cards: Card[]
  readonly attributes: Attribute[]
  readonly validationRules: ValidationRule[]
  readonly entities: Entity[]
}