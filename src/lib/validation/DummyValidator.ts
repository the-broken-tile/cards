import CardValidatorInterface from "./CardValidatorInterface"

export default class DummyValidator implements CardValidatorInterface {
  public validate(): void {
    // Noop.
  }
}