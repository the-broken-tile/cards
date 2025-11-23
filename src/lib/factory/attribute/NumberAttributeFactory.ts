import Attribute from "../../dto/Attribute";
import AttributeFactoryInterface from "./AttributeFactoryInterface";

export default class NumberAttributeFactory implements AttributeFactoryInterface {
    public build(payload: Record<string, any>, name: string): Attribute {
        if (typeof payload.value !== "number") {
            throw new Error(`[NumberAttributeFactory] Invalid value type "${typeof payload.value}" for attribute "${name}".`)
        }
        
        return {
            name,
            type: "number",
            value: payload.value,
        }
    }
}