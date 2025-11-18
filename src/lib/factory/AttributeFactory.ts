import Attribute from "../dto/Attribute";
import AttributeType from "../dto/AttributeType";
import AttributeFactoryInterface from "./AttributeFactoryInterface"

export default class AttributeFactory {
    constructor(private attributeFactories: Record<AttributeType, AttributeFactoryInterface>)
    {}

    public build(payload: Record<string, any>): Attribute {
        if (typeof payload.name !== "string") {
            throw new Error("missing attribute name.")
        }

        const name: string = payload.name
      
        const factory: AttributeFactoryInterface | undefined = this.attributeFactories[payload.type as AttributeType]

        if (factory === undefined) {
            throw new Error("missing attribute type.")
        }
        
        return factory.build(name, payload)
    }
}