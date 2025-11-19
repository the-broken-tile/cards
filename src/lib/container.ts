import ArrayOfStringsAttributeFactory from "./factory/attribute/ArrayOfStringsAttributeFactory"
import AttributeFactory from "./factory/attribute/AttributeFactory"
import CardFactory from "./factory/CardFactory"
import StringAttributeFactory from "./factory/attribute/StringAttributeFactory"
import NumberAttributeFactory from "./factory/attribute/NumberAttributeFactory"
import ArrayOfNumbersAttributeFactory from "./factory/attribute/ArrayOfNumbersAttributeFactory"
import BooleanAttributeFactory from "./factory/attribute/BooleanAttributeFactory"
import GameFactory from "./factory/GameFactory"
import AttributeDefinitionFactory from "./factory/attribute/AttributeDefinitionFactory"
import AttributeDefinitionRequiredValidationRuleFactory from "./factory/validation/AttributeDefinitionRequiredValidationRuleFactory"

import Validator from "./validation/Validator"
import EnumValidator from "./validation/EnumValidator"
import DepdencyValidator from "./validation/DepdendencyValidator"
import RequiredAttributesValidadator from "./validation/RequiredAttributesValidator"
import ValidationRuleFactory from "./factory/validation/ValidationRuleFactory"
import AttributeDefinitionEnumValidationFactory from "./factory/validation/AttributeDefinitionEnumValidationFactory"
import ConflictsValidationRuleFactory from "./factory/validation/ConflictsValidationRuleFactory"

const validationRuleFactory: ValidationRuleFactory = new ValidationRuleFactory([
    new AttributeDefinitionEnumValidationFactory(),
    new AttributeDefinitionRequiredValidationRuleFactory(),
    new ConflictsValidationRuleFactory(),
])

const cardFactory: CardFactory = new CardFactory(
    new AttributeFactory({
        "string": new StringAttributeFactory(),
        "enum": new StringAttributeFactory(),
        "string[]": new ArrayOfStringsAttributeFactory(),
        "number": new NumberAttributeFactory(),
        "number[]": new ArrayOfNumbersAttributeFactory(),
        "boolean": new BooleanAttributeFactory(),
    }),
)

const validator: Validator = new Validator({
    "enum": new EnumValidator(),
    "dependency": new DepdencyValidator(),
    "requiredAttributes": new RequiredAttributesValidadator(),
})

const attributeDefintionFacotry: AttributeDefinitionFactory = new AttributeDefinitionFactory()

const gameFactory: GameFactory = new GameFactory(cardFactory, validator, attributeDefintionFacotry, validationRuleFactory)

export {
    cardFactory,
    gameFactory,
    validator,
}