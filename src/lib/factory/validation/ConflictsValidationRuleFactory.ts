import ValidationRule from "../../dto/ValidationRule"
import ValidationRuleFactoryInterface from "./ValidationRuleFactoryInterface"

export default class ConflictsValidationRuleFactory implements ValidationRuleFactoryInterface {
    public supports(payload: Record<string, any>): boolean {
        return typeof payload.conflicts === "string"
            || Array.isArray(payload.conflicts)
    }

    public build(payload: Record<string, any>): ValidationRule {
        return {
            type: "dependency",
            attribute: payload.name,
            ifAttribute: payload.conflicts,
            status: "forbidden" 
        }
    
    }
}