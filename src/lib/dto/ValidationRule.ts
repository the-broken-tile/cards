import ValidationType from "./ValidationType"

export type BaseValidationRule = {
    readonly type: ValidationType
}

export type DependentValidationRule = BaseValidationRule & {
    readonly type: "dependency"
    readonly attribute: string
    readonly ifAttribute: string
    readonly ifValue?: string | number | boolean
    readonly status: "required" | "forbidden"
}

export type EnumValidationRule = BaseValidationRule & {
    readonly type: "enum"
    readonly attribute: string
    readonly enum: string[]
}

export type RequiredAttributesRule = BaseValidationRule & {
    readonly type: "requiredAttributes"
    readonly attributes: string[]
}

type ValidationRule = DependentValidationRule | EnumValidationRule | RequiredAttributesRule

export default ValidationRule
