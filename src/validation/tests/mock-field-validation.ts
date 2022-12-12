import { FieldValidation } from '../protocols'

export class FieldValidationSpy implements FieldValidation {
  error: Error | null = null
  constructor(readonly field: string) {}

  validate(fieldValue: string) {
    return this.error
  }
}
