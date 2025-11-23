import { MinValidationRule } from "../../dto/ValidationRule"
import ValidationRuleFactoryInterface from "./ValidationRuleFactoryInterface"

export default class MinValueValidationRuleFactory implements ValidationRuleFactoryInterface {
    supports(payload: Record<string, any>): boolean {
        return typeof payload.min === "number"
    }
    build(payload: Record<string, any>): MinValidationRule {
      const nameType: string = typeof payload.name
      if (nameType !== "string") {
        throw new Error(`[MinValueValidationRuleFactory] name must be a string, "${nameType}" given`)
      }

      const minType: string = typeof payload.min
      if (minType !== "number") {
        throw new Error(`[MinValueValidationRuleFactory] "${payload.name}" min must be a number, "${minType}" given.`)
      }

      return {
        type: "min",
        attribute: payload.name,
        minValue: payload.min,
      }
    }

}