import Attribute from "../dto/Attribute"
import Card from "../dto/Card"
import ValidationRule from "../dto/ValidationRule"
import ValidatorInterface from "./ValidatorInterface"

export default class DepdencyValidator implements ValidatorInterface {
    public validate(card: Card, rule: ValidationRule): void | never {
        if (rule.type !== "dependency") {
            throw new Error(`Missconfigured validation rule of type ${rule.type} for DepdendencyValidator.`)
        }
        
        const attribute: Attribute | undefined = card.attributes.find((a: Attribute): boolean => a.name === rule.attribute)

        if (attribute === undefined) {
            return
        }

        const check: boolean = Array.isArray(attribute.value)
            // fake any, it's actually (string[]|number[]).includes(string|number) // @todo find a better fix
            ? (attribute.value as any[]).includes(rule.ifValue as any)
            : attribute.value === rule.ifValue

        if (!check) {
            return
        }

        const ifAttribute: Attribute | undefined = card.attributes.find((a: Attribute): boolean => a.name === rule.ifAttribute)

        if (ifAttribute === undefined && rule.status === "required") {
            throw new Error(`Attribute ${rule.ifAttribute} is required`)
        }

        if (ifAttribute !== undefined && rule.status === "forbidden") {
            throw new Error(`Attribute ${rule.ifAttribute} is forbidden`)
        }
    }
}