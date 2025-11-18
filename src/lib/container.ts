import ArrayOfStringsAttributeFactory from "./factory/ArrayOfStringsAttributeFactory"
import AttributeFactory from "./factory/AttributeFactory"
import CardFactory from "./factory/CardFactory"
import StringAttributeFactory from "./factory/StringAttributeFactory"
import NumberAttributeFactory from "./factory/NumberAttributeFactory"
import ArrayOfNumbersFactory from "./factory/ArrayOfNumbersFactory"
import BooleanAttributeFactory from "./factory/BooleanAttributeFactory"


const cardFactory = new CardFactory(new AttributeFactory({
    "string": new StringAttributeFactory(),
    "string[]": new ArrayOfStringsAttributeFactory(),
    "number": new NumberAttributeFactory(),
    "number[]": new ArrayOfNumbersFactory(),
    "boolean": new BooleanAttributeFactory(),
}))

export {
    cardFactory,
}