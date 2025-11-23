import Attribute from "../../dto/Attribute";
import AttributeFactoryInterface from "./AttributeFactoryInterface";

export default class StringAttributeFactory implements AttributeFactoryInterface {
  public build(payload: Record<string, any>, name: string): Attribute {
    if (typeof payload.value !== "string") {
      throw new Error(`[StringAttributeFactory] Invalid string value "${payload.value}" for "${name}".`)
    }

    return {
      name,
      type: "string",
      value: payload.value,
    }
  }
}