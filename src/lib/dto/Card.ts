import Attribute from "./Attribute"
import CardInterface from "./CardInterface"

export default class Card implements CardInterface {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly attributes: Attribute[],
  ) {
  }
}