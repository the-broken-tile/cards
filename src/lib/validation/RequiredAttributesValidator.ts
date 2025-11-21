import Attribute from "../dto/Attribute"
import Card from "../dto/Card"
import ValidationRule from "../dto/ValidationRule"
import CardValidatorInterface from "./CardValidatorInterface"

export default class RequiredAttributesValidator implements CardValidatorInterface {
    public validate(card: Card, rule: ValidationRule): void | never {
        if (rule.type !== "requiredAttributes") {
            throw new Error(`[RequiredAttributesValidator] Miss-configured validation rule of type "${rule.type}".`)
        }

        const notFoundAttributes: string[] = rule.attributes.filter((attribute: string): boolean => {
            const foundAttribute: Attribute | undefined = card.attributes.find((a: Attribute): boolean => a.name === attribute)

            return foundAttribute === undefined
        })

        if (notFoundAttributes.length > 0) {
            throw new Error(`[RequiredAttributesValidator] Invalid card "${card.name}", missing required attributes: ["${notFoundAttributes.join(", ")}"]`)
        }
    }
}