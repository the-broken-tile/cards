import CardValidatorInterface from "./CardValidatorInterface"
import Card from "../dto/Card"
import ValidationRule from "../dto/ValidationRule"
import Attribute from "../dto/Attribute";

export default class AttributeRequiredIfAnotherMissingValidator implements CardValidatorInterface {
  validate(card: Card, rule: ValidationRule): void | never {
    if (rule.type !== "requiredIfMissing") {
      throw new Error(`[AttributeRequiredIfAnotherMissingValidator] Miss-configured validation rule of type ${rule.type}.`)
    }

    const relevantAttribute: Attribute | undefined = card.attributes.find((a: Attribute): boolean => a.name === rule.missingAttribute)

    if (relevantAttribute !== undefined) {
      return // Not missing, duh.
    }

    const requiredAttribute: Attribute | undefined = card.attributes.find((a: Attribute): boolean => a.name === rule.attribute)

    if (requiredAttribute === undefined) {
      throw new Error(
        `[AttributeRequiredIfAnotherMissingValidator] Card "${card.name}": Attribute "${rule.attribute}" is required, when attribute "${rule.missingAttribute}" is missing.`)
    }
    //if (rule.type !== "enum") {
    //         }
  }
}