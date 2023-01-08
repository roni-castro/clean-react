import { faker } from '@faker-js/faker'
import { EmailValidation } from '../email-validation/email-validation'
import { MinLengthValidation } from '../min-length-validation/min-length-validation'
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

  it('should return MinLengthValidation', () => {
    const fieldName = faker.database.column()
    const minLength = faker.datatype.number()
    const validations = ValidationBuilder.field(fieldName)
      .min(minLength)
      .build()
    expect(validations).toEqual([new MinLengthValidation(fieldName, minLength)])
  })
})
