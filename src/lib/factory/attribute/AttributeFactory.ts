import Attribute from "../../dto/Attribute"
import AttributeDefinition from "../../dto/AttributeDefinition"
import AttributeDefinitionType from "../../dto/AttributeDefinitionType"
import AttributeFactoryInterface from "./AttributeFactoryInterface"

export default class AttributeFactory {
    constructor(private attributeFactories: Record<AttributeDefinitionType, AttributeFactoryInterface>)
    {}

    public build(payload: Record<string, any>, attributeDefinition: AttributeDefinition): Attribute {
        if (typeof payload.name !== "string") {
            throw new Error("missing attribute name.")
        }

        const name: string = payload.name
      
        const factory: AttributeFactoryInterface | undefined = this.attributeFactories[attributeDefinition.type]

        if (factory === undefined) {
            throw new Error("missing attribute type.")
        }
        
        return factory.build(name, payload)
    }
}