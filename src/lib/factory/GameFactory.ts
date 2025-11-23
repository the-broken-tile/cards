import Card from "../dto/Card"
import Game from "../dto/Game"
import Validator from "../validation/Validator"
import AttributeDefinitionFactory from "./attribute/AttributeDefinitionFactory"
import AttributeDefinition from "../dto/AttributeDefinition"
import ValidationRuleFactory from "./validation/ValidationRuleFactory"
import ValidationRule from "../dto/ValidationRule"
import EntitiesFactory from "./EntitiesFactory"
import EntityMapper from "./EntityMapper"
import Entity from "../dto/Entity"
import CardFactoryInterface from "./CardFactoryInterface"

export default class GameFactory {
  constructor(
    private readonly cardFactory: CardFactoryInterface,
    private readonly validator: Validator,
    private readonly attributeDefinitionFactory: AttributeDefinitionFactory,
    private readonly validationRuleFactory: ValidationRuleFactory,
    private readonly entitiesFactory: EntitiesFactory,
    private readonly entityMapper: EntityMapper,
    private readonly gameValidationRules: ValidationRule[],
  ) {}

  public build(payload: Record<string, any>): Game {
    const nameType: string = typeof payload.name
    if (nameType !== "string") {
      throw new Error(`[GameFactory] Invalid name of type ${nameType}`)
    }

    if (!Array.isArray(payload.cards)) {
      throw new Error(`[GameFactory] Missing cards in ${payload.name}`)
    }

    if (!Array.isArray(payload.attributes)) {
      throw new Error(`[GameFactory] Missing attributes "${payload.name}".`)
    }

    const attributeDefinitions: AttributeDefinition[] = payload.attributes.map((attribute: Record<string, any>): AttributeDefinition => this.attributeDefinitionFactory.build(attribute))

    const entities: Entity[][] = payload.entities.map((entity: Record<string, any>): Entity[] => this.entitiesFactory.build(entity))

    const game: Game = new Game(
      payload.name,
      payload.attributes, // @todo maybe use factory
      payload.cards.map((card: Record<string, any>): Card => this.cardFactory.build(card, attributeDefinitions)),
      this.validationRules(payload.attributes),
      entities.flat(),
  )

    this.validator.validate(game)
    this.entityMapper.map(game)

    return game
  }

  private validationRules(attributes: Record<string, any>[]): ValidationRule[] {
    return [
      ...attributes.reduce(
        (carry: ValidationRule[], attribute: Record<string, any>): ValidationRule[] => {
          return [
            ...carry,
            ...this.validationRuleFactory.build(attribute),
          ]
        },
      [],
    ),
      ...this.gameValidationRules,
    ]
  }
}