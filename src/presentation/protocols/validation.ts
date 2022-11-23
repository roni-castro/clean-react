export interface Validation {
  validate: ({
    fieldName,
    fieldValue
  }: {
    fieldName: string
    fieldValue: string
  }) => void
}
