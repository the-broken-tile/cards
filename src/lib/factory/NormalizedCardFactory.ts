import AttributeDefinition from "../dto/AttributeDefinition"
import Card from "../dto/Card"
import CardFactoryInterface from "./CardFactoryInterface"
import Attribute from "../dto/Attribute"
import AttributeFactory from "./attribute/AttributeFactory"

export default class NormalizedCardFactory implements CardFactoryInterface {
  constructor(private readonly attributeFactory: AttributeFactory) {
  }
  public supports(payload: Record<string, any>): boolean {
    return typeof payload.attributes === "undefined"
  }

  public build(payload: Record<string, any>, attributeDefinitions: AttributeDefinition[]): Card {
    const { id, name, ...attributes } = payload

    return new Card(
      id,
      name,
      this.buildAttributes(name, attributes as Record<string, any>[], attributeDefinitions),
    )
  }

  private buildAttributes(cardName: string, attributes: Record<string, any>[], attributeDefinitions: AttributeDefinition[]): Attribute[]
  {
    return Object.entries(attributes).map(([name, value]): Attribute => {
      const attributeDefinition: AttributeDefinition | undefined = attributeDefinitions.find((def: AttributeDefinition): boolean => {
        return def.name === name
      })

      if (attributeDefinition === undefined) {
        throw new Error(`[NormalizedCardFactory] Missing definition for attribute "${name}" in card ${cardName}".`)
      }

      return this.buildAttribute({name, value}, attributeDefinition)
    }, attributeDefinitions)
  }

  private buildAttribute(attribute: Record<string, any>, attributeDefinition: AttributeDefinition): Attribute {
    return this.attributeFactory.build(attribute, attributeDefinition)
  }
}