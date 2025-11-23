import Attribute from "./Attribute"
import EntityInterface from "./EntityInterface"

export default class Entity implements EntityInterface {
  private readonly ref: string
  constructor(
    private readonly type: string,
    public readonly name: string,
    public readonly attributes: Attribute[],
  ) {
    this.ref = `#/$ref/${type}/${name}`
  }

  public toJSON(): Record<string, any>|string {
    return {
      ref: this.ref,
      id: this.id,
      name: this.name,
      attributes: this.attributes,
    }
  }

  get id(): string {
    return this.type
  }
}