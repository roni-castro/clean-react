import { Validation } from '../protocols'

export class ValidationSpy implements Validation {
  input?: object
  errorMessage?: string

  validate(input: object) {
    this.input = input

    return this.errorMessage
  }
}
