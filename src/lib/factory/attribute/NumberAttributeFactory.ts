import Attribute from "../../dto/Attribute";
import AttributeFactoryInterface from "./AttributeFactoryInterface";

export default class NumberAttributeFactory implements AttributeFactoryInterface {
    public build(name: string, payload: Record<string, any>): Attribute {
        if (typeof payload.value !== "number") {
            throw new Error(`Invalid value type (${typeof payload.value}) for attribute ${name}`)
        }
        
        return {
            name,
            type: "number",
            value: payload.value,
        }
    }
}