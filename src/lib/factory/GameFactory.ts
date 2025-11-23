import Game from "../dto/Game"
import CardInterface from "../dto/CardInterface"
import AttributeDefinition from "../dto/AttributeDefinition"
import Entity from "../dto/Entity"
import ValidationRule from "../dto/ValidationRule"
import Validator from "../validation/Validator"
import ValidationRuleFactory from "./validation/ValidationRuleFactory"
import AttributeDefinitionFactory from "./attribute/AttributeDefinitionFactory"
import EntitiesFactory from "./EntitiesFactory"
import EntityMapper from "./EntityMapper"
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
      throw new Error(`[GameFactory] Invalid name of type "${nameType}".`)
    }

    const slugType: string = typeof payload.slug
    if (slugType !== "string") {
      throw new Error(`[GameFactory] Invalid slug of type "${slugType}" in ${payload.name}.`)
    }

    if (!Array.isArray(payload.cards)) {
      throw new Error(`[GameFactory] Missing cards in ${payload.name}.`)
    }

    if (!Array.isArray(payload.attributes)) {
      throw new Error(`[GameFactory] Missing attributes "${payload.name}".`)
    }

    const attributeDefinitions: AttributeDefinition[] = payload.attributes.map((attribute: Record<string, any>): AttributeDefinition => this.attributeDefinitionFactory.build(attribute))

    const entities: Entity[][] = payload.entities.map((entity: Record<string, any>): Entity[] => this.entitiesFactory.build(entity))

    const game: Game = new Game(
      payload.name,
      payload.slug,
      payload.attributes, // @todo maybe use factory
      payload.cards.map((card: Record<string, any>): CardInterface => this.cardFactory.build(card, attributeDefinitions)),
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