import Attribute from "../dto/Attribute";
import Card from "../dto/Card";
import ValidationRule from "../dto/ValidationRule";
import ValidatorInterface from "./ValidatorInterface";

export default class RequiredAttributesValidadator implements ValidatorInterface {
    public validate(card: Card, rule: ValidationRule): void | never {
        if (rule.type !== "requiredAttributes") {
            throw new Error(`Missconfigured validation rule of type ${rule.type} for EnumValidator.`)
        }

        const notFoundAttributes: string[] = rule.attributes.filter((attribute: string): boolean => {
            const foundAttribute: Attribute | undefined = card.attributes.find((a: Attribute): boolean => a.name === attribute)

            return foundAttribute === undefined
        })

        if (notFoundAttributes.length > 0) {
            throw new Error(`Invalid card "${card.name}", missing required attributes: ["${notFoundAttributes.join(", ")}"]`)
        }
    }
}