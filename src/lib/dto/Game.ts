import Attribute from "./Attribute"
import Card from "./Card"
import ValidationRule from "./ValidationRule"

declare type Game = {
    name: string
    cards: Card[]
    attributes: Attribute[]
    validationRules: ValidationRule[]
}

export default Game