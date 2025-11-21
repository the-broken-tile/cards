import Attribute from "./Attribute"
import Card from "./Card"
import ValidationRule from "./ValidationRule"
import Entity from "./Entity";

declare type Game = {
  name: string
  cards: Card[]
  attributes: Attribute[]
  validationRules: ValidationRule[]
  entities: Entity[]
}

export default Game