import AttributeDefinition from "../dto/AttributeDefinition"
import CardInterface from "../dto/CardInterface"

export default interface CardFactoryInterface {
  supports(payload: Record<string, any>): boolean
  build(payload: Record<string, any>, attributeDefinitions: AttributeDefinition[]): CardInterface
}