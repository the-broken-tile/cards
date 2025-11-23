import CardInterface from "../dto/CardInterface"
import ValidationRule from "../dto/ValidationRule"
import CardValidatorInterface from "./CardValidatorInterface"
import Attribute from "../dto/Attribute"

export default class MinValueValidator implements CardValidatorInterface {
    validate(card: CardInterface, rule: ValidationRule): void | never {
      if (rule.type !== "min") {
        throw new Error(`[MinValueValidator] Miss-configured validation rule of type ${rule.type}.`)
      }

      const attribute: Attribute | undefined = card.attributes.find((a: Attribute): boolean => a.name === rule.attribute)

      if (attribute === undefined) {
        return
      }

      if (attribute.type === "number[]") {
        const values: number[] = attribute.value
        const faultyValues: number[] = []
        for (const value of values) {
          if (value < rule.minValue) {
            faultyValues.push(value)
          }
        }

        if (faultyValues.length > 0) {
          throw new Error(`[MinValueValidator] ${card.name}.${attribute.name} invalid values, min values allowed are ${rule.minValue}, [${faultyValues.join(', ')}] given`)
        }
      }

      if (attribute.type === "number") {
        if (attribute.value < rule.minValue) {
          throw new Error(`[MinValueValidator] ${card.name}.${attribute.name} invalid value, min value allowed is ${rule.minValue}, ${attribute.value} given`)
        }
      }
    }

}