import ValidationRule from "../../dto/ValidationRule"
import ValidationRuleFactoryInterface from "./ValidationRuleFactoryInterface"

export default class ValidationRuleFactory {
    constructor(private readonly factories: ValidationRuleFactoryInterface[])
    {}

    public build(payload: Record<string, any>): ValidationRule[] {
        const rules: ValidationRule[] = []
        for (const factory of this.factories) {
            if (factory.supports(payload)) {
                rules.push(factory.build(payload))
            }
        }

        return rules
    }
}