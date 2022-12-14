import { Validation } from '../protocols'

export class ValidationSpy implements Validation {
  errorMessage?: string | null = null
  fieldName?: string
  fieldValue?: string

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
