import CardValidatorInterface from "./CardValidatorInterface"
import CardInterface from "../dto/CardInterface"
import ValidationRule from "../dto/ValidationRule"
import Attribute from "../dto/Attribute"

export default class MaxValueValidator implements CardValidatorInterface {
  public validate(card: CardInterface, rule: ValidationRule): void | never {
    if (rule.type !== "max") {
      throw new Error(`[MaxValueValidator] Miss-configured validation rule of type ${rule.type}.`)
    }

    const attribute: Attribute | undefined = card.attributes.find((a: Attribute): boolean => a.name === rule.attribute)

    if (attribute === undefined) {
      return
    }

    if (attribute.type === "number[]") {
      const values: number[] = attribute.value
      const faultyValues: number[] = []
      for (const value of values) {
        if (value > rule.maxValue) {
          faultyValues.push(value)
        }
      }

      if (faultyValues.length > 0) {
        throw new Error(`[MaxValueValidator] ${card.name}.${attribute.name} invalid values, max values allowed are ${rule.maxValue}, [${faultyValues.join(', ')}] given`)
      }
    }

    if (attribute.type === "number") {
      if (attribute.value > rule.maxValue) {
        throw new Error(`[MaxValueValidator] ${card.name}.${attribute.name} invalid value, max value allowed is ${rule.maxValue}, ${attribute.value} given`)
      }
    }
  }
}