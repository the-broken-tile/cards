import ValidationRule from "../dto/ValidationRule"
import CardInterface from "../dto/CardInterface"

export default interface CardValidatorInterface {
    validate(card: CardInterface, rule: ValidationRule): void | never
}