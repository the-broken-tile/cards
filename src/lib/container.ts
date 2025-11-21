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
import DependencyValidator from "./validation/DepdendencyValidator"
import RequiredAttributesValidator from "./validation/RequiredAttributesValidator"
import ValidationRuleFactory from "./factory/validation/ValidationRuleFactory"
import AttributeDefinitionEnumValidationFactory from "./factory/validation/AttributeDefinitionEnumValidationFactory"
import ConflictsValidationRuleFactory from "./factory/validation/ConflictsValidationRuleFactory"
import DummyValidator from "./validation/DummyValidator";
import DuplicateIdValidator from "./validation/DuplicateIdValidator";

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
    "dependency": new DependencyValidator(),
    "requiredAttributes": new RequiredAttributesValidator(),
    "uniqueIds": new DummyValidator(),
  },
  [
    new DuplicateIdValidator(),
  ],
)

const attributeDefinitionFactory: AttributeDefinitionFactory = new AttributeDefinitionFactory()

const gameFactory: GameFactory = new GameFactory(
  cardFactory,
  validator,
  attributeDefinitionFactory,
  validationRuleFactory,
  [
    {type: "uniqueIds"}
  ]
)

export {
    cardFactory,
    gameFactory,
    validator,
}