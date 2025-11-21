import CardValidatorInterface from "./CardValidatorInterface"
import Card from "../dto/Card";
import ValidationRule from "../dto/ValidationRule";

export default class UniqueAttributeNamesValidator implements CardValidatorInterface {
  public validate(card: Card, rule: ValidationRule): void | never {
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