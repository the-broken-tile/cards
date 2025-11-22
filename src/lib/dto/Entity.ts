import Attribute from "./Attribute"

export default class Entity {
  private readonly ref: string
  constructor(
    public readonly type: string,
    public readonly name: string,
    public readonly attributes: Attribute[],
  ) {
    this.ref = `#/$ref/${type}/${name}`
  }

  public toJSON(): Record<string, any>|string {
    return {
      ref: this.ref,
      type: this.type,
      name: this.name,
      attributes: this.attributes,
    }
  }
}