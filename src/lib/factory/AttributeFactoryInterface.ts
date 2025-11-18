import Attribute from "../dto/Attribute";

export default interface AttributeFactoryInterface {
    build(name: string, payload: Record<string, any>): Attribute
}