import Attribute from "../../dto/Attribute"
import AttributeFactoryInterface from "./AttributeFactoryInterface"

export default class BooleanAttributeFactory implements AttributeFactoryInterface {
    public build(name: string, payload: Record<string, any>): Attribute {
        const type: string = typeof payload.value
        if (type !== "boolean") {
            throw new Error(`Invalid attribute type ${type} for attribute ${name}.`)
        }
        
        return {
            name,
            type: "boolean",
            value: !! payload.value,
        }
    }
}