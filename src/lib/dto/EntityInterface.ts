import Attribute from "./Attribute";

export default interface EntityInterface {
  readonly id: string | number,
  readonly name: string,
  readonly attributes: Attribute[],
}