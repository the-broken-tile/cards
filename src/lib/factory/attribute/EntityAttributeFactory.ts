import AttributeFactoryInterface from "./AttributeFactoryInterface"
import Attribute from "../../dto/Attribute"

export default class EntityAttributeFactory implements AttributeFactoryInterface {
  public build(payload: Record<string, any>, name: string): Attribute {
    return {
      name,
      type: "entity",
      value: payload.value,
    }
  }
}