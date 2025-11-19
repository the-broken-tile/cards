import Attribute from "../../dto/Attribute";
import AttributeFactoryInterface from "./AttributeFactoryInterface";

export default class ArrayOfStringsAttributeFactory implements AttributeFactoryInterface {
    public build(name: string, payload: Record<string, any>): Attribute {
        if (!Array.isArray(payload.value)) {
            throw new Error(`Invalid attribute value for attribute ${name}: ${payload.value}`)
        }
        
        return {
            type: "string[]",
            name,
            value: payload.value.map((value: any): string => {
                if (typeof value === "string") {
                    return value
                }

                throw new Error(`Invalid value type (${typeof value}) for attribute ${payload.name}`)
            })
        }
    }
}