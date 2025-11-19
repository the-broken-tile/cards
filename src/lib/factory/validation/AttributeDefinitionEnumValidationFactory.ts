import ValidationRule from "../../dto/ValidationRule"
import ValidationRuleFactoryInterface from "./ValidationRuleFactoryInterface"

export default class AttributeDefinitionEnumValidationFactory implements ValidationRuleFactoryInterface {
    public supports(payload: Record<string, any>): boolean {
        return typeof payload.name === "string"
          && typeof payload.type === "string"
          && (payload.type === "string" || payload.type === "string[]")
          && Array.isArray(payload.enum)
    }

    public build(payload: Record<string, any>): ValidationRule {
        if (typeof payload.name !== "string") {
            throw new Error("[AttributeDefinitionEnumValidationFactory] Invalid configuration, use supports first.")
        }
        return {
            type: "enum",
            attribute: payload.name,
            enum: payload.enum.map((e: any): string => {
                if (typeof e !== "string") {
                    throw new Error(`[AttributeDefinitionEnumValidationFactory]  Invalid enum value for attribute ${payload.name}`)
                }

                return e
            })
        }
    }
}