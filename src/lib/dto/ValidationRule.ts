import ValidationType from "./ValidationType"

declare type BaseValidationRule = {
    readonly type: ValidationType
}

declare type DependentValidationRule = BaseValidationRule & {
    readonly type: "dependency"
    readonly attribute: string
    readonly ifAttribute: string
    readonly ifValue: string | number | boolean
    readonly status: "required" | "forbidden"
}

declare type EnumValidationRule = BaseValidationRule & {
    readonly type: "enum"
    readonly attribute: string
    readonly enum: string[]
}

declare type RequiredAttributesRule = BaseValidationRule & {
    readonly type: "requiredAttributes"
    readonly attributes: string[]
}

declare type ValidationRule = DependentValidationRule | EnumValidationRule | RequiredAttributesRule

export default ValidationRule
