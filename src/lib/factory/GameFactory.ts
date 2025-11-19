import Attribute from "../dto/Attribute";
import Card from "../dto/Card";
import Game from "../dto/Game";
import Validator from "../validation/Validator";
import CardFactory from "./CardFactory";

export default class GameFactory {
    constructor(
        private readonly cardFactory: CardFactory,
        private readonly validator: Validator
    ) {}

    public build(payload: Record<string, any>): Game {
        const nameType: string = typeof payload.name
        if (nameType !== "string") {
            throw new Error(`Invalid name of type ${nameType}`)
        }
        
        if (!Array.isArray(payload.cards)) {
            throw new Error(`Missing cards in ${payload.name}`)
        }

        if (!Array.isArray(payload.validationRules)) {
            throw new Error(`Missing validationRules in ${payload.name}`)
        }

        const game: Game = {
            name: payload.name,
            cards: payload.cards.map((card: Record<string, any>): Card => this.cardFactory.build(card)),
            validationRules: payload.validationRules
        }

        this.validator.validate(game)

        return game
    }
}