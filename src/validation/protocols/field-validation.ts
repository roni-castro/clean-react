export interface FieldValidation {
  field: string
  validate: (fieldValue: string) => Error | null
}
