import Card from "../dto/Card"
import Game from "../dto/Game"
import Validator from "../validation/Validator"
import CardFactory from "./CardFactory"
import AttributeDefinitionFactory from "./attribute/AttributeDefinitionFactory"
import AttributeDefinition from "../dto/AttributeDefinition"
import ValidationRuleFactory from "./validation/ValidationRuleFactory"
import ValidationRule from "../dto/ValidationRule"

export default class GameFactory {
    constructor(
        private readonly cardFactory: CardFactory,
        private readonly validator: Validator,
        private readonly attributeDefinitionFactory: AttributeDefinitionFactory,
        private readonly validationRuleFactory: ValidationRuleFactory,
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

        const game: Game = {
            name: payload.name,
            attributes: payload.attributes, // @todo maybe use factory
            cards: payload.cards.map((card: Record<string, any>): Card => this.cardFactory.build(card, attributeDefinitions)),
            validationRules: this.validationRules(payload.attributes),
        }

        this.validator.validate(game)

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