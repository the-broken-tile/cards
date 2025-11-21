import Card from "../dto/Card"
import ValidationRule from "../dto/ValidationRule"

export default interface CardValidatorInterface {
    validate(card: Card, rule: ValidationRule): void | never
}