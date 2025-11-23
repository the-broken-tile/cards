import ValidationRuleFactoryInterface from "./ValidationRuleFactoryInterface";
import ValidationRule from "../../dto/ValidationRule";

export default class RequiredIfMissingValidationRuleFactory implements ValidationRuleFactoryInterface {
  public supports(payload: Record<string, any>): boolean {
    return typeof payload.requiredIfMissing === "string"
  }

  public build(payload: Record<string, any>): ValidationRule {
    const nameType: string = typeof payload.name
    if (nameType !== "string") {
      throw new Error(`[RequiredIfMissingValidationRuleFactory] Invalid name of type "${nameType}."`)
    }

    const missingAttributeType: string = typeof payload.requiredIfMissing
    if (missingAttributeType !== "string") {
      throw new Error(
        `[RequiredIfMissingValidationRuleFactory] Invalid type of missing attribute "${missingAttributeType} of attribute "${payload.name}".`,
      )
    }

    return {
      type: "requiredIfMissing",
      attribute: payload.name,
      missingAttribute: payload.requiredIfMissing,
    }
  }
}