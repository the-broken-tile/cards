import CardValidatorInterface from "./CardValidatorInterface"
import ValidationRule from "../dto/ValidationRule"
import CardInterface from "../dto/CardInterface"

export default class UniqueAttributeNamesValidator implements CardValidatorInterface {
  public validate(card: CardInterface, rule: ValidationRule): void | never {
    if (rule.type !== "uniqueAttributeNames") {
      throw new Error(`[UniqueAttributeNamesValidator] Miss-configured validation rule of type "${rule.type}".`)
    }

    const names: Set<string> = new Set<string>()
    for (const attribute of card.attributes) {
      if (names.has(attribute.name)) {
        throw new Error(`[UniqueAttributeNamesValidator] ${attribute.name} already exists.`)
      }

      names.add(attribute.name)
    }
  }
}