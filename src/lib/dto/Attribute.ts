import AttributeType from "./AttributeType"
import Entity from "./Entity"

type BaseAttribute = {
    readonly name: string
    readonly type: AttributeType
}
type StringAttribute = BaseAttribute & {
    readonly type: "string"
    readonly value: string
}
type TextAttribute = BaseAttribute & {
  readonly type: "text"
  readonly value: string
}
type EntityAttribute = BaseAttribute & {
  readonly type: "entity"
  readonly value: Entity | string
}

type EnumAttribute = BaseAttribute & {
  readonly type: "enum"
  readonly value: string | string[]
}

type NumberAttribute = BaseAttribute & {
    readonly type: "number"
    readonly value: number
}

type ArrayOfStringsAttribute = BaseAttribute & {
    readonly type: "string[]"
    readonly value: string[]
}

type ArrayOfNumbersAttribute = BaseAttribute & {
    readonly type: "number[]"
    readonly value: number[]
}

type BooleanAttribute = BaseAttribute & {
    readonly type: "boolean"
    readonly value: boolean
}

type Attribute = StringAttribute
  | TextAttribute
  | NumberAttribute
  | ArrayOfStringsAttribute
  | ArrayOfNumbersAttribute
  | BooleanAttribute
  | EnumAttribute
  | EntityAttribute

export default Attribute