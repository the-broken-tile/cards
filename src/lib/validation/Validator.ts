import Card from "../dto/Card"
import Game from "../dto/Game"
import CardValidatorInterface from "./CardValidatorInterface"
import GameValidatorInterface from "./GameValidatorInterface"
import ValidationRule from "../dto/ValidationRule"
import ValidationType from "../dto/CardValidationType"

export default class Validator {
    constructor(
        private readonly cardValidators: Record<ValidationType, CardValidatorInterface>,
        private readonly gameValidators: GameValidatorInterface[],
    ) {}

    public validate(game: Game): void | never {
      this.validateGame(game)
      for (const card of game.cards) {
          this.validateCard(card, game.validationRules)
      }
    }

    private validateCard(card: Card, rules: ValidationRule[]): void | never {
        for (const rule of rules) {
          const validator: CardValidatorInterface | undefined = this.cardValidators[rule.type]

          if (validator === undefined) {
              throw new Error(`[Validator] Missing validator for rule type ${rule.type}.`)
          }

          validator.validate(card, rule)
      }
    }

    private validateGame(game: Game): void | never {
      for (const validator of this.gameValidators) {
        validator.validate(game)
      }
    }
}