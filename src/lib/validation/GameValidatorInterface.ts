import Game from "../dto/Game"

export default interface GameValidatorInterface {
  validate(game: Game): void | never
}