import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldValidation } from '../required-field/required-field-validation'

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validators: FieldValidation[]
  ) {}

  static field(fieldName: string) {
    return new ValidationBuilder(fieldName, [])
  }

  build() {
    return this.validators
  }

  required() {
    this.validators.push(new RequiredFieldValidation(this.fieldName))
    return this
  }
}
