import AttributeFactoryInterface from "./AttributeFactoryInterface"
import Attribute from "../../dto/Attribute"

export default class EntityAttributeFactory implements AttributeFactoryInterface {
  public build(name: string, payload: Record<string, any>): Attribute {
    return {
      name,
      type: "entity",
      value: payload.value,
    }
  }
}