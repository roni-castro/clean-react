import { RequiredFieldError } from '../errors'
import { FieldValidation } from '../protocols'

export class RequiredFieldValidation implements FieldValidation {
  field: string
  constructor(private readonly fieldName: string) {
    this.field = fieldName
  }

  validate(fieldValue: string) {
    return new RequiredFieldError()
  }
}
