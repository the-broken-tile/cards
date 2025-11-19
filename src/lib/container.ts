import ArrayOfStringsAttributeFactory from "./factory/ArrayOfStringsAttributeFactory"
import AttributeFactory from "./factory/AttributeFactory"
import CardFactory from "./factory/CardFactory"
import StringAttributeFactory from "./factory/StringAttributeFactory"
import NumberAttributeFactory from "./factory/NumberAttributeFactory"
import ArrayOfNumbersFactory from "./factory/ArrayOfNumbersFactory"
import BooleanAttributeFactory from "./factory/BooleanAttributeFactory"
import Validator from "./validation/Validator"
import EnumValidator from "./validation/EnumValidator"
import DepdencyValidator from "./validation/DepdendencyValidator"
import RequiredAttributesValidadator from "./validation/RequiredAttributesValidator"
import GameFactory from "./factory/GameFactory"

const cardFactory = new CardFactory(new AttributeFactory({
    "string": new StringAttributeFactory(),
    "string[]": new ArrayOfStringsAttributeFactory(),
    "number": new NumberAttributeFactory(),
    "number[]": new ArrayOfNumbersFactory(),
    "boolean": new BooleanAttributeFactory(),
}))

const validator = new Validator({
    "enum": new EnumValidator(),
    "dependency": new DepdencyValidator(),
    "requiredAttributes": new RequiredAttributesValidadator(),
})

const gameFactory: GameFactory = new GameFactory(cardFactory, validator)

export {
    cardFactory,
    gameFactory,
    validator,
}