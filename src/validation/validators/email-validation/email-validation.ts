import { EmailError } from '../../errors'
import { FieldValidation } from '../../protocols'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(fieldValue: string) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(fieldValue) ? null : new EmailError()
  }
}
