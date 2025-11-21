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
import DummyValidator from "./validation/DummyValidator"
import DuplicateIdValidator from "./validation/DuplicateIdValidator"
import RequiredIfMissingValidationRuleFactory from "./factory/validation/RequiredIfMissingValidationRuleFactory"
import AttributeRequiredIfAnotherMissingValidator from "./validation/AttributeRequiredIfAnotherMissingValidator"
import UniqueAttributeNamesValidator from "./validation/UniqueAttributeNamesValidator"
import EntitiesFactory from "./factory/EntitiesFactory"
import EntityFactory from "./factory/EntityFactory"
import EntityMapper from "./factory/EntityMapper"
import EnumAttributeFactory from "./factory/attribute/EnumAttributeFactory"
import EntityAttributeFactory from "./factory/attribute/EntityAttributeFactory"

const validationRuleFactory: ValidationRuleFactory = new ValidationRuleFactory([
  new AttributeDefinitionEnumValidationFactory(),
  new AttributeDefinitionRequiredValidationRuleFactory(),
  new ConflictsValidationRuleFactory(),
  new RequiredIfMissingValidationRuleFactory(),
])

const attributeFactory: AttributeFactory = new AttributeFactory({
  "string": new StringAttributeFactory(),
  "enum": new EnumAttributeFactory(),
  "entity": new EntityAttributeFactory(),
  "string[]": new ArrayOfStringsAttributeFactory(),
  "number": new NumberAttributeFactory(),
  "number[]": new ArrayOfNumbersAttributeFactory(),
  "boolean": new BooleanAttributeFactory(),
})
const cardFactory: CardFactory = new CardFactory(attributeFactory)

const validator: Validator = new Validator({
    "enum": new EnumValidator(),
    "dependency": new DependencyValidator(),
    "requiredAttributes": new RequiredAttributesValidator(),
    "requiredIfMissing": new AttributeRequiredIfAnotherMissingValidator(),
    "uniqueAttributeNames": new UniqueAttributeNamesValidator(),
    "uniqueIds": new DummyValidator(), // @todo change this
  },
  [
    new DuplicateIdValidator(),
  ],
)

const attributeDefinitionFactory: AttributeDefinitionFactory = new AttributeDefinitionFactory()
const entityFactory: EntitiesFactory = new EntitiesFactory(attributeDefinitionFactory, new EntityFactory(attributeFactory))

const gameFactory: GameFactory = new GameFactory(
  cardFactory,
  validator,
  attributeDefinitionFactory,
  validationRuleFactory,
  entityFactory,
  new EntityMapper(),
  [
    { type: "uniqueIds" },
    { type: "uniqueAttributeNames" },
  ]
)

export {
    cardFactory,
    gameFactory,
    validator,
}