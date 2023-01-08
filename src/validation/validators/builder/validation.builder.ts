import { FieldValidation } from '@/validation/protocols'
import { EmailValidation } from '../email-validation/email-validation'
import { MinLengthValidation } from '../min-length-validation/min-length-validation'
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

  email() {
    this.validators.push(new EmailValidation(this.fieldName))
    return this
  }

  min(minLength: number) {
    this.validators.push(new MinLengthValidation(this.fieldName, minLength))
    return this
  }
}
