import Attribute from "../dto/Attribute"
import Card from "../dto/Card"

import AttributeFactory from "./AttributeFactory"

export default class CardFactory {
    constructor(private readonly attributeFactory: AttributeFactory)
    {}

    public build(payload: Record<string, any>): Card {
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
            attributes: payload.attributes.map((attribute: Record<string, any>): Attribute => this.attributeFactory.build(attribute))
        }
    }
}