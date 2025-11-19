import ValidationRule from "../../dto/ValidationRule"
import ValidationRuleFactoryInterface from "./ValidationRuleFactoryInterface"

export default class AttributeDefinitionRequiredValidationRuleFactory implements ValidationRuleFactoryInterface {
    public supports(payload: Record<string, any>): boolean {
        return payload.required === true
    }

    public build(payload: Record<string, any>): ValidationRule {
        return {
            type: "requiredAttributes",
            attributes: [payload.name]
        }
    }
}