import ValidationRule from "../../dto/ValidationRule"

export default interface ValidationRuleFactoryInterface {
    supports(payload: Record<string, any>): boolean
    build(payload: Record<string, any>): ValidationRule
}
