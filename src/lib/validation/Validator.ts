import Card from "../dto/Card"
import Game from "../dto/Game"
import ValidationRule from "../dto/ValidationRule"
import ValidationType from "../dto/ValidationType"
import ValidatorInterface from "./ValidatorInterface"

export default class Validator {
    constructor(
        private readonly validators: Record<ValidationType, ValidatorInterface>
    ) {}

    public validate(game: Game): void | never {
        for (const card of game.cards) {
            this.validateCard(card, game.validationRules)
        }
    }

    private validateCard(card: Card, rules: ValidationRule[]): void | never {
        for (const rule of rules) {
            const validator: ValidatorInterface | undefined = this.validators[rule.type]

            if (validator === undefined) {
                throw new Error(`Missing validator for rule type ${rule.type}.`)
            }

            validator.validate(card, rule)
        }
    }
}