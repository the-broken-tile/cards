import Attribute from "../dto/Attribute"
import AttributeDefinition from "../dto/AttributeDefinition"
import Card from "../dto/Card"

import AttributeFactory from "./attribute/AttributeFactory"

export default class CardFactory {
    constructor(private readonly attributeFactory: AttributeFactory)
    {}

    public build(payload: Record<string, any>, attributeDefinitions: AttributeDefinition[]): Card {
        if (payload.name === undefined) {
            throw new Error("Missing name.")
        }

        if (payload.id === undefined) {
            throw new Error("Missing id.")
        }

        if (!Array.isArray(payload.attributes)) {
            throw new Error("Attirubtes are not an array")
        }

        

        return {
            id: payload.id,
            name: payload.name,
            attributes: payload.attributes.map((attribute: Record<string, any>): Attribute => {
                const attributeDefinition: AttributeDefinition | undefined = attributeDefinitions.find((def: AttributeDefinition): boolean => {
                    return def.name === attribute.name
                })

                if (attributeDefinition === undefined) {
                    throw new Error(`Missing definition for attribute "${attribute.name}"`)
                }
                
                return this.attributeFactory.build(attribute, attributeDefinition)
            })
        }
    }
}