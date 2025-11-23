import Attribute from "../dto/Attribute"
import ValidationRule from "../dto/ValidationRule"
import CardValidatorInterface from "./CardValidatorInterface"
import CardInterface from "../dto/CardInterface"

export default class RequiredAttributesValidator implements CardValidatorInterface {
    public validate(card: CardInterface, rule: ValidationRule): void | never {
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