import { MaxValidationRule } from "../../dto/ValidationRule";
import ValidationRuleFactoryInterface from "./ValidationRuleFactoryInterface"

export default class MaxValueValidationRuleFactory implements ValidationRuleFactoryInterface {
    supports(payload: Record<string, any>): boolean {
      return typeof payload.max === "number"
    }
    build(payload: Record<string, any>): MaxValidationRule {
      const nameType: string = typeof payload.name
      if (nameType !== "string") {
        throw new Error(`[MaxValueValidationRuleFactory] name must be a string, "${nameType}" given`)
      }

      const maxType: string = typeof payload.max
      if (maxType !== "number") {
        throw new Error(`[MaxValueValidationRuleFactory] "${payload.name}" max must be a number, "${maxType}" given.`)
      }

      return {
        type: "max",
        attribute: payload.name,
        maxValue: payload.max,
      }
    }

}