import Attribute from "../dto/Attribute"
import AttributeDefinition from "../dto/AttributeDefinition"
import Card from "../dto/Card"

import AttributeFactory from "./attribute/AttributeFactory"
import CardFactoryInterface from "./CardFactoryInterface";

export default class CardFactory implements CardFactoryInterface {
  constructor(private readonly attributeFactory: AttributeFactory)
  {}

  public supports(payload: Record<string, any>): boolean {
    return Array.isArray(payload.attributes)
  }

  public build(payload: Record<string, any>, attributeDefinitions: AttributeDefinition[]): Card {
    if (payload.name === undefined) {
      throw new Error("[CardFactory] Missing name.")
    }

    if (payload.id === undefined) {
      throw new Error(`[CardFactory] Missing id in card "${payload.name}".`)
    }

    if (!Array.isArray(payload.attributes)) {
      throw new Error(`[CardFactory] Attributes are not an array in card "${payload.name}".`)
    }

    return {
      id: payload.id,
      name: payload.name,
      attributes: payload.attributes.map((attribute: Record<string, any>): Attribute => {
        if (typeof attribute.type === "string") {
          throw new Error(`[CardFactory] Attribute type for "${payload.name}.${attribute.name}" must be empty.`)
        }
        const attributeDefinition: AttributeDefinition | undefined = attributeDefinitions.find((def: AttributeDefinition): boolean => {
          return def.name === attribute.name
        })

        if (attributeDefinition === undefined) {
          throw new Error(`[CardFactory] Missing definition for attribute "${attribute.name}" in card ${payload.name}".`)
        }

        return this.attributeFactory.build(attribute, attributeDefinition)
      })
    }
  }
}