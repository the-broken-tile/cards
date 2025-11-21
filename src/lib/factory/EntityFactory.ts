import Entity from "../dto/Entity"
import AttributeDefinition from "../dto/AttributeDefinition"
import Attribute from "../dto/Attribute"
import AttributeFactory from "./attribute/AttributeFactory"

export default class EntityFactory {
  constructor(private readonly attributeFactory: AttributeFactory) {
  }

  public build(type: string, payload: Record<string, any>, attributeDefinitions: AttributeDefinition[]): Entity {
    return {
      type,
      name: payload.name,
      attributes: payload.attributes.map((attribute: Record<string, any>): Attribute => {
        const attributeDefinition: AttributeDefinition | undefined = attributeDefinitions.find((def: AttributeDefinition): boolean => {
          return def.name === attribute.name
        })

        if (attributeDefinition === undefined) {
          throw new Error(`[EntityFactory] Missing definition for attribute "${attribute.name}".`)
        }

        return this.attributeFactory.build(attribute, attributeDefinition)
      })
    }
  }
}