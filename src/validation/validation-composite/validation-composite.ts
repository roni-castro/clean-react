import { Validation } from '@/presentation/protocols'
import { FieldValidation } from '../protocols'

export class ValidationComposite implements Validation {
  constructor(readonly validators: FieldValidation[]) {}

  validate({
    fieldName,
    fieldValue
  }: {
    fieldName: string
    fieldValue: string
  }) {
    const fieldValidators = this.validators.filter(
      (validator) => validator.field === fieldName
    )
    for (const validator of fieldValidators) {
      const error = validator.validate(fieldValue)
      if (error) return error.message
    }
  }
}
