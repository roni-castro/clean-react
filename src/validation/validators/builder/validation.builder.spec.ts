import { faker } from '@faker-js/faker'
import { EmailValidation } from '../email-validation/email-validation'
import { RequiredFieldValidation } from '../required-field/required-field-validation'
import { ValidationBuilder } from './validation.builder'

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    const validations = ValidationBuilder.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })

  it('should return EmailValidation', () => {
    const fieldName = faker.database.column()
    const validations = ValidationBuilder.field(fieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })
})
