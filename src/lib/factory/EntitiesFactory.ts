import AttributeDefinition from "../dto/AttributeDefinition"
import AttributeDefinitionFactory from "./attribute/AttributeDefinitionFactory"
import EntityFactory from "./EntityFactory"
import Entity from "../dto/Entity"

export default class EntitiesFactory {
  constructor(
    private readonly attributeDefinitionFactory: AttributeDefinitionFactory,
    private readonly entityFactory: EntityFactory,
  ) {
  }

  public build(payload: Record<string, any>): Entity[] {
    const nameType: string = typeof payload.name

    if (nameType !== "string") {
      throw new Error(`[EntityFactory] Invalid type of entity name "${nameType}"`)
    }

    if (!Array.isArray(payload.attributes)) {
      throw new Error(`[EntityFactory] Invalid attribute "${typeof payload.attributes}"`)
    }

    const attributeDefinitions: AttributeDefinition[] = payload.attributes
      .map((a: Record<string, any>): AttributeDefinition => this.attributeDefinitionFactory.build(a))

    return payload.items.map((item: Record<string, any>): Entity => this.entityFactory.build(payload.name, item, attributeDefinitions))
  }
}