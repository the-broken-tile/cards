import AttributeDefinition from "../../dto/AttributeDefinition";

export default class AttributeDefinitionFactory {
    public build(payload: Record<string, any>): AttributeDefinition {
        const nameType: string = typeof payload.name
        if (nameType !== "string") {
            throw new Error("Attribute definition missing name.")
        }
        const typeType: string = typeof payload.type
        if (typeType !== "string") {
            throw new Error(`Attribute definition "${payload.name}" invalid type "${typeType}".`)
        }

        return {
            name: payload.name,
            type: payload.type,
        }
    }
}