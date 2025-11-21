import AttributeFactoryInterface from "./AttributeFactoryInterface"
import Attribute from "../../dto/Attribute"

export default class EnumAttributeFactory implements AttributeFactoryInterface {
  public build(name: string, payload: Record<string, any>): Attribute {
    if (typeof payload.value !== "string" || !Array.isArray(payload.value)) {
      throw new Error(`[EnumAttributeFactory] Invalid enum value of type "${typeof payload.value}" for "${name}".`)
    }

    return {
      name,
      type: "enum",
      value: payload.value,
    }
  }
}