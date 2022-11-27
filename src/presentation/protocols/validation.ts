export interface Validation {
  validate: ({
    fieldName,
    fieldValue
  }: {
    fieldName: string
    fieldValue: string
  }) => string | null | undefined
}
