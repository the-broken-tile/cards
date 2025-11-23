import Attribute from "../../dto/Attribute"
import AttributeFactoryInterface from "./AttributeFactoryInterface"

export default class BooleanAttributeFactory implements AttributeFactoryInterface {
    public build(payload: Record<string, any>, name: string): Attribute {
        const type: string = typeof payload.value
        if (type !== "boolean") {
            throw new Error(`[BooleanAttributeFactory] Invalid attribute type ${type} for attribute ${name}.`)
        }
        
        return {
            name,
            type: "boolean",
            value: !! payload.value,
        }
    }
}