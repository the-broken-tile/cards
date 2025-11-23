import Game from "../dto/Game"
import GameValidatorInterface from "./GameValidatorInterface"
import ValidationRule from "../dto/ValidationRule"

export default class DuplicateIdValidator implements GameValidatorInterface {
  public validate(game: Game): void {
    if (!game.validationRules.find((r: ValidationRule): boolean => r.type === "uniqueIds")) {
      return
    }

    const idsSet: Set<number> = new Set<number>()
    for (const card of game.cards) {
      if (idsSet.has(card.id)) {
        throw new Error(`[DuplicatedIdValidator] Duplicate id = ${card.id} found.`)
      }

      idsSet.add(card.id)
    }
  }
}