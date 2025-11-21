import Attribute from "../dto/Attribute"
import Card from "../dto/Card"
import ValidationRule from "../dto/ValidationRule"
import CardValidatorInterface from "./CardValidatorInterface"

export default class EnumValidator implements CardValidatorInterface {
    public validate(card: Card, rule: ValidationRule): void | never {
        if (rule.type !== "enum") {
            throw new Error(`[EnumValidator] Miss-configured validation rule of type ${rule.type}.`)
        }

        const attribute: Attribute | undefined = card.attributes.find((a: Attribute): boolean => a.name === rule.attribute)

        if (attribute === undefined) {
            return
        }
        // @todo add support for "string[]"
 
        if (!Array.isArray(rule.enum)) {
            throw new Error(`[EnumValidator] Invalid enum, not an array.`)
        }

        if (attribute.type === "string") {
            if (!rule.enum.includes(attribute.value)) {
                throw new Error(`[EnumValidator Invalid value "${attribute.value}" for attribute "${attribute.name}". Allowed values are: ["${rule.enum.join(", ")}"]`)
            }
        }

        if (attribute.type === "string[]") {
            const invalidValues: string[] = attribute.value.filter((attribute: string): boolean => !rule.enum.includes(attribute))

            if (invalidValues.length > 0) {
                throw new Error(`[EnumValidator] Invalid value "${invalidValues.join(", ")}" for attributes "${attribute.name}". Allowed values are: ["${rule.enum.join(", ")}"]`)
            }
        }
    }
}