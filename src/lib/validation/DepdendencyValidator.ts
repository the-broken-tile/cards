import Attribute from "../dto/Attribute"
import Card from "../dto/Card"
import ValidationRule, { DependentValidationRule } from "../dto/ValidationRule"
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

        const check: boolean = this.shouldApply(attribute, rule)
        
        if (!check) {
            return
        }

        const ifAttribute: Attribute | undefined = card.attributes.find((a: Attribute): boolean => a.name === rule.ifAttribute)

        if (ifAttribute === undefined && rule.status === "required") {
            throw new Error(`[DepdendencyValidator] Attribute "${rule.ifAttribute}" is required if "${rule.attribute}"`)
        }

        if (ifAttribute !== undefined && rule.status === "forbidden") {
            throw new Error(`[DepdendencyValidator] Attribute "${rule.ifAttribute}" is forbidden if "${rule.attribute}"`)
        }
    }
    
    private shouldApply(attribute: Attribute, rule: DependentValidationRule): boolean {
        if (typeof rule.ifValue === "undefined") {
            // no check needed.
            return true
        }

        return Array.isArray(attribute.value)
            // fake any, it's actually (string[]|number[]).includes(string|number) // @todo find a better fix
            ? (attribute.value as any[]).includes(rule.ifValue as any)
            : attribute.value === rule.ifValue
    }
}