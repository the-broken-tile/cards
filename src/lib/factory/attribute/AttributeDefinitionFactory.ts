import AttributeDefinition from "../../dto/AttributeDefinition"

export default class AttributeDefinitionFactory {
    public build(payload: Record<string, any>): AttributeDefinition {
        const nameType: string = typeof payload.name
        if (nameType !== "string") {
            throw new Error(`[AttributeDefinitionFactory] Invalid name in attribute definition: ${nameType}.`)
        }
        const typeType: string = typeof payload.type
        if (typeType !== "string") {
            throw new Error(`[AttributeDefinitionFactory] Invalid type "${typeType}" in attribute definition "${payload.name}".`)
        }

        return {
            name: payload.name,
            type: payload.type,
        }
    }
}