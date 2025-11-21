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

type ValidationRule = DependentValidationRule
  | EnumValidationRule
  | RequiredAttributesRule
  | UniqueIdsValidationRule
  | RequiredIfMissingValidationRule
  | UniqueAttributeNamesValidationRule

export default ValidationRule
