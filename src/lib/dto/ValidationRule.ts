import ValidationType from "./CardValidationType"

export type BaseValidationRule = {
    readonly type: ValidationType
}

export type UniqueIdsValidationRule = BaseValidationRule & {
  readonly type: "uniqueIds"
}

export type UniqueAttributeNamesValidationRule = BaseValidationRule & {
  readonly type: "uniqueAttributeNames"
}

export type RequiredIfMissingValidationRule = BaseValidationRule & {
  readonly type: "requiredIfMissing"
  readonly attribute: string
  readonly missingAttribute: string
}

export type DependentValidationRule = BaseValidationRule & {
    readonly type: "dependency"
    readonly attribute: string
    readonly ifAttribute: string
    readonly ifValue?: string | number | boolean | undefined
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

export type MinValidationRule = BaseValidationRule & {
  readonly type: "min"
  readonly attribute: string
  readonly minValue: number
}

export type MaxValidationRule = BaseValidationRule & {
  readonly type: "max"
  readonly attribute: string
  readonly maxValue: number
}

type ValidationRule = DependentValidationRule
  | EnumValidationRule
  | RequiredAttributesRule
  | UniqueIdsValidationRule
  | RequiredIfMissingValidationRule
  | UniqueAttributeNamesValidationRule
  | MinValidationRule
  | MaxValidationRule

export default ValidationRule
