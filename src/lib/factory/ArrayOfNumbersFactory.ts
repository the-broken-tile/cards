import Attribute from "../dto/Attribute";
import AttributeFactoryInterface from "./AttributeFactoryInterface";

export default class ArrayOfNumbersFactory implements AttributeFactoryInterface {
    public build(name: string, payload: Record<string, any>): Attribute {
        if (!Array.isArray(payload.value)) {
            throw new Error(`Invalid attribute value for attribute ${name}: ${typeof payload.value}`)
        }

        return {
            name,
            type: "number[]",
            value: payload.value.map((value: any): number => {
                const type: string = typeof value
                if (type === "number") {
                    return value
                }

                throw new Error(`Invalid attribute value for ${name}: ${type}`)
            })
        }
    }
}