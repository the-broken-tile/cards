import AttributeDefinition from "../dto/AttributeDefinition"
import Card from "../dto/Card";

export default interface CardFactoryInterface {
  supports(payload: Record<string, any>): boolean
  build(payload: Record<string, any>, attributeDefinitions: AttributeDefinition[]): Card
}