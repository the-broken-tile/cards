import Attribute from "./Attribute";

export default interface CardInterface {
  readonly id: number
  readonly name: string
  readonly attributes: Attribute[]
}