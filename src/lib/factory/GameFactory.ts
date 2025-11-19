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
        private readonly attributeDefintionFactory: AttributeDefinitionFactory,
        private readonly validaitonRuleFactory: ValidationRuleFactory,
    ) {}

    public build(payload: Record<string, any>): Game {
        const nameType: string = typeof payload.name
        if (nameType !== "string") {
            throw new Error(`Invalid name of type ${nameType}`)
        }
        
        if (!Array.isArray(payload.cards)) {
            throw new Error(`Missing cards in ${payload.name}`)
        }

        if (!Array.isArray(payload.attributes)) {
            throw new Error(`Missing attributes "${payload.name}".`)
        }

        const attributeDefinitions: AttributeDefinition[] = payload.attributes.map((attribute: Record<string, any>): AttributeDefinition => this.attributeDefintionFactory.build(attribute))

        const game: Game = {
            name: payload.name,
            attributes: payload.attributes, // @todo maybe use factory
            cards: payload.cards.map((card: Record<string, any>): Card => this.cardFactory.build(card, attributeDefinitions)),
            validationRules: payload.attributes.reduce(
                (carry: ValidationRule[], attribute: Record<string, any>): ValidationRule[] => {
                    return [
                        ...carry,
                        ...this.validaitonRuleFactory.build(attribute),
                    ]
                },
                [],
            ),
        }

        this.validator.validate(game)

        return game
    }
}