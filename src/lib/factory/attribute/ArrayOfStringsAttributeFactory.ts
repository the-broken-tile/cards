import Attribute from "../../dto/Attribute";
import AttributeFactoryInterface from "./AttributeFactoryInterface";

export default class ArrayOfStringsAttributeFactory implements AttributeFactoryInterface {
    public build(payload: Record<string, any>, name: string): Attribute {
        if (!Array.isArray(payload.value)) {
            throw new Error(`[ArrayOfStringsAttributeFactory] Invalid attribute value for attribute "${name}": "${payload.value}".`)
        }
        
        return {
            type: "string[]",
            name,
            value: payload.value.map((value: any): string => {
                if (typeof value === "string") {
                    return value
                }

                throw new Error(`[ArrayOfStringsAttributeFactory] Invalid value type "${typeof value}" for attribute "${payload.name}".`)
            })
        }
    }
}