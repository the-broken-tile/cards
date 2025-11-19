import AttributeType from "./AttributeType"

declare type BaseAttribute = {
    readonly name: string
    readonly type: AttributeType
}
declare type StringAttribute = BaseAttribute & {
    readonly type: "string"
    readonly value: string
}

declare type NumberAttribute = BaseAttribute & {
    readonly type: "number"
    readonly value: number
}

declare type ArrayOfStringsAttribute = BaseAttribute & {
    readonly type: "string[]"
    readonly value: string[]
}

declare type ArrayOfNumbersAttribute = BaseAttribute & {
    readonly type: "number[]"
    readonly value: number[]
}

declare type BooleanAttribute = BaseAttribute & {
    readonly type: "boolean"
    readonly value: boolean
}

declare type Attribute = StringAttribute
    | NumberAttribute
    | ArrayOfStringsAttribute
    | ArrayOfNumbersAttribute
    | BooleanAttribute

export default Attribute