import { Validation } from '../protocols'

export class ValidationSpy implements Validation {
  fieldName?: string
  fieldValue?: string
  errorMessage?: string

  validate({
    fieldName,
    fieldValue
  }: {
    fieldName: string
    fieldValue: string
  }) {
    this.fieldName = fieldName
    this.fieldValue = fieldValue

    return this.errorMessage
  }
}
