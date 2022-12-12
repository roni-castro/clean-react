import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '../../protocols'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, readonly minLength: number) {}

  validate(fieldValue: string) {
    return fieldValue.length >= this.minLength ? null : new InvalidFieldError()
  }
}
