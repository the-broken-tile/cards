import AttributeDefinitionType from "./AttributeDefinitionType"

declare type AttributeDefinition = {
    readonly name: string
    readonly type: AttributeDefinitionType
    readonly enum?: string[]
    readonly required?: boolean
}

export default AttributeDefinition