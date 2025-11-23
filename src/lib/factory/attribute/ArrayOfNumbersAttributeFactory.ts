import Attribute from "../../dto/Attribute"
import AttributeFactoryInterface from "./AttributeFactoryInterface"

export default class ArrayOfNumbersAttributeFactory implements AttributeFactoryInterface {
    public build(payload: Record<string, any>, name: string): Attribute {
        if (!Array.isArray(payload.value)) {
            throw new Error(`[ArrayOfNumbersAttributeFactory] Invalid attribute value for attribute ${name}: ${typeof payload.value}`)
        }

        return {
            name,
            type: "number[]",
            value: payload.value.map((value: any): number => {
                const type: string = typeof value
                if (type === "number") {
                    return value
                }

                throw new Error(`[ArrayOfNumbersAttributeFactory] Invalid attribute value for ${name}: ${type}`)
            })
        }
    }
}