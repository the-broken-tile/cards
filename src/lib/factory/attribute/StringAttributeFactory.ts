import Attribute from "../../dto/Attribute";
import AttributeFactoryInterface from "./AttributeFactoryInterface";

export default class StringAttributeFactory implements AttributeFactoryInterface {
    public build(name: string, payload: Record<string, any>): Attribute {
        if (typeof payload.value !== "string") {
            throw new Error(`Invalid value for string attribute: ${payload.value}`)
        }

        return {
            name,
            type: "string",
            value: payload.value,
        }
    }
}