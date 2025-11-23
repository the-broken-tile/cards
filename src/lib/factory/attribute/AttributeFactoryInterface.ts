import Attribute from "../../dto/Attribute";

export default interface AttributeFactoryInterface {
    build(payload: Record<string, any>, name?: string): Attribute
}